// src/pages/CategoryPage.jsx
import { useEffect, useState } from 'react';
import { CATEGORIES, QUESTION_BANK_MAP } from '../data/questionBank';
import { getAnswered, setLastSession } from '../utils/localStorage';
import { parseUserQuestion } from '../api/groqApi';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function CategoryPage({ categoryId, navigate }) {
  const [questions, setQuestions] = useState([]);
  const [cat, setCat] = useState(null);
  const [answeredMap, setAnsweredMap] = useState({});
  const [customText, setCustomText] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category) { navigate(''); return; }
    setCat(category);
    const bankQs = QUESTION_BANK_MAP[categoryId] || [];
    setQuestions(bankQs);
    setAnsweredMap(getAnswered());
  }, [categoryId, navigate]);

  const handleCustomSubmit = async () => {
    if (!customText.trim()) return;
    setLoadingAI(true);
    setAiError('');
    try {
      const parsedQ = await parseUserQuestion(customText);
      parsedQ.id = 'custom_' + Date.now();
      parsedQ.category = categoryId;
      setQuestions(prev => [parsedQ, ...prev]);
      setCustomText('');
      setLastSession(categoryId, parsedQ.id);
      localStorage.setItem('temp_custom_q', JSON.stringify(parsedQ));
      navigate(`practice/${parsedQ.id}`);
    } catch (e) {
      setAiError(e.message);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleQuestionClick = (qId) => {
    setLastSession(categoryId, qId);
    navigate(`practice/${qId}`);
  };

  if (!cat) return null;

  return (
    <div className="page cat-page" style={{ animation: 'fadeIn 0.5s ease' }}>
      <button className="btn btn-ghost btn-sm mb-16" onClick={() => navigate('')}>
        ← Back to Home
      </button>

      {/* ── Category Header ── */}
      <div className="cat-hero" style={{ '--accent': cat.accent }}>
        <div className="cat-hero-icon">{cat.icon}</div>
        <div className="cat-hero-text">
          <h1 className="cat-hero-title">{cat.name}</h1>
          <p className="cat-hero-desc">{cat.description}</p>
        </div>
      </div>

      {/* ── Teaching Section ── */}
      {cat.teaching && <TeachingSection teaching={cat.teaching} accent={cat.accent} />}

      {/* ── AI Question Input (user-entered, at top of practice) ── */}
      <div className="user-input-section mb-24">
        <div className="uq-header">
          <div>
            <div className="uq-title">✨ Ask Your Own Question</div>
            <div className="uq-sub">Paste any aptitude question. AI will solve it visually, step by step.</div>
          </div>
        </div>
        <textarea
          className="uq-textarea"
          placeholder={`e.g. A number when divided by 6 leaves remainder 3. What is the remainder when square of the number is divided by 6?`}
          value={customText}
          onChange={e => setCustomText(e.target.value)}
          disabled={loadingAI}
        />
        {aiError && <div className="text-coral text-sm mt-8">⚠️ {aiError}</div>}
        <div className="uq-actions">
          <button
            className="btn btn-primary"
            onClick={handleCustomSubmit}
            disabled={loadingAI || !customText.trim()}
          >
            {loadingAI
              ? <><div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Solving Visually...</>
              : '🎬 Generate Visual Explanation'}
          </button>
        </div>
      </div>

      {loadingAI && <div className="mb-24"><LoadingSkeleton /></div>}

      {/* ── Practice Bank ── */}
      <div className="practice-bank-header">
        <div className="section-title">📚 Practice Bank</div>
        <span className="practice-count">{questions.length} Questions</span>
      </div>

      <div className="question-list">
        {questions.map((q, idx) => {
          const status = answeredMap[q.id];
          return (
            <div key={q.id} className="question-item" onClick={() => handleQuestionClick(q.id)}>
              <div className="q-num">{idx + 1}</div>
              <div className="q-body">
                <div className="q-text">{q.question_text}</div>
                <div className="q-tags">
                  <span className="q-cat" style={{ color: cat.accent }}>{q.concept_name}</span>
                  <span className={`badge ${q.difficulty === 'Easy' ? 'badge-easy' : q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>
                    {q.difficulty}
                  </span>
                </div>
              </div>
              <div className="q-status">
                {status && (
                  <div
                    className={`q-status-dot ${status.correct ? 'correct' : 'wrong'}`}
                    title={status.correct ? 'Answered Correctly' : 'Answered Incorrectly'}
                  />
                )}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--muted2)' }}>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Teaching Section Component ─────────────────────────────────────────────────
function TeachingSection({ teaching, accent }) {
  const [openFormula, setOpenFormula] = useState(null);

  return (
    <div className="teaching-section">

      {/* Topics Covered */}
      <div className="teaching-block">
        <div className="teaching-block-title">
          <span className="teaching-icon">📌</span> Topics Covered
        </div>
        <div className="topics-grid">
          {teaching.topics.map((topic, i) => (
            <div key={i} className="topic-chip" style={{ '--chip-accent': accent }}>
              <span className="topic-num">{i + 1}</span>
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Key Formulas */}
      <div className="teaching-block">
        <div className="teaching-block-title">
          <span className="teaching-icon">📐</span> Key Formulas & Tricks
        </div>
        <div className="formulas-grid">
          {teaching.formulas.map((f, i) => (
            <div
              key={i}
              className={`formula-card ${openFormula === i ? 'open' : ''}`}
              onClick={() => setOpenFormula(openFormula === i ? null : i)}
            >
              <div className="formula-card-header">
                <span className="formula-card-title">{f.title}</span>
                <span className="formula-card-chevron">{openFormula === i ? '▲' : '▼'}</span>
              </div>
              <div className="formula-card-formula">{f.formula}</div>
              {openFormula === i && f.tip && (
                <div className="formula-card-tip">
                  💡 {f.tip}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Placement Tip */}
      {teaching.tip && (
        <div className="teaching-tip-banner" style={{ '--accent': accent }}>
          <div className="teaching-tip-text">{teaching.tip}</div>
        </div>
      )}
    </div>
  );
}
