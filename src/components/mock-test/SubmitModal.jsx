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
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(12px)',
        animation: 'modalFadeIn 0.25s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--card)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '28px',
          padding: '40px',
          maxWidth: '480px',
          width: '92%',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Glow Background */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: isFullyAnswered 
            ? 'radial-gradient(circle at center, rgba(34,197,94,0.08) 0%, transparent 60%)'
            : 'radial-gradient(circle at center, rgba(239,68,68,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            background: isFullyAnswered ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${isFullyAnswered ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            fontSize: '2.5rem',
            boxShadow: isFullyAnswered ? '0 0 30px rgba(34,197,94,0.2)' : '0 0 30px rgba(239,68,68,0.2)',
          }}>
            {isFullyAnswered ? '✅' : '⚠️'}
          </div>

          {/* Title */}
          <h2 style={{
            margin: '0 0 12px 0',
            textAlign: 'center',
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.5px'
          }}>
            {isFullyAnswered ? 'Ready to Submit?' : 'Are you sure?'}
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--muted)',
            fontSize: '1rem',
            margin: '0 0 32px 0',
            lineHeight: 1.6,
          }}>
            Once submitted, you cannot change your answers.
          </p>

          {/* Progress visual */}
          <div style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '28px',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
          }}>
            {/* Bar */}
            <div style={{
              height: '10px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '99px',
              overflow: 'hidden',
              marginBottom: '20px',
            }}>
              <div style={{
                height: '100%',
                width: `${answeredPct}%`,
                background: isFullyAnswered
                  ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                  : 'linear-gradient(90deg, #f59e0b, #d97706)',
                borderRadius: '99px',
                transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
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
                  <div style={{ fontWeight: 900, fontSize: '1.6rem', color: s.color, marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Warning if unanswered */}
          {unansweredCount > 0 && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '16px',
              padding: '14px 20px',
              marginBottom: '32px',
              color: '#f87171',
              fontWeight: 600,
              fontSize: '0.9rem',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span>❌</span> {unansweredCount} question{unansweredCount !== 1 ? 's' : ''} will be marked as unattempted.
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '16px',
                borderRadius: '14px',
                border: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text)',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '1rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                flex: 1,
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(239,68,68,0.35)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(239,68,68,0.45)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(239,68,68,0.35)';
              }}
            >
              Yes, Submit →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn { from { opacity: 0; backdrop-filter: blur(0px); } to { opacity: 1; backdrop-filter: blur(12px); } }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
}
