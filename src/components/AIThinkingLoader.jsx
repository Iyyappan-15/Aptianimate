// src/components/AIThinkingLoader.jsx
// ─── Premium AI Thinking Loading Screen ────────────────────────────────────────
import { useState, useEffect } from 'react';

// ─── Topic-aware tips database ─────────────────────────────────────────────────
const GENERIC_TIPS = [
  { icon: '⚡', title: 'Speed Trick', body: 'For Time & Work, always find the per-day work rate first. It makes any combination trivial.' },
  { icon: '📐', title: 'Geometry Shortcut', body: 'The area of any triangle can be found with base × height ÷ 2 — even for irregular ones.' },
  { icon: '💡', title: 'Mental Math', body: 'To find 15% of any number, first find 10%, then add half of that. Done in 2 seconds!' },
  { icon: '🏆', title: 'Exam Tip', body: 'In competitive exams, if two options look the same, one of them is almost always the correct answer.' },
  { icon: '🔢', title: 'Number Series', body: 'In most number series questions, try checking for prime numbers, squares, or Fibonacci patterns first.' },
  { icon: '⏱️', title: 'Time Management', body: 'Never spend more than 90 seconds on a single aptitude question. Mark and move on.' },
  { icon: '📊', title: 'Data Interpretation', body: 'Always read the title and units of a chart first. 90% of wrong answers come from misreading the scale.' },
  { icon: '🎯', title: 'Percentage Hack', body: 'x% of y always equals y% of x. So 14% of 50 is the same as 50% of 14 = 7. Instant answer!' },
  { icon: '🔄', title: 'Ratio Trick', body: 'To add ratios a:b and c:d, cross-multiply. The result is (ad + bc) : bd.' },
  { icon: '🧩', title: 'Pattern Recognition', body: 'In coding-decoding questions, try +2, -2, or reverse-alphabet mappings first — they cover 70% of cases.' },
  { icon: '📈', title: 'Profit & Loss', body: 'Marked Price × (1 - discount%) = Selling Price. Learn this formula cold — it appears in every exam.' },
  { icon: '🌀', title: 'LCM Shortcut', body: 'LCM of any two numbers = (a × b) ÷ GCD(a, b). Knowing the GCD gives you the LCM for free.' },
];

// Status messages that rotate during loading
const STATUS_MESSAGES = [
  '🧠 Reading the question...',
  '🔍 Identifying the concept...',
  '📐 Choosing the best method...',
  '✏️ Building the step-by-step solution...',
  '🎨 Preparing the visual explanation...',
  '✨ Almost ready...',
];

