// src/components/StepRenderer.jsx
// Renders each animation visual_type as a distinct animated component

import { useEffect, useState, useRef } from 'react';
import { describeArc, CHART_COLORS } from '../utils/animationHelpers';

export default function StepRenderer({ step, isActive }) {
  if (!step) return null;

  switch (step.visual_type) {
    case 'formula_highlight': return <FormulaHighlight step={step} isActive={isActive} />;
    case 'number_morph':      return <NumberMorph step={step} isActive={isActive} />;
    case 'equation_solve':    return <EquationSolve step={step} isActive={isActive} />;
    case 'comparison_visual': return <ComparisonVisual step={step} isActive={isActive} />;
    case 'story_scene':       return <StoryScene step={step} isActive={isActive} />;
    case 'motion_graphic':    return <MotionGraphic step={step} isActive={isActive} />;
    case 'word_highlight':    return <WordHighlight step={step} isActive={isActive} />;
    case 'pattern_reveal':    return <PatternReveal step={step} isActive={isActive} />;
    case 'bar_race':          return <BarRace step={step} isActive={isActive} />;
    case 'pie_build':         return <PieBuild step={step} isActive={isActive} />;
    default:                  return <DefaultVisual step={step} isActive={isActive} />;
  }
}

// ─── FORMULA HIGHLIGHT ────────────────────────────────────────────────────────
// Shows a formula building up piece by piece with colored labeled tokens
function FormulaHighlight({ step, isActive }) {
  const [visibleVars, setVisibleVars] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setVisibleVars([]);
    setShowSubs(false);
    if (!isActive) return;

    // If no formula_vars, fall back to just showing formula_used
    if (!step.formula_vars?.length) {
      timerRef.current = setTimeout(() => setShowSubs(true), 400);
      return;
    }

    let i = 0;
    const show = () => {
      if (i < step.formula_vars.length) {
        setVisibleVars(prev => [...prev, i]);
        i++;
        timerRef.current = setTimeout(show, 500);
      } else {
        timerRef.current = setTimeout(() => setShowSubs(true), 500);
      }
    };
    timerRef.current = setTimeout(show, 300);
    return () => clearTimeout(timerRef.current);
  }, [isActive, step]);

  const colorMap = {
    a: { bg: 'rgba(59,130,246,0.15)', text: 'var(--violet)', border: 'rgba(59,130,246,0.4)' },
    b: { bg: 'rgba(20,184,166,0.15)', text: 'var(--teal)',   border: 'rgba(20,184,166,0.4)' },
    c: { bg: 'rgba(245,158,11,0.15)', text: 'var(--amber)',  border: 'rgba(245,158,11,0.4)' },
    d: { bg: 'rgba(239,68,68,0.15)',  text: 'var(--coral)',  border: 'rgba(239,68,68,0.4)'  },
  };

  const isOperator = (sym) => ['=', '+', '-', '×', '÷', '→', '≈', '∴', '⟹'].includes(sym?.trim());

  return (
    <div className="sr-formula">
      {/* Formula row with colored token boxes */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 24 }}>
        {step.formula_vars?.map((v, i) => {
          const c = colorMap[v.color] || colorMap.a;
          const op = isOperator(v.symbol);
          return (
            <span
              key={i}
              style={{
                opacity: visibleVars.includes(i) ? 1 : 0,
                transform: visibleVars.includes(i) ? 'translateY(0) scale(1)' : 'translateY(-16px) scale(0.7)',
                transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span style={{
                background: op ? 'transparent' : c.bg,
                color: op ? 'var(--muted)' : c.text,
                border: op ? 'none' : `1.5px solid ${c.border}`,
                borderRadius: 8,
                padding: op ? '0 4px' : '6px 14px',
                fontSize: op ? '1.4rem' : '1.25rem',
                fontWeight: 800,
                fontFamily: 'monospace',
                minWidth: op ? 'unset' : 44,
                textAlign: 'center',
              }}>
                {v.symbol}
              </span>
              {!op && v.label && (
                <span style={{ fontSize: '0.62rem', color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {v.label}
                </span>
              )}
            </span>
          );
        })}
      </div>

      {/* Variable legend cards */}
      {showSubs && step.formula_vars?.filter(v => v.label && !isOperator(v.symbol)).length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', animation: 'slideUp 0.4s ease' }}>
          {step.formula_vars.filter(v => v.label && !isOperator(v.symbol)).map((v, i) => {
            const c = colorMap[v.color] || colorMap.a;
            return (
              <div key={i} style={{
                background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8,
                padding: '8px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                animation: `popIn 0.35s ease ${i * 0.08}s both`,
              }}>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: c.text, fontFamily: 'monospace' }}>{v.symbol}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 600 }}>{v.label}{v.unit ? ` (${v.unit})` : ''}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Formula string */}
      {step.formula_used && (
        <div className="step-formula" style={{ marginTop: 16, opacity: showSubs ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          {step.formula_used}
        </div>
      )}
    </div>
  );
}

// ─── EQUATION SOLVE ──────────────────────────────────────────────────────────
// Shows algebraic solving step-by-step with each line appearing sequentially
function EquationSolve({ step, isActive }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const timerRef = useRef(null);
  const lines = step.equation_lines || [];

  useEffect(() => {
    setVisibleLines(0);
    if (!isActive || !lines.length) return;
    let i = 1;
    const show = () => {
      setVisibleLines(i);
      i++;
      if (i <= lines.length) timerRef.current = setTimeout(show, 700);
    };
    timerRef.current = setTimeout(show, 400);
    return () => clearTimeout(timerRef.current);
  }, [isActive, step]);

  if (!lines.length) return <DefaultVisual step={step} isActive={isActive} />;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
      {/* Title */}
      {step.formula_used && (
        <div style={{
          fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', marginBottom: 16,
        }}>
          {step.formula_used}
        </div>
      )}
      <div style={{
        background: 'var(--surface2)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '20px 28px', width: '100%', maxWidth: 420,
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {lines.map((line, i) => {
          const visible = i < visibleLines;
          const isAnswer = line.highlight;
          return (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.45s ease',
                display: 'flex', alignItems: 'center', gap: 10,
                padding: isAnswer ? '8px 12px' : '4px 0',
                background: isAnswer ? 'rgba(20,184,166,0.12)' : 'transparent',
                border: isAnswer ? '1.5px solid rgba(20,184,166,0.4)' : 'none',
                borderRadius: isAnswer ? 8 : 0,
              }}
            >
              {/* Step bullet */}
              <span style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                background: isAnswer ? 'var(--teal)' : 'var(--surface3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.6rem', fontWeight: 800,
                color: isAnswer ? '#fff' : 'var(--muted)',
              }}>
                {isAnswer ? '✓' : i + 1}
              </span>
              <span style={{
                fontFamily: 'monospace', fontWeight: isAnswer ? 800 : 600,
                fontSize: isAnswer ? '1.05rem' : '0.95rem',
                color: isAnswer ? 'var(--teal)' : 'var(--text)',
                letterSpacing: '0.02em',
              }}>
                {line.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── COMPARISON VISUAL ────────────────────────────────────────────────────────
// Shows two quantities side by side with labels — perfect for CP vs SP problems
function ComparisonVisual({ step, isActive }) {
  const [phase, setPhase] = useState(0);
  const timerRef = useRef(null);
  const items = step.comparison_items || [];

  useEffect(() => {
    setPhase(0);
    if (!isActive) return;
    timerRef.current = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 1800);
    return () => { clearTimeout(timerRef.current); clearTimeout(t2); clearTimeout(t3); };
  }, [isActive, step]);

  const colorMap = {
    a: { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.5)', text: 'var(--violet)' },
    b: { bg: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.5)', text: 'var(--teal)' },
    c: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.5)', text: 'var(--amber)' },
    d: { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.5)',  text: 'var(--coral)' },
  };

  if (!items.length) return <DefaultVisual step={step} isActive={isActive} />;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Comparison cards */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        {items.map((item, i) => {
          const c = colorMap[item.color || 'a'];
          return (
            <div
              key={i}
              style={{
                opacity: phase >= 1 ? 1 : 0,
                transform: phase >= 1 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                transition: `all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.15}s`,
                background: c.bg, border: `2px solid ${c.border}`,
                borderRadius: 12, padding: '16px 20px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                minWidth: 110, flex: 1, maxWidth: 160,
              }}
            >
              {item.icon && <div style={{ fontSize: '1.8rem' }}>{item.icon}</div>}
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: c.text, fontFamily: 'monospace' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {item.label}
              </div>
              {item.sublabel && (
                <div style={{ fontSize: '0.65rem', color: 'var(--muted)', textAlign: 'center' }}>{item.sublabel}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Relation text */}
      {step.relation_text && phase >= 2 && (
        <div style={{
          animation: 'slideUp 0.4s ease',
          background: 'var(--surface2)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '10px 18px',
          fontSize: '0.9rem', fontWeight: 700, color: 'var(--text)',
          fontFamily: 'monospace', textAlign: 'center',
        }}>
          {step.relation_text}
        </div>
      )}

      {/* Result highlight */}
      {step.result_text && phase >= 3 && (
        <div style={{
          animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
          background: 'rgba(20,184,166,0.12)', border: '2px solid rgba(20,184,166,0.5)',
          borderRadius: 10, padding: '10px 20px',
          fontSize: '1rem', fontWeight: 800, color: 'var(--teal)',
          textAlign: 'center',
        }}>
          ∴ {step.result_text}
        </div>
      )}
    </div>
  );
}

// ─── NUMBER MORPH ─────────────────────────────────────────────────────────────
// Shows a calculation sequence tile by tile with clear highlighting
function NumberMorph({ step, isActive }) {
  const [revealed, setRevealed] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    setRevealed([]);
    if (!isActive || !step.numbers?.length) return;
    let i = 0;
    const reveal = () => {
      if (i < step.numbers.length) {
        const idx = i;
        setRevealed(prev => [...prev, idx]);
        i++;
        timerRef.current = setTimeout(reveal, 480);
      }
    };
    timerRef.current = setTimeout(reveal, 250);
    return () => clearTimeout(timerRef.current);
  }, [isActive, step]);

  if (!step.numbers) return <DefaultVisual step={step} isActive={isActive} />;

  const operators = ['+', '-', '×', '÷', ':', '=', '²', 'x=', '→x=', '→', '⟹', '∴'];
  const isOp = (n) => typeof n === 'string' && operators.includes(n);

  return (
    <div className="sr-morph">
      <div className="morph-row">
        {step.numbers.map((num, i) => {
          const op = isOp(num);
          const isResult = i === step.highlight_index;
          const visible = revealed.includes(i);

          if (op) {
            return (
              <div key={i} className="morph-op"
                style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease', fontSize: '1.6rem' }}>
                {num}
              </div>
            );
          }

          return (
            <div
              key={i}
              style={{
                minWidth: String(num).length > 4 ? 76 : 60,
                height: 60,
                borderRadius: 12,
                background: isResult && visible
                  ? 'rgba(20,184,166,0.18)'
                  : visible ? 'rgba(59,130,246,0.12)' : 'var(--surface2)',
                border: isResult && visible
                  ? '2.5px solid var(--teal)'
                  : visible ? '2px solid var(--violet)' : '2px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: isResult ? '1.5rem' : '1.2rem',
                fontWeight: 900,
                fontFamily: 'monospace',
                color: isResult && visible ? 'var(--teal)' : visible ? 'var(--violet)' : 'var(--muted)',
                opacity: visible ? 1 : 0,
                transform: visible ? (isResult ? 'scale(1.2)' : 'scale(1)') : 'scale(0.5)',
                transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: isResult && visible ? '0 0 0 4px rgba(20,184,166,0.15)' : 'none',
              }}
            >
              {num}
            </div>
          );
        })}
      </div>

      {step.formula_used && (
        <div style={{
          fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'monospace',
          opacity: revealed.length > 2 ? 1 : 0, transition: 'opacity 0.5s ease',
          padding: '6px 14px', background: 'var(--surface2)', borderRadius: 6,
          border: '1px solid var(--border)',
        }}>
          {step.formula_used}
        </div>
      )}
    </div>
  );
}

// ─── STORY SCENE ─────────────────────────────────────────────────────────────
function StoryScene({ step, isActive }) {
  const scenes = {
    car_highway: <CarHighwayScene isActive={isActive} />,
    two_trains: <TwoTrainsScene isActive={isActive} />,
    family_tree: <FamilyTreeScene step={step} isActive={isActive} />,
    alligation_cross: <AlligationScene isActive={isActive} />,
    default: <GenericScene step={step} isActive={isActive} />
  };
  const scene = scenes[step.scene_type] || scenes.default;

  return (
    <div className="sr-story">
      <div className="story-scene-box">{scene}</div>
      {step.analogy && (
        <div className="story-caption" style={{ animation: isActive ? 'fadeIn 0.6s ease 1s both' : 'none' }}>
          💡 {step.analogy}
        </div>
      )}
    </div>
  );
}

function CarHighwayScene({ isActive }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 200" style={{ overflow: 'visible' }}>
      <rect x="0" y="120" width="400" height="40" fill="#2a2a40" rx="4" />
      <line x1="0" y1="140" x2="400" y2="140" stroke="#EF9F27" strokeWidth="2" strokeDasharray="20,15" />
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <line x1={50 + i * 90} y1="118" x2={50 + i * 90} y2="162" stroke="#6E6E8A" strokeWidth="1" />
          <text x={50 + i * 90} y="175" fill="#6E6E8A" fontSize="10" textAnchor="middle">{i * 60} km</text>
        </g>
      ))}
      <g style={{ animation: isActive ? 'storySlideIn 1s ease forwards' : 'none', opacity: isActive ? 1 : 0 }}>
        <rect x="20" y="102" width="60" height="24" fill="#7F77DD" rx="6" />
        <rect x="30" y="94" width="40" height="16" fill="#5a53aa" rx="4" />
        <circle cx="30" cy="126" r="8" fill="#1E1E2E" /><circle cx="30" cy="126" r="4" fill="#6E6E8A" />
        <circle cx="70" cy="126" r="8" fill="#1E1E2E" /><circle cx="70" cy="126" r="4" fill="#6E6E8A" />
        <text x="50" y="113" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">60km/h</text>
      </g>
      <g style={{ animation: isActive ? 'fadeIn 0.6s ease 0.8s both' : 'none' }}>
        <text x="200" y="100" fill="#1D9E75" fontSize="12" fontWeight="bold" textAnchor="middle">→ 240 km total →</text>
        <text x="200" y="185" fill="#EF9F27" fontSize="11" textAnchor="middle">4 hours × 60 km/h</text>
      </g>
    </svg>
  );
}

function TwoTrainsScene({ isActive }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 400 200">
      <rect x="0" y="115" width="400" height="30" fill="#2a2a40" rx="4" />
      <g style={{ animation: isActive ? 'trainMove 2s ease-in-out infinite alternate' : 'none' }}>
        <rect x="20" y="95" width="70" height="25" fill="#7F77DD" rx="5" />
        <rect x="30" y="87" width="50" height="14" fill="#5a53aa" rx="4" />
        <circle cx="32" cy="120" r="6" fill="#1E1E2E" /><circle cx="32" cy="120" r="3" fill="#6E6E8A" />
        <circle cx="78" cy="120" r="6" fill="#1E1E2E" /><circle cx="78" cy="120" r="3" fill="#6E6E8A" />
        <text x="55" y="108" fill="white" fontSize="8" textAnchor="middle">70 km/h →</text>
      </g>
      <g style={{ animation: isActive ? 'trainMove 2s ease-in-out infinite alternate-reverse' : 'none' }}>
        <rect x="310" y="95" width="70" height="25" fill="#D85A30" rx="5" />
        <rect x="320" y="87" width="50" height="14" fill="#aa3a1a" rx="4" />
        <circle cx="322" cy="120" r="6" fill="#1E1E2E" /><circle cx="322" cy="120" r="3" fill="#6E6E8A" />
        <circle cx="368" cy="120" r="6" fill="#1E1E2E" /><circle cx="368" cy="120" r="3" fill="#6E6E8A" />
        <text x="345" y="108" fill="white" fontSize="8" textAnchor="middle">← 80 km/h</text>
      </g>
      <text x="10" y="75" fill="#7F77DD" fontSize="11" fontWeight="bold">A</text>
      <text x="385" y="75" fill="#D85A30" fontSize="11" fontWeight="bold">B</text>
      <text x="200" y="165" fill="#EF9F27" fontSize="11" textAnchor="middle" fontWeight="bold">Total: 300 km apart</text>
      <text x="200" y="180" fill="#1D9E75" fontSize="10" textAnchor="middle">Relative speed = 150 km/h</text>
    </svg>
  );
}

function FamilyTreeScene({ step, isActive }) {
  const nodes = step.tree || [
    { label: 'A (Male)', level: 0 },
    { label: 'B / C', level: 1 },
    { label: 'D', level: 2 }
  ];
  const colors = ['#7F77DD', '#1D9E75', '#EF9F27'];
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 180">
      {nodes.map((node, i) => (
        <g key={i} style={{ animation: isActive ? `fadeIn 0.5s ease ${i * 0.5}s both` : 'none' }}>
          {i > 0 && <line x1="150" y1={30 + (i - 1) * 60} x2="150" y2={50 + (i - 1) * 60} stroke={colors[i - 1]} strokeWidth="2" strokeDasharray="4,2" />}
          <circle cx="150" cy={60 + i * 50} r="22" fill={colors[i] + '22'} stroke={colors[i]} strokeWidth="2" />
          <text x="150" y={65 + i * 50} fill={colors[i]} fontSize="9" textAnchor="middle" fontWeight="bold">{node.label}</text>
        </g>
      ))}
    </svg>
  );
}

function AlligationScene({ isActive }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 180">
      <g style={{ animation: isActive ? 'fadeIn 0.6s ease both' : 'none' }}>
        <text x="50" y="70" fill="#7F77DD" fontSize="16" fontWeight="800" textAnchor="middle">₹20</text>
        <text x="50" y="85" fill="#6E6E8A" fontSize="10" textAnchor="middle">Cheaper</text>
        <text x="270" y="70" fill="#D85A30" fontSize="16" fontWeight="800" textAnchor="middle">₹30</text>
        <text x="270" y="85" fill="#6E6E8A" fontSize="10" textAnchor="middle">Dearer</text>
        <rect x="130" y="55" width="60" height="34" fill="var(--surface3)" rx="8" stroke="var(--border)" />
        <text x="160" y="73" fill="#EF9F27" fontSize="14" fontWeight="800" textAnchor="middle">₹24</text>
        <text x="160" y="84" fill="#6E6E8A" fontSize="9" textAnchor="middle">Mean</text>
        <line x1="70" y1="72" x2="130" y2="72" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="190" y1="72" x2="250" y2="72" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="70" y1="72" x2="250" y2="120" stroke="#7F77DD" strokeWidth="1.5" strokeDasharray="4,3" />
        <line x1="250" y1="72" x2="70" y2="120" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x="50" y="135" fill="#D85A30" fontSize="12" fontWeight="700" textAnchor="middle">30−24=6</text>
        <text x="270" y="135" fill="#7F77DD" fontSize="12" fontWeight="700" textAnchor="middle">24−20=4</text>
        <text x="160" y="165" fill="#1D9E75" fontSize="12" fontWeight="700" textAnchor="middle">Ratio = 6:4 = 3:2</text>
      </g>
    </svg>
  );
}

function GenericScene({ step, isActive }) {
  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
      <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{step.explanation}</div>
    </div>
  );
}

