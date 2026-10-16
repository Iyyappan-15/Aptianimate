// src/components/engines/CisternPhysicsEngine.jsx
// High-fidelity SVG & Physics vector animation engine for Pipes & Cisterns / Water Tanks.
// Renders transparent reservoir, animated inlet pipes pouring water, outlet drain leaks, and fluid level.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CisternPhysicsEngine({ step, isActive }) {
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

  // Extract scenario details
  const stepText = ((step?.explanation || '') + ' ' + (step?.title || '') + ' ' + JSON.stringify(data)).toLowerCase();
  const hasLeak = stepText.includes('leak') || stepText.includes('empty') || stepText.includes('outlet') || stepText.includes('waste');
  
  // Calculate fill percentage based on step number or explicit capacity in data
  const stepNum = step?.step || 1;
  const fillPct = Math.min(100, Math.max(15, (data.fill_pct || (stepNum * 20))));

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '4px 0 16px',
    }}>
      {/* ── 1. HUD: NET FLOW RATE & CAPACITY ── */}
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
            color: 'var(--teal)',
            background: 'rgba(13, 148, 136, 0.1)',
            border: '1px solid var(--teal)',
            padding: '3px 8px',
            borderRadius: '20px',
          }}>
            🚰 Cistern / Water Tank Reservoir
          </span>

          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Tank Fill Level: <strong style={{ color: 'var(--teal)' }}>{fillPct}%</strong>
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
          <span>Net Rate:</span>
          <strong>{hasLeak ? '(1/A + 1/B) − 1/C [Inlets − Outlet]' : '1/A + 1/B [Combined Inlets]'}</strong>
        </div>
      </div>

      {/* ── 2. CISTERN TANK SVG CANVAS ── */}
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
        <svg width="100%" viewBox="0 0 380 220" preserveAspectRatio="xMidYMid meet" fill="none" style={{ display: 'block', maxWidth: '380px' }}>
          <defs>
            <linearGradient id="waterFluidGrad" x1="0" y1="0" x2="0" y2="140" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.7" stopColor="#0284c7" />
              <stop offset="1" stopColor="#0369a1" />
            </linearGradient>
            <linearGradient id="glassWall" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#cbd5e1" stopOpacity="0.8" />
              <stop offset="1" stopColor="#94a3b8" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="pipeMetal" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#64748b" />
              <stop offset="0.5" stopColor="#94a3b8" />
              <stop offset="1" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* ── INLET PIPE A (Left Top) ── */}
          <path d="M50 20 H100 V40 H80 V32 H50 Z" fill="url(#pipeMetal)" stroke="#334155" strokeWidth="1.5" />
          <text x="50" y="14" fill="var(--teal)" fontSize="10" fontWeight="800">Inlet Pipe A (+)</text>

          {/* Flow Stream from Pipe A */}
          {triggered && (
            <motion.path
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              d="M86 40 V150"
              stroke="#38bdf8"
              strokeWidth="6"
              strokeDasharray="8 4"
              strokeLinecap="round"
            />
          )}

          {/* ── INLET PIPE B (Right Top) ── */}
          <path d="M330 20 H280 V40 H300 V32 H330 Z" fill="url(#pipeMetal)" stroke="#334155" strokeWidth="1.5" />
          <text x="270" y="14" fill="var(--violet)" fontSize="10" fontWeight="800">Inlet Pipe B (+)</text>

          {/* Flow Stream from Pipe B */}
          {triggered && (
            <motion.path
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: 0.2 }}
              d="M294 40 V150"
              stroke="#60a5fa"
              strokeWidth="6"
              strokeDasharray="8 4"
              strokeLinecap="round"
            />
          )}

          {/* ── TRANSPARENT CISTERN RESERVOIR TANK ── */}
          {/* Tank Outer Glass Body */}
          <rect x="110" y="45" width="160" height="150" rx="8" fill="rgba(241,245,249,0.4)" stroke="#64748b" strokeWidth="3" />

          {/* Capacity Tick Marks on Left Wall */}
          <line x1="110" y1="65" x2="120" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="124" y="68" fill="#64748b" fontSize="8" fontWeight="700">100%</text>

          <line x1="110" y1="102" x2="118" y2="102" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="124" y="105" fill="#64748b" fontSize="8" fontWeight="700">75%</text>

          <line x1="110" y1="140" x2="118" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="124" y="143" fill="#64748b" fontSize="8" fontWeight="700">50%</text>

          <line x1="110" y1="175" x2="116" y2="175" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="122" y="178" fill="#64748b" fontSize="8" fontWeight="700">25%</text>

          {/* ── DYNAMIC WATER VOLUME INSIDE TANK ── */}
          {/* Animated Water Body Height */}
          <motion.rect
            x="113"
            y={192 - (fillPct * 1.42)}
            width="154"
            height={fillPct * 1.42}
            rx="4"
            fill="url(#waterFluidGrad)"
            initial={{ height: 0, y: 192 }}
            animate={{ height: fillPct * 1.42, y: 192 - (fillPct * 1.42) }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Water Surface Wave / Ripple Line */}
          <motion.path
            d={`M113 ${192 - (fillPct * 1.42)} Q 150 ${190 - (fillPct * 1.42)}, 190 ${192 - (fillPct * 1.42)} T 267 ${192 - (fillPct * 1.42)}`}
            fill="none"
            stroke="#bae6fd"
            strokeWidth="2.5"
            animate={{ x: [-3, 3, -3] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />

          {/* Water Splash Bubbles */}
          <motion.circle cx="150" cy={192 - (fillPct * 0.7)} r="2" fill="#e0f2fe" opacity="0.6" animate={{ y: [-4, 4] }} transition={{ repeat: Infinity, duration: 1.2 }} />
          <motion.circle cx="210" cy={192 - (fillPct * 0.5)} r="3" fill="#e0f2fe" opacity="0.6" animate={{ y: [-6, 2] }} transition={{ repeat: Infinity, duration: 1.5 }} />

          {/* ── OUTLET LEAK / DRAIN (Bottom Right) ── */}
          {hasLeak && (
            <>
              <path d="M270 170 H295 V182 H270 Z" fill="url(#pipeMetal)" stroke="#334155" strokeWidth="1.5" />
              <text x="300" y="174" fill="var(--coral)" fontSize="10" fontWeight="800">Leak / Outlet (−)</text>
              {triggered && (
                <motion.path
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
                  d="M295 182 Q 310 195 315 215"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              )}
            </>
          )}

          {/* Tank Stand Base */}
          <rect x="95" y="195" width="190" height="8" rx="2" fill="#475569" />
          <rect x="120" y="203" width="12" height="14" fill="#334155" />
          <rect x="248" y="203" width="12" height="14" fill="#334155" />
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
            {data.info || (data.formula ? `${data.formula}` : 'Time to fill = Total Tank Capacity ÷ Net Flow Rate')}
          </span>
        </div>

        {data.total_distance && (
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--teal)',
            background: 'var(--surface)',
            border: '1px solid var(--teal)',
            padding: '3px 10px',
            borderRadius: '8px',
          }}>
            {data.total_distance}
          </div>
        )}
      </div>
    </div>
  );
}
