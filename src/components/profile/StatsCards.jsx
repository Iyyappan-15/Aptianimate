// src/components/profile/StatsCards.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useStatistics } from '../../hooks/useAnalytics';
import { useStreak } from '../../hooks/useAnalytics';
import { useBookmarks } from '../../hooks/useBookmarks';

// Animated counter
function AnimatedNumber({ value, duration = 800 }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const start = Date.now();
    const from = 0;
    const to = Number(value) || 0;

    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return <>{display}</>;
}

function Card({ icon, title, value, description, loading, color = 'var(--violet)', suffix = '' }) {
  if (loading) {
    return (
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16,
        padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--surface3)', animation: 'shimmer 1.4s infinite' }} />
        <div style={{ height: 12, width: '60%', borderRadius: 6, background: 'var(--surface3)', animation: 'shimmer 1.4s infinite' }} />
        <div style={{ height: 28, width: '40%', borderRadius: 6, background: 'var(--surface3)', animation: 'shimmer 1.4s infinite' }} />
        <div style={{ height: 10, width: '80%', borderRadius: 6, background: 'var(--surface3)', animation: 'shimmer 1.4s infinite' }} />
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20,
      padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 8,
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
    }}
      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: '50%', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        marginBottom: 8,
      }}>
        {icon}
      </div>
      <p style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
        {title}
      </p>
      <p style={{ fontSize: '2.1rem', fontWeight: 900, color: 'var(--text)', margin: '2px 0 0 0', lineHeight: 1 }}>
        <AnimatedNumber value={value} />{suffix}
      </p>
      <p style={{ fontSize: '0.75rem', color: 'var(--muted2)', margin: 0 }}>{description}</p>
    </div>
  );
}

export default function StatsCards() {
  const { data: stats, loading: statsLoading } = useStatistics();
  const { currentStreak, longestStreak, loading: streakLoading } = useStreak();
  const { bookmarks } = useBookmarks();
  const loading = statsLoading || streakLoading;

  const fmt = (seconds) => {
    if (!seconds) return '0s';
    if (seconds < 60) return `${seconds}s`;
    return `${Math.round(seconds / 60)}m`;
  };

  const cards = [
    { icon: '✅', title: 'Problems Solved', value: stats?.totalSolved ?? 0, description: 'Total across all topics', color: '#16a34a' },
    { icon: '⏱', title: 'Practice Time', value: stats?.totalMinutes ?? 0, suffix: 'm', description: 'Total minutes practiced', color: '#2563eb' },
    { icon: '📅', title: 'Active Days', value: stats?.activeDays ?? 0, description: 'Days with activity', color: '#7c3aed' },
    { icon: '🔥', title: 'Current Streak', value: currentStreak, suffix: 'd', description: 'Consecutive days', color: '#dc2626' },
    { icon: '🏆', title: 'Longest Streak', value: longestStreak, suffix: 'd', description: 'Best streak ever', color: '#d97706' },
    { icon: '📊', title: 'Avg / Day', value: stats?.avgProblemsPerDay ?? 0, description: 'Problems per active day', color: '#0d9488' },
    { icon: '⚡', title: 'Avg Solve Time', value: stats?.avgSolveTime ? Math.round(stats.avgSolveTime / 60) : 0, suffix: 'm', description: 'Average per question', color: '#7c3aed' },
    { icon: '🚀', title: 'Fastest Solve', value: stats?.fastestSolve ? Math.round(stats.fastestSolve / 60) : 0, suffix: 'm', description: 'Fastest single question', color: '#16a34a' },
    { icon: '📚', title: 'Topics Studied', value: stats?.topicsCompleted ?? 0, description: 'Unique topics covered', color: '#2563eb' },
    { icon: '💾', title: 'Bookmarks', value: bookmarks?.length ?? 0, description: 'Saved questions', color: '#d97706' },
    { icon: '🎯', title: 'Sessions', value: stats?.totalSessions ?? 0, description: 'Total practice sessions', color: '#dc2626' },
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
      gap: 16,
    }}>
      {cards.map((card) => (
        <Card key={card.title} {...card} loading={loading} />
      ))}
    </div>
  );
}