// ─── MOTION GRAPHIC ───────────────────────────────────────────────────────────
function MotionGraphic({ step, isActive }) {
  const scenes = {
    alligation_cross: <AlligationScene isActive={isActive} />,
    family_tree: <FamilyTreeScene step={step} isActive={isActive} />,
  };

  if (step.scene_type && scenes[step.scene_type]) {
    return <div className="sr-motion"><div className="motion-svg-wrap">{scenes[step.scene_type]}</div></div>;
  }

  return (
    <div className="sr-motion">
      <svg width="360" height="180" viewBox="0 0 360 180">
        <g style={{ animation: isActive ? 'fadeIn 0.6s ease both' : 'none' }}>
          <circle cx="180" cy="90" r="60" fill="none" stroke="var(--violet)" strokeWidth="1.5" opacity="0.4"
            style={{ animation: isActive ? 'pulse 2s ease infinite' : 'none' }} />
          <circle cx="180" cy="90" r="40" fill="rgba(59,130,246,0.1)" stroke="var(--violet)" strokeWidth="2"
            style={{ animation: isActive ? 'pulse 2s ease 0.3s infinite' : 'none' }} />
          <circle cx="180" cy="90" r="20" fill="rgba(59,130,246,0.2)" />
          <text x="180" y="94" fill="var(--violet)" fontSize="11" fontWeight="800" textAnchor="middle">
            {step.formula_used?.split('=').pop()?.trim() || '?'}
          </text>
          {step.formula_used && (
            <text x="180" y="165" fill="var(--muted)" fontSize="10" textAnchor="middle">{step.formula_used}</text>
          )}
        </g>
      </svg>
    </div>
  );
}

