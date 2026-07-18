// src/pages/GovtPYQPracticePage.jsx
// ─── Government PYQ – Practice Viewer ────────────────────────────────────────
// Reuses: QuestionCard (adapted), Mascot, Confetti, HintSystem
// New: Async JSON loading, in-memory set cache, "Not Available" handling,
//      question navigator, score summary

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GOVT_PYQ_REGISTRY } from '../data/governmentRegistry';
import Mascot from '../components/Mascot';
import Confetti from '../components/Confetti';

// ─── In-Memory Cache ──────────────────────────────────────────────────────────
// Persists across navigations within the same session.
// Map<setFileUrl, question[]>
const setCache = new Map();

// ─── Adapter ──────────────────────────────────────────────────────────────────
// PYQ JSON options are [{label, text}] arrays.
// This helper converts them to {A: text, B: text, ...} that QuestionCard uses,
// WITHOUT modifying QuestionCard itself.
function adaptOptions(optionsArray) {
  return Object.fromEntries(optionsArray.map(o => [o.label, o.text]));
}

// ─── Difficulty badge ─────────────────────────────────────────────────────────
function DiffBadge({ diff }) {
  const map = {
    easy:   { bg: 'rgba(16,185,129,0.12)', color: 'var(--teal)',  label: 'Easy'   },
    medium: { bg: 'rgba(245,158,11,0.12)', color: '#f59e0b',      label: 'Medium' },
    hard:   { bg: 'rgba(239,68,68,0.12)',  color: 'var(--coral)', label: 'Hard'   },
  };
  const s = map[diff?.toLowerCase()] || map.easy;
  return (
    <span style={{
      background: s.bg, color: s.color, borderRadius: '100px',
      padding: '3px 10px', fontSize: '0.75rem', fontWeight: 700
    }}>
      {s.label}
    </span>
  );
}

