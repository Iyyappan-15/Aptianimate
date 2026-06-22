import React, { useEffect, useState } from 'react';

// Utility to extract the first number from text
const extractNumber = (text, defaultVal = 50) => {
  if (!text) return defaultVal;
  const match = text.match(/(\d+)(?:\.\d+)?/);
  return match ? parseFloat(match[0]) : defaultVal;
};

// 1. Motion (Trains, Speed, Distance)
export function MotionVisual({ step, isActive }) {
  const [position, setPosition] = useState(-50);
  
  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setPosition(80), 300);
    return () => clearTimeout(t);
  }, [isActive]);

  return (
    <div style={{ width: '100%', height: 120, position: 'relative', overflow: 'hidden', background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--border)' }}>
      {/* Track */}
      <div style={{ position: 'absolute', bottom: 20, width: '100%', height: 4, background: 'var(--border)' }}></div>
      {/* Moving object */}
      <div style={{
        position: 'absolute', bottom: 24, left: `${position}%`,
        transition: 'left 2s cubic-bezier(0.25, 1, 0.5, 1)',
        fontSize: '2rem'
      }}>
        🚆
      </div>
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center', width: '90%' }}>
        {step.visual}
      </div>
    </div>
  );
}

// 2. Container (Mixtures, Ratio)
export function ContainerVisual({ step, isActive }) {
  const fillLevel = extractNumber(step.visual, 50);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setHeight(fillLevel), 300);
    return () => clearTimeout(t);
  }, [isActive, fillLevel]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 12 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center', minHeight: 24 }}>{step.visual}</div>
      <div style={{
        width: 100, height: 120, border: '3px solid var(--border)', borderTop: 'none', borderRadius: '0 0 12px 12px',
        position: 'relative', overflow: 'hidden', background: 'var(--bg)'
      }}>
        <div style={{
          position: 'absolute', bottom: 0, width: '100%', height: `${height}%`, background: 'rgba(20, 184, 166, 0.4)',
          transition: 'height 1.5s ease-out'
        }}></div>
      </div>
    </div>
  );
}

// 3. Progress (Percentage, Profit & Loss)
export function ProgressVisual({ step, isActive }) {
  const percent = extractNumber(step.visual, 50);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setWidth(Math.min(percent, 100)), 300);
    return () => clearTimeout(t);
  }, [isActive, percent]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ width: '100%', height: 24, background: 'var(--surface2)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div style={{
          height: '100%', width: `${width}%`, background: 'var(--violet)',
          transition: 'width 1.5s ease-out', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: 8, color: 'white', fontSize: '0.8rem', fontWeight: 'bold'
        }}>
          {width > 10 ? `${width}%` : ''}
        </div>
      </div>
    </div>
  );
}

// 4. Timeline (Ages, Calendar)
export function TimelineVisual({ step, isActive }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!isActive) return;
    setTimeout(() => setShow(true), 300);
  }, [isActive]);

  return (
    <div style={{ width: '100%', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ position: 'relative', height: 4, background: 'var(--border)', width: '100%' }}>
        <div style={{ position: 'absolute', left: '10%', top: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--amber)', opacity: show ? 1 : 0, transition: 'opacity 0.5s', transform: show ? 'scale(1)' : 'scale(0)' }} />
        <div style={{ position: 'absolute', left: '50%', top: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--violet)', opacity: show ? 1 : 0, transition: 'opacity 0.5s 0.3s', transform: show ? 'scale(1)' : 'scale(0)' }} />
        <div style={{ position: 'absolute', left: '90%', top: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--teal)', opacity: show ? 1 : 0, transition: 'opacity 0.5s 0.6s', transform: show ? 'scale(1)' : 'scale(0)' }} />
      </div>
    </div>
  );
}

// 5. Tank (Pipes & Cisterns)
export function TankVisual({ step, isActive }) {
  const fillLevel = extractNumber(step.visual, 50);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setHeight(Math.min(fillLevel, 100)), 300);
    return () => clearTimeout(t);
  }, [isActive, fillLevel]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 12 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center', minHeight: 24 }}>{step.visual}</div>
      <div style={{
        width: 140, height: 100, border: '4px solid var(--border)', borderRadius: 8,
        position: 'relative', overflow: 'hidden', background: 'var(--surface2)'
      }}>
        {/* Pipe */}
        <div style={{ position: 'absolute', top: 0, left: 20, width: 20, height: 20, background: 'var(--muted)' }} />
        <div style={{
          position: 'absolute', bottom: 0, width: '100%', height: `${height}%`, background: '#3b82f6',
          transition: 'height 1.5s ease-out', opacity: 0.8
        }}>
          {/* Water effect */}
          <div style={{ position: 'absolute', top: 0, width: '100%', height: 4, background: 'rgba(255,255,255,0.3)' }}></div>
        </div>
      </div>
    </div>
  );
}

// 6. Work (Time & Work)
export function WorkVisual({ step, isActive }) {
  const workCount = extractNumber(step.visual, 5) / 10; // Try to extract a sensible number, default to some blocks
  const blocks = Math.min(Math.max(Math.floor(workCount), 3), 10); // Between 3 and 10 blocks
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let i = 0;
    const int = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= blocks) clearInterval(int);
    }, 200);
    return () => clearInterval(int);
  }, [isActive, blocks]);

  return (
    <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        {Array.from({ length: blocks }).map((_, i) => (
          <div key={i} style={{
            width: 30, height: 30, background: 'var(--amber)', borderRadius: 4,
            opacity: i < visible ? 1 : 0.2, transform: i < visible ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.3s ease'
          }} />
        ))}
      </div>
    </div>
  );
}

