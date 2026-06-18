// src/components/HintSystem.jsx
import { useState } from 'react';
import StepRenderer from './StepRenderer';

export default function HintSystem({ question, onRevealAnswer }) {
  const [hintsUsed, setHintsUsed] = useState(0);

  if (!question) return null;

  const hint1 = `Think about which formula or concept applies for ${question.concept_name}.`;
  const hint2Step = question.animation_script?.[0];
  const hint3 = `The correct answer is Option ${question.correct_answer}.`;

  const useHint = () => setHintsUsed(p => Math.min(p + 1, 3));

  return (
    <div className="hint-panel">
      <div className="hint-header">
        <div className="hint-title">💡 Hint System</div>
        <div className="hint-dots">
          <div className={`hint-dot ${hintsUsed >= 1 ? 'used' : ''}`} />
          <div className={`hint-dot ${hintsUsed >= 2 ? 'used' : ''}`} />
          <div className={`hint-dot ${hintsUsed >= 3 ? 'used' : ''}`} />
        </div>
      </div>

      {hintsUsed >= 1 && (
        <div className="hint-card">
          <div className="label">Hint 1: Concept</div>
          {hint1}
        </div>
      )}

      {hintsUsed >= 2 && hint2Step && (
        <div className="hint-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="label" style={{ padding: '14px 16px 0' }}>Hint 2: First Step</div>
          <div style={{ pointerEvents: 'none', transform: 'scale(0.85)', transformOrigin: 'top center', marginBottom: -20 }}>
            <StepRenderer step={hint2Step} isActive={true} />
          </div>
        </div>
      )}

      {hintsUsed >= 3 && (
        <div className="hint-card">
          <div className="label">Hint 3: Answer Reveal</div>
          {hint3}
        </div>
      )}

      <div className="hint-actions">
        {hintsUsed < 3 ? (
          <button className="btn btn-ghost btn-sm" onClick={useHint}>
            Get Hint {hintsUsed + 1}
          </button>
        ) : (
          <button className="btn btn-primary btn-sm" onClick={onRevealAnswer}>
            See Full Explanation
          </button>
        )}
      </div>
    </div>
  );
}
