import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { signInWithGoogle } from '../services/authService';
import testConfigs from '../config/testConfigs.json';

// Simple loading spinner component
const LoadingSpinner = ({ text }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text)' }}>
    <div className="spinner" style={{ width: '50px', height: '50px', border: '5px solid var(--border)', borderTop: '5px solid var(--violet)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{text}</p>
  </div>
);

const MockTestPage = ({ navigate }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Checking active sessions...');
  
  const [testSession, setTestSession] = useState(null); // { test_id, expires_at, questions: [] }
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { question_id: selected_option_string }
  
  const [timeLeft, setTimeLeft] = useState(null); // in seconds
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timerRef = useRef(null);

  // 1. Initialize Test (Start or Resume)
  useEffect(() => {
    let mounted = true;
    
    const initTest = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) {
          console.error("Not logged in");
          return; // AuthContext should handle anon login anyway
        }

        // Check if there is an in-progress test for this user
        const { data: activeTests, error: checkError } = await supabase
          .from('mock_tests')
          .select('id, end_time, question_ids, paper_config')
          .eq('user_id', session.user.id)
          .eq('status', 'in_progress')
          .order('created_at', { ascending: false })
          .limit(1);

        if (checkError) throw checkError;

        let activeTest = activeTests?.[0];

        if (activeTest && new Date(activeTest.end_time) > new Date()) {
          // RESUME EXISTING TEST
          setLoadingText('Resuming your test...');
          
          // But wait, the questions JSON array isn't saved directly in the row (only question_ids).
          // We need to fetch the actual question details.
          const { data: qData, error: qError } = await supabase
            .from('assessment_questions')
            .select('id, category, topic, subtopic, difficulty, question, options, estimated_time, company_tags')
            .in('id', activeTest.question_ids);

          if (qError) throw qError;

          // Re-sort questions based on the question_ids array to maintain order
          const sortedQuestions = activeTest.question_ids.map(id => qData.find(q => q.id === id)).filter(Boolean);

          const savedAnswers = JSON.parse(localStorage.getItem(`mock_answers_${activeTest.id}`) || '{}');

          if (mounted) {
            setTestSession({
              test_id: activeTest.id,
              expires_at: activeTest.end_time,
              questions: sortedQuestions,
            });
            setAnswers(savedAnswers);
          }
        } else {
          // START NEW TEST
          setLoadingText('Preparing Question Paper...');
          // Small visual delay as requested
          await new Promise(r => setTimeout(r, 1500)); 

          const config = testConfigs.defaultMockTest;

          const { data, error } = await supabase.rpc('generate_mock_test', { p_config: config });
          if (error) throw error;
          
          if (mounted) {
            setTestSession(data);
            setAnswers({});
            localStorage.setItem(`mock_answers_${data.test_id}`, JSON.stringify({}));
          }
        }
        
      } catch (err) {
        console.error("Failed to init mock test:", err);
        alert("Failed to load test. Please try again.");
        navigate('');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initTest();
    return () => { mounted = false; };
  }, [navigate]);

  // 2. Server-Synced Timer
  useEffect(() => {
    if (!testSession?.expires_at || isSubmitting) return;

    const expiresAt = new Date(testSession.expires_at).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = expiresAt - now;
      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(timerRef.current);
        handleSubmitTest(); // auto submit
      } else {
        setTimeLeft(Math.floor(diff / 1000));
      }
    };

    updateTimer(); // Initial call
    timerRef.current = setInterval(updateTimer, 1000);

    return () => clearInterval(timerRef.current);
  }, [testSession, isSubmitting]);

  const handleSelectOption = (questionId, optionStr) => {
    if (isSubmitting) return;
    const newAnswers = { ...answers, [questionId]: optionStr };
    setAnswers(newAnswers);
    // Auto-save to localStorage
    if (testSession?.test_id) {
      localStorage.setItem(`mock_answers_${testSession.test_id}`, JSON.stringify(newAnswers));
    }
  };

  const handleSubmitTest = useCallback(async () => {
    if (isSubmitting || !testSession) return;
    setIsSubmitting(true);
    clearInterval(timerRef.current);

    // Format answers for RPC: [{ question_id: "uuid", selected_option: "string" }]
    const formattedAnswers = Object.entries(answers).map(([qId, selected]) => ({
      question_id: qId,
      selected_option: selected
    }));

    try {
      const { data, error } = await supabase.rpc('submit_mock_test', {
        p_test_id: testSession.test_id,
        p_answers: formattedAnswers
      });
      if (error) throw error;

      // Clean up localStorage
      localStorage.removeItem(`mock_answers_${testSession.test_id}`);
      
      // Navigate to results
      navigate(`mock-test/results/${testSession.test_id}`);
    } catch (err) {
      console.error("Failed to submit test:", err);
      alert("Failed to submit test. Please check your connection and try again.");
      setIsSubmitting(false);
      // Restart timer if failed so they don't get locked out
      const expiresAt = new Date(testSession.expires_at).getTime();
      if (expiresAt > new Date().getTime()) {
         timerRef.current = setInterval(() => {
           const diff = expiresAt - new Date().getTime();
           setTimeLeft(diff > 0 ? Math.floor(diff / 1000) : 0);
         }, 1000);
      }
    }
  }, [answers, isSubmitting, navigate, testSession]);

  if (!user) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'var(--violet)' }}>🔒 Login Required</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '40px', color: 'var(--muted)' }}>Please login to take a Mock Test.</p>
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

  if (loading) {
    return <LoadingSpinner text={loadingText} />;
  }

  if (!testSession || !testSession.questions?.length) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ color: 'var(--text)' }}>Failed to load question paper.</h2>
        <button className="btn-primary" onClick={() => navigate('')}>Return Home</button>
      </div>
    );
  }

  const currentQ = testSession.questions[currentIndex];
  
  // Format MM:SS
  const formatTime = (secs) => {
    if (secs === null || secs < 0) return "00:00";
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      maxHeight: '100vh', 
      background: 'var(--bg)', 
      color: 'var(--text)' 
    }}>
      
      {/* HEADER */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 24px', 
        borderBottom: '1px solid var(--border)',
        background: 'var(--card-bg)' 
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--violet)' }}>AptiAnimate Mock Test</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
            Question {currentIndex + 1} of {testSession.questions.length}
          </span>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          color: timeLeft !== null && timeLeft < 300 ? '#ef4444' : 'var(--text)' // Red in last 5 mins
        }}>
          ⏱ {formatTime(timeLeft)}
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* MAIN QUESTION AREA */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          
          {/* Question Metadata Tags */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--border)', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {currentQ.category}
            </span>
            <span style={{ padding: '4px 8px', borderRadius: '4px', background: 'var(--border)', fontSize: '0.75rem' }}>
              {currentQ.topic}
            </span>
            <span style={{ 
              padding: '4px 8px', 
              borderRadius: '4px', 
              background: currentQ.difficulty === 'easy' ? '#10b981' : currentQ.difficulty === 'medium' ? '#f59e0b' : '#ef4444', 
              color: '#fff',
              fontSize: '0.75rem',
              textTransform: 'capitalize'
            }}>
              {currentQ.difficulty}
            </span>
          </div>

          <h3 style={{ fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '32px' }}>
            {currentQ.question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQ.id] === opt;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt)}
                  disabled={isSubmitting}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    borderRadius: '8px',
                    border: `2px solid ${isSelected ? 'var(--violet)' : 'var(--border)'}`,
                    background: isSelected ? 'var(--violet-light, rgba(139, 92, 246, 0.1))' : 'var(--card-bg)',
                    color: 'var(--text)',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    fontSize: '1.05rem'
                  }}
                >
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '50%',
                    border: `2px solid ${isSelected ? 'var(--violet)' : 'var(--muted)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {isSelected && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--violet)' }} />}
                  </div>
                  {opt}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            <button 
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0 || isSubmitting}
              style={{ padding: '12px 24px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text)', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}
            >
              ← Previous
            </button>
            <button 
              onClick={() => setCurrentIndex(prev => Math.min(testSession.questions.length - 1, prev + 1))}
              disabled={currentIndex === testSession.questions.length - 1 || isSubmitting}
              style={{ padding: '12px 24px', borderRadius: '8px', background: 'var(--violet)', color: '#fff', border: 'none', cursor: currentIndex === testSession.questions.length - 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
            >
              Next →
            </button>
          </div>

        </main>

        {/* SIDE NAVIGATION GRID */}
        <aside style={{ width: '300px', borderLeft: '1px solid var(--border)', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
            <h4 style={{ margin: '0 0 16px 0' }}>Question Navigator</h4>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '12px', background: 'var(--violet)', borderRadius: '50%' }} /> Answered
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '12px', height: '12px', border: '2px solid var(--border)', borderRadius: '50%' }} /> Unanswered
              </div>
            </div>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {testSession.questions.map((q, idx) => {
                const isAnswered = !!answers[q.id];
                const isCurrent = idx === currentIndex;
                
                let bg = 'transparent';
                let color = 'var(--text)';
                let border = '2px solid var(--border)';
                
                if (isCurrent) {
                  border = '2px solid var(--text)';
                }
                if (isAnswered) {
                  bg = 'var(--violet)';
                  color = '#fff';
                  border = '2px solid var(--violet)';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      aspectRatio: '1',
                      borderRadius: '50%',
                      background: bg,
                      color: color,
                      border: border,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      padding: 0
                    }}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div style={{ padding: '20px', borderTop: '1px solid var(--border)' }}>
            <button 
              onClick={() => {
                if(window.confirm('Are you sure you want to submit the test? You cannot change answers after submitting.')) {
                  handleSubmitTest();
                }
              }}
              disabled={isSubmitting}
              className="btn-primary" 
              style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Test'}
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default MockTestPage;
