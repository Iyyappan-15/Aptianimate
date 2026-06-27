// src/components/AptitudeRoadmapView.jsx
import { useState, useEffect } from 'react';
import { ROADMAP_SYLLABUS } from '../data/roadmapSyllabus';
import { topicToSlug } from '../data/topicContent';

export default function AptitudeRoadmapView({ navigate }) {
  const [phaseProgress, setPhaseProgress] = useState([]);
  
  useEffect(() => {
    // Calculate progress for each phase on mount
    const progress = ROADMAP_SYLLABUS.map(phase => {
      let completedTopics = 0;
      phase.topics.forEach(topic => {
        const slug = topicToSlug(topic);
        const p = localStorage.getItem(`topicProgress_${slug}`);
        if (p && parseInt(p, 10) === 100) {
          completedTopics++;
        }
      });
      
      return {
        phase: phase.phase,
        total: phase.topics.length,
        completed: completedTopics,
        percentage: phase.topics.length > 0 ? Math.round((completedTopics / phase.topics.length) * 100) : 0
      };
    });
    setPhaseProgress(progress);
  }, []);

  const getPhaseData = (phaseNum) => {
    return phaseProgress.find(p => p.phase === phaseNum) || { completed: 0, total: 1, percentage: 0 };
  };

  const isPhaseUnlocked = (phaseIdx) => {
    if (phaseIdx === 0) return true; // Phase 1 always unlocked
    if (ROADMAP_SYLLABUS[phaseIdx].isToolbox) return true; // Toolbox always unlocked
    
    // Check if previous phase is >= 80%
    const prevPhase = ROADMAP_SYLLABUS[phaseIdx - 1];
    const prevData = getPhaseData(prevPhase.phase);
    return prevData.percentage >= 80;
  };

  const getFirstIncompleteTopic = (phaseData) => {
    for (let topic of phaseData.topics) {
      const slug = topicToSlug(topic);
      const p = localStorage.getItem(`topicProgress_${slug}`);
      if (!p || parseInt(p, 10) < 100) {
        return topic;
      }
    }
    return phaseData.topics[0]; // fallback to first if all complete
  };

  return (
    <div className="roadmap-view" style={{ paddingBottom: '80px', animation: 'fadeIn 0.5s ease' }}>
      <div className="cp-header">
        <h2 className="cp-title" style={{ fontSize: '2.5rem', marginBottom: '8px' }}>The Aptitude Journey</h2>
        <p className="cp-subtitle">Your step-by-step master plan from absolute beginner to speed math expert.</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
        
        {/* Vertical line connecting nodes */}
        <div style={{ position: 'absolute', left: '38px', top: '40px', bottom: '40px', width: '4px', background: 'var(--border)', zIndex: 0, borderRadius: '4px' }}></div>

        {ROADMAP_SYLLABUS.map((phase, idx) => {
          const unlocked = isPhaseUnlocked(idx);
          const data = getPhaseData(phase.phase);
          const isComplete = data.percentage === 100;
          
          return (
            <div key={idx} style={{ display: 'flex', gap: '24px', zIndex: 1, opacity: unlocked ? 1 : 0.5, transition: 'all 0.3s', filter: unlocked ? 'none' : 'grayscale(100%)' }}>
              
              {/* Node Icon */}
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '50%', background: phase.gradient, 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem',
                boxShadow: unlocked ? `0 0 20px ${phase.color}66` : 'none', flexShrink: 0,
                border: '4px solid var(--bg)', position: 'relative'
              }}>
                {phase.icon}
                {!unlocked && (
                  <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--surface)', borderRadius: '50%', padding: '4px', fontSize: '1rem', border: '2px solid var(--border)' }}>
                    🔒
                  </div>
                )}
                {isComplete && (
                  <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#10b981', color: '#fff', borderRadius: '50%', padding: '4px', fontSize: '1rem', border: '2px solid var(--bg)' }}>
                    ✓
                  </div>
                )}
              </div>

              {/* Card */}
              <div style={{ 
                flex: 1, background: 'var(--surface)', border: `1px solid ${unlocked ? phase.color : 'var(--border)'}`, 
                borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: unlocked ? phase.gradient : 'var(--border)' }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: phase.color, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                      Phase {phase.phase} {phase.isToolbox && ' (Toolbox)'}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>{phase.title}</div>
                  </div>
                  
                  {/* Progress Ring / Percentage */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: isComplete ? '#10b981' : 'var(--text-main)' }}>
                      {data.percentage}%
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-sec)' }}>{data.completed}/{data.total} Topics</div>
                  </div>
                </div>

                {/* Progress Bar inside card */}
                <div style={{ width: '100%', height: '8px', background: 'var(--surface2)', borderRadius: '4px', overflow: 'hidden', marginBottom: '24px' }}>
                  <div style={{ width: `${data.percentage}%`, height: '100%', background: phase.gradient, transition: 'width 0.5s ease' }}></div>
                </div>

                {/* Topic Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {phase.topics.map(topic => {
                    const slug = topicToSlug(topic);
                    const topicProg = localStorage.getItem(`topicProgress_${slug}`);
                    const isTopicDone = topicProg && parseInt(topicProg, 10) === 100;
                    
                    return (
                      <span key={topic} style={{ 
                        fontSize: '0.75rem', padding: '4px 10px', borderRadius: '100px', 
                        background: isTopicDone ? 'rgba(16, 185, 129, 0.1)' : 'var(--surface2)',
                        color: isTopicDone ? '#10b981' : 'var(--text-sec)',
                        border: `1px solid ${isTopicDone ? '#10b981' : 'var(--border)'}`
                      }}>
                        {isTopicDone && '✓ '} {topic}
                      </span>
                    );
                  })}
                </div>

                {/* Continue Button */}
                {unlocked ? (
                  <button 
                    onClick={() => {
                      const nextTopic = getFirstIncompleteTopic(phase);
                      navigate(`topic/${topicToSlug(nextTopic)}/${encodeURIComponent(nextTopic)}`);
                    }}
                    style={{
                      width: '100%', padding: '14px', borderRadius: '10px', border: 'none',
                      background: isComplete ? 'var(--surface2)' : phase.gradient,
                      color: isComplete ? 'var(--text-sec)' : '#fff',
                      fontWeight: '800', fontSize: '1rem', cursor: 'pointer', transition: 'transform 0.1s'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {isComplete ? 'Review Phase' : 'Continue Learning →'}
                  </button>
                ) : (
                  <div style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'var(--surface2)', color: 'var(--text-sec)', textAlign: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                    Complete 80% of Phase {phase.phase - 1} to unlock
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
