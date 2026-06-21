// src/components/CampusPlacementView.jsx
import { useState } from 'react';
import { CAMPUS_PLACEMENT_SYLLABUS } from '../data/campusPlacementSyllabus';

export default function CampusPlacementView({ navigate }) {
  const [openSection, setOpenSection] = useState(0);
  const [openSubcat, setOpenSubcat] = useState(null);

  const toggleSection = (idx) => {
    setOpenSection(openSection === idx ? null : idx);
    setOpenSubcat(null);
  };

  const toggleSubcat = (key) => {
    setOpenSubcat(openSubcat === key ? null : key);
  };

  return (
    <div className="cp-view">
      {/* Header */}
      <div className="cp-header">
        <h2 className="cp-title">Campus Placement Roadmap</h2>
        <p className="cp-subtitle">
          Tap a section to explore topics. Click any topic to start practising.
        </p>
      </div>

      {/* Section Tabs */}
      <div className="cp-tabs">
        {CAMPUS_PLACEMENT_SYLLABUS.map((section, idx) => (
          <button
            key={idx}
            className={`cp-tab ${openSection === idx ? 'active' : ''}`}
            style={{ '--tab-color': section.color }}
            onClick={() => toggleSection(idx)}
          >
            <span className="cp-tab-icon">{section.icon}</span>
            <span className="cp-tab-label">{section.section}</span>
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      {openSection !== null && (
        <div className="cp-content" style={{ animation: 'fadeIn 0.3s ease' }}>
          {(() => {
            const section = CAMPUS_PLACEMENT_SYLLABUS[openSection];
            return (
              <div>
                {/* Section banner */}
                <div className="cp-section-banner" style={{ background: section.gradient }}>
                  <span className="cp-banner-icon">{section.icon}</span>
                  <div>
                    <div className="cp-banner-title">{section.section}</div>
                    <div className="cp-banner-count">
                      {section.subcategories.reduce((sum, s) => sum + s.topics.length, 0)} topics across {section.subcategories.length} categories
                    </div>
                  </div>
                </div>

                {/* Subcategories */}
                <div className="cp-subcats">
                  {section.subcategories.map((subcat, sIdx) => {
                    const key = `${openSection}-${sIdx}`;
                    const isOpen = openSubcat === key;
                    return (
                      <div key={sIdx} className={`cp-subcat-card ${isOpen ? 'open' : ''}`}>
                        <button
                          className="cp-subcat-header"
                          onClick={() => toggleSubcat(key)}
                        >
                          <div className="cp-subcat-left">
                            <span className="cp-subcat-icon">{subcat.icon}</span>
                            <span className="cp-subcat-name">{subcat.name}</span>
                            <span className="cp-subcat-count">{subcat.topics.length} topics</span>
                          </div>
                          <span className={`cp-chevron ${isOpen ? 'up' : ''}`}>›</span>
                        </button>

                        {isOpen && (
                          <div className="cp-topics-grid" style={{ animation: 'fadeIn 0.25s ease' }}>
                            {subcat.topics.map((topic, tIdx) => (
                              <button
                                key={tIdx}
                                className="cp-topic-btn"
                                style={{ '--tab-color': section.color }}
                                onClick={() => {
                                  // TODO: navigate to topic page when questions are added
                                  alert(`"${topic}" — Practice module coming soon!`);
                                }}
                              >
                                <span className="cp-topic-dot" style={{ background: section.color }} />
                                {topic}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
