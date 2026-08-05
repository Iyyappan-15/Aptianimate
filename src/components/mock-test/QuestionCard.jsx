/**
 * QuestionCard.jsx
 * Displays a single MCQ with 4 options.
 * Supports options as ARRAY ["opt1","opt2","opt3","opt4"] OR object {A:..., B:..., C:..., D:...}
 * Actions: Save & Next | Mark for Review | Clear Response
 */
const LABELS = ['A', 'B', 'C', 'D'];

function getOption(options, label) {
  if (!options) return '';
  // If array: A=index 0, B=index 1, etc.
  if (Array.isArray(options)) return options[LABELS.indexOf(label)] ?? '';
  // If object: direct key access
  return options[label] ?? '';
}

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isMarked,
  onSelectAnswer,
  onClearAnswer,
  onToggleMark,
  onPrev,
  onSaveAndNext,
  isFirst,
  isLast,
}) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '18px' }}>

      {/* Question meta bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span style={{
            background: 'var(--violet)',
            color: '#fff',
            borderRadius: '8px',
            padding: '4px 14px',
            fontWeight: 700,
            fontSize: '0.85rem',
            letterSpacing: '0.5px',
          }}>
            Q {questionNumber} / {totalQuestions}
          </span>
          <span style={{
            background: 'rgba(139,92,246,0.1)',
            color: 'var(--violet)',
            borderRadius: '8px',
            padding: '4px 12px',
            fontWeight: 600,
            fontSize: '0.78rem',
          }}>
            +1 Mark
          </span>
          {isMarked && (
            <span style={{
              background: '#fef3c7',
              color: '#92400e',
              borderRadius: '8px',
              padding: '4px 12px',
              fontWeight: 600,
              fontSize: '0.78rem',
            }}>
              🔖 Marked
            </span>
          )}
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
          {question.topic} · {question.difficulty}
        </span>
      </div>

      {/* Question text */}
      <div style={{
        background: 'var(--card)',
        border: '1.5px solid var(--border)',
        borderRadius: '16px',
        padding: '28px 32px',
        borderLeft: '4px solid var(--violet)',
      }}>
        <p style={{
          margin: 0,
          fontSize: '1.05rem',
          lineHeight: 1.8,
          color: 'var(--text)',
          fontWeight: 500,
        }}>
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {LABELS.map((label) => {
          const optionText = getOption(question.options, label);
          const isSelected = selectedAnswer === label;
          return (
              <button
              key={label}
              onClick={() => onSelectAnswer(question.id, label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 20px',
                borderRadius: '12px',
                border: `2px solid ${isSelected ? 'var(--violet)' : 'var(--border)'}`,
                background: isSelected ? 'var(--violet)' : 'var(--card)',
                color: isSelected ? '#fff' : 'var(--text)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                transform: isSelected ? 'translateX(4px)' : 'translateX(0)',
                boxShadow: isSelected ? '0 4px 12px rgba(139,92,246,0.3)' : 'none',
              }}
              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)';
                  e.currentTarget.style.background = 'rgba(139,92,246,0.03)';
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'var(--card)';
                }
              }}
            >
              {/* Label circle */}
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 800,
                fontSize: '0.85rem',
                background: isSelected ? '#fff' : 'transparent',
                border: `2px solid ${isSelected ? '#fff' : 'var(--border)'}`,
                color: isSelected ? 'var(--violet)' : 'var(--muted)',
                transition: 'all 0.15s ease',
              }}>
                {label}
              </div>
              <span style={{
                fontSize: '0.95rem',
                color: isSelected ? '#fff' : 'var(--text)',
                fontWeight: isSelected ? 600 : 400,
                lineHeight: 1.5,
              }}>
                {optionText || <em style={{ color: 'var(--muted)' }}>No option text</em>}
              </span>
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        borderTop: '1px solid var(--border)',
        paddingTop: '18px',
        marginTop: 'auto',
        alignItems: 'center',
      }}>
        {/* Left actions */}
        <button
          onClick={() => onToggleMark(question.id)}
          style={{
            padding: '9px 16px',
            borderRadius: '10px',
            border: `2px solid ${isMarked ? '#f59e0b' : 'var(--border)'}`,
            background: isMarked ? '#fef3c7' : 'transparent',
            color: isMarked ? '#92400e' : 'var(--muted)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.82rem',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          🔖 {isMarked ? 'Unmark' : 'Mark for Review'}
        </button>

        <button
          onClick={() => onClearAnswer(question.id)}
          disabled={!selectedAnswer}
          style={{
            padding: '9px 16px',
            borderRadius: '10px',
            border: '2px solid var(--border)',
            background: 'transparent',
            color: selectedAnswer ? 'var(--muted)' : 'var(--border)',
            cursor: selectedAnswer ? 'pointer' : 'not-allowed',
            fontWeight: 600,
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          ✕ Clear
        </button>

        {/* Right: navigation */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button
            onClick={onPrev}
            disabled={isFirst}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              border: '2px solid var(--border)',
              background: 'transparent',
              color: isFirst ? 'var(--border)' : 'var(--text)',
              cursor: isFirst ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            ← Prev
          </button>

          <button
            onClick={onSaveAndNext}
            style={{
              padding: '10px 26px',
              borderRadius: '10px',
              border: 'none',
              background: isLast
                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                : 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.85rem',
              boxShadow: '0 4px 12px rgba(139,92,246,0.3)',
              transition: 'opacity 0.15s, transform 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {isLast ? '📋 Review & Submit' : 'Save & Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
