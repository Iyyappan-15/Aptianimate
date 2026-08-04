/**
 * Timer.jsx — Sticky countdown timer for the TCS Ninja test.
 * Turns amber at <10 min, red at <5 min. Auto pulses when urgent.
 */
import { useMemo } from 'react';

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function Timer({ secondsLeft, totalSeconds }) {
  const { minutes, seconds, isWarning, isUrgent } = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return {
      minutes: m,
      seconds: s,
      isWarning: secondsLeft < 10 * 60,
      isUrgent: secondsLeft < 5 * 60,
    };
  }, [secondsLeft]);

  const progressPct = totalSeconds > 0 ? (secondsLeft / totalSeconds) * 100 : 0;

  const timerColor = isUrgent ? '#ef4444' : isWarning ? '#f59e0b' : 'var(--violet)';
  const timerBg = isUrgent ? 'rgba(239,68,68,0.08)' : isWarning ? 'rgba(245,158,11,0.08)' : 'rgba(139,92,246,0.06)';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: timerBg,
      border: `2px solid ${timerColor}`,
      borderRadius: '14px',
      padding: '8px 16px',
      transition: 'all 0.4s ease',
      animation: isUrgent && secondsLeft < 60 ? 'timerPulse 1s infinite' : 'none',
    }}>
      <span style={{ fontSize: '1rem' }}>🕒</span>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
        <span style={{
          fontWeight: 800,
          fontSize: '1.25rem',
          fontFamily: 'ui-monospace, monospace',
          color: timerColor,
          letterSpacing: '2px',
          transition: 'color 0.4s',
        }}>
          {pad(minutes)}:{pad(seconds)}
        </span>
        <span style={{ fontSize: '0.6rem', color: timerColor, opacity: 0.7, marginTop: '1px' }}>
          {isUrgent ? 'HURRY UP!' : isWarning ? 'Time running low' : 'remaining'}
        </span>
      </div>

      {/* Circular arc indicator */}
      <svg width="32" height="32" viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
        {/* Background circle */}
        <circle cx="16" cy="16" r="13" fill="none" stroke="var(--border)" strokeWidth="3" />
        {/* Progress arc */}
        <circle
          cx="16" cy="16" r="13"
          fill="none"
          stroke={timerColor}
          strokeWidth="3"
          strokeDasharray={`${2 * Math.PI * 13}`}
          strokeDashoffset={`${2 * Math.PI * 13 * (1 - progressPct / 100)}`}
          strokeLinecap="round"
          transform="rotate(-90 16 16)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.4s' }}
        />
      </svg>

      <style>{`
        @keyframes timerPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(239,68,68,0); }
        }
      `}</style>
    </div>
  );
}
