import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { getRandomQuestions, getQuestionsByIds } from '../data/aiBank';

// ─── Confetti ──────────────────────────────────────────────────────────────
const ConfettiPiece = ({ index }) => {
  const colors = ['#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899'];
  const color = colors[index % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 2;
  const duration = 3 + Math.random() * 2;
  const size = 6 + Math.random() * 8;
  return (
    <motion.div
      initial={{ y: -20, x: `${left}vw`, opacity: 1, rotate: 0 }}
      animate={{ y: '110vh', opacity: 0, rotate: 720 }}
      transition={{ duration, delay, ease: 'easeIn' }}
      style={{
        position: 'fixed', top: 0, left: 0, width: size, height: size,
        background: color, borderRadius: Math.random() > 0.5 ? '50%' : '2px',
        zIndex: 9999, pointerEvents: 'none',
      }}
    />
  );
};
const Confetti = () => (
  <>{Array.from({ length: 60 }, (_, i) => <ConfettiPiece key={i} index={i} />)}</>
);

// ─── Stat Card ─────────────────────────────────────────────────────────────
const StatCard = ({ label, value, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    style={{
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 14,
      padding: '16px 20px',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
    }}
  >
    <div style={{ fontSize: '1.7rem', fontWeight: 800, color: color || '#fff' }}>{value}</div>
    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', marginTop: 4, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</div>
  </motion.div>
);

// ─── Main Component ─────────────────────────────────────────────────────────
const FriendBattlePage = ({ navigate }) => {
  const { user, profile } = useAuth();
  const [matchStatus, setMatchStatus] = useState('lobby');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [joinInput, setJoinInput] = useState('');
  const [matchId, setMatchId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [channel, setChannel] = useState(null);

  const [config, setConfig] = useState({
    categories: {
      'Quantitative Aptitude': 10,
      'Logical Reasoning': 10,
      'Verbal Ability': 5,
      'Technical': 5,
    },
    difficulty: { easy: 40, medium: 40, hard: 20 },
    duration: 30,
  });

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [playerAnswers, setPlayerAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState(null);

  // ── Global Matchmaking Check ──────────────────────────────────────────────
  useEffect(() => {
    const checkGlobalMatch = async () => {
      const rawHash = window.location.hash;
      if (!rawHash.includes('?')) return;
      const params = new URLSearchParams(rawHash.split('?')[1]);
      const mId = params.get('match');
      const isGlobal = params.get('global') === 'true';
      
      if (mId && user) {
        try {
          const { data: matchData, error } = await supabase.from('friendly_matches').select('*').eq('id', mId).single();
          if (error) throw error;
          
          setMatchId(mId);
          setRoomCode(matchData.join_code);
          
          if (matchData.host_id === user.id) {
             setIsHost(true);
             if (matchData.status === 'waiting_global' || isGlobal) {
               setMatchStatus('waiting_global');
             } else {
               setMatchStatus('waiting');
             }
          } else {
             setIsHost(false);
             setMatchStatus('joining');
             await fetchQuestions(matchData.question_ids, mId);
          }
        } catch (err) {
          console.error(err);
          alert('Failed to load global match');
        }
      }
    };
    if (user) {
      checkGlobalMatch();
    }
  }, [user]);

  // ── Realtime Channel ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!matchId) return;
    const battleChannel = supabase.channel('battle-events');
    battleChannel
      .on('broadcast', { event: 'progress_sync' }, (event) => {
        if (event.payload.matchId === matchId && event.payload.userId !== user?.id) {
          setOpponentProgress(event.payload.progressPercentage);
        }
      })
      .on('broadcast', { event: 'status_change' }, (event) => {
        if (event.payload.matchId === matchId) {
          setMatchStatus(event.payload.newStatus);
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          if (!isHost && matchStatus === 'joining') {
            battleChannel.send({
              type: 'broadcast',
              event: 'status_change',
              payload: { matchId, newStatus: 'countdown' },
            });
            setMatchStatus('countdown');
          }
        }
      });
    setChannel(battleChannel);
    return () => { supabase.removeChannel(battleChannel); };
  }, [matchId, isHost, user?.id]);

  // ── Create / Join ─────────────────────────────────────────────────────────
  const createMatch = async () => {
    if (!user) return alert('Please login first');
    setMatchStatus('creating');
    try {
      const selected = getRandomQuestions(config);
      const matchConfig = { ...config, selected_ids: selected.map(q => q.id) };
      const { data, error } = await supabase.rpc('create_friendly_match', { p_config: matchConfig });
      if (error) throw error;
      setRoomCode(data.join_code);
      setMatchId(data.match_id);
      setIsHost(true);
      setMatchStatus('waiting');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to create match');
      setMatchStatus('lobby');
    }
  };

  const joinMatch = async () => {
    if (!user) return alert('Please login first');
    if (!joinInput || joinInput.length !== 5) return alert('Invalid room code');
    setMatchStatus('joining');
    try {
      const { data, error } = await supabase.rpc('join_friendly_match', { p_join_code: joinInput.toUpperCase() });
      if (error) throw error;
      setRoomCode(joinInput.toUpperCase());
      setMatchId(data.match_id);
      setIsHost(false);
      let qIds = data?.question_ids;
      if (!qIds || qIds.length === 0) {
        const { data: matchData } = await supabase.from('friendly_matches').select('question_ids').eq('id', data.match_id).single();
        qIds = matchData?.question_ids || [];
      }
      await fetchQuestions(qIds, data.match_id);
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to join match');
      setMatchStatus('lobby');
    }
  };

  const fetchQuestions = async (ids, matchIdForConfig) => {
    try {
      let loadedQuestions = [];
      if (ids && ids.length > 0) {
        const { data, error } = await supabase.from('assessment_questions').select('*').in('id', ids);
        if (!error && data && data.length > 0) {
          loadedQuestions = ids.map(id => data.find(q => q.id === id)).filter(Boolean);
        }
      }
      if (loadedQuestions.length === 0 && matchIdForConfig) {
        const { data: mData } = await supabase.from('friendly_matches').select('paper_config').eq('id', matchIdForConfig).single();
        if (mData?.paper_config?.selected_ids) {
          loadedQuestions = getQuestionsByIds(mData.paper_config.selected_ids);
        } else if (ids && ids.length > 0) {
          loadedQuestions = getQuestionsByIds(ids);
        }
      }
      if (loadedQuestions.length === 0) {
        alert('Could not load questions!');
        return;
      }
      setQuestions(loadedQuestions);
    } catch (err) {
      console.error('fetchQuestions error:', err);
    }
  };

  // ── Countdown + Host fetch ────────────────────────────────────────────────
  useEffect(() => {
    if (matchStatus === 'countdown' && isHost && questions.length === 0) {
      supabase.from('friendly_matches').select('question_ids').eq('id', matchId).single()
        .then(({ data }) => { if (data) fetchQuestions(data.question_ids, matchId); });
    }
    if (matchStatus === 'countdown') {
      let count = 3;
      const t = setInterval(() => {
        count--;
        if (count === 0) {
          clearInterval(t);
          setMatchStatus('playing');
          setTimeLeft(config.duration * 60);
        }
      }, 1000);
      return () => clearInterval(t);
    }
  }, [matchStatus, config.duration, isHost, matchId, questions.length]);

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (matchStatus === 'playing' && timeLeft !== null) {
      const t = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { clearInterval(t); submitMatch(); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [matchStatus, timeLeft]);

  // ── Progress Sync ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (matchStatus === 'playing' && channel && questions.length > 0) {
      const percentage = ((currentIndex + (isFinished ? 1 : 0)) / questions.length) * 100;
      // Broadcast immediately on progress change
      channel.send({ type: 'broadcast', event: 'progress_sync', payload: { matchId, userId: user.id, progressPercentage: percentage } });
      
      // Also maintain a heartbeat in case packets drop
      const t = setInterval(() => {
        channel.send({ type: 'broadcast', event: 'progress_sync', payload: { matchId, userId: user.id, progressPercentage: percentage } });
      }, 5000);
      return () => clearInterval(t);
    }
  }, [matchStatus, channel, currentIndex, isFinished, questions.length, matchId, user?.id]);

  // ── Submit ────────────────────────────────────────────────────────────────
  const submitMatch = async () => {
    if (matchStatus === 'submitting' || matchStatus === 'completed') return;
    setMatchStatus('submitting');
    try {
      const timeTaken = (config.duration * 60) - (timeLeft || 0);
      const formattedAnswers = Object.entries(playerAnswers).map(([qId, sel]) => ({
        question_id: qId,
        selected_option: sel,
      }));

      let calculatedScore = 0;
      let correct = 0;
      let wrong = 0;
      let skipped = 0;
      const correctMarks = parseFloat(config?.correctMarks) || 1.0;
      const wrongMarks = parseFloat(config?.wrongMarks) || 0.25;

      questions.forEach(question => {
        const selectedOpt = playerAnswers[question.id];
        if (!selectedOpt) {
          skipped++;
        } else if (selectedOpt === question.answer || selectedOpt === question.correct_answer) {
          correct++;
          calculatedScore += correctMarks;
        } else {
          wrong++;
          calculatedScore -= wrongMarks;
        }
      });

      const { data, error } = await supabase.rpc('submit_friendly_match', {
        p_match_id: matchId,
        p_answers: formattedAnswers,
        p_completion_time_seconds: timeTaken,
        p_calculated_score: calculatedScore,
        p_correct_count: correct,
        p_incorrect_count: wrong,
        p_skipped_count: skipped,
        p_accuracy: questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0,
      });
      if (error) throw error;

      // Store local stats in results for immediate rendering
      const accuracy = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
      const localMyStats = { score: calculatedScore, correct, wrong, skipped, timeTaken, accuracy };
      checkCompletion(localMyStats);
    } catch (err) {
      console.error(err);
      alert('Failed to submit match!');
      setMatchStatus('lobby');
    }
  };

  const checkCompletion = (localMyStats) => {
    let attempts = 0;
    const t = setInterval(async () => {
      attempts++;
      const { data } = await supabase
        .from('friendly_matches')
        .select('status')
        .eq('id', matchId)
        .single();

      if (data?.status === 'completed') {
        clearInterval(t);
        fetchFinalResults(localMyStats);
      }
      // After 60 seconds, show results anyway (opponent may have disconnected)
      if (attempts >= 20) {
        clearInterval(t);
        fetchFinalResults(localMyStats);
      }
    }, 3000);
  };

  const fetchFinalResults = async (localMyStats) => {
    const { data } = await supabase.from('match_results').select('*').eq('match_id', matchId);
    const meRow = data?.find(d => d.player_id === user.id);
    const themRow = data?.find(d => d.player_id !== user.id);

    let opponentUsername = 'Opponent';
    let opponentAvatar = null;
    if (themRow?.player_id) {
      const { data: oppProfile } = await supabase.from('profiles').select('username, avatar_url').eq('id', themRow.player_id).single();
      if (oppProfile) {
        opponentUsername = oppProfile.username || 'Opponent';
        opponentAvatar = oppProfile.avatar_url;
      }
    }

    const myScore = localMyStats?.score ?? meRow?.score ?? 0;
    const theirScore = themRow?.score ?? null;

    // ── CRITICAL FIX: Trust the DB is_winner flag first ──────────────
    let didWin = false;
    let isDraw = false;

    if (meRow?.is_winner !== null && meRow?.is_winner !== undefined) {
      didWin = meRow.is_winner === true;
      isDraw = meRow.is_winner === false && themRow?.is_winner === false;
    } else {
      // Fallback
      if (theirScore !== null) {
        if (parseFloat(myScore) > parseFloat(theirScore)) didWin = true;
        else if (parseFloat(myScore) === parseFloat(theirScore)) {
          const myTime = localMyStats?.timeTaken ?? meRow?.completion_time ?? Infinity;
          const theirTime = themRow?.completion_time ?? Infinity;
          if (myTime < theirTime) didWin = true;
          else if (myTime === theirTime) isDraw = true;
        }
      } else {
        didWin = localMyStats?.score != null && parseFloat(localMyStats.score) > 0;
      }
    }

    setResults({
      me: {
        score: parseFloat(myScore).toFixed(2),
        correct: localMyStats?.correct ?? meRow?.correct_count ?? 0,
        wrong: localMyStats?.wrong ?? meRow?.wrong_count ?? 0,
        skipped: localMyStats?.skipped ?? meRow?.skipped_count ?? 0,
        timeTaken: localMyStats?.timeTaken ?? meRow?.completion_time ?? 0,
        accuracy: localMyStats?.accuracy ?? meRow?.accuracy ?? 0,
        username: profile?.username || user?.user_metadata?.full_name || 'You',
        avatar: profile?.avatar_url || user?.user_metadata?.avatar_url,
      },
      them: {
        score: theirScore !== null ? parseFloat(theirScore).toFixed(2) : '—',
        correct: themRow?.correct_count ?? '—',
        wrong: themRow?.wrong_count ?? '—',
        skipped: themRow?.skipped_count ?? '—',
        timeTaken: themRow?.completion_time ?? null,
        accuracy: themRow?.accuracy ?? '—',
        username: opponentUsername,
        avatar: opponentAvatar,
      },
      didWin,
      isDraw,
      totalQuestions: questions.length,
    });
    setMatchStatus('completed');
  };

  const handleAnswer = (option) => {
    const currentQ = questions[currentIndex];
    setPlayerAnswers(prev => ({ ...prev, [currentQ.id]: option }));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      submitMatch();
    }
  };

  const formatTime = (secs) => {
    if (secs === null || secs === undefined || isNaN(secs) || secs < 0) return '--:--';
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // ╔══════════════════════════════════════════════════════════════════╗
  // ║                        LOBBY SCREEN                             ║
  // ╚══════════════════════════════════════════════════════════════════╝
  if (matchStatus === 'lobby' || matchStatus === 'creating' || matchStatus === 'joining') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: '2.8rem', marginBottom: 8, color: 'var(--violet)', fontWeight: 900 }}>
          👥 Friend Battle
        </motion.h1>
        <p style={{ color: 'var(--muted)', marginBottom: 40, fontSize: '1.1rem' }}>Compete in real-time with a friend</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Create Room */}
          <motion.div whileHover={{ y: -4 }} style={{ padding: 40, width: 300, background: 'var(--card-bg)', border: '2px solid var(--violet)', borderRadius: 20, boxShadow: '0 8px 32px rgba(124,58,237,0.15)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🏟️</div>
            <h2 style={{ margin: '0 0 8px', color: 'var(--violet)' }}>Create Room</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 24px' }}>Generate a code and invite a friend to battle.</p>
            <button className="btn-primary" onClick={createMatch} disabled={matchStatus !== 'lobby'} style={{ width: '100%', padding: 14, borderRadius: 12, fontSize: '1rem', fontWeight: 700 }}>
              {matchStatus === 'creating' ? '⏳ Generating...' : '⚔️ Create Match'}
            </button>
          </motion.div>

          {/* Join Room */}
          <motion.div whileHover={{ y: -4 }} style={{ padding: 40, width: 300, background: 'var(--card-bg)', border: '2px solid var(--border)', borderRadius: 20 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔑</div>
            <h2 style={{ margin: '0 0 8px' }}>Join Room</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 16px' }}>Enter the 5-character code from your friend.</p>
            <input
              type="text" maxLength={5} placeholder="e.g. 7GQ2K" value={joinInput}
              onChange={e => setJoinInput(e.target.value.toUpperCase())}
              style={{ width: '100%', padding: '12px 16px', fontSize: '1.4rem', textAlign: 'center', letterSpacing: '4px', textTransform: 'uppercase', background: 'var(--bg)', color: 'var(--text)', border: '2px solid var(--border)', borderRadius: 10, marginBottom: 12, boxSizing: 'border-box', outline: 'none', fontWeight: 700 }}
            />
            <button className="btn-secondary" onClick={joinMatch} disabled={matchStatus !== 'lobby'} style={{ width: '100%', padding: 14, borderRadius: 12, fontSize: '1rem', fontWeight: 700 }}>
              {matchStatus === 'joining' ? '⏳ Joining...' : '🚀 Join Match'}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ╔══════════════════════════════════════════════════════════════════╗
  // ║                   WAITING GLOBAL SCREEN                         ║
  // ╚══════════════════════════════════════════════════════════════════╝
  if (matchStatus === 'waiting_global') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', padding: 24 }}>
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ fontSize: '4rem', marginBottom: 24 }}>🌍</motion.div>
        <h2 style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: 12, fontWeight: 900 }}>Searching the Globe...</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: '1.1rem' }}>Looking for a worthy opponent to battle you instantly.</p>

        {/* Animated waiting dots */}
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{ y: [0, -10, 0], scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              style={{ width: 16, height: 16, borderRadius: '50%', background: '#10b981' }} />
          ))}
        </div>
      </div>
    );
  }

  // ╔══════════════════════════════════════════════════════════════════╗
  // ║                       WAITING SCREEN                            ║
  // ╚══════════════════════════════════════════════════════════════════╝
  if (matchStatus === 'waiting') {
    const handleCopyCode = () => {
      navigator.clipboard.writeText(roomCode).then(() => {
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      }).catch(() => {
        // fallback for older browsers
        const el = document.createElement('textarea');
        el.value = roomCode;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
      });
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', padding: 24 }}>
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} style={{ fontSize: '3rem', marginBottom: 24 }}>⏳</motion.div>
        <h2 style={{ fontSize: '2rem', color: 'var(--violet)', marginBottom: 4, fontWeight: 900 }}>Waiting for Opponent...</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: '1rem' }}>Share this code with your friend to begin the battle</p>

        {/* Room Code Box */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: '4.5rem', fontWeight: 900, letterSpacing: '12px', padding: '24px 56px', background: 'var(--card-bg)', border: '2px dashed var(--violet)', borderRadius: 20, color: 'var(--violet)', marginBottom: 12, userSelect: 'all' }}>
            {roomCode}
          </div>

          {/* Copy Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyCode}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 12, fontSize: '1rem', fontWeight: 700,
              background: copyFeedback ? '#10b981' : 'var(--violet)',
              color: '#fff', border: 'none', cursor: 'pointer',
              transition: 'background 0.25s, transform 0.1s',
              boxShadow: copyFeedback ? '0 4px 20px #10b98144' : '0 4px 20px rgba(124,58,237,0.3)',
            }}
          >
            {copyFeedback ? (
              <><span style={{ fontSize: '1.1rem' }}>✅</span> Copied!</>
            ) : (
              <><span style={{ fontSize: '1.1rem' }}>📋</span> Copy Code</>
            )}
          </motion.button>
        </motion.div>

        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: 8 }}>Match starts automatically when they join</p>

        {/* Animated waiting dots */}
        <div style={{ display: 'flex', gap: 6, marginTop: 32 }}>
          {[0, 1, 2].map(i => (
            <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
              style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--violet)' }} />
          ))}
        </div>
      </div>
    );
  }

  // ── Countdown ────────────────────────────────────────────────────────────
  if (matchStatus === 'countdown') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center' }}>
        <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} style={{ fontSize: '8rem', lineHeight: 1, color: 'var(--violet)' }}>
          ⚔️
        </motion.h1>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ fontSize: '2.5rem', marginTop: 16 }}>
          Battle Starting...
        </motion.h2>
      </div>
    );
  }

  // ── Submitting ───────────────────────────────────────────────────────────
  if (matchStatus === 'submitting') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', gap: 20 }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: 60, height: 60, border: '5px solid var(--border)', borderTop: '5px solid var(--violet)', borderRadius: '50%' }} />
        <h2 style={{ fontSize: '1.8rem', color: 'var(--violet)' }}>Waiting for Opponent...</h2>
        <p style={{ color: 'var(--muted)' }}>Your answers have been submitted. Hang tight!</p>
      </div>
    );
  }

  // ╔══════════════════════════════════════════════════════════════════╗
  // ║                       RESULT SCREEN                             ║
  // ╚══════════════════════════════════════════════════════════════════╝
  if (matchStatus === 'completed' && results) {
    const { me, them, didWin, isDraw, totalQuestions } = results;
    const outcomeColor = isDraw ? '#f59e0b' : didWin ? '#10b981' : '#ef4444';
    const outcomeLabel = isDraw ? 'DRAW' : didWin ? 'VICTORY!' : 'DEFEAT';
    const outcomeEmoji = didWin ? (
      <img src="/trophy.png" alt="Victory Trophy" style={{ width: 140, height: 140, objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(16, 185, 129, 0.3))' }} />
    ) : isDraw ? '🤝' : '💀';
    const outcomeMsg = isDraw
      ? 'Both players are equally matched — incredible!'
      : didWin
        ? 'You outperformed your opponent — outstanding!'
        : 'Better luck next time! Keep practising to sharpen your skills.';

    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Confetti on Win */}
        {didWin && <Confetti />}

        {/* Background accent glow */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 6,
          background: `linear-gradient(90deg, transparent, ${outcomeColor}, transparent)`,
          zIndex: 20,
        }} />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          style={{ width: '100%', maxWidth: 680, position: 'relative', zIndex: 10 }}
        >
          {/* ── Outcome Banner ─────────────────────────────────── */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
            style={{
              background: 'var(--card-bg)',
              borderRadius: 24,
              padding: '32px 24px 28px',
              textAlign: 'center',
              marginBottom: 16,
              border: `2px solid ${outcomeColor}55`,
              boxShadow: `0 12px 40px ${outcomeColor}22`,
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
              style={{ fontSize: '4rem', lineHeight: 1, marginBottom: 10 }}
            >
              {outcomeEmoji}
            </motion.div>
            <h1 style={{
              margin: '0 0 8px', fontSize: '2.6rem', fontWeight: 900,
              letterSpacing: '3px', color: outcomeColor,
            }}>
              {outcomeLabel}
            </h1>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--muted)' }}>{outcomeMsg}</p>
          </motion.div>

          {/* ── Score Duel ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: '24px 20px',
              marginBottom: 14,
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 12 }}>
              {/* Me */}
              <div style={{ textAlign: 'center' }}>
                {me.avatar ? (
                  <img src={me.avatar} alt="you" style={{ width: 60, height: 60, borderRadius: '50%', border: `3px solid ${outcomeColor}`, objectFit: 'cover', marginBottom: 8 }} />
                ) : (
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 8px', border: `3px solid ${outcomeColor}`, color: '#fff', fontWeight: 800 }}>
                    {(me.username || 'Y')[0].toUpperCase()}
                  </div>
                )}
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 4, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {me.username}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.5 }}
                  style={{ fontSize: '3.5rem', fontWeight: 900, color: parseFloat(me.score) >= 0 ? '#10b981' : '#ef4444', lineHeight: 1 }}
                >
                  {me.score}
                </motion.div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 4 }}>⏱ {formatTime(me.timeTaken)}</div>
                {didWin && <div style={{ marginTop: 6, fontSize: '0.75rem', background: '#10b98122', color: '#10b981', border: '1px solid #10b98144', borderRadius: 20, padding: '2px 10px', display: 'inline-block', fontWeight: 700 }}>WINNER 🏆</div>}
              </div>

              {/* VS */}
              <div style={{ textAlign: 'center', padding: '0 8px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--muted)', letterSpacing: '2px', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8 }}>VS</div>
              </div>

              {/* Them */}
              <div style={{ textAlign: 'center' }}>
                {them.avatar ? (
                  <img src={them.avatar} alt="opponent" style={{ width: 60, height: 60, borderRadius: '50%', border: '3px solid rgba(255,255,255,0.2)', objectFit: 'cover', marginBottom: 8 }} />
                ) : (
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '3px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 8px', color: '#fff' }}>
                    {(them.username || 'O')[0].toUpperCase()}
                  </div>
                )}
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {them.username}
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.6 }}
                  style={{ fontSize: '3.5rem', fontWeight: 900, color: them.score === '—' ? 'rgba(255,255,255,0.3)' : (parseFloat(them.score) >= 0 ? '#10b981' : '#ef4444'), lineHeight: 1 }}
                >
                  {them.score}
                </motion.div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                  ⏱ {them.timeTaken ? formatTime(them.timeTaken) : '—:—'}
                </div>
                {!didWin && !isDraw && <div style={{ marginTop: 6, fontSize: '0.75rem', background: '#10b98122', color: '#10b981', border: '1px solid #10b98144', borderRadius: 20, padding: '2px 10px', display: 'inline-block', fontWeight: 700 }}>WINNER 🏆</div>}
              </div>
            </div>
          </motion.div>

          {/* ── Detailed Stats ────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            {/* My Stats */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, textAlign: 'center', fontWeight: 700 }}>Your Stats</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {[
                  { label: 'Correct', value: `${me.correct}/${totalQuestions}`, color: '#10b981' },
                  { label: 'Wrong', value: me.wrong, color: '#ef4444' },
                  { label: 'Skipped', value: me.skipped, color: '#f59e0b' },
                  { label: 'Accuracy', value: `${me.accuracy}%`, color: 'var(--violet)' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color }}>{value}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: 2, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Their Stats */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: '16px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12, textAlign: 'center', fontWeight: 700 }}>{them.username}'s Stats</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {[
                  { label: 'Correct', value: them.correct !== '—' ? `${them.correct}/${totalQuestions}` : '—', color: '#10b981' },
                  { label: 'Wrong', value: them.wrong, color: '#ef4444' },
                  { label: 'Skipped', value: them.skipped, color: '#f59e0b' },
                  { label: 'Accuracy', value: them.accuracy !== '—' ? `${them.accuracy}%` : '—', color: 'var(--violet)' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ background: 'var(--bg)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color }}>{value}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: 2, textTransform: 'uppercase', fontWeight: 600 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Score formula note ────────────────────────────── */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 20px', marginBottom: 20, fontSize: '0.82rem', color: 'var(--muted)', textAlign: 'center' }}
          >
            <span style={{ color: '#10b981', fontWeight: 600 }}>+1</span> correct &nbsp;·&nbsp;
            <span style={{ color: '#ef4444', fontWeight: 600 }}>−0.25</span> wrong &nbsp;·&nbsp;
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>0</span> skipped &nbsp;&nbsp;|&nbsp;&nbsp;
            Your time: <strong style={{ color: 'var(--text)' }}>{formatTime(me.timeTaken)}</strong>
          </motion.div>

          {/* ── Action Buttons ────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => setMatchStatus('lobby')}
              style={{
                padding: '13px 28px', fontSize: '0.95rem', fontWeight: 700, borderRadius: 12,
                background: 'var(--card-bg)', color: 'var(--text)', border: '1px solid var(--border)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--violet)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              🔄 Play Again
            </button>
            <button
              onClick={() => navigate('')}
              className="btn-primary"
              style={{ padding: '13px 28px', fontSize: '0.95rem', fontWeight: 700, borderRadius: 12, cursor: 'pointer' }}
            >
              🏠 Return Home
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ╔══════════════════════════════════════════════════════════════════╗
  // ║                     PLAYING ARENA SCREEN                        ║
  // ╚══════════════════════════════════════════════════════════════════╝
  const currentQ = questions[currentIndex];
  const pProg = ((currentIndex + (isFinished ? 1 : 0)) / (questions.length || 1)) * 100;
  const isLowTime = timeLeft !== null && timeLeft < 60;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Header */}
      <header style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--card-bg)', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0, color: 'var(--violet)', fontSize: '1.1rem', fontWeight: 800, letterSpacing: '1px' }}>⚔️ FRIEND BATTLE</h2>
          <div style={{
            fontSize: '1.2rem', fontWeight: 800, padding: '6px 16px', borderRadius: 10,
            background: isLowTime ? '#ef444422' : 'var(--bg)',
            color: isLowTime ? '#ef4444' : 'var(--text)',
            border: `2px solid ${isLowTime ? '#ef4444' : 'var(--border)'}`,
            transition: 'all 0.3s',
          }}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'You', progress: pProg, color: '#10b981' },
            { label: 'Opponent', progress: opponentProgress, color: '#f59e0b' },
          ].map(({ label, progress, color }) => (
            <div key={label} style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 4, fontWeight: 600 }}>
                <span>{label}</span><span>{Math.round(progress)}%</span>
              </div>
              <div style={{ width: '100%', height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} style={{ height: '100%', background: color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'right' }}>
          Q {currentIndex + 1} / {questions.length}
        </div>
      </header>

      {/* Question Area */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '28px 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {currentQ ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                  {currentQ.category && (
                    <span style={{ padding: '4px 10px', borderRadius: 6, background: 'var(--border)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600, color: 'var(--muted)' }}>
                      {currentQ.category}
                    </span>
                  )}
                  {currentQ.difficulty && (
                    <span style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600,
                      background: currentQ.difficulty === 'hard' ? '#ef444418' : currentQ.difficulty === 'medium' ? '#f59e0b18' : '#10b98118',
                      color: currentQ.difficulty === 'hard' ? '#ef4444' : currentQ.difficulty === 'medium' ? '#f59e0b' : '#10b981',
                    }}>
                      {currentQ.difficulty}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.3rem', lineHeight: '1.7', marginBottom: 28, fontWeight: 600 }}>
                  {currentQ.question}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {(currentQ.options || []).map((opt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt)}
                      style={{
                        padding: '18px 20px', borderRadius: 14, border: '2px solid var(--border)',
                        background: 'var(--card-bg)', color: 'var(--text)', cursor: 'pointer',
                        textAlign: 'left', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 16,
                        transition: 'border-color 0.15s',
                      }}
                      onMouseOver={e => e.currentTarget.style.borderColor = 'var(--violet)'}
                      onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%', background: 'var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '0.85rem', flexShrink: 0, color: 'var(--text)',
                      }}>
                        {['A', 'B', 'C', 'D'][idx]}
                      </div>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div style={{ textAlign: 'center', marginTop: 80, color: 'var(--muted)' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>⏳</div>
              Loading questions...
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FriendBattlePage;
