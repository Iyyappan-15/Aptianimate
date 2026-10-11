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
  
  // Extract headstart if mentioned (e.g., "start of 20m", "headstart of 10m", "beats by 15m")
  const headstartMatch = stepText.match(/(?:start|headstart|beats?.*by)\s*(?:of)?\s*(\d+)\s*m/i);
  const headstartText = headstartMatch ? `${headstartMatch[1]} m` : (data.distance || '20 m');

  const runnerA = entities[0] || { label: 'Runner A', startX: 6, endX: 86, duration: 2.8 };
  const runnerB = entities[1] || { label: 'Runner B (+Start)', startX: 25, endX: 74, duration: 2.8 };

  const startA = runnerA.startX ?? 6;
  const endA = triggered ? (runnerA.endX ?? 86) : startA;

  const startB = runnerB.startX ?? 25;
  const endB = triggered ? (runnerB.endX ?? 74) : startB;

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '4px 0 16px',
    }}>
      {/* ── 1. HUD: RACE DISTANCE & HEADSTART ── */}
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
            🏁 Track Race & Headstart
          </span>

          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Headstart Advantage: <strong style={{ color: 'var(--coral)' }}>{headstartText}</strong>
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
          <strong>{data.total_distance || '100 m Sprint Course'}</strong>
        </div>
      </div>

      {/* ── 2. ATHLETIC STADIUM TRACK CANVAS ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '230px',
        background: 'linear-gradient(180deg, #991b1b 0%, #b91c1c 50%, #991b1b 100%)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: 'inset 0 2px 14px rgba(0,0,0,0.3)',
      }}>
        {/* Track Lanes Dividing Lines */}
        <div style={{
          position: 'absolute', top: '115px', left: 0, right: 0, height: '3px',
          borderBottom: '2px dashed rgba(255,255,255,0.7)',
        }} />

        {/* Start Line Marking */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: '8%', width: '4px',
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 0 8px rgba(255,255,255,0.5)',
        }}>
          <span style={{
            position: 'absolute', top: '8px', left: '-28px',
            fontSize: '0.62rem', fontWeight: 900, color: '#fecaca', letterSpacing: '0.5px',
          }}>
            START
          </span>
        </div>

        {/* Finish Line (Checkered Pattern) */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, right: '8%', width: '12px',
          background: 'repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 8px, #0f172a 8px, #0f172a 16px)',
          boxShadow: '0 0 10px rgba(255,255,255,0.6)',
        }}>
          <span style={{
            position: 'absolute', top: '8px', right: '-44px',
            fontSize: '0.62rem', fontWeight: 900, color: '#fef08a', letterSpacing: '0.5px',
          }}>
            FINISH
          </span>
        </div>

        {/* Headstart Dimension Bracket on Lane 2 */}
        <div style={{
          position: 'absolute',
          top: '125px',
          left: '8%',
          width: '18%',
          height: '16px',
          borderBottom: '2px dashed #fef08a',
          borderLeft: '2px solid #fef08a',
          borderRight: '2px solid #fef08a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            color: '#fef08a',
            background: 'rgba(0,0,0,0.6)',
            padding: '1px 6px',
            borderRadius: '4px',
            marginBottom: '16px',
            whiteSpace: 'nowrap',
          }}>
            |← {headstartText} Start →|
          </span>
        </div>

        {/* ── LANE 1: RUNNER A (TOP LANE) ── */}
        <div style={{ position: 'absolute', top: '24px', left: 0, right: 0, height: '80px' }}>
          <motion.div
            initial={false}
            animate={{ left: `${endA}%` }}
            transition={{
              duration: runnerA.duration ?? 2.8,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: '4px',
              marginLeft: '-22px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 15,
            }}
          >
            {/* Runner A Badge */}
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              color: '#0f172a',
              background: '#ffffff',
              border: '1px solid #38bdf8',
              padding: '2px 8px',
              borderRadius: '10px',
              marginBottom: '2px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}>
              🏃 {runnerA.label || 'Runner A (Scratch)'}
            </div>

            {/* SVG Runner A (Blue Jersey) */}
            <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
              <circle cx="20" cy="7" r="4.5" fill="#38bdf8" />
              <path d="M19 12 L15 23 L18 25 L23 15 Z" fill="#0284c7" />
              <path d="M19 14 L26 18 L24 22" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M17 15 L10 17 L8 13" stroke="#bae6fd" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M17 24 L24 29 L27 38" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              <path d="M15 24 L11 31 L4 33" stroke="#bae6fd" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* ── LANE 2: RUNNER B (BOTTOM LANE) ── */}
        <div style={{ position: 'absolute', top: '135px', left: 0, right: 0, height: '80px' }}>
          <motion.div
            initial={false}
            animate={{ left: `${endB}%` }}
            transition={{
              duration: runnerB.duration ?? 2.8,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: '4px',
              marginLeft: '-22px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 15,
            }}
          >
            {/* Runner B Badge */}
            <div style={{
              fontSize: '0.65rem',
              fontWeight: 800,
              color: '#0f172a',
              background: '#fef08a',
              border: '1px solid #ca8a04',
              padding: '2px 8px',
              borderRadius: '10px',
              marginBottom: '2px',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}>
              🏃 {runnerB.label || 'Runner B'}
            </div>

            {/* SVG Runner B (Amber/Gold Jersey) */}
            <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
              <circle cx="20" cy="7" r="4.5" fill="#facc15" />
              <path d="M19 12 L15 23 L18 25 L23 15 Z" fill="#ca8a04" />
              <path d="M19 14 L26 18 L24 22" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M17 15 L10 17 L8 13" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M17 24 L24 29 L27 38" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
              <path d="M15 24 L11 31 L4 33" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
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
          <span>⏱️</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
            {data.info || 'Time taken by Winner = Distance ÷ Speed of Winner'}
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
        }}>
          Effective Distance for B: Course − Headstart
        </div>
      </div>
    </div>
  );
}
