import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { getRandomQuestions, getQuestionsByIds } from '../data/aiBank';

const FriendBattlePage = ({ navigate }) => {
  const { user, profile } = useAuth();
  const [matchStatus, setMatchStatus] = useState('lobby'); // lobby | creating | joining | waiting | countdown | playing | submitting | completed
  const [roomCode, setRoomCode] = useState('');
  const [joinInput, setJoinInput] = useState('');
  const [matchId, setMatchId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [channel, setChannel] = useState(null);
  
  // Custom config
  const [config, setConfig] = useState({
    categories: {
      "Quantitative Aptitude": 10,
      "Logical Reasoning": 10,
      "Verbal Ability": 5,
      "Technical": 5
    },
    difficulty: { easy: 40, medium: 40, hard: 20 },
    duration: 30, // minutes
  });

  // Arena State
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerProgress, setPlayerProgress] = useState(0);
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [playerAnswers, setPlayerAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [results, setResults] = useState(null);

  // Initialize Realtime Channel
  useEffect(() => {
    if (!matchId) return;
    
    // Global channel, filter by matchId
    const battleChannel = supabase.channel('battle-events');
    
    battleChannel
      .on('broadcast', { event: 'progress_sync' }, (payload) => {
        if (payload.matchId === matchId && payload.userId !== user?.id) {
          setOpponentProgress(payload.progressPercentage);
        }
      })
      .on('broadcast', { event: 'status_change' }, (payload) => {
        if (payload.matchId === matchId) {
          setMatchStatus(payload.newStatus);
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log("Subscribed to battle-events");
          
          // If we just joined as a guest, we broadcast that we joined AFTER subscribing successfully!
          if (!isHost && matchStatus === 'joining') {
             battleChannel.send({
                type: 'broadcast',
                event: 'status_change',
                payload: { matchId, newStatus: 'countdown' }
             });
             setMatchStatus('countdown');
          }
        }
      });
      
    setChannel(battleChannel);
    
    return () => {
      supabase.removeChannel(battleChannel);
    };
  }, [matchId, isHost, user?.id]);

  const createMatch = async () => {
    if (!user) return alert("Please login first");
    setMatchStatus('creating');
    try {
      // Use local bank for questions to avoid DB issues
      const selected = getRandomQuestions(config);
      const selectedIds = selected.map(q => q.id);
      
      const matchConfig = { ...config, selected_ids: selectedIds };

      const { data, error } = await supabase.rpc('create_friendly_match', { p_config: matchConfig });
      if (error) throw error;
      
      setRoomCode(data.join_code);
      setMatchId(data.match_id);
      setIsHost(true);
      setMatchStatus('waiting');
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to create match");
      setMatchStatus('lobby');
    }
  };

  const joinMatch = async () => {
    if (!user) return alert("Please login first");
    if (!joinInput || joinInput.length !== 5) return alert("Invalid room code");
    
    setMatchStatus('joining');
    try {
      const { data, error } = await supabase.rpc('join_friendly_match', { p_join_code: joinInput.toUpperCase() });
      if (error) throw error;
      
      setRoomCode(joinInput.toUpperCase());
      setMatchId(data.match_id);
      setIsHost(false);
      
      // Safely ensure we have question_ids
      let qIds = data?.question_ids;
      if (!qIds || qIds.length === 0) {
        const { data: matchData } = await supabase.from('friendly_matches').select('question_ids').eq('id', data.match_id).single();
        qIds = matchData?.question_ids || [];
      }
      
      if (qIds.length > 0) {
        await fetchQuestions(qIds, data.match_id);
      } else {
        // Even if qIds is empty, we pass empty array so fallback can trigger!
        await fetchQuestions([], data.match_id);
      }
      
      // We don't set status to countdown here anymore!
      // It is handled safely inside the useEffect's .subscribe() callback once the channel is ready!
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to join match");
      setMatchStatus('lobby');
    }
  };

  const fetchQuestions = async (ids, matchIdForConfig) => {
    try {
      // We first try to load from the DB table just in case the backend successfully mapped it
      let loadedQuestions = [];
      
      if (ids && ids.length > 0) {
        const { data, error } = await supabase
          .from('assessment_questions')
          .select('*')
          .in('id', ids);
          
        if (!error && data && data.length > 0) {
          loadedQuestions = ids.map(id => data.find(q => q.id === id)).filter(Boolean);
        }
      }
      
      // FALLBACK: If DB fails or returns empty (RLS or missing data), use local AI Bank!
      if (loadedQuestions.length === 0 && matchIdForConfig) {
         console.warn("DB questions empty, falling back to local aiBank...");
         const { data: mData } = await supabase.from('friendly_matches').select('paper_config').eq('id', matchIdForConfig).single();
         if (mData?.paper_config?.selected_ids) {
            loadedQuestions = getQuestionsByIds(mData.paper_config.selected_ids);
         } else if (ids && ids.length > 0) {
            // Last resort: just grab local questions by the IDs if they happen to be string IDs!
            loadedQuestions = getQuestionsByIds(ids);
         }
      }

      if (loadedQuestions.length === 0) {
         alert("Could not load questions! The match cannot start properly.");
         return;
      }

      setQuestions(loadedQuestions);
    } catch (err) {
      console.error("fetchQuestions error:", err);
      alert("Failed to fetch questions: " + err.message);
    }
  };

  useEffect(() => {
    // If we are host and status changes to countdown via broadcast, we must fetch questions too
    if (matchStatus === 'countdown' && isHost && questions.length === 0) {
      const fetchHostQuestions = async () => {
        const { data: matchData } = await supabase.from('friendly_matches').select('question_ids').eq('id', matchId).single();
        if (matchData) {
          fetchQuestions(matchData.question_ids, matchId);
        }
      };
      fetchHostQuestions();
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
  
  // Timer
  useEffect(() => {
    if (matchStatus === 'playing' && timeLeft !== null) {
      const t = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(t);
            submitMatch();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [matchStatus, timeLeft]);

  // Sync Progress every 5 seconds
  useEffect(() => {
    if (matchStatus === 'playing' && channel && questions.length > 0) {
      const t = setInterval(() => {
        const percentage = ((currentIndex + (isFinished ? 1 : 0)) / questions.length) * 100;
        channel.send({
          type: 'broadcast',
          event: 'progress_sync',
          payload: { matchId, userId: user.id, progressPercentage: percentage }
        });
      }, 5000);
      return () => clearInterval(t);
    }
  }, [matchStatus, channel, currentIndex, isFinished, questions.length, matchId, user?.id]);

  const submitMatch = async () => {
    if (matchStatus === 'submitting' || matchStatus === 'completed') return;
    setMatchStatus('submitting');
    try {
      const timeTaken = (config.duration * 60) - (timeLeft || 0);
      const formattedAnswers = Object.entries(playerAnswers).map(([qId, sel]) => ({
        question_id: qId,
        selected_option: sel
      }));
      
      // Calculate score locally since backend doesn't have the local JSON questions
      let calculatedScore = 0;
      let correctMarks = 1.0;
      let wrongMarks = 0.25;
      
      if (config?.correctMarks) correctMarks = parseFloat(config.correctMarks);
      if (config?.wrongMarks) wrongMarks = parseFloat(config.wrongMarks);
      
      Object.entries(playerAnswers).forEach(([qId, selectedOpt]) => {
         const question = questions.find(q => q.id === qId);
         if (question) {
            if (selectedOpt === question.answer) {
               calculatedScore += correctMarks;
            } else if (selectedOpt) {
               calculatedScore -= wrongMarks;
            }
         }
      });
      
      const { data, error } = await supabase.rpc('submit_friendly_match', { 
        p_match_id: matchId, 
        p_answers: formattedAnswers,
        p_completion_time_seconds: timeTaken,
        p_calculated_score: calculatedScore
      });
      if (error) throw error;
      
      checkCompletion();
    } catch (err) {
      console.error(err);
      alert("Failed to submit match!");
    }
  };

  const checkCompletion = async () => {
    const t = setInterval(async () => {
      const { data, error } = await supabase
        .from('friendly_matches')
        .select('status')
        .eq('id', matchId)
        .single();
      
      if (data && data.status === 'completed') {
        clearInterval(t);
        fetchFinalResults();
      }
    }, 3000);
  };

  const fetchFinalResults = async () => {
    const { data, error } = await supabase
      .from('match_results')
      .select('*')
      .eq('match_id', matchId);
      
    if (data) {
      const me = data.find(d => d.player_id === user.id);
      const them = data.find(d => d.player_id !== user.id);
      setResults({ me, them });
      setMatchStatus('completed');
    }
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
    if (secs === null || secs < 0) return "00:00";
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (matchStatus === 'lobby' || matchStatus === 'creating' || matchStatus === 'joining') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '40px', color: 'var(--violet)' }}>👥 Friend Battle</h1>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ padding: '40px', width: '300px', background: 'var(--card-bg)', border: '2px solid var(--violet)', borderRadius: '16px' }}>
            <h2>Create Room</h2>
            <p className="text-muted">Generate a code and invite a friend.</p>
            <button className="btn-primary" onClick={createMatch} disabled={matchStatus !== 'lobby'} style={{ width: '100%', padding: '12px', marginTop: '20px' }}>
              {matchStatus === 'creating' ? 'Generating...' : 'Create Match'}
            </button>
          </div>
          <div style={{ padding: '40px', width: '300px', background: 'var(--card-bg)', border: '2px solid var(--border)', borderRadius: '16px' }}>
            <h2>Join Room</h2>
            <p className="text-muted">Enter a 5-digit code to join.</p>
            <input 
              type="text" 
              maxLength={5} 
              placeholder="e.g. 7GQ2K" 
              value={joinInput}
              onChange={e => setJoinInput(e.target.value.toUpperCase())}
              style={{ width: '100%', padding: '12px', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px', background: 'var(--bg)', color: 'var(--text)', border: '1px solid var(--border)' }}
            />
            <button className="btn-secondary" onClick={joinMatch} disabled={matchStatus !== 'lobby'} style={{ width: '100%', padding: '12px' }}>
              {matchStatus === 'joining' ? 'Joining...' : 'Join Match'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (matchStatus === 'waiting') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--violet)' }}>Waiting for Opponent...</h2>
        <p>Share this code with your friend:</p>
        <div style={{ fontSize: '4rem', fontWeight: 'bold', letterSpacing: '8px', margin: '20px 0', padding: '20px 40px', background: 'var(--card-bg)', border: '2px dashed var(--border)', borderRadius: '16px' }}>
          {roomCode}
        </div>
        <p className="text-muted">The match will start automatically when they join.</p>
      </div>
    );
  }

  if (matchStatus === 'countdown') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '5rem', color: 'var(--violet)' }}>Get Ready!</h1>
      </div>
    );
  }

  if (matchStatus === 'submitting') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--violet)' }}>Waiting for opponent to finish...</h2>
      </div>
    );
  }

  if (matchStatus === 'completed' && results) {
    const didWin = results.me?.is_winner;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', padding: '40px' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'var(--card-bg)', padding: '60px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: '600px' }}>
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 10px 0', color: didWin ? '#10b981' : (results.me?.score === results.them?.score ? 'var(--text)' : '#ef4444') }}>
            {didWin ? '🏆 YOU WIN!' : (results.me?.score === results.them?.score ? '🤝 DRAW' : '💀 DEFEAT')}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '40px 0' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--text-sec)', margin: '0 0 10px 0' }}>You</h3>
              <div style={{ fontSize: '3rem', fontWeight: 900 }}>{results.me?.score}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Time: {formatTime(results.me?.completion_time)}</div>
            </div>
            <div style={{ fontSize: '2rem', color: 'var(--muted)', fontWeight: 800 }}>VS</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--text-sec)', margin: '0 0 10px 0' }}>Opponent</h3>
              <div style={{ fontSize: '3rem', fontWeight: 900 }}>{results.them?.score || 0}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Time: {formatTime(results.them?.completion_time)}</div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => navigate('')} style={{ padding: '14px 28px', fontSize: '1.1rem' }}>Return to Lobby</button>
        </motion.div>
      </div>
    );
  }

  // Playing Arena
  const currentQ = questions[currentIndex];
  const pProg = ((currentIndex + (isFinished ? 1 : 0)) / (questions.length || 1)) * 100;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <header style={{ padding: '20px', borderBottom: '1px solid var(--border)', background: 'var(--card-bg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, color: 'var(--violet)' }}>FRIEND BATTLE</h2>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>⏱ {formatTime(timeLeft)}</div>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '0.85rem', marginBottom: '4px' }}>You</div>
          <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px' }}>
            <div style={{ width: `${pProg}%`, height: '100%', background: '#10b981', transition: 'width 0.3s' }} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.85rem', marginBottom: '4px', color: 'var(--muted)' }}>Opponent</div>
          <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px' }}>
            <div style={{ width: `${opponentProgress}%`, height: '100%', background: '#ef4444', transition: 'width 5s linear' }} />
          </div>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          {currentQ ? (
            <>
              <h3 style={{ fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '40px' }}>{currentQ.question}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt)}
                    style={{ padding: '20px', borderRadius: '12px', border: '2px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', cursor: 'pointer', textAlign: 'left', fontSize: '1.1rem' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div>Loading question...</div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FriendBattlePage;
