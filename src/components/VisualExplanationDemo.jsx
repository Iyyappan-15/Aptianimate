// src/components/VisualExplanationDemo.jsx
// Hero section demo — styled exactly like TrainPhysicsEngine for visual consistency.
// Two opposing bullet trains approach each other on dual SVG tracks, with a live HUD,
// step-by-step formula cards, and a "Meet!" collision burst.

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── SVG Train A (same gradient as TrainPhysicsEngine) ──────────────────
function TrainSVG_A() {
  return (
    <svg width="220" height="48" viewBox="0 0 220 48" fill="none">
      <defs>
        <linearGradient id="heroEngineGrad" x1="0" y1="0" x2="220" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb" /><stop offset="1" stopColor="#1e40af" />
        </linearGradient>
        <linearGradient id="heroCarGrad" x1="0" y1="0" x2="100" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="heroWin" x1="0" y1="0" x2="0" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93c5fd" /><stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      {/* Rear carriage */}
      <rect x="2" y="10" width="58" height="26" rx="4" fill="url(#heroCarGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
      <rect x="8"  y="14" width="10" height="9" rx="2" fill="url(#heroWin)" />
      <rect x="22" y="14" width="10" height="9" rx="2" fill="url(#heroWin)" />
      <rect x="36" y="14" width="10" height="9" rx="2" fill="url(#heroWin)" />
      <rect x="50" y="14" width="6"  height="9" rx="1.5" fill="url(#heroWin)" />
      <circle cx="12" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="26" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="44" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Middle carriage */}
      <rect x="66" y="10" width="68" height="26" rx="4" fill="url(#heroCarGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
      <rect x="72"  y="14" width="10" height="9" rx="2" fill="url(#heroWin)" />
      <rect x="86"  y="14" width="10" height="9" rx="2" fill="url(#heroWin)" />
      <rect x="100" y="14" width="10" height="9" rx="2" fill="url(#heroWin)" />
      <rect x="114" y="14" width="10" height="9" rx="2" fill="url(#heroWin)" />
      <circle cx="76"  cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="90"  cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="118" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Engine nose */}
      <path d="M140 10 H185 C198 10 214 20 218 28 L218 36 H140 V10 Z" fill="url(#heroEngineGrad)" stroke="#172554" strokeWidth="1.5" />
      <path d="M146 14 H170 V24 H146 Z" fill="url(#heroWin)" />
      <path d="M174 14 H192 L198 24 H174 Z" fill="url(#heroWin)" />
      <circle cx="215" cy="30" r="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
      <polygon points="218,30 220,27 220,33" fill="#fef08a" opacity="0.8" />
      <path d="M140 28 H214" stroke="#f8fafc" strokeWidth="1.5" opacity="0.9" />
      <circle cx="152" cy="38" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="168" cy="38" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="198" cy="38" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
    </svg>
  );
}

