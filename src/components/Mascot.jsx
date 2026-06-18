// src/components/Mascot.jsx
import { useState, useEffect } from 'react';

export default function Mascot({ result }) {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (result) {
      setShowBubble(true);
      const timer = setTimeout(() => setShowBubble(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const state = result === 'correct' ? 'happy' : result === 'wrong' ? 'thinking' : 'neutral';

  return (
    <div className="mascot-wrap" onClick={() => setShowBubble(p => !p)}>
      <svg viewBox="0 0 100 100" style={{
        animation: state === 'happy' ? 'mascotBounce 1s ease 3' : 'floatY 4s ease-in-out infinite'
      }}>
        {/* Body */}
        <rect x="20" y="30" width="60" height="50" rx="16" fill="var(--surface3)" stroke="var(--border)" strokeWidth="4" />
        {/* Screen */}
        <rect x="30" y="40" width="40" height="24" rx="6" fill="#11111a" />

        {/* Eyes based on state */}
        {state === 'happy' && (
          <g stroke="var(--teal)" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M38 52 Q42 46 46 52" />
            <path d="M54 52 Q58 46 62 52" />
          </g>
        )}
        {state === 'wrong' && (
          <g stroke="var(--coral)" strokeWidth="3" strokeLinecap="round" fill="none">
            <line x1="38" y1="48" x2="46" y2="54" /><line x1="38" y1="54" x2="46" y2="48" />
            <line x1="54" y1="48" x2="62" y2="54" /><line x1="54" y1="54" x2="62" y2="48" />
          </g>
        )}
        {state === 'neutral' && (
          <g fill="var(--violet)">
            <circle cx="42" cy="52" r="4" />
            <circle cx="58" cy="52" r="4" />
          </g>
        )}

        {/* Antenna */}
        <line x1="50" y1="30" x2="50" y2="15" stroke="var(--border)" strokeWidth="4" />
        <circle cx="50" cy="12" r="5" fill={state === 'happy' ? 'var(--teal)' : state === 'wrong' ? 'var(--coral)' : 'var(--violet)'}
          style={{ animation: 'pulse 1.5s infinite' }} />
      </svg>

      {showBubble && (
        <div className="mascot-bubble">
          {state === 'happy' ? 'Great job! Keep the streak going!' :
           state === 'wrong' ? 'Don\'t worry, let\'s learn from this!' :
           'I\'m here to help you learn!'}
        </div>
      )}
    </div>
  );
}