// ─── Question Navigator Palette ───────────────────────────────────────────────
function QuestionPalette({ total, current, answers, onJump }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '16px', padding: '20px'
    }}>
      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-sec)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Navigator
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {Array.from({ length: total }, (_, i) => {
          const ans = answers[i];
          let bg = 'var(--surface2)';
          let color = 'var(--text-sec)';
          let border = '1px solid var(--border)';
          if (i === current) { bg = 'var(--violet)'; color = '#fff'; border = 'none'; }
          else if (ans?.correct === true)  { bg = 'rgba(16,185,129,0.15)'; color = 'var(--teal)'; border = '1px solid var(--teal)'; }
          else if (ans?.correct === false) { bg = 'rgba(239,68,68,0.12)'; color = 'var(--coral)'; border = '1px solid var(--coral)'; }
          else if (ans?.answered)          { bg = 'rgba(245,158,11,0.12)'; color = '#f59e0b'; border = '1px solid #f59e0b'; }
          return (
            <button key={i} onClick={() => onJump(i)} style={{
              width: '34px', height: '34px', borderRadius: '8px', border,
              background: bg, color, fontWeight: 700, fontSize: '0.8rem',
              cursor: 'pointer', transition: 'all 0.15s'
            }}>
              {i + 1}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
        {[
          { color: 'var(--teal)',  label: 'Correct'    },
          { color: 'var(--coral)', label: 'Wrong'      },
          { color: '#f59e0b',      label: 'Attempted'  },
          { color: 'var(--border)',label: 'Unattempted'},
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--text-sec)' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.color }} />
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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '16px' }}>
        {percent >= 70 ? '🎉' : percent >= 40 ? '👍' : '📖'}
      </div>
      <h2 style={{ fontWeight: 900, fontSize: '1.8rem', margin: '0 0 6px', color: 'var(--text-main)' }}>
        Practice Set Complete!
      </h2>
      <p style={{ color: 'var(--text-sec)', margin: '0 0 36px' }}>
        Here is your result summary
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Correct',     value: correct, color: 'var(--teal)'  },
          { label: 'Wrong',       value: wrong,   color: 'var(--coral)' },
          { label: 'Answer N/A',  value: na,      color: '#f59e0b'      },
          { label: 'Unattempted', value: skipped, color: 'var(--border)'},
        ].map(s => (
          <div key={s.label} style={{
            background: 'var(--surface)', border: `1px solid var(--border)`,
            borderRadius: '16px', padding: '20px 16px'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-sec)', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={onRestart}
          style={{
            padding: '12px 28px', borderRadius: '12px', border: '1px solid var(--border)',
            background: 'var(--surface)', color: 'var(--text-main)', fontWeight: 700, cursor: 'pointer'
          }}
        >
          Try Again
        </button>
        <button
          onClick={() => navigate('govt-pyq')}
          style={{
            padding: '12px 28px', borderRadius: '12px', border: 'none',
            background: 'linear-gradient(135deg, var(--violet), #6d28d9)',
            color: '#fff', fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(124,58,237,0.3)'
          }}
        >
          Back to All Sets
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function GovtPYQPracticePage({ examId, setId, navigate }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [current, setCurrent]     = useState(0);
  const [answers, setAnswers]     = useState([]); // per-question state
  const [selected, setSelected]   = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult]       = useState(null); // 'correct'|'wrong'|null
  const [showSummary, setShowSummary] = useState(false);
  const [searchText, setSearch]   = useState('');
  const [topicFilter, setTopicFilter] = useState('All');

  // ── Find exam + set from registry ──────────────────────────────────────────
  const exam = useMemo(() => GOVT_PYQ_REGISTRY.find(e => e.id === examId), [examId]);
  const set  = useMemo(() => exam?.practiceSets.find(s => s.id === setId),  [exam, setId]);

  // ── Load JSON (with cache) ──────────────────────────────────────────────────
  useEffect(() => {
    if (!set) { setError('Practice set not found.'); setLoading(false); return; }

    // Check cache first
    if (setCache.has(set.file)) {
      setQuestions(setCache.get(set.file));
      setAnswers(new Array(setCache.get(set.file).length).fill(null));
      setLoading(false);
      return;
    }

    fetch(set.file)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setCache.set(set.file, data); // Cache for this session
        setQuestions(data);
        setAnswers(new Array(data.length).fill(null));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [set]);

  // ── Filtered question list for navigator / search ──────────────────────────
  const topics = useMemo(() => {
    const t = new Set(questions.map(q => q.topic));
    return ['All', ...Array.from(t).sort()];
  }, [questions]);

  const filtered = useMemo(() => {
    return questions.filter(q => {
      const matchTopic = topicFilter === 'All' || q.topic === topicFilter;
      const matchSearch = !searchText ||
        q.question.toLowerCase().includes(searchText.toLowerCase()) ||
        q.id.toLowerCase().includes(searchText.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchText.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [questions, topicFilter, searchText]);

  // ── Restart ────────────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    setCurrent(0);
    setAnswers(new Array(questions.length).fill(null));
    setSelected(null);
    setSubmitted(false);
    setResult(null);
    setShowSummary(false);
  }, [questions]);

  // ── Navigate to a question ─────────────────────────────────────────────────
  const jumpTo = useCallback((idx) => {
    setCurrent(idx);
    setSelected(null);
    setSubmitted(false);
    setResult(null);
    setShowSummary(false);
  }, []);

  const goNext = useCallback(() => {
    if (current < questions.length - 1) jumpTo(current + 1);
    else setShowSummary(true);
  }, [current, questions.length, jumpTo]);

  const goPrev = useCallback(() => {
    if (current > 0) jumpTo(current - 1);
  }, [current, jumpTo]);

  // ── Submit an answer ────────────────────────────────────────────────────────
  const handleSubmit = useCallback((chosenLabel) => {
    const q = questions[current];
    const isNA = !q.correct_answer;

    let correct = null;
    if (!isNA) {
      // correct_answer may be a label like "A" or the option text
      // The JSON stores it as a label letter (A/B/C/D)
      correct = chosenLabel === q.correct_answer;
    }

    const newAnswers = [...answers];
    newAnswers[current] = {
      answered: true,
      chosen: chosenLabel,
      correct,
      notAvailable: isNA,
    };
    setAnswers(newAnswers);
    setSubmitted(true);
    setResult(isNA ? null : correct ? 'correct' : 'wrong');
    setSelected(chosenLabel);
  }, [questions, current, answers]);

  // ─── Render guards ─────────────────────────────────────────────────────────
  if (!exam || !set) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>❌</div>
        <h2>Practice set not found.</h2>
        <button onClick={() => navigate('govt-pyq')} style={{ marginTop: '16px', padding: '10px 24px', borderRadius: '10px', border: 'none', background: 'var(--violet)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid var(--border)', borderTop: '3px solid var(--violet)', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ color: 'var(--text-sec)' }}>Loading {set.title}…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ color: 'var(--coral)' }}>Failed to load practice set.</h2>
        <p style={{ color: 'var(--text-sec)' }}>{error}</p>
        <button onClick={() => navigate('govt-pyq')} style={{ marginTop: '16px', padding: '10px 24px', borderRadius: '10px', border: 'none', background: 'var(--violet)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          Go Back
        </button>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="page">
        {answers.filter(a => a?.correct === true).length > questions.length * 0.7 && <Confetti />}
        <ScoreSummary
          questions={questions}
          answers={answers}
          onRestart={restart}
          navigate={navigate}
        />
      </div>
    );
  }

  const q = questions[current];
  const adaptedOptions = adaptOptions(q.options);
  const isNA = !q.correct_answer;
  const thisAnswer = answers[current];

  return (
    <div className="page-wide" style={{ animation: 'fadeIn 0.4s ease' }}>
      {result === 'correct' && <Confetti />}
      <Mascot result={result} />

      {/* ── Back ────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={() => navigate('govt-pyq')}
          style={{ background: 'none', border: 'none', color: 'var(--text-sec)', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: 0, fontWeight: 600 }}
        >
          ← Back to Sets
        </button>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)', fontWeight: 600 }}>
          {exam.title} · {set.title}
        </div>
      </div>

      {/* ── Search & Filter ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search questions, topics, IDs..."
          value={searchText}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: '200px', padding: '10px 14px', borderRadius: '10px',
            border: '1px solid var(--border)', background: 'var(--surface2)',
            color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none'
          }}
        />
        <select
          value={topicFilter}
          onChange={e => setTopicFilter(e.target.value)}
          style={{
            padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)',
            background: 'var(--surface2)', color: 'var(--text-main)', fontSize: '0.9rem', cursor: 'pointer'
          }}
        >
          {topics.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        {(searchText || topicFilter !== 'All') && (
          <button
            onClick={() => { setSearch(''); setTopicFilter('All'); }}
            style={{ padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-sec)', cursor: 'pointer', fontWeight: 600 }}
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Main Layout ─────────────────────────────────────────────── */}
      <div className="practice-layout">
        {/* Left column: question viewer */}
        <div className="flex-col gap-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* ── Meta bar ───────────────────────────────────────── */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px',
                alignItems: 'center'
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-sec)', background: 'var(--surface2)', padding: '3px 8px', borderRadius: '6px' }}>
                  {q.id}
                </span>
                <DiffBadge diff={q.difficulty} />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sec)' }}>
                  ⏱ ~{q.estimated_time}s
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-sec)' }}>
                  {q.topic}
                </span>
                {q.subtopic && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-sec)' }}>
                    · {q.subtopic}
                  </span>
                )}
              </div>

              {/* ── Question Card ───────────────────────────────────── */}
              <div className="question-card">
                {/* Question number + tags */}
                <div className="qc-header">
                  <div>
                    <div className="qc-meta">
                      <span className="qc-concept">Q {current + 1} / {questions.length}</span>
                      <DiffBadge diff={q.difficulty} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {q.exam_tags?.slice(0, 2).map(tag => (
                      <span key={tag} style={{
                        background: 'rgba(124,58,237,0.1)', color: 'var(--violet)',
                        borderRadius: '100px', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Question text */}
                <div className="qc-question" style={{ whiteSpace: 'pre-line' }}>
                  {q.question}
                </div>

                {/* Options */}
                <div className="options-grid">
                  {q.options.map(opt => {
                    let cls = 'option-btn';
                    if (submitted) {
                      if (!isNA && opt.label === q.correct_answer)               cls = 'option-btn correct';
                      else if (opt.label === selected && opt.label !== q.correct_answer) cls = 'option-btn wrong';
                    } else if (selected === opt.label) {
                      cls = 'option-btn selected';
                    }
                    return (
                      <button
                        key={opt.label}
                        className={cls}
                        onClick={() => !submitted && setSelected(opt.label)}
                        disabled={submitted}
                      >
                        <span className="opt-letter">{opt.label}</span>
                        <span>{opt.text}</span>
                        {submitted && !isNA && opt.label === q.correct_answer && (
                          <span style={{ marginLeft: 'auto', color: 'var(--teal)' }}>✓</span>
                        )}
                        {submitted && opt.label === selected && opt.label !== q.correct_answer && (
                          <span style={{ marginLeft: 'auto', color: 'var(--coral)' }}>✗</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="qc-actions">
                  {!submitted ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => selected && handleSubmit(selected)}
                      disabled={!selected}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div style={{
                      padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem',
                      fontWeight: 600, animation: 'slideDown 0.3s ease',
                      ...(isNA
                        ? { background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b', color: '#f59e0b' }
                        : result === 'correct'
                        ? { background: 'rgba(29,158,117,0.1)', border: '1px solid var(--teal)', color: 'var(--teal)' }
                        : { background: 'rgba(216,90,48,0.1)',  border: '1px solid var(--coral)', color: 'var(--coral)' }
                      )
                    }}>
                      {isNA
                        ? '📋 The official answer for this question is currently unavailable.'
                        : result === 'correct'
                        ? '🎉 Correct!'
                        : `❌ Incorrect. Correct answer: ${q.correct_answer}`
                      }
                    </div>
                  )}
                </div>
              </div>

              {/* ── Navigation Controls ─────────────────────────────── */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'space-between' }}>
                <button
                  onClick={goPrev}
                  disabled={current === 0}
                  style={{
                    padding: '10px 22px', borderRadius: '10px', border: '1px solid var(--border)',
                    background: 'var(--surface)', color: 'var(--text-main)', fontWeight: 700,
                    cursor: current === 0 ? 'not-allowed' : 'pointer', opacity: current === 0 ? 0.5 : 1
                  }}
                >
                  ← Previous
                </button>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)', display: 'flex', alignItems: 'center' }}>
                  {current + 1} / {questions.length}
                </div>

                <button
                  onClick={goNext}
                  style={{
                    padding: '10px 22px', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, var(--violet), #6d28d9)',
                    color: '#fff', fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(124,58,237,0.3)'
                  }}
                >
                  {current === questions.length - 1 ? 'Finish Set ✓' : 'Next →'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right column: navigator */}
        <div className="flex-col gap-24">
          <QuestionPalette
            total={questions.length}
            current={current}
            answers={answers}
            onJump={jumpTo}
          />

          {/* Category legend */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-sec)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Question Info
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
              <div><span style={{ color: 'var(--text-sec)' }}>Category: </span><strong>{q.category}</strong></div>
              <div><span style={{ color: 'var(--text-sec)' }}>Topic: </span><strong>{q.topic}</strong></div>
              <div><span style={{ color: 'var(--text-sec)' }}>Subtopic: </span><strong>{q.subtopic}</strong></div>
              <div><span style={{ color: 'var(--text-sec)' }}>Est. Time: </span><strong>{q.estimated_time}s</strong></div>
              <div style={{ marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {q.exam_tags?.map(tag => (
                  <span key={tag} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '100px', padding: '2px 8px', fontSize: '0.7rem', color: 'var(--text-sec)', fontWeight: 600 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