// ─── WORD HIGHLIGHT ───────────────────────────────────────────────────────────
function WordHighlight({ step, isActive }) {
  const [phase, setPhase] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    setPhase(0);
    if (!isActive) return;
    timerRef.current = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    return () => { clearTimeout(timerRef.current); clearTimeout(t2); clearTimeout(t3); };
  }, [isActive, step]);

  return (
    <div className="sr-word">
      {phase >= 1 && (
        <div className="word-main">{step.word || step.explanation?.split(' ')[0]}</div>
      )}
      {phase >= 2 && step.definition && (
        <div className="word-definition" style={{ animation: 'slideDown 0.4s ease' }}>
          {step.definition}
        </div>
      )}
      {phase >= 3 && step.synonyms?.length > 0 && (
        <div style={{ animation: 'slideUp 0.4s ease' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Synonyms
          </div>
          <div className="word-synonyms">
            {step.synonyms.map((s, i) => (
              <span key={i} className="word-syn" style={{ animationDelay: `${i * 0.1}s`, animation: 'popIn 0.4s ease both' }}>{s}</span>
            ))}
          </div>
        </div>
      )}
      {phase >= 3 && step.memory_tip && (
        <div style={{
          marginTop: 14, fontSize: '0.78rem', color: 'var(--amber)',
          padding: '8px 12px', background: 'rgba(245,158,11,0.08)',
          borderRadius: 'var(--radius-sm)', maxWidth: 360, margin: '14px auto 0',
          animation: 'fadeIn 0.5s ease both'
        }}>
          💡 {step.memory_tip}
        </div>
      )}
    </div>
  );
}

// ─── PATTERN REVEAL ───────────────────────────────────────────────────────────
function PatternReveal({ step, isActive }) {
  const [revealed, setRevealed] = useState([]);
  const timerRef = useRef(null);
  const pattern = step.pattern || [];
  const differences = step.differences || [];

  useEffect(() => {
    setRevealed([]);
    if (!isActive || !pattern.length) return;
    let i = 0;
    const revealNext = () => {
      if (i < pattern.length) {
        const idx = i;
        setRevealed(prev => [...prev, idx]);
        i++;
        timerRef.current = setTimeout(revealNext, 550);
      }
    };
    timerRef.current = setTimeout(revealNext, 300);
    return () => clearTimeout(timerRef.current);
  }, [isActive, step]);

  const cols = Math.min(pattern.length, 6);

  return (
    <div className="sr-pattern">
      <div className="pattern-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {pattern.map((val, i) => {
          const isAnswer = val === '?' && revealed.includes(i);
          const isSpecialAnswer = typeof val === 'string' && val !== '?' && revealed.includes(i) && i === pattern.length - 1;
          return (
            <div
              key={i}
              className={`pattern-cell ${revealed.includes(i) ? (val === '?' ? 'answer-cell' : 'revealed') : ''} ${isSpecialAnswer ? 'answer-cell' : ''}`}
              style={{ transition: `all 0.4s ease ${i * 0.05}s` }}
            >
              {revealed.includes(i) ? (val === '?' ? (differences[i] || '✓') : val) : '?'}
            </div>
          );
        })}
      </div>
      {differences.length > 0 && revealed.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          {differences.slice(0, revealed.length - 1).map((d, i) => (
            <span key={i} style={{
              padding: '2px 10px', borderRadius: 'var(--radius-pill)',
              background: 'rgba(59,130,246,0.12)', color: 'var(--violet)',
              fontSize: '0.75rem', fontWeight: 700,
              animation: 'popIn 0.3s ease both', animationDelay: `${i * 0.1}s`
            }}>
              {d}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── BAR RACE ─────────────────────────────────────────────────────────────────
function BarRace({ step, isActive }) {
  const [visible, setVisible] = useState(0);
  const data = step.data || [
    { label: 'A', value: 80 }, { label: 'B', value: 60 },
    { label: 'C', value: 90 }, { label: 'D', value: 70 }
  ];
  const max = Math.max(...data.map(d => d.value));

  useEffect(() => {
    setVisible(0);
    if (!isActive) return;
    let i = 1;
    const t = setInterval(() => {
      setVisible(i);
      i++;
      if (i > data.length) clearInterval(t);
    }, 500);
    return () => clearInterval(t);
  }, [isActive, step]);

  return (
    <div className="sr-bar" style={{ width: '100%', padding: '0 8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {data.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted)', flexShrink: 0 }}>{item.label}</div>
            <div style={{ flex: 1, height: 28, background: 'var(--surface2)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: i < visible ? `${(item.value / max) * 100}%` : '0%',
                background: CHART_COLORS[i % CHART_COLORS.length],
                borderRadius: 4,
                transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
                display: 'flex', alignItems: 'center', paddingLeft: 8
              }}>
                {i < visible && (
                  <span style={{ color: 'white', fontSize: '0.72rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                    {item.value}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PIE BUILD ────────────────────────────────────────────────────────────────
function PieBuild({ step, isActive }) {
  const [visibleSlices, setVisibleSlices] = useState(0);
  const data = step.data || [
    { label: 'Part A', value: 40 }, { label: 'Part B', value: 35 }, { label: 'Part C', value: 25 }
  ];
  const total = data.reduce((s, d) => s + d.value, 0);

  useEffect(() => {
    setVisibleSlices(0);
    if (!isActive) return;
    let i = 1;
    const t = setInterval(() => {
      setVisibleSlices(i);
      i++;
      if (i > data.length) clearInterval(t);
    }, 600);
    return () => clearInterval(t);
  }, [isActive, step]);

  let cumulative = -90;
  const cx = 80, cy = 80, r = 70;

  return (
    <div className="sr-pie">
      <svg width="160" height="160" viewBox="0 0 160 160">
        {data.map((item, i) => {
          const angle = (item.value / total) * 360;
          const start = cumulative;
          cumulative += angle;
          if (i >= visibleSlices) return null;
          return (
            <path
              key={i}
              d={describeArc(cx, cy, r, start, start + angle - 1)}
              fill={CHART_COLORS[i % CHART_COLORS.length]}
              opacity="0.85"
              style={{ animation: 'popIn 0.4s ease both' }}
            />
          );
        })}
        <circle cx={cx} cy={cy} r={r * 0.45} fill="var(--surface2)" />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="700">
          {visibleSlices}/{data.length}
        </text>
      </svg>
      <div className="pie-legend">
        {data.slice(0, visibleSlices).map((item, i) => (
          <div key={i} className="pie-legend-item" style={{ animation: 'slideDown 0.3s ease both' }}>
            <div className="pie-legend-dot" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
            <span>{item.label}</span>
            <span style={{ color: 'var(--muted)', marginLeft: 4 }}>
              {Math.round((item.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DEFAULT VISUAL ───────────────────────────────────────────────────────────
// Fallback: shows explanation + formula in a clean styled card
function DefaultVisual({ step, isActive }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, [isActive]);

  return (
    <div style={{
      width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
      opacity: show ? 1 : 0, transition: 'opacity 0.5s ease',
    }}>
      {step.formula_used && (
        <div style={{
          background: 'rgba(59,130,246,0.1)', border: '1.5px solid rgba(59,130,246,0.35)',
          borderRadius: 10, padding: '14px 24px',
          fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 800,
          color: 'var(--violet)', textAlign: 'center', letterSpacing: '0.04em',
        }}>
          {step.formula_used}
        </div>
      )}
      <div style={{
        background: 'var(--surface2)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '16px 20px',
        fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7,
        textAlign: 'center', maxWidth: 400,
      }}>
        {step.explanation}
      </div>
    </div>
  );
}