// ── SVG Train B — red/amber scheme, FLIPPED horizontally (faces left) ──
function TrainSVG_B() {
  return (
    <svg width="220" height="48" viewBox="0 0 220 48" fill="none" style={{ transform: 'scaleX(-1)' }}>
      <defs>
        <linearGradient id="heroEngineGrad2" x1="0" y1="0" x2="220" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#dc2626" /><stop offset="1" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="heroCarGrad2" x1="0" y1="0" x2="100" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ef4444" /><stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="heroWin2" x1="0" y1="0" x2="0" y2="10" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fca5a5" /><stop offset="1" stopColor="#f87171" />
        </linearGradient>
      </defs>
      <rect x="2" y="10" width="58" height="26" rx="4" fill="url(#heroCarGrad2)" stroke="#7f1d1d" strokeWidth="1.5" />
      <rect x="8"  y="14" width="10" height="9" rx="2" fill="url(#heroWin2)" />
      <rect x="22" y="14" width="10" height="9" rx="2" fill="url(#heroWin2)" />
      <rect x="36" y="14" width="10" height="9" rx="2" fill="url(#heroWin2)" />
      <rect x="50" y="14" width="6"  height="9" rx="1.5" fill="url(#heroWin2)" />
      <circle cx="12" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="26" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="44" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="66" y="10" width="68" height="26" rx="4" fill="url(#heroCarGrad2)" stroke="#7f1d1d" strokeWidth="1.5" />
      <rect x="72"  y="14" width="10" height="9" rx="2" fill="url(#heroWin2)" />
      <rect x="86"  y="14" width="10" height="9" rx="2" fill="url(#heroWin2)" />
      <rect x="100" y="14" width="10" height="9" rx="2" fill="url(#heroWin2)" />
      <rect x="114" y="14" width="10" height="9" rx="2" fill="url(#heroWin2)" />
      <circle cx="76"  cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="90"  cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="118" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
      <path d="M140 10 H185 C198 10 214 20 218 28 L218 36 H140 V10 Z" fill="url(#heroEngineGrad2)" stroke="#450a0a" strokeWidth="1.5" />
      <path d="M146 14 H170 V24 H146 Z" fill="url(#heroWin2)" />
      <path d="M174 14 H192 L198 24 H174 Z" fill="url(#heroWin2)" />
      <circle cx="215" cy="30" r="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
      <polygon points="218,30 220,27 220,33" fill="#fef08a" opacity="0.8" />
      <path d="M140 28 H214" stroke="#f8fafc" strokeWidth="1.5" opacity="0.9" />
      <circle cx="152" cy="38" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="168" cy="38" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="198" cy="38" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
    </svg>
  );
}

