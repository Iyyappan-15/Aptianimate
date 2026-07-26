// src/components/TechnicalInterviewPrepView.jsx
import { motion } from 'framer-motion';
import { TECHNICAL_INTERVIEW_SYLLABUS } from '../data/technicalInterviewSyllabus';

export default function TechnicalInterviewPrepView({ navigate }) {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease', margin: '24px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Technical Interview Preparation
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '600px', margin: 0, lineHeight: 1.5 }}>
          Master key coding concepts, system design, data structures, algorithms, and core engineering subjects for top-tier product and service-based companies.
        </p>
      </div>

      {/* Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {TECHNICAL_INTERVIEW_SYLLABUS.map((topic) => (
          <motion.div
            key={topic.id}
            whileHover={{ y: -6, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.12)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`interview-topic/${topic.slug}`)}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              minHeight: '200px',
              transition: 'border-color 0.25s, box-shadow 0.25s',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = topic.color; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            <div>
              {/* Icon & Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span style={{
                  fontSize: '1.8rem',
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${topic.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {topic.icon}
                </span>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  margin: 0,
                  letterSpacing: '-0.3px',
                  lineHeight: '1.3'
                }}>
                  {topic.title}
                </h3>
              </div>

              {/* Description */}
              <p style={{
                color: 'var(--muted)',
                fontSize: '0.88rem',
                lineHeight: 1.5,
                margin: '0 0 20px 0'
              }}>
                {topic.description}
              </p>
            </div>

            {/* Footer Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border)',
              paddingTop: '16px',
              marginTop: 'auto'
            }}>
              <span style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--muted)',
                background: 'var(--surface2)',
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid var(--border)'
              }}>
                {topic.questionCount} Questions
              </span>

              <span style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: topic.color,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Explore
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
