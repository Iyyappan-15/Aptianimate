// src/components/engines/ClockPhysicsEngine.jsx
// High-fidelity SVG analog clock with real tapered hands, proper rotation,
// arc angle highlight, and clear legend.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ClockPhysicsEngine({ step, isActive }) {
  const data = step?.render_data || {};
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!isActive) { setTriggered(false); return; }
    const t = setTimeout(() => setTriggered(true), 200);
    return () => clearTimeout(t);
  }, [isActive, step]);

  // ── Parse time from step text ──────────────────────────────────────────
  const stepText = (step?.explanation || '') + ' ' + (step?.title || '') + ' ' + JSON.stringify(data);
  const timeMatch = stepText.match(/(\d{1,2}):(\d{2})/);
  const hours   = timeMatch ? parseInt(timeMatch[1], 10) : (data.hours   || 3);
  const minutes = timeMatch ? parseInt(timeMatch[2], 10) : (data.minutes || 30);

  // ── Angle math ─────────────────────────────────────────────────────────
  // 0° = 12 o'clock (top), clockwise positive
  const minuteDeg = (minutes * 6) % 360;                        // 6° per minute
  const hourDeg   = ((hours % 12) * 30 + minutes * 0.5) % 360; // 0.5° per minute

  let diffAngle = Math.abs(hourDeg - minuteDeg);
  if (diffAngle > 180) diffAngle = 360 - diffAngle;
  const theta = Math.round(diffAngle * 10) / 10;

  // ── SVG coordinate helpers ─────────────────────────────────────────────
  const cx = 140, cy = 140, R = 110; // clock center & bezel radius
  // Convert clock degrees (0=top, CW) to radians for x/y math
  const toXY = (deg, r) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  // ── Arc sector between the two hands ──────────────────────────────────
  const arcR = 55;
  const minD = Math.min(hourDeg, minuteDeg);
  const maxD = Math.max(hourDeg, minuteDeg);
  const a1 = toXY(minD, arcR);
  const a2 = toXY(maxD, arcR);
  const largeArc = (maxD - minD) > 180 ? 1 : 0;

  // label at midpoint of arc
  const midD = (minD + maxD) / 2;
  const lbl  = toXY(midD, arcR + 18);

  // ── Hand polygon helper ────────────────────────────────────────────────
  // Draws a hand pointing STRAIGHT UP from center.
  // tail  = how far the hand extends below center (counter-weight)
  // len   = how far it extends toward 12 (tip)
  // wb    = width at base, wt = width at tip
  const handPolygon = (len, tail, wb, wt) => {
    // 4-point tapered trapezoid pointing up
    return [
      `${cx - wb / 2},${cy + tail}`,  // bottom-left
      `${cx + wb / 2},${cy + tail}`,  // bottom-right
      `${cx + wt / 2},${cy - len}`,   // top-right (tip)
      `${cx - wt / 2},${cy - len}`,   // top-left  (tip)
    ].join(' ');
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', padding: '4px 0 16px' }}>

      {/* ── HUD ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', gap: '8px',
        padding: '10px 14px', background: 'var(--surface2)',
        border: '1px solid var(--border)', borderRadius: '12px', fontSize: '0.8rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '0.5px', color: 'var(--amber)',
            background: 'rgba(217,119,6,0.1)', border: '1px solid var(--amber)',
            padding: '3px 8px', borderRadius: '20px',
          }}>🕒 Clock Angle</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Time: <strong style={{ color: 'var(--violet)' }}>
              {hours}:{minutes < 10 ? `0${minutes}` : minutes}
            </strong>
          </span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.75rem', fontWeight: 700, color: 'var(--teal)',
          background: 'rgba(13,148,136,0.08)', border: '1px solid var(--teal)',
          padding: '4px 10px', borderRadius: '20px',
        }}>
          <span>Angle θ =</span><strong>{theta}°</strong>
        </div>
      </div>

      {/* ── CLOCK SVG ── */}
      <div style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg, var(--surface2) 0%, var(--card) 100%)',
        borderRadius: '16px', border: '1px solid var(--border)', padding: '16px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/*
          viewBox: 280×280  — clock center at (140,140), radius 110
          Everything is drawn inside this box; overflow hidden on parent.
        */}
        <svg
          viewBox="0 0 280 280"
          width="280"
          height="280"
          style={{ maxWidth: '100%', display: 'block' }}
        >
          <defs>
            <radialGradient id="dialGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#ffffff" />
              <stop offset="90%"  stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
            <radialGradient id="bezelGrad2" cx="40%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#64748b" />
              <stop offset="60%"  stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
            <filter id="handShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Outer bezel */}
          <circle cx={cx} cy={cy} r={R}      fill="url(#bezelGrad2)" />
          {/* Bezel inner rim */}
          <circle cx={cx} cy={cy} r={R - 6}  fill="#1e293b" />
          {/* Clock dial face */}
          <circle cx={cx} cy={cy} r={R - 9}  fill="url(#dialGrad)" />

          {/* ── Tick marks ── */}
          {Array.from({ length: 60 }).map((_, m) => {
            const isH  = m % 5  === 0;
            const is15 = m % 15 === 0;
            const inner = isH ? (is15 ? R - 26 : R - 22) : R - 17;
            const outer = R - 10;
            const s = toXY(m * 6, inner);
            const e = toXY(m * 6, outer);
            return (
              <line key={m}
                x1={s.x} y1={s.y} x2={e.x} y2={e.y}
                stroke={isH ? '#1e293b' : '#94a3b8'}
                strokeWidth={is15 ? 3 : isH ? 2 : 1}
                strokeLinecap="round"
              />
            );
          })}

          {/* ── Hour numerals ── */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
            const p = toXY(i * 30, R - 34);
            return (
              <text key={num} x={p.x} y={p.y + 4.5}
                textAnchor="middle" fontSize="13" fontWeight="800" fill="#1e293b">
                {num}
              </text>
            );
          })}

          {/* ── Arc sector ── */}
          {triggered && diffAngle > 0 && (
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              d={`M ${cx} ${cy} L ${a1.x} ${a1.y} A ${arcR} ${arcR} 0 ${largeArc} 1 ${a2.x} ${a2.y} Z`}
              fill="rgba(13,148,136,0.22)"
              stroke="#0d9488"
              strokeWidth="1.5"
            />
          )}

          {/* ── Arc angle label ── */}
          {triggered && diffAngle > 0 && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
            >
              <rect
                x={lbl.x - 17} y={lbl.y - 9}
                width="34" height="18" rx="9"
                fill="#0f766e" opacity="0.9"
              />
              <text x={lbl.x} y={lbl.y + 4.5}
                textAnchor="middle" fontSize="10" fontWeight="900" fill="#ffffff">
                {theta}°
              </text>
            </motion.g>
          )}

          {/* ── HOUR HAND ──────────────────────────────────────────────
              Shape: short, thick tapered polygon pointing UP.
              Rotation: motion.g rotates around (cx, cy).
              Framer-motion style.transformOrigin works on SVG <g>.
          ──────────────────────────────────────────────────────────── */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: triggered ? hourDeg : 0 }}
            transition={{ duration: 1.3, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            filter="url(#handShadow)"
          >
            {/* Tapered polygon: base 10px wide, tip 3px wide, 65px long, 15px tail */}
            <polygon
              points={handPolygon(65, 15, 10, 3)}
              fill="#1e293b"
              stroke="#0f172a"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* ── MINUTE HAND ─────────────────────────────────────────────
              Shape: long, slender tapered polygon pointing UP.
              Royal blue so it's clearly distinct from the hour hand.
          ──────────────────────────────────────────────────────────── */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: triggered ? minuteDeg : 0 }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            filter="url(#handShadow)"
          >
            {/* Tapered polygon: base 7px wide, tip 2px wide, 90px long, 18px tail */}
            <polygon
              points={handPolygon(90, 18, 7, 2)}
              fill="#1d4ed8"
              stroke="#1e3a8a"
              strokeWidth="0.5"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* ── Center cap (drawn last so it's always on top) ── */}
          <circle cx={cx} cy={cy} r="10"  fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="6.5" fill="#f59e0b" stroke="#92400e" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="2.5" fill="#fef3c7" />
        </svg>

        {/* ── Legend ── */}
        <div style={{
          position: 'absolute', bottom: '18px', right: '18px',
          display: 'flex', flexDirection: 'column', gap: '5px',
          background: 'rgba(255,255,255,0.94)',
          border: '1px solid var(--border)', borderRadius: '8px',
          padding: '7px 11px', fontSize: '0.65rem', fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{ width: '24px', height: '5px', background: '#1e293b', borderRadius: '3px' }} />
            <span style={{ color: '#1e293b' }}>Hour hand</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{ width: '24px', height: '3px', background: '#1d4ed8', borderRadius: '2px' }} />
            <span style={{ color: '#1d4ed8' }}>Minute hand</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <div style={{ width: '14px', height: '14px', background: 'rgba(13,148,136,0.22)', border: '1px solid #0d9488', borderRadius: '2px' }} />
            <span style={{ color: '#0f766e' }}>Angle θ</span>
          </div>
        </div>
      </div>

      {/* ── Metrics footer ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', gap: '8px',
        padding: '10px 14px', background: 'var(--surface3)',
        borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.8rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📐</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {data.info || 'Formula: θ = |(30 × H) − (11/2 × M)| degrees'}
          </span>
        </div>
        <div style={{
          fontSize: '0.75rem', fontWeight: 800, color: 'var(--amber)',
          background: 'var(--surface)', border: '1px solid var(--amber)',
          padding: '3px 10px', borderRadius: '8px',
        }}>
          Speed difference: 5.5° per minute
        </div>
      </div>
    </div>
  );
}
