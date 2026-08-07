// src/components/AnimationPlayer.jsx
// Professional redesign: full-width visual stage → step nav dots → explanation card

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

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current); };

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
      if (e.key === 'ArrowLeft')  { clearTimer(); goToStep(currentStep - 1); }
      if (e.key === ' ')          { e.preventDefault(); setIsPlaying(p => !p); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentStep, nextStep, goToStep]);

  const handlePlay   = () => { setIsPlaying(true); setFinished(false); };
  const handlePause  = () => { setIsPlaying(false); clearTimer(); };
  const handleReplay = () => { clearTimer(); setCurrentStep(0); setFinished(false); setTimeout(() => setIsPlaying(true), 100); };

  const progress = steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;
  const step = steps[currentStep];

  if (!steps.length) {
    return (
      <div className="ap-shell">
        <div className="ap-empty">
          <span style={{ fontSize: '2.5rem' }}>🎬</span>
          <p>No visual explanation available for this step.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ap-shell">

      {/* ── HEADER BAR ─────────────────────────────── */}
      <div className="ap-header">
        <div className="ap-header-left">
          <span className="ap-icon">🎬</span>
          <span className="ap-title">Visual Explanation</span>
        </div>
        <div className="ap-header-right">
          <span className="ap-step-label">Step {currentStep + 1} of {steps.length}</span>
          <select
            className="ap-speed"
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

      {/* ── PROGRESS BAR ───────────────────────────── */}
      <div className="ap-progress-bar">
        <div className="ap-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ── VISUAL STAGE (full width, large, breathing) ─ */}
      <div className="ap-stage">
        <StepRenderer step={step} isActive={true} />
      </div>

      {/* ── STEP DOT NAVIGATION ───────────────────── */}
      <div className="ap-dot-nav">
        {steps.map((s, idx) => (
          <button
            key={idx}
            className={`ap-dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'done' : ''}`}
            onClick={() => { clearTimer(); goToStep(idx); }}
            title={s.step_title || s.title || `Step ${idx + 1}`}
          >
            {idx < currentStep ? (
              <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor">
                <polyline points="1,5 4,8 9,2" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <span>{idx + 1}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── CURRENT STEP EXPLANATION CARD ─────────── */}
      <div className="ap-explain-card" key={currentStep}>
        <div className="ap-explain-num">Step {currentStep + 1}</div>
        <div className="ap-explain-title">{step?.step_title || step?.title || `Step ${currentStep + 1}`}</div>
        <div className="ap-explain-text">{step?.explanation}</div>
        {step?.analogy && (
          <div className="ap-analogy">
            <span className="ap-analogy-icon">💡</span>
            <span>{step.analogy}</span>
          </div>
        )}
      </div>

      {/* ── PLAYBACK CONTROLS ──────────────────────── */}
      <div className="ap-controls">
        <button className="ap-ctrl-btn ap-ctrl-ghost" onClick={handleReplay} title="Replay">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        <div className="ap-ctrl-group">
          <button
            className="ap-ctrl-btn ap-ctrl-ghost"
            onClick={() => { clearTimer(); goToStep(currentStep - 1); }}
            disabled={currentStep === 0}
            title="Previous (←)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {isPlaying ? (
            <button className="ap-ctrl-btn ap-ctrl-play" onClick={handlePause} title="Pause">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              </svg>
              Pause
            </button>
          ) : (
            <button className="ap-ctrl-btn ap-ctrl-play" onClick={handlePlay} title="Play">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {finished ? 'Replay' : 'Play'}
            </button>
          )}

          <button
            className="ap-ctrl-btn ap-ctrl-ghost"
            onClick={() => { clearTimer(); nextStep(); }}
            disabled={finished && currentStep === steps.length - 1}
            title="Next (→)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="ap-ctrl-spacer" />
      </div>

      {/* ── ALL STEPS TIMELINE (visible after finishing) ── */}
      {finished && steps.length > 1 && (
        <div className="ap-timeline">
          <div className="ap-timeline-label">📋 Full Walkthrough</div>
          {steps.map((s, idx) => (
            <button
              key={idx}
              className={`ap-timeline-item ${idx === currentStep ? 'ap-timeline-active' : ''}`}
              onClick={() => { clearTimer(); goToStep(idx); setIsPlaying(false); }}
            >
              <span className="ap-timeline-num">{idx + 1}</span>
              <div className="ap-timeline-content">
                <div className="ap-timeline-item-title">{s.step_title || s.title || `Step ${idx + 1}`}</div>
                <div className="ap-timeline-item-text">{s.explanation?.slice(0, 90)}{s.explanation?.length > 90 ? '…' : ''}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── CONCEPT SUMMARY ──────────────────────── */}
      {finished && conceptSummary && (
        <div className="ap-concept">
          <span className="ap-concept-icon">✨</span>
          <div>
            <div className="ap-concept-label">Key Concept</div>
            <div className="ap-concept-text">{conceptSummary}</div>
          </div>
        </div>
      )}

      {/* ── FORMULA & VERIFICATION ───────────────── */}
      {finished && (formula || verification?.verified) && (
        <div className="ap-verify-panel">
          {formula && (
            <div className="ap-formula">
              <div className="ap-formula-label">📐 Applied Formula</div>
              <div className="ap-formula-text">{formula}</div>
            </div>
          )}
          {verification?.verified && (
            <div className="ap-verify">
              <div className="ap-verify-label">✅ AI Verification</div>
              <div className="ap-verify-body">
                {verification.method1 && <div>① {verification.method1}</div>}
                {verification.method2 && <div>② {verification.method2}</div>}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