// ─── Animated SVG Brain ────────────────────────────────────────────────────────
function AnimatedBrain() {
  return (
    <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 8px' }}>
      {/* Outer glow ring */}
      <div style={{
        position: 'absolute', inset: '-8px',
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, var(--violet), #7c3aed, #10b981, var(--violet))',
        animation: 'brainRingSpin 3s linear infinite',
        opacity: 0.4,
        filter: 'blur(4px)',
      }} />
      {/* Inner circle */}
      <div style={{
        position: 'absolute', inset: '8px',
        borderRadius: '50%',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 32px rgba(124,58,237,0.15)',
      }}>
        {/* Brain SVG */}
        <svg width="52" height="52" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ animation: 'brainPulse 2s ease-in-out infinite' }}>
          {/* Left hemisphere */}
          <path d="M32 12C32 12 18 14 16 26C14 36 18 42 24 44L32 46" stroke="var(--violet)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          {/* Right hemisphere */}
          <path d="M32 12C32 12 46 14 48 26C50 36 46 42 40 44L32 46" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          {/* Center divider */}
          <line x1="32" y1="10" x2="32" y2="48" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
          {/* Synapse dots — pulsing */}
          <circle cx="22" cy="26" r="3" fill="var(--violet)" style={{ animation: 'synapse1 1.8s ease-in-out infinite' }}/>
          <circle cx="20" cy="36" r="2.5" fill="var(--violet)" style={{ animation: 'synapse2 2.2s ease-in-out infinite' }}/>
          <circle cx="42" cy="26" r="3" fill="#10b981" style={{ animation: 'synapse3 1.5s ease-in-out infinite' }}/>
          <circle cx="44" cy="36" r="2.5" fill="#10b981" style={{ animation: 'synapse4 2s ease-in-out infinite' }}/>
          <circle cx="32" cy="30" r="3.5" fill="var(--violet)" opacity="0.7" style={{ animation: 'synapseCenter 1.2s ease-in-out infinite' }}/>
          {/* Spark lines */}
          <line x1="25" y1="26" x2="29" y2="30" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" strokeLinecap="round" style={{ animation: 'sparkFade1 1.8s ease-in-out infinite' }}/>
          <line x1="39" y1="26" x2="35" y2="30" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" strokeLinecap="round" style={{ animation: 'sparkFade2 2.2s ease-in-out infinite' }}/>
          <line x1="22" y1="39" x2="28" y2="34" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" strokeLinecap="round" style={{ animation: 'sparkFade1 2s ease-in-out 0.3s infinite' }}/>
          <line x1="42" y1="39" x2="36" y2="34" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" strokeLinecap="round" style={{ animation: 'sparkFade2 1.6s ease-in-out 0.5s infinite' }}/>
          {/* Top antenna / signal */}
          <path d="M32 10 Q28 6 24 8" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
          <path d="M32 10 Q36 6 40 8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
          <circle cx="32" cy="9" r="2" fill="var(--violet)" style={{ animation: 'topSignal 1s ease-in-out infinite' }}/>
        </svg>
      </div>

      {/* Orbiting particles */}
      {[0, 120, 240].map((deg, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '8px', height: '8px',
          marginTop: '-4px', marginLeft: '-4px',
          borderRadius: '50%',
          background: i === 0 ? 'var(--violet)' : i === 1 ? '#10b981' : '#f59e0b',
          boxShadow: `0 0 8px ${i === 0 ? 'var(--violet)' : i === 1 ? '#10b981' : '#f59e0b'}`,
          animation: `orbit${i} 3s linear infinite`,
          animationDelay: `${i * -1}s`,
        }} />
      ))}

      <style>{`
        @keyframes brainRingSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes brainPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        @keyframes synapse1 { 0%,100%{r:3;opacity:1} 50%{r:4.5;opacity:0.5} }
        @keyframes synapse2 { 0%,100%{r:2.5;opacity:0.8} 50%{r:4;opacity:0.3} }
        @keyframes synapse3 { 0%,100%{r:3;opacity:1} 50%{r:5;opacity:0.4} }
        @keyframes synapse4 { 0%,100%{r:2.5;opacity:0.9} 50%{r:4;opacity:0.3} }
        @keyframes synapseCenter { 0%,100%{r:3.5;opacity:0.7} 50%{r:5.5;opacity:1} }
        @keyframes sparkFade1 { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes sparkFade2 { 0%,100%{opacity:0} 50%{opacity:0.8} }
        @keyframes topSignal { 0%,100%{r:2;opacity:1} 50%{r:3.5;opacity:0.4} }
        @keyframes orbit0 {
          from { transform: rotate(0deg) translateX(55px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(55px) rotate(-360deg); }
        }
        @keyframes orbit1 {
          from { transform: rotate(120deg) translateX(55px) rotate(-120deg); }
          to   { transform: rotate(480deg) translateX(55px) rotate(-480deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(240deg) translateX(55px) rotate(-240deg); }
          to   { transform: rotate(600deg) translateX(55px) rotate(-600deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Progress Wave Bar ─────────────────────────────────────────────────────────
function WaveProgressBar() {
  return (
    <div style={{ width: '100%', maxWidth: '360px', margin: '0 auto', height: '4px', borderRadius: '4px', background: 'var(--surface2)', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0,
        height: '100%', width: '60%', borderRadius: '4px',
        background: 'linear-gradient(90deg, var(--violet), #10b981)',
        animation: 'waveSlide 1.8s ease-in-out infinite',
        boxShadow: '0 0 12px rgba(124,58,237,0.5)',
      }} />
      <style>{`
        @keyframes waveSlide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}

