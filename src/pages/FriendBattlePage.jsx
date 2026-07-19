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

  // Feature States
  const cheatCountRef = useRef(0);
  const [cheatWarning, setCheatWarning] = useState('');
  const [globalSearchTimer, setGlobalSearchTimer] = useState(60);
  const [rematchRequested, setRematchRequested] = useState(false);
  const [opponentRematchRequested, setOpponentRematchRequested] = useState(false);
  const [rematchCountdown, setRematchCountdown] = useState(0);

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
      .on('broadcast', { event: 'rematch_request' }, (event) => {
        if (event.payload.matchId === matchId && event.payload.userId !== user?.id) {
          setOpponentRematchRequested(true);
        }
      })
      .on('broadcast', { event: 'rematch_accepted' }, (event) => {
        if (event.payload.matchId === matchId && event.payload.userId !== user?.id) {
          window.location.hash = `/battle/friend?match=${event.payload.newMatchId}${event.payload.isGlobal ? '&global=true' : ''}`;
          window.location.reload();
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

  // ── Rematch Logic ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (rematchRequested && opponentRematchRequested && isHost) {
      createRematch();
    }
  }, [rematchRequested, opponentRematchRequested, isHost]);

  const createRematch = async () => {
    const selected = getRandomQuestions(config);
    const matchConfig = { ...config, selected_ids: selected.map(q => q.id) };
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const isGlobal = window.location.hash.includes('global=true');
    
    const { data: newMatch, error } = await supabase
        .from('friendly_matches')
        .insert([{
          host_id: user.id,
          status: isGlobal ? 'lobby' : 'waiting', // Wait, global rematch host directly to lobby since guest will join immediately
          question_ids: selected.map(q => q.id),
          join_code: joinCode,
          paper_config: matchConfig
        }])
        .select()
        .single();
        
    if (!error && channel) {
       channel.send({ type: 'broadcast', event: 'rematch_accepted', payload: { matchId, userId: user.id, newMatchId: newMatch.id, isGlobal } });
       window.location.hash = `/battle/friend?match=${newMatch.id}${isGlobal ? '&global=true' : ''}`;
       window.location.reload();
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
      channel.send({ type: 'broadcast', event: 'progress_sync', payload: { matchId, userId: user.id, progressPercentage: percentage } });
      const t = setInterval(() => {
        channel.send({ type: 'broadcast', event: 'progress_sync', payload: { matchId, userId: user.id, progressPercentage: percentage } });
      }, 5000);
      return () => clearInterval(t);
    }
  }, [matchStatus, channel, currentIndex, isFinished, questions.length, matchId, user?.id]);

  // ── Anti-Cheat: Tab Visibility ─────────────────────────────────────────────
  useEffect(() => {
    if (matchStatus !== 'playing') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cheatCountRef.current += 1;
        const count = cheatCountRef.current;
        if (count === 1) {
          // First offence: warn
          // We use a custom in-page flag rather than alert() to avoid blocking
          setCheatWarning('⚠️ Warning! Switching tabs is not allowed. Next violation will auto-submit.');
          setTimeout(() => setCheatWarning(''), 5000);
        } else {
          // Second offence: auto-submit as forfeit
          setCheatWarning('🚨 Cheat detected! Auto-submitting your match.');
          setTimeout(() => { submitMatch(); }, 1500);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [matchStatus]);

  // ── Global Matchmaking: 60s Timeout ──────────────────────────────────────
  useEffect(() => {
    if (matchStatus !== 'waiting_global') return;
    setGlobalSearchTimer(60);
    const t = setInterval(() => {
      setGlobalSearchTimer(prev => {
        if (prev <= 1) {
          clearInterval(t);
          // Cleanup the waiting match and redirect to AI battle
          if (matchId) {
            supabase.from('friendly_matches').delete().eq('id', matchId).then(() => {});
          }
          navigate('battle');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [matchStatus, matchId]);

  // ── Rematch: Start 10s countdown when results appear ──────────────────────
  useEffect(() => {
    if (matchStatus !== 'completed' || !results) return;
    setRematchCountdown(10);
    const t = setInterval(() => {
      setRematchCountdown(prev => {
        if (prev <= 1) { clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [matchStatus, results]);

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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 4px 12px rgba(124,58,237,0.4))' }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <h1 style={{ fontSize: '2.8rem', margin: 0, color: 'var(--violet)', fontWeight: 900 }}>
            Friend Battle
          </h1>
        </motion.div>
        <p style={{ color: 'var(--muted)', marginBottom: 40, fontSize: '1.1rem' }}>Compete in real-time with a friend</p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Create Room */}
          <motion.div whileHover={{ y: -4 }} style={{ padding: 40, width: 300, background: 'var(--card-bg)', border: '2px solid var(--violet)', borderRadius: 20, boxShadow: '0 8px 32px rgba(124,58,237,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', color: 'var(--violet)', marginBottom: '16px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <h2 style={{ margin: '0 0 8px', color: 'var(--violet)' }}>Create Room</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 24px' }}>Generate a code and invite a friend to battle.</p>
            <button className="btn-primary" onClick={createMatch} disabled={matchStatus !== 'lobby'} style={{ width: '100%', padding: 14, borderRadius: 12, fontSize: '1rem', fontWeight: 700 }}>
              {matchStatus === 'creating' ? '⏳ Generating...' : '⚔️ Create Match'}
            </button>
          </motion.div>

          {/* Join Room */}
          <motion.div whileHover={{ y: -4 }} style={{ padding: 40, width: 300, background: 'var(--card-bg)', border: '2px solid var(--border)', borderRadius: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', marginBottom: '16px' }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </div>
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
    const cancelSearch = async () => {
      if (matchId) {
        await supabase.from('friendly_matches').delete().eq('id', matchId);
      }
      navigate('battle');
    };

    const timerColor = globalSearchTimer <= 15 ? '#ef4444' : globalSearchTimer <= 30 ? '#f59e0b' : '#10b981';
    const circumference = 2 * Math.PI * 36;
    const dashoffset = circumference * (1 - globalSearchTimer / 60);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', padding: 24 }}>
        {/* Animated Globe */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          style={{ fontSize: '3.5rem', marginBottom: 20 }}
        >
          🌍
        </motion.div>

        <h2 style={{ fontSize: '2.2rem', color: '#10b981', marginBottom: 8, fontWeight: 900 }}>Searching the Globe...</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 36, fontSize: '1rem', maxWidth: 360 }}>
          Looking for a worthy opponent worldwide. Hang tight!
        </p>

        {/* SVG Countdown Ring */}
        <div style={{ position: 'relative', width: 100, height: 100, marginBottom: 28 }}>
          <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="36" fill="none" stroke="var(--border)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="36" fill="none"
              stroke={timerColor}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.5s' }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', fontWeight: 900, color: timerColor,
          }}>
            {globalSearchTimer}
          </div>
        </div>

        {/* Animated dots */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 40 }}>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0], scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.2 }}
              style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }}
            />
          ))}
        </div>

        {/* Cancel Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={cancelSearch}
          style={{
            padding: '13px 36px', borderRadius: 12, fontSize: '0.95rem', fontWeight: 700,
            background: 'var(--card-bg)', color: '#ef4444',
            border: '2px solid #ef444440', cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = '#ef4444'}
          onMouseOut={e => e.currentTarget.style.borderColor = '#ef444440'}
        >
          ✕ Cancel Search
        </motion.button>

        {globalSearchTimer <= 10 && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: '#f59e0b', marginTop: 20, fontSize: '0.9rem', fontWeight: 600 }}
          >
            No opponent found yet. You'll be returned to the lobby in {globalSearchTimer}s.
          </motion.p>
        )}
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
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} style={{ marginBottom: '16px' }}>
          <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 10px 25px rgba(124,58,237,0.5))' }}>
            <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
            <line x1="13" y1="19" x2="19" y2="13" />
            <line x1="16" y1="16" x2="20" y2="20" />
            <line x1="19" y1="21" x2="21" y2="19" />
            <polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5" />
            <line x1="5" y1="14" x2="9" y2="18" />
            <line x1="7" y1="17" x2="4" y2="20" />
            <line x1="3" y1="19" x2="5" y2="21" />
          </svg>
        </motion.div>
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
    const outcomeLabel = isDraw ? 'Draw' : didWin ? 'Victory' : 'Defeat';
    const outcomeMsg = isDraw
      ? 'Both players are equally matched.'
      : didWin
        ? 'You outperformed your opponent.'
        : 'Better luck next time. Keep practising!';

    const outcomeIcon = didWin ? (
      <img src="/trophy.png" alt="Victory Trophy" style={{ width: 120, height: 120, objectFit: 'contain' }} />
    ) : isDraw ? (
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={outcomeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 17a4 4 0 0 0 4-4V5H7v8a4 4 0 0 0 4 4z" />
        <path d="M5 9H3a2 2 0 0 0 0 4h2" />
        <path d="M19 9h2a2 2 0 0 1 0 4h-2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ) : (
      <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke={outcomeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    );

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
      }}>
        {didWin && <Confetti numberOfPieces={180} recycle={false} />}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: 680 }}
        >

          {/* ── Outcome Header ─────────────────────────────── */}
          <div style={{
            textAlign: 'center',
            marginBottom: 32,
            paddingBottom: 28,
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
              style={{ marginBottom: 16 }}
            >
              {outcomeIcon}
            </motion.div>
            <h1 style={{
              margin: '0 0 8px',
              fontSize: '2.8rem',
              fontWeight: 800,
              color: outcomeColor,
              letterSpacing: '1px',
            }}>
              {outcomeLabel}
            </h1>
            <p style={{ margin: 0, fontSize: '1rem', color: 'var(--muted)', fontWeight: 500 }}>
              {outcomeMsg}
            </p>
          </div>

          {/* ── Score Duel ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '28px 24px',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Me */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              {me.avatar ? (
                <img src={me.avatar} alt="you" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${didWin ? outcomeColor : 'var(--border)'}`, marginBottom: 10 }} />
              ) : (
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', border: `3px solid ${didWin ? outcomeColor : 'var(--border)'}`, color: '#fff', fontWeight: 800, margin: '0 auto 10px' }}>
                  {(me.username || 'Y')[0].toUpperCase()}
                </div>
              )}
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{me.username}</div>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: didWin ? outcomeColor : 'var(--text)', lineHeight: 1 }}>{me.score}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 6 }}>⏱ {formatTime(me.timeTaken)}</div>
              {didWin && (
                <div style={{ marginTop: 8, display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, color: outcomeColor, border: `1px solid ${outcomeColor}`, borderRadius: 20, padding: '2px 10px', letterSpacing: '0.5px' }}>WINNER</div>
              )}
            </div>

            {/* VS divider */}
            <div style={{ padding: '0 16px', textAlign: 'center' }}>
              <div style={{ width: 1, height: 70, background: 'var(--border)', margin: '0 auto 8px' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '2px' }}>VS</span>
              <div style={{ width: 1, height: 70, background: 'var(--border)', margin: '8px auto 0' }} />
            </div>

            {/* Them */}
            <div style={{ flex: 1, textAlign: 'center' }}>
              {them.avatar ? (
                <img src={them.avatar} alt="opponent" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: `3px solid ${!didWin && !isDraw ? outcomeColor : 'var(--border)'}`, marginBottom: 10 }} />
              ) : (
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', border: `3px solid ${!didWin && !isDraw ? outcomeColor : 'var(--border)'}`, color: 'var(--text)', fontWeight: 800, margin: '0 auto 10px' }}>
                  {(them.username || 'O')[0].toUpperCase()}
                </div>
              )}
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{them.username}</div>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: !didWin && !isDraw ? outcomeColor : 'var(--text)', lineHeight: 1 }}>{them.score}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: 6 }}>⏱ {them.timeTaken ? formatTime(them.timeTaken) : '—:—'}</div>
              {!didWin && !isDraw && (
                <div style={{ marginTop: 8, display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, color: outcomeColor, border: `1px solid ${outcomeColor}`, borderRadius: 20, padding: '2px 10px', letterSpacing: '0.5px' }}>WINNER</div>
              )}
            </div>
          </motion.div>

          {/* ── Stats Grid ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}
          >
            {[{ label: 'Your Stats', data: [
                { key: 'Correct', val: `${me.correct}/${totalQuestions}`, color: '#10b981' },
                { key: 'Wrong', val: me.wrong, color: '#ef4444' },
                { key: 'Skipped', val: me.skipped, color: '#f59e0b' },
                { key: 'Accuracy', val: `${me.accuracy}%`, color: 'var(--violet)' },
              ]}, { label: `${them.username}'s Stats`, data: [
                { key: 'Correct', val: them.correct !== '—' ? `${them.correct}/${totalQuestions}` : '—', color: '#10b981' },
                { key: 'Wrong', val: them.wrong, color: '#ef4444' },
                { key: 'Skipped', val: them.skipped, color: '#f59e0b' },
                { key: 'Accuracy', val: them.accuracy !== '—' ? `${them.accuracy}%` : '—', color: 'var(--violet)' },
              ]}
            ].map(({ label, data }) => (
              <div key={label} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 14, padding: '18px 16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: 14, textAlign: 'center' }}>{label}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {data.map(({ key, val, color }) => (
                    <div key={key} style={{ textAlign: 'center', padding: '10px 6px', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 800, color: val === '—' ? 'var(--muted)' : color }}>{val}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600 }}>{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ── Rematch Banner ─────────────────────────────── */}
          <AnimatePresence>
            {rematchCountdown > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderLeft: `3px solid var(--violet)`,
                  borderRadius: 12,
                  padding: '16px 20px',
                  marginBottom: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                    {opponentRematchRequested ? 'Opponent wants a rematch!' : 'Rematch available'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
                    {rematchRequested
                      ? (opponentRematchRequested ? 'Starting...' : `Waiting for opponent (${rematchCountdown}s)`)
                      : `Offer expires in ${rematchCountdown}s`}
                  </div>
                </div>
                {!rematchRequested && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRematchRequested(true);
                      if (channel) {
                        channel.send({ type: 'broadcast', event: 'rematch_request', payload: { matchId, userId: user.id } });
                      }
                    }}
                    style={{
                      padding: '10px 22px', borderRadius: 10, fontSize: '0.9rem', fontWeight: 700,
                      background: 'var(--violet)', color: '#fff', border: 'none', cursor: 'pointer',
                      flexShrink: 0, transition: 'opacity 0.2s',
                    }}
                  >
                    Accept Rematch
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Action Buttons ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center' }}
          >
            <button
              onClick={() => setMatchStatus('lobby')}
              style={{
                padding: '12px 28px', fontSize: '0.9rem', fontWeight: 700, borderRadius: 10,
                background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)',
                cursor: 'pointer', transition: 'border-color 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--violet)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              Play Again
            </button>
            <button
              onClick={() => navigate('')}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '0.9rem', fontWeight: 700, borderRadius: 10, cursor: 'pointer' }}
            >
              Return Home
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
      {/* Anti-Cheat Warning Banner */}
      <AnimatePresence>
        {cheatWarning && (
          <motion.div
            key="cheat-warn"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
              background: cheatWarning.includes('Cheat detected') ? '#ef4444' : '#f59e0b',
              color: '#fff', textAlign: 'center',
              padding: '14px 24px', fontSize: '1rem', fontWeight: 700,
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            {cheatWarning}
          </motion.div>
        )}
      </AnimatePresence>

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
          {/* If player finished all questions, show a waiting spinner (not "Loading") */}
          {isFinished || !currentQ ? (
            <div style={{ textAlign: 'center', marginTop: 80, color: 'var(--muted)' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{ width: 48, height: 48, border: '4px solid var(--border)', borderTop: '4px solid var(--violet)', borderRadius: '50%', margin: '0 auto 20px' }}
              />
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>Waiting for opponent...</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>You’ve answered all questions. Hang tight!</div>
            </div>
          ) : (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default FriendBattlePage;
