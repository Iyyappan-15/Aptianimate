import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. Grid Engine (100 Grid, Place Value, Liquid Fill)
// ==========================================
export function GridEngine({ step, isActive }) {
  const data = step.render_data || {};
  const rows = data.rows || 10;
  const cols = data.cols || 10;
  const fillCount = data.fill_count || 0;
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    setVisibleCount(0);
    let i = 0;
    const interval = setInterval(() => {
      i += Math.ceil(fillCount / 20) || 1;
      if (i >= fillCount) {
        setVisibleCount(fillCount);
        clearInterval(interval);
      } else {
        setVisibleCount(i);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [isActive, fillCount]);

  const totalCells = rows * cols;
  const cells = Array.from({ length: totalCells });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '16px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(' + cols + ', 1fr)',
        gap: '2px',
        width: '100%',
        maxWidth: cols > 10 ? '100%' : '300px',
        aspectRatio: cols + '/' + rows
      }}>
        {cells.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.005, duration: 0.2 }}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: i < visibleCount ? 'var(--violet)' : 'var(--surface2)',
              borderRadius: '2px',
              border: i < visibleCount ? 'none' : '1px solid var(--border)'
            }}
          />
        ))}
      </div>
      {data.label && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
          style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text)' }}
        >
          {data.label}
        </motion.div>
      )}
    </div>
  );
}

