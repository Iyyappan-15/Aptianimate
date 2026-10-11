// src/components/engines/TrainPhysicsEngine.jsx
// High-fidelity SVG & Physics vector animation engine for Problems on Trains & Relative Speed.
// Replaces static emojis with proportional vector models, dual-track staging, and live physics HUD.

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TrainPhysicsEngine({ step, isActive }) {
  const data = step?.render_data || {};
  const entities = data.entities || [];
  const obstacle = data.obstacle || null;
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
  const trainEntity = entities.find(e => (e.type || '').toLowerCase() === 'train') || entities[0];
  const secondEntity = entities.find(e => e !== trainEntity);

  const isRunner = secondEntity && ['person', 'runner', 'worker', 'man'].includes((secondEntity.type || '').toLowerCase());
  const isSecondTrain = secondEntity && (secondEntity.type || '').toLowerCase() === 'train';

  // Parse speeds and labels
  const trainLabel = trainEntity?.label || '125m Train';
  const secondLabel = secondEntity?.label || (isRunner ? 'Man @ 5 km/h' : '');

  // Extract lengths if mentioned in labels (e.g. "125m", "130m")
  const trainLengthMatch = trainLabel.match(/(\d+)\s*m/i) || (data.distance || '').match(/(\d+)\s*m/i);
  const trainLengthText = trainLengthMatch ? `${trainLengthMatch[1]} m` : (data.distance || '125 m');

  // Relative speed math detection
  const isSameDirection = trainEntity && secondEntity &&
    ((trainEntity.endX ?? 80) > (trainEntity.startX ?? 10)) ===
    ((secondEntity.endX ?? 80) > (secondEntity.startX ?? 10));

  const isOpposing = trainEntity && secondEntity && !isSameDirection;

  // Animation coordinates
  const trainStart = trainEntity?.startX ?? 5;
  const trainEnd = triggered ? (trainEntity?.endX ?? 78) : trainStart;
  const trainDuration = trainEntity?.duration ?? 2.8;

  const secondStart = secondEntity?.startX ?? (obstacle ? obstacle.x : 68);
  const secondEnd = triggered ? (secondEntity?.endX ?? (secondStart + (isSameDirection ? 10 : -10))) : secondStart;
  const secondDuration = secondEntity?.duration ?? 2.8;

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '4px 0 16px',
    }}>
      {/* ── 1. REAL-TIME RELATIVE SPEED HUD ── */}
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
        {/* Scenario Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: 'var(--violet)',
            background: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid var(--violet)',
            padding: '3px 8px',
            borderRadius: '20px',
          }}>
            {isRunner ? (isSameDirection ? 'Train & Runner (Same Direction)' : 'Train & Runner (Opposite)') :
             isSecondTrain ? (isOpposing ? 'Two Trains Approaching' : 'Two Trains Overtaking') :
             obstacle ? `Train Crossing ${obstacle.type || 'Obstacle'}` : 'Train Speed & Distance'}
          </span>

          {trainLengthText && (
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}>
              Length: <strong style={{ color: 'var(--violet)' }}>{trainLengthText}</strong>
            </span>
          )}
        </div>

        {/* Relative Velocity Formula Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'var(--teal)',
          background: 'rgba(13, 148, 136, 0.1)',
          border: '1px solid var(--teal)',
          padding: '4px 10px',
          borderRadius: '20px',
        }}>
          <span>Relative Speed:</span>
          <span>
            {isRunner ? (isSameDirection ? 'V_train − V_man' : 'V_train + V_man') :
             isSecondTrain ? (isOpposing ? 'V₁ + V₂' : '|V₁ − V₂|') : 'V_train'}
          </span>
        </div>
      </div>

      {/* ── 2. MULTI-LANE STAGE (STAGE CANVAS) ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '240px',
        background: 'linear-gradient(180deg, var(--surface2) 0%, var(--card) 100%)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)',
      }}>
        {/* Overhead Distance Guide / Dimension Ruler */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '4%',
          right: '4%',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px dashed var(--border)',
          opacity: 0.7,
        }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 600 }}>0 m (Start)</span>
          <span style={{ fontSize: '0.68rem', color: 'var(--violet)', fontWeight: 800 }}>
            {data.total_distance || `Distance Covered = ${trainLengthText}`}
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--muted)', fontWeight: 600 }}>Track End</span>
        </div>

        {/* ── LANE 1: MAIN RAILWAY TRACK (TRAIN LANE) ── */}
        <div style={{
          position: 'absolute',
          top: '44px',
          left: 0,
          right: 0,
          height: '75px',
        }}>
          {/* Steel rails (Dual parallel lines) */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #94a3b8, #cbd5e1, #94a3b8)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '22px',
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #94a3b8, #cbd5e1, #94a3b8)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
          }} />

          {/* Railway Ties / Wooden Sleepers */}
          {Array.from({ length: 22 }).map((_, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                bottom: '9px',
                left: `${idx * 4.6 + 1}%`,
                width: '12px',
                height: '19px',
                background: 'var(--surface3)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                opacity: 0.85,
              }}
            />
          ))}

          {/* ── THE TRAIN SVG ACTOR ── */}
          <motion.div
            initial={false}
            animate={{ left: `${trainEnd}%` }}
            transition={{
              duration: trainDuration,
              ease: 'easeInOut',
              delay: trainEntity?.delay ?? 0,
            }}
            style={{
              position: 'absolute',
              bottom: '16px',
              marginLeft: '-110px', // Center the train body on its coordinate
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 15,
            }}
          >
            {/* Length Callout Bracket above train */}
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2px',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.68rem',
                fontWeight: 800,
                color: 'var(--violet)',
                background: 'var(--surface)',
                border: '1px solid var(--violet)',
                padding: '2px 8px',
                borderRadius: '12px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                whiteSpace: 'nowrap',
              }}>
                <span>|← {trainLengthText} →|</span>
                <span style={{ color: 'var(--muted)', fontWeight: 600 }}>• {trainLabel}</span>
              </div>
            </motion.div>

            {/* Proportional Vector Train SVG */}
            <svg width="220" height="48" viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="trainEngineGrad" x1="0" y1="0" x2="220" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563eb" />
                  <stop offset="1" stopColor="#1e40af" />
                </linearGradient>
                <linearGradient id="trainCarGrad" x1="0" y1="0" x2="100" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="10" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#93c5fd" />
                  <stop offset="1" stopColor="#60a5fa" />
                </linearGradient>
              </defs>

              {/* Carriage 2 (Rear) */}
              <rect x="2" y="10" width="58" height="26" rx="4" fill="url(#trainCarGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
              {/* Windows Carriage 2 */}
              <rect x="8" y="14" width="10" height="9" rx="2" fill="url(#windowGlow)" />
              <rect x="22" y="14" width="10" height="9" rx="2" fill="url(#windowGlow)" />
              <rect x="36" y="14" width="10" height="9" rx="2" fill="url(#windowGlow)" />
              <rect x="50" y="14" width="6" height="9" rx="1.5" fill="url(#windowGlow)" />
              {/* Wheels Carriage 2 */}
              <circle cx="12" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="26" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="44" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Coupler link */}
              <rect x="60" y="24" width="6" height="4" rx="1" fill="#475569" />

              {/* Carriage 1 (Middle) */}
              <rect x="66" y="10" width="68" height="26" rx="4" fill="url(#trainCarGrad)" stroke="#1e3a8a" strokeWidth="1.5" />
              {/* Windows Carriage 1 */}
              <rect x="72" y="14" width="10" height="9" rx="2" fill="url(#windowGlow)" />
              <rect x="86" y="14" width="10" height="9" rx="2" fill="url(#windowGlow)" />
              <rect x="100" y="14" width="10" height="9" rx="2" fill="url(#windowGlow)" />
              <rect x="114" y="14" width="10" height="9" rx="2" fill="url(#windowGlow)" />
              {/* Wheels Carriage 1 */}
              <circle cx="76" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="90" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="118" cy="38" r="5" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Coupler link */}
              <rect x="134" y="24" width="6" height="4" rx="1" fill="#475569" />

              {/* Engine Locomotive (Front with Aerodynamic Nose) */}
              <path
                d="M140 10 H185 C198 10 214 20 218 28 L218 36 H140 V10 Z"
                fill="url(#trainEngineGrad)"
                stroke="#172554"
                strokeWidth="1.5"
              />
              {/* Driver Cab Windows */}
              <path d="M146 14 H170 V24 H146 Z" fill="url(#windowGlow)" rx="2" />
              <path d="M174 14 H192 L198 24 H174 Z" fill="url(#windowGlow)" />
              {/* Headlight beam & lamp */}
              <circle cx="215" cy="30" r="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
              <polygon points="218,30 220,27 220,33" fill="#fef08a" opacity="0.8" />
              {/* Aerodynamic stripe */}
              <path d="M140 28 H214" stroke="#f8fafc" strokeWidth="1.5" opacity="0.9" />
              {/* Locomotive Wheels */}
              <circle cx="152" cy="38" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="168" cy="38" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="198" cy="38" r="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
            </svg>
          </motion.div>
        </div>

        {/* ── LANE 2: PEDESTRIAN PATHWAY & REFERENCE LANE (BOTTOM) ── */}
        <div style={{
          position: 'absolute',
          top: '142px',
          left: 0,
          right: 0,
          height: '75px',
          background: 'rgba(0,0,0,0.02)',
          borderTop: '1px dashed var(--border)',
        }}>
          {/* Pathway Line with Dash Marks */}
          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: '4%',
            right: '4%',
            height: '2px',
            background: 'var(--border)',
          }} />

          {/* Reference Passing Laser Marker (Where train meets runner) */}
          <div style={{
            position: 'absolute',
            top: '-98px',
            bottom: 0,
            left: `${secondStart}%`,
            width: '2px',
            borderLeft: '2px dashed #0d9488',
            opacity: 0.6,
            pointerEvents: 'none',
          }}>
            <span style={{
              position: 'absolute',
              top: '10px',
              left: '4px',
              fontSize: '0.62rem',
              fontWeight: 800,
              color: 'var(--teal)',
              background: 'var(--surface)',
              border: '1px solid var(--teal)',
              padding: '1px 5px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
            }}>
              Reference Point
            </span>
          </div>

          {/* ── THE RUNNER / OBSTACLE ACTOR ── */}
          {isRunner && (
            <motion.div
              initial={false}
              animate={{ left: `${secondEnd}%` }}
              transition={{
                duration: secondDuration,
                ease: 'easeInOut',
                delay: secondEntity?.delay ?? 0,
              }}
              style={{
                position: 'absolute',
                bottom: '16px',
                marginLeft: '-20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 20,
              }}
            >
              {/* Runner Speed Badge */}
              <div style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: 'var(--teal)',
                background: 'var(--surface)',
                border: '1px solid var(--teal)',
                padding: '2px 8px',
                borderRadius: '12px',
                marginBottom: '2px',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}>
                <span>🏃 {secondLabel || 'Runner: 5 km/h'}</span>
                <span>──►</span>
              </div>

              {/* Dynamic SVG Athletic Runner */}
              <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Head */}
                <circle cx="20" cy="7" r="4.5" fill="#0d9488" />
                {/* Torso */}
                <path d="M19 12 L15 23 L18 25 L23 15 Z" fill="#0f766e" />
                {/* Front Arm & Fist */}
                <path d="M19 14 L26 18 L24 22" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Back Arm */}
                <path d="M17 15 L10 17 L8 13" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Front Stride Leg */}
                <path d="M17 24 L24 29 L27 38" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Back Trailing Leg */}
                <path d="M15 24 L11 31 L4 33" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Speed Wind Streaks */}
                <line x1="2" y1="16" x2="7" y2="16" stroke="#99f6e4" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="0" y1="22" x2="6" y2="22" stroke="#99f6e4" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              </svg>
            </motion.div>
          )}

          {/* STATION POLE / TELEGRAPH OBSTACLE */}
          {obstacle && obstacle.type === 'pole' && (
            <div style={{
              position: 'absolute',
              bottom: '18px',
              left: `${obstacle.x || 75}%`,
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                color: 'var(--amber)',
                background: 'var(--surface)',
                border: '1px solid var(--amber)',
                padding: '2px 6px',
                borderRadius: '6px',
                marginBottom: '2px',
              }}>
                {obstacle.label || 'Pole'}
              </span>
              <svg width="24" height="60" viewBox="0 0 24 60" fill="none">
                <rect x="10" y="6" width="4" height="54" fill="#78350f" rx="1" />
                <rect x="4" y="10" width="16" height="3" fill="#92400e" rx="1" />
                <circle cx="5" cy="11" r="2" fill="#fef08a" />
                <circle cx="19" cy="11" r="2" fill="#fef08a" />
              </svg>
            </div>
          )}

          {/* PLATFORM / BRIDGE OBSTACLE */}
          {obstacle && (obstacle.type === 'platform' || obstacle.type === 'bridge') && (
            <div style={{
              position: 'absolute',
              bottom: '18px',
              left: `${obstacle.x || 70}%`,
              width: `${obstacle.widthPct || 35}%`,
              minWidth: '100px',
              height: '32px',
              background: 'linear-gradient(180deg, #475569 0%, #334155 100%)',
              borderRadius: '4px 4px 0 0',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                color: '#f8fafc',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
              }}>
                {obstacle.label || 'Platform'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── 3. METRICS FOOTER & TIME SCRUBBER ── */}
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
          <span style={{ fontSize: '1rem' }}>⏱️</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {data.info || (data.formula ? `${data.formula}` : 'Relative Distance = Train Length')}
          </span>
        </div>

        {data.total_distance && (
          <div style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            color: 'var(--violet)',
            background: 'var(--surface)',
            border: '1px solid var(--violet)',
            padding: '3px 10px',
            borderRadius: '8px',
          }}>
            Total Distance: {data.total_distance}
          </div>
        )}
      </div>
    </div>
  );
}
