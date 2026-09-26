// src/components/StreakDangerBanner.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StreakDangerBanner({ streak = 0, todaySolved = 0, streakFreezes = 0, onPracticeClick }) {
  const [dismissed, setDismissed] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    if (sessionStorage.getItem('streak_banner_dismissed')) {
      setDismissed(true);
      return;
    }

    // Check IST time: show if hour >= 18 (6 PM IST)
    const now = new Date();
    const istHour = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)).getUTCHours();

    const isLateDay = istHour >= 18;
    const hasActiveStreak = Number(streak) > 0;
    const goalNotMet = Number(todaySolved) < 5;

    if (isLateDay && hasActiveStreak && goalNotMet) {
      setShouldShow(true);
    } else {
      setShouldShow(false);
    }
  }, [streak, todaySolved]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('streak_banner_dismissed', 'true');
  };

  if (dismissed || !shouldShow) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        style={{
          background: 'linear-gradient(90deg, #b91c1c 0%, #dc2626 50%, #ea580c 100%)',
          color: '#ffffff',
          padding: '10px 16px',
          fontSize: '0.86rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          position: 'relative',
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(220, 38, 38, 0.35)',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>⏰</span>

        <span style={{ flex: '1 1 auto', textAlign: 'center' }}>
          <strong>Your 🔥 {streak}-day streak expires tonight!</strong>{' '}
          {streakFreezes > 0 ? (
            <span>(🛡️ {streakFreezes} Streak Freeze ready if you miss)</span>
          ) : (
            <span>You need {Math.max(0, 5 - todaySolved)} more questions to save it.</span>
          )}
        </span>

        <button
          onClick={onPracticeClick}
          style={{
            background: '#ffffff',
            color: '#b91c1c',
            border: 'none',
            borderRadius: 8,
            padding: '5px 12px',
            fontWeight: 700,
            fontSize: '0.8rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Practice Now →
        </button>

        <button
          onClick={handleDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1rem',
            cursor: 'pointer',
            padding: '0 4px',
            lineHeight: 1,
          }}
          title="Dismiss for today"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
