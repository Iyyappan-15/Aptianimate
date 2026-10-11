// src/components/engines/BoatPhysicsEngine.jsx
// High-fidelity SVG & Physics vector animation engine for Boats and Streams.
// Visualizes downstream (with current) vs upstream (against current) dynamics with river currents.

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
  const boatLabel = boatEntity?.label || (isUpstream ? 'Boat (Upstream)' : 'Boat (Downstream)');

  // Coordinates
  const startX = boatEntity?.startX ?? (isUpstream ? 82 : 8);
  const endX = triggered ? (boatEntity?.endX ?? (isUpstream ? 18 : 80)) : startX;
  const duration = boatEntity?.duration ?? 3.0;

  // Stream flow direction (left to right by default)
  const streamDirection = isUpstream ? 'Opposing Boat' : 'Aiding Boat';

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '4px 0 16px',
    }}>
      {/* ── 1. HUD: NET EFFECTIVE SPEED ── */}
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
            color: isUpstream ? 'var(--coral)' : 'var(--teal)',
            background: isUpstream ? 'rgba(220, 38, 38, 0.1)' : 'rgba(13, 148, 136, 0.1)',
            border: `1px solid ${isUpstream ? 'var(--coral)' : 'var(--teal)'}`,
            padding: '3px 8px',
            borderRadius: '20px',
          }}>
            {isUpstream ? '🌊 Upstream (Against Current)' : '🌊 Downstream (With Current)'}
          </span>

          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Stream Flow: <strong style={{ color: 'var(--violet)' }}>{streamDirection}</strong>
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: isUpstream ? 'var(--coral)' : 'var(--teal)',
          background: isUpstream ? 'rgba(220, 38, 38, 0.08)' : 'rgba(13, 148, 136, 0.08)',
          border: `1px solid ${isUpstream ? 'var(--coral)' : 'var(--teal)'}`,
          padding: '4px 10px',
          borderRadius: '20px',
        }}>
          <span>Net Speed:</span>
          <strong>{isUpstream ? 'u − v (Boat − Stream)' : 'u + v (Boat + Stream)'}</strong>
        </div>
      </div>

      {/* ── 2. RIVER SCENE CANVAS ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '220px',
        background: 'linear-gradient(180deg, #0284c7 0%, #0369a1 40%, #075985 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.2)',
      }}>
        {/* River Banks (Top & Bottom Grass/Sand edges) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '14px',
          background: 'linear-gradient(180deg, #15803d 0%, #166534 80%, #0284c7 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '14px',
          background: 'linear-gradient(0deg, #15803d 0%, #166534 80%, #075985 100%)',
          borderTop: '1px solid rgba(255,255,255,0.2)',
        }} />

        {/* Animated Water Current Streamlines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ x: isUpstream ? [-20, -180] : [-180, 20] }}
            transition={{
              repeat: Infinity,
              duration: 2.2 + (i % 3) * 0.4,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              top: `${28 + i * 28}px`,
              left: `${(i * 18) % 60}%`,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: 0.35,
              pointerEvents: 'none',
            }}
          >
            <span style={{ width: '45px', height: '2px', background: '#e0f2fe', borderRadius: '2px' }} />
            <span style={{ fontSize: '0.65rem', color: '#e0f2fe' }}>{isUpstream ? '◀' : '▶'}</span>
            <span style={{ width: '25px', height: '2px', background: '#bae6fd', borderRadius: '2px' }} />
          </motion.div>
        ))}

        {/* Stream Direction Indicator Ribbon */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.68rem',
          fontWeight: 800,
          color: '#e0f2fe',
          background: 'rgba(3, 105, 161, 0.7)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.25)',
          padding: '2px 12px',
          borderRadius: '20px',
        }}>
          <span>Water Current Flow:</span>
          <span>{isUpstream ? '◀◀ Leftward Current (v)' : 'Rightward Current (v) ▶▶'}</span>
        </div>

        {/* ── THE VECTOR MOTORBOAT ── */}
        <motion.div
          initial={false}
          animate={{ left: `${endX}%` }}
          transition={{
            duration,
            ease: 'easeInOut',
            delay: boatEntity?.delay ?? 0,
          }}
          style={{
            position: 'absolute',
            top: '85px',
            marginLeft: '-60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 15,
          }}
        >
          {/* Boat Speed Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#0f172a',
            background: '#ffffff',
            border: '1px solid #38bdf8',
            padding: '2px 8px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            marginBottom: '4px',
            whiteSpace: 'nowrap',
          }}>
            <span>🚤 {boatLabel}</span>
            <span style={{ color: isUpstream ? '#dc2626' : '#0284c7' }}>
              {isUpstream ? '◀' : '▶'}
            </span>
          </div>

          {/* Crisp Vector Motorboat SVG */}
          <svg
            width="120"
            height="44"
            viewBox="0 0 120 44"
            fill="none"
            style={{
              transform: isUpstream ? 'scaleX(-1)' : 'scaleX(1)',
              filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.3))',
            }}
          >
            <defs>
              <linearGradient id="boatHullGrad" x1="0" y1="0" x2="120" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f8fafc" />
                <stop offset="0.6" stopColor="#e2e8f0" />
                <stop offset="1" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="cabinGlass" x1="0" y1="0" x2="0" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Hull Lower Base */}
            <path
              d="M10 24 L25 38 H95 L112 24 H10 Z"
              fill="url(#boatHullGrad)"
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Red Keel/Racer Stripe */}
            <path d="M20 31 L26 35 H92 L104 31 H20 Z" fill="#ef4444" />

            {/* Cabin Top Deck */}
            <path
              d="M32 24 L42 12 H76 L86 24 H32 Z"
              fill="#ffffff"
              stroke="#0f172a"
              strokeWidth="2"
            />
            {/* Cabin Windshield Glass */}
            <path d="M44 22 L50 14 H72 L76 22 H44 Z" fill="url(#cabinGlass)" />

            {/* Outboard Motor Engine at Stern */}
            <rect x="5" y="20" width="8" height="16" rx="2" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
            <rect x="2" y="32" width="6" height="8" rx="1" fill="#1e293b" />

            {/* Propeller Water Wake / Bubbles */}
            <motion.path
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              d="M-4 34 Q -12 36 -18 42 M -6 32 Q -16 33 -24 38"
              stroke="#e0f2fe"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
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
          <span>💡</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {data.info || (isUpstream ? 'Speed in still water − Stream Speed = Net Upstream Speed' : 'Speed in still water + Stream Speed = Net Downstream Speed')}
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
            Distance: {data.total_distance}
          </div>
        )}
      </div>
    </div>
  );
}
