// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { CATEGORIES } from '../data/questionBank';
import { getGoal, setGoal, getLastSession, getStats } from '../utils/localStorage';
import ProgressDashboard from '../components/ProgressDashboard';
import CampusPlacementView from '../components/CampusPlacementView';

export default function HomePage({ navigate }) {
  const [goal, setLocalGoal] = useState(getGoal());
  const [lastSession, setLocalLastSession] = useState(null);
  const [stats, setLocalStats] = useState(null);

  useEffect(() => {
    setLocalLastSession(getLastSession());
    setLocalStats(getStats());
  }, []);

  const handleGoalSelect = (g) => {
    setGoal(g);
    setLocalGoal(g);
  };

  const handleContinue = () => {
    if (lastSession) {
      navigate(`category/${lastSession.categoryId}`);
    }
  };

  return (
    <div className="page" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="hero">
        <div className="hero-badge">✨ Interactive Learning Engine</div>
        <h1>Master Aptitude<br/>Visually.</h1>
        <p>Don't just memorize formulas. Understand them through interactive animations and step-by-step logic.</p>
      </div>

      <div className="goal-selector">
        {['Campus Placements', 'Government Exams', 'Interview Aptitude', 'Topic-wise Practice', 'Most Asked Topics', 'Mock Tests'].map(g => (
          <button
            key={g}
            className={`goal-btn ${goal === g ? 'selected' : ''}`}
            onClick={() => handleGoalSelect(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {lastSession && (
        <div className="last-session-card" onClick={handleContinue}>
          <div className="ls-icon">⏱️</div>
          <div className="ls-body">
            <div className="ls-label">Continue Learning</div>
            <div className="ls-title">Jump back into {CATEGORIES.find(c => c.id === lastSession.categoryId)?.name || 'practice'}</div>
          </div>
          <div className="ls-arrow">→</div>
        </div>
      )}

      {stats && stats.total_attempted > 0 && (
        <div style={{ marginBottom: 48 }}>
          <ProgressDashboard />
        </div>
      )}

      {goal === 'Campus Placements' ? (
        <CampusPlacementView navigate={navigate} />
      ) : (
        <>
          <div className="section-header">
            <div className="section-title">Explore Categories</div>
          </div>

          {['Quantitative', 'Logical'].map(pillar => (
            <div key={pillar}>
              <div className="pillar-label">{pillar}</div>
              <div className="category-grid">
                {CATEGORIES.filter(c => c.pillar === pillar).map(cat => (
                  <div
                    key={cat.id}
                    className="category-card"
                    style={{ '--accent-color': cat.accent }}
                    onClick={() => navigate(`category/${cat.id}`)}
                  >
                    <div className="cat-icon">{cat.icon}</div>
                    <div className="cat-name">{cat.name}</div>
                    <div className="cat-meta">{cat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
