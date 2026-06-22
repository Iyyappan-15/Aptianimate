import React, { useEffect, useState } from 'react';

// Helper to safely extract values
const getVisData = (step) => {
  if (step.visual_data) {
    return {
      v1: step.visual_data.value1 || 0,
      v2: step.visual_data.value2 || 0,
      l1: step.visual_data.label1 || '',
      l2: step.visual_data.label2 || ''
    };
  }
  // Fallback if AI hasn't updated
  const match = step.visual ? step.visual.match(/(\d+)(?:\.\d+)?/g) : null;
  return {
    v1: match && match[0] ? parseFloat(match[0]) : 50,
    v2: match && match[1] ? parseFloat(match[1]) : 0,
    l1: '',
    l2: ''
  };
};

// 1. Motion (Trains, Speed, Distance)
export function MotionVisual({ step, isActive }) {
  const data = getVisData(step);
  const [position1, setPosition1] = useState(-20);
  const [position2, setPosition2] = useState(-20);
  
  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => {
      // If the AI gives us values, use them as percentages (0-100)
      setPosition1(Math.min(Math.max(data.v1, 0), 100));
      if (data.v2 > 0) setPosition2(Math.min(Math.max(data.v2, 0), 100));
    }, 100);
    return () => clearTimeout(t);
  }, [isActive, data.v1, data.v2]);

  return (
    <div style={{ width: '100%', height: 160, position: 'relative', overflow: 'hidden', background: 'var(--surface2)', borderRadius: 12, border: '1px solid var(--border)' }}>
      {/* Track */}
      <div style={{ position: 'absolute', bottom: 30, width: '100%', height: 4, background: 'var(--border)' }}></div>
      <div style={{ position: 'absolute', bottom: 80, width: '100%', height: 2, background: 'var(--border)', borderStyle: 'dashed' }}></div>
      
      {/* Moving object 1 */}
      <div style={{
        position: 'absolute', bottom: 34, left: `${position1}%`,
        transition: 'left 1s cubic-bezier(0.25, 1, 0.5, 1)',
        fontSize: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        🚆
        <span style={{ fontSize: '0.7rem', color: 'var(--violet)', fontWeight: 'bold' }}>{data.l1 || 'A'}</span>
      </div>

      {/* Moving object 2 */}
      {data.v2 > 0 && (
        <div style={{
          position: 'absolute', bottom: 84, left: `${position2}%`,
          transition: 'left 1s cubic-bezier(0.25, 1, 0.5, 1)',
          fontSize: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          🚗
          <span style={{ fontSize: '0.7rem', color: 'var(--amber)', fontWeight: 'bold' }}>{data.l2 || 'B'}</span>
        </div>
      )}

      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center', width: '90%' }}>
        {step.visual}
      </div>
    </div>
  );
}

// 2. Container (Mixtures, Ratio)
export function ContainerVisual({ step, isActive }) {
  const data = getVisData(step);
  const [fill1, setFill1] = useState(0);
  const [fill2, setFill2] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => {
      setFill1(Math.min(Math.max(data.v1, 0), 100));
      setFill2(Math.min(Math.max(data.v2, 0), 100));
    }, 100);
    return () => clearTimeout(t);
  }, [isActive, data.v1, data.v2]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 12 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center', minHeight: 24 }}>{step.visual}</div>
      
      <div style={{ display: 'flex', gap: 32 }}>
        {/* Container 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 80, height: 120, border: '3px solid var(--border)', borderTop: 'none', borderRadius: '0 0 12px 12px', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
            <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${fill1}%`, background: 'rgba(20, 184, 166, 0.5)', transition: 'height 1s ease-out' }}></div>
          </div>
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{data.l1 || `Val: ${data.v1}`}</span>
        </div>

        {/* Container 2 */}
        {(data.v2 > 0 || data.l2) && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 80, height: 120, border: '3px solid var(--border)', borderTop: 'none', borderRadius: '0 0 12px 12px', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${fill2}%`, background: 'rgba(245, 158, 11, 0.5)', transition: 'height 1s ease-out' }}></div>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{data.l2 || `Val: ${data.v2}`}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// 3. Progress (Percentage, Profit & Loss)
export function ProgressVisual({ step, isActive }) {
  const data = getVisData(step);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setWidth(Math.min(data.v1, 100)), 100);
    return () => clearTimeout(t);
  }, [isActive, data.v1]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--muted)' }}>
        <span>0%</span>
        <span>{data.l1 || 'Progress'}</span>
        <span>100%</span>
      </div>
      <div style={{ width: '100%', height: 28, background: 'var(--surface2)', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div style={{
          height: '100%', width: `${width}%`, background: 'var(--violet)',
          transition: 'width 1s ease-out', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          paddingRight: 8, color: 'white', fontSize: '0.85rem', fontWeight: 'bold'
        }}>
          {width > 5 ? `${data.v1}%` : ''}
        </div>
      </div>
    </div>
  );
}

// 4. Timeline (Ages, Calendar)
export function TimelineVisual({ step, isActive }) {
  const data = getVisData(step);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, [isActive]);

  // If we have v1 and v2, we map them on a dynamic line. Otherwise fallback to hardcoded dots.
  const hasDynamic = data.v1 > 0 || data.v2 > 0 || data.l1 || data.l2;

  return (
    <div style={{ width: '100%', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      
      <div style={{ position: 'relative', height: 4, background: 'var(--border)', width: '100%', margin: '0 auto', maxWidth: 400 }}>
        {hasDynamic ? (
          <>
            <div style={{ position: 'absolute', left: '10%', top: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--amber)', opacity: show ? 1 : 0, transition: 'all 0.5s', transform: show ? 'scale(1)' : 'scale(0)' }} />
            <div style={{ position: 'absolute', left: '10%', top: 20, fontSize: '0.8rem', fontWeight: 'bold', textAlign: 'center', transform: 'translateX(-50%)', opacity: show ? 1 : 0, transition: 'all 0.5s', width: 100 }}>
              {data.v1} <br/> <span style={{ color: 'var(--text-sec)', fontWeight: 'normal' }}>{data.l1}</span>
            </div>
            
            {(data.v2 > 0 || data.l2) && (
              <>
                <div style={{ position: 'absolute', left: '90%', top: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--violet)', opacity: show ? 1 : 0, transition: 'all 0.5s', transform: show ? 'scale(1)' : 'scale(0)' }} />
                <div style={{ position: 'absolute', left: '90%', top: 20, fontSize: '0.8rem', fontWeight: 'bold', textAlign: 'center', transform: 'translateX(-50%)', opacity: show ? 1 : 0, transition: 'all 0.5s', width: 100 }}>
                  {data.v2} <br/> <span style={{ color: 'var(--text-sec)', fontWeight: 'normal' }}>{data.l2}</span>
                </div>
              </>
            )}
          </>
        ) : (
           // Fallback
           <>
            <div style={{ position: 'absolute', left: '10%', top: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--amber)', opacity: show ? 1 : 0 }} />
            <div style={{ position: 'absolute', left: '50%', top: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--violet)', opacity: show ? 1 : 0 }} />
            <div style={{ position: 'absolute', left: '90%', top: -6, width: 16, height: 16, borderRadius: '50%', background: 'var(--teal)', opacity: show ? 1 : 0 }} />
           </>
        )}
      </div>
    </div>
  );
}

// 5. Tank (Pipes & Cisterns)
export function TankVisual({ step, isActive }) {
  const data = getVisData(step);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setHeight(Math.min(data.v1, 100)), 100);
    return () => clearTimeout(t);
  }, [isActive, data.v1]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 12 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center', minHeight: 24 }}>{step.visual}</div>
      <div style={{
        width: 140, height: 120, border: '4px solid var(--border)', borderRadius: 8,
        position: 'relative', overflow: 'hidden', background: 'var(--surface2)'
      }}>
        {/* Pipe Input */}
        <div style={{ position: 'absolute', top: -4, left: 20, width: 24, height: 24, background: 'var(--muted)', borderBottomRightRadius: 8 }} />
        
        {/* Water */}
        <div style={{
          position: 'absolute', bottom: 0, width: '100%', height: `${height}%`, background: '#3b82f6',
          transition: 'height 1s ease-out', opacity: 0.8
        }}>
          <div style={{ position: 'absolute', top: 0, width: '100%', height: 4, background: 'rgba(255,255,255,0.4)' }}></div>
        </div>

        {/* Text */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 'bold', color: height > 50 ? 'white' : 'var(--text-main)', zIndex: 10, transition: 'color 0.5s' }}>
          {data.v1}% {data.l1}
        </div>
      </div>
    </div>
  );
}

// 6. Work (Time & Work)
export function WorkVisual({ step, isActive }) {
  const data = getVisData(step);
  // v1 = completed blocks, v2 = total blocks
  const completed = Math.max(0, data.v1 || 3);
  const total = Math.max(completed, data.v2 || 10);
  
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let i = 0;
    const int = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= completed) clearInterval(int);
    }, 150);
    return () => clearInterval(int);
  }, [isActive, completed]);

  return (
    <div style={{ width: '100%', padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      
      <div style={{ fontSize: '0.8rem', textAlign: 'center', color: 'var(--amber)', fontWeight: 'bold' }}>
        {data.l1 || `Work completed: ${completed}/${total}`}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 300, margin: '0 auto' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{
            width: 32, height: 32, background: i < visible ? 'var(--amber)' : 'var(--surface2)', borderRadius: 4,
            border: i < visible ? 'none' : '1px dashed var(--border)',
            transform: i < visible ? 'scale(1)' : 'scale(0.95)',
            transition: 'all 0.3s ease'
          }} />
        ))}
      </div>
    </div>
  );
}

// 7. Venn (Syllogism, Sets)
export function VennVisual({ step, isActive }) {
  const data = getVisData(step);
  const [show, setShow] = useState(false);
  useEffect(() => { if (isActive) setTimeout(() => setShow(true), 100); }, [isActive]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 12 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ position: 'relative', width: 240, height: 140 }}>
        <div style={{
          position: 'absolute', left: 30, top: 10, width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(59,130,246,0.15)', border: '2px solid rgba(59,130,246,0.5)',
          opacity: show ? 1 : 0, transition: 'opacity 0.8s', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 20
        }}>
          <div style={{textAlign: 'center'}}><span style={{fontWeight:'bold'}}>{data.v1 || ''}</span><br/><span style={{fontSize:'0.7rem'}}>{data.l1 || 'A'}</span></div>
        </div>
        <div style={{
          position: 'absolute', right: 30, top: 10, width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(245,158,11,0.15)', border: '2px solid rgba(245,158,11,0.5)',
          opacity: show ? 1 : 0, transition: 'opacity 0.8s 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20
        }}>
          <div style={{textAlign: 'center'}}><span style={{fontWeight:'bold'}}>{data.v2 || ''}</span><br/><span style={{fontSize:'0.7rem'}}>{data.l2 || 'B'}</span></div>
        </div>
      </div>
    </div>
  );
}

// 8. Seating (Seating Arrangement)
export function SeatingVisual({ step, isActive }) {
  const data = getVisData(step);
  const seats = Math.max(data.v1 || 6, 3);
  const [show, setShow] = useState(0);
  
  useEffect(() => {
    if (!isActive) return;
    let i = 0;
    const int = setInterval(() => { i++; setShow(i); if (i >= seats) clearInterval(int); }, 100);
    return () => clearInterval(int);
  }, [isActive, seats]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 24 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ position: 'relative', width: 160, height: 160, border: '4px solid var(--border)', borderRadius: '50%', background: 'var(--surface2)' }}>
        <div style={{ position: 'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontWeight:'bold', color:'var(--muted)'}}>Table</div>
        {Array.from({ length: seats }).map((_, i) => {
          const angle = (i * 360) / seats;
          const rad = (angle * Math.PI) / 180;
          const x = 80 + Math.cos(rad) * 80 - 15;
          const y = 80 + Math.sin(rad) * 80 - 15;
          
          // Highlight specific seat if l1 indicates it (e.g., if l1="3", highlight seat 3)
          const isTarget = data.l1 == (i+1).toString() || data.v2 === i+1;

          return (
            <div key={i} style={{
              position: 'absolute', left: x, top: y, width: 30, height: 30, borderRadius: '50%',
              background: isTarget ? 'var(--amber)' : 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold',
              opacity: i < show ? 1 : 0, transform: i < show ? 'scale(1.2)' : 'scale(0)', transition: 'all 0.3s'
            }}>{i + 1}</div>
          );
        })}
      </div>
    </div>
  );
}

// 9. Family Tree (Blood Relations)
export function FamilyTreeVisual({ step, isActive }) {
  const data = getVisData(step);
  const [show, setShow] = useState(false);
  useEffect(() => { if (isActive) setTimeout(() => setShow(true), 100); }, [isActive]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ opacity: show ? 1 : 0, transition: 'opacity 0.6s', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ padding: '8px 16px', border: '2px solid var(--violet)', borderRadius: 8, background: 'var(--surface)' }}>{data.l1 || 'Parent'}</div>
        <div style={{ width: 2, height: 20, background: 'var(--border)' }}></div>
        <div style={{ width: 120, height: 2, background: 'var(--border)' }}></div>
        <div style={{ display: 'flex', gap: 40 }}>
          <div><div style={{ width: 2, height: 20, background: 'var(--border)', margin: '0 auto' }}></div><div style={{ padding: '8px 16px', border: '2px solid var(--teal)', borderRadius: 8, background: 'var(--surface)' }}>{data.l2 || 'Child A'}</div></div>
          <div><div style={{ width: 2, height: 20, background: 'var(--border)', margin: '0 auto' }}></div><div style={{ padding: '8px 16px', border: '2px solid var(--amber)', borderRadius: 8, background: 'var(--surface)' }}>{data.v1 ? `Age: ${data.v1}` : 'Child B'}</div></div>
        </div>
      </div>
    </div>
  );
}

// 10. Probability Tree
export function ProbabilityTreeVisual({ step, isActive }) {
  const data = getVisData(step);
  const [show, setShow] = useState(false);
  useEffect(() => { if (isActive) setTimeout(() => setShow(true), 100); }, [isActive]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40, opacity: show ? 1 : 0, transition: 'opacity 0.6s' }}>
        <div style={{ padding: '8px', border: '1px solid var(--border)', borderRadius: 8, fontWeight: 'bold' }}>Start</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, position: 'relative' }}>
          <div style={{ position: 'absolute', left: -40, top: 14, width: 40, height: 2, background: 'var(--border)', transform: 'rotate(-30deg)', transformOrigin: 'left' }}></div>
          <div style={{ position: 'absolute', left: -40, bottom: 14, width: 40, height: 2, background: 'var(--border)', transform: 'rotate(30deg)', transformOrigin: 'left' }}></div>
          
          <div style={{ padding: '4px 12px', background: 'rgba(59,130,246,0.1)', color: 'var(--violet)', borderRadius: 4, fontWeight: 'bold' }}>{data.l1 || 'Outcome 1'} {data.v1 ? `(${data.v1})` : ''}</div>
          <div style={{ padding: '4px 12px', background: 'rgba(239,68,68,0.1)', color: 'var(--coral)', borderRadius: 4, fontWeight: 'bold' }}>{data.l2 || 'Outcome 2'} {data.v2 ? `(${data.v2})` : ''}</div>
        </div>
      </div>
    </div>
  );
}

// 11. Number Line
export function NumberLineVisual({ step, isActive }) {
  const data = getVisData(step);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    const t = setTimeout(() => setVal(Math.min(data.v1, 100)), 100);
    return () => clearTimeout(t);
  }, [isActive, data.v1]);

  return (
    <div style={{ width: '100%', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ position: 'relative', height: 2, background: 'var(--border)', width: '100%', maxWidth: 500, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
        {Array.from({ length: 11 }).map((_, i) => (
           // Draw 0, 10, 20... up to 100
          <div key={i} style={{ position: 'relative' }}>
            <div style={{ width: 2, height: 10, background: 'var(--border)', position: 'absolute', top: -4, left: 0 }} />
            <div style={{ position: 'absolute', top: 12, left: -6, fontSize: '0.7rem', color: 'var(--muted)' }}>{i * 10}</div>
          </div>
        ))}
        <div style={{
          position: 'absolute', top: -14, left: `${val}%`, width: 16, height: 16, borderRadius: '50%',
          background: 'var(--coral)', transition: 'left 1s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: 2, transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center'
        }}>
          <div style={{ position: 'absolute', top: -20, fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--coral)', whiteSpace: 'nowrap' }}>
            {data.l1 || val}
          </div>
        </div>
      </div>
    </div>
  );
}

// 12. Chart (Data Interpretation)
export function ChartVisual({ step, isActive }) {
  const data = getVisData(step);
  const [show, setShow] = useState(false);
  useEffect(() => { if (isActive) setTimeout(() => setShow(true), 100); }, [isActive]);

  const h1 = data.v1 || 40;
  const h2 = data.v2 || 70;

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ fontWeight: 'bold', color: 'var(--text-sec)', textAlign: 'center' }}>{step.visual}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 120, borderBottom: '2px solid var(--border)', paddingBottom: 4 }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontWeight: 'bold', color: 'var(--violet)', opacity: show ? 1 : 0, transition: 'opacity 0.3s 0.6s' }}>{h1}</div>
          <div style={{ width: 32, height: `${show ? Math.min(h1, 100) : 0}%`, background: 'var(--violet)', borderRadius: '4px 4px 0 0', transition: `height 0.8s ease 0.1s` }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-sec)' }}>{data.l1 || 'A'}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontWeight: 'bold', color: 'var(--amber)', opacity: show ? 1 : 0, transition: 'opacity 0.3s 0.6s' }}>{h2}</div>
          <div style={{ width: 32, height: `${show ? Math.min(h2, 100) : 0}%`, background: 'var(--amber)', borderRadius: '4px 4px 0 0', transition: `height 0.8s ease 0.3s` }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-sec)' }}>{data.l2 || 'B'}</div>
        </div>

      </div>
    </div>
  );
}
