// src/components/MilestoneModal.jsx
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from './Confetti';
import StreakShareCard from './StreakShareCard';

export default function MilestoneModal({ milestone, streak = 7, username = 'Student', onClose }) {
  if (!milestone) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        boxSizing: 'border-box',
      }}>
        <Confetti duration={5000} />

        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          style={{
            background: 'var(--surface, #1e293b)',
            border: '1.5px solid var(--border, #334155)',
            borderRadius: 24,
            maxWidth: 480,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px 24px',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
            boxSizing: 'border-box',
            position: 'relative',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 8 }}>
            {milestone.icon || '🎉'}
          </div>

          <div style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            color: 'var(--violet, #7c3aed)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: 4,
          }}>
            Milestone Reached!
          </div>

          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 900,
            margin: '0 0 8px',
            color: 'var(--text-main, #ffffff)',
          }}>
            {milestone.name}
          </h2>

          <p style={{
            fontSize: '0.92rem',
            color: 'var(--text-muted, #94a3b8)',
            margin: '0 0 24px',
            lineHeight: 1.5,
          }}>
            {milestone.description || `You've practiced ${streak} days in a row! Keep the flame burning.`}
          </p>

          {/* Share Card preview */}
          <div style={{ marginBottom: 24 }}>
            <StreakShareCard
              streak={streak}
              milestoneName={milestone.name}
              username={username}
            />
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--violet, #7c3aed)',
              color: '#ffffff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 32px',
              fontWeight: 800,
              fontSize: '0.95rem',
              cursor: 'pointer',
              width: '100%',
              maxWidth: 320,
              boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)',
            }}
          >
            Awesome! Keep Practicing →
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
