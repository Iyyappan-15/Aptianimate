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
    if (!category) {
      navigate('');
      return;
    }
    setCat(category);
    
    // Load local questions + any custom ones generated this session
    // In a real app with backend, we'd fetch these from DB.
    // For local, we load the bank.
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
      // Give it an ID and tag it to this category
      parsedQ.id = 'custom_' + Date.now();
      parsedQ.category = categoryId;
      
      // Navigate straight to practice mode with this new question via state/prop (in real app)
      // Since we use hash router without complex state, we'll store it globally for now 
      // or just jump to it. Let's add it to the top of the list for this session.
      setQuestions(prev => [parsedQ, ...prev]);
      setCustomText('');
      
      // Jump directly to practice it
      setLastSession(categoryId, parsedQ.id);
      
      // Pass the generated question through localStorage temp buffer to avoid complex routing state
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
    <div className="page" style={{ animation: 'fadeIn 0.5s ease' }}>
      <button className="btn btn-ghost btn-sm mb-16" onClick={() => navigate('')}>
        ← Back to Home
      </button>

      <div className="section-header" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="cat-icon" style={{ fontSize: '2.5rem', margin: 0 }}>{cat.icon}</div>
          <div>
            <div className="section-title" style={{ fontSize: '1.5rem', marginBottom: 4 }}>{cat.name}</div>
            <div className="text-muted text-sm">{cat.description}</div>
          </div>
        </div>
      </div>

      {/* AI Question Input */}
      <div className="user-input-section mb-24">
        <div className="uq-title">✨ Explain My Question</div>
        <div className="uq-sub">Paste any aptitude question here. Groq AI will solve it and generate an animation.</div>
        <textarea
          className="uq-textarea"
          placeholder="e.g. A train 150m long is running with a speed of 68 km/h. In what time will it pass a man..."
          value={customText}
          onChange={e => setCustomText(e.target.value)}
          disabled={loadingAI}
        />
        {aiError && <div className="text-coral text-sm mt-8">{aiError}</div>}
        <div className="uq-actions">
          <button className="btn btn-primary" onClick={handleCustomSubmit} disabled={loadingAI || !customText.trim()}>
            {loadingAI ? <><div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Analyzing...</> : 'Generate Explanation'}
          </button>
        </div>
      </div>

      {loadingAI && <div className="mb-24"><LoadingSkeleton /></div>}

      <div className="section-title mb-16">Practice Bank</div>
      
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
                  <span className={`badge ${q.difficulty === 'Easy' ? 'badge-easy' : q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>{q.difficulty}</span>
                </div>
              </div>
              <div className="q-status">
                {status && (
                  <div className={`q-status-dot ${status.correct ? 'correct' : 'wrong'}`} title={status.correct ? 'Answered Correctly' : 'Answered Incorrectly'} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
