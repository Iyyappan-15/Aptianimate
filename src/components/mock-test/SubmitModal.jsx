/**
 * SubmitModal.jsx — Premium confirmation dialog before final submission.
 */
export default function SubmitModal({ unansweredCount, totalQuestions, onConfirm, onCancel }) {
  const answeredCount = totalQuestions - unansweredCount;
  const answeredPct = Math.round((answeredCount / totalQuestions) * 100);
  const isFullyAnswered = unansweredCount === 0;

  return (
    <div
      onClick={onCancel}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(6px)',
        animation: 'modalFadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          padding: '40px 36px',
          maxWidth: '460px',
          width: '92%',
          boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
          animation: 'modalSlideUp 0.25s ease',
        }}
      >
        {/* Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: isFullyAnswered ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.12)',
          border: `2px solid ${isFullyAnswered ? '#22c55e' : '#f59e0b'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
          fontSize: '2rem',
        }}>
          {isFullyAnswered ? '✅' : '⚠️'}
        </div>

        {/* Title */}
        <h2 style={{
          margin: '0 0 8px 0',
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 900,
          color: 'var(--text)',
        }}>
          Submit Test?
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--muted)',
          fontSize: '0.9rem',
          margin: '0 0 28px 0',
          lineHeight: 1.6,
        }}>
          Once submitted, you cannot change your answers.
        </p>

        {/* Progress visual */}
        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px',
        }}>
          {/* Bar */}
          <div style={{
            height: '8px',
            background: 'var(--border)',
            borderRadius: '99px',
            overflow: 'hidden',
            marginBottom: '14px',
          }}>
            <div style={{
              height: '100%',
              width: `${answeredPct}%`,
              background: isFullyAnswered
                ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                : 'linear-gradient(90deg, #f59e0b, #d97706)',
              borderRadius: '99px',
              transition: 'width 0.6s ease',
            }} />
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {[
              { label: 'Answered', value: answeredCount, color: '#22c55e' },
              { label: 'Unanswered', value: unansweredCount, color: unansweredCount > 0 ? '#ef4444' : 'var(--muted)' },
              { label: 'Total', value: totalQuestions, color: 'var(--violet)' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '1.4rem', color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning if unanswered */}
        {unansweredCount > 0 && (
          <div style={{
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '24px',
            color: '#dc2626',
            fontWeight: 600,
            fontSize: '0.85rem',
            textAlign: 'center',
          }}>
            ❌ {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} will be marked as unattempted.
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: '12px',
              border: '2px solid var(--border)',
              background: 'transparent',
              color: 'var(--text)',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.95rem',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: '0 4px 16px rgba(239,68,68,0.35)',
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
            Yes, Submit →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}
