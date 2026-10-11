// src/components/engines/RacePhysicsEngine.jsx
// High-fidelity SVG & Physics vector animation engine for Races, Games of Skill & Headstarts.
// Renders dual running lanes, visual headstart handicap brackets, and finish line dynamics.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RacePhysicsEngine({ step, isActive }) {
  const data = step?.render_data || {};
  const entities = data.entities || [];
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setTriggered(false);
      return;
    }
    const timer = setTimeout(() => setTriggered(true), 120);
    return () => clearTimeout(timer);
  }, [isActive, step]);

  const stepText = ((step?.explanation || '') + ' ' + (step?.title || '') + ' ' + JSON.stringify(data)).toLowerCase();

  // Extract headstart value from text
  const headstartMatch = stepText.match(/(?:start|headstart|beats?.*by)\s*(?:of)?\s*(\d+)\s*m/i);
  const headstartText = headstartMatch ? `${headstartMatch[1]}m` : (data.distance || '20m');

  // Extract race distance (e.g. "100m")
  const raceDistMatch = stepText.match(/(\d+)\s*m(?:eter)?s?\s*(?:race|course|sprint|run)/i)
    || stepText.match(/race.*?(\d+)\s*m/i);
  const raceDistLabel = raceDistMatch ? `${raceDistMatch[1]}m` : (data.total_distance || '100m');

  // Runners from entities or defaults
  const runnerA = entities[0] || {};
  const runnerB = entities[1] || {};

  // Clamp animation endpoints so runners stay 8%–80% (leaving room for the badge)
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  const startA = clamp(runnerA.startX ?? 6, 6, 78);
  const endA   = triggered ? clamp(runnerA.endX ?? 80, 6, 80) : startA;

  const startB = clamp(runnerB.startX ?? 22, 6, 78);
  const endB   = triggered ? clamp(runnerB.endX ?? 72, 6, 80) : startB;

  // Headstart bracket spans from start line (8%) to B's starting position
  const bStartPct = clamp(runnerB.startX ?? 22, 6, 78);

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '4px 0 16px',
    }}>
      {/* ── 1. HUD ── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        padding: '10px 14px',
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        fontSize: '0.8rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: 'var(--coral)',
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid var(--coral)',
            padding: '3px 8px',
            borderRadius: '20px',
          }}>
            🏁 Track Race &amp; Headstart
          </span>

          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Headstart: <strong style={{ color: 'var(--coral)' }}>{headstartText}</strong>
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--violet)',
          background: 'rgba(37, 99, 235, 0.08)',
          border: '1px solid var(--violet)',
          padding: '4px 10px',
          borderRadius: '20px',
        }}>
          <span>Race Course:</span>
          <strong>{raceDistLabel}</strong>
        </div>
      </div>

      {/* ── 2. STADIUM TRACK (fully contained SVG) ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}>
        {/*
          Using a single SVG for the whole track avoids any overflow.
          viewBox is 600×200 — runners and labels are drawn as SVG elements,
          so nothing can escape the container.
        */}
        <svg
          width="100%"
          viewBox="0 0 600 200"
          fill="none"
          style={{ display: 'block' }}
        >
          {/* ── Track background ── */}
          <rect width="600" height="200" fill="#991b1b" rx="12" />
          {/* Subtle lane gradient */}
          <rect width="600" height="200" fill="url(#trackGrad)" rx="12" opacity="0.4" />
          <defs>
            <linearGradient id="trackGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
          </defs>

          {/* Lane divider (horizontal dashed line) */}
          <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeDasharray="10,8" />

          {/* ── START LINE ── */}
          <rect x="46" y="0" width="4" height="200" fill="rgba(255,255,255,0.9)" />
          <text x="50" y="15" fontSize="10" fontWeight="900" fill="#fca5a5" letterSpacing="0.5">START</text>

          {/* ── FINISH LINE (checkered) ── */}
          {/* Alternate 10px black/white squares across the finish strip */}
          {Array.from({ length: 20 }).map((_, i) => (
            <rect
              key={i}
              x={554}
              y={i * 10}
              width="10"
              height="10"
              fill={i % 2 === 0 ? '#ffffff' : '#0f172a'}
            />
          ))}
          <text x="565" y="15" fontSize="10" fontWeight="900" fill="#fef08a" letterSpacing="0.5">FINISH</text>

          {/* ── HEADSTART BRACKET on Lane 2 ── */}
          {/* From start-line x=50 to B's start x position */}
          {(() => {
            const bx = 50 + (bStartPct / 100) * 510;
            return (
              <g>
                {/* bracket line */}
                <line x1="50" y1="142" x2={bx} y2="142" stroke="#fef08a" strokeWidth="1.5" strokeDasharray="4,3" />
                <line x1="50"  y1="138" x2="50"  y2="146" stroke="#fef08a" strokeWidth="2" />
                <line x1={bx} y1="138" x2={bx} y2="146" stroke="#fef08a" strokeWidth="2" />
                {/* bracket label */}
                <rect
                  x={25 + (bx - 50) / 2 - 22}
                  y="148"
                  width="44"
                  height="14"
                  rx="4"
                  fill="rgba(0,0,0,0.65)"
                />
                <text
                  x={25 + (bx - 50) / 2}
                  y="158"
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="800"
                  fill="#fef08a"
                >
                  ← {headstartText} →
                </text>
              </g>
            );
          })()}

          {/* ── RUNNER A (top lane, blue) ── */}
          <motion.g
            initial={false}
            animate={{ x: (endA / 100) * 510 }}
            transition={{ duration: runnerA.duration ?? 2.8, ease: 'easeInOut' }}
            style={{ originX: 0, originY: 0 }}
          >
            {/* Badge */}
            <rect x="-30" y="18" width="60" height="16" rx="8" fill="#ffffff" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="0" y="29" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#0f172a">
              {runnerA.label || 'Runner A'}
            </text>
            {/* Head */}
            <circle cx="2" cy="42" r="7" fill="#38bdf8" />
            {/* Body */}
            <line x1="2" y1="49" x2="2" y2="66" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
            {/* Right arm */}
            <line x1="2" y1="53" x2="14" y2="60" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            {/* Left arm */}
            <line x1="2" y1="53" x2="-10" y2="58" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
            {/* Right leg */}
            <line x1="2" y1="66" x2="12" y2="78" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
            {/* Left leg */}
            <line x1="2" y1="66" x2="-8" y2="80" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* ── RUNNER B (bottom lane, gold) ── */}
          <motion.g
            initial={false}
            animate={{ x: (endB / 100) * 510 }}
            transition={{ duration: runnerB.duration ?? 2.8, ease: 'easeInOut' }}
            style={{ originX: 0, originY: 0 }}
          >
            {/* Badge */}
            <rect x="-36" y="108" width="72" height="16" rx="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
            <text x="0" y="119" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#0f172a">
              {runnerB.label || 'Runner B (+Start)'}
            </text>
            {/* Head */}
            <circle cx="2" cy="132" r="7" fill="#facc15" />
            {/* Body */}
            <line x1="2" y1="139" x2="2" y2="156" stroke="#ca8a04" strokeWidth="5" strokeLinecap="round" />
            {/* Right arm */}
            <line x1="2" y1="143" x2="14" y2="150" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            {/* Left arm */}
            <line x1="2" y1="143" x2="-10" y2="148" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
            {/* Right leg */}
            <line x1="2" y1="156" x2="12" y2="168" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
            {/* Left leg */}
            <line x1="2" y1="156" x2="-8" y2="170" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        </svg>
      </div>

      {/* ── 3. METRICS FOOTER ── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        padding: '10px 14px',
        background: 'var(--surface3)',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        fontSize: '0.8rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⏱️</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {data.info || 'B only needs to cover: Race Distance − Headstart'}
          </span>
        </div>

        <div style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          color: 'var(--coral)',
          background: 'var(--surface)',
          border: '1px solid var(--coral)',
          padding: '3px 10px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
        }}>
          Effective Distance for B: Course − Headstart
        </div>
      </div>
    </div>
  );
}
