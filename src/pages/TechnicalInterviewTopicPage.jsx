// src/pages/TechnicalInterviewTopicPage.jsx
import { useState } from 'react';
import { TECHNICAL_INTERVIEW_SYLLABUS } from '../data/technicalInterviewSyllabus';
import { TECHNICAL_INTERVIEW_QUESTIONS } from '../data/technicalInterviewQuestions';

export default function TechnicalInterviewTopicPage({ topicSlug, navigate }) {
  const topic = TECHNICAL_INTERVIEW_SYLLABUS.find(t => t.slug === topicSlug) || null;

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [companyFilter, setCompanyFilter] = useState('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // Expanded Question State
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // Bookmarks & Progress States (Persisted in localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bookmarked_interview_questions')) || [];
    } catch {
      return [];
    }
  });

  const [completedIds, setCompletedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('completed_interview_questions')) || [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    const updated = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter(x => x !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(updated);
    localStorage.setItem('bookmarked_interview_questions', JSON.stringify(updated));
  };

  const toggleCompleted = (id, e) => {
    e.stopPropagation();
    const updated = completedIds.includes(id)
      ? completedIds.filter(x => x !== id)
      : [...completedIds, id];
    setCompletedIds(updated);
    localStorage.setItem('completed_interview_questions', JSON.stringify(updated));
  };

  if (!topic) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '80vh', color: 'var(--text-main)', textAlign: 'center', padding: '24px'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '12px' }}>Topic Not Found</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>The requested topic does not exist or has been relocated.</p>
        <button
          onClick={() => navigate('')}
          style={{
            background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '12px',
            padding: '10px 20px', color: 'var(--text-main)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.borderColor = 'var(--violet)'}
          onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Filter Questions dynamically
  const allQuestions = TECHNICAL_INTERVIEW_QUESTIONS.filter(q => q.category === topic.title);

  const filteredQuestions = allQuestions.filter(q => {
    // 1. Search Query
    const matchesSearch = searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.shortAnswer && q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase()));

    // 2. Difficulty Filter
    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;

    // 3. Bookmarks Filter
    const matchesBookmarks = !showBookmarksOnly || bookmarkedIds.includes(q.id);

    // 4. Company Filter (Future capability placeholder - checking tags in case they mention it)
    const matchesCompany = companyFilter === 'all' || q.tags.some(t => t.toLowerCase() === companyFilter);

    return matchesSearch && matchesDifficulty && matchesBookmarks && matchesCompany;
  });

  // Calculate Progress
  const totalQuestions = allQuestions.length;
  const completedCount = allQuestions.filter(q => completedIds.includes(q.id)).length;
  const progressPercent = totalQuestions > 0 ? Math.round((completedCount / totalQuestions) * 100) : 0;

  const getDifficultyColor = (diff) => {
    if (diff === 'Easy') return '#10b981'; // Green
    if (diff === 'Medium') return '#f59e0b'; // Orange/Amber
    return '#ef4444'; // Red
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--surface2, #0f1115)', color: 'var(--text-main)' }}>
      {/* Background ambient mesh */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '50vw', height: '50vw', borderRadius: '50%', background: `radial-gradient(circle, ${topic.color}05 0%, transparent 60%)`, filter: 'blur(60px)' }} />
      </div>

      <div className="page-wide" style={{ position: 'relative', zIndex: 1, padding: '24px 24px 80px' }}>
        
        {/* Header Bar */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: '24px', padding: '16px 24px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', marginBottom: '32px', boxShadow: 'var(--shadow)'
        }}>
          <button
            onClick={() => navigate('')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--surface)',
              border: '1px solid var(--border)', borderRadius: '12px', padding: '8px 16px',
              color: 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = topic.color; e.currentTarget.style.color = topic.color; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-main)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Dashboard
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.5rem', width: '36px', height: '36px', borderRadius: '8px', background: `${topic.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {topic.icon}
            </span>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)', letterSpacing: '-0.3px' }}>
              {topic.title}
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }} className="topic-grid-desktop">
          <style>{`
            @media (min-width: 1024px) {
              .topic-grid-desktop {
                grid-template-columns: 1fr 340px !important;
              }
            }
          `}</style>

          {/* Left Column: Filter Controls and Question List Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Filter controls block */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column',
              gap: '20px', boxShadow: 'var(--shadow)'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--muted)' }}>
                  Filters & Controls
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }} className="filters-responsive">
                <style>{`
                  @media (min-width: 768px) {
                    .filters-responsive {
                      grid-template-columns: 1fr 180px 180px !important;
                    }
                  }
                `}</style>

                {/* Search Bar */}
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search interview questions..."
                    style={{
                      width: '100%', padding: '12px 16px 12px 40px', borderRadius: '12px',
                      background: 'var(--surface2)', border: '1px solid var(--border)',
                      color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none', transition: 'border-color 0.2s'
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = topic.color}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  />
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                </div>

                {/* Company Filter (Placeholder list matching top tech firms) */}
                <select
                  value={companyFilter}
                  onChange={(e) => setCompanyFilter(e.target.value)}
                  style={{
                    padding: '12px 16px', borderRadius: '12px',
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none', cursor: 'pointer', transition: 'border-color 0.2s'
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = topic.color}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <option value="all">All Companies</option>
                  <option value="google">Google</option>
                  <option value="meta">Meta</option>
                  <option value="amazon">Amazon</option>
                  <option value="microsoft">Microsoft</option>
                  <option value="tcs">TCS</option>
                  <option value="infosys">Infosys</option>
                </select>

                {/* Bookmarking Toggle */}
                <div 
                  onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px', borderRadius: '12px', background: 'var(--surface2)',
                    border: showBookmarksOnly ? `1px solid ${topic.color}` : '1px solid var(--border)',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Bookmarks</span>
                  <div style={{
                    width: '36px', height: '20px', borderRadius: '10px',
                    background: showBookmarksOnly ? topic.color : 'var(--border)',
                    position: 'relative', padding: '2px', transition: 'background-color 0.2s'
                  }}>
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '50%', background: '#fff',
                      position: 'absolute', left: showBookmarksOnly ? '18px' : '2px', top: '2px',
                      transition: 'left 0.2s'
                    }} />
                  </div>
                </div>
              </div>

              {/* Difficulty Filter */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                {['All', 'Easy', 'Medium', 'Hard'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setDifficultyFilter(lvl)}
                    style={{
                      padding: '8px 16px', borderRadius: '10px',
                      background: difficultyFilter === lvl ? 'var(--surface2)' : 'transparent',
                      border: difficultyFilter === lvl ? `1px solid ${topic.color}` : '1px solid transparent',
                      color: difficultyFilter === lvl ? 'var(--text-main)' : 'var(--muted)',
                      fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            {filteredQuestions.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestionId === q.id;
                  const isBookmarked = bookmarkedIds.includes(q.id);
                  const isCompleted = completedIds.includes(q.id);

                  return (
                    <div
                      key={q.id}
                      style={{
                        background: 'var(--surface)', border: '1px solid var(--border)',
                        borderRadius: '20px', padding: '20px', cursor: 'pointer',
                        transition: 'border-color 0.2s, box-shadow 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                      }}
                      onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                      onMouseOver={e => e.currentTarget.style.borderColor = topic.color}
                      onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      {/* Top Row: Details & Actions */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            background: `${getDifficultyColor(q.difficulty)}15`,
                            color: getDifficultyColor(q.difficulty),
                            borderRadius: '8px', padding: '3px 8px', fontSize: '0.75rem', fontWeight: 700
                          }}>
                            {q.difficulty}
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)' }}>
                            {q.topic}
                          </span>
                        </div>

                        {/* Action Icons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {/* Checkbox Complete Button */}
                          <button
                            onClick={(e) => toggleCompleted(q.id, e)}
                            style={{
                              background: isCompleted ? '#10b981' : 'transparent',
                              border: isCompleted ? 'none' : '1px solid var(--border)',
                              width: '24px', height: '24px', borderRadius: '6px', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s'
                            }}
                          >
                            {isCompleted && <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 900 }}>✓</span>}
                          </button>

                          {/* Bookmark Star Button */}
                          <button
                            onClick={(e) => toggleBookmark(q.id, e)}
                            style={{
                              background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
                              fontSize: '1.2rem', color: isBookmarked ? '#f59e0b' : 'var(--muted2)', transition: 'transform 0.15s'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          >
                            ★
                          </button>
                        </div>
                      </div>

                      {/* Question Text */}
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-main)', lineHeight: '1.4' }}>
                        {idx + 1}. {q.question}
                      </h4>

                      {/* Expanded details panel */}
                      {isExpanded && (
                        <div style={{ borderTop: '1px solid var(--border)', marginTop: '20px', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.25s ease' }}>
                          
                          {/* Short Answer Block */}
                          <div>
                            <h5 style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Short Answer</h5>
                            <div style={{ borderLeft: `4px solid ${topic.color}`, paddingLeft: '16px', color: 'var(--text-main)', fontSize: '0.92rem', fontWeight: 500, lineHeight: 1.5 }}>
                              {q.shortAnswer}
                            </div>
                          </div>

                          {/* Detailed Answer */}
                          <div>
                            <h5 style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Detailed explanation</h5>
                            <p style={{ color: 'var(--text-sec)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                              {q.detailedAnswer}
                            </p>
                          </div>

                          {/* Key Points */}
                          {q.keyPoints && q.keyPoints.length > 0 && (
                            <div>
                              <h5 style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Key Takeaways</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {q.keyPoints.map((kp, i) => (
                                  <li key={i} style={{ color: 'var(--text-sec)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                                    {kp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Common Mistakes */}
                          {q.commonMistakes && q.commonMistakes.length > 0 && (
                            <div style={{ background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '16px', padding: '16px' }}>
                              <h5 style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                ⚠️ Common Mistakes
                              </h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {q.commonMistakes.map((cm, i) => (
                                  <li key={i} style={{ color: 'var(--text-sec)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                    {cm}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Real World Example */}
                          {q.realWorldExample && (
                            <div>
                              <h5 style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Real-World Application</h5>
                              <div style={{ background: 'var(--surface2)', borderRadius: '12px', padding: '14px 16px', color: 'var(--text-sec)', fontSize: '0.9rem', lineHeight: 1.5, border: '1px solid var(--border)' }}>
                                💡 {q.realWorldExample}
                              </div>
                            </div>
                          )}

                          {/* Code Example */}
                          {q.codeExample && q.codeExample.code && (
                            <div>
                              <h5 style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Code Implementation ({q.codeExample.language})</h5>
                              <pre style={{
                                background: '#1e2028', color: '#f8fafc', padding: '16px', borderRadius: '12px',
                                overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', border: '1px solid var(--border)', margin: 0
                              }}>
                                <code>{q.codeExample.code}</code>
                              </pre>
                            </div>
                          )}

                          {/* Interviewer Expectations */}
                          {q.interviewerExpectation && (
                            <div style={{ border: `1px solid ${topic.color}25`, background: `${topic.color}03`, borderRadius: '16px', padding: '16px' }}>
                              <h5 style={{ fontSize: '0.85rem', color: topic.color, fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>🎯 Interviewer Expectation</h5>
                              <p style={{ color: 'var(--text-sec)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                                {q.interviewerExpectation}
                              </p>
                            </div>
                          )}

                          {/* Follow up Questions */}
                          {q.followUpQuestions && q.followUpQuestions.length > 0 && (
                            <div>
                              <h5 style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Follow-up Questions</h5>
                              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {q.followUpQuestions.map((fq, i) => (
                                  <li key={i} style={{ color: 'var(--text-main)', fontSize: '0.9rem', fontWeight: 600 }}>
                                    {fq}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Tags & References footer */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                            {q.tags.map(t => (
                              <span key={t} style={{ fontSize: '0.75rem', color: 'var(--muted)', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '3px 8px' }}>
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Filtered empty state */
              <div style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: '24px', padding: '56px 40px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '300px',
                boxShadow: 'var(--shadow)'
              }}>
                <span style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🔍</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                  No Questions Match Filters
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', maxWidth: '320px', margin: 0 }}>
                  Adjust your search keyword, difficulty levels, or bookmark filters to find questions.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Progress & Syllabus Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Progress Card */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '24px', padding: '28px', boxShadow: 'var(--shadow)'
            }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: '0 0 18px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                📊 Progress Tracking
              </h3>
              
              <div style={{ background: 'var(--surface2)', borderRadius: '16px', padding: '16px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)', marginBottom: '8px' }}>
                  <span>Completion Status</span>
                  <span>{progressPercent}%</span>
                </div>
                
                {/* Progress Bar Container */}
                <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: topic.color, transition: 'width 0.3s ease' }} />
                </div>
                
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>
                  {completedCount} of {totalQuestions} questions solved
                </div>
              </div>
            </div>

            {/* Concepts Covered Card */}
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '24px', padding: '28px', boxShadow: 'var(--shadow)'
            }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: '0 0 16px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                💡 Topic Overview
              </h3>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, margin: '0 0 16px' }}>
                Preparing comprehensive interview resources containing concepts, explanations, and visual coding walk-throughs.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Topic Status</span>
                  <span style={{ color: topic.comingSoon ? '#f59e0b' : '#10b981', fontWeight: 700 }}>
                    {topic.comingSoon ? 'In Development' : 'Ready'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Pillar</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>Technical Prep</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Total Questions</span>
                  <span style={{ color: 'var(--text-main)', fontWeight: 700 }}>{totalQuestions}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
