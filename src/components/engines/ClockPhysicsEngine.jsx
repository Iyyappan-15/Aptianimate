// src/components/engines/ClockPhysicsEngine.jsx
// High-fidelity SVG & Trigonometric vector animation engine for Clocks and Angles.
// Renders precision analog clock face, dynamically positioned hour/minute hands, and highlighted angle arc.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ClockPhysicsEngine({ step, isActive }) {
  const data = step?.render_data || {};
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setTriggered(false);
      return;
    }
    const timer = setTimeout(() => setTriggered(true), 120);
    return () => clearTimeout(timer);
  }, [isActive, step]);

  // Extract time from step text (e.g., "3:30", "4:20", "8:15")
  const stepText = ((step?.explanation || '') + ' ' + (step?.title || '') + ' ' + JSON.stringify(data));
  const timeMatch = stepText.match(/(\d{1,2}):(\d{2})/);
  
  const hours = timeMatch ? parseInt(timeMatch[1], 10) : (data.hours || 3);
  const minutes = timeMatch ? parseInt(timeMatch[2], 10) : (data.minutes || 30);

  // Exact Clock Math:
  // Minute hand moves 6° per minute
  // Hour hand moves 30° per hour + 0.5° per minute
  const minuteAngle = (minutes * 6) % 360;
  const hourAngle = ((hours % 12) * 30 + minutes * 0.5) % 360;

  // Smallest angle between hands
  let diffAngle = Math.abs(hourAngle - minuteAngle);
  if (diffAngle > 180) diffAngle = 360 - diffAngle;
  const formattedAngle = Math.round(diffAngle * 10) / 10;

  // Arc path calculation for SVG sector
  const cx = 190;
  const cy = 110;
  const arcRadius = 45;

  const startRad = ((Math.min(hourAngle, minuteAngle) - 90) * Math.PI) / 180;
  const endRad = ((Math.max(hourAngle, minuteAngle) - 90) * Math.PI) / 180;
  const x1 = cx + arcRadius * Math.cos(startRad);
  const y1 = cy + arcRadius * Math.sin(startRad);
  const x2 = cx + arcRadius * Math.cos(endRad);
  const y2 = cy + arcRadius * Math.sin(endRad);
  const largeArcFlag = diffAngle > 180 ? 1 : 0;

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '4px 0 16px',
    }}>
      {/* ── 1. HUD: TIME & MEASURED ANGLE ── */}
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
            color: 'var(--amber)',
            background: 'rgba(217, 119, 6, 0.1)',
            border: '1px solid var(--amber)',
            padding: '3px 8px',
            borderRadius: '20px',
          }}>
            🕒 Clock Face Angle
          </span>

          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Given Time: <strong style={{ color: 'var(--violet)' }}>{hours}:{minutes < 10 ? `0${minutes}` : minutes}</strong>
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--teal)',
          background: 'rgba(13, 148, 136, 0.08)',
          border: '1px solid var(--teal)',
          padding: '4px 10px',
          borderRadius: '20px',
        }}>
          <span>Subtended Angle θ:</span>
          <strong>{formattedAngle}°</strong>
        </div>
      </div>

      {/* ── 2. PRECISION ANALOG CLOCK SVG ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        background: 'linear-gradient(180deg, var(--surface2) 0%, var(--card) 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="380" height="220" viewBox="0 0 380 220" fill="none">
          <defs>
            <radialGradient id="clockDialGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="85%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </radialGradient>
            <linearGradient id="bezelGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#64748b" />
              <stop offset="0.5" stopColor="#334155" />
              <stop offset="1" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Clock Outer Bezel */}
          <circle cx={cx} cy={cy} r="88" fill="url(#bezelGrad)" stroke="#0f172a" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="83" fill="url(#clockDialGrad)" stroke="#cbd5e1" strokeWidth="1.5" />

          {/* 12 Hour Number Markings */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
            const rad = ((i * 30 - 60) * Math.PI) / 180;
            const tx = cx + 66 * Math.cos(rad);
            const ty = cy + 66 * Math.sin(rad) + 4;
            return (
              <text
                key={num}
                x={tx}
                y={ty}
                textAnchor="middle"
                fontSize="11"
                fontWeight="800"
                fill="#334155"
              >
                {num}
              </text>
            );
          })}

          {/* 60 Minute Tick Marks */}
          {Array.from({ length: 60 }).map((_, m) => {
            const isHourTick = m % 5 === 0;
            const rad = ((m * 6 - 90) * Math.PI) / 180;
            const rInner = isHourTick ? 74 : 77;
            const rOuter = 81;
            return (
              <line
                key={m}
                x1={cx + rInner * Math.cos(rad)}
                y1={cy + rInner * Math.sin(rad)}
                x2={cx + rOuter * Math.cos(rad)}
                y2={cy + rOuter * Math.sin(rad)}
                stroke={isHourTick ? '#0f172a' : '#94a3b8'}
                strokeWidth={isHourTick ? 2 : 1}
              />
            );
          })}

          {/* Highlighted Angle Arc / Sector */}
          {triggered && diffAngle > 0 && diffAngle <= 180 && (
            <path
              d={`M ${cx} ${cy} L ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill="rgba(13, 148, 136, 0.18)"
              stroke="#0d9488"
              strokeWidth="1.5"
            />
          )}

          {/* Angle Callout Label */}
          {triggered && (
            <text
              x={cx + 5}
              y={cy - 22}
              textAnchor="middle"
              fontSize="12"
              fontWeight="900"
              fill="#0f766e"
            >
              {formattedAngle}°
            </text>
          )}

          {/* ── HOUR HAND ── */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: triggered ? hourAngle : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            {/* Shorter, elegant hour sword */}
            <path
              d={`M ${cx - 3} ${cy} L ${cx} ${cy - 48} L ${cx + 3} ${cy} Z`}
              fill="#2563eb"
              stroke="#1e40af"
              strokeWidth="1"
            />
            <line x1={cx} y1={cy} x2={cx} y2={cy + 10} stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
          </motion.g>

          {/* ── MINUTE HAND ── */}
          <motion.g
            initial={{ rotate: 0 }}
            animate={{ rotate: triggered ? minuteAngle : 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            {/* Longer, slender minute hand */}
            <path
              d={`M ${cx - 2} ${cy} L ${cx} ${cy - 72} L ${cx + 2} ${cy} Z`}
              fill="#0f172a"
              stroke="#334155"
              strokeWidth="1"
            />
            <circle cx={cx} cy={cy - 50} r="2.5" fill="#38bdf8" />
            <line x1={cx} y1={cy} x2={cx} y2={cy + 14} stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
          </motion.g>

          {/* Center Pinion Cap */}
          <circle cx={cx} cy={cy} r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="2" fill="#ffffff" />
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
          <span>📐</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {data.info || 'Formula: θ = |(30 × H) − (11/2 × M)| degrees'}
          </span>
        </div>

        <div style={{
          fontSize: '0.75rem',
          fontWeight: 800,
          color: 'var(--amber)',
          background: 'var(--surface)',
          border: '1px solid var(--amber)',
          padding: '3px 10px',
          borderRadius: '8px',
        }}>
          Speed difference: 5.5° per minute
        </div>
      </div>
    </div>
  );
}
