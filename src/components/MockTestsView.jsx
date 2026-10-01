import { motion } from 'framer-motion';

export default function MockTestsView({ navigate }) {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease', margin: '40px 0', textAlign: 'center' }}>
      <div className="section-header">
        <div className="section-title">Assessment Mock Tests</div>
      </div>
      <p style={{ color: 'var(--muted)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
        Practice with full-length timed mock tests. Get detailed analytics, topic-wise breakdown, and evaluate your readiness for top product and service-based companies.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '0 12px'
      }}>
        <motion.div 
          whileHover={{ translateY: -4 }}
          onClick={() => navigate('mock-test')}
          className="category-card"
          style={{ '--accent-color': '#8b5cf6', padding: '32px 20px', textAlign: 'center', border: '2px solid #8b5cf6', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏱️</div>
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>Standard Full Mock</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
            60 Questions • 60 Minutes
            <br />
            Quant, Logical, Verbal, Tech
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ translateY: -4 }}
          onClick={() => navigate('tcs-ninja-mock')}
          className="category-card"
          style={{ '--accent-color': '#10b981', padding: '32px 20px', textAlign: 'center', border: '1px solid var(--border)', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏢</div>
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>TCS Mock Test</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
            Company Specific<br />
            Part 1 & 2
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ translateY: -4 }}
          onClick={() => navigate('hexaware-mock')}
          className="category-card"
          style={{ '--accent-color': '#f59e0b', padding: '32px 20px', textAlign: 'center', border: '1px solid var(--border)', cursor: 'pointer' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏬</div>
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>Hexaware Mock Test</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
            Company Specific<br />
            Part 1 & 2
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ translateY: -4 }}
          onClick={() => navigate('resume-interview')}
          className="category-card"
          style={{
            '--accent-color': '#ec4899',
            padding: '32px 20px',
            textAlign: 'center',
            border: '2px solid #ec4899',
            position: 'relative',
            cursor: 'pointer',
            background: 'var(--surface)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            color: '#ffffff',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '12px',
            letterSpacing: '0.5px'
          }}>
            🔥 AI VOICE
          </div>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎙️</div>
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>AI Resume Interview</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
            8 Mins • 6 Voice Turns
            <br />
            Resume Tailored • Voice AI
          </p>
        </motion.div>
      </div>
    </div>
  );
}
