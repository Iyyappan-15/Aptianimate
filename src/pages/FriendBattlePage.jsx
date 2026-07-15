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
      const t = setInterval(() => {
        const percentage = ((currentIndex + (isFinished ? 1 : 0)) / questions.length) * 100;
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

    // Build rich result object using both local calculation + DB data
    const myScore = localMyStats?.score ?? meRow?.score ?? 0;
    const theirScore = themRow?.score ?? null; // null = they haven't finished yet

    // Determine winner properly: higher score wins; if equal, shorter time wins
    let didWin = false;
    let isDraw = false;
    if (theirScore !== null) {
      if (myScore > theirScore) didWin = true;
      else if (myScore === theirScore) {
        const myTime = localMyStats?.timeTaken ?? meRow?.completion_time ?? Infinity;
        const theirTime = themRow?.completion_time ?? Infinity;
        if (myTime < theirTime) didWin = true;
        else if (myTime === theirTime) isDraw = true;
      }
    } else {
      // Opponent hasn't submitted — if match is completed we won by default
      didWin = true;
    }

    setResults({
      me: {
        score: parseFloat(myScore).toFixed(2),
        correct: localMyStats?.correct ?? 0,
        wrong: localMyStats?.wrong ?? 0,
        skipped: localMyStats?.skipped ?? 0,
        timeTaken: localMyStats?.timeTaken ?? meRow?.completion_time ?? 0,
        accuracy: localMyStats?.accuracy ?? 0,
        username: profile?.username || user?.user_metadata?.full_name || 'You',
        avatar: profile?.avatar_url || user?.user_metadata?.avatar_url,
      },
      them: {
        score: theirScore !== null ? parseFloat(theirScore).toFixed(2) : '—',
        timeTaken: themRow?.completion_time ?? null,
        username: 'Opponent',
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
  // ║                       WAITING SCREEN                            ║
  // ╚══════════════════════════════════════════════════════════════════╝
  if (matchStatus === 'waiting') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', padding: 24 }}>
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ fontSize: '3rem', marginBottom: 24 }}>⏳</motion.div>
        <h2 style={{ fontSize: '2rem', color: 'var(--violet)', marginBottom: 8 }}>Waiting for Opponent...</h2>
        <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Share this code with your friend:</p>
        <motion.div
          initial={{ scale: 0.8 }} animate={{ scale: 1 }}
          style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '10px', padding: '20px 48px', background: 'var(--card-bg)', border: '2px dashed var(--violet)', borderRadius: 20, color: 'var(--violet)', marginBottom: 20 }}
        >
          {roomCode}
        </motion.div>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Match starts automatically when they join</p>
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
  // ║                    PREMIUM RESULT SCREEN                        ║
  // ╚══════════════════════════════════════════════════════════════════╝
  if (matchStatus === 'completed' && results) {
    const { me, them, didWin, isDraw, totalQuestions } = results;
    const outcomeColor = isDraw ? '#f59e0b' : didWin ? '#10b981' : '#ef4444';
    const outcomeGradient = isDraw
      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
      : didWin
        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        : 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)';

    return (
      <div style={{
        minHeight: '100vh',
        background: isDraw
          ? 'linear-gradient(160deg, #1c1a0a 0%, #292300 60%, #0d0d0d 100%)'
          : didWin
            ? 'linear-gradient(160deg, #021a0e 0%, #042c1a 60%, #0d0d0d 100%)'
            : 'linear-gradient(160deg, #160728 0%, #2a0f54 60%, #0d0d0d 100%)',
        color: '#fff',
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

        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${outcomeColor}22 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          style={{ width: '100%', maxWidth: 680, position: 'relative', zIndex: 10 }}
        >
          {/* ── Outcome Banner ─────────────────────────────────── */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            style={{
              background: outcomeGradient,
              borderRadius: 24,
              padding: '32px 24px 28px',
              textAlign: 'center',
              marginBottom: 20,
              boxShadow: `0 20px 60px ${outcomeColor}44`,
            }}
          >
            <div style={{ fontSize: '4.5rem', lineHeight: 1, marginBottom: 8 }}>
              {isDraw ? '🤝' : didWin ? '🏆' : '🎯'}
            </div>
            <h1 style={{ margin: 0, fontSize: '2.8rem', fontWeight: 900, letterSpacing: '2px', textShadow: '0 4px 12px rgba(0,0,0,0.4)' }}>
              {isDraw ? 'IT\'S A DRAW!' : didWin ? 'VICTORY!' : 'WELL PLAYED!'}
            </h1>
            <p style={{ margin: '8px 0 0', fontSize: '1rem', opacity: 0.85 }}>
              {isDraw
                ? 'Both players are equally matched — incredible!'
                : didWin
                  ? 'You outperformed your opponent — outstanding!'
                  : 'Great effort! Keep practising to improve your score.'}
            </p>
          </motion.div>

          {/* ── Score Duel ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: '28px 24px',
              marginBottom: 20,
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16 }}>
              {/* Me */}
              <div style={{ textAlign: 'center' }}>
                {me.avatar ? (
                  <img src={me.avatar} alt="you" style={{ width: 60, height: 60, borderRadius: '50%', border: `3px solid ${outcomeColor}`, objectFit: 'cover', marginBottom: 8 }} />
                ) : (
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: outcomeGradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 8px', border: `3px solid ${outcomeColor}` }}>
                    {(me.username || 'Y')[0].toUpperCase()}
                  </div>
                )}
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
                  ⏱ {formatTime(me.timeTaken)}
                </div>
              </div>

              {/* VS */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>VS</div>
              </div>

              {/* Them */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '3px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 8px' }}>
                  👤
                </div>
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
                  ⏱ {formatTime(them.timeTaken)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Detailed Stats ────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            <StatCard label="Correct" value={`${me.correct}/${totalQuestions}`} color="#10b981" delay={0.4} />
            <StatCard label="Wrong" value={me.wrong} color="#ef4444" delay={0.45} />
            <StatCard label="Skipped" value={me.skipped} color="#f59e0b" delay={0.5} />
            <StatCard label="Accuracy" value={`${me.accuracy}%`} color="#7c3aed" delay={0.55} />
          </div>

          {/* ── Score Breakdown ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16,
              padding: '16px 24px',
              marginBottom: 24,
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'center',
              lineHeight: '1.8',
            }}
          >
            Score formula: <span style={{ color: '#10b981' }}>+1 per correct</span> · <span style={{ color: '#ef4444' }}>−0.25 per wrong</span> · <span style={{ color: '#f59e0b' }}>0 for skipped</span>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            Time: <span style={{ color: 'rgba(255,255,255,0.7)' }}>{formatTime(me.timeTaken)}</span>
          </motion.div>

          {/* ── Action Buttons ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => setMatchStatus('lobby')}
              style={{
                padding: '14px 32px', fontSize: '1rem', fontWeight: 700, borderRadius: 14,
                background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              🔄 Play Again
            </button>
            <button
              onClick={() => navigate('')}
              style={{
                padding: '14px 32px', fontSize: '1rem', fontWeight: 700, borderRadius: 14,
                background: outcomeGradient, color: '#fff', border: 'none',
                cursor: 'pointer', boxShadow: `0 8px 24px ${outcomeColor}55`, transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
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
