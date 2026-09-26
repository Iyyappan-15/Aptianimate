// src/components/TodayGoalProgress.jsx
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useStreak } from '../hooks/useAnalytics';
import { getTodayProgress } from '../utils/localStorage';
import { getTodayActivity } from '../repositories/analyticsRepository';
import { getFlameTier } from '../utils/badgeEngine';

export default function TodayGoalProgress({ navigate, onOpenDailyChallenge }) {
  const { user } = useAuth();
  const { currentStreak: memberStreak, loading: streakLoading, refresh: refreshStreak } = useStreak();

  const [todaySolved, setTodaySolved] = useState(0);
  const target = 5;

  const loadProgress = useCallback(async () => {
    if (user?.id) {
      try {
        const act = await getTodayActivity(user.id);
        setTodaySolved(act.problems_solved || 0);
      } catch {
        setTodaySolved(0);
      }
    } else {
      const guest = getTodayProgress();
      setTodaySolved(guest.count || 0);
    }
  }, [user?.id]);

  useEffect(() => {
    loadProgress();
    const handleUpdate = () => loadProgress();
    window.addEventListener('streak-updated', handleUpdate);
    return () => window.removeEventListener('streak-updated', handleUpdate);
  }, [loadProgress]);

  const streak = user?.id ? memberStreak : (getTodayProgress().streak?.count || 0);
  const flame = getFlameTier(streak);
  const percentage = Math.min(100, Math.round((todaySolved / target) * 100));
  const isGoalMet = todaySolved >= target;

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto 20px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 18,
        padding: '16px 20px',
        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        {/* Left: Streak icon & Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 220 }}>
          <div style={{
            fontSize: '1.8rem',
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${flame.color}15`,
            border: `1.5px solid ${flame.color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: flame.glow,
            flexShrink: 0
          }}>
            🔥
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 800, fontSize: '0.95rem', color: flame.color }}>
                {streak} Day Streak
              </span>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                background: 'var(--surface-hover)',
                padding: '2px 6px',
                borderRadius: 6
              }}>
                {flame.label}
              </span>
            </div>
            <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {isGoalMet
                ? "Goal met for today! Streak secured."
                : `${Math.max(0, target - todaySolved)} questions left to extend streak`}
            </p>
          </div>
        </div>

        {/* Center: Progress Bar */}
        <div style={{ flex: '1 1 240px', minWidth: 200 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6 }}>
            <span style={{ color: 'var(--text-main)' }}>Daily Goal</span>
            <span style={{ color: isGoalMet ? '#10b981' : 'var(--violet)' }}>
              {todaySolved} / {target} questions
            </span>
          </div>

          <div style={{
            height: 8,
            borderRadius: 4,
            background: 'var(--surface-hover)',
            overflow: 'hidden',
            border: '1px solid var(--border)'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                height: '100%',
                borderRadius: 4,
                background: isGoalMet
                  ? 'linear-gradient(90deg, #10b981, #059669)'
                  : 'linear-gradient(90deg, var(--violet), #f59e0b)'
              }}
            />
          </div>
        </div>

        {/* Right: Quick Action Button */}
        <div>
          {!isGoalMet ? (
            <button
              onClick={() => {
                if (onOpenDailyChallenge) onOpenDailyChallenge();
                else navigate('category/quantitative-aptitude');
              }}
              style={{
                background: 'var(--surface-hover)',
                color: 'var(--text-main)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <span>⚡</span> Practice Now
            </button>
          ) : (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#10b981',
              fontWeight: 800,
              fontSize: '0.82rem'
            }}>
              <span>✓</span> Done
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