export default function VisualExplanationDemo({ navigate }) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  const nextStep = () => { if (step < 5) setStep(s => s + 1); };
  const replay   = () => { setStep(0); setPlaying(true); };

  // Auto-advance timer
  useEffect(() => {
    if (!playing) return;
    const delays = [1000, 2400, 2000, 2000, 2200, 0];
    if (step >= 5) return;
    const t = setTimeout(() => setStep(s => s + 1), delays[step]);
    return () => clearTimeout(t);
  }, [step, playing]);

  // Train A: starts left, moves right (→)  target ~43%
  const trainAEnd = step >= 1 ? 43 : 5;
  // Train B: starts right, moves left (←)  target ~47% (from right side)
  const trainBEnd = step >= 1 ? 47 : 90;
  // Both trains reach meeting zone by step 2

  const showMeet    = step >= 2 && step < 4;
  const showStep1   = step >= 2;
  const showStep2   = step >= 3;
  const showAnswer  = step >= 4;
  const showCTA     = step >= 5;

  // ── HUD badge text ──────────────────────────────────────────────────────
  const scenarioBadge = step < 2 ? 'Two Trains Approaching' :
                        step < 4 ? '💥 Meeting Point Found!' :
                        '✅ Solved!';

  return (
    <div className="demo-section">
      <div className="demo-header">
        <motion.div
          className="demo-badge"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Visual Engine
        </motion.div>
        <h2>See Math Come to Life</h2>
        <p>AptiAnimate turns abstract word problems into clear, interactive visual stories.</p>
      </div>

      <div className="demo-container">
        {/* ── Question Box ── */}
        <div className="demo-question-box">
          <div className="q-label">Example Problem</div>
          <p>
            <strong style={{ color: '#2563eb' }}>Train A</strong> is moving at{' '}
            <strong>60 km/h</strong> and{' '}
            <strong style={{ color: '#dc2626' }}>Train B</strong> is moving at{' '}
            <strong>40 km/h</strong> in the opposite direction.
            The distance between them is <strong>500 meters</strong>. How long will it take for them to meet?
          </p>
        </div>

        {/* ── PHYSICS ENGINE CANVAS ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, var(--surface2) 0%, var(--card) 100%)',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)',
        }}>

          {/* ── HUD BAR (styled like TrainPhysicsEngine) ── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            padding: '10px 14px',
            background: 'var(--surface2)',
            borderBottom: '1px solid var(--border)',
            fontSize: '0.8rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <motion.span
                key={scenarioBadge}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.5px', color: 'var(--violet)',
                  background: 'rgba(37,99,235,0.1)', border: '1px solid var(--violet)',
                  padding: '3px 8px', borderRadius: '20px',
                }}
              >
                {scenarioBadge}
              </motion.span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                Distance: <strong style={{ color: 'var(--violet)' }}>500 m</strong>
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal)',
              background: 'rgba(13,148,136,0.1)', border: '1px solid var(--teal)',
              padding: '4px 10px', borderRadius: '20px',
            }}>
              <span>Relative Speed:</span>
              <span style={{ fontWeight: 900 }}>V₁ + V₂</span>
            </div>
          </div>

          {/* ── STAGE CANVAS (240px, same as engine) ── */}
          <div style={{ position: 'relative', width: '100%', height: '240px' }}>

            {/* Overhead ruler */}
            <div style={{
              position: 'absolute', top: '12px', left: '4%', right: '4%', height: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1px dashed var(--border)', opacity: 0.65,
            }}>
              <span style={{ fontSize: '0.62rem', color: 'var(--muted)', fontWeight: 600 }}>0 m (Start)</span>
              <span style={{ fontSize: '0.68rem', color: 'var(--violet)', fontWeight: 800 }}>500 m gap closes at V_rel = 100 km/h</span>
              <span style={{ fontSize: '0.62rem', color: 'var(--muted)', fontWeight: 600 }}>500 m</span>
            </div>

            {/* ── LANE 1: TRAIN TRACK (top) ── */}
            <div style={{ position: 'absolute', top: '44px', left: 0, right: 0, height: '90px' }}>
              {/* Steel rails */}
              {[{ bottom: 12 }, { bottom: 22 }].map((r, i) => (
                <div key={i} style={{
                  position: 'absolute', bottom: `${r.bottom}px`, left: 0, right: 0, height: '3px',
                  background: 'linear-gradient(90deg, #94a3b8, #cbd5e1, #94a3b8)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                }} />
              ))}
              {/* Sleepers */}
              {Array.from({ length: 22 }).map((_, i) => (
                <div key={i} style={{
                  position: 'absolute', bottom: '9px', left: `${i * 4.6 + 1}%`,
                  width: '12px', height: '19px',
                  background: 'var(--surface3)', border: '1px solid var(--border)',
                  borderRadius: '2px', opacity: 0.85,
                }} />
              ))}

              {/* ── TRAIN A → (blue, moves right) ── */}
              <motion.div
                initial={false}
                animate={{ left: `${trainAEnd}%` }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                style={{ position: 'absolute', bottom: '16px', marginLeft: '-110px', zIndex: 15 }}
              >
                {/* Label pill */}
                <div style={{
                  fontSize: '0.66rem', fontWeight: 800, color: 'var(--violet)',
                  background: 'var(--surface)', border: '1px solid var(--violet)',
                  padding: '2px 8px', borderRadius: '12px', marginBottom: '2px',
                  whiteSpace: 'nowrap', textAlign: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                }}>
                  Train A · 60 km/h →
                </div>
                <TrainSVG_A />
                {/* Speed streaks */}
                {step >= 1 && [-8, -18, -28].map((off, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: [0, 0.6, 0], scaleX: 1 }}
                    transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15, repeatDelay: 0.4 }}
                    style={{
                      position: 'absolute', top: `${28 + i * 7}px`, left: off,
                      width: '28px', height: '2px',
                      background: 'linear-gradient(90deg, transparent, #93c5fd)',
                      borderRadius: '1px',
                    }}
                  />
                ))}
              </motion.div>

              {/* ── TRAIN B ← (red, moves left, starts right) ── */}
              <motion.div
                initial={false}
                animate={{ left: `${trainBEnd}%` }}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
                style={{ position: 'absolute', bottom: '16px', marginLeft: '-110px', zIndex: 15 }}
              >
                {/* Label pill */}
                <div style={{
                  fontSize: '0.66rem', fontWeight: 800, color: '#dc2626',
                  background: 'var(--surface)', border: '1px solid #dc2626',
                  padding: '2px 8px', borderRadius: '12px', marginBottom: '2px',
                  whiteSpace: 'nowrap', textAlign: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                }}>
                  ← 40 km/h · Train B
                </div>
                <TrainSVG_B />
                {/* Speed streaks (right side) */}
                {step >= 1 && [8, 18, 28].map((off, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: [0, 0.6, 0], scaleX: 1 }}
                    transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15, repeatDelay: 0.4 }}
                    style={{
                      position: 'absolute', top: `${28 + i * 7}px`, left: `${220 + off}px`,
                      width: '28px', height: '2px',
                      background: 'linear-gradient(90deg, #fca5a5, transparent)',
                      borderRadius: '1px',
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* ── MEET BURST ── */}
            <AnimatePresence>
              {showMeet && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0.55 }}
                  style={{
                    position: 'absolute', top: '68px', left: '48%',
                    transform: 'translateX(-50%)',
                    zIndex: 30,
                    fontSize: '0.78rem', fontWeight: 900,
                    color: '#ffffff',
                    background: 'linear-gradient(135deg, #f59e0b, #dc2626)',
                    padding: '6px 14px', borderRadius: '20px',
                    boxShadow: '0 4px 16px rgba(245,158,11,0.5)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  💥 Meet!
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FORMULA CARDS (bottom of stage, like engine's metric footer) ── */}
            <div style={{
              position: 'absolute',
              bottom: '12px', left: '4%', right: '4%',
              display: 'flex', gap: '10px', flexWrap: 'wrap',
            }}>
              <AnimatePresence>
                {showStep1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 120 }}
                    style={{
                      flex: 1, minWidth: '160px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '8px 12px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                    }}
                  >
                    <span style={{
                      fontSize: '1.1rem',
                      background: 'rgba(37,99,235,0.1)', border: '1px solid var(--violet)',
                      borderRadius: '8px', width: '34px', height: '34px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>⚡</span>
                    <div>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                        Step 1: Relative Speed
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-main)' }}>
                        60 + 40 = <strong style={{ color: 'var(--violet)' }}>100 km/h</strong>
                      </div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--muted)' }}>
                        Opposite directions → Add speeds
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showStep2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 120, delay: 0.15 }}
                    style={{
                      flex: 1, minWidth: '160px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '8px 12px',
                      display: 'flex', alignItems: 'center', gap: '10px',
                    }}
                  >
                    <span style={{
                      fontSize: '1.1rem',
                      background: 'rgba(13,148,136,0.1)', border: '1px solid var(--teal)',
                      borderRadius: '8px', width: '34px', height: '34px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>⏱️</span>
                    <div>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>
                        Step 2: Time = Dist / Speed
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--text-main)' }}>
                        500m / (100 × 5/18)
                      </div>
                      <div style={{ fontSize: '0.62rem', color: 'var(--muted)' }}>
                        Convert km/h to m/s
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── FINAL ANSWER BADGE ── */}
            <AnimatePresence>
              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', bounce: 0.55 }}
                  style={{
                    position: 'absolute', top: '14px', right: '14px', zIndex: 20,
                    background: 'linear-gradient(135deg, #059669, #047857)',
                    borderRadius: '12px', padding: '6px 14px',
                    boxShadow: '0 4px 14px rgba(5,150,105,0.4)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#a7f3d0', textTransform: 'uppercase' }}>Answer</div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>18 Seconds</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── CTA OVERLAY ── */}
            <AnimatePresence>
              {showCTA && (
                <motion.div
                  className="demo-cta-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="demo-cta-content">
                    <div className="demo-cta-icon">🎓</div>
                    <h3>Master Aptitude Visually</h3>
                    <p>Stop memorizing formulas. Start understanding through interactive animations.</p>
                    <div className="demo-cta-buttons">
                      <button className="goal-btn selected" onClick={() => navigate('category/number-systems')}>
                        Start Learning
                      </button>
                      <button className="goal-btn" onClick={() => window.scrollTo({ top: document.querySelector('.goal-selector')?.offsetTop || 0, behavior: 'smooth' })}>
                        Explore Topics
                      </button>
                    </div>
                    <button className="replay-btn" onClick={replay}>↺ Watch Demo Again</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── MANUAL CONTROLS ── */}
        {!showCTA && (
          <div className="demo-controls">
            <button className="demo-ctrl-btn" onClick={replay} disabled={step === 0}>
              ↺ Replay
            </button>
            <button className="demo-ctrl-btn primary" onClick={nextStep} disabled={step >= 5}>
              Next Step <span className="arrow">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
