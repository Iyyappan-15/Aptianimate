import { memo, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ── Timing constants (in seconds) ───────────────────────────────────────────
const T = {
  PATH_START: 0.3,
  PATH_DUR: 1.2,       // Draw the "A" and connecting line
  BULB_START: 1.5,
  BULB_DUR: 0.8,       // Draw bulb outline
  GEAR_START: 2.0,
  GEAR_DUR: 0.9,       // Spin gear in
  BASE_START: 2.5,
  BASE_DUR: 0.7,       // Draw base and collar
  GLOW_START: 3.2,     // Energy pulse & main glow
  TEXT_START: 3.6,     // Logo text appears
  TOTAL: 4.8           // Total duration before exit
};

// ── Math: Gear teeth path ─────────────────────────────────────────────────────
function computeGear(cx, cy, R, r, n) {
  const step = (2 * Math.PI) / n;
  const half = step * 0.22;
  let d = '';
  for (let i = 0; i < n; i++) {
    const c = i * step - Math.PI / 2;
    const pts = [
      [r, c - step / 2],
      [R, c - half],
      [R, c + half],
      [r, c + step / 2],
    ];
    pts.forEach(([rad, a], j) => {
      const cmd = i === 0 && j === 0 ? 'M' : 'L';
      d += `${cmd} ${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)} `;
    });
  }
  return d + 'Z';
}

// ── Math: Spiral path ────────────────────────────────────────────────────────
function computeSpiral(cx, cy, r0, r1, turns) {
  const N = 80;
  let d = '';
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const a = -Math.PI / 2 + t * turns * 2 * Math.PI;
    const r = r0 + (r1 - r0) * t;
    const x = (cx + r * Math.cos(a)).toFixed(2);
    const y = (cy + r * Math.sin(a)).toFixed(2);
    d += i === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
  }
  return d;
}

// ── Pre-compute heavy paths outside render ───────────────────────────────────
const GX = 617, GY = 178;
const GEAR_PATH   = computeGear(GX, GY, 53, 38, 9);
const SPIRAL_PATH = computeSpiral(GX, GY, 3, 28, 1.8);

// ── Animation helpers ────────────────────────────────────────────────────────
const draw = (delay, duration, ease = 'easeOut') => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration, delay, ease },
});

// Particles for the bulb glow
const PARTICLES = [
  { x: -45, y: -60, r: 3.5, delay: T.GLOW_START + 0.1, dur: 1.2, color: 'rgba(255,213,74,0.75)' },
  { x:  50, y: -80, r: 2.5, delay: T.GLOW_START + 0.2, dur: 1.4, color: 'rgba(255,213,74,0.55)' },
  { x: -70, y: -30, r: 2,   delay: T.GLOW_START + 0.3, dur: 1.1, color: 'rgba(255,213,74,0.50)' },
  { x:  80, y: -40, r: 3,   delay: T.GLOW_START + 0.0, dur: 1.3, color: 'rgba(46,167,255,0.50)' },
  { x: -20, y:-100, r: 2,   delay: T.GLOW_START + 0.4, dur: 1.0, color: 'rgba(255,213,74,0.45)' },
  { x:  30, y:-110, r: 2.5, delay: T.GLOW_START + 0.25,dur: 1.5, color: 'rgba(46,167,255,0.40)' },
];

