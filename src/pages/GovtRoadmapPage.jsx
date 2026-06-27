// src/pages/GovtRoadmapPage.jsx
import { useState } from 'react';

export default function GovtRoadmapPage({ navigate }) {
  const [activePlan, setActivePlan] = useState('ssc');

  const plans = {
    ssc: { title: 'SSC CGL 60-Day Master Plan', color: 'var(--blue)' },
    bank: { title: 'Bank PO 90-Day Strategy', color: 'var(--amber)' },
    railway: { title: 'RRB NTPC 45-Day Revision', color: 'var(--teal)' },
  };

  return (
    <div className="page" style={{ animation: 'fadeIn 0.4s ease', padding: '32px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <button className="topic-back-btn" onClick={() => history.back()}>
        ← Back to Roadmap
      </button>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: '0 0 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <span style={{ fontSize: '2.5rem' }}>🗺️</span>
          Curated Study Roadmaps
        </h1>
        <p style={{ color: 'var(--text-sec)' }}>
          Follow step-by-step daily plans to clear your target exam.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
        {Object.entries(plans).map(([key, data]) => (
          <button 
            key={key}
            onClick={() => setActivePlan(key)}
            style={{ 
              padding: '12px 24px', borderRadius: '12px', border: '1px solid var(--border)', 
              background: activePlan === key ? 'var(--surface)' : 'transparent',
              color: 'var(--text-main)', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: activePlan === key ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            {data.title}
          </button>
        ))}
      </div>

      <div style={{ 
        background: 'var(--surface)', border: `2px solid ${plans[activePlan].color}`, borderRadius: '16px', 
        padding: '60px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' 
      }}>
        <div style={{ fontSize: '3rem' }}>📅</div>
        <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'var(--text-main)' }}>{plans[activePlan].title} Connecting...</h3>
        <p style={{ color: 'var(--text-sec)', maxWidth: '450px', margin: 0, lineHeight: 1.6 }}>
          We are finalizing the exact daily topic breakdowns for the {plans[activePlan].title}.
          <br/><br/>
          Check back soon to start your structured learning journey!
        </p>
      </div>
    </div>
  );
}
