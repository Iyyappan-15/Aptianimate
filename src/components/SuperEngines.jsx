import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!isActive) return;
    setRevealed([]);
    let i = 0;
    const interval = setInterval(() => {
      setRevealed(prev => [...prev, i]);
      i++;
      if (i >= nodes.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [isActive, nodes.length]);

  const grouped = nodes.reduce((acc, node) => {
    (acc[node.level] = acc[node.level] || []).push(node);
    return acc;
  }, {});

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
      {Object.entries(grouped).map(([level, levelNodes]) => (
        <div key={level} style={{ display: 'flex', gap: '32px', justifyContent: 'center' }}>
          {levelNodes.map((node) => {
            const nodeIndex = nodes.findIndex(n => n.id === node.id);
            const isVisible = revealed.includes(nodeIndex);
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.5, y: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5, y: isVisible ? 0 : -20 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: node.highlight ? 'rgba(20, 184, 166, 0.15)' : 'var(--surface2)',
                  border: node.highlight ? '2px solid var(--teal)' : '2px solid var(--violet)',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: node.highlight ? 'var(--teal)' : 'var(--text)'
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
  const bars = data.bars || [];
  const maxVal = Math.max(10, ...bars.map(b => b.val));

  function getBarHeight(val) {
    return (val / maxVal) * 100 + '%';
  }

  // Map requested colors to nice gradients
  const getGradient = (colorStr) => {
    if (!colorStr) return 'linear-gradient(180deg, #7C3AED 0%, #5B21B6 100%)';
    if (colorStr.includes('81') || colorStr.toLowerCase().includes('green')) return 'linear-gradient(180deg, #10B981 0%, #047857 100%)';
    if (colorStr.includes('06') || colorStr.toLowerCase().includes('orange')) return 'linear-gradient(180deg, #F59E0B 0%, #B45309 100%)';
    if (colorStr.includes('teal') || colorStr.toLowerCase().includes('88')) return 'linear-gradient(180deg, #14B8A6 0%, #0F766E 100%)';
    return `linear-gradient(180deg, ${colorStr} 0%, rgba(0,0,0,0.5) 200%)`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '32px', height: '200px', width: '100%', paddingBottom: '30px', position: 'relative' }}>
      
      {/* Ground Axis */}
      <div style={{ position: 'absolute', bottom: '30px', left: '10%', right: '10%', height: '3px', background: 'var(--border)', borderRadius: '2px' }} />

      {bars.map((bar, i) => {
        const isHighlight = bar.highlight;
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', zIndex: 1 }}>
            
            {/* Value floating above */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 15 }}
              transition={{ delay: i * 0.1 + 0.4, type: 'spring' }}
              style={{ 
                fontWeight: '900', 
                fontSize: isHighlight ? '1.3rem' : '1.1rem',
                color: isHighlight ? 'var(--amber)' : 'var(--text-main)',
                background: 'var(--surface2)',
                padding: '4px 12px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: isHighlight ? '2px solid var(--amber)' : '1px solid var(--border)'
              }}
            >
              {bar.val}
            </motion.div>
            
            {/* The Bar */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: isActive ? getBarHeight(bar.val) : 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, type: 'spring', bounce: 0.4 }}
              style={{
                width: '48px',
                background: getGradient(bar.color),
                borderRadius: '8px 8px 2px 2px',
                boxShadow: isHighlight ? '0 0 20px rgba(245, 158, 11, 0.4)' : '0 4px 10px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Glass shine effect inside bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)' }} />
            </motion.div>

            {/* Label below */}
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {bar.label}
            </div>
          </div>
        );
      })}
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
