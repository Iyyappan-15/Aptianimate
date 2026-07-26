// src/pages/TechnicalInterviewTopicPage.jsx
import { TECHNICAL_INTERVIEW_SYLLABUS } from '../data/technicalInterviewSyllabus';

export default function TechnicalInterviewTopicPage({ topicSlug, navigate }) {
  const topic = TECHNICAL_INTERVIEW_SYLLABUS.find(t => t.slug === topicSlug) || null;

  if (!topic) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '80vh', color: 'var(--text-main)', textAlign: 'center', padding: '24px'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '12px' }}>Topic Not Found</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>The requested topic does not exist or has been relocated.</p>
        <button
          onClick={() => navigate('')}
          style={{
            background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px',
            padding: '10px 20px', color: 'var(--text-main)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = 'var(--violet)'}
          onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--surface2, #0f1115)', color: 'var(--text-main)' }}>
      {/* Background ambient mesh */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: `radial-gradient(circle, ${topic.color}05 0%, transparent 60%)`, filter: 'blur(60px)' }} />
      </div>

      <div className="page-wide" style={{ position: 'relative', zIndex: 1, padding: '24px 24px 80px' }}>
        
        {/* Header Bar */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '24px', padding: '16px 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '32px', boxShadow: 'var(--shadow)'
        }}>
          <button
            onClick={() => navigate('')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: '12px', padding: '8px 16px',
              color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = topic.color; e.currentTarget.style.color = topic.color; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-main)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Dashboard
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem', width: '36px', height: '36px', borderRadius: '8px', background: `${topic.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {topic.icon}
            </span>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
              {topic.title}
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="topic-grid-desktop">
          <style>{`
            @media (min-width: 1024px) {
              .topic-grid-desktop {
                grid-template-columns: 1fr 340px !important;
              }
            }
          `}</style>

          {/* Left Column: Filter Controls and Question List Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Filter controls block (Layout preparation for future logic) */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column',
              gap: '20px', boxShadow: 'var(--shadow)'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)' }}>
                  Filters & Controls
                </h3>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', background: 'var(--surface2)', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  Read Only Mode
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="filters-responsive">
                <style>{`
                  @media (min-width: 768px) {
                    .filters-responsive {
                      grid-template-columns: 1fr 180px 180px !important;
                    }
                  }
                `}</style>

                {/* Search Bar Placeholder */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    disabled
                    placeholder="Search interview questions..."
                    style={{
                      width: '100%', padding: '12px 16px 12px 40px', borderRadius: '12px',
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none', cursor: 'not-allowed', opacity: 0.6
                    }}
                  />
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                </div>

                {/* Company Filter Placeholder */}
                <select
                  disabled
                  value="all"
                  onChange={() => {}}
                  style={{
                    padding: '12px 16px', borderRadius: '12px',
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none', cursor: 'not-allowed', opacity: 0.6
                  }}
                >
                  <option value="all">All Companies</option>
                  <option value="google">Google</option>
                  <option value="meta">Meta</option>
                  <option value="amazon">Amazon</option>
                  <option value="microsoft">Microsoft</option>
                </select>

                {/* Bookmarking Filter Placeholder */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 16px', borderRadius: '12px', background: 'var(--surface2)',
                  border: '1px solid var(--border)', opacity: 0.6, cursor: 'not-allowed'
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Bookmarks</span>
                  <div style={{
                    width: '36px', height: '20px', borderRadius: '10px',
                    background: 'var(--border)', position: 'relative', padding: '2px'
                  }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--muted2)' }} />
                  </div>
                </div>
              </div>

              {/* Difficulty Filter Placeholder */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                {['All Questions', 'Easy', 'Medium', 'Hard'].map((lvl, i) => (
                  <button
                    key={lvl}
                    disabled
                    style={{
                      padding: '8px 16px', borderRadius: '10px',
                      background: i === 0 ? 'var(--surface2)' : 'transparent',
                      border: i === 0 ? '1px solid var(--border)' : '1px solid transparent',
                      color: i === 0 ? 'var(--text-main)' : 'var(--muted)',
                      fontSize: '0.85rem', fontWeight: 600, cursor: 'not-allowed', opacity: 0.7
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Question List Area (Empty State) */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '24px', padding: '56px 40px', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '380px',
              boxShadow: 'var(--shadow)', position: 'relative', overflow: 'hidden'
            }}>
              {/* Subtle abstract graphics behind empty state to make it look extremely premium */}
              <div style={{
                position: 'absolute', width: '220px', height: '220px', borderRadius: '50%',
                background: `radial-gradient(circle, ${topic.color}05 0%, transparent 70%)`, pointerEvents: 'none'
              }} />

              {/* Icon Container */}
              <div style={{
                width: '80px', height: '80px', borderRadius: '24px', background: 'var(--surface2)',
                border: '1.5px solid var(--border)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '2.5rem', marginBottom: '24px', position: 'relative'
              }}>
                🛠️
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '12px' }}>
                Questions coming soon.
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto 8px' }}>
                This topic is currently being prepared.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '380px', margin: '0' }}>
                Check back later.
              </p>
            </div>
          </div>

          {/* Right Column: Progress & Syllabus Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Progress Card Placeholder */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '24px', padding: '28px', boxShadow: 'var(--shadow)'
            }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: '0 0 18px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📊 Progress Tracking
              </h3>
              
              <div style={{ background: 'var(--surface2)', borderRadius: '16px', padding: '16px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)', marginBottom: '8px' }}>
                  <span>Completion Status</span>
                  <span>0%</span>
                </div>
                
                {/* Progress Bar Container */}
                <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{ width: '0%', height: '100%', background: topic.color }} />
                </div>
                
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>
                  0 of 0 questions solved
                </div>
              </div>
            </div>

            {/* Concepts Covered Card Placeholder */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '24px', padding: '28px', boxShadow: 'var(--shadow)'
            }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: '0 0 16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                💡 Topic Overview
              </h3>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 16px' }}>
                Preparing comprehensive interview resources containing concepts, explanations, and visual coding walk-throughs.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Topic Status</span>
                  <span style={{ color: '#f59e0b', fontWeight: 700 }}>In Development</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Pillar</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Technical Prep</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Est. Difficulty</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Variable</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
