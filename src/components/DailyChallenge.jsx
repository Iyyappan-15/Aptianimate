// src/components/DailyChallenge.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDailyChallengeQuestions, getTimeUntilNextDailyReset } from '../utils/dailyChallengeEngine';
import { getISTDateStr, getLocalDailyChallenge, completeLocalDailyChallenge } from '../utils/localStorage';
import { recordDailyChallenge, recordBulkSessions } from '../repositories/analyticsRepository';
import { useAuth } from '../contexts/AuthContext';
import Confetti from './Confetti';

export default function DailyChallenge({ onChallengeCompleted, onStreakUpdate }) {
  const { user, profile } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({}); // idx -> { selected, isCorrect }
  const [completed, setCompleted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    setQuestions(getDailyChallengeQuestions());
    setTimeLeft(getTimeUntilNextDailyReset());

    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilNextDailyReset());
    }, 60000);

    // Check if already completed today
    const today = getISTDateStr();
    if (user?.id && profile?.daily_challenge_last_date === today) {
      setCompleted(true);
    } else {
      const local = getLocalDailyChallenge();
      if (local.lastDate === today) {
        setCompleted(true);
      }
    }

    return () => clearInterval(timer);
  }, [user?.id, profile?.daily_challenge_last_date]);

  const currentQ = questions[currentIndex];
  const isCurrentAnswered = answers[currentIndex] !== undefined;

  const handleSelect = (option) => {
    if (isCurrentAnswered) return;
    const isCorrect = option === currentQ.correct_answer;
    setSelectedOption(option);
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: { selected: option, isCorrect }
    }));
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishChallenge();
    }
  };

  const finishChallenge = async () => {
    const score = Object.values(answers).filter(a => a.isCorrect).length;
    setFinalScore(score);
    setShowResultScreen(true);
    setCompleted(true);
    setShowConfetti(true);

    // 1. Record in DB if logged in
    if (user?.id) {
      try {
        await recordDailyChallenge(user.id, score);
        const results = questions.map((q, idx) => ({
          questionId: q.id,
          solved: answers[idx]?.isCorrect || false
        }));
        await recordBulkSessions(user.id, 'Daily Challenge', 180, results);
      } catch (err) {
        console.error('Error saving daily challenge:', err);
      }
    } else {
      completeLocalDailyChallenge(score);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('streak-updated'));
    }

    if (onChallengeCompleted) onChallengeCompleted(score);
    if (onStreakUpdate) onStreakUpdate();
  };

  return (
    <div style={{
      margin: '0 auto 28px',
      maxWidth: 900,
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {showConfetti && <Confetti duration={4000} />}

      {/* ── Main Banner Card ── */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%)',
        border: '1.5px solid rgba(124, 58, 237, 0.25)',
        borderRadius: 20,
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(124, 58, 237, 0.06)'
      }}>
        {/* Glow pill */}
        <div style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 260 }}>
          <div style={{
            fontSize: '2rem',
            width: 52,
            height: 52,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #7c3aed, #f59e0b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)',
            flexShrink: 0
          }}>
            🎯
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                Today's Daily Challenge
              </span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#d97706',
                background: 'rgba(245, 158, 11, 0.15)',
                padding: '2px 8px',
                borderRadius: 10,
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                ⏳ Resets in {timeLeft}
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              5 mixed aptitude questions · Complete to earn <strong style={{ color: '#2563eb' }}>🛡️ 1 Streak Freeze</strong>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div>
          {completed ? (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#059669',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 12,
              padding: '10px 18px',
              fontWeight: 700,
              fontSize: '0.88rem'
            }}>
              ✅ Completed for Today!
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                color: '#fff',
                border: 'none',
                borderRadius: 14,
                padding: '12px 22px',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              Start Challenge →
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Challenge Modal ── */}
      <AnimatePresence>
        {isOpen && currentQ && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            boxSizing: 'border-box'
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 24,
                maxWidth: 640,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '28px 24px',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
                boxSizing: 'border-box',
                position: 'relative'
              }}
            >
              {showResultScreen ? (
                /* ── Challenge Completion Screen ── */
                <div style={{ textAlign: 'center', padding: '16px 8px' }}>
                  <div style={{ fontSize: '3.6rem', marginBottom: 12 }}>🎉</div>
                  <h2 style={{ fontSize: '1.65rem', fontWeight: 900, margin: '0 0 8px', color: 'var(--text-main)' }}>
                    Daily Challenge Complete!
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 24px' }}>
                    You scored <strong style={{ color: 'var(--violet)' }}>{finalScore} of {questions.length}</strong> correct today.
                  </p>

                  <div style={{
                    background: 'rgba(37, 99, 235, 0.1)',
                    border: '1.5px solid rgba(37, 99, 235, 0.3)',
                    borderRadius: 16,
                    padding: '16px 20px',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    textAlign: 'left'
                  }}>
                    <span style={{ fontSize: '2.2rem' }}>🛡️</span>
                    <div>
                      <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.95rem' }}>+1 Streak Freeze Earned!</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        Your streak is now protected against an accidental missed day.
                      </div>
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1.5px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: 16,
                    padding: '14px 20px',
                    marginBottom: 28,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    textAlign: 'left'
                  }}>
                    <span style={{ fontSize: '1.8rem' }}>🔥</span>
                    <div>
                      <div style={{ fontWeight: 800, color: '#059669', fontSize: '0.92rem' }}>Today's Goal Updated!</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        +5 questions counted toward today's streak target.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowResultScreen(false);
                      if (typeof window !== 'undefined') {
                        window.dispatchEvent(new CustomEvent('streak-updated'));
                      }
                    }}
                    style={{
                      background: 'var(--violet)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 14,
                      padding: '14px 32px',
                      fontWeight: 800,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)'
                    }}
                  >
                    Return to Home →
                  </button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: '1.2rem' }}>🎯</span>
                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        Daily Challenge
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        background: 'var(--surface-hover)',
                        color: 'var(--text-muted)',
                        padding: '2px 8px',
                        borderRadius: 8,
                        fontWeight: 700
                      }}>
                        {currentIndex + 1} of {questions.length}
                      </span>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.3rem',
                        cursor: 'pointer',
                        color: 'var(--text-muted)'
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Progress dots */}
                  <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                    {questions.map((_, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          background: answers[i]
                            ? answers[i].isCorrect ? '#10b981' : '#ef4444'
                            : i === currentIndex ? 'var(--violet)' : 'var(--border)'
                        }}
                      />
                    ))}
                  </div>

                  {/* Category pill */}
                  <div style={{ marginBottom: 12 }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      color: 'var(--violet)',
                      background: 'rgba(124, 58, 237, 0.1)',
                      padding: '3px 10px',
                      borderRadius: 12
                    }}>
                      {currentQ.category || 'General'}
                    </span>
                  </div>

                  {/* Question Text */}
                  <div style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    lineHeight: 1.5,
                    marginBottom: 20
                  }}>
                    {currentQ.question}
                  </div>

                  {/* Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {(currentQ.options || []).map((opt) => {
                      const optText = typeof opt === 'object' ? opt.text : opt;
                      const optLabel = typeof opt === 'object' ? opt.label : null;
                      const isChosen = (selectedOption === optText) || (selectedOption === optLabel);
                      const isCorrect = (optText === currentQ.correct_answer) || (optLabel === currentQ.correct_answer);

                      let bg = 'var(--surface-hover)';
                      let border = '1px solid var(--border)';
                      let color = 'var(--text-main)';

                      if (isCurrentAnswered) {
                        if (isCorrect) {
                          bg = 'rgba(16, 185, 129, 0.15)';
                          border = '1.5px solid #10b981';
                          color = '#059669';
                        } else if (isChosen) {
                          bg = 'rgba(239, 68, 68, 0.12)';
                          border = '1.5px solid #ef4444';
                          color = '#dc2626';
                        }
                      }

                      return (
                        <motion.button
                          key={optText}
                          whileHover={!isCurrentAnswered ? { x: 4 } : {}}
                          onClick={() => handleSelect(optLabel || optText)}
                          disabled={isCurrentAnswered}
                          style={{
                            padding: '14px 18px',
                            borderRadius: 14,
                            background: bg,
                            border: border,
                            color: color,
                            fontWeight: isChosen ? 700 : 500,
                            fontSize: '0.92rem',
                            textAlign: 'left',
                            cursor: isCurrentAnswered ? 'default' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span>{optText}</span>
                          {isCurrentAnswered && isCorrect && <span style={{ color: '#10b981', fontWeight: 800 }}>✓</span>}
                          {isCurrentAnswered && isChosen && !isCorrect && <span style={{ color: '#ef4444', fontWeight: 800 }}>✕</span>}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Next / Submit Button */}
                  {isCurrentAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <button
                        onClick={handleNext}
                        style={{
                          background: 'var(--violet)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 12,
                          padding: '12px 28px',
                          fontWeight: 700,
                          fontSize: '0.92rem',
                          cursor: 'pointer'
                        }}
                      >
                        {currentIndex < questions.length - 1 ? 'Next Question →' : 'Finish Challenge 🎉'}
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
