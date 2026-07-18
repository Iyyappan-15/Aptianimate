// src/pages/GovtPYQPage.jsx
// ─── Government Previous Year Questions – Browse & Select ────────────────────
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOVT_PYQ_REGISTRY } from '../data/governmentRegistry';

const DIFF_COLORS = {
  easy:   '#10b981',
  medium: '#f59e0b',
  hard:   '#ef4444',
};

export default function GovtPYQPage({ navigate }) {
  const [view, setView]         = useState('exams');
  const [selectedExam, setExam] = useState(null);
  const [hoveredSet, setHoveredSet] = useState(null);

  const handleSelectExam = useCallback((exam) => {
    setExam(exam);
    setView('sets');
  }, []);

  const handleSelectSet = useCallback((exam, set) => {
    navigate(`govt-pyq-practice/${exam.id}/${set.id}`);
  }, [navigate]);

  return (
    <div style={{ position: 'relative', minHeight: '80vh', overflow: 'hidden' }}>

      {/* ── Ambient background blobs ─────────────────────────────────── */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)',
          animation: 'float1 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-10%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.06) 0%, transparent 70%)',
          animation: 'float2 10s ease-in-out infinite',
        }} />
      </div>

      <div className="page" style={{ position: 'relative', zIndex: 1, paddingTop: '40px', paddingBottom: '80px' }}>

        {/* ── Back Button ─────────────────────────────────────────────── */}
        <motion.button
          whileHover={{ x: -3 }}
          onClick={() => {
            if (view === 'sets') { setView('exams'); setExam(null); }
            else history.back();
          }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'none', border: 'none', color: 'var(--muted)',
            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
            padding: '0 0 32px 0', transition: 'color 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--violet)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--muted)'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          {view === 'sets' ? 'All Question Banks' : 'Government Exams'}
        </motion.button>

        <AnimatePresence mode="wait">

          {/* ══════════ EXAM SELECTION VIEW ═══════════════════════════ */}
          {view === 'exams' && (
            <motion.div
              key="exams"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Hero header */}
              <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)',
                    borderRadius: '100px', padding: '6px 18px',
                    fontSize: '0.78rem', fontWeight: 700, color: 'var(--violet)',
                    textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--violet)', display: 'inline-block' }} />
                  Previous Year Questions
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900,
                    lineHeight: 1.15, margin: '0 0 16px',
                    color: 'var(--text)',
                    letterSpacing: '-1px'
                  }}
                >
                  Choose Your{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, var(--violet), #7c3aed)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>
                    Exam Paper
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{ color: 'var(--muted)', fontSize: '1.05rem', margin: 0 }}
                >
                  Authentic questions from real government examinations
                </motion.p>
              </div>

              {/* Exam cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {GOVT_PYQ_REGISTRY.map((exam, i) => (
                  <ExamCard key={exam.id} exam={exam} index={i} onSelect={handleSelectExam} />
                ))}
              </div>
            </motion.div>
          )}

          {/* ══════════ PRACTICE SETS VIEW ════════════════════════════ */}
          {view === 'sets' && selectedExam && (
            <motion.div
              key="sets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Exam hero banner */}
              <div style={{
                position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--violet) 0%, #7c3aed 50%, #4f46e5 100%)',
                borderRadius: '24px', padding: '48px 40px',
                marginBottom: '40px',
                boxShadow: '0 20px 60px rgba(37,99,235,0.35)',
              }}>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', bottom: '-60px', left: '30%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{selectedExam.icon}</div>
                  <h1 style={{ color: '#fff', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, margin: '0 0 8px', letterSpacing: '-1px' }}>
                    {selectedExam.title}
                  </h1>
                  <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0 0 32px', fontSize: '1rem' }}>
                    {selectedExam.description}
                  </p>

                  {/* Stats row */}
                  <div style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}>
                    {[
                      { label: 'Questions', value: selectedExam.totalQuestions, icon: '📝' },
                      { label: 'Marks',     value: selectedExam.totalMarks,     icon: '🏆' },
                      { label: 'Duration',  value: `${selectedExam.duration}m`, icon: '⏱' },
                      { label: 'Sets',      value: selectedExam.totalSets,      icon: '📂' },
                    ].map((stat, i, arr) => (
                      <div key={stat.label} style={{
                        padding: '0 28px 0 0',
                        borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                        marginRight: i < arr.length - 1 ? '28px' : '0',
                      }}>
                        <div style={{ color: '#fff', fontSize: '1.9rem', fontWeight: 900, lineHeight: 1 }}>
                          {stat.value}
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section label */}
              <div style={{
                fontSize: '0.72rem', fontWeight: 700, color: 'var(--muted)',
                textTransform: 'uppercase', letterSpacing: '1.5px',
                marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                Select a Practice Set
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>

              {/* Practice set cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                {selectedExam.practiceSets.map((set, idx) => (
                  <SetCard
                    key={set.id}
                    set={set}
                    index={idx + 1}
                    questionsPerSet={selectedExam.questionsPerSet}
                    onSelect={() => handleSelectSet(selectedExam, set)}
                    isHovered={hoveredSet === set.id}
                    onHover={() => setHoveredSet(set.id)}
                    onLeave={() => setHoveredSet(null)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-30px) rotate(5deg)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(20px) rotate(-5deg)} }
      `}</style>
    </div>
  );
}

// ── Exam Card ─────────────────────────────────────────────────────────────────
function ExamCard({ exam, index, onSelect }) {
  const gradients = [
    'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    'linear-gradient(135deg, #0d9488 0%, #2563eb 100%)',
    'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    'linear-gradient(135deg, #d97706 0%, #dc2626 100%)',
  ];
  const grad = gradients[index % gradients.length];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(exam)}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onMouseOver={e => { e.currentTarget.style.boxShadow = '0 16px 48px rgba(37,99,235,0.18)'; e.currentTarget.style.borderColor = 'var(--violet)'; }}
      onMouseOut={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      {/* Gradient top strip */}
      <div style={{ height: '6px', background: grad }} />

      <div style={{ padding: '28px 28px 24px' }}>
        {/* Icon circle */}
        <div style={{
          width: '56px', height: '56px', borderRadius: '16px',
          background: grad, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '1.6rem',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
        }}>
          {exam.icon}
        </div>

        <h3 style={{ fontWeight: 900, fontSize: '1.25rem', margin: '0 0 8px', color: 'var(--text)', letterSpacing: '-0.5px' }}>
          {exam.title}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 24px' }}>
          {exam.description}
        </p>

        {/* Stat pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {[
            `${exam.totalQuestions} Questions`,
            `${exam.totalSets} Sets`,
            `${exam.duration} min`,
          ].map(label => (
            <span key={label} style={{
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: '100px', padding: '4px 12px',
              fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)'
            }}>{label}</span>
          ))}
        </div>

        {/* CTA row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid var(--border)', paddingTop: '20px'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
            {exam.questionsPerSet} questions / set
          </span>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: grad, color: '#fff',
            borderRadius: '100px', padding: '7px 18px',
            fontWeight: 700, fontSize: '0.85rem',
          }}>
            Explore
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Set Card ──────────────────────────────────────────────────────────────────
const SET_ACCENTS = [
  { color: '#2563eb', bg: 'rgba(37,99,235,0.08)', glow: 'rgba(37,99,235,0.25)' },
  { color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', glow: 'rgba(124,58,237,0.25)' },
  { color: '#0d9488', bg: 'rgba(13,148,136,0.08)', glow: 'rgba(13,148,136,0.25)' },
  { color: '#d97706', bg: 'rgba(217,119,6,0.08)', glow: 'rgba(217,119,6,0.25)' },
];

function SetCard({ set, index, questionsPerSet, onSelect, isHovered, onHover, onLeave }) {
  const accent = SET_ACCENTS[(index - 1) % SET_ACCENTS.length];
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        background: isHovered ? accent.bg : 'var(--surface)',
        border: `1.5px solid ${isHovered ? accent.color : 'var(--border)'}`,
        borderRadius: '18px', padding: '24px 22px', cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: isHovered ? `0 12px 36px ${accent.glow}` : '0 2px 12px rgba(0,0,0,0.05)',
      }}
    >
      {/* Set number badge */}
      <div style={{
        width: '48px', height: '48px', borderRadius: '14px',
        background: isHovered ? accent.color : 'var(--surface2)',
        border: `1px solid ${isHovered ? accent.color : 'var(--border)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isHovered ? '#fff' : 'var(--muted)',
        fontWeight: 900, fontSize: '1.1rem',
        transition: 'all 0.25s ease',
        marginBottom: '16px',
        boxShadow: isHovered ? `0 4px 16px ${accent.glow}` : 'none',
      }}>
        {index}
      </div>

      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text)', marginBottom: '4px' }}>
        {set.title}
      </div>
      <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '6px' }}>
        {set.description}
      </div>
      <div style={{
        fontFamily: 'monospace', fontSize: '0.72rem',
        color: isHovered ? accent.color : 'var(--muted)',
        background: isHovered ? `${accent.bg}` : 'var(--surface2)',
        border: `1px solid ${isHovered ? accent.color + '40' : 'var(--border)'}`,
        borderRadius: '6px', padding: '3px 8px',
        display: 'inline-block', marginBottom: '20px', transition: 'all 0.25s',
      }}>
        {set.questionRange}
      </div>

      {/* Footer row */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: `1px solid ${isHovered ? accent.color + '30' : 'var(--border)'}`,
        paddingTop: '14px', transition: 'border-color 0.25s',
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted)' }}>
          {questionsPerSet} Questions
        </span>
        <span style={{
          fontSize: '0.82rem', fontWeight: 800,
          color: isHovered ? accent.color : 'var(--muted)',
          transition: 'color 0.25s',
          display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          Begin
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </span>
      </div>
    </motion.div>
  );
}
