/**
 * Timer.jsx
 * Sticky top-right countdown timer for the TCS Ninja test.
 * Turns red when < 5 minutes remain.
 */
import { useMemo } from 'react';

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function Timer({ secondsLeft, totalSeconds }) {
  const { minutes, seconds, isUrgent } = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return { minutes: m, seconds: s, isUrgent: secondsLeft < 5 * 60 };
  }, [secondsLeft]);

  const progress = totalSeconds > 0 ? (secondsLeft / totalSeconds) * 100 : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: isUrgent ? '#fee2e2' : 'var(--card)',
        border: `2px solid ${isUrgent ? '#ef4444' : 'var(--border)'}`,
        borderRadius: '12px',
        padding: '8px 16px',
        transition: 'all 0.3s ease',
        boxShadow: isUrgent ? '0 0 0 3px rgba(239,68,68,0.2)' : 'none',
        animation: isUrgent && secondsLeft < 60 ? 'pulse 1s infinite' : 'none',
      }}
    >
      <span style={{ fontSize: '1.1rem' }}>🕒</span>
      <span
        style={{
          fontWeight: 700,
          fontSize: '1.2rem',
          fontFamily: 'monospace',
          color: isUrgent ? '#ef4444' : 'var(--text)',
          letterSpacing: '2px',
        }}
      >
        {pad(minutes)}:{pad(seconds)}
      </span>
      {/* Mini progress bar */}
      <div
        style={{
          width: '60px',
          height: '4px',
          background: 'var(--border)',
          borderRadius: '99px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: isUrgent ? '#ef4444' : 'var(--violet)',
            borderRadius: '99px',
            transition: 'width 1s linear',
          }}
        />
      </div>
    </div>
  );
}
