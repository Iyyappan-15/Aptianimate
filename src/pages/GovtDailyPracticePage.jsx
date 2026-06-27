// src/pages/GovtDailyPracticePage.jsx
export default function GovtDailyPracticePage({ navigate }) {
  return (
    <div className="page" style={{ animation: 'fadeIn 0.4s ease', padding: '32px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <button className="topic-back-btn" onClick={() => history.back()}>
        ← Back to Roadmap
      </button>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ fontSize: '2.5rem' }}>⚡</span>
          Daily Practice
        </h1>
        <p style={{ color: 'var(--text-sec)' }}>
          15 random PYQs selected fresh every day. Stay sharp.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
        <div style={{ padding: '16px 24px', background: 'rgba(59,130,246,0.1)', border: '1px solid #3b82f6', borderRadius: '12px', textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#3b82f6' }}>5</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-sec)', textTransform: 'uppercase' }}>Quant</div>
        </div>
        <div style={{ padding: '16px 24px', background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', borderRadius: '12px', textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f59e0b' }}>5</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-sec)', textTransform: 'uppercase' }}>Reasoning</div>
        </div>
        <div style={{ padding: '16px 24px', background: 'rgba(16,185,129,0.1)', border: '1px solid #10b981', borderRadius: '12px', textAlign: 'center', flex: 1 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>5</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-sec)', textTransform: 'uppercase' }}>English</div>
        </div>
      </div>

      <div style={{ 
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', 
        padding: '60px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' 
      }}>
        <div style={{ fontSize: '3rem' }}>🎲</div>
        <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-main)' }}>Generating Today's Set...</h3>
        <p style={{ color: 'var(--text-sec)', maxWidth: '400px', margin: 0, lineHeight: 1.6 }}>
          We are building the randomizer engine to pull 15 fresh questions from the PYQ database daily.
        </p>
        <button 
          onClick={() => navigate('govt-pyq')}
          style={{ 
            marginTop: '16px', padding: '12px 24px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface2)',
            color: 'var(--text-main)', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = 'var(--violet)'}
          onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          Browse All PYQs instead
        </button>
      </div>
    </div>
  );
}
