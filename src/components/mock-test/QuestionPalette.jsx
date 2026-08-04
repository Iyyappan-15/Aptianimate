/**
 * QuestionPalette.jsx
 * Side panel grid showing question numbers 1-50.
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

  const answered = Object.keys(answers).length;
  const markedCount = Object.keys(marked).length;
  const unanswered = questions.length - answered;

  const statusConfig = {
    current:    { bg: '#f59e0b', color: '#fff', shadow: '0 2px 8px rgba(245,158,11,0.5)' },
    answered:   { bg: '#22c55e', color: '#fff', shadow: '0 2px 8px rgba(34,197,94,0.4)' },
    marked:     { bg: '#8b5cf6', color: '#fff', shadow: '0 2px 8px rgba(139,92,246,0.4)' },
    unanswered: { bg: 'transparent', color: 'var(--muted)', shadow: 'none', border: '1.5px solid var(--border)' },
  };

  return (
    <div style={{
      width: '210px',
      flexShrink: 0,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '18px',
      padding: '20px',
      height: 'fit-content',
      position: 'sticky',
      top: '80px',
    }}>
      <h3 style={{
        margin: '0 0 16px 0',
        fontSize: '0.78rem',
        fontWeight: 700,
        color: 'var(--muted)',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
      }}>
        Question Palette
      </h3>

      {/* Summary bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px',
        marginBottom: '16px',
      }}>
        {[
          { label: 'Answered', value: answered, color: '#22c55e' },
          { label: 'Not Done', value: unanswered, color: '#94a3b8' },
          { label: 'Marked', value: markedCount, color: '#8b5cf6' },
          { label: 'Total', value: questions.length, color: 'var(--violet)' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--bg)',
            borderRadius: '10px',
            padding: '8px 10px',
            textAlign: 'center',
            border: '1px solid var(--border)',
          }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '1px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {[
          { color: '#22c55e', label: 'Answered' },
          { color: '#f59e0b', label: 'Current' },
          { color: '#8b5cf6', label: 'Marked' },
          { color: 'var(--border)', label: 'Not Attempted', isOutline: true },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'var(--muted)' }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '3px',
              background: l.isOutline ? 'transparent' : l.color,
              border: l.isOutline ? `2px solid ${l.color}` : 'none',
              flexShrink: 0,
            }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '14px' }} />

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '5px',
      }}>
        {questions.map((q, i) => {
          const status = getStatus(q, i);
          const cfg = statusConfig[status];
          return (
            <button
              key={q.id}
              onClick={() => onNavigate(i)}
              title={`Q${i + 1}`}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '7px',
                fontSize: '0.7rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: cfg.border || 'none',
                background: cfg.bg,
                color: cfg.color,
                boxShadow: cfg.shadow,
                transition: 'transform 0.1s ease, opacity 0.1s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.2)';
                e.currentTarget.style.opacity = '0.85';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
