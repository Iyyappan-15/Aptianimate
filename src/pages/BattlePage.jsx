import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle } from '../services/authService';
import testConfigs from '../config/testConfigs.json';

import { getRandomQuestions } from '../data/aiBank';

// Utility to generate fake AI progress
const generateAIProfile = (totalQuestions) => {
  // Random AI Accuracy between 60% and 90%
  const accuracy = Math.floor(Math.random() * 31) + 60; 
  const totalCorrect = Math.floor((accuracy / 100) * totalQuestions);
  
  // Create an array of correct/incorrect
  let results = Array(totalQuestions).fill(false);
  for (let i = 0; i < totalCorrect; i++) results[i] = true;
  // Shuffle
  results = results.sort(() => Math.random() - 0.5);

  // Generate realistic time-to-answer for each question (e.g. 5s to 15s)
  const timing = results.map(() => Math.floor(Math.random() * 10) + 5);

  return { accuracy, totalCorrect, results, timing };
};

const BattlePage = ({ navigate }) => {
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState(null); // 'select' | 'ai' | 'friend'
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [testSession, setTestSession] = useState(null); // { test_id, expires_at }
  
  // Game State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerAnswers, setPlayerAnswers] = useState({});
  const [playerFinished, setPlayerFinished] = useState(false);
  const [playerRealScore, setPlayerRealScore] = useState(0);
  
  const [aiScore, setAiScore] = useState(0);
  const [aiCurrentQ, setAiCurrentQ] = useState(0);
  const [aiFinished, setAiFinished] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [aiProfile, setAiProfile] = useState(null);

  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [battleResults, setBattleResults] = useState(null); // stores analytics after submit

  const aiTimerRef = useRef(null);
  const clockRef = useRef(null);

  const startAIBattle = async () => {
    setLoading(true);
    try {
      const selectedQuestions = getRandomQuestions(testConfigs.aiBattle);
      if (!selectedQuestions || selectedQuestions.length === 0) {
        throw new Error("No questions found in local bank. Make sure the JSONs are in public/assessment-bank/ai-battle");
      }

      setQuestions(selectedQuestions);
      
      // Calculate local expiry
      const durationSec = (testConfigs.aiBattle.duration || 30) * 60;
      const expiresAt = new Date().getTime() + (durationSec * 1000);
      setTestSession({ test_id: 'local_ai_battle', expires_at: new Date(expiresAt).toISOString() });
      setAiProfile(generateAIProfile(selectedQuestions.length));
      
      setTimeLeft(durationSec);
      setMode('ai');
    } catch (err) {
      console.error(err);
      alert("Failed to start AI Battle.");
    } finally {
      setLoading(false);
    }
  };

  const startFriendBattle = () => {
    navigate('battle/friend');
  };

  // Clock Hook
  useEffect(() => {
    if (mode === 'ai' && !isFinished && testSession) {
      clockRef.current = setInterval(() => {
        const expiresAt = new Date(testSession.expires_at).getTime();
        const diff = expiresAt - new Date().getTime();
        if (diff <= 0) {
          setTimeLeft(0);
          setPlayerFinished(true);
          setAiFinished(true);
        } else {
          setTimeLeft(Math.floor(diff / 1000));
        }
      }, 1000);
    }
    return () => clearInterval(clockRef.current);
  }, [mode, isFinished, testSession]);

  // AI Progression Hook
  useEffect(() => {
    if (mode !== 'ai' || isFinished || !aiProfile || aiFinished) return;

    const processAITurn = () => {
      if (aiCurrentQ >= questions.length) {
        setAiFinished(true);
        return;
      }
      const timeToWait = aiProfile.timing[aiCurrentQ] * 1000;
      aiTimerRef.current = setTimeout(() => {
        const isCorrect = aiProfile.results[aiCurrentQ];
        if (isCorrect) setAiScore(prev => prev + 1);
        setAiCurrentQ(prev => prev + 1);
        if (aiCurrentQ + 1 >= questions.length) {
          setAiFinished(true);
        }
      }, timeToWait);
    };

    processAITurn();
    return () => clearTimeout(aiTimerRef.current);
  }, [mode, aiCurrentQ, isFinished, aiProfile, questions.length, aiFinished]);

  const hasSubmittedRef = useRef(false);

  // Submission Hook (when both finished or timer ends)
  useEffect(() => {
    let mounted = true;
    const submitBattle = async () => {
      if (!isFinished && playerFinished && aiFinished && testSession && !hasSubmittedRef.current) {
        hasSubmittedRef.current = true;
        setIsSubmitting(true);
        try {
          // Local Grading instead of Supabase RPC!
          let correct = 0;
          let incorrect = 0;
          let score = 0;
          const correctMarks = testConfigs.aiBattle.correctMarks || 1;
          const wrongMarks = testConfigs.aiBattle.wrongMarks || 0.25;
          
          Object.entries(playerAnswers).forEach(([qId, sel]) => {
             const q = questions.find(x => x.id === qId);
             if (q) {
                if (sel === q.correct_answer) {
                  correct++;
                  score += correctMarks;
                } else if (sel) {
                  incorrect++;
                  score -= wrongMarks;
                }
             }
          });
          
          if (mounted) {
            setPlayerRealScore(score);
            setBattleResults({ score, correct, incorrect, analytics: { accuracy: (correct / questions.length) * 100 } });
            setIsFinished(true);
          }
        } catch (err) {
          console.error("Failed to submit battle:", err);
          alert("Failed to calculate your battle results!");
          hasSubmittedRef.current = false;
        } finally {
          if (mounted) setIsSubmitting(false);
        }
      }
    };
    submitBattle();
    return () => { mounted = false; };
  }, [playerFinished, aiFinished, isFinished, playerAnswers, testSession]);

  const handlePlayerAnswer = (selectedOption) => {
    if (playerFinished) return;
    
    const currentQ = questions[currentIndex];
    setPlayerAnswers(prev => ({ ...prev, [currentQ.id]: selectedOption }));
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setPlayerFinished(true);
    }
  };

  const formatTime = (secs) => {
    if (secs === null || secs < 0) return "00:00";
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (authLoading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-sec)' }}>
        Loading authentication state...
      </div>
    );
  }

  const [globalSearching, setGlobalSearching] = useState(false);

  const startGlobalBattle = async () => {
    setGlobalSearching(true);
    try {
      // 1. Try to join an existing global match
      const { data: matchId, error } = await supabase.rpc('join_global_match');
      if (error) throw error;
      
      if (matchId) {
        navigate(`battle/friend?match=${matchId}&global=true`);
        return;
      }

      // 2. No match found, act as host and create a waiting match
      // First ensure aiBank has questions loaded, or fetch randomly
      const selectedQuestions = getRandomQuestions(testConfigs.friendBattle || { categories: {'Quantitative Aptitude': 2, 'Logical Reasoning': 2, 'Verbal Ability': 1}, difficulty: {easy: 60, medium: 40} });
      const qIds = selectedQuestions.map(q => q.id);
      
      const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const { data: newMatch, error: insertError } = await supabase
        .from('friendly_matches')
        .insert([{
          host_id: user.id,
          status: 'waiting_global',
          question_ids: qIds,
          join_code: joinCode,
          paper_config: testConfigs.friendBattle || {}
        }])
        .select()
        .single();
        
      if (insertError) throw insertError;
      
      // Navigate to FriendBattlePage which will wait for opponent
      navigate(`battle/friend?match=${newMatch.id}&global=true`);
      
    } catch (err) {
      console.error(err);
      alert("Failed to start global matchmaking.");
    } finally {
      setGlobalSearching(false);
    }
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--violet)' }}>🔒 Login Required</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--muted)' }}>Please login to play the AI Battle.</p>
        <button className="btn-primary" onClick={signInWithGoogle} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '12px 24px', background: '#fff', color: '#000' }}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24c0-1.61-.15-3.16-.42-4.69H24v9.09h12.75c-.53 2.87-2.14 5.3-4.57 6.96l7.14 5.53C43.51 36.31 46.5 30.8 46.5 24z"/>
            <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.14-5.53c-1.97 1.33-4.5 2.13-8.75 2.13-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Google Sign In
        </button>
      </div>
    );
  }

  if (mode === null) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', padding: '40px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '40px', color: 'var(--violet)' }}>⚔️ Choose Your Battle</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', width: '100%', maxWidth: '900px' }}>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={startGlobalBattle}
            disabled={globalSearching}
            style={{ padding: '40px 20px', background: 'var(--card-bg)', border: '2px solid #10b981', borderRadius: '16px', cursor: globalSearching ? 'not-allowed' : 'pointer', opacity: globalSearching ? 0.7 : 1 }}
          >
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 16px 0' }}>🌍</h2>
            <h3>Play Globally</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
              {globalSearching ? 'Finding an opponent...' : 'Match instantly with another player around the world.'}
            </p>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={startAIBattle}
            style={{ padding: '40px 20px', background: 'var(--card-bg)', border: '2px solid var(--violet)', borderRadius: '16px', cursor: 'pointer' }}
          >
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 16px 0' }}>🤖</h2>
            <h3>Battle AI</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Test your skills against our dynamically paced AI opponent.</p>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={startFriendBattle}
            style={{ padding: '40px 20px', background: 'var(--card-bg)', border: '2px solid var(--border)', borderRadius: '16px', cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#10b981'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 16px 0' }}>👥</h2>
            <h3>Battle Friend</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Invite a friend using a private code and compete in real-time.</p>
          </motion.button>
        </div>
        
        {loading && <p style={{ marginTop: '20px', color: 'var(--violet)' }}>Loading Battle Arena...</p>}
      </div>
    );
  }

  if (playerFinished && !aiFinished && !isFinished) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center' }}>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <div style={{ width: '60px', height: '60px', border: '5px solid var(--border)', borderTop: '5px solid var(--violet)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '20px' }}></div>
        <h2 style={{ fontSize: '2rem' }}>Waiting for AI to finish...</h2>
        <p style={{ color: 'var(--muted)', fontSize: '1.2rem', marginTop: '10px' }}>The AI is still processing the remaining {Math.max(0, questions.length - aiCurrentQ)} questions!</p>
        <div style={{ marginTop: '30px', fontSize: '1.5rem', fontWeight: 'bold' }}>⏱ {formatTime(timeLeft)}</div>
      </div>
    );
  }
  
  if (isSubmitting) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--violet)' }}>Calculating Results...</h2>
      </div>
    );
  }

  if (isFinished) {
    const didWin = playerRealScore >= aiScore;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', textAlign: 'center', padding: '40px' }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }} style={{ background: 'var(--card-bg)', padding: '60px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: '600px' }}>
          <h1 style={{ fontSize: '3.5rem', margin: '0 0 10px 0', color: didWin ? '#10b981' : '#ef4444' }}>
            {didWin ? '🏆 YOU WIN!' : '💀 DEFEAT'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '40px' }}>
            {didWin ? "Amazing job! You outsmarted the AI." : "The AI was faster this time. Keep practicing!"}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--text-sec)', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>You</h3>
              <div style={{ fontSize: '4rem', fontWeight: 900, color: didWin ? '#10b981' : 'var(--text)' }}>{playerRealScore}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Accuracy: {battleResults?.analytics?.accuracy?.toFixed(1) || 0}%</div>
            </div>
            
            <div style={{ fontSize: '2rem', color: 'var(--muted)', fontWeight: 800 }}>VS</div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--text-sec)', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>AI Bot</h3>
              <div style={{ fontSize: '4rem', fontWeight: 900, color: !didWin ? '#ef4444' : 'var(--text)' }}>{aiScore}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Accuracy: {aiProfile?.accuracy || 0}%</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn-primary" onClick={() => navigate('')} style={{ padding: '14px 28px', fontSize: '1.1rem', background: 'linear-gradient(135deg, var(--violet), #6d28d9)', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
              Return to Lobby
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const playerProgress = (currentIndex / questions.length) * 100;
  const aiProgress = (aiCurrentQ / questions.length) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* BATTLE HEADER */}
      <header style={{ padding: '20px', borderBottom: '1px solid var(--border)', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: 'var(--violet)' }}>AI BATTLE ARENA</h2>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: timeLeft !== null && timeLeft < 60 ? '#ef4444' : 'var(--text)' }}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>
        
        {/* Progress Bars */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
            <span>You ({currentIndex + (playerFinished ? 1 : 0)}/{questions.length})</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${playerProgress}%` }} style={{ height: '100%', background: '#10b981' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px', color: 'var(--muted)' }}>
            <span>AI Bot ({aiCurrentQ}/{questions.length})</span>
            <span>Score: {aiScore}</span>
          </div>
          <div style={{ width: '100%', height: '12px', background: 'var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${aiProgress}%` }} style={{ height: '100%', background: '#ef4444' }} />
          </div>
        </div>
      </header>

      {/* BATTLE ARENA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '32px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
             <span style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--border)', fontSize: '0.75rem', textTransform: 'uppercase' }}>{currentQ?.category}</span>
          </div>
          
          <h3 style={{ fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '40px' }}>
            {currentQ?.question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentQ?.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handlePlayerAnswer(opt)}
                disabled={playerFinished}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid var(--border)',
                  background: 'var(--card-bg)',
                  color: 'var(--text)',
                  cursor: playerFinished ? 'not-allowed' : 'pointer',
                  textAlign: 'left',
                  fontSize: '1.1rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}
                onMouseOver={(e) => !playerFinished && (e.currentTarget.style.borderColor = 'var(--violet)')}
                onMouseOut={(e) => !playerFinished && (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {['A','B','C','D'][idx]}
                </div>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BattlePage;
