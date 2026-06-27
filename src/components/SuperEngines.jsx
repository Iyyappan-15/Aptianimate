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

  return (
    <div style={{ width: '100%', padding: '40px 16px', position: 'relative' }}>
      <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px', position: 'relative' }}>

        <AnimatePresence>
          {isActive && points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.3, type: 'spring' }}
              style={{
                position: 'absolute',
                left: getPos(p.val),
                top: '-6px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: p.highlight ? 'var(--amber)' : 'var(--violet)',
                transform: 'translateX(-50%)'
              }}
            >
              <div style={{ position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold', color: 'var(--text-sec)', whiteSpace: 'nowrap' }}>
                {p.val}
              </div>
              {p.label && (
                <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.8rem', color: p.highlight ? 'var(--amber)' : 'var(--violet)', whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                  {p.label}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isActive && jumps.map((j, i) => (
          <motion.svg
            key={'jump-' + i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: points.length * 0.3 + i * 0.5, duration: 0.5 }}
            style={{
              position: 'absolute',
              left: getPos(j.from),
              width: getWidth(j.from, j.to),
              height: '40px',
              top: '-40px',
              overflow: 'visible'
            }}
          >
            <path
              d="M 0 40 Q 50% 0 100% 40"
              fill="none"
              stroke="var(--teal)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {j.label && (
              <text x="50%" y="10" fill="var(--teal)" fontSize="12" textAnchor="middle" fontWeight="bold">
                {j.label}
              </text>
            )}
          </motion.svg>
        ))}
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

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '24px', height: '160px', width: '100%', paddingBottom: '20px', borderBottom: '2px solid var(--border)' }}>
      {bars.map((bar, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            style={{ fontWeight: 'bold', color: bar.highlight ? 'var(--teal)' : 'var(--text)' }}
          >
            {bar.val}
          </motion.div>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isActive ? getBarHeight(bar.val) : 0 }}
            transition={{ delay: i * 0.1, duration: 0.6, type: 'spring' }}
            style={{
              width: '40px',
              backgroundColor: bar.color || 'var(--violet)',
              borderRadius: '6px 6px 0 0',
              opacity: 0.9
            }}
          />
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 'bold' }}>
            {bar.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 5. Entity Engine (Cars, Trains, Coins)
// ==========================================
export function EntityEngine({ step, isActive }) {
  const data = step.render_data || {};
  const entities = data.entities || [];

  function getEmoji(type) {
    const map = {
      car: '🚗',
      train: '🚆',
      coin: '🪙',
      worker: '👷',
      box: '📦',
      clock: '⏱️',
      person: '🧑'
    };
    return map[(type || '').toLowerCase()] || '🔵';
  }

  function getStartStyle(ent) {
    return { left: (ent.startX || 0) + '%', opacity: 0 };
  }

  function getEndStyle(ent) {
    return {
      left: (isActive ? (ent.endX != null ? ent.endX : 50) : (ent.startX || 0)) + '%',
      opacity: isActive ? 1 : 0
    };
  }

  return (
    <div style={{ width: '100%', height: '140px', position: 'relative', borderBottom: '2px dashed var(--border)' }}>
      {entities.map((ent, i) => (
        <motion.div
          key={i}
          initial={getStartStyle(ent)}
          animate={getEndStyle(ent)}
          transition={{ duration: ent.duration || 2, ease: 'easeInOut', delay: ent.delay || 0 }}
          style={{
            position: 'absolute',
            bottom: '10px',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '2.5rem'
          }}
        >
          {getEmoji(ent.type)}
          {ent.label && (
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text)', backgroundColor: 'var(--surface2)', padding: '2px 8px', borderRadius: '4px', marginTop: '4px' }}>
              {ent.label}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