// ==========================================
// 2. Node Engine (Factor Tree, Family Tree, Flowchart)
// ==========================================
export function NodeEngine({ step, isActive }) {
  const data = step.render_data || {};
  const nodes = data.nodes || [];
  const [revealed, setRevealed] = useState([]);
  const [lines, setLines] = useState([]);
  const containerRef = useRef(null);
  const nodeRefs = useRef({});

  useEffect(() => {
    if (!isActive) return;
    setRevealed([]);
    let i = 0;
    const interval = setInterval(() => {
      setRevealed(prev => [...prev, i]);
      i++;
      if (i >= nodes.length) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
  }, [isActive, nodes.length]);

  useEffect(() => {
    if (!containerRef.current || revealed.length === 0) return;
    
    // Draw lines after a short delay to allow DOM/animations to settle
    const timeout = setTimeout(() => {
      const containerRect = containerRef.current.getBoundingClientRect();
      const newLines = [];
      
      nodes.forEach(node => {
        const nodeIndex = nodes.findIndex(n => n.id === node.id);
        const parentIndex = nodes.findIndex(n => n.id === node.parentId);
        
        if (node.parentId && revealed.includes(nodeIndex) && revealed.includes(parentIndex)) {
          const parentEl = nodeRefs.current[node.parentId];
          const childEl = nodeRefs.current[node.id];
          if (parentEl && childEl) {
            const pRect = parentEl.getBoundingClientRect();
            const cRect = childEl.getBoundingClientRect();
            newLines.push({
              key: `${node.parentId}-${node.id}`,
              x1: pRect.left + pRect.width / 2 - containerRect.left,
              y1: pRect.bottom - containerRect.top,
              x2: cRect.left + cRect.width / 2 - containerRect.left,
              y2: cRect.top - containerRect.top
            });
          }
        }
      });
      setLines(newLines);
    }, 100); // 100ms for framer-motion to finish popping in

    return () => clearTimeout(timeout);
  }, [revealed, nodes]);

  // Handle window resize to redraw lines
  useEffect(() => {
    const handleResize = () => setRevealed(r => [...r]); // force re-render lines
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const grouped = nodes.reduce((acc, node) => {
    (acc[node.level] = acc[node.level] || []).push(node);
    return acc;
  }, {});

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', padding: '20px' }}>
      
      {/* SVG Canvas for connecting lines */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
        <AnimatePresence>
          {lines.map((line) => (
            <motion.line
              key={line.key}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="var(--teal)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0px 2px 4px rgba(20, 184, 166, 0.4))' }}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Render the nodes level by level */}
      {Object.entries(grouped).map(([level, levelNodes]) => (
        <div key={level} style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center', zIndex: 1 }}>
          {levelNodes.map((node) => {
            const nodeIndex = nodes.findIndex(n => n.id === node.id);
            const isVisible = revealed.includes(nodeIndex);
            const isHighlight = node.highlight;
            
            return (
              <motion.div
                key={node.id}
                ref={el => nodeRefs.current[node.id] = el}
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5, y: isVisible ? 0 : -20 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  padding: '12px 28px',
                  backgroundColor: isHighlight ? 'rgba(245, 158, 11, 0.1)' : 'var(--surface2)',
                  border: isHighlight ? '2px solid var(--amber)' : '2px solid var(--violet)',
                  borderRadius: '16px',
                  fontWeight: '800',
                  fontSize: '1.2rem',
                  color: isHighlight ? 'var(--amber)' : 'var(--text-main)',
                  boxShadow: isHighlight ? '0 0 20px rgba(245, 158, 11, 0.3)' : '0 4px 12px rgba(0,0,0,0.1)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  minWidth: '100px'
                }}
              >
                {node.text}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 3. Axis Engine (Number Line, Timeline)
// ==========================================
export function AxisEngine({ step, isActive }) {
  const data = step.render_data || {};
  const points = data.points || [];
  const jumps = data.jumps || [];

  const allVals = points.map(p => p.val);
  const min = Math.min(0, ...allVals);
  const max = Math.max(10, ...allVals);
  const range = max - min || 1;

  function getPos(val) {
    return ((val - min) / range) * 100 + '%';
  }

  function getWidth(from, to) {
    return ((to - from) / range) * 100 + '%';
  }

  // Generate tick marks if range is reasonable (less than 50)
  const ticks = [];
  if (range <= 50) {
    for (let i = Math.floor(min); i <= Math.ceil(max); i++) {
      ticks.push(i);
    }
  }

  return (
    <div style={{ width: '100%', padding: '60px 24px', position: 'relative' }}>
      {/* The main glowing axis line */}
      <div style={{ 
        width: '100%', 
        height: '6px', 
        background: 'linear-gradient(90deg, var(--surface3), var(--violet), var(--surface3))', 
        borderRadius: '3px', 
        position: 'relative',
        boxShadow: '0 0 15px rgba(124, 58, 237, 0.2)'
      }}>

        {/* Tick marks */}
        {isActive && ticks.map(tick => (
          <div key={`tick-${tick}`} style={{
            position: 'absolute',
            left: getPos(tick),
            top: '0',
            width: '2px',
            height: '12px',
            backgroundColor: 'var(--border)',
            transform: 'translateX(-50%)',
            opacity: 0.5
          }} />
        ))}

        <AnimatePresence>
          {isActive && points.map((p, i) => {
            const isHighlight = p.highlight;
            const color = isHighlight ? 'var(--amber)' : 'var(--teal)';
            return (
              <motion.div
                key={`point-${i}`}
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: i * 0.2, type: 'spring', stiffness: 300, damping: 15 }}
                style={{
                  position: 'absolute',
                  left: getPos(p.val),
                  top: '-7px',
                  width: isHighlight ? '20px' : '16px',
                  height: isHighlight ? '20px' : '16px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  transform: 'translateX(-50%)',
                  boxShadow: `0 0 ${isHighlight ? '20px' : '10px'} ${color}`,
                  border: '2px solid var(--surface)'
                }}
              >
                {/* Value display */}
                <div style={{ 
                  position: 'absolute', 
                  top: i % 2 === 0 ? '28px' : '48px', 
                  left: '50%', 
                  transform: 'translateX(-50%)', 
                  fontWeight: '800', 
                  color: 'var(--text-main)', 
                  whiteSpace: 'nowrap',
                  fontSize: isHighlight ? '1.1rem' : '0.9rem'
                }}>
                  {p.val}
                </div>
                {/* Label display */}
                {p.label && (
                  <div style={{ 
                    position: 'absolute', 
                    top: i % 2 === 0 ? '-35px' : '-65px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    fontSize: '0.75rem', 
                    color: color, 
                    whiteSpace: 'nowrap', 
                    fontWeight: '800',
                    background: 'var(--surface2)',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    border: `1px solid ${color}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}>
                    {p.label}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Jumps (Arcs) */}
        {isActive && jumps.map((j, i) => {
          const isForward = j.to > j.from;
          const arcHeight = 45 + (i * 10); // Offset overlapping arcs
          
          return (
            <motion.svg
              key={'jump-' + i}
              initial={{ opacity: 0, strokeDashoffset: 100 }}
              animate={{ opacity: 1, strokeDashoffset: 0 }}
              transition={{ delay: points.length * 0.2 + i * 0.4, duration: 0.8, ease: "easeOut" }}
              style={{
                position: 'absolute',
                left: getPos(isForward ? j.from : j.to),
                width: getWidth(isForward ? j.from : j.to, isForward ? j.to : j.from),
                height: arcHeight + 'px',
                top: `-${arcHeight}px`,
                overflow: 'visible',
                pointerEvents: 'none'
              }}
            >
              <path
                d={`M 0 ${arcHeight} Q 50% 0 100% ${arcHeight}`}
                fill="none"
                stroke="var(--violet)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                style={{ filter: 'drop-shadow(0px 4px 6px rgba(124, 58, 237, 0.4))' }}
              />
              {/* Arrow head */}
              <polygon 
                points={isForward ? `100%,${arcHeight} 90%,${arcHeight-10} 95%,${arcHeight-15}` : `0,${arcHeight} 10%,${arcHeight-10} 5%,${arcHeight-15}`} 
                fill="var(--violet)" 
              />
              {j.label && (
                <text x="50%" y="12" fill="var(--text-main)" fontSize="13" textAnchor="middle" fontWeight="bold" 
                  style={{ textShadow: '0 2px 4px var(--surface)' }}>
                  {j.label}
                </text>
              )}
            </motion.svg>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 4. Bar Engine (Charts, Block Transfer, Averages)
// ==========================================
export function BarEngine({ step, isActive }) {
  const data = step.render_data || {};
  const bars = data.bars || data.data || data.values || data.items || [];
  const getVal = (b) => parseFloat(b.val !== undefined ? b.val : b.value) || 0;
  const maxVal = Math.max(10, ...bars.map(getVal));

  // ROOT FIX: Framer Motion CANNOT animate "0 → '80%'" — must use pixels
  const CHART_H = 160;
  const getBarPx = (val) => Math.max(4, (val / maxVal) * CHART_H);

  const PALETTE = [
    'linear-gradient(180deg, #7C3AED 0%, #5B21B6 100%)',
    'linear-gradient(180deg, #0D9488 0%, #0F766E 100%)',
    'linear-gradient(180deg, #D97706 0%, #B45309 100%)',
    'linear-gradient(180deg, #DB2777 0%, #9D174D 100%)',
    'linear-gradient(180deg, #2563EB 0%, #1E40AF 100%)',
    'linear-gradient(180deg, #059669 0%, #047857 100%)',
  ];

  const getGradient = (colorStr, idx) => {
    if (!colorStr) return PALETTE[idx % PALETTE.length];
    const c = colorStr.toLowerCase();
    if (c.includes('10b981') || c.includes('green')) return 'linear-gradient(180deg, #10B981 0%, #047857 100%)';
    if (c.includes('f59e0b') || c.includes('amber') || c.includes('d97706')) return 'linear-gradient(180deg, #F59E0B 0%, #B45309 100%)';
    if (c.includes('14b8a6') || c.includes('teal') || c.includes('0d9488')) return 'linear-gradient(180deg, #14B8A6 0%, #0F766E 100%)';
    if (c.includes('7c3aed') || c.includes('violet')) return 'linear-gradient(180deg, #7C3AED 0%, #5B21B6 100%)';
    if (c.includes('6b7280') || c.includes('gray') || c.includes('grey')) return 'linear-gradient(180deg, #6B7280 0%, #374151 100%)';
    if (c.startsWith('#') || c.startsWith('rgb')) return `linear-gradient(180deg, ${colorStr} 0%, rgba(0,0,0,0.4) 100%)`;
    return PALETTE[idx % PALETTE.length];
  };

  return (
    <div style={{ width: '100%', padding: '16px 8px 4px 8px' }}>
      {/* Chart area with border axes */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        gap: '20px', height: `${CHART_H + 8}px`, width: '100%',
        position: 'relative',
        borderBottom: '3px solid var(--border)',
        borderLeft: '3px solid var(--border)',
        paddingBottom: '4px',
      }}>
        {/* Y-axis grid lines at 25%, 50%, 75%, 100% */}
        {[0.25, 0.5, 0.75, 1].map((frac) => (
          <div key={frac} style={{
            position: 'absolute', left: 0, right: 0,
            bottom: `${frac * CHART_H}px`, height: '1px',
            background: 'var(--border)', opacity: 0.35,
          }} />
        ))}

        {bars.map((bar, i) => {
          const val = getVal(bar);
          const isHighlight = bar.highlight;
          const heightPx = getBarPx(val);
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 1 }}>
              {/* Value badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                transition={{ delay: i * 0.12 + 0.5, type: 'spring', stiffness: 200 }}
                style={{
                  fontWeight: '900', fontSize: isHighlight ? '1.05rem' : '0.9rem',
                  color: isHighlight ? 'var(--amber)' : 'var(--text-main)',
                  background: 'var(--surface2)', padding: '3px 10px', borderRadius: '8px',
                  border: isHighlight ? '2px solid var(--amber)' : '1px solid var(--border)',
                  boxShadow: isHighlight ? '0 0 12px rgba(245,158,11,0.3)' : '0 2px 6px rgba(0,0,0,0.15)',
                  whiteSpace: 'nowrap',
                }}
              >
                {bar.val !== undefined ? bar.val : bar.value}
              </motion.div>

              {/* Bar — pixel height so Framer Motion can interpolate correctly */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isActive ? heightPx : 0, opacity: isActive ? 1 : 0 }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                  width: '52px', background: getGradient(bar.color, i),
                  borderRadius: '8px 8px 2px 2px',
                  boxShadow: isHighlight
                    ? '0 0 24px rgba(245,158,11,0.5), 0 4px 12px rgba(0,0,0,0.2)'
                    : '0 4px 10px rgba(0,0,0,0.25)',
                  position: 'relative', overflow: 'hidden', flexShrink: 0,
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)',
                  borderRadius: '8px 8px 0 0',
                }} />
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* X-axis labels */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '8px' }}>
        {bars.map((bar, i) => (
          <div key={i} style={{
            width: '52px', textAlign: 'center', fontSize: '0.78rem',
            color: bar.highlight ? 'var(--amber)' : 'var(--text-sec)',
            fontWeight: bar.highlight ? '800' : '600',
            letterSpacing: '0.03em', overflow: 'hidden',
            textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {bar.label}
          </div>
        ))}
      </div>
    </div>
  );
}



// ==========================================
// 5. Entity Engine (Cars, Trains, Coins, Workers)
// ==========================================
export function EntityEngine({ step, isActive }) {
  const data = step.render_data || {};
  const entities = data.entities || [];

  function getEmoji(type) {
    const map = {
      car: '🚙',
      train: '🚂',
      coin: '🪙',
      worker: '👷‍♂️',
      box: '📦',
      clock: '⏳',
      person: '🏃'
    };
    return map[(type || '').toLowerCase()] || '🔵';
  }

  function getStartStyle(ent) {
    return { left: (ent.startX || 0) + '%', opacity: 0, scale: 0.8 };
  }

  function getEndStyle(ent) {
    return {
      left: (isActive ? (ent.endX != null ? ent.endX : 50) : (ent.startX || 0)) + '%',
      opacity: isActive ? 1 : 0,
      scale: isActive ? 1 : 0.8
    };
  }

  // Add subtle bobbing animation based on type
  const getBobbing = (type) => {
    if (['car', 'train', 'person', 'worker'].includes(type?.toLowerCase())) {
      return {
        y: [0, -6, 0],
        transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" }
      };
    }
    return {};
  };

  return (
    <div style={{ width: '100%', height: '180px', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* The Road / Track Background */}
      <div style={{ 
        position: 'absolute', 
        bottom: '30px', 
        width: '100%', 
        height: '40px', 
        background: 'var(--surface2)', 
        borderTop: '2px solid var(--border)',
        borderBottom: '4px solid var(--surface3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0
      }}>
        {/* Dashed line in middle of road */}
        <div style={{ width: '100%', height: '2px', background: 'var(--border)', opacity: 0.5, borderStyle: 'dashed', borderWidth: '2px', borderColor: 'var(--text-muted)' }} />
      </div>

      {/* Start and End Flags if distance is mentioned */}
      {data.distance && (
        <>
          <div style={{ position: 'absolute', bottom: '10px', left: '5%', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--muted)' }}>Start</div>
          <div style={{ position: 'absolute', bottom: '10px', right: '5%', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--muted)' }}>End ({data.distance})</div>
        </>
      )}

      {entities.map((ent, i) => (
        <motion.div
          key={i}
          initial={getStartStyle(ent)}
          animate={getEndStyle(ent)}
          transition={{ duration: ent.duration || 3, ease: 'easeInOut', delay: ent.delay || 0 }}
          style={{
            position: 'absolute',
            bottom: '40px', // Sit on the road
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10 + i
          }}
        >
          {/* Label Bubble (Glassmorphism) */}
          {ent.label && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (ent.delay || 0) + 0.5 }}
              style={{ 
                fontSize: '0.85rem', 
                fontWeight: '800', 
                color: 'var(--text-main)', 
                backgroundColor: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(4px)',
                padding: '4px 12px', 
                borderRadius: '12px', 
                marginBottom: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '1px solid rgba(0,0,0,0.05)',
                whiteSpace: 'nowrap'
              }}
            >
              {ent.label}
            </motion.div>
          )}

          {/* Emoji Character with Bobbing */}
          <motion.div 
            animate={isActive ? getBobbing(ent.type) : {}} 
            style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }}
          >
            {getEmoji(ent.type)}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

// ==========================================
// 6. Pie Engine (Data Interpretation Donut Chart)
// ==========================================
export function PieEngine({ step, isActive }) {
  const data = step.render_data || {};
  const slices = data.slices || [];
  
  const total = slices.reduce((acc, s) => acc + (s.val || 0), 0) || 1;
  const C = 2 * Math.PI * 40; // r=40
  
  let cumulative = 0;
  const chartData = slices.map((slice, i) => {
    const percent = (slice.val || 0) / total;
    const length = percent * C;
    const offset = cumulative;
    cumulative += length;
    
    return {
      ...slice,
      percent,
      length,
      offset
    };
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '32px', width: '100%', justifyContent: 'center', padding: '16px 0' }}>
      
      {/* Chart */}
      <div style={{ position: 'relative', width: '160px', height: '160px' }}>
        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%', overflow: 'visible' }}>
          {/* Background track (optional, if we want a gray ring) */}
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--card-bg)" strokeWidth="20" />
          
          {/* Slices */}
          {chartData.map((s, i) => (
            <motion.circle
              key={i}
              cx="50" cy="50" r="40"
              fill="transparent"
              stroke={s.color || 'var(--violet)'}
              strokeWidth="20"
              initial={{ strokeDasharray: `0 ${C}` }}
              animate={isActive ? { strokeDasharray: `${s.length} ${C}` } : { strokeDasharray: `0 ${C}` }}
              transition={{ duration: 0.8, delay: 0.1 + (i * 0.15), ease: "easeOut" }}
              strokeDashoffset={-s.offset}
            />
          ))}
        </svg>
      </div>
      
      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '120px' }}>
        {chartData.map((s, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: 20 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <div style={{ width: '14px', height: '14px', borderRadius: '4px', background: s.color || 'var(--violet)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1 }}>{s.label}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-sec)', marginTop: '2px' }}>
                {s.val} ({(s.percent * 100).toFixed(1)}%)
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
