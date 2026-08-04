/**
 * QuestionPalette.jsx
 * The side panel grid showing question numbers 1-50.
 * Colors: 🟩 Answered | 🟪 Marked for Review | ⬜ Not Answered | 🟨 Current
 */
export default function QuestionPalette({
  questions,
  answers,
  marked,
  currentIndex,
  onNavigate,
}) {
  const getStatus = (q, index) => {
    if (index === currentIndex) return 'current';
    if (marked[q.id]) return 'marked';
    if (answers[q.id]) return 'answered';
    return 'unanswered';
  };

  const statusStyles = {
    current: {
      background: '#f59e0b',
      color: '#fff',
      border: '2px solid #d97706',
      fontWeight: 700,
    },
    answered: {
      background: '#22c55e',
      color: '#fff',
      border: '2px solid #16a34a',
    },
    marked: {
      background: '#8b5cf6',
      color: '#fff',
      border: '2px solid #7c3aed',
    },
    unanswered: {
      background: 'var(--card)',
      color: 'var(--text)',
      border: '2px solid var(--border)',
    },
  };

  const answered = Object.keys(answers).length;
  const markedCount = Object.keys(marked).length;
  const unanswered = questions.length - answered;

  return (
    <div
      style={{
        width: '220px',
        flexShrink: 0,
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '16px',
        height: 'fit-content',
        position: 'sticky',
        top: '90px',
      }}
    >
      <h3
        style={{
          margin: '0 0 14px 0',
          fontSize: '0.85rem',
          fontWeight: 700,
          color: 'var(--text)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        Question Palette
      </h3>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '14px', fontSize: '0.72rem', color: 'var(--muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 14, height: 14, background: '#22c55e', borderRadius: 3 }} /> Answered ({answered})
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 14, height: 14, background: 'var(--card)', border: '2px solid var(--border)', borderRadius: 3 }} /> Not Answered ({unanswered})
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 14, height: 14, background: '#f59e0b', borderRadius: 3 }} /> Current
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 14, height: 14, background: '#8b5cf6', borderRadius: 3 }} /> Marked ({markedCount})
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '6px',
        }}
      >
        {questions.map((q, i) => {
          const status = getStatus(q, i);
          return (
            <button
              key={q.id}
              onClick={() => onNavigate(i)}
              title={`Q${i + 1}: ${status}`}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'transform 0.1s ease',
                ...statusStyles[status],
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
