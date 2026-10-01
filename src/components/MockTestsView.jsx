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

      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('mock-test')}
          className="category-card"
          style={{ '--accent-color': '#8b5cf6', width: '280px', padding: '32px 24px', textAlign: 'center', border: '2px solid #8b5cf6' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏱️</div>
          <h3 style={{ margin: '0 0 12px 0' }}>Standard Full Mock</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
            60 Questions • 60 Minutes
            <br />
            Quant, Logical, Verbal, Tech
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('tcs-ninja-mock')}
          className="category-card"
          style={{ '--accent-color': '#10b981', width: '280px', padding: '32px 24px', textAlign: 'center', opacity: 0.8 }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏢</div>
          <h3 style={{ margin: '0 0 12px 0' }}>TCS Mock Test</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
            Company Specific<br />
            Part 1 & 2
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('hexaware-mock')}
          className="category-card"
          style={{ '--accent-color': '#f59e0b', width: '280px', padding: '32px 24px', textAlign: 'center', opacity: 0.8 }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏬</div>
          <h3 style={{ margin: '0 0 12px 0' }}>Hexaware Mock Test</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
            Company Specific<br />
            Part 1 & 2
          </p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate('resume-interview')}
          className="category-card"
          style={{
            '--accent-color': '#ec4899',
            width: '280px',
            padding: '32px 24px',
            textAlign: 'center',
            border: '2px solid #ec4899',
            position: 'relative',
            background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.08) 0%, var(--card-bg, #1e293b) 100%)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '16px',
            background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
            color: '#fff',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '3px 10px',
            borderRadius: '12px',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 8px rgba(236,72,153,0.4)'
          }}>
            🔥 NEW • AI VOICE
          </div>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎙️</div>
          <h3 style={{ margin: '0 0 12px 0', color: 'var(--text)' }}>AI Resume Interview</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
            8 Mins • 6 Voice Turns
            <br />
            Resume Tailored • Male/Female AI
          </p>
        </motion.div>
      </div>
    </div>
  );
}