// ─── Tip Card ─────────────────────────────────────────────────────────────────
function TipCard({ tip, visible }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      background: 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(16,185,129,0.07))',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '18px 20px',
      display: 'flex', alignItems: 'flex-start', gap: '14px',
      maxWidth: '480px', margin: '0 auto',
      boxShadow: '0 4px 20px rgba(124,58,237,0.05)',
    }}>
      <div style={{
        flexShrink: 0, width: '40px', height: '40px', borderRadius: '12px',
        background: 'linear-gradient(135deg, var(--violet), #10b981)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem',
      }}>
        {tip.icon}
      </div>
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--violet)', marginBottom: '4px' }}>
          💡 {tip.title}
        </div>
        <div style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.65, fontWeight: 500 }}>
          {tip.body}
        </div>
      </div>
    </div>
  );
}

// ─── Tip Dots Indicator ────────────────────────────────────────────────────────
function TipDots({ total, current }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '10px' }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? '20px' : '6px',
          height: '6px', borderRadius: '3px',
          background: i === current ? 'var(--violet)' : 'var(--border)',
          transition: 'all 0.4s ease',
        }} />
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AIThinkingLoader({ question }) {
  const [statusIdx, setStatusIdx] = useState(0);
  const [tipIdx, setTipIdx] = useState(() => Math.floor(Math.random() * GENERIC_TIPS.length));
  const [tipVisible, setTipVisible] = useState(true);
  const TIPS = GENERIC_TIPS;

  // Rotate status message every 2.5s
  useEffect(() => {
    const id = setInterval(() => {
      setStatusIdx(prev => {
        // Stop at second-to-last so we don't falsely promise "Almost ready" too early
        if (prev >= STATUS_MESSAGES.length - 2) return prev;
        return prev + 1;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  // Fade-out old tip, change, then fade-in new tip every 5s
  useEffect(() => {
    const id = setInterval(() => {
      setTipVisible(false);
      setTimeout(() => {
        setTipIdx(prev => (prev + 1) % TIPS.length);
        setTipVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(id);
  }, [TIPS.length]);

  const questionPreview = question?.length > 100 ? question.slice(0, 100) + '…' : question;

  return (
    <div style={{ textAlign: 'center', padding: '40px 16px 48px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>

      {/* 1. Animated Brain */}
      <AnimatedBrain />

      {/* 2. Status Message */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        <p style={{
          fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)',
          margin: 0, letterSpacing: '-0.2px',
          animation: 'fadeIn 0.4s ease',
          key: statusIdx,
        }}>
          {STATUS_MESSAGES[statusIdx]}
        </p>
        {questionPreview && (
          <div style={{
            maxWidth: '440px', padding: '8px 14px',
            background: 'var(--surface2)', borderRadius: '10px',
            color: 'var(--muted)', fontSize: '0.82rem', fontStyle: 'italic',
            border: '1px solid var(--border)', lineHeight: 1.5,
          }}>
            "{questionPreview}"
          </div>
        )}
      </div>

      {/* 3. Wave Progress Bar */}
      <WaveProgressBar />

      {/* 4. Divider */}
      <div style={{ width: '100%', maxWidth: '480px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
          While you wait
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* 5. Tip Carousel */}
      <div style={{ width: '100%' }}>
        <TipCard tip={TIPS[tipIdx]} visible={tipVisible} />
        <TipDots total={Math.min(TIPS.length, 6)} current={tipIdx % 6} />
      </div>
    </div>
  );
}
