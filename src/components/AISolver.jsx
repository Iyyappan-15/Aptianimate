// src/components/AISolver.jsx
// ─────────────────────────────────────────────────────────────────
//  Drop-in AI Solver for any TopicPage.
//  Uses the same AnimationPlayer + StepRenderer engine that powers
//  the visual demos — so what users see in the demo is exactly
//  what they get when they submit a real question.
// ─────────────────────────────────────────────────────────────────

import { useState, useRef } from 'react';
import { parseUserQuestion } from '../api/groqApi';
import AnimationPlayer from './AnimationPlayer';

const STATES = { IDLE: 'idle', LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' };

export default function AISolver({ topicColor = 'var(--violet)', topicName = '' }) {
  const [state, setState] = useState(STATES.IDLE);
  const [userQuestion, setUserQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // ── Image Upload state ────────────────────────────────────────
  const [imagePreview, setImagePreview]   = useState(null); // data URL for display
  const [imageBase64,  setImageBase64]    = useState(null); // compressed base64 for API
  const [isDragging, setIsDragging]       = useState(false);
  const fileInputRef = useRef(null);

  // Compress image client-side to max 1024px, JPEG 80%
  const compressImage = (file) => new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 1024;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        if (width > height) { height = Math.round(height * MAX / width); width = MAX; }
        else                { width  = Math.round(width  * MAX / height); height = MAX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.8)); // ~100-250 KB
    };
    img.src = url;
  });

  const processFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const compressed = await compressImage(file);
    setImagePreview(compressed);          // thumbnail preview
    setImageBase64(compressed);           // what we send to Gemini
  };

  const handleImageChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const q = userQuestion.trim();
    // Allow text-only OR image-only OR both
    if (!q && !imageBase64) return;

    setState(STATES.LOADING);
    setResult(null);
    setErrorMsg('');
    setShowFollowUp(false);
    setSelectedOption(null);
    setShowExplanation(false);

    try {
      // Pass imageBase64 (null when no image selected — text-only mode)
      const data = await parseUserQuestion(q, imageBase64);
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
    removeImage();
    setResult(null);
    setErrorMsg('');
    setShowFollowUp(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleFollowUp = async (q) => {
    setUserQuestion(q.question);
    setState(STATES.LOADING);
    setResult(null);
    setShowFollowUp(false);
    setSelectedOption(null);
    setShowExplanation(false);
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
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div 
              className="ai-solver-input-wrap" 
              style={{ 
                flex: 1, 
                transition: 'all 0.2s',
                borderRadius: 'var(--radius)',
                border: isDragging ? '2px dashed var(--violet)' : '2px dashed transparent',
                backgroundColor: isDragging ? 'rgba(124,58,237,0.05)' : 'transparent',
                padding: isDragging ? '4px' : '0'
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                className="ai-solver-textarea"
                placeholder={isDragging ? 'Drop image here...' : `Ask any ${topicName} question...\ne.g. "A can do a work in 10 days, B in 15 days. Together in how many days?"`}
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                rows={4}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleSubmit(e);
                  }
                }}
              />
              <div className="ai-solver-hint">
                {isDragging ? 'Drop image to upload' : 'Press Ctrl + Enter to submit'}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: imagePreview ? 'var(--violet)' : 'var(--card-bg, rgba(255,255,255,0.05))',
                  border: '1px solid var(--border)',
                  color: imagePreview ? '#fff' : 'var(--text-sec)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: imagePreview ? '0 4px 12px rgba(124,58,237,0.3)' : 'none'
                }}
                title="Upload Chart / Table"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </button>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" style={{ display: 'none' }} />
              
              {/* Image preview thumbnail below the button */}
              {imagePreview && (
                <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', border: '1.5px solid var(--violet)' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={removeImage}
                    style={{ position: 'absolute', top: 2, right: 2, width: 16, height: 16, borderRadius: '50%', background: 'rgba(239,68,68,0.9)', color: '#fff', border: 'none', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >✕</button>
                </div>
              )}
            </div>
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
            disabled={!userQuestion.trim() && !imageBase64}
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
            <span className="ai-meta-tag ai-meta-category">📂 {result.topic || result.category}</span>
            {result.subTopic && <span className="ai-meta-tag ai-meta-category">🏷️ {result.subTopic}</span>}
            <span className="ai-meta-tag ai-meta-concept">💡 {result.concept || result.concept_name}</span>
            <span className={`ai-meta-tag ai-meta-diff ai-diff-${(result.difficulty || 'medium').toLowerCase()}`}>
              {result.difficulty === 'Easy' ? '🟢' : result.difficulty === 'Hard' ? '🔴' : '🟡'} {result.difficulty}
            </span>
            {result.verification?.verified && (
              <span className="ai-meta-tag ai-meta-verified">✅ Verified</span>
            )}
          </div>

          {/* The cleaned question text */}
          <div className="ai-result-question">
            <span className="ai-result-q-label">Q</span>
            <p>{result.question_text}</p>
          </div>

          {/* Options */}
          {result.options && (
            <div className="ai-result-options">
              {Object.entries(result.options).map(([key, val]) => {
                const isSelected = selectedOption === key;
                const isCorrect = result.correct_answer === key;
                const showCorrectness = selectedOption !== null;
                
                let optionClass = 'ai-option';
                if (showCorrectness) {
                  if (isCorrect) optionClass += ' ai-option-correct';
                  else if (isSelected && !isCorrect) optionClass += ' ai-option-wrong';
                  else optionClass += ' ai-option-disabled';
                } else {
                  optionClass += ' ai-option-clickable';
                }

                return (
                  <div
                    key={key}
                    className={optionClass}
                    onClick={() => !selectedOption && setSelectedOption(key)}
                  >
                    <span className="ai-option-key">{key}</span>
                    <span className="ai-option-val">{val}</span>
                    {showCorrectness && isCorrect && <span className="ai-option-tick">✓</span>}
                    {showCorrectness && isSelected && !isCorrect && <span className="ai-option-cross">✕</span>}
                  </div>
                );
              })}
            </div>
          )}

          {/* Post-selection feedback */}
          {selectedOption && !showExplanation && (
            <div className={`ai-selection-feedback ${selectedOption === result.correct_answer ? 'correct' : 'wrong'}`} style={{ animation: 'fadeIn 0.4s ease' }}>
              <div className="feedback-message">
                {selectedOption === result.correct_answer 
                  ? '🎉 Correct! Great job.' 
                  : `Oops! Option ${selectedOption} is incorrect.`}
              </div>
              <button 
                className="ai-solver-submit" 
                style={{ '--solver-color': topicColor, marginTop: 12, width: '100%' }}
                onClick={() => setShowExplanation(true)}
              >
                <span>🎬 View Visual Explanation</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* ── Explanation Section ── */}
          {showExplanation && (
            <div className="ai-explanation-section" style={{ animation: 'slideUp 0.6s ease', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Animation Player — the real visual engine */}
              {result.animation_script?.length > 0 && (
                <div className="ai-animation-wrap">
                  <AnimationPlayer
                    animationScript={result.animation_script}
                    conceptSummary={result.concept_summary || result.concept}
                    formula={result.formula}
                    verification={result.verification}
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
