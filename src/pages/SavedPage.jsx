// src/pages/SavedPage.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getQuestionBookmarks, removeQuestionBookmark } from '../repositories/questionBookmarkRepository';
import { signInWithGoogle } from '../services/authService';

const getOptionString = (opt) => {
  if (typeof opt === 'object' && opt !== null) return opt.text || "(Image Option)";
  return String(opt || "");
};

const renderOption = (opt, letter) => {
  if (typeof opt === 'object' && opt !== null) {
    if (opt.image) return <img src={opt.image} alt={`Option ${letter}`} style={{ maxHeight:"100px", maxWidth:"100%", borderRadius:"8px", objectFit:"contain", display:"block" }} />;
    return opt.text || JSON.stringify(opt);
  }
  return String(opt);
};

function resolveCorrectIndex(question) {
  const ca = question.correctAnswer;
  const opts = question.options || [];
  if (typeof ca === "number") return ca;
  if (typeof ca === "string") {
    const letter = ca.trim().toUpperCase();
    if (/^[A-D]$/.test(letter)) return letter.charCodeAt(0) - 65;
    const idx = opts.indexOf(ca);
    return idx >= 0 ? idx : 0;
  }
  return 0;
}

export default function SavedPage({ navigate }) {
  const { user, loading: authLoading } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Only fetch bookmarks for real (non-anonymous) signed-in users
    if (!user || user.is_anonymous) return;
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
    const queryText = `${q.question}\n\nOptions:\nA) ${getOptionString(q.options?.[0])}\nB) ${getOptionString(q.options?.[1])}\nC) ${getOptionString(q.options?.[2])}\nD) ${getOptionString(q.options?.[3])}\n\nExplain this step-by-step with visual details.`;
    navigate(`ask?q=${encodeURIComponent(queryText)}`);
  };

  const getDifficultyColor = (diff) => {
    if (diff === 'Easy') return '#10b981';
    if (diff === 'Medium') return '#f59e0b';
    if (diff === 'Hard') return '#ef4444';
    return '#6366f1';
  };

  if (authLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-sec)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⏳</div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Guest user (not signed in) — show sign-in prompt
  if (!user || user.is_anonymous) {
    return (
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '20px' }}>
        <div style={{ background: 'var(--surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '20px' }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text)' }}>Sign in to save questions</h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-sec)', marginBottom: '24px' }}>Your bookmarks are securely stored in the cloud. Sign in to access them from any device.</p>
          <button onClick={signInWithGoogle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.05rem', padding: '12px 24px', background: '#fff', color: '#3c4043', width: '100%', borderRadius: '12px', border: '1px solid #dadce0', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 1px 2px rgba(60,64,67,0.15)' }} onMouseOver={(e) => e.currentTarget.style.background = '#f8f9fa'} onMouseOut={(e) => e.currentTarget.style.background = '#fff'}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24c0-1.61-.15-3.16-.42-4.69H24v9.09h12.75c-.53 2.87-2.14 5.3-4.57 6.96l7.14 5.53C43.51 36.31 46.5 30.8 46.5 24z"/>
              <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.14-5.53c-1.97 1.33-4.5 2.13-8.75 2.13-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-sec)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⏳</div>
          <p>Loading your saved questions...</p>
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
                          const correctIdx = resolveCorrectIndex(q);
                          const isCorrect = idx === correctIdx;
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
                                {renderOption(opt, letters[idx])}
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
