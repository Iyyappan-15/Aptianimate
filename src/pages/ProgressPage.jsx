import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import WeeklyChart from '../components/profile/WeeklyChart';
import ActivityHeatmap from '../components/profile/ActivityHeatmap';
import StatsCards from '../components/profile/StatsCards';
import TopicRadarChart from '../components/profile/TopicRadarChart';

// ─── Section Wrapper ───────────────────────────────────────────────────────
function Section({ title, icon, children }) {
  return (
    <div className="profile-section-card" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '24px 20px',
      marginBottom: 24,
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{
          fontSize: '1rem', fontWeight: 800, color: 'var(--text)',
          margin: 0, display: 'flex', alignItems: 'center', gap: 10,
          textTransform: 'uppercase', letterSpacing: '0.07em',
        }}>
          <span style={{ fontSize: '1.2rem' }}>{icon}</span> {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

export default function ProgressPage({ navigate }) {
  const { user, profile } = useAuth();

  if (!user || !profile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 16 }}>
        <div style={{ fontSize: '3rem' }}>🔒</div>
        <p style={{ color: 'var(--muted)', fontWeight: 600 }}>Please log in to view your progress dashboard.</p>
        <button 
          onClick={() => navigate('home')}
          style={{ padding: '10px 20px', borderRadius: 12, border: 'none', background: 'var(--violet)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '16px 14px 60px', width: '100%', boxSizing: 'border-box', animation: 'fadeIn 0.5s ease' }}>
      
      {/* ── Dashboard Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text)', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            Your Learning Journey
          </h1>
          <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.95rem' }}>
            Track your aptitude mastery, streaks, and problem-solving speed.
          </p>
        </div>
        <button 
          onClick={() => navigate('home')} 
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            background: 'var(--surface2)', color: 'var(--text)', fontSize: '0.9rem', 
            fontWeight: 700, padding: '10px 18px', borderRadius: 14, 
            border: '1px solid var(--border)', cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'var(--surface3)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'var(--surface2)'}
        >
          <span>←</span> Back to Dashboard
        </button>
      </div>

      {/* ── Statistics Grid ── */}
      <div style={{ marginBottom: 24 }}>
        <StatsCards />
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, marginBottom: 24 }}>
        {/* Weekly Progress Chart */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Section title="Weekly Progress" icon="📈">
            <p style={{ margin: '-10px 0 20px', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Last 12 weeks — Problems solved vs. minutes practiced
            </p>
            <WeeklyChart />
          </Section>
        </div>

        {/* Topic Mastery Radar Chart */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <TopicRadarChart />
        </div>
      </div>

      {/* ── Activity Heatmap ── */}
      <Section title="Activity Heatmap" icon="🗓">
        <p style={{ margin: '-10px 0 20px', fontSize: '0.85rem', color: 'var(--muted)' }}>
          Your daily practice consistency over the year
        </p>
        <div style={{ overflowX: 'auto', paddingBottom: 10 }}>
          <ActivityHeatmap />
        </div>
      </Section>

    </div>
  );
}
