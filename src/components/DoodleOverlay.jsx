// src/components/DoodleOverlay.jsx
// ─────────────────────────────────────────────────────────────────
//  Global floating scratchpad — appears on every page.
//  Purely additive: no existing file was modified to create this.
//  Zero API calls — 100% client-side HTML5 Canvas.
// ─────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from 'react';

const STROKE_SIZES = [
  { label: 'S', width: 2 },
  { label: 'M', width: 5 },
  { label: 'L', width: 10 },
];

const PEN_COLORS = [
  { label: 'Navy', color: '#1e3a8a' },
  { label: 'Red',  color: '#dc2626' },
  { label: 'Green',color: '#16a34a' },
  { label: 'White',color: '#f1f5f9' },
];

export default function DoodleOverlay() {
  const [isOpen, setIsOpen]           = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [penColor, setPenColor]       = useState('#1e3a8a');
  const [isDrawing, setIsDrawing]     = useState(false);

  const canvasRef  = useRef(null);
  const ctxRef     = useRef(null);
  const lastPos    = useRef(null);

  // ── Mount/Unmount canvas ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.lineCap   = 'round';
    ctx.lineJoin  = 'round';
    ctx.strokeStyle = penColor;
    ctx.lineWidth   = strokeWidth;
    ctxRef.current  = ctx;

    // freeze scroll
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]); // only re-run when isOpen changes

  // ── Sync pen settings to canvas context ─────────────────────────
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = penColor;
      ctxRef.current.lineWidth   = strokeWidth;
    }
  }, [penColor, strokeWidth]);

  // ── Resize handler ───────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => {
      if (!canvasRef.current || !ctxRef.current) return;
      // Save drawing before resize
      const imgData = ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current.width  = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      // Reapply context settings (reset on resize)
      ctxRef.current.lineCap   = 'round';
      ctxRef.current.lineJoin  = 'round';
      ctxRef.current.strokeStyle = penColor;
      ctxRef.current.lineWidth   = strokeWidth;
      ctxRef.current.putImageData(imgData, 0, 0);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen, penColor, strokeWidth]);

  // ── Pointer helpers ──────────────────────────────────────────────
  const getXY = (e) => {
    if (e.touches && e.touches.length > 0) {
      const r = canvasRef.current.getBoundingClientRect();
      return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    }
    return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  };

  const startDraw = (e) => {
    if (!ctxRef.current) return;
    const { x, y } = getXY(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    lastPos.current = { x, y };
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !ctxRef.current) return;
    e.preventDefault();
    const { x, y } = getXY(e);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    lastPos.current = { x, y };
  };

  const stopDraw = () => {
    if (!ctxRef.current) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    if (canvasRef.current && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const closeDoodle = () => {
    setIsOpen(false);
    setIsDrawing(false);
  };

  // ── Styles ──────────────────────────────────────────────────────
  const fabStyle = {
    position:        'fixed',
    bottom:          '28px',
    right:           '28px',
    width:           '52px',
    height:          '52px',
    borderRadius:    '50%',
    background:      isOpen
      ? 'linear-gradient(135deg, #7c3aed, #14b8a6)'
      : 'linear-gradient(135deg, rgba(124,58,237,0.90), rgba(124,58,237,0.75))',
    color:           '#fff',
    border:          '2px solid rgba(255,255,255,0.25)',
    boxShadow:       '0 4px 18px rgba(124,58,237,0.45)',
    cursor:          'pointer',
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    zIndex:          10000,
    transition:      'transform 0.25s ease, box-shadow 0.25s ease',
    transform:       isOpen ? 'rotate(45deg) scale(1.08)' : 'scale(1)',
  };

  const toolbarStyle = {
    position:        'fixed',
    bottom:          '90px',
    right:           '20px',
    display:         'flex',
    flexDirection:   'column',
    gap:             '10px',
    zIndex:          10001,
    background:      'var(--card-bg, #1e293b)',
    border:          '1px solid rgba(255,255,255,0.12)',
    borderRadius:    '16px',
    padding:         '14px 12px',
    boxShadow:       '0 12px 32px rgba(0,0,0,0.45)',
    animation:       'doodle-slide-in 0.22s ease',
  };

  return (
    <>
      {/* ── Global keyframes injected once ── */}
      <style>{`
        @keyframes doodle-slide-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .doodle-btn-row { display: flex; gap: 8px; align-items: center; }
        .doodle-size-btn {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1.5px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          color: var(--text-main, #f1f5f9);
          font-weight: 700; font-size: 0.72rem;
          cursor: pointer; transition: all 0.18s;
          display: flex; align-items: center; justify-content: center;
        }
        .doodle-size-btn.active {
          background: var(--violet, #7c3aed);
          border-color: var(--violet, #7c3aed);
          color: #fff;
          box-shadow: 0 0 8px rgba(124,58,237,0.55);
        }
        .doodle-color-btn {
          width: 24px; height: 24px; border-radius: 50%;
          border: 2.5px solid transparent;
          cursor: pointer; transition: transform 0.15s;
        }
        .doodle-color-btn.active { border-color: #fff; transform: scale(1.2); }
        .doodle-action-btn {
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text-main, #f1f5f9);
          border-radius: 10px; padding: 7px 12px;
          font-size: 0.82rem; font-weight: 700;
          cursor: pointer; width: 100%; transition: background 0.18s;
        }
        .doodle-action-btn:hover { background: rgba(255,255,255,0.13); }
        .doodle-divider {
          height: 1px; background: rgba(255,255,255,0.1); margin: 2px 0;
        }
        .doodle-label {
          font-size: 0.65rem; font-weight: 700;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase; letter-spacing: 1.2px;
          margin-bottom: 2px;
        }
      `}</style>

      {/* ── Canvas Overlay (only when open) ── */}
      {isOpen && (
        <canvas
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          style={{
            position:    'fixed',
            top:         0,
            left:        0,
            width:       '100vw',
            height:      '100vh',
            background:  'rgba(0,0,0,0.04)',
            cursor:      'crosshair',
            zIndex:      9999,
            touchAction: 'none',
          }}
        />
      )}

      {/* ── Toolbar (visible when open) ── */}
      {isOpen && (
        <div style={toolbarStyle}>

          {/* Pen Size */}
          <div className="doodle-label">Pen Size</div>
          <div className="doodle-btn-row">
            {STROKE_SIZES.map(s => (
              <button
                key={s.label}
                className={`doodle-size-btn ${strokeWidth === s.width ? 'active' : ''}`}
                onClick={() => setStrokeWidth(s.width)}
                title={`${s.label} pen`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Pen Color */}
          <div className="doodle-label" style={{ marginTop: 4 }}>Color</div>
          <div className="doodle-btn-row">
            {PEN_COLORS.map(c => (
              <button
                key={c.color}
                className={`doodle-color-btn ${penColor === c.color ? 'active' : ''}`}
                style={{ background: c.color }}
                onClick={() => setPenColor(c.color)}
                title={c.label}
              />
            ))}
          </div>

          <div className="doodle-divider" />

          {/* Clear */}
          <button className="doodle-action-btn" onClick={clearCanvas}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
            Clear Canvas
          </button>

          {/* Done */}
          <button
            className="doodle-action-btn"
            onClick={closeDoodle}
            style={{ background: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.35)', color: '#34d399' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7"/>
            </svg>
            Done
          </button>
        </div>
      )}

      {/* ── Floating Action Button ── */}
      <button
        style={fabStyle}
        onClick={() => setIsOpen(v => !v)}
        title={isOpen ? 'Close scratchpad' : 'Open scratchpad (Draw)'}
        aria-label="Toggle doodle scratchpad"
      >
        {isOpen ? (
          /* Close icon (✕) */
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          /* Pencil icon */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
          </svg>
        )}
      </button>
    </>
  );
}
