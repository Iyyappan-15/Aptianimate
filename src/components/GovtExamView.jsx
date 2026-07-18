// src/components/GovtExamView.jsx
import { useState } from 'react';
import { GOVT_EXAM_SYLLABUS } from '../data/govtExamSyllabus';
import { topicToSlug } from '../data/topicContent';

export default function GovtExamView({ navigate }) {
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
        <h2 className="cp-title">Government Exam Roadmap</h2>
        <p className="cp-subtitle">
          Master Quant, Reasoning & English for SSC, Banking, Railways & State Exams.
        </p>
      </div>

      {/* Feature Cards (PYQ, Roadmap, Daily Practice) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        
        <div onClick={() => navigate('govt-pyq')} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '12px' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--violet)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}>
          <div style={{ fontSize: '2rem' }}>📚</div>
          <div>
            <div style={{ fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>Previous Year Questions</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)' }}>Solve SSC, IBPS, RRB PYQs visually.</div>
          </div>
        </div>

        <div onClick={() => navigate('govt-daily')} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '12px' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--teal)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}>
          <div style={{ fontSize: '2rem' }}>⚡</div>
          <div>
            <div style={{ fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>Daily Practice</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)' }}>20 fresh questions mixed daily.</div>
          </div>
        </div>

        <div onClick={() => navigate('govt-roadmaps')} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '12px' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--amber)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}>
          <div style={{ fontSize: '2rem' }}>🗺️</div>
          <div>
            <div style={{ fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>Study Roadmaps</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-sec)' }}>30/60/90 day curated plans.</div>
          </div>
        </div>

      </div>

      {/* Section Tabs */}
      <div className="cp-tabs">
        {GOVT_EXAM_SYLLABUS.map((section, idx) => (
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
            const section = GOVT_EXAM_SYLLABUS[openSection];
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
                                onClick={() => navigate(`topic/${topicToSlug(topic)}/${encodeURIComponent(topic)}`)}
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
