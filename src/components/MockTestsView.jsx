import React from 'react';
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
          onClick={() => alert('TCS Ninja Mock is coming soon!')}
          className="category-card"
          style={{ '--accent-color': '#10b981', width: '280px', padding: '32px 24px', textAlign: 'center', opacity: 0.8 }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏢</div>
          <h3 style={{ margin: '0 0 12px 0' }}>TCS Ninja Pattern</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
            Company Specific
            <br />
            Coming Soon
          </p>
        </motion.div>
      </div>
    </div>
  );
}
