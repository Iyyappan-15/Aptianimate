// src/pages/SavedPage.jsx
import { useEffect, useState } from 'react';
import { getBookmarks, getAnswered } from '../utils/localStorage';
import { QUESTIONS } from '../data/questionBank';

export default function SavedPage({ navigate }) {
  const [savedQs, setSavedQs] = useState([]);
  const [answeredMap, setAnsweredMap] = useState({});

  useEffect(() => {
    const bms = getBookmarks();
    // Filter questions that are in the bookmark array
    const qs = QUESTIONS.filter(q => bms.includes(q.id));
    setSavedQs(qs);
    setAnsweredMap(getAnswered());
  }, []);

  return (
    <div className="page" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="section-header">
        <div className="section-title">Saved Questions</div>
      </div>

      {savedQs.length === 0 ? (
        <div className="empty-state">
          <div className="icon">❤️</div>
          <div className="title">No saved questions yet</div>
          <div className="sub">Click the heart icon on any question to save it here for quick review.</div>
          <button className="btn btn-primary mt-16" onClick={() => navigate('')}>Explore Categories</button>
        </div>
      ) : (
        <div className="saved-grid">
          {savedQs.map(q => {
            const status = answeredMap[q.id];
            return (
              <div key={q.id} className="saved-card" onClick={() => navigate(`practice/${q.id}`)} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="saved-card-concept">{q.concept_name}</div>
                  {status && <div className={`q-status-dot ${status.correct ? 'correct' : 'wrong'}`} />}
                </div>
                <div className="saved-card-text">{q.question_text}</div>
                <div className="saved-card-actions">
                  <span className={`badge ${q.difficulty === 'Easy' ? 'badge-easy' : q.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}`}>{q.difficulty}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
