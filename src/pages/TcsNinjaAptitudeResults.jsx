/**
 * TcsNinjaAptitudeResults.jsx
 * Detailed results page shown after test submission.
 * Shows: Score, Correct, Incorrect, Unattempted, Accuracy %, Time Taken.
 * Expandable question-by-question breakdown.
 * Designed for future expansion (percentile, topic breakdown).
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function pad(n) {
  return String(n).padStart(2, '0');
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${pad(m)}m ${pad(s)}s`;
}

export default function TcsNinjaAptitudeResults({ navigate }) {
  const [results, setResults] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [filter, setFilter] = useState('all'); // all | correct | incorrect | unattempted

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('tcs_ninja_results');
      if (saved) {
        setResults(JSON.parse(saved));
      }
    } catch (_) {}
  }, []);

  if (!results) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: 'var(--muted)',
        textAlign: 'center',
        padding: '40px 20px',
      }}>
        <div style={{ fontSize: '3rem' }}>📋</div>
        <h2 style={{ color: 'var(--text)' }}>No Results Found</h2>
        <p>Please complete a test session first.</p>
        <button
          onClick={() => navigate('tcs-ninja-mock')}
          style={{
            padding: '12px 28px', borderRadius: '10px', border: 'none',
            background: 'var(--violet)', color: '#fff', fontWeight: 700, cursor: 'pointer',
          }}
        >
          Start a Test
        </button>
      </div>
    );
  }

  const {
    score, total, correct, incorrect, unattempted,
    attempted, accuracy, timeTaken, breakdown,
  } = results;

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getGrade = () => {
    if (percentage >= 80) return { label: 'Excellent', color: '#22c55e', emoji: '🏆' };
    if (percentage >= 60) return { label: 'Good', color: '#f59e0b', emoji: '👍' };
    if (percentage >= 40) return { label: 'Average', color: '#f97316', emoji: '📈' };
    return { label: 'Needs Practice', color: '#ef4444', emoji: '💪' };
  };

  const grade = getGrade();

  const statCards = [
    { label: 'Score', value: `${score} / ${total}`, color: '#8b5cf6', icon: '🎯' },
    { label: 'Correct', value: correct, color: '#22c55e', icon: '✅' },
    { label: 'Incorrect', value: incorrect, color: '#ef4444', icon: '❌' },
    { label: 'Unattempted', value: unattempted, color: '#94a3b8', icon: '⬜' },
    { label: 'Attempted', value: attempted, color: '#3b82f6', icon: '📝' },
    { label: 'Accuracy', value: `${accuracy}%`, color: '#10b981', icon: '🎖️' },
    { label: 'Time Taken', value: formatTime(timeTaken), color: '#f59e0b', icon: '⏱️' },
  ];

  const filteredBreakdown = breakdown.filter(q => {
    if (filter === 'correct') return q.isCorrect;
    if (filter === 'incorrect') return q.isAttempted && !q.isCorrect;
    if (filter === 'unattempted') return !q.isAttempted;
    return true;
  });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>

      {/* Hero score */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>{grade.emoji}</div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '2.2rem', fontWeight: 900, color: 'var(--text)' }}>
          Test Completed!
        </h1>
        <p style={{ color: 'var(--muted)', margin: '0 0 16px 0' }}>
          TCS Ninja — Aptitude Section
        </p>

        {/* Big score circle */}
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          border: `6px solid ${grade.color}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          background: `${grade.color}18`,
        }}>
          <span style={{ fontSize: '2.2rem', fontWeight: 900, color: grade.color }}>
            {percentage}%
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>score</span>
        </div>

        <span style={{
          display: 'inline-block',
          padding: '6px 20px',
          borderRadius: '20px',
          background: `${grade.color}22`,
          color: grade.color,
          fontWeight: 700,
          fontSize: '0.95rem',
        }}>
          {grade.label}
        </span>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
          gap: '14px',
          marginBottom: '36px',
        }}
      >
        {statCards.map(card => (
          <div
            key={card.label}
            style={{
              background: 'var(--card)',
              border: `2px solid ${card.color}44`,
              borderRadius: '14px',
              padding: '18px 12px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{card.icon}</div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', color: card.color }}>
              {card.value}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '2px' }}>
              {card.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Topic placeholder for future */}
      <div style={{
        background: 'rgba(139,92,246,0.05)',
        border: '1px dashed rgba(139,92,246,0.3)',
        borderRadius: '14px',
        padding: '18px 24px',
        textAlign: 'center',
        color: 'var(--muted)',
        fontSize: '0.85rem',
        marginBottom: '28px',
      }}>
        📊 <strong>Topic-wise breakdown</strong> and <strong>Percentile ranking</strong> coming soon.
      </div>

      {/* Question Breakdown */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ margin: 0, fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>
            Question Review
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: `All (${total})` },
              { key: 'correct', label: `✅ Correct (${correct})` },
              { key: 'incorrect', label: `❌ Incorrect (${incorrect})` },
              { key: 'unattempted', label: `⬜ Skipped (${unattempted})` },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: filter === f.key ? '2px solid var(--violet)' : '2px solid var(--border)',
                  background: filter === f.key ? 'rgba(139,92,246,0.1)' : 'transparent',
                  color: filter === f.key ? 'var(--violet)' : 'var(--muted)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredBreakdown.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              style={{
                background: 'var(--card)',
                border: `1px solid ${q.isCorrect ? '#22c55e44' : q.isAttempted ? '#ef444444' : 'var(--border)'}`,
                borderRadius: '12px',
                padding: '16px 20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem', flex: 1 }}>
                  <span style={{
                    display: 'inline-block',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: q.isCorrect ? '#22c55e' : q.isAttempted ? '#ef4444' : '#94a3b8',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    lineHeight: '24px',
                    marginRight: '10px',
                    flexShrink: 0,
                  }}>
                    {q.isCorrect ? '✓' : q.isAttempted ? '✗' : '–'}
                  </span>
                  {q.question}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', flexWrap: 'wrap', paddingLeft: '34px' }}>
                <span>
                  <strong>Your answer:</strong>{' '}
                  <span style={{ color: q.isCorrect ? '#22c55e' : '#ef4444', fontWeight: 700 }}>
                    {q.userAnswer ? `${q.userAnswer}: ${q.options[q.userAnswer]}` : 'Not Answered'}
                  </span>
                </span>
                {!q.isCorrect && (
                  <span>
                    <strong>Correct:</strong>{' '}
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>
                      {q.correctAnswer}: {q.options[q.correctAnswer]}
                    </span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => navigate('tcs-ninja-mock/aptitude')}
          style={{
            padding: '13px 32px',
            borderRadius: '12px',
            border: 'none',
            background: 'var(--violet)',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          🔄 Reattempt Test
        </button>
        <button
          onClick={() => navigate('tcs-ninja-mock')}
          style={{
            padding: '13px 32px',
            borderRadius: '12px',
            border: '2px solid var(--border)',
            background: 'transparent',
            color: 'var(--text)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          ← Back to TCS Ninja
        </button>
      </div>
    </div>
  );
}
