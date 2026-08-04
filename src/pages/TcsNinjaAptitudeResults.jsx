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

export default function TcsNinjaAptitudeResults({ navigate }) {
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
        justifyContent: 'center', gap: '16px', color: 'var(--muted)', textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem' }}>📋</div>
        <h2 style={{ color: 'var(--text)' }}>No Results Found</h2>
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

  const renderSummaryCard = (title, stats, icon) => (
    <div style={{
      background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)',
      padding: '24px', flex: 1, minWidth: '300px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ fontSize: '1.5rem' }}>{icon}</div>
        <h3 style={{ margin: 0, color: 'var(--text)', fontSize: '1.2rem' }}>{title}</h3>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Score</div>
          <div style={{ color: 'var(--text)', fontSize: '1.4rem', fontWeight: 800 }}>
            {stats.correct || stats.score} / {stats.total}
          </div>
        </div>
        <div>
          <div style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Percentage</div>
          <div style={{ color: 'var(--text)', fontSize: '1.4rem', fontWeight: 800 }}>
            {stats.percentage}%
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailedStats = (stats) => (
    <div style={{
      background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)',
      padding: '24px', marginTop: '24px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: 'var(--text)' }}>Detailed Analytics</h3>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px'
      }}>
        {[
          { label: 'Attempted', val: stats.attempted },
          { label: 'Correct', val: stats.correct, color: '#10b981' },
          { label: 'Incorrect', val: stats.incorrect, color: '#ef4444' },
          { label: 'Skipped', val: stats.skipped, color: '#f59e0b' },
          { label: 'Accuracy', val: `${stats.accuracy}%` },
          { label: 'Time Used', val: formatTime(stats.timeUsed) },
          { label: 'Time Remaining', val: formatTime(stats.timeRemaining) },
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg)', padding: '16px', borderRadius: '12px' }}>
            <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: '4px' }}>{item.label}</div>
            <div style={{ color: item.color || 'var(--text)', fontSize: '1.2rem', fontWeight: 700 }}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTopicAnalysis = (topics) => {
    if (!topics || Object.keys(topics).length === 0) return null;
    return (
      <div style={{
        background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--border)',
        padding: '24px', marginTop: '24px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: 'var(--text)' }}>Topic Analysis (Recommendation Engine)</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {Object.entries(topics).map(([topic, data]) => {
            const pct = Math.round((data.correct / data.total) * 100);
            return (
              <div key={topic} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '140px', fontSize: '0.9rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {topic}
                </div>
                <div style={{ flex: 1, height: '8px', background: 'var(--bg)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--violet)', borderRadius: '4px' }} />
                </div>
                <div style={{ width: '60px', textAlign: 'right', fontSize: '0.9rem', color: 'var(--muted)', fontWeight: 600 }}>
                  {data.correct}/{data.total}
                </div>
                <div style={{ width: '50px', textAlign: 'right', fontSize: '0.9rem', color: 'var(--text)', fontWeight: 700 }}>
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        {['overall', 'aptitude', 'technical'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 24px', borderRadius: '20px',
              background: activeTab === tab ? 'var(--text)' : 'var(--card)',
              color: activeTab === tab ? 'var(--bg)' : 'var(--muted)',
              fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize',
              border: activeTab !== tab ? '1px solid var(--border)' : 'none'
            }}
          >
            {tab} Results
          </button>
        ))}
      </div>

      {activeTab === 'overall' && (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          {renderSummaryCard('Overall Performance', overall, '🏆')}
          {sections.aptitude && renderSummaryCard('Aptitude', sections.aptitude, '⏱️')}
          {sections.technical && renderSummaryCard('Technical', sections.technical, '💻')}
        </div>
      )}

      {activeTab !== 'overall' && activeStats && (
        <>
          {renderSummaryCard(
            activeTab === 'aptitude' ? 'Aptitude Section' : 'Technical Section', 
            activeStats, 
            activeTab === 'aptitude' ? '⏱️' : '💻'
          )}
          {renderDetailedStats(activeStats)}
          {renderTopicAnalysis(activeStats.topics)}
        </>
      )}

    </motion.div>
  );
}
