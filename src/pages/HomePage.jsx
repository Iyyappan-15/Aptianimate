// src/pages/HomePage.jsx
import { useEffect, useState, useRef } from 'react';
import { CATEGORIES } from '../data/questionBank';
import { TOPIC_CONTENT } from '../data/topicContent';
import { getGoal, setGoal, getLastSession, getStats } from '../utils/localStorage';

import CampusPlacementView from '../components/CampusPlacementView';
import GovtExamView from '../components/GovtExamView';
import AptitudeRoadmapView from '../components/AptitudeRoadmapView';
import VisualExplanationDemo from '../components/VisualExplanationDemo';

export default function HomePage({ navigate }) {
  const [goal, setLocalGoal] = useState(getGoal());
  const [lastSession, setLocalLastSession] = useState(null);
  const [stats, setLocalStats] = useState(null);
  
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
      .filter(([slug, content]) => content.title.toLowerCase().includes(query))
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
        <div className="hero-badge">✨ Interactive Learning Engine</div>
        <h1>Master Aptitude<br/>Visually.</h1>
        <p>Don't just memorize formulas. Understand them through interactive animations and step-by-step logic.</p>
        
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
