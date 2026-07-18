// src/pages/GovtPYQPage.jsx
// ─── Government Previous Year Questions – Browse & Select ────────────────────
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOVT_PYQ_REGISTRY } from '../data/governmentRegistry';

const DIFFICULTY_COLOR = {
  easy:   { bg: 'rgba(16,185,129,0.12)', text: 'var(--teal)',   label: 'Easy'   },
  medium: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b',       label: 'Medium' },
  hard:   { bg: 'rgba(239,68,68,0.12)',  text: 'var(--coral)',  label: 'Hard'   },
};

export default function GovtPYQPage({ navigate }) {
  // 'exams' | 'sets'
  const [view, setView]           = useState('exams');
  const [selectedExam, setExam]   = useState(null);

  const handleSelectExam = useCallback((exam) => {
    setExam(exam);
    setView('sets');
  }, []);

  const handleSelectSet = useCallback((exam, set) => {
    // Encode as: govt-pyq-practice/<examId>/<setId>
    navigate(`govt-pyq-practice/${exam.id}/${set.id}`);
  }, [navigate]);

  return (
    <div className="page" style={{ animation: 'fadeIn 0.4s ease', padding: '32px 24px', maxWidth: '1000px', margin: '0 auto' }}>

      {/* ── Back Button ───────────────────────────────────────────────── */}
      <button
        className="topic-back-btn"
        onClick={() => {
          if (view === 'sets') { setView('exams'); setExam(null); }
          else history.back();
        }}
      >
        ← {view === 'sets' ? `Back to All Exams` : 'Back'}
      </button>

      {/* ── Page Header ───────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: '40px', marginTop: '8px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📚</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 8px', color: 'var(--text-main)' }}>
          {view === 'sets' && selectedExam ? selectedExam.title : 'Previous Year Questions'}
        </h1>
        <p style={{ color: 'var(--text-sec)', margin: 0, fontSize: '0.95rem' }}>
          {view === 'sets' && selectedExam
            ? `${selectedExam.totalQuestions} questions · ${selectedExam.totalSets} practice sets · ${selectedExam.duration} min`
            : 'Real questions from past government examinations'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* ══ EXAM SELECTION VIEW ══════════════════════════════════════ */}
        {view === 'exams' && (
          <motion.div
            key="exams"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}
          >
            {GOVT_PYQ_REGISTRY.map(exam => (
              <ExamCard key={exam.id} exam={exam} onSelect={handleSelectExam} />
            ))}
          </motion.div>
        )}

        {/* ══ PRACTICE SETS VIEW ═══════════════════════════════════════ */}
        {view === 'sets' && selectedExam && (
          <motion.div
            key="sets"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {/* Exam metadata strip */}
            <div style={{
              display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center',
              marginBottom: '32px'
            }}>
              {[
                { label: 'Total Questions', value: selectedExam.totalQuestions },
                { label: 'Total Marks',     value: selectedExam.totalMarks     },
                { label: 'Duration',        value: `${selectedExam.duration} min` },
                { label: 'Sets',            value: selectedExam.totalSets     },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '12px 20px', textAlign: 'center', minWidth: '110px'
                }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--violet)' }}>{item.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-sec)', marginTop: '2px' }}>{item.label}</div>
                </div>
              ))}
            </div>

            {/* Practice set cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {selectedExam.practiceSets.map((set, idx) => (
                <SetCard
                  key={set.id}
                  set={set}
                  index={idx + 1}
                  questionsPerSet={selectedExam.questionsPerSet}
                  onSelect={() => handleSelectSet(selectedExam, set)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── ExamCard Component ────────────────────────────────────────────────────────
function ExamCard({ exam, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(124,58,237,0.18)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(exam)}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px',
        padding: '28px 24px', cursor: 'pointer', transition: 'border-color 0.2s',
        display: 'flex', flexDirection: 'column', gap: '12px'
      }}
    >
      <div style={{ fontSize: '2.5rem' }}>{exam.icon}</div>
      <div>
        <h3 style={{ margin: '0 0 4px', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
          {exam.title}
        </h3>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-sec)', lineHeight: 1.5 }}>
          {exam.description}
        </p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
        <Chip>{exam.totalQuestions} Questions</Chip>
        <Chip>{exam.totalSets} Sets</Chip>
        <Chip>{exam.duration} min</Chip>
      </div>
      <div style={{
        marginTop: 'auto', paddingTop: '16px',
        borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end'
      }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--violet)' }}>
          Start Practice →
        </span>
      </div>
    </motion.div>
  );
}

// ── SetCard Component ─────────────────────────────────────────────────────────
function SetCard({ set, index, questionsPerSet, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 8px 28px rgba(124,58,237,0.15)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px',
        padding: '22px 20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '10px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--violet), #6d28d9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 900, fontSize: '1rem', flexShrink: 0
        }}>
          {index}
        </div>
        <div>
          <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1rem' }}>{set.title}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-sec)' }}>{set.description}</div>
        </div>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-sec)', fontFamily: 'monospace' }}>
        {set.questionRange}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid var(--border)', paddingTop: '10px', marginTop: '4px'
      }}>
        <Chip>{questionsPerSet} Questions</Chip>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--violet)' }}>Begin →</span>
      </div>
    </motion.div>
  );
}

function Chip({ children }) {
  return (
    <span style={{
      background: 'var(--surface2)', border: '1px solid var(--border)',
      borderRadius: '100px', padding: '3px 10px', fontSize: '0.75rem',
      fontWeight: 600, color: 'var(--text-sec)'
    }}>
      {children}
    </span>
  );
}
