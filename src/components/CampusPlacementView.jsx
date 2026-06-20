// src/components/CampusPlacementView.jsx
import React from 'react';
import { CAMPUS_PLACEMENT_SYLLABUS } from '../data/campusPlacementSyllabus';

export default function CampusPlacementView({ navigate }) {
  return (
    <div className="campus-syllabus-view" style={{ animation: 'fadeIn 0.5s ease' }}>
      <div className="section-header">
        <div className="section-title">Campus Placements Syllabus</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Comprehensive topics to master for your dream job. Click any available topic to start practicing.
        </p>
      </div>

      {CAMPUS_PLACEMENT_SYLLABUS.map((section, idx) => (
        <div key={idx} className="syllabus-section">
          <div className="syllabus-section-header">
            <span className="syllabus-icon">{section.icon}</span>
            <h2>{section.section}</h2>
          </div>
          
          <div className="syllabus-grid">
            {section.subcategories.map((subcat, sIdx) => (
              <div key={sIdx} className="syllabus-card">
                <h3>{subcat.name}</h3>
                <div className="syllabus-topics">
                  {subcat.topics.map((topic, tIdx) => {
                    // Temporarily we don't have routing for all these, 
                    // but we style them as clickable pills.
                    return (
                      <span 
                        key={tIdx} 
                        className="syllabus-topic-pill"
                        onClick={() => {
                          // TODO: Route to specific topic practice when available
                          // navigate(`practice/${topic.toLowerCase().replace(/ /g, '-')}`);
                          alert(`Practice module for "${topic}" coming soon!`);
                        }}
                      >
                        {topic}
                      </span>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
