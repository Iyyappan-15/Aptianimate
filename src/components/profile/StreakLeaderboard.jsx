// src/components/profile/StreakLeaderboard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getStreakLeaderboard } from '../../repositories/analyticsRepository';
import { useAuth } from '../../contexts/AuthContext';
import { getTodayProgress } from '../../utils/localStorage';
import { getFlameTier } from '../../utils/badgeEngine';

export default function StreakLeaderboard({ onSignInClick }) {
  const { user, profile } = useAuth();
  const [tab, setTab] = useState('weekly'); // 'weekly' | 'all'
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Local guest progress
  const guestProgress = getTodayProgress();
  const guestStreak = guestProgress.streak?.count || 0;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getStreakLeaderboard(tab).then(data => {
      if (mounted) {
        setLeaders(data || []);
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, [tab]);

  return (
    <div style={{
      background: 'var(--surface, #1e293b)',
      border: '1px solid var(--border, #334155)',
      borderRadius: 24,
      padding: '24px 20px',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* ── Header & Tabs ── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.5rem' }}>🏆</span>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main, #ffffff)' }}>
              Streak Leaderboard
            </h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-muted, #94a3b8)' }}>
              Compete daily to climb the ranks
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div style={{
          display: 'flex',
          background: 'var(--surface-hover, #0f172a)',
          padding: 4,
          borderRadius: 12,
          border: '1px solid var(--border, #334155)',
        }}>
          <button
            onClick={() => setTab('weekly')}
            style={{
              background: tab === 'weekly' ? 'var(--violet, #7c3aed)' : 'transparent',
              color: tab === 'weekly' ? '#fff' : 'var(--text-muted, #94a3b8)',
              border: 'none',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            ⚡ This Week
          </button>
          <button
            onClick={() => setTab('all')}
            style={{
              background: tab === 'all' ? 'var(--violet, #7c3aed)' : 'transparent',
              color: tab === 'all' ? '#fff' : 'var(--text-muted, #94a3b8)',
              border: 'none',
              borderRadius: 8,
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            🔥 All-Time
          </button>
        </div>
      </div>

      {/* ── Loading State ── */}
      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading leaderboard...
        </div>
      ) : leaders.length === 0 ? (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          background: 'var(--surface-hover, rgba(255,255,255,0.02))',
          borderRadius: 16,
          color: 'var(--text-muted)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🌱</div>
          <p style={{ margin: 0, fontWeight: 600 }}>Be the first on the leaderboard this week!</p>
          <p style={{ margin: '4px 0 0', fontSize: '0.82rem' }}>Practice today to secure the #1 spot.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {leaders.map((item, index) => {
            const isCurrentUser = user?.id && item.id === user.id;
            const flame = getFlameTier(item.streak);
            const rank = index + 1;
            const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: isCurrentUser
                    ? 'rgba(124, 58, 237, 0.15)'
                    : 'var(--surface-hover, rgba(255,255,255,0.02))',
                  border: isCurrentUser
                    ? '1.5px solid var(--violet, #7c3aed)'
                    : '1px solid var(--border, transparent)',
                }}
              >
                {/* Rank */}
                <div style={{
                  width: 32,
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: rank <= 3 ? '1.25rem' : '0.88rem',
                  color: rank <= 3 ? 'inherit' : 'var(--text-muted, #94a3b8)',
                }}>
                  {medal}
                </div>

                {/* Avatar */}
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--violet, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  {item.avatar_url ? (
                    <img src={item.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    (item.username || 'U')[0].toUpperCase()
                  )}
                </div>

                {/* Name */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: 'var(--text-main, #ffffff)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    @{item.username || 'Aptitude Learner'}
                    {isCurrentUser && (
                      <span style={{
                        marginLeft: 6,
                        fontSize: '0.7rem',
                        background: 'var(--violet, #7c3aed)',
                        color: '#fff',
                        padding: '1px 6px',
                        borderRadius: 8,
                        fontWeight: 800,
                      }}>
                        YOU
                      </span>
                    )}
                  </div>
                  {item.badges && item.badges.length > 0 && (
                    <div style={{ fontSize: '0.75rem', marginTop: 2 }}>
                      {item.badges.slice(0, 3).map(b => (
                        <span key={b.id} title={b.name} style={{ marginRight: 4 }}>{b.icon}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Streak Count */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  color: flame.color,
                }}>
                  <span>🔥</span>
                  <span>{item.streak}d</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Guest User Sticky Row ── */}
      {(!user || user.is_anonymous) && (
        <div style={{
          marginTop: 18,
          padding: '14px 16px',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(245, 158, 11, 0.12))',
          border: '1.5px dashed var(--violet, #7c3aed)',
          borderRadius: 16,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.2rem' }}>👤</span>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-main, #ffffff)' }}>
                You (Guest) · <span style={{ color: '#f97316' }}>🔥 {guestStreak}d streak</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-muted, #94a3b8)' }}>
                Sign in to save your spot on the official leaderboard
              </p>
            </div>
          </div>

          <button
            onClick={onSignInClick}
            style={{
              background: 'var(--violet, #7c3aed)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 10,
              padding: '8px 16px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Claim Spot →
          </button>
        </div>
      )}
    </div>
  );
}
