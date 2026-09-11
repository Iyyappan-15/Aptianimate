// src/pages/HomePage.jsx
import { useEffect, useState, useRef } from 'react';
import { CATEGORIES } from '../data/questionBank';
import { TOPIC_CONTENT } from '../data/topicContent';
import { getGoal, setGoal, getLastSession, getStats } from '../utils/localStorage';

import CampusPlacementView from '../components/CampusPlacementView';
import GovtExamView from '../components/GovtExamView';
import AptitudeRoadmapView from '../components/AptitudeRoadmapView';
import VisualExplanationDemo from '../components/VisualExplanationDemo';
import MockTestsView from '../components/MockTestsView';
import TechnicalInterviewPrepView from '../components/TechnicalInterviewPrepView';

export default function HomePage({ navigate }) {
  const [goal, setLocalGoal] = useState(() => {
    const saved = getGoal();
    // Default to 'Campus Placements' for first-time visitors
    return saved || 'Campus Placements';
  });
  const [lastSession, setLocalLastSession] = useState(null);
  const [_stats, setLocalStats] = useState(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    setLocalLastSession(getLastSession());
    setLocalStats(getStats());
    
    // Close search dropdown on click outside
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Search Input
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const results = Object.entries(TOPIC_CONTENT)
      .filter(([_slug, content]) => content.title.toLowerCase().includes(query))
      .map(([slug, content]) => ({ slug, title: content.title, icon: content.icon }))
      .slice(0, 5); // Max 5 results
    setSearchResults(results);
  }, [searchQuery]);

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
        <div className="hero-badge">🎯 Built for Campus Placement &amp; Competitive Exams</div>
        <h1>Master Aptitude<br/>Visually.</h1>
        <p>Stop memorizing. Start understanding. Learn through animations, battle friends in live quizzes, and practice 800+ questions — completely free.</p>

        {/* CTA Buttons */}
        <div className="hero-cta-row">
          <button className="hero-btn-primary" onClick={() => handleGoalSelect('Campus Placements')}>
            ▶ Start Practicing Free
          </button>
          <button className="hero-btn-secondary" onClick={() => navigate('battle')}>
            ⚔️ Challenge a Friend
          </button>
        </div>

        {/* Stats Bar */}
        <div className="hero-stats-bar">
          <div className="hero-stat"><span className="hero-stat-num">800+</span><span className="hero-stat-label">Questions</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><span className="hero-stat-num">30+</span><span className="hero-stat-label">Topics</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><span className="hero-stat-num">6</span><span className="hero-stat-label">Companies</span></div>
          <div className="hero-stat-divider" />
          <div className="hero-stat"><span className="hero-stat-num">100%</span><span className="hero-stat-label">Free</span></div>
        </div>

        {/* Global Search Box */}
        <div className="home-search-container" ref={searchRef}>
          <div className={`home-search-box ${isSearchFocused ? 'focused' : ''}`}>
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search for any topic (e.g. 'Percentages', 'Time & Work')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
          </div>
          
          {isSearchFocused && searchQuery.trim() && (
            <div className="home-search-dropdown">
              {searchResults.map(res => (
                <div 
                  key={res.slug} 
                  className="search-result-item"
                  onClick={() => navigate(`topic/${res.slug}`)}
                >
                  <span className="sr-icon">{res.icon}</span>
                  <span className="sr-title">{res.title}</span>
                </div>
              ))}
              {/* Always show Ask AI option at the bottom */}
              <div
                className="search-result-item"
                onClick={() => {
                  setIsSearchFocused(false);
                  navigate(`ask?q=${encodeURIComponent(searchQuery.trim())}`);
                }}
                style={{
                  borderTop: searchResults.length > 0 ? '1px solid var(--border)' : 'none',
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(20,184,166,0.06))',
                  marginTop: searchResults.length > 0 ? '4px' : '0',
                }}
              >
                <span className="sr-icon">✨</span>
                <span className="sr-title" style={{ color: 'var(--violet)', fontWeight: '700' }}>
                  Ask AI: "{searchQuery.length > 40 ? searchQuery.slice(0, 40) + '...' : searchQuery}"
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>Solve visually →</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Feature Highlight Cards */}
      <div className="hero-features">
        <div className="hero-feature-card" onClick={() => handleGoalSelect('Campus Placements')}>
          <div className="hero-feature-icon">🎬</div>
          <div className="hero-feature-title">Animated Learning</div>
          <div className="hero-feature-desc">Complex topics made visual and simple — learn concepts that actually stick.</div>
          <div className="hero-feature-link">Explore Topics →</div>
        </div>
        <div className="hero-feature-card hero-feature-card--battle" onClick={() => navigate('battle')}>
          <div className="hero-feature-icon">⚔️</div>
          <div className="hero-feature-title">AI Battle Mode</div>
          <div className="hero-feature-desc">Challenge friends to live aptitude quizzes. Turn studying into a competition.</div>
          <div className="hero-feature-link">Start a Battle →</div>
        </div>
        <div className="hero-feature-card" onClick={() => handleGoalSelect('Campus Placements')}>
          <div className="hero-feature-icon">📚</div>
          <div className="hero-feature-title">800+ Question Bank</div>
          <div className="hero-feature-desc">Company-tagged questions across Quant, Verbal, Logical &amp; Technical topics.</div>
          <div className="hero-feature-link">Browse Bank →</div>
        </div>
      </div>

      <div className="goal-selector">
        {['Campus Placements', 'Government Exams', 'Aptitude Roadmap', 'Mock Tests', 'Technical Interview Prep'].map(g => (
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

      {/* ProgressDashboard removed as requested */}

      {goal === 'Campus Placements' ? (
        <CampusPlacementView navigate={navigate} />
      ) : goal === 'Government Exams' ? (
        <GovtExamView navigate={navigate} />
      ) : goal === 'Aptitude Roadmap' ? (
        <AptitudeRoadmapView navigate={navigate} />
      ) : goal === 'Mock Tests' ? (
        <MockTestsView navigate={navigate} />
      ) : goal === 'Technical Interview Prep' ? (
        <TechnicalInterviewPrepView navigate={navigate} />
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

      <VisualExplanationDemo navigate={navigate} />
    </div>
  );
}
