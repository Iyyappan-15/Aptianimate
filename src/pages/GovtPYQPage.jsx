// src/pages/GovtPYQPage.jsx
import { useState } from 'react';
import { GOVT_EXAM_FILTERS } from '../data/govtExamSyllabus';

export default function GovtPYQPage({ navigate }) {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="page" style={{ animation: 'fadeIn 0.4s ease', padding: '32px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <button className="topic-back-btn" onClick={() => history.back()}>
        ← Back to Roadmap
      </button>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ fontSize: '2.5rem' }}>📚</span>
          Previous Year Questions
        </h1>
        <p style={{ color: 'var(--text-sec)' }}>
          Real questions from past government exams, with instant visual solutions.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '40px' }}>
        <button 
          onClick={() => setActiveFilter('All')}
          style={{ 
            padding: '8px 16px', borderRadius: '100px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
            background: activeFilter === 'All' ? 'var(--violet)' : 'var(--surface)',
            color: activeFilter === 'All' ? '#fff' : 'var(--text-main)',
            border: `1px solid ${activeFilter === 'All' ? 'var(--violet)' : 'var(--border)'}`
          }}
        >
          All Exams
        </button>
        {GOVT_EXAM_FILTERS.map(f => (
          <button 
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{ 
              padding: '8px 16px', borderRadius: '100px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
              background: activeFilter === f ? 'var(--violet)' : 'var(--surface)',
              color: activeFilter === f ? '#fff' : 'var(--text-sec)',
              border: `1px solid ${activeFilter === f ? 'var(--violet)' : 'var(--border)'}`
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Placeholder State for Phase 1 */}
      <div style={{ 
        background: 'var(--surface2)', border: '1px dashed var(--border)', borderRadius: '16px', 
        padding: '60px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' 
      }}>
        <div style={{ fontSize: '3rem' }}>🚧</div>
        <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-main)' }}>PYQ Database Connecting...</h3>
        <p style={{ color: 'var(--text-sec)', maxWidth: '400px', margin: 0, lineHeight: 1.6 }}>
          We are currently connecting our database of 300+ highly curated {activeFilter !== 'All' ? activeFilter : 'Government Exam'} questions.
          <br/><br/>
          In the meantime, you can ask any PYQ directly to the AI Solver!
        </p>
        <button 
          onClick={() => navigate('ask')}
          style={{ 
            marginTop: '16px', padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, var(--violet), var(--teal))',
            color: '#fff', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 16px rgba(124,58,237,0.3)'
          }}
        >
          ✨ Go to Ask AI
        </button>
      </div>
    </div>
  );
}
