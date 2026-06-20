// src/pages/CategoryPage.jsx
import { useEffect, useRef, useState } from 'react';
import { CATEGORIES, QUESTION_BANK_MAP } from '../data/questionBank';
import { getAnswered, setLastSession } from '../utils/localStorage';
import { parseUserQuestion } from '../api/groqApi';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function CategoryPage({ categoryId, navigate }) {
  const [questions, setQuestions]   = useState([]);
  const [cat, setCat]               = useState(null);
  const [answeredMap, setAnsweredMap] = useState({});
  const [customText, setCustomText] = useState('');
  const [loadingAI, setLoadingAI]   = useState(false);
  const [aiError, setAiError]       = useState('');
  const [activeTopic, setActiveTopic] = useState(null); // which topic card is expanded
  const practiceRef = useRef(null);

  useEffect(() => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category) { navigate(''); return; }
    setCat(category);
    setQuestions(QUESTION_BANK_MAP[categoryId] || []);
    setAnsweredMap(getAnswered());
  }, [categoryId, navigate]);

  const scrollToPractice = () => {
    practiceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
  const topics = cat.teaching?.topics || [];

  return (
    <div className="page cat-page" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ marginBottom: '24px' }}>
        <button 
          onClick={() => navigate('')} 
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: 0, fontWeight: 500, transition: 'color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--text)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back
        </button>
      </div>

      {/* ── Hero ── */}
      <div className="cat-hero" style={{ '--accent': cat.accent }}>
        <div className="cat-hero-icon">{cat.icon}</div>
        <div className="cat-hero-text">
          <h1 className="cat-hero-title">{cat.name}</h1>
          <p className="cat-hero-desc">{cat.description}</p>
        </div>
        <button className="btn btn-primary btn-sm cat-hero-cta" onClick={scrollToPractice}>
          Practice Questions →
        </button>
      </div>

      {/* ── Topics Section ── */}
      {topics.length > 0 && (
        <div className="topics-section">
          <div className="topics-section-header">
            <div className="topics-section-title">
              <span>📌</span> Topics in this Chapter
            </div>
            <div className="topics-section-sub">
              Click any topic to learn its concepts, formulas & tricks
            </div>
          </div>

          {/* Topic chips row */}
          <div className="topics-chip-row">
            {topics.map((topic, i) => {
              const topicName = typeof topic === 'string' ? topic : topic.name;
              const isActive = activeTopic === i;
              return (
                <button
                  key={i}
                  className={`topic-chip-btn ${isActive ? 'active' : ''}`}
                  style={{ '--chip-accent': cat.accent }}
                  onClick={() => setActiveTopic(isActive ? null : i)}
                >
                  <span className="topic-chip-num">{i + 1}</span>
                  {topicName}
                  <span className="topic-chip-arrow">{isActive ? '▲' : '▼'}</span>
                </button>
              );
            })}
          </div>

          {/* Expanded Topic Detail Panel */}
          {activeTopic !== null && typeof topics[activeTopic] === 'object' && (
            <TopicDetailPanel
              topic={topics[activeTopic]}
              accent={cat.accent}
              topicIndex={activeTopic}
              onGoToQuestions={scrollToPractice}
            />
          )}

          {/* Placement Tip Banner */}
          {cat.teaching?.tip && (
            <div className="teaching-tip-banner" style={{ '--accent': cat.accent }}>
              <div className="teaching-tip-text">{cat.teaching.tip}</div>
            </div>
          )}
        </div>
      )}

      {/* ── Ask Your Own Question ── */}
      <div className="user-input-section mb-24">
        <div className="uq-header">
          <div>
            <div className="uq-title">✨ Ask Your Own Question</div>
            <div className="uq-sub">Paste any aptitude question. AI will solve it visually, step by step.</div>
          </div>
        </div>
        <textarea
          className="uq-textarea"
          placeholder="e.g. A number when divided by 6 leaves remainder 3. What is the remainder when the square of the number is divided by 6?"
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
      <div ref={practiceRef} className="practice-bank-header">
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
                  <div className={`q-status-dot ${status.correct ? 'correct' : 'wrong'}`} />
                )}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--muted2)', flexShrink: 0 }}>
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

// ── Beautiful Formula Component ────────────────────────────────────────────────
// Splits on the FIRST = only, so "a = b = c" renders as "a" = "b = c"
function BeautifulFormula({ text, accent }) {
  const eqIdx = text.indexOf('=');
  
  if (eqIdx !== -1) {
    const lhs = text.slice(0, eqIdx).trim();
    const rhs = text.slice(eqIdx + 1).trim();
    return (
      <div className="beautiful-formula" style={{ '--accent': accent }}>
        <span className="formula-lhs">{lhs}</span>
        <span className="formula-equals">=</span>
        <span className="formula-rhs">{rhs}</span>
      </div>
    );
  }

  // No equals sign — render as a single styled chip
  return (
    <div className="beautiful-formula" style={{ '--accent': accent }}>
      <span className="formula-single">{text}</span>
    </div>
  );
}

// ── Topic Detail Panel ──────────────────────────────────────────────────────────
function TopicDetailPanel({ topic, accent, topicIndex, onGoToQuestions }) {
  return (
    <div className="topic-detail-panel" style={{ '--accent': accent }}>
      {/* Header */}
      <div className="tdp-header">
        <div className="tdp-num" style={{ background: accent }}>{topicIndex + 1}</div>
        <div>
          <div className="tdp-title">{topic.name}</div>
          <div className="tdp-desc">{topic.description}</div>
        </div>
      </div>

      {/* Formulas grid */}
      {topic.formulas?.length > 0 && (
        <div className="tdp-section">
          <div className="tdp-section-label">📐 Formulas &amp; Rules</div>
          <div className="tdp-formulas">
            {topic.formulas.map((f, i) => (
              <div
                key={i}
                className="tdp-formula-card"
                style={{ '--accent': accent }}
              >
                <div className="tdp-formula-title">{f.title}</div>
                <div className="tdp-formula-body">
                  <BeautifulFormula text={f.formula} accent={accent} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Worked Example */}
      {topic.example && (
        <div className="tdp-example">
          <div className="tdp-example-inner">
            <div className="tdp-example-icon">💡</div>
            <div className="tdp-example-content">
              <div className="tdp-example-label">Worked Example</div>
              <div className="tdp-example-text">{topic.example}</div>
            </div>
          </div>
        </div>
      )}

      {/* Go to Questions CTA */}
      <div className="tdp-cta-row">
        <button
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          onClick={onGoToQuestions}
        >
          <span>📚</span> Go to Practice Questions ↓
        </button>
      </div>
    </div>
  );
}

