// src/components/StepRenderer.jsx
// Renders each animation visual_type as a distinct animated component

import { useEffect, useState, useRef } from 'react';
import { describeArc, CHART_COLORS } from '../utils/animationHelpers';

export default function StepRenderer({ step, isActive }) {
  if (!step) return null;

  switch (step.visual_type) {
    case 'formula_highlight': return <FormulaHighlight step={step} isActive={isActive} />;
    case 'number_morph':      return <NumberMorph step={step} isActive={isActive} />;
    case 'story_scene':       return <StoryScene step={step} isActive={isActive} />;
    case 'motion_graphic':    return <MotionGraphic step={step} isActive={isActive} />;
    case 'word_highlight':    return <WordHighlight step={step} isActive={isActive} />;
    case 'pattern_reveal':    return <PatternReveal step={step} isActive={isActive} />;
    case 'bar_race':          return <BarRace step={step} isActive={isActive} />;
    case 'pie_build':         return <PieBuild step={step} isActive={isActive} />;
    default:                  return <DefaultVisual step={step} />;
  }
}

// ─── FORMULA HIGHLIGHT ────────────────────────────────────────────────────────
function FormulaHighlight({ step, isActive }) {
  const [visibleVars, setVisibleVars] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setVisibleVars([]);
    setShowSubs(false);
    if (!isActive || !step.formula_vars?.length) return;

    let i = 0;
    const show = () => {
      if (i < step.formula_vars.length) {
        setVisibleVars(prev => [...prev, i]);
        i++;
        timerRef.current = setTimeout(show, 600);
      } else {
        timerRef.current = setTimeout(() => setShowSubs(true), 400);
      }
    };
    timerRef.current = setTimeout(show, 300);
    return () => clearTimeout(timerRef.current);
  }, [isActive, step]);

  const colorClass = (c) => ({ a: 'fv-a', b: 'fv-b', c: 'fv-c', d: 'fv-d' }[c] || 'fv-a');

  return (
    <div className="sr-formula">
      <div className="formula-big" style={{ animation: isActive ? 'slideDown 0.4s ease' : 'none' }}>
        {step.formula_vars?.map((v, i) => (
          <span
            key={i}
            className={`fv ${colorClass(v.color)}`}
            style={{
              opacity: visibleVars.includes(i) ? 1 : 0,
              transform: visibleVars.includes(i) ? 'translateY(0)' : 'translateY(-12px)',
              transition: 'all 0.4s ease',
              display: 'inline-block'
            }}
          >
            {v.symbol}
          </span>
        ))}
      </div>

      {showSubs && step.formula_vars && (
        <div className="formula-subs" style={{ animation: 'slideUp 0.4s ease' }}>
          {step.formula_vars.filter(v => v.label && v.label !== '?').map((v, i) => (
            <div key={i} className="formula-sub-item">
              <div className="key">{v.symbol}</div>
              <div className="val" style={{ color: `var(--${['violet','teal','amber','coral'][['a','b','c','d'].indexOf(v.color)] || 'violet'})` }}>
                {v.label} <span style={{ color: 'var(--muted)', fontSize: '0.75em' }}>{v.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {step.formula_used && (
        <div className="step-formula" style={{
          marginTop: 16, opacity: isActive ? 1 : 0,
          transition: 'opacity 0.5s ease 0.8s'
        }}>
          {step.formula_used}
        </div>
      )}
    </div>
  );
}

// ─── NUMBER MORPH ─────────────────────────────────────────────────────────────
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
        timerRef.current = setTimeout(reveal, 500);
      }
    };
    timerRef.current = setTimeout(reveal, 200);
    return () => clearTimeout(timerRef.current);
  }, [isActive, step]);

  if (!step.numbers) return <DefaultVisual step={step} />;

  return (
    <div className="sr-morph">
      <div className="morph-row">
        {step.numbers.map((num, i) => {
          const isOp = typeof num === 'string' && ['+', '-', '×', '÷', ':', '=', '²', 'x=', '→x=', '→'].includes(num);
          const isResult = i === step.highlight_index;
          const visible = revealed.includes(i);
          if (isOp) {
            return (
              <div key={i} className="morph-op"
                style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                {num}
              </div>
            );
          }
          return (
            <div
              key={i}
              className={`morph-box ${isResult && visible ? 'result' : visible ? 'highlight' : ''}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? (isResult ? 'scale(1.15)' : 'scale(1)') : 'scale(0.5)',
                transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                animationDelay: `${i * 0.1}s`,
                minWidth: String(num).length > 4 ? '72px' : '56px'
              }}
            >
              {num}
            </div>
          );
        })}
      </div>
      {step.formula_used && (
        <div style={{
          fontSize: '0.8rem', color: 'var(--muted)', marginTop: 8,
          opacity: revealed.length > 2 ? 1 : 0, transition: 'opacity 0.4s ease'
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
      {/* Road */}
      <rect x="0" y="120" width="400" height="40" fill="#2a2a40" rx="4" />
      <line x1="0" y1="140" x2="400" y2="140" stroke="#EF9F27" strokeWidth="2" strokeDasharray="20,15" />
      {/* Distance markers */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <line x1={50 + i * 90} y1="118" x2={50 + i * 90} y2="162" stroke="#6E6E8A" strokeWidth="1" />
          <text x={50 + i * 90} y="175" fill="#6E6E8A" fontSize="10" textAnchor="middle">{i * 60} km</text>
        </g>
      ))}
      {/* Car */}
      <g style={{ animation: isActive ? 'storySlideIn 1s ease forwards' : 'none', opacity: isActive ? 1 : 0 }}>
        <rect x="20" y="102" width="60" height="24" fill="#7F77DD" rx="6" />
        <rect x="30" y="94" width="40" height="16" fill="#5a53aa" rx="4" />
        <circle cx="30" cy="126" r="8" fill="#1E1E2E" />
        <circle cx="30" cy="126" r="4" fill="#6E6E8A" />
        <circle cx="70" cy="126" r="8" fill="#1E1E2E" />
        <circle cx="70" cy="126" r="4" fill="#6E6E8A" />
        <text x="50" y="113" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">60km/h</text>
      </g>
      {/* Arrow and label */}
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
      {/* Train 1 - from left */}
      <g style={{ animation: isActive ? 'trainMove 2s ease-in-out infinite alternate' : 'none' }}>
        <rect x="20" y="95" width="70" height="25" fill="#7F77DD" rx="5" />
        <rect x="30" y="87" width="50" height="14" fill="#5a53aa" rx="4" />
        <circle cx="32" cy="120" r="6" fill="#1E1E2E" /><circle cx="32" cy="120" r="3" fill="#6E6E8A" />
        <circle cx="78" cy="120" r="6" fill="#1E1E2E" /><circle cx="78" cy="120" r="3" fill="#6E6E8A" />
        <text x="55" y="108" fill="white" fontSize="8" textAnchor="middle">70 km/h →</text>
      </g>
      {/* Train 2 - from right */}
      <g style={{ animation: isActive ? 'trainMove 2s ease-in-out infinite alternate-reverse' : 'none' }}>
        <rect x="310" y="95" width="70" height="25" fill="#D85A30" rx="5" />
        <rect x="320" y="87" width="50" height="14" fill="#aa3a1a" rx="4" />
        <circle cx="322" cy="120" r="6" fill="#1E1E2E" /><circle cx="322" cy="120" r="3" fill="#6E6E8A" />
        <circle cx="368" cy="120" r="6" fill="#1E1E2E" /><circle cx="368" cy="120" r="3" fill="#6E6E8A" />
        <text x="345" y="108" fill="white" fontSize="8" textAnchor="middle">← 80 km/h</text>
      </g>
      {/* Labels */}
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
      {/* Cross diagram */}
      <g style={{ animation: isActive ? 'fadeIn 0.6s ease both' : 'none' }}>
        <text x="50" y="70" fill="#7F77DD" fontSize="16" fontWeight="800" textAnchor="middle">₹20</text>
        <text x="50" y="85" fill="#6E6E8A" fontSize="10" textAnchor="middle">Cheaper</text>
        <text x="270" y="70" fill="#D85A30" fontSize="16" fontWeight="800" textAnchor="middle">₹30</text>
        <text x="270" y="85" fill="#6E6E8A" fontSize="10" textAnchor="middle">Dearer</text>
        {/* Center */}
        <rect x="130" y="55" width="60" height="34" fill="var(--surface3)" rx="8" stroke="var(--border)" />
        <text x="160" y="73" fill="#EF9F27" fontSize="14" fontWeight="800" textAnchor="middle">₹24</text>
        <text x="160" y="84" fill="#6E6E8A" fontSize="9" textAnchor="middle">Mean</text>
        {/* Cross lines */}
        <line x1="70" y1="72" x2="130" y2="72" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="190" y1="72" x2="250" y2="72" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="70" y1="72" x2="250" y2="120" stroke="#7F77DD" strokeWidth="1.5" strokeDasharray="4,3" />
        <line x1="250" y1="72" x2="70" y2="120" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="4,3" />
        {/* Differences */}
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

  // Default motion graphic — number line or abstract
  return (
    <div className="sr-motion">
      <svg width="360" height="180" viewBox="0 0 360 180">
        <g style={{ animation: isActive ? 'fadeIn 0.6s ease both' : 'none' }}>
          {/* Abstract geometry */}
          <circle cx="180" cy="90" r="60" fill="none" stroke="var(--violet)" strokeWidth="1.5" opacity="0.4"
            style={{ animation: isActive ? 'pulse 2s ease infinite' : 'none' }} />
          <circle cx="180" cy="90" r="40" fill="rgba(127,119,221,0.1)" stroke="var(--violet)" strokeWidth="2"
            style={{ animation: isActive ? 'pulse 2s ease 0.3s infinite' : 'none' }} />
          <circle cx="180" cy="90" r="20" fill="rgba(127,119,221,0.2)" />
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
              <span key={i} className="word-syn" style={{
                animationDelay: `${i * 0.1}s`,
                animation: 'popIn 0.4s ease both'
              }}>{s}</span>
            ))}
          </div>
        </div>
      )}
      {phase >= 3 && step.memory_tip && (
        <div style={{
          marginTop: 14, fontSize: '0.78rem', color: 'var(--amber)',
          padding: '8px 12px', background: 'rgba(239,159,39,0.08)',
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
              background: 'rgba(127,119,221,0.12)', color: 'var(--violet)',
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
function DefaultVisual({ step }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>
        {step.explanation}
      </div>
      {step.formula_used && (
        <div className="step-formula" style={{ marginTop: 16, display: 'inline-block' }}>
          {step.formula_used}
        </div>
      )}
    </div>
  );
}
