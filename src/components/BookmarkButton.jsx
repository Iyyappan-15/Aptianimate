// src/components/BookmarkButton.jsx
import { useState, useEffect } from 'react';
import { isBookmarked, toggleBookmark } from '../utils/localStorage';

export default function BookmarkButton({ questionId }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(questionId));
  }, [questionId]);

  const handleToggle = () => {
    const next = toggleBookmark(questionId);
    setBookmarked(next);
  };

  return (
    <button
      className={`bookmark-btn ${bookmarked ? 'bookmarked' : ''}`}
      onClick={handleToggle}
      title={bookmarked ? "Remove Bookmark" : "Bookmark"}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  );
}
