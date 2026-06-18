// src/components/QuestionCard.jsx
import { useState } from 'react';
import BookmarkButton from './BookmarkButton';

export default function QuestionCard({
  question, onSubmit, submitted, selectedOption, onOptionSelect
}) {
  if (!question) return null;
  const { options, correct_answer } = question;

  const getOptionClass = (key) => {
    if (!submitted) return selectedOption === key ? 'option-btn selected' : 'option-btn';
    if (key === correct_answer) return 'option-btn correct';
    if (key === selectedOption && key !== correct_answer) return 'option-btn wrong';
    return 'option-btn';
  };

  return (
    <div className="question-card">
      {/* Header */}
      <div className="qc-header">
        <div>
          <div className="qc-meta">
            <span className="qc-concept">{question.concept_name}</span>
            <DiffBadge diff={question.difficulty} />
          </div>
        </div>
        <BookmarkButton questionId={question.id} />
      </div>

      {/* Question */}
      <div className="qc-question">{question.question_text}</div>

      {/* Options */}
      <div className="options-grid">
        {Object.entries(options).map(([key, val]) => (
          <button
            key={key}
            className={getOptionClass(key)}
            onClick={() => !submitted && onOptionSelect(key)}
            disabled={submitted}
          >
            <span className="opt-letter">{key}</span>
            <span>{val}</span>
            {submitted && key === correct_answer && (
              <span style={{ marginLeft: 'auto', color: 'var(--teal)' }}>✓</span>
            )}
            {submitted && key === selectedOption && key !== correct_answer && (
              <span style={{ marginLeft: 'auto', color: 'var(--coral)' }}>✗</span>
            )}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="qc-actions">
        {!submitted ? (
          <button
            className="btn btn-primary"
            onClick={() => selectedOption && onSubmit(selectedOption)}
            disabled={!selectedOption}
          >
            Submit Answer
          </button>
        ) : (
          <div style={{
            padding: '10px 16px', borderRadius: 'var(--radius-sm)',
            background: selectedOption === correct_answer
              ? 'rgba(29,158,117,0.1)' : 'rgba(216,90,48,0.1)',
            border: `1px solid ${selectedOption === correct_answer ? 'var(--teal)' : 'var(--coral)'}`,
            fontSize: '0.875rem', fontWeight: 600,
            color: selectedOption === correct_answer ? 'var(--teal)' : 'var(--coral)',
            animation: 'slideDown 0.3s ease'
          }}>
            {selectedOption === correct_answer
              ? '🎉 Correct! Watch the explanation below.'
              : `❌ Not quite. Correct answer: ${correct_answer}. See explanation ↓`}
          </div>
        )}
      </div>
    </div>
  );
}

function DiffBadge({ diff }) {
  const cls = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' }[diff] || 'badge-easy';
  return <span className={`badge ${cls}`}>{diff}</span>;
}