export default memo(function SplashScreen({ onComplete }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(onComplete, T.TOTAL * 1000);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: '#140B25', // Premium dark background
        fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
        overflow: 'hidden'
      }}
    >
      {/* Soft radial glow behind everything */}
      <motion.div
        aria-hidden="true"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          width: '70vw',
          height: '70vw',
          maxWidth: '600px',
          maxHeight: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(46,167,255,0.08) 0%, rgba(155,82,232,0.05) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <svg
        viewBox="0 0 860 435"
        style={{ 
          width: '100%', 
          maxWidth: 650, 
          overflow: 'visible',
          filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.5))',
          zIndex: 1
        }}
        aria-hidden="true"
      >
        <defs>
          {/* ── Filters for clean neon glows ── */}
          <filter id="fBlue" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          
          <filter id="fGold" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <filter id="fWhite" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ════════════════════════════════════════
            SCENE 7: BULB GLOW AURA (Idle Breathing)
        ════════════════════════════════════════ */}
        <motion.ellipse
          cx={GX} cy={180} rx="110" ry="120"
          fill="rgba(255,213,74,0)"
          filter="url(#fGold)"
          initial={{ opacity: 0 }}
          animate={reducedMotion 
            ? { opacity: 0.15, fill: 'rgba(255,213,74,0.15)' } 
            : {
              opacity: [0, 0.25, 0.15, 0.25],
              fill: ['rgba(255,213,74,0)', 'rgba(255,213,74,0.25)', 'rgba(255,213,74,0.15)', 'rgba(255,213,74,0.25)']
            }
          }
          transition={reducedMotion 
            ? { duration: 0.8, delay: T.GLOW_START }
            : { duration: 2.5, delay: T.GLOW_START, repeat: Infinity, ease: 'easeInOut' }
          }
        />

        {/* ════════════════════════════════════════
            SCENE 2: LEARNING PATH (The "A" and Link)
        ════════════════════════════════════════ */}
        
        {/* Left leg */}
        <motion.path
          d="M 212 348 C 196 292 188 215 226 142 C 254 86 287 62 320 62"
          stroke="#2EA7FF" strokeWidth="8" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#fBlue)"
          {...(reducedMotion 
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: T.PATH_START } }
            : draw(T.PATH_START, T.PATH_DUR * 0.4)
          )}
        />
        {/* Right leg */}
        <motion.path
          d="M 320 62 C 353 62 386 86 414 142 C 452 215 444 292 428 348"
          stroke="#2EA7FF" strokeWidth="8" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#fBlue)"
          {...(reducedMotion 
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: T.PATH_START } }
            : draw(T.PATH_START + T.PATH_DUR * 0.3, T.PATH_DUR * 0.4)
          )}
        />
        {/* Crossbar with loop */}
        <motion.path
          d="M 410 232 C 376 216 336 208 298 220 C 263 231 236 253 219 276 C 207 293 211 318 229 329 C 251 343 275 332 279 309 C 283 286 265 268 246 273 C 237 276 237 288 248 291"
          stroke="#2EA7FF" strokeWidth="7" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#fBlue)"
          {...(reducedMotion 
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: T.PATH_START } }
            : draw(T.PATH_START + T.PATH_DUR * 0.5, T.PATH_DUR * 0.5)
          )}
        />
        {/* Connecting line to bulb */}
        <motion.path
          d="M 412 232 C 455 260 500 282 548 296"
          stroke="#2EA7FF" strokeWidth="7" fill="none"
          strokeLinecap="round"
          filter="url(#fBlue)"
          {...(reducedMotion 
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: T.PATH_START } }
            : draw(T.PATH_START + T.PATH_DUR * 0.7, T.PATH_DUR * 0.4)
          )}
        />

        {/* Traveling Glow Dot on Connecting Line */}
        {!reducedMotion && (
          <motion.circle
            r={6} fill="#ffffff" filter="url(#fBlue)"
            initial={{ opacity: 0, x: 412, y: 232 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [412, 455, 500, 548],
              y: [232, 260, 282, 296]
            }}
            transition={{ duration: T.PATH_DUR * 0.4, delay: T.PATH_START + T.PATH_DUR * 0.7, ease: "easeInOut" }}
          />
        )}

        {/* ════════════════════════════════════════
            SCENE 4: BULB OUTLINE
        ════════════════════════════════════════ */}
        <motion.path
          d="M 576 298 C 549 283 518 252 518 190 C 518 117 563 68 617 68 C 671 68 716 117 716 190 C 716 252 685 283 658 298 Z"
          stroke="#FFD54A" strokeWidth="7.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#fGold)"
          {...(reducedMotion 
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: T.BULB_START } }
            : draw(T.BULB_START, T.BULB_DUR, 'easeInOut')
          )}
        />

        {/* ════════════════════════════════════════
            SCENE 6: BULB BASE & COLLAR
        ════════════════════════════════════════ */}
        {/* Collar sides */}
        <motion.path
          d="M 576 298 L 576 352  M 658 298 L 658 352"
          stroke="#ffffff" strokeWidth="7" fill="none"
          strokeLinecap="round"
          filter="url(#fWhite)"
          {...(reducedMotion 
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: T.BASE_START } }
            : draw(T.BASE_START, T.BASE_DUR * 0.5)
          )}
        />
        {/* Collar bands */}
        {[307, 320, 333, 346].map((y, i) => (
          <motion.line
            key={y}
            x1="578" y1={y} x2="656" y2={y}
            stroke="#ffffff" strokeWidth="6" strokeLinecap="round"
            filter="url(#fWhite)"
            initial={reducedMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: T.BASE_START + 0.2 + (i * 0.1), ease: 'easeOut' }}
            style={{ transformOrigin: `617px ${y}px` }}
          />
        ))}
        {/* Base bracket */}
        <motion.path
          d="M 576 352 Q 568 366 579 376 Q 617 386 655 376 Q 666 366 658 352"
          stroke="#ffffff" strokeWidth="7" fill="none"
          strokeLinecap="round"
          filter="url(#fWhite)"
          {...(reducedMotion 
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: T.BASE_START } }
            : draw(T.BASE_START + 0.4, 0.4)
          )}
        />

        {/* Energy Pulse traveling up into the bulb */}
        {!reducedMotion && (
           <motion.circle
             r={5} fill="#FFD54A" filter="url(#fGold)"
             initial={{ opacity: 0, x: 617, y: 376 }}
             animate={{
               opacity: [0, 1, 0],
               y: [376, 298, 178]
             }}
             transition={{ duration: 0.6, delay: T.GLOW_START - 0.2, ease: "easeIn" }}
           />
        )}

        {/* ════════════════════════════════════════
            SCENE 5: GEAR & SPIRAL
        ════════════════════════════════════════ */}
        <motion.g
          initial={reducedMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
          animate={reducedMotion ? { opacity: 1 } : { rotate: 0, opacity: 1 }}
          transition={{ duration: T.GEAR_DUR, delay: T.GEAR_START, ease: 'easeOut' }}
          style={{ transformOrigin: `${GX}px ${GY}px` }}
        >
          <motion.path
            d={GEAR_PATH}
            stroke="#FFD54A" strokeWidth="4" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            filter="url(#fGold)"
          />
          <motion.circle
            cx={GX} cy={GY} r="14"
            stroke="#FFD54A" strokeWidth="4" fill="none"
            filter="url(#fGold)"
          />
        </motion.g>

        <motion.path
          d={SPIRAL_PATH}
          stroke="#FFD54A" strokeWidth="3" fill="none"
          strokeLinecap="round"
          filter="url(#fGold)"
          {...(reducedMotion
             ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5, delay: T.GEAR_START + 0.3 } }
             : draw(T.GEAR_START + 0.3, 0.8)
          )}
        />

        {/* ════════════════════════════════════════
            SCENE 7: PARTICLES
        ════════════════════════════════════════ */}
        {!reducedMotion && PARTICLES.map((p, i) => (
          <motion.circle
            key={i} r={p.r} fill={p.color}
            initial={{ opacity: 0, x: GX, y: GY }}
            animate={{
              opacity: [0, 1, 0],
              x: [GX, GX + p.x],
              y: [GY, GY + p.y],
            }}
            transition={{ duration: p.dur, delay: p.delay, ease: 'easeOut' }}
          />
        ))}
      </svg>

      {/* ════════════════════════════════════════
          SCENE 8: TEXT
      ════════════════════════════════════════ */}
      <div style={{ textAlign: 'center', marginTop: '-10px', zIndex: 1 }}>
        <motion.h1
          style={{
            margin: '0 0 8px 0',
            fontSize: 'clamp(1.9rem, 5vw, 3.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}
        >
          <motion.span
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: T.TEXT_START, ease: 'easeOut' }}
            style={{ color: '#9B52E8', display: 'inline-block' }}
          >
            Aptitude
          </motion.span>
          <motion.span
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: T.TEXT_START + 0.15, ease: 'easeOut' }}
            style={{ color: '#2EA7FF', display: 'inline-block' }}
          >
            Animate
          </motion.span>
        </motion.h1>

        <motion.p
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(4px)' }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: T.TEXT_START + 0.35, ease: 'easeOut' }}
          style={{
            color: 'rgba(215, 205, 255, 0.70)',
            letterSpacing: '0.22em',
            fontSize: 'clamp(0.60rem, 1.6vw, 0.80rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          The Interactive Learning Engine
        </motion.p>
      </div>
    </motion.div>
  );
});
