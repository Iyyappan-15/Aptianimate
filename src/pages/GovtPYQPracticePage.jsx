// src/pages/GovtPYQPracticePage.jsx
// ─── Premium Government PYQ – Practice Viewer ────────────────────────────────
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOVT_PYQ_REGISTRY } from '../data/governmentRegistry';
import Mascot from '../components/Mascot';
import Confetti from '../components/Confetti';

// ─── In-Memory Cache ──────────────────────────────────────────────────────────
const setCache = new Map();

// ─── Adapter ──────────────────────────────────────────────────────────────────
function adaptOptions(optionsArray) {
  return Object.fromEntries(optionsArray.map(o => [o.label, o.text]));
}

// ─── Difficulty badge ─────────────────────────────────────────────────────────
function DiffBadge({ diff }) {
  const map = {
    easy:   { bg: 'rgba(16,185,129,0.1)', color: '#10b981', border: 'rgba(16,185,129,0.2)', label: 'Easy'   },
    medium: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: 'rgba(245,158,11,0.2)', label: 'Medium' },
    hard:   { bg: 'rgba(239,68,68,0.1)',  color: '#ef4444', border: 'rgba(239,68,68,0.2)',  label: 'Hard'   },
  };
  const s = map[diff?.toLowerCase()] || map.easy;
  return (
    <span style={{
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
      borderRadius: '100px', padding: '4px 12px', fontSize: '0.72rem',
      fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase'
    }}>
      {s.label}
    </span>
  );
}