// 7. Venn (Syllogism, Sets)
export function VennVisual({ step, isActive }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (isActive) setTimeout(() => setShow(true), 300); }, [isActive]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 12 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ position: 'relative', width: 200, height: 120 }}>
        <div style={{
          position: 'absolute', left: 30, top: 10, width: 100, height: 100, borderRadius: '50%',
          background: 'rgba(59,130,246,0.2)', border: '2px solid rgba(59,130,246,0.5)',
          opacity: show ? 1 : 0, transition: 'opacity 0.8s', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>A</div>
        <div style={{
          position: 'absolute', right: 30, top: 10, width: 100, height: 100, borderRadius: '50%',
          background: 'rgba(245,158,11,0.2)', border: '2px solid rgba(245,158,11,0.5)',
          opacity: show ? 1 : 0, transition: 'opacity 0.8s 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>B</div>
      </div>
    </div>
  );
}

// 8. Seating (Seating Arrangement)
export function SeatingVisual({ step, isActive }) {
  const seats = 6;
  const [show, setShow] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let i = 0;
    const int = setInterval(() => { i++; setShow(i); if (i >= seats) clearInterval(int); }, 150);
    return () => clearInterval(int);
  }, [isActive]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 24 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ position: 'relative', width: 140, height: 140, border: '4px solid var(--border)', borderRadius: '50%' }}>
        {Array.from({ length: seats }).map((_, i) => {
          const angle = (i * 360) / seats;
          const rad = (angle * Math.PI) / 180;
          const x = 70 + Math.cos(rad) * 70 - 15;
          const y = 70 + Math.sin(rad) * 70 - 15;
          return (
            <div key={i} style={{
              position: 'absolute', left: x, top: y, width: 30, height: 30, borderRadius: '50%',
              background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px',
              opacity: i < show ? 1 : 0, transform: i < show ? 'scale(1)' : 'scale(0)', transition: 'all 0.3s'
            }}>{i + 1}</div>
          );
        })}
      </div>
    </div>
  );
}

// 9. Family Tree (Blood Relations)
export function FamilyTreeVisual({ step, isActive }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (isActive) setTimeout(() => setShow(true), 300); }, [isActive]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ opacity: show ? 1 : 0, transition: 'opacity 0.8s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ padding: '8px 16px', border: '2px solid var(--violet)', borderRadius: 8 }}>Parent</div>
        <div style={{ width: 2, height: 20, background: 'var(--border)' }}></div>
        <div style={{ width: 100, height: 2, background: 'var(--border)' }}></div>
        <div style={{ display: 'flex', gap: 40 }}>
          <div><div style={{ width: 2, height: 20, background: 'var(--border)', margin: '0 auto' }}></div><div style={{ padding: '8px 16px', border: '2px solid var(--teal)', borderRadius: 8 }}>Child A</div></div>
          <div><div style={{ width: 2, height: 20, background: 'var(--border)', margin: '0 auto' }}></div><div style={{ padding: '8px 16px', border: '2px solid var(--amber)', borderRadius: 8 }}>Child B</div></div>
        </div>
      </div>
    </div>
  );
}

// 10. Probability Tree
export function ProbabilityTreeVisual({ step, isActive }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (isActive) setTimeout(() => setShow(true), 300); }, [isActive]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: show ? 1 : 0, transition: 'opacity 0.8s' }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--text-main)' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, position: 'relative' }}>
          <div style={{ position: 'absolute', left: -20, top: 10, width: 20, height: 2, background: 'var(--border)', transform: 'rotate(-45deg)' }}></div>
          <div style={{ position: 'absolute', left: -20, bottom: 10, width: 20, height: 2, background: 'var(--border)', transform: 'rotate(45deg)' }}></div>
          <div style={{ padding: '4px 12px', background: 'rgba(59,130,246,0.1)', color: 'var(--violet)', borderRadius: 4 }}>Outcome 1</div>
          <div style={{ padding: '4px 12px', background: 'rgba(239,68,68,0.1)', color: 'var(--coral)', borderRadius: 4 }}>Outcome 2</div>
        </div>
      </div>
    </div>
  );
}

// 11. Number Line
export function NumberLineVisual({ step, isActive }) {
  const pos = extractNumber(step.visual, 5);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setVal(Math.min(pos, 10)), 300);
    return () => clearTimeout(t);
  }, [isActive, pos]);

  return (
    <div style={{ width: '100%', padding: 24, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ position: 'relative', height: 2, background: 'var(--border)', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <div style={{ width: 2, height: 10, background: 'var(--border)', position: 'absolute', top: -4, left: 0 }} />
            <div style={{ position: 'absolute', top: 12, left: -4, fontSize: '0.7rem', color: 'var(--muted)' }}>{i}</div>
          </div>
        ))}
        <div style={{
          position: 'absolute', top: -14, left: `${val * 10}%`, width: 12, height: 12, borderRadius: '50%',
          background: 'var(--coral)', transition: 'left 1s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 2
        }} />
      </div>
    </div>
  );
}

// 12. Chart (Data Interpretation)
export function ChartVisual({ step, isActive }) {
  const [show, setShow] = useState(false);
  useEffect(() => { if (isActive) setTimeout(() => setShow(true), 300); }, [isActive]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 100, borderBottom: '2px solid var(--border)', paddingBottom: 4 }}>
        {[40, 70, 30, 90, 50].map((h, i) => (
          <div key={i} style={{
            width: 24, height: `${show ? h : 0}%`, background: 'var(--violet)', borderRadius: '4px 4px 0 0',
            transition: `height 0.6s ease ${i * 0.1}s`
          }} />
        ))}
      </div>
    </div>
  );
}
