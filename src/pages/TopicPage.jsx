// src/pages/TopicPage.jsx
import { useState, useEffect } from 'react';
import { topicService } from '../services/topicService';

export default function TopicPage({ topicSlug, topicName, navigate }) {
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userQuestion, setUserQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadTopic() {
      setLoading(true);
      const data = await topicService.getTopicBySlug(topicSlug);
      setTopic(data);
      setLoading(false);
    }
    loadTopic();
  }, [topicSlug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userQuestion.trim()) setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="topic-page page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div className="spinner" style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
          <p>Loading topic...</p>
        </div>
      </div>
    );
  }

  // Topic not yet written — show a "coming soon" state
  if (!topic) {
    return (
      <div className="topic-page page">
        <button className="topic-back-btn" onClick={() => navigate('')}>
          ← Back
        </button>
        <div className="topic-not-found">
          <div style={{ fontSize: '3rem' }}>🚧</div>
          <h2>{decodeURIComponent(topicName || topicSlug)}</h2>
          <p>Detailed content for this topic is being prepared.<br />Check back soon!</p>
          <button className="goal-btn selected" style={{ marginTop: 24 }} onClick={() => navigate('')}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-page page" style={{ animation: 'fadeIn 0.4s ease' }}>

      {/* Back Button */}
      <button className="topic-back-btn" onClick={() => history.back()}>
        ← Back
      </button>

      {/* ── Hero ── */}
      <div className="topic-hero" style={{ '--topic-color': topic.color }}>
        <div className="topic-hero-icon">{topic.icon}</div>
        <div>
          <h1 className="topic-hero-title">{topic.title}</h1>
          <p className="topic-hero-tagline">{topic.tagline}</p>
        </div>
      </div>

      {/* ── What is this topic? ── */}
      <section className="topic-section">
        <div className="topic-section-label">📘 What is this topic?</div>
        <p className="topic-description">{topic.description}</p>
      </section>

      {/* ── Key Facts / Definitions ── */}
      {topic.keyFacts && topic.keyFacts.length > 0 && (
        <section className="topic-section">
          <div className="topic-section-label">📌 Key Facts to Remember</div>
          <div className="topic-facts-grid">
            {topic.keyFacts.map((fact, i) => (
              <div key={i} className="topic-fact-card">
                <div className="fact-label">{fact.label}</div>
                <div className="fact-value">{fact.value}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Formulas ── */}
      {topic.formulas && topic.formulas.length > 0 && (
        <section className="topic-section">
          <div className="topic-section-label">📐 Formulas & Rules</div>
          <div className="topic-formulas">
            {topic.formulas.map((f, i) => (
              <div key={i} className="topic-formula-card" style={{ '--topic-color': topic.color }}>
                <div className="formula-title">{f.title}</div>
                <div className="formula-expr">{f.formula}</div>
                {f.example && (
                  <div className="formula-example">
                    <span className="formula-example-label">Example: </span>
                    {f.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── How to Identify ── */}
      {topic.identify && topic.identify.length > 0 && (
        <section className="topic-section">
          <div className="topic-section-label">🔍 How to Identify this Type of Question</div>
          <div className="topic-identify-list">
            {topic.identify.map((tip, i) => (
              <div key={i} className="identify-item">
                <span className="identify-dot" style={{ background: topic.color }} />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Approach / Trick ── */}
      {topic.approach && topic.approach.length > 0 && (
        <section className="topic-section">
          <div className="topic-section-label">⚡ How to Approach — Fast Solving Method</div>
          <div className="topic-approach-steps">
            {topic.approach.map((a, i) => (
              <div key={i} className="approach-step">
                <div className="approach-num" style={{ background: topic.color }}>{a.step}</div>
                <div className="approach-tip">{a.tip}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── User Question Input ── */}
      <section className="topic-section">
        <div className="topic-section-label">🙋 Got a Question? Ask Here</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 16 }}>
          Paste a question you are stuck on and we will help you solve it step by step.
        </p>
        {!submitted ? (
          <form className="user-question-form" onSubmit={handleSubmit}>
            <textarea
              className="user-question-input"
              placeholder="Type or paste your aptitude question here... e.g. 'A can do a work in 10 days, B in 15 days. Together in how many days?'"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              rows={4}
            />
            <button
              type="submit"
              className="user-question-submit"
              style={{ '--topic-color': topic.color }}
              disabled={!userQuestion.trim()}
            >
              Submit Question →
            </button>
          </form>
        ) : (
          <div className="user-question-thanks">
            <div style={{ fontSize: '1.5rem' }}>✅</div>
            <div>
              <strong>Question received!</strong>
              <p>Step-by-step solution will be shown here once this feature goes live.</p>
            </div>
            <button className="topic-back-btn" style={{ marginTop: 0 }} onClick={() => { setSubmitted(false); setUserQuestion(''); }}>
              Ask another
            </button>
          </div>
        )}
      </section>

      {/* ── Similar Questions Placeholder ── */}
      <section className="topic-section">
        <div className="topic-section-label">📚 Similar Practice Questions</div>
        <div className="coming-soon-banner">
          <div className="cs-icon">🚀</div>
          <div>
            <strong>Practice questions coming soon!</strong>
            <p>We are connecting a question bank for this topic. Stay tuned — it will be live shortly.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
