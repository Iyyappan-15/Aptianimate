// src/pages/SavedPage.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getQuestionBookmarks, removeQuestionBookmark } from '../repositories/questionBookmarkRepository';

export default function SavedPage({ navigate }) {
  const { user, loading: authLoading } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getQuestionBookmarks(user.id)
      .then(data => setBookmarks(data))
      .finally(() => setLoading(false));
  }, [user]);

  const handleRemove = async (bookmarkId) => {
    setRemovingId(bookmarkId);
    try {
      await removeQuestionBookmark(bookmarkId);
      setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
    } catch (err) {
      console.error('Failed to remove bookmark:', err);
    } finally {
      setRemovingId(null);
    }
  };

  const handleSolveWithAI = (bookmark) => {
    const q = bookmark.question_data;
    const queryText = `${q.question}\n\nOptions:\nA) ${q.options?.[0] || ''}\nB) ${q.options?.[1] || ''}\nC) ${q.options?.[2] || ''}\nD) ${q.options?.[3] || ''}\n\nExplain this step-by-step with visual details.`;
    navigate(`ask?q=${encodeURIComponent(queryText)}`);
  };

  const getDifficultyColor = (diff) => {
    if (diff === 'Easy') return '#10b981';
    if (diff === 'Medium') return '#f59e0b';
    if (diff === 'Hard') return '#ef4444';
    return '#6366f1';
  };

  if (authLoading || loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-sec)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⏳</div>
          <p>Loading your saved questions...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="icon">🔒</div>
          <div className="title">Sign in to see saved questions</div>
          <div className="sub">Your bookmarks are securely stored in the cloud.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ animation: 'fadeIn 0.5s ease', maxWidth: '900px', margin: '0 auto', padding: '24px 16px 80px' }}>

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
          <div style={{ fontSize: '2.2rem' }}>🔖</div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>Saved Questions</h1>
            <p style={{ color: 'var(--text-sec)', margin: '4px 0 0', fontSize: '0.9rem' }}>
              {bookmarks.length === 0 ? 'No questions saved yet' : `${bookmarks.length} question${bookmarks.length > 1 ? 's' : ''} saved`}
            </p>
          </div>
        </div>
        {bookmarks.length > 0 && (
          <div style={{
            height: '4px',
            background: 'linear-gradient(90deg, #f59e0b, #f59e0b66)',
            borderRadius: '4px',
            width: '80px',
          }} />
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="empty-state" style={{ marginTop: '40px' }}>
          <div className="icon">🔖</div>
          <div className="title">No saved questions yet</div>
          <div className="sub">
            Click the <strong>🔖 bookmark icon</strong> on any practice question to save it here for quick review.
          </div>
          <button className="btn btn-primary mt-16" onClick={() => navigate('')}>
            Start Practicing →
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookmarks.map((bookmark) => {
            const q = bookmark.question_data;
            const diff = q?.difficulty;
            const diffColor = getDifficultyColor(diff);
            const isExpanded = expandedId === bookmark.id;

            return (
              <div
                key={bookmark.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'box-shadow 0.2s',
                  boxShadow: isExpanded ? '0 8px 24px rgba(0,0,0,0.12)' : 'none',
                }}
              >
                {/* Card Top Bar (colored by difficulty) */}
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${diffColor}, ${diffColor}66)` }} />

                {/* Card Header – always visible */}
                <div
                  style={{ padding: '20px 24px', cursor: 'pointer' }}
                  onClick={() => setExpandedId(isExpanded ? null : bookmark.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      {/* Topic and subtopic badge */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                        <span style={{
                          background: `${diffColor}18`,
                          color: diffColor,
                          border: `1px solid ${diffColor}44`,
                          borderRadius: '20px',
                          padding: '3px 10px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}>
                          {diff || 'General'}
                        </span>
                        <span style={{
                          background: 'var(--surface2)',
                          color: 'var(--text-sec)',
                          borderRadius: '20px',
                          padding: '3px 10px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          border: '1px solid var(--border)',
                        }}>
                          📌 {bookmark.topic_name}
                        </span>
                        {q?.subtopic && (
                          <span style={{
                            background: 'var(--surface2)',
                            color: 'var(--text-sec)',
                            borderRadius: '20px',
                            padding: '3px 10px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            border: '1px solid var(--border)',
                          }}>
                            {q.subtopic}
                          </span>
                        )}
                      </div>

                      {/* Question text */}
                      <p style={{
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        margin: 0,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: isExpanded ? 'unset' : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {bookmark.question_text}
                      </p>
                    </div>

                    {/* Expand chevron */}
                    <div style={{
                      fontSize: '1.1rem',
                      color: 'var(--text-sec)',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      ▾
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div style={{ padding: '0 24px 24px', animation: 'fadeIn 0.25s ease' }}>

                    {/* Options */}
                    {q?.options && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                        {q.options.map((opt, idx) => {
                          const letters = ['A', 'B', 'C', 'D'];
                          const isCorrect = opt === q.correctAnswer;
                          return (
                            <div
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                borderRadius: '10px',
                                background: isCorrect ? 'rgba(16,185,129,0.1)' : 'var(--surface2)',
                                border: `1px solid ${isCorrect ? '#10b981' : 'var(--border)'}`,
                              }}
                            >
                              <span style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: isCorrect ? '#10b981' : 'var(--border)',
                                color: isCorrect ? '#fff' : 'var(--text-sec)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '0.8rem',
                                flexShrink: 0,
                              }}>
                                {letters[idx]}
                              </span>
                              <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: isCorrect ? 700 : 400 }}>
                                {opt}
                              </span>
                              {isCorrect && (
                                <span style={{ marginLeft: 'auto', color: '#10b981', fontWeight: 800 }}>✓ Correct</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Memory trick */}
                    {q?.memoryTrick && (
                      <div style={{
                        background: 'var(--surface2)',
                        borderLeft: '3px solid #f59e0b',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        marginBottom: '20px',
                        fontSize: '0.88rem',
                        color: 'var(--text-sec)',
                      }}>
                        💡 <strong>Memory Trick:</strong> {q.memoryTrick}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleSolveWithAI(bookmark)}
                        style={{
                          flex: 1,
                          minWidth: '160px',
                          padding: '12px 20px',
                          borderRadius: '10px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'transform 0.15s',
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        🎬 Solve with AI
                      </button>

                      <button
                        onClick={() => handleRemove(bookmark.id)}
                        disabled={removingId === bookmark.id}
                        style={{
                          flex: 1,
                          minWidth: '160px',
                          padding: '12px 20px',
                          borderRadius: '10px',
                          border: '1px solid rgba(239,68,68,0.4)',
                          background: 'rgba(239,68,68,0.06)',
                          color: '#ef4444',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          cursor: removingId === bookmark.id ? 'wait' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          transition: 'transform 0.15s',
                          opacity: removingId === bookmark.id ? 0.6 : 1,
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        {removingId === bookmark.id ? '⏳ Removing...' : '🗑️ Remove Bookmark'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
