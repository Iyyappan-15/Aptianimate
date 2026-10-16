// src/components/engines/BoatPhysicsEngine.jsx
// High-fidelity SVG & Physics vector animation engine for Boats and Streams.
// Visualizes downstream (with current) vs upstream (against current) dynamics with river currents.
// FIX: Boat actor is now fully SVG-native inside the river canvas so nothing escapes the boundary.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BoatPhysicsEngine({ step, isActive }) {
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

  // Extract scenario details
  const stepText = ((step?.explanation || '') + ' ' + (step?.title || '') + ' ' + JSON.stringify(data)).toLowerCase();
  const isUpstream = stepText.includes('upstream') || stepText.includes('against');
  const _isDownstream = !isUpstream && (stepText.includes('downstream') || stepText.includes('with stream') || stepText.includes('along'));

  const boatEntity = entities.find(e => (e.type || '').toLowerCase() === 'boat') || entities[0];
  const boatLabel  = boatEntity?.label || (isUpstream ? 'Boat (Upstream)' : 'Boat (Downstream)');

  // ── Animation: map % coordinates to SVG viewBox x (0‒600) ──
  // We reserve 60px margin on each side so the 120px boat body never clips.
  const TRACK_W  = 600; // viewBox width
  const BOAT_W   = 120; // SVG boat width
  const PAD      = BOAT_W / 2 + 10; // 70px clearance from both edges

  const rawStart = boatEntity?.startX ?? (isUpstream ? 82 : 8);
  const rawEnd   = boatEntity?.endX   ?? (isUpstream ? 18 : 80);

  // Convert % to pixel x (clamped so boat stays fully inside viewBox)
  const pctToPx  = (pct) => Math.min(Math.max(PAD, (pct / 100) * TRACK_W), TRACK_W - PAD);
  const startPx  = pctToPx(rawStart);
  const endPx    = triggered ? pctToPx(rawEnd) : startPx;
  const duration = boatEntity?.duration ?? 3.0;

  const streamDirection = isUpstream ? 'Opposing Boat' : 'Aiding Boat';

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
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', gap: '8px',
        padding: '10px 14px',
        background: 'var(--surface2)', border: '1px solid var(--border)',
        borderRadius: '12px', fontSize: '0.8rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: isUpstream ? 'var(--coral)' : 'var(--teal)',
            background: isUpstream ? 'rgba(220,38,38,0.1)' : 'rgba(13,148,136,0.1)',
            border: `1px solid ${isUpstream ? 'var(--coral)' : 'var(--teal)'}`,
            padding: '3px 8px', borderRadius: '20px',
          }}>
            {isUpstream ? '🌊 Upstream (Against Current)' : '🌊 Downstream (With Current)'}
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Stream Flow: <strong style={{ color: 'var(--violet)' }}>{streamDirection}</strong>
          </span>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '0.75rem', fontWeight: 700,
          color: isUpstream ? 'var(--coral)' : 'var(--teal)',
          background: isUpstream ? 'rgba(220,38,38,0.08)' : 'rgba(13,148,136,0.08)',
          border: `1px solid ${isUpstream ? 'var(--coral)' : 'var(--teal)'}`,
          padding: '4px 10px', borderRadius: '20px',
        }}>
          <span>Net Speed:</span>
          <strong>{isUpstream ? 'u − v (Boat − Stream)' : 'u + v (Boat + Stream)'}</strong>
        </div>
      </div>

      {/* ── 2. RIVER SCENE — fully SVG-native so nothing overflows ── */}
      <div style={{
        position: 'relative', width: '100%',
        borderRadius: '16px', overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.2)',
      }}>
        {/*
          Single SVG canvas, viewBox 600×220.
          Boat, badge, and all elements are SVG children.
          Nothing can escape the container.
        */}
        <svg
          width="100%"
          viewBox="0 0 600 220"
          fill="none"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#0284c7" />
              <stop offset="0.4" stopColor="#0369a1" />
              <stop offset="1" stopColor="#075985" />
            </linearGradient>
            <linearGradient id="boatHullGrad2" x1="0" y1="0" x2="120" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f8fafc" /><stop offset="0.6" stopColor="#e2e8f0" /><stop offset="1" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="cabinGlass2" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" /><stop offset="1" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          {/* River water background */}
          <rect width="600" height="220" fill="url(#riverGrad)" />

          {/* Top grass bank */}
          <rect x="0" y="0" width="600" height="14" fill="#15803d" />
          <rect x="0" y="13" width="600" height="2" fill="rgba(255,255,255,0.15)" />

          {/* Bottom grass bank */}
          <rect x="0" y="206" width="600" height="14" fill="#15803d" />
          <rect x="0" y="205" width="600" height="2" fill="rgba(255,255,255,0.15)" />

          {/* Water current streamlines (animated) */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.g
              key={i}
              animate={{ x: isUpstream ? [-20, -180] : [-180, 20] }}
              transition={{ repeat: Infinity, duration: 2.2 + (i % 3) * 0.4, ease: 'linear' }}
            >
              <rect
                x={`${(i * 18) % 60}%`}
                y={28 + i * 28}
                width="45" height="2" rx="1"
                fill="#e0f2fe" opacity="0.35"
              />
              <text
                x={`${(i * 18) % 60 + 8}%`}
                y={34 + i * 28}
                fontSize="9" fill="#e0f2fe" opacity="0.35"
              >
                {isUpstream ? '◀' : '▶'}
              </text>
            </motion.g>
          ))}

          {/* Stream direction ribbon */}
          <rect x="175" y="18" width="250" height="20" rx="10"
            fill="rgba(3,105,161,0.7)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <text x="300" y="32" textAnchor="middle" fontSize="10" fontWeight="800" fill="#e0f2fe">
            Water Current Flow: {isUpstream ? '◀◀ Leftward Current (v)' : 'Rightward Current (v) ▶▶'}
          </text>

          {/* ── THE BOAT ACTOR (SVG-native, x-animated so it never overflows) ── */}
          <motion.g
            initial={false}
            animate={{ x: endPx }}
            transition={{ duration, ease: 'easeInOut', delay: boatEntity?.delay ?? 0 }}
          >
            {/* Speed badge — drawn relative to boat center, constrained by SVG clip */}
            <rect x="-60" y="66" width="120" height="20" rx="10"
              fill="#ffffff" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="0" y="80" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f172a">
              🚤 {boatLabel.length > 20 ? boatLabel.slice(0, 20) + '…' : boatLabel}
              {isUpstream ? ' ◀' : ' ▶'}
            </text>

            {/* Hull */}
            <g transform={`translate(-60, 90) ${isUpstream ? 'scale(-1,1) translate(-120,0)' : ''}`}>
              <path d="M10 24 L25 38 H95 L112 24 H10 Z"
                fill="url(#boatHullGrad2)" stroke="#0f172a" strokeWidth="2" />
              <path d="M20 31 L26 35 H92 L104 31 H20 Z" fill="#ef4444" />
              <path d="M32 24 L42 12 H76 L86 24 H32 Z"
                fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
              <path d="M44 22 L50 14 H72 L76 22 H44 Z" fill="url(#cabinGlass2)" />
              <rect x="5" y="20" width="8" height="16" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
              <rect x="2" y="32" width="6" height="8" rx="1" fill="#1e293b" />
              {/* Propeller wake */}
              <motion.path
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                d="M-4 34 Q -12 36 -18 42 M -6 32 Q -16 33 -24 38"
                stroke="#e0f2fe" strokeWidth="2.5" strokeLinecap="round"
              />
            </g>
          </motion.g>
        </svg>
      </div>

      {/* ── 3. METRICS FOOTER ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', gap: '8px',
        padding: '10px 14px', background: 'var(--surface3)',
        borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.8rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💡</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {data.info || (isUpstream
              ? 'Speed in still water − Stream Speed = Net Upstream Speed'
              : 'Speed in still water + Stream Speed = Net Downstream Speed')}
          </span>
        </div>
        {data.total_distance && (
          <div style={{
            fontSize: '0.75rem', fontWeight: 800, color: 'var(--teal)',
            background: 'var(--surface)', border: '1px solid var(--teal)',
            padding: '3px 10px', borderRadius: '8px',
          }}>
            Distance: {data.total_distance}
          </div>
        )}
      </div>
    </div>
  );
}
