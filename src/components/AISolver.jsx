// src/components/AISolver.jsx
// ─────────────────────────────────────────────────────────────────
//  Drop-in AI Solver for any TopicPage.
//  Uses the same AnimationPlayer + StepRenderer engine that powers
//  the visual demos — so what users see in the demo is exactly
//  what they get when they submit a real question.
// ─────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { parseUserQuestion } from '../api/groqApi';
import AnimationPlayer from './AnimationPlayer';

const STATES = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' };

export default function AISolver({ topicColor = 'var(--violet)', topicName = '' }) {
  const [state, setState] = useState(STATES.IDLE);
  const [userQuestion, setUserQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showFollowUp, setShowFollowUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = userQuestion.trim();
    if (!q) return;

    setState(STATES.LOADING);
    setResult(null);
    setErrorMsg('');
    setShowFollowUp(false);

    try {
      const data = await parseUserQuestion(q);
      setResult(data);
      setState(STATES.SUCCESS);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setState(STATES.ERROR);
    }
  };

  const handleReset = () => {
    setState(STATES.IDLE);
    setUserQuestion('');
    setResult(null);
    setErrorMsg('');
    setShowFollowUp(false);
  };

  const handleFollowUp = async (q) => {
    setUserQuestion(q.question);
    setState(STATES.LOADING);
    setResult(null);
    setShowFollowUp(false);
    try {
      const data = await parseUserQuestion(q.question);
      setResult(data);
      setState(STATES.SUCCESS);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setState(STATES.ERROR);
    }
  };

  return (
    <div className="ai-solver">

      {/* ── Question Input (always visible when idle or error) ── */}
      {(state === STATES.IDLE || state === STATES.ERROR) && (
        <form className="ai-solver-form" onSubmit={handleSubmit}>
          <div className="ai-solver-input-wrap">
            <textarea
              className="ai-solver-textarea"
              placeholder={`Ask any ${topicName} question...\ne.g. "A can do a work in 10 days, B in 15 days. Together in how many days?"`}
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              rows={4}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleSubmit(e);
                }
              }}
            />
            <div className="ai-solver-hint">Press Ctrl + Enter to submit</div>
          </div>

          {state === STATES.ERROR && (
            <div className="ai-solver-error">
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="ai-solver-submit"
            style={{ '--solver-color': topicColor }}
            disabled={!userQuestion.trim()}
          >
            <span>✨ Solve Visually</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      )}

      {/* ── Loading State ── */}
      {state === STATES.LOADING && (
        <div className="ai-solver-loading">
          <div className="ai-thinking-dots">
            <span /><span /><span />
          </div>
          <p className="ai-thinking-text">
            🧠 AI is solving your question visually...
          </p>
          <div className="ai-question-preview">"{userQuestion.length > 100 ? userQuestion.slice(0, 100) + '...' : userQuestion}"</div>
        </div>
      )}

      {/* ── Result Panel ── */}
      {state === STATES.SUCCESS && result && (
        <div className="ai-solver-result" style={{ animation: 'fadeIn 0.5s ease' }}>

          {/* Question metadata bar */}
          <div className="ai-result-meta">
            <span className="ai-meta-tag ai-meta-category">📂 {result.category}</span>
            <span className="ai-meta-tag ai-meta-concept">💡 {result.concept_name}</span>
            <span className={`ai-meta-tag ai-meta-diff ai-diff-${(result.difficulty || 'medium').toLowerCase()}`}>
              {result.difficulty === 'Easy' ? '🟢' : result.difficulty === 'Hard' ? '🔴' : '🟡'} {result.difficulty}
            </span>
          </div>

          {/* The cleaned question text */}
          <div className="ai-result-question">
            <span className="ai-result-q-label">Q</span>
            <p>{result.question_text}</p>
          </div>

          {/* Options */}
          {result.options && (
            <div className="ai-result-options">
              {Object.entries(result.options).map(([key, val]) => (
                <div
                  key={key}
                  className={`ai-option ${result.correct_answer === key ? 'ai-option-correct' : ''}`}
                >
                  <span className="ai-option-key">{key}</span>
                  <span className="ai-option-val">{val}</span>
                  {result.correct_answer === key && (
                    <span className="ai-option-tick">✓</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Animation Player — the real visual engine */}
          {result.animation_script?.length > 0 && (
            <div className="ai-animation-wrap">
              <AnimationPlayer
                animationScript={result.animation_script}
                conceptSummary={result.concept_summary}
                onComplete={() => setTimeout(() => setShowFollowUp(true), 800)}
              />
            </div>
          )}

          {/* Final Answer Banner */}
          <div className="ai-final-answer" style={{ '--solver-color': topicColor }}>
            <div className="ai-final-icon">🎯</div>
            <div>
              <div className="ai-final-label">Correct Answer</div>
              <div className="ai-final-value">
                Option {result.correct_answer}: {result.options?.[result.correct_answer]}
              </div>
            </div>
          </div>

          {/* Concept Summary */}
          {result.concept_summary && (
            <div className="ai-concept-tip">
              <span>💡</span>
              <span>{result.concept_summary}</span>
            </div>
          )}

          {/* Follow-up Questions */}
          {showFollowUp && result.follow_up_questions?.length > 0 && (
            <div className="ai-followup" style={{ animation: 'slideUp 0.5s ease' }}>
              <div className="ai-followup-label">🔁 Try a Similar Question</div>
              <div className="ai-followup-list">
                {result.follow_up_questions.slice(0, 2).map((q, i) => (
                  <button
                    key={i}
                    className="ai-followup-btn"
                    onClick={() => handleFollowUp(q)}
                  >
                    {q.question.length > 90 ? q.question.slice(0, 90) + '...' : q.question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reset */}
          <button className="ai-solver-reset" onClick={handleReset}>
            ← Ask another question
          </button>
        </div>
      )}
    </div>
  );
}
