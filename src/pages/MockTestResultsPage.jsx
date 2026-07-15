import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';

const MockTestResultsPage = ({ testId, navigate }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchResult = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError || !session?.user) throw new Error("Not logged in");

        const { data, error } = await supabase
          .from('mock_tests')
          .select('*')
          .eq('id', testId)
          .eq('user_id', session.user.id)
          .single();

        if (error) throw error;
        
        if (data.status !== 'completed') {
          throw new Error("Test is not completed yet.");
        }

        // We also need the original questions to show the correct answers
        const { data: qData, error: qError } = await supabase
          .from('assessment_questions')
          .select('id, question, options, category, topic, difficulty')
          .in('id', data.question_ids);
          
        if (qError) throw qError;
        
        // Re-sort to match original order
        const sortedQs = data.question_ids.map(id => qData.find(q => q.id === id)).filter(Boolean);
        
        if (mounted) {
          setResult({ ...data, questions: sortedQs });
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    fetchResult();
    return () => { mounted = false; };
  }, [testId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text)' }}>
        <h2>Loading your results...</h2>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text)' }}>
        <h2>Oops! Could not load results.</h2>
        <p style={{ color: 'var(--muted)' }}>{error}</p>
        <button className="btn-primary" onClick={() => navigate('')}>Return Home</button>
      </div>
    );
  }

  const { analytics, score, correct_count, incorrect_count, unanswered_count, total_questions } = result;
  const detailed = analytics?.detailed_results || [];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', color: 'var(--text)' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Mock Test Results</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div className="stat-card" style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', minWidth: '150px' }}>
            <h3 style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>Total Score</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--violet)' }}>{score}</div>
          </div>
          <div className="stat-card" style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', minWidth: '150px' }}>
            <h3 style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>Accuracy</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{analytics.accuracy?.toFixed(1) || 0}%</div>
          </div>
          <div className="stat-card" style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', minWidth: '150px' }}>
            <h3 style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>Correct</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{correct_count}</div>
          </div>
          <div className="stat-card" style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', minWidth: '150px' }}>
            <h3 style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>Incorrect</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{incorrect_count}</div>
          </div>
          <div className="stat-card" style={{ background: 'var(--card-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', minWidth: '150px' }}>
            <h3 style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>Skipped</h3>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>{unanswered_count}</div>
          </div>
        </div>
      </header>

      <section>
        <h2 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '20px' }}>Question Analysis</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {result.questions.map((q, idx) => {
            const detail = detailed.find(d => d.question_id === q.id);
            const status = detail?.status || 'skipped';
            const userAnswer = result.user_answers?.[q.id] || null;
            const correctAnswer = detail?.correct_answer || "N/A (Skipped & No Config)";
            
            let statusColor = '#f59e0b';
            let statusText = 'Skipped';
            
            if (status === 'correct') {
              statusColor = '#10b981';
              statusText = 'Correct';
            } else if (status === 'incorrect') {
              statusColor = '#ef4444';
              statusText = 'Incorrect';
            }

            return (
              <div key={q.id} style={{ 
                background: 'var(--card-bg)', 
                border: '1px solid var(--border)', 
                borderRadius: '12px', 
                overflow: 'hidden'
              }}>
                <div style={{ 
                  background: `${statusColor}15`, 
                  borderBottom: '1px solid var(--border)',
                  padding: '12px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <strong style={{ color: statusColor }}>Q{idx + 1}. {statusText}</strong>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'var(--bg)', borderRadius: '4px' }}>{q.category} / {q.topic}</span>
                    <span style={{ fontSize: '0.75rem', padding: '4px 8px', background: 'var(--bg)', borderRadius: '4px', textTransform: 'capitalize' }}>{q.difficulty}</span>
                  </div>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', lineHeight: '1.6' }}>{q.question}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ border: '1px solid var(--border)', padding: '16px', borderRadius: '8px', background: 'var(--bg)' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '8px' }}>Your Answer:</div>
                      <div style={{ fontWeight: 'bold', color: status === 'incorrect' ? '#ef4444' : (status === 'correct' ? '#10b981' : 'var(--text)') }}>
                        {userAnswer || 'Not answered'}
                      </div>
                    </div>
                    
                    <div style={{ border: '1px solid var(--border)', padding: '16px', borderRadius: '8px', background: 'var(--bg)' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '8px' }}>Correct Answer:</div>
                      <div style={{ fontWeight: 'bold', color: '#10b981' }}>
                        {correctAnswer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button className="btn-primary" onClick={() => navigate('')}>Back to Home</button>
      </div>
    </div>
  );
};

export default MockTestResultsPage;
