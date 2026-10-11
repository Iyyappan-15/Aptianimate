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
  // Minute hand moves 6° per minute  (0 min = top = 0°, 15 min = 90°, 30 min = 180°, etc.)
  // Hour hand moves 30° per hour + 0.5° per minute
  // 0° = pointing UP (12 o'clock)
  const minuteAngle = (minutes * 6) % 360;
  const hourAngle = ((hours % 12) * 30 + minutes * 0.5) % 360;

  // Smallest angle between hands
  let diffAngle = Math.abs(hourAngle - minuteAngle);
  if (diffAngle > 180) diffAngle = 360 - diffAngle;
  const formattedAngle = Math.round(diffAngle * 10) / 10;

  // Clock center & dimensions
  const cx = 190;
  const cy = 115;
  const R = 88;       // outer bezel radius
  const arcRadius = 46;

  // Arc for the angle sector between the two hands
  // Angles measured from 12 o'clock (top), clockwise
  const toRad = (deg) => ((deg - 90) * Math.PI) / 180;
  const minStartAngle = Math.min(hourAngle, minuteAngle);
  const maxEndAngle   = Math.max(hourAngle, minuteAngle);

  const arcLarge = (maxEndAngle - minStartAngle) > 180 ? 1 : 0;
  const ax1 = cx + arcRadius * Math.cos(toRad(minStartAngle));
  const ay1 = cy + arcRadius * Math.sin(toRad(minStartAngle));
  const ax2 = cx + arcRadius * Math.cos(toRad(maxEndAngle));
  const ay2 = cy + arcRadius * Math.sin(toRad(maxEndAngle));

  // Midpoint of the arc for the angle label
  const midAngle = (minStartAngle + maxEndAngle) / 2;
  const labelR = arcRadius + 14;
  const labelX = cx + labelR * Math.cos(toRad(midAngle));
  const labelY = cy + labelR * Math.sin(toRad(midAngle));

  // Hour hand — shorter, wider, dark navy
  // Points upward at 0°; rotation applied via SVG transform
  const hourHandLength = 52;
  const hourHandWidth  = 5;

  // Minute hand — longer, slender, dark slate
  const minuteHandLength = 72;
  const minuteHandWidth  = 3;

  // Helper: hand tip coordinates (in unrotated state pointing straight up)
  // Hand rotates around (cx, cy)
  const handTransform = (angle) =>
    `rotate(${angle}, ${cx}, ${cy})`;

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
            Time: <strong style={{ color: 'var(--violet)' }}>{hours}:{minutes < 10 ? `0${minutes}` : minutes}</strong>
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
          <span>Angle θ:</span>
          <strong>{formattedAngle}°</strong>
        </div>
      </div>

      {/* ── 2. PRECISION ANALOG CLOCK SVG ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(180deg, var(--surface2) 0%, var(--card) 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 0',
      }}>
        <svg width="380" height="240" viewBox="0 0 380 240" fill="none" style={{ maxWidth: '100%' }}>
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
          <circle cx={cx} cy={cy} r={R}      fill="url(#bezelGrad)" stroke="#0f172a" strokeWidth="2" />
          <circle cx={cx} cy={cy} r={R - 5}  fill="url(#clockDialGrad)" stroke="#cbd5e1" strokeWidth="1.5" />

          {/* 60 Minute Tick Marks */}
          {Array.from({ length: 60 }).map((_, m) => {
            const isHour = m % 5 === 0;
            const rad = toRad(m * 6);
            const rInner = isHour ? R - 19 : R - 13;
            const rOuter = R - 7;
            return (
              <line
                key={m}
                x1={cx + rInner * Math.cos(rad)}
                y1={cy + rInner * Math.sin(rad)}
                x2={cx + rOuter * Math.cos(rad)}
                y2={cy + rOuter * Math.sin(rad)}
                stroke={isHour ? '#1e293b' : '#94a3b8'}
                strokeWidth={isHour ? 2.5 : 1}
              />
            );
          })}

          {/* 12 Hour Number Markings */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
            const rad = toRad(i * 30);
            const tx = cx + (R - 30) * Math.cos(rad);
            const ty = cy + (R - 30) * Math.sin(rad) + 4;
            return (
              <text
                key={num}
                x={tx}
                y={ty}
                textAnchor="middle"
                fontSize="12"
                fontWeight="800"
                fill="#1e293b"
              >
                {num}
              </text>
            );
          })}

          {/* ── Highlighted Angle Arc / Sector ── */}
          {triggered && diffAngle > 0 && (
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              d={`M ${cx} ${cy} L ${ax1} ${ay1} A ${arcRadius} ${arcRadius} 0 ${arcLarge} 1 ${ax2} ${ay2} Z`}
              fill="rgba(13, 148, 136, 0.20)"
              stroke="#0d9488"
              strokeWidth="1.5"
            />
          )}

          {/* Angle label near arc midpoint */}
          {triggered && diffAngle > 0 && (
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="11"
              fontWeight="900"
              fill="#0f766e"
            >
              {formattedAngle}°
            </motion.text>
          )}

          {/* ── HOUR HAND ── dark navy, short & wide ── */}
          {/* Drawn pointing straight up, rotated around center */}
          <motion.line
            x1={cx}
            y1={cy + 12}                  /* tail extends slightly below center */
            x2={cx}
            y2={cy - hourHandLength}       /* tip */
            stroke="#1e293b"
            strokeWidth={hourHandWidth}
            strokeLinecap="round"
            initial={false}
            animate={{ rotate: triggered ? hourAngle : hourAngle }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          {/* ── MINUTE HAND ── mid-blue, longer & slender ── */}
          <motion.line
            x1={cx}
            y1={cy + 16}
            x2={cx}
            y2={cy - minuteHandLength}
            stroke="#2563eb"
            strokeWidth={minuteHandWidth}
            strokeLinecap="round"
            initial={false}
            animate={{ rotate: triggered ? minuteAngle : minuteAngle }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />

          {/* ── SECOND HAND thin accent (decorative, fixed at 0°) ── */}
          <line
            x1={cx}
            y1={cy + 18}
            x2={cx}
            y2={cy - 78}
            stroke="#dc2626"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Center cap layers */}
          <circle cx={cx} cy={cy} r="7"   fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="4"   fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="1.5" fill="#ffffff" />
        </svg>

        {/* Legend */}
        <div style={{
          position: 'absolute',
          bottom: '14px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '6px 10px',
          fontSize: '0.65rem',
          fontWeight: 700,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '22px', height: '4px', background: '#1e293b', borderRadius: '2px' }} />
            <span style={{ color: '#1e293b' }}>Hour hand</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '22px', height: '3px', background: '#2563eb', borderRadius: '2px' }} />
            <span style={{ color: '#2563eb' }}>Minute hand</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '22px', height: '2px', background: '#dc2626', borderRadius: '1px' }} />
            <span style={{ color: '#dc2626' }}>Ref (12)</span>
          </div>
        </div>
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
