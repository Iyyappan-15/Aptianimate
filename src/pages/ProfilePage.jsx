// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import WeeklyChart from '../components/profile/WeeklyChart';
import ActivityHeatmap from '../components/profile/ActivityHeatmap';
import StatsCards from '../components/profile/StatsCards';
import { deleteAllAnalytics } from '../repositories/analyticsRepository';
import { supabase } from '../lib/supabase';

// ─── Section Wrapper ───────────────────────────────────────────────────────
function Section({ title, icon, children }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '24px 28px',
      marginBottom: 20,
    }}>
      <h2 style={{
        fontSize: '0.95rem', fontWeight: 800, color: 'var(--text)',
        margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8,
        textTransform: 'uppercase', letterSpacing: '0.07em',
      }}>
        <span>{icon}</span> {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Account Settings ─────────────────────────────────────────────────────
function AccountSettings({ user, profile, signOut }) {
  const [resetting, setResetting] = useState(false);
  const [resettingProgress, setResettingProgress] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleResetProgress = async () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    try {
      setResettingProgress(true);
      await deleteAllAnalytics(user.id);
      // Also delete topic_progress
      if (supabase) await supabase.from('topic_progress').delete().eq('user_id', user.id);
      setConfirmReset(false);
      window.location.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setResettingProgress(false);
    }
  };

  const handleExportProgress = async () => {
    try {
      const res = await fetch(`https://api.supabase.io`, { method: 'GET' });
      // Build a JSON export of sessions from daily_activity
      if (supabase) {
        const { data } = await supabase
          .from('daily_activity')
          .select('*')
          .eq('user_id', user.id)
          .order('activity_date', { ascending: true });
        const blob = new Blob([JSON.stringify(data || [], null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aptianimate_progress_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    try {
      // Delete profile — cascade will clean up everything
      if (supabase) {
        await supabase.from('profiles').delete().eq('id', user.id);
      }
      await signOut();
    } catch (e) {
      console.error(e);
    }
  };

  const settingRow = (icon, label, description, action, danger = false, loading = false, confirm = false) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 0', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10, display: 'flex',
          alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
          background: danger ? 'rgba(220,38,38,0.1)' : 'var(--surface2)',
        }}>{icon}</div>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: danger ? 'var(--coral)' : 'var(--text)' }}>{label}</p>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted2)' }}>{description}</p>
        </div>
      </div>
      <button
        onClick={action}
        disabled={loading}
        style={{
          padding: '6px 16px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700,
          border: danger ? '1px solid rgba(220,38,38,0.4)' : '1px solid var(--border)',
          background: danger ? (confirm ? 'var(--coral)' : 'transparent') : 'var(--surface2)',
          color: danger ? (confirm ? '#fff' : 'var(--coral)') : 'var(--text)',
          cursor: loading ? 'wait' : 'pointer',
          transition: 'all 0.2s', whiteSpace: 'nowrap',
        }}
      >
        {loading ? '…' : confirm ? 'Confirm?' : 'Action'}
      </button>
    </div>
  );

  return (
    <div>
      {/* Language preference */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', background: 'var(--surface2)' }}>🌐</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>Language</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted2)' }}>Interface language preference</p>
          </div>
        </div>
        <select style={{
          padding: '6px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700,
          border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', cursor: 'pointer',
        }}>
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* Export */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', background: 'var(--surface2)' }}>📤</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>Export Progress</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted2)' }}>Download your activity as JSON</p>
          </div>
        </div>
        <button
          onClick={handleExportProgress}
          style={{ padding: '6px 16px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text)', cursor: 'pointer' }}
        >
          Export
        </button>
      </div>

      {/* Reset Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', background: 'rgba(217,119,6,0.1)' }}>🔄</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: 'var(--amber)' }}>Reset Progress</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted2)' }}>Erase all analytics and topic progress</p>
          </div>
        </div>
        <button
          onClick={handleResetProgress}
          disabled={resettingProgress}
          style={{
            padding: '6px 16px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700,
            border: '1px solid rgba(217,119,6,0.4)',
            background: confirmReset ? 'var(--amber)' : 'transparent',
            color: confirmReset ? '#fff' : 'var(--amber)',
            cursor: resettingProgress ? 'wait' : 'pointer', transition: 'all 0.2s',
          }}
        >
          {resettingProgress ? '…' : confirmReset ? '⚠️ Confirm?' : 'Reset'}
        </button>
      </div>

      {/* Logout */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', background: 'rgba(220,38,38,0.08)' }}>🚪</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)' }}>Logout</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted2)' }}>Sign out of your account</p>
          </div>
        </div>
        <button
          onClick={signOut}
          style={{ padding: '6px 16px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700, border: '1px solid rgba(220,38,38,0.4)', background: 'transparent', color: 'var(--coral)', cursor: 'pointer' }}
        >
          Sign Out
        </button>
      </div>

      {/* Delete Account */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', background: 'rgba(220,38,38,0.1)' }}>🗑️</div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '0.88rem', color: 'var(--coral)' }}>Delete Account</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted2)' }}>Permanently delete your account and all data</p>
          </div>
        </div>
        <button
          onClick={handleDeleteAccount}
          style={{
            padding: '6px 16px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700,
            border: '1px solid rgba(220,38,38,0.4)',
            background: confirmDelete ? 'var(--coral)' : 'transparent',
            color: confirmDelete ? '#fff' : 'var(--coral)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
        >
          {confirmDelete ? '⚠️ Confirm Delete' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Profile Page ────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user, profile, signOut } = useAuth();

  if (!user || !profile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 16 }}>
        <div style={{ fontSize: '3rem' }}>🔒</div>
        <p style={{ color: 'var(--muted)', fontWeight: 600 }}>Please log in to view your profile.</p>
      </div>
    );
  }

  const avatarSrc = profile.avatar_url || user?.user_metadata?.avatar_url || null;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 60px' }}>
      {/* ── Profile Hero ── */}
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20,
        overflow: 'hidden', marginBottom: 20,
        boxShadow: 'var(--shadow)',
      }}>
        <div style={{ height: 80, background: 'linear-gradient(135deg, var(--violet), #6d28d9)' }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, padding: '0 28px 24px', marginTop: -44 }}>
          {avatarSrc ? (
            <img src={avatarSrc} alt={profile.username} style={{
              display: 'inline-block', width: 88, height: 88, borderRadius: '50%',
              border: '4px solid var(--surface)', objectFit: 'cover',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)', flexShrink: 0,
            }} />
          ) : (
            <div style={{
              width: 88, height: 88, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--violet), #6d28d9)',
              border: '4px solid var(--surface)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: '2rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)', flexShrink: 0,
            }}>
              {profile.username?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
          <div style={{ paddingBottom: 4 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: '1.4rem', fontWeight: 900, color: 'var(--text)' }}>
              {profile.full_name || profile.username}
            </h1>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'var(--violet)' }}>
              @{profile.username}
            </p>
          </div>
        </div>
      </div>

      {/* ── Statistics Cards ── */}
      <Section title="Statistics" icon="📊">
        <StatsCards />
      </Section>

      {/* ── Weekly Progress Chart ── */}
      <Section title="Weekly Progress" icon="📈">
        <div style={{ marginBottom: 8 }}>
          <p style={{ margin: '0 0 16px', fontSize: '0.82rem', color: 'var(--muted)' }}>
            Last 12 weeks — Problems solved vs. minutes practiced
          </p>
          <WeeklyChart />
        </div>
      </Section>

      {/* ── Activity Heatmap ── */}
      <Section title="Activity" icon="🗓">
        <div style={{ overflowX: 'auto' }}>
          <ActivityHeatmap />
        </div>
      </Section>

      {/* ── Account Settings ── */}
      <Section title="Account Settings" icon="⚙️">
        <AccountSettings user={user} profile={profile} signOut={signOut} />
      </Section>
    </div>
  );
}
