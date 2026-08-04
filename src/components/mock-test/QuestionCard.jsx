/**
 * QuestionCard.jsx
 * Displays a single MCQ with 4 options.
 * Actions: Save & Next | Mark for Review | Clear Response
 */
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
  onNext,
  onSaveAndNext,
  isFirst,
  isLast,
}) {
  const optionLabels = ['A', 'B', 'C', 'D'];

  const optionStyle = (label) => {
    const isSelected = selectedAnswer === label;
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      borderRadius: '10px',
      border: `2px solid ${isSelected ? 'var(--violet)' : 'var(--border)'}`,
      background: isSelected ? 'rgba(139,92,246,0.08)' : 'var(--card)',
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      color: 'var(--text)',
      fontWeight: isSelected ? 600 : 400,
      textAlign: 'left',
    };
  };

  const labelStyle = (label) => {
    const isSelected = selectedAnswer === label;
    return {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      fontWeight: 700,
      fontSize: '0.85rem',
      background: isSelected ? 'var(--violet)' : 'var(--border)',
      color: isSelected ? '#fff' : 'var(--muted)',
      transition: 'all 0.15s ease',
    };
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header: Q number + section info */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'var(--violet)',
        borderRadius: '12px',
        color: '#fff',
      }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
          Question {questionNumber} of {totalQuestions}
        </span>
        <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>
          Section: Aptitude | Marks: 1
        </span>
        <span style={{
          fontSize: '0.8rem',
          background: isMarked ? '#f59e0b' : 'rgba(255,255,255,0.2)',
          padding: '3px 10px',
          borderRadius: '20px',
          fontWeight: 600,
          transition: 'background 0.2s',
        }}>
          {isMarked ? '🔖 Marked' : 'Not Marked'}
        </span>
      </div>

      {/* Question text */}
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '24px',
      }}>
        <p style={{
          margin: 0,
          fontSize: '1.05rem',
          lineHeight: 1.7,
          color: 'var(--text)',
          fontWeight: 500,
        }}>
          {question.question}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {optionLabels.map((label) => (
          <button
            key={label}
            onClick={() => onSelectAnswer(question.id, label)}
            style={optionStyle(label)}
            onMouseEnter={e => {
              if (selectedAnswer !== label) {
                e.currentTarget.style.borderColor = 'var(--violet)';
                e.currentTarget.style.background = 'rgba(139,92,246,0.04)';
              }
            }}
            onMouseLeave={e => {
              if (selectedAnswer !== label) {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.background = 'var(--card)';
              }
            }}
          >
            <div style={labelStyle(label)}>{label}</div>
            <span style={{ fontSize: '0.95rem' }}>{question.options[label]}</span>
          </button>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        borderTop: '1px solid var(--border)',
        paddingTop: '16px',
        marginTop: 'auto',
      }}>
        <button
          onClick={() => onToggleMark(question.id)}
          style={{
            padding: '9px 18px',
            borderRadius: '8px',
            border: `2px solid ${isMarked ? '#f59e0b' : 'var(--border)'}`,
            background: isMarked ? '#fef3c7' : 'transparent',
            color: isMarked ? '#92400e' : 'var(--muted)',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
            transition: 'all 0.15s',
          }}
        >
          🔖 {isMarked ? 'Unmark Review' : 'Mark for Review'}
        </button>

        <button
          onClick={() => onClearAnswer(question.id)}
          disabled={!selectedAnswer}
          style={{
            padding: '9px 18px',
            borderRadius: '8px',
            border: '2px solid var(--border)',
            background: 'transparent',
            color: selectedAnswer ? 'var(--muted)' : 'var(--border)',
            cursor: selectedAnswer ? 'pointer' : 'not-allowed',
            fontWeight: 600,
            fontSize: '0.85rem',
            transition: 'all 0.15s',
          }}
        >
          ✕ Clear Response
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button
            onClick={onPrev}
            disabled={isFirst}
            style={{
              padding: '9px 20px',
              borderRadius: '8px',
              border: '2px solid var(--border)',
              background: 'transparent',
              color: isFirst ? 'var(--border)' : 'var(--text)',
              cursor: isFirst ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}
          >
            ← Previous
          </button>

          <button
            onClick={onSaveAndNext}
            style={{
              padding: '9px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--violet)',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.85rem',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            {isLast ? '✓ Review & Submit' : 'Save & Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