// ─── Question Navigator Palette ───────────────────────────────────────────────
function QuestionPalette({ total, current, answers, onJump }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      borderRadius: '24px', padding: '28px',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05)'
    }}>
      <div style={{
        fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)',
        marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        Navigator
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
        {Array.from({ length: total }, (_, i) => {
          const ans = answers[i];
          let bg = 'var(--surface2)';
          let color = 'var(--text-sec)';
          let border = '1px solid var(--border)';
          let shadow = 'none';

          if (i === current) {
            bg = 'linear-gradient(135deg, var(--violet), #7c3aed)';
            color = '#fff';
            border = 'none';
            shadow = '0 4px 12px rgba(124,58,237,0.3)';
          } else if (ans?.correct === true) {
            bg = 'rgba(16,185,129,0.1)'; color = '#10b981'; border = '1px solid rgba(16,185,129,0.3)';
          } else if (ans?.correct === false) {
            bg = 'rgba(239,68,68,0.1)'; color = '#ef4444'; border = '1px solid rgba(239,68,68,0.3)';
          } else if (ans?.answered) {
            bg = 'rgba(245,158,11,0.1)'; color = '#f59e0b'; border = '1px solid rgba(245,158,11,0.3)';
          }

          return (
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={i} onClick={() => onJump(i)}
              style={{
                aspectRatio: '1', borderRadius: '12px', border, background: bg,
                color, fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: shadow, transition: 'all 0.2s ease'
              }}
            >
              {i + 1}
            </motion.button>
          );
        })}
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
        marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)'
      }}>
        {[
          { color: '#10b981', label: 'Correct' },
          { color: '#ef4444', label: 'Wrong' },
          { color: '#f59e0b', label: 'Attempted' },
          { color: 'var(--border)', label: 'Unattempted' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-sec)' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Score Summary ────────────────────────────────────────────────────────────
function ScoreSummary({ questions, answers, onRestart, navigate }) {
  const scored   = answers.filter(a => a?.correct !== null && a !== undefined);
  const correct  = answers.filter(a => a?.correct === true).length;
  const wrong    = answers.filter(a => a?.correct === false).length;
  const skipped  = answers.filter(a => !a || (!a.answered && a.correct == null)).length;
  const na       = answers.filter(a => a?.notAvailable).length;
  const percent  = scored.length > 0 ? Math.round((correct / (scored.length)) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        maxWidth: '700px', margin: '40px auto', padding: '60px 40px',
        background: 'var(--surface)', borderRadius: '32px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.08)',
        border: '1px solid var(--border)', textAlign: 'center'
      }}
    >
      <div style={{ fontSize: '5rem', marginBottom: '24px', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))' }}>
        {percent >= 70 ? '🏆' : percent >= 40 ? '👍' : '📚'}
      </div>
      <h2 style={{ fontWeight: 900, fontSize: '2.5rem', margin: '0 0 12px', color: 'var(--text-main)', letterSpacing: '-1px' }}>
        Practice Set Complete!
      </h2>
      <p style={{ color: 'var(--muted)', margin: '0 0 48px', fontSize: '1.1rem' }}>
        You scored {percent}% on the questions you attempted.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '48px' }}>
        {[
          { label: 'Correct',     value: correct, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Wrong',       value: wrong,   color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
          { label: 'Answer N/A',  value: na,      color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
          { label: 'Skipped',     value: skipped, color: 'var(--muted)', bg: 'var(--surface2)' },
        ].map(s => (
          <div key={s.label} style={{
            background: s.bg, borderRadius: '20px', padding: '24px 16px',
            border: `1px solid ${s.bg.replace('0.08', '0.2')}`
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-sec)', marginTop: '8px', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <motion.button
          whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          style={{
            padding: '16px 32px', borderRadius: '16px', border: '1px solid var(--border)',
            background: 'var(--surface)', color: 'var(--text-main)', fontWeight: 700,
            fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          Try Again
        </motion.button>
        <motion.button
          whileHover={{ y: -2, boxShadow: '0 12px 24px rgba(124,58,237,0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('govt-pyq')}
          style={{
            padding: '16px 32px', borderRadius: '16px', border: 'none',
            background: 'linear-gradient(135deg, var(--violet), #7c3aed)',
            color: '#fff', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(124,58,237,0.2)'
          }}
        >
          Back to Question Banks
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GovtPYQPracticePage({ examId, setId, navigate }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [current, setCurrent]     = useState(0);
  const [answers, setAnswers]     = useState([]);
  const [selected, setSelected]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult]       = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [searchText, setSearch]   = useState('');
  const [topicFilter, setTopicFilter] = useState('All');

  const exam = useMemo(() => GOVT_PYQ_REGISTRY.find(e => e.id === examId), [examId]);
  const set  = useMemo(() => exam?.practiceSets.find(s => s.id === setId),  [exam, setId]);

  useEffect(() => {
    if (!set) { setError('Practice set not found.'); setLoading(false); return; }
    if (setCache.has(set.file)) {
      setQuestions(setCache.get(set.file));
      setAnswers(new Array(setCache.get(set.file).length).fill(null));
      setLoading(false);
      return;
    }
    fetch(set.file).then(res => {
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
      return res.json();
    }).then(data => {
      setCache.set(set.file, data);
      setQuestions(data);
      setAnswers(new Array(data.length).fill(null));
      setLoading(false);
    }).catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, [set]);

  const topics = useMemo(() => {
    const t = new Set(questions.map(q => q.topic));
    return ['All', ...Array.from(t).sort()];
  }, [questions]);

  const restart = useCallback(() => {
    setCurrent(0);
    setAnswers(new Array(questions.length).fill(null));
    setSelected(null);
    setSubmitted(false);
    setResult(null);
    setShowSummary(false);
  }, [questions]);

  const jumpTo = useCallback((idx) => {
    setCurrent(idx);
    setSelected(answers[idx]?.chosen || null);
    setSubmitted(answers[idx]?.answered || false);
    setResult(answers[idx]?.notAvailable ? null : answers[idx]?.correct ? 'correct' : answers[idx]?.correct === false ? 'wrong' : null);
    setShowSummary(false);
  }, [answers]);

  const goNext = useCallback(() => {
    if (current < questions.length - 1) jumpTo(current + 1);
    else setShowSummary(true);
  }, [current, questions.length, jumpTo]);

  const goPrev = useCallback(() => {
    if (current > 0) jumpTo(current - 1);
  }, [current, jumpTo]);

  const handleSubmit = useCallback((chosenLabel) => {
    const q = questions[current];
    const isNA = !q.correct_answer;
    let correct = null;
    if (!isNA) correct = chosenLabel === q.correct_answer;

    const newAnswers = [...answers];
    newAnswers[current] = { answered: true, chosen: chosenLabel, correct, notAvailable: isNA };
    setAnswers(newAnswers);
    setSubmitted(true);
    setResult(isNA ? null : correct ? 'correct' : 'wrong');
    setSelected(chosenLabel);
  }, [questions, current, answers]);

  // Loading & Error States
  if (!exam || !set || error) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '100px 24px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '24px' }}>⚠️</div>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '16px' }}>
          {error || 'Practice set not found'}
        </h2>
        <button onClick={() => navigate('govt-pyq')} className="btn btn-primary">Go Back to Sets</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '4px solid var(--surface2)', borderTop: '4px solid var(--violet)', animation: 'spin 1s cubic-bezier(0.5, 0, 0.5, 1) infinite' }} />
        <p style={{ color: 'var(--muted)', marginTop: '24px', fontWeight: 600, fontSize: '1.1rem' }}>Preparing {set.title}…</p>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="page-wide" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Ambient summary background */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }} />
        {answers.filter(a => a?.correct === true).length > questions.length * 0.7 && <Confetti />}
        <ScoreSummary questions={questions} answers={answers} onRestart={restart} navigate={navigate} />
      </div>
    );
  }

  const q = questions[current];
  const isNA = !q.correct_answer;
  const progressPercent = ((current + 1) / questions.length) * 100;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--surface2)' }}>
      {/* ── Ambient Background Mesh ─────────────────────────────────── */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 60%)', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 60%)', filter: 'blur(60px)' }} />
      </div>

      <div className="page-wide" style={{ position: 'relative', zIndex: 1, padding: '24px 24px 80px' }}>
        {result === 'correct' && <Confetti />}
        <Mascot result={result} />

        {/* ── Header Bar ────────────────────────────────────────────── */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '24px',
          padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
        }}>
          <button
            onClick={() => navigate('govt-pyq')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '8px 16px', color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--violet)'; e.currentTarget.style.color = 'var(--violet)'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-main)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back
          </button>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
              {exam.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>
              {set.title}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Progress</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-main)' }}>{current + 1} / {questions.length}</div>
            </div>
            {/* Circular Progress */}
            <svg width="40" height="40" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border)" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#gradient)" strokeWidth="3" strokeDasharray={`${progressPercent}, 100`} style={{ transition: 'stroke-dasharray 0.5s ease' }} />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--violet)" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* ── Main Layout ─────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(300px, 0.6fr)', gap: '32px', alignItems: 'start' }}>
          
          {/* ── Left Column: Question Viewer ───────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '32px', padding: '40px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.04)',
                  position: 'relative', overflow: 'hidden'
                }}
              >
                {/* Decorative top border */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: 'linear-gradient(90deg, var(--violet), #10b981)' }} />

                {/* Question Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      background: 'rgba(37,99,235,0.08)', color: 'var(--violet)',
                      padding: '6px 14px', borderRadius: '12px', fontWeight: 800, fontSize: '0.9rem'
                    }}>
                      Question {current + 1}
                    </div>
                    <DiffBadge diff={q.difficulty} />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {q.exam_tags?.map(tag => (
                      <span key={tag} style={{
                        background: 'var(--surface2)', color: 'var(--muted)', border: '1px solid var(--border)',
                        padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Question Text */}
                <div style={{
                  fontSize: '1.15rem', fontWeight: 400, color: 'var(--text)',
                  lineHeight: 1.75, marginBottom: '40px', whiteSpace: 'pre-line',
                  letterSpacing: '0px'
                }}>
                  {q.question}
                </div>

                {/* Options Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {q.options.map(opt => {
                    const isSelected = selected === opt.label;
                    let isCorrect = false;
                    let isWrong = false;
                    
                    if (submitted && !isNA) {
                      isCorrect = opt.label === q.correct_answer;
                      isWrong = isSelected && opt.label !== q.correct_answer;
                    }

                    // Styling logic
                    let bg = 'var(--surface)';
                    let border = '1px solid var(--border)';
                    let textColor = 'var(--text-main)';
                    let iconBg = 'var(--surface2)';
                    let iconColor = 'var(--muted)';
                    
                    if (isCorrect) {
                      bg = 'rgba(16,185,129,0.05)'; border = '2px solid #10b981'; textColor = '#059669'; iconBg = '#10b981'; iconColor = '#fff';
                    } else if (isWrong) {
                      bg = 'rgba(239,68,68,0.05)'; border = '2px solid #ef4444'; textColor = '#dc2626'; iconBg = '#ef4444'; iconColor = '#fff';
                    } else if (isSelected) {
                      bg = 'rgba(37,99,235,0.04)'; border = '2px solid var(--violet)'; textColor = 'var(--violet)'; iconBg = 'var(--violet)'; iconColor = '#fff';
                    }

                    return (
                      <motion.button
                        key={opt.label}
                        whileHover={!submitted ? { y: -2, boxShadow: '0 6px 16px rgba(0,0,0,0.04)' } : {}}
                        whileTap={!submitted ? { scale: 0.98 } : {}}
                        onClick={() => !submitted && setSelected(opt.label)}
                        disabled={submitted}
                        style={{
                          width: '100%', padding: '16px 20px', borderRadius: '16px',
                          background: bg, border, display: 'flex', alignItems: 'center', gap: '16px',
                          cursor: submitted ? 'default' : 'pointer', transition: 'all 0.2s ease',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{
                          width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                          background: iconBg, color: iconColor, display: 'flex', alignItems: 'center',
                          justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem',
                          transition: 'all 0.2s ease'
                        }}>
                          {opt.label}
                        </div>
                        <span style={{ fontSize: '1.05rem', fontWeight: 500, color: textColor, lineHeight: 1.5, flex: 1 }}>
                          {opt.text}
                        </span>
                        
                        {/* Status Icons */}
                        {isCorrect && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: '#10b981', display: 'flex' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </motion.div>
                        )}
                        {isWrong && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: '#ef4444', display: 'flex' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Actions / Feedback Area */}
                <div style={{ marginTop: '32px' }}>
                  {!submitted ? (
                    <motion.button
                      whileHover={selected ? { y: -2, boxShadow: '0 8px 24px rgba(37,99,235,0.25)' } : {}}
                      whileTap={selected ? { scale: 0.98 } : {}}
                      onClick={() => selected && handleSubmit(selected)}
                      disabled={!selected}
                      style={{
                        width: '100%', padding: '18px', borderRadius: '16px', border: 'none',
                        background: selected ? 'linear-gradient(135deg, var(--violet), #7c3aed)' : 'var(--surface2)',
                        color: selected ? '#fff' : 'var(--muted)', fontWeight: 800, fontSize: '1.05rem',
                        cursor: selected ? 'pointer' : 'not-allowed', transition: 'all 0.3s ease',
                      }}
                    >
                      Submit Answer
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: '20px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '16px',
                        ...(isNA
                          ? { background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }
                          : result === 'correct'
                          ? { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }
                          : { background: 'rgba(239,68,68,0.1)',  border: '1px solid rgba(239,68,68,0.2)' }
                        )
                      }}
                    >
                      <div style={{ fontSize: '1.8rem' }}>
                        {isNA ? '⚠️' : result === 'correct' ? '🎉' : '💡'}
                      </div>
                      <div>
                        <div style={{
                          fontWeight: 800, fontSize: '1.05rem', marginBottom: '4px',
                          color: isNA ? '#d97706' : result === 'correct' ? '#059669' : '#dc2626'
                        }}>
                          {isNA ? 'Official Answer Unavailable' : result === 'correct' ? 'Excellent Work!' : 'Not quite right.'}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>
                          {isNA 
                            ? 'The official answer key for this question was not provided or was challenged.' 
                            : result === 'wrong' 
                            ? <span>The correct answer is Option <strong style={{color: '#dc2626'}}>{q.correct_answer}</strong>.</span> 
                            : 'You selected the correct answer.'}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Bottom Navigation Bar ─────────────────────────────── */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'var(--surface)', padding: '16px 24px', borderRadius: '20px',
              border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}>
              <motion.button
                whileHover={current > 0 ? { x: -4 } : {}}
                onClick={goPrev} disabled={current === 0}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
                  borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--surface)',
                  color: 'var(--text-main)', fontWeight: 700, fontSize: '0.9rem',
                  cursor: current === 0 ? 'not-allowed' : 'pointer', opacity: current === 0 ? 0.5 : 1
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                Previous
              </motion.button>

              <motion.button
                whileHover={{ x: 4, boxShadow: '0 8px 20px rgba(124,58,237,0.25)' }}
                whileTap={{ scale: 0.98 }}
                onClick={goNext}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
                  borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, var(--violet), #7c3aed)',
                  color: '#fff', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(124,58,237,0.2)'
                }}
              >
                {current === questions.length - 1 ? 'Finish Practice' : 'Next Question'}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </motion.button>
            </div>
          </div>

          {/* ── Right Column: Info & Navigator ─────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Info Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '24px', padding: '28px',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.05)'
            }}>
              <div style={{
                fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)',
                marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                Question Details
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Category</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{q.category}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Topic</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{q.topic}</div>
                </div>
                {q.subtopic && (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Subtopic</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{q.subtopic}</div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Est. Time</div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 12px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    ⏱ {q.estimated_time} seconds
                  </div>
                </div>
              </div>
            </div>

            <QuestionPalette
              total={questions.length}
              current={current}
              answers={answers}
              onJump={jumpTo}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
