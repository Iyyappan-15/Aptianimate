// src/components/BookmarkButton.jsx
import { useState, useEffect } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';

export default function BookmarkButton({ questionId }) {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const bookmarked = bookmarks.some(b => b.topic_name === questionId);

  const handleToggle = async () => {
    try {
      if (bookmarked) {
        await removeBookmark(questionId);
      } else {
        await addBookmark(questionId);
      }
    } catch (error) {
      console.error("Failed to toggle bookmark", error);
    }
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
