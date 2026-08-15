import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

function pad(n) { return String(n).padStart(2, '0'); }

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${pad(m)}m ${pad(s)}s`;
}

function calculateSectionStats(sectionState) {
  const { questions, answers, totalSeconds, secondsLeft } = sectionState;
  const timeUsed = totalSeconds - secondsLeft;
  
  let correct = 0;
  let incorrect = 0;
  let skipped = 0;
  const topics = {};

  const LABELS = ['A', 'B', 'C', 'D'];


  const breakdown = questions.map((q) => {
    const userAnswer = answers[q.id];
    const isAttempted = !!userAnswer;
    const isCorrect = isAttempted && userAnswer === q.correctAnswer;

    if (!isAttempted) skipped++;
    else if (isCorrect) correct++;
    else incorrect++;

    // Topic Analysis
    if (q.topic) {
      if (!topics[q.topic]) topics[q.topic] = { total: 0, correct: 0 };
      topics[q.topic].total++;
      if (isCorrect) topics[q.topic].correct++;
    }

    const optionsObj = Array.isArray(q.options)
      ? LABELS.reduce((acc, l, i) => { acc[l] = q.options[i] ?? ''; return acc; }, {})
      : q.options;

    return {
      id: q.id,
      question: q.question,
      options: optionsObj,
      correctAnswer: q.correctAnswer,
      userAnswer: userAnswer || null,
      isCorrect,
      isAttempted,
      topic: q.topic || 'General',
    };
  });

  const total = questions.length;
  const attempted = correct + incorrect;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return {
    total, attempted, correct, incorrect, skipped, accuracy, percentage,
    timeUsed, timeRemaining: secondsLeft, breakdown, topics
  };
}

export default function HexawareAptitudeResults({ navigate }) {
  const [resultsState, setResultsState] = useState(null);
  const [activeTab, setActiveTab] = useState('overall'); // overall | aptitude | technical

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('mock_test_results');
      if (saved) {
        setResultsState(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const { overall, sections } = useMemo(() => {
    if (!resultsState) return { overall: null, sections: {} };
    
    const processedSections = {};
    let totalQs = 0, totalCorrect = 0, totalTimeUsed = 0, totalTime = 0;

    resultsState.sections.forEach(sec => {
      const stats = calculateSectionStats(sec);
      processedSections[sec.id] = stats;
      totalQs += stats.total;
      totalCorrect += stats.correct;
      totalTimeUsed += stats.timeUsed;
      totalTime += sec.totalSeconds;
    });

    const overallPct = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0;

    return {
      overall: {
        score: totalCorrect,
        total: totalQs,
        percentage: overallPct,
        timeUsed: totalTimeUsed,
        timeRemaining: totalTime - totalTimeUsed
      },
      sections: processedSections
    };
  }, [resultsState]);

  if (!resultsState) {
    return (
      <div style={{
        minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '20px', color: 'var(--text)', textAlign: 'center',
      }}>
        <div style={{
          fontSize: '4rem', padding: '32px', background: 'var(--bg)', borderRadius: '50%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)'
        }}>📋</div>
        <h2 style={{ color: 'var(--text)', fontSize: '2rem', fontWeight: 800 }}>No Results Found</h2>
        <p style={{ maxWidth: '400px', lineHeight: 1.6, marginBottom: '16px' }}>
          It looks like you haven't taken a test recently, or your results have expired.
        </p>
        <button
          onClick={() => navigate('Hexaware-ninja-mock')}
          style={{
            padding: '14px 32px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, var(--accent), #6d28d9)',
            color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: '1.1rem',
            boxShadow: '0 8px 24px rgba(139,92,246,0.3)', transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Start a Mock Test
        </button>
      </div>
    );
  }

  const renderSummaryCard = (title, stats, icon, accentColor = 'var(--accent)') => (
    <div style={{
      background: 'var(--bg)', backdropFilter: 'blur(10px)',
      borderRadius: '24px', border: '1px solid var(--border)',
      padding: '32px', flex: '1 1 300px', position: 'relative', overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(0,0,0,0.2)'
    }}>
      {/* Accent glow */}
      <div style={{
        position: 'absolute', top: -50, right: -50, width: 150, height: 150,
        background: accentColor, filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {icon}
        </div>
        <h3 style={{ margin: 0, color: 'var(--text)', fontSize: '1.4rem', fontWeight: 800 }}>{title}</h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ background: 'var(--bg)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ color: 'var(--text-h)', fontSize: '0.9rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Score</div>
          <div style={{ color: 'var(--text-h)', fontSize: '2rem', fontWeight: 900 }}>
            {stats.correct || stats.score} <span style={{ color: 'var(--text-h)', fontSize: '1.2rem', opacity: 0.6 }}>/ {stats.total}</span>
          </div>
        </div>
        <div style={{ background: 'var(--bg)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border)' }}>
          <div style={{ color: 'var(--text-h)', fontSize: '0.9rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Accuracy</div>
          <div style={{ color: accentColor, fontSize: '2rem', fontWeight: 900 }}>
            {stats.percentage}%
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailedStats = (stats) => (
    <div style={{
      background: 'var(--bg)', backdropFilter: 'blur(10px)',
      borderRadius: '24px', border: '1px solid var(--border)',
      padding: '32px', marginTop: '24px', boxShadow: '0 12px 40px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ margin: '0 0 24px 0', color: 'var(--text)', fontSize: '1.4rem', fontWeight: 800 }}>Detailed Analytics</h3>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px'
      }}>
        {[
          { label: 'Attempted', val: stats.attempted, icon: '📝' },
          { label: 'Correct', val: stats.correct, color: '#10b981', icon: '✅' },
          { label: 'Incorrect', val: stats.incorrect, color: '#ef4444', icon: '❌' },
          { label: 'Skipped', val: stats.skipped, color: '#f59e0b', icon: '⏭️' },
          { label: 'Accuracy', val: `${stats.accuracy}%`, icon: '🎯' },
          { label: 'Time Used', val: formatTime(stats.timeUsed), icon: '⏱️' },
          { label: 'Time Remaining', val: formatTime(stats.timeRemaining), icon: '⏳' },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg)', padding: '20px', borderRadius: '16px',
            border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              <div style={{ color: 'var(--text-h)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</div>
            </div>
            <div style={{ color: item.color || 'var(--text-h)', fontSize: '1.6rem', fontWeight: 900 }}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTopicAnalysis = (topics) => {
    if (!topics || Object.keys(topics).length === 0) return null;
    return (
      <div style={{
        background: 'var(--bg)', backdropFilter: 'blur(10px)',
        borderRadius: '24px', border: '1px solid var(--border)',
        padding: '32px', marginTop: '24px', boxShadow: '0 12px 40px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ margin: '0 0 24px 0', color: 'var(--text)', fontSize: '1.4rem', fontWeight: 800 }}>Topic Analysis (Recommendation Engine)</h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          {Object.entries(topics).map(([topic, data]) => {
            const pct = Math.round((data.correct / data.total) * 100);
            return (
              <div key={topic} style={{
                display: 'flex', alignItems: 'center', gap: '20px',
                background: 'var(--bg)', padding: '16px 20px', borderRadius: '16px',
                border: '1px solid var(--border)'
              }}>
                <div style={{ width: '180px', fontSize: '1rem', color: 'var(--text-h)', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {topic}
                </div>
                <div style={{ flex: 1, height: '10px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${pct}%`,
                    background: pct >= 75 ? 'linear-gradient(90deg, #10b981, #059669)' : pct >= 40 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #ef4444, #dc2626)',
                    borderRadius: '99px', transition: 'width 1s ease'
                  }} />
                </div>
                <div style={{ width: '70px', textAlign: 'right', fontSize: '1rem', color: 'var(--text)', fontWeight: 600 }}>
                  {data.correct} / {data.total}
                </div>
                <div style={{
                  width: '60px', textAlign: 'right', fontSize: '1.1rem', fontWeight: 800,
                  color: pct >= 75 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444'
                }}>
                  {pct}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const activeStats = activeTab === 'overall' ? overall : sections[activeTab];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '12px', background: 'linear-gradient(135deg, var(--text-h), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Test Results
        </h1>
        <p style={{ color: 'var(--text-h)', fontSize: '1.1rem', opacity: 0.8 }}>Review your performance and identify areas for improvement.</p>
      </div>

      <div style={{
        display: 'flex', gap: '12px', marginBottom: '40px', background: 'var(--border)',
        padding: '8px', borderRadius: '100px', width: 'max-content', margin: '0 auto 40px auto', border: '1px solid var(--border)'
      }}>
        {['overall', 'aptitude', 'technical'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 32px', borderRadius: '100px',
              background: activeTab === tab ? 'linear-gradient(135deg, #8b5cf6, #6d28d9)' : 'transparent',
              color: activeTab === tab ? '#fff' : 'var(--text-h)',
              fontWeight: 800, cursor: 'pointer', textTransform: 'capitalize', fontSize: '1rem',
              border: 'none', transition: 'all 0.2s', boxShadow: activeTab === tab ? '0 4px 12px rgba(139,92,246,0.4)' : 'none'
            }}
            onMouseEnter={e => { if (activeTab !== tab) e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { if (activeTab !== tab) e.currentTarget.style.color = 'var(--text-h)'; }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'overall' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {renderSummaryCard('Overall Performance', overall, '🏆', '#8b5cf6')}
          {sections.aptitude && renderSummaryCard('Aptitude', sections.aptitude, '⏱️', '#3b82f6')}
          {sections.technical && renderSummaryCard('Technical', sections.technical, '💻', '#10b981')}
        </motion.div>
      )}

      {activeTab !== 'overall' && activeStats && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {renderSummaryCard(
              activeTab === 'aptitude' ? 'Aptitude Section' : 'Technical Section', 
              activeStats, 
              activeTab === 'aptitude' ? '⏱️' : '💻',
              activeTab === 'aptitude' ? '#3b82f6' : '#10b981'
            )}
          </div>
          {renderDetailedStats(activeStats)}
          {renderTopicAnalysis(activeStats.topics)}
        </motion.div>
      )}

    </motion.div>
  );
}
