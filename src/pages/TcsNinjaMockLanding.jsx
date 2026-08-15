/**
 * TcsNinjaMockLanding.jsx
 * Landing page for TCS Ninja Mock Test.
 * Two options: Aptitude (active) and Coding (coming soon).
 */
import { motion } from 'framer-motion';

export default function TcsNinjaMockLanding({ navigate }) {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-pill)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--surface2)'}
        >
          Back ↩
        </button>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>🏢</div>
        <h1 style={{ margin: '0 0 12px 0', fontSize: '2rem', fontWeight: 900, color: 'var(--text)' }}>
          TCS Mock Test
        </h1>
        <p style={{ color: 'var(--muted)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
          Practice with the authentic TCS exam pattern. Choose a section to begin your timed mock test.
        </p>

        {/* Stats bar */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          marginTop: '24px',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Questions', value: '60', icon: '📝' },
            { label: 'Duration', value: '65 min', icon: '⏱️' },
            { label: 'Marking', value: '+1 / 0', icon: '🎯' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '10px 20px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.2rem' }}>{stat.icon}</div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text)' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cards */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Aptitude Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          whileHover={{ scale: 1.04, y: -4 }}
          onClick={() => navigate('tcs-ninja-mock/aptitude')}
          style={{
            width: '280px',
            background: 'var(--card)',
            border: '2px solid var(--violet)',
            borderRadius: '20px',
            padding: '36px 28px',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(139,92,246,0.15)',
          }}
        >
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            fontSize: '2rem',
          }}>
            🧠
          </div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text)' }}>
            Aptitude & Technical
          </h2>
          <p style={{ color: 'var(--text)', fontSize: '0.9rem', margin: '0 0 20px 0', lineHeight: 1.6, opacity: 0.8 }}>
            Part 1: Quantitative, Logical, Verbal (50 mins). Part 2: Technical (15 mins).
          </p>
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '24px',
          }}>
            {['Quant', 'Logical', 'Verbal', 'Technical'].map(tag => (
              <span key={tag} style={{
                padding: '3px 10px',
                borderRadius: '20px',
                background: 'var(--accent-bg, rgba(139,92,246,0.1))',
                color: 'var(--accent, #aa3bff)',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}>{tag}</span>
            ))}
          </div>
          <div style={{
            padding: '12px 24px',
            borderRadius: '10px',
            background: 'var(--violet)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.95rem',
          }}>
            Start Test →
          </div>
        </motion.div>
      </div>
    </div>
  );
}
