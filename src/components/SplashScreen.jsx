import { motion } from 'framer-motion';
import { useEffect } from 'react';

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
const draw = (delay, duration = 1.0, ease = 'easeInOut') => ({
  initial: { pathLength: 0, opacity: 1 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration, delay, ease },
});

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 5400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'radial-gradient(ellipse 90% 80% at 50% 38%, #1c0940 0%, #09021a 100%)',
        fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
      }}
    >
      <svg
        viewBox="0 0 860 435"
        style={{ width: '100%', maxWidth: 700, overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          {/* ── Gradients ── */}
          <linearGradient id="gA" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00DEFF" />
            <stop offset="48%"  stopColor="#3A62FF" />
            <stop offset="100%" stopColor="#7E28D8" />
          </linearGradient>

          <linearGradient id="gLink" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%"   stopColor="#7E28D8" />
            <stop offset="100%" stopColor="#FFCC44" />
          </linearGradient>

          <linearGradient id="gBulb" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%"   stopColor="#FFD84A" />
            <stop offset="52%"  stopColor="#FF8800" />
            <stop offset="100%" stopColor="#7E28D8" />
          </linearGradient>

          <linearGradient id="gGear" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%"   stopColor="#FFE566" />
            <stop offset="100%" stopColor="#FF9900" />
          </linearGradient>

          {/* ── Glow filter: A strokes ── */}
          <filter id="fA" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* ── Glow filter: bulb strokes ── */}
          <filter id="fB" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur stdDeviation="5.5" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          {/* ── Large ambient bloom for bulb ── */}
          <filter id="fBloom" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        {/* ════════════════════════════════════════
            GOLDEN GLOW BLOOM  (behind the bulb)
        ════════════════════════════════════════ */}
        <motion.ellipse
          cx={GX} cy={GY} rx="80" ry="76"
          fill="#FFAA00"
          filter="url(#fBloom)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.60, 0.38] }}
          transition={{ duration: 1.8, delay: 3.1, ease: 'easeInOut' }}
        />



        {/* ════════════════════════════════════════
            LETTER "A"
        ════════════════════════════════════════ */}

        {/* Left leg: bottom → apex */}
        <motion.path
          d="M 212 348 C 196 292 188 215 226 142 C 254 86 287 62 320 62"
          stroke="url(#gA)" strokeWidth="9" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#fA)"
          {...draw(0.25, 0.90)}
        />

        {/* Right leg: apex → bottom */}
        <motion.path
          d="M 320 62 C 353 62 386 86 414 142 C 452 215 444 292 428 348"
          stroke="url(#gA)" strokeWidth="9" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#fA)"
          {...draw(0.72, 0.90)}
        />

        {/* Crossbar with inward knot/loop */}
        <motion.path
          d="M 410 232
             C 376 216 336 208 298 220
             C 263 231 236 253 219 276
             C 207 293 211 318 229 329
             C 251 343 275 332 279 309
             C 283 286 265 268 246 273
             C 237 276 237 288 248 291"
          stroke="url(#gA)" strokeWidth="8" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#fA)"
          {...draw(1.00, 1.30)}
        />

        {/* ════════════════════════════════════════
            CONNECTING LINE (A → Bulb)
        ════════════════════════════════════════ */}
        <motion.path
          d="M 412 232 C 455 260 500 282 548 296"
          stroke="url(#gLink)" strokeWidth="8" fill="none"
          strokeLinecap="round"
          filter="url(#fB)"
          {...draw(1.70, 0.65)}
        />

        {/* ════════════════════════════════════════
            BULB — DOME OUTLINE
            Classic pear/Edison shape:
            round top, gentle inward taper at neck
        ════════════════════════════════════════ */}
        <motion.path
          d="M 576 298
             C 549 283 518 252 518 190
             C 518 117 563 68 617 68
             C 671 68 716 117 716 190
             C 716 252 685 283 658 298
             Z"
          stroke="url(#gBulb)" strokeWidth="7.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
          filter="url(#fB)"
          {...draw(1.88, 1.45)}
        />

        {/* ════════════════════════════════════════
            BULB — COLLAR / NECK AREA
            Two vertical side lines + horizontal bands
        ════════════════════════════════════════ */}

        {/* Left and right vertical sides of collar */}
        <motion.path
          d="M 576 298 L 576 352  M 658 298 L 658 352"
          stroke="url(#gBulb)" strokeWidth="7.5" fill="none"
          strokeLinecap="round"
          filter="url(#fB)"
          {...draw(2.55, 0.40)}
        />

        {/* 4 horizontal collar bands (evenly spaced) */}
        {[307, 320, 333, 346].map((y, i) => (
          <motion.line
            key={y}
            x1="578" y1={y} x2="656" y2={y}
            stroke="url(#gBulb)" strokeWidth="7" strokeLinecap="round"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.28, delay: 2.60 + i * 0.11, ease: 'easeOut' }}
            style={{ transformOrigin: `617px ${y}px` }}
          />
        ))}

        {/* ════════════════════════════════════════
            BULB — BASE CURVED BRACKET
            Two hooks that curve inward at the very bottom
        ════════════════════════════════════════ */}
        <motion.path
          d="M 576 352 Q 568 366 579 376 Q 617 386 655 376 Q 666 366 658 352"
          stroke="url(#gBulb)" strokeWidth="7" fill="none"
          strokeLinecap="round"
          filter="url(#fB)"
          {...draw(3.05, 0.45)}
        />

        {/* ════════════════════════════════════════
            GEAR  (rotates in while drawing)
        ════════════════════════════════════════ */}
        <motion.g
          initial={{ rotate: -60, opacity: 0 }}
          animate={{ rotate: 0,   opacity: 1 }}
          transition={{ duration: 1.35, delay: 2.30, ease: 'easeOut' }}
          style={{ transformOrigin: `${GX}px ${GY}px` }}
        >
          {/* Outer gear teeth */}
          <motion.path
            d={GEAR_PATH}
            stroke="url(#gGear)" strokeWidth="5" fill="none"
            strokeLinecap="round" strokeLinejoin="round"
            filter="url(#fB)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.35, delay: 2.30, ease: 'easeOut' }}
          />

          {/* Inner hub ring */}
          <motion.circle
            cx={GX} cy={GY} r="14"
            stroke="url(#gGear)" strokeWidth="4.5" fill="none"
            filter="url(#fB)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.40, delay: 2.90, ease: 'backOut' }}
            style={{ transformOrigin: `${GX}px ${GY}px` }}
          />
        </motion.g>

        {/* ════════════════════════════════════════
            SPIRAL  (inside gear, reveals after gear)
        ════════════════════════════════════════ */}
        <motion.path
          d={SPIRAL_PATH}
          stroke="#FFE060" strokeWidth="2.8" fill="none"
          strokeLinecap="round"
          filter="url(#fB)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.90, delay: 3.15, ease: 'easeOut' }}
        />


      </svg>

      {/* ════════════════════════════════════════
          TEXT  (below the SVG logo)
      ════════════════════════════════════════ */}
      <div style={{ textAlign: 'center', marginTop: '-18px' }}>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 3.55, ease: 'easeOut' }}
          style={{
            margin: '0 0 8px 0',
            fontSize: 'clamp(1.9rem, 5.5vw, 3.3rem)',
            fontWeight: 800,
            letterSpacing: '-0.015em',
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: '#9B52E8' }}>Aptitude</span>
          <span style={{ color: '#2BC8E0' }}>Animate</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 3.95 }}
          style={{
            color: 'rgba(215, 205, 255, 0.72)',
            letterSpacing: '0.22em',
            fontSize: 'clamp(0.60rem, 1.7vw, 0.80rem)',
            fontWeight: 600,
            textTransform: 'uppercase',
            margin: '0 0 10px 0',
          }}
        >
          The Interactive Learning Engine
        </motion.p>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 4.3 }}
          style={{
            color: 'rgba(155, 145, 205, 0.38)',
            fontSize: 'clamp(0.48rem, 1.2vw, 0.66rem)',
            margin: 0,
            letterSpacing: '0.1em',
          }}
        >
          © AptitudeAnimate | Visual Intelligence
        </motion.p>
      </div>
    </motion.div>
  );
}
