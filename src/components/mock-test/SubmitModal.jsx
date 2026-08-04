/**
 * SubmitModal.jsx
 * Confirmation dialog before final submission.
 * Shows count of unanswered questions.
 */
export default function SubmitModal({ unansweredCount, totalQuestions, onConfirm, onCancel }) {
  const answeredCount = totalQuestions - unansweredCount;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '36px',
          maxWidth: '420px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📋</div>
        <h2 style={{ margin: '0 0 8px 0', color: 'var(--text)', fontSize: '1.4rem', fontWeight: 800 }}>
          Submit Test?
        </h2>
        <p style={{ color: 'var(--muted)', margin: '0 0 24px 0', lineHeight: 1.6 }}>
          You have answered <strong style={{ color: '#22c55e' }}>{answeredCount}</strong> question{answeredCount !== 1 ? 's' : ''}.
        </p>

        {unansweredCount > 0 && (
          <div style={{
            background: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: '#92400e',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}>
            ⚠️ You still have <strong>{unansweredCount}</strong> unanswered question{unansweredCount !== 1 ? 's' : ''}.
          </div>
        )}

        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: '0 0 24px 0' }}>
          Once submitted, you cannot change your answers.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '11px 28px',
              borderRadius: '10px',
              border: '2px solid var(--border)',
              background: 'transparent',
              color: 'var(--text)',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.95rem',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '11px 28px',
              borderRadius: '10px',
              border: 'none',
              background: '#ef4444',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.95rem',
            }}
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );
}
