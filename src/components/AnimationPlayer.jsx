// src/components/AnimationPlayer.jsx
// Core animation engine: auto-play, manual step, speed control, keyboard nav

import { useState, useEffect, useRef, useCallback } from 'react';
import StepRenderer from './StepRenderer';
import { stepDurationMs } from '../utils/animationHelpers';

export default function AnimationPlayer({ animationScript, conceptSummary, formula, verification, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);
  const steps = animationScript || [];

  const clearTimer = () => { if (timerRef.current) clearInterval(timerRef.current); };

  const goToStep = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, steps.length - 1));
    setCurrentStep(clamped);
    if (clamped === steps.length - 1) {
      setFinished(true);
      setIsPlaying(false);
      clearTimer();
      if (onComplete) onComplete();
    }
  }, [steps.length, onComplete]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => {
      const next = prev + 1;
      if (next >= steps.length) {
        setFinished(true);
        setIsPlaying(false);
        clearTimer();
        if (onComplete) onComplete();
        return prev;
      }
      return next;
    });
  }, [steps.length, onComplete]);

  // Auto-play engine
  useEffect(() => {
    clearTimer();
    if (!isPlaying || finished) return;
    const step = steps[currentStep];
    if (!step) return;
    const ms = stepDurationMs(step.duration_seconds || 3, speed);
    timerRef.current = setTimeout(() => { nextStep(); }, ms);
    return clearTimer;
  }, [isPlaying, currentStep, speed, finished, nextStep]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') { clearTimer(); nextStep(); }
      if (e.key === 'ArrowLeft') { clearTimer(); goToStep(currentStep - 1); }
      if (e.key === ' ') { e.preventDefault(); setIsPlaying(p => !p); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentStep, nextStep, goToStep]);

  const handlePlay = () => { setIsPlaying(true); setFinished(false); };
  const handlePause = () => { setIsPlaying(false); clearTimer(); };
  const handleReplay = () => {
    clearTimer();
    setCurrentStep(0);
    setFinished(false);
    setTimeout(() => setIsPlaying(true), 100);
  };

  const step = steps[currentStep];
  const progress = steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  if (!steps.length) {
    return (
      <div className="animation-panel">
        <div className="anim-header"><span className="anim-title">No animation available</span></div>
      </div>
    );
  }

  return (
    <div className="animation-panel">
      {/* Header */}
      <div className="anim-header">
        <div>
          <div className="anim-title">🎬 Step-by-Step Explanation</div>
        </div>
        <span className="step-badge">Step {currentStep + 1} / {steps.length}</span>
      </div>

      {/* Progress bar */}
      <div className="anim-progress-bar">
        <div className="anim-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Visual Build-up Stage */}
      <div className="anim-steps-container" style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '0 8px 24px' }}>
        
        {/* SINGLE PINNED STAGE */}
        <div className="anim-stage" style={{ minHeight: 'unset', padding: '20px 12px', margin: 0, position: 'sticky', top: 0, zIndex: 10, background: 'var(--surface)', overflow: 'visible' }}>
          <StepRenderer step={steps[currentStep]} isActive={true} />
        </div>

        {/* SCROLLING TRANSCRIPT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {steps.slice(0, currentStep + 1).map((s, idx) => {
            const isLatest = idx === currentStep;
            return (
              <div key={`${idx}-${s.visual_type}`} style={{
                animation: 'fadeIn 0.6s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                opacity: isLatest ? 1 : 0.6,
                transition: 'opacity 0.4s ease'
              }}>
                <div className="step-info" style={{ marginTop: 0, margin: 0 }}>
                  <div className="step-info-title">
                    <StepBadge num={idx + 1} /> {s.step_title || s.title || `Step ${idx + 1}`}
                  </div>
                  <div className="step-info-text">{s.explanation}</div>
                  {s.analogy && (
                    <div style={{
                      marginTop: 8, padding: '8px 12px',
                      background: 'rgba(239,159,39,0.07)', borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem', color: 'var(--amber)'
                    }}>
                      💡 {s.analogy}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="anim-controls">
        {/* Replay */}
        <button className="btn btn-ghost btn-sm btn-icon" onClick={handleReplay} title="Replay (R)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        {/* Center controls */}
        <div className="anim-ctrl-center">
          <button
            className="btn btn-ghost btn-sm btn-icon"
            onClick={() => { clearTimer(); goToStep(currentStep - 1); }}
            disabled={currentStep === 0}
            title="Previous (←)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {isPlaying ? (
            <button className="btn btn-primary btn-sm" onClick={handlePause} title="Pause (Space)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              </svg>
              Pause
            </button>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={handlePlay} title="Play (Space)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {finished ? 'Replay' : 'Play'}
            </button>
          )}

          <button
            className="btn btn-ghost btn-sm btn-icon"
            onClick={() => { clearTimer(); nextStep(); }}
            disabled={finished && currentStep === steps.length - 1}
            title="Next (→)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Speed */}
        <div className="anim-ctrl-right">
          <select
            className="speed-select"
            value={speed}
            onChange={e => setSpeed(Number(e.target.value))}
            title="Playback Speed"
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </div>
      </div>

      {/* Concept Summary */}
      {finished && conceptSummary && (
        <div className="concept-summary" style={{ margin: '0 16px 16px', animation: 'slideUp 0.5s ease' }}>
          <div className="concept-summary-label">✨ Key Concept</div>
          <div className="concept-summary-text">{conceptSummary}</div>
        </div>
      )}

      {/* Formula & Verification */}
      {finished && (formula || verification) && (
        <div className="verification-panel" style={{ margin: '0 16px 16px', padding: '16px', background: 'var(--surface2)', borderRadius: '16px', border: '1px solid var(--border)', animation: 'slideUp 0.6s ease' }}>
          {formula && (
            <div style={{ marginBottom: verification ? '16px' : '0' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-sec)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                📐 Applied Formula
              </div>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontFamily: 'monospace', padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px dashed var(--border)' }}>
                {formula}
              </div>
            </div>
          )}
          {verification && verification.verified && (
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-sec)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                ✅ AI Verification
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', padding: '12px', background: 'var(--bg)', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--teal)' }}>1️⃣</span> <span>{verification.method1}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--violet)' }}>2️⃣</span> <span>{verification.method2}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StepBadge({ num }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 20, height: 20, borderRadius: '50%',
      background: 'var(--violet)', color: '#fff',
      fontSize: '0.65rem', fontWeight: 800, marginRight: 6
    }}>{num}</span>
  );
}
