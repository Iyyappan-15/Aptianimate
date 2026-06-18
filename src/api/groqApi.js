// src/api/groqApi.js
// ─────────────────────────────────────────────────────────────────
//  Frontend API client — UPDATED for secure backend proxy.
//
//  ⛔ OLD (insecure): Called Groq directly with API key in browser
//  ✅ NEW (secure):   Calls our backend proxy. API key stays on server.
//
//  The backend URL comes from Vite env vars:
//    Development : VITE_API_URL=http://localhost:3000
//    Production  : VITE_API_URL=https://your-backend.onrender.com
// ─────────────────────────────────────────────────────────────────

// In development: Vite proxies /api/* to localhost:3000 — so we use an empty base URL (relative path)
// In production: VITE_API_URL points to the Render backend (e.g. https://aptitude-api.onrender.com)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Send a user's question to the backend proxy.
 * The backend calls Groq, validates the response, and returns structured JSON.
 *
 * @param {string} questionText - The raw aptitude question from the user
 * @returns {Promise<Object>} - Parsed question with animation_script
 * @throws {Error} - If the backend returns an error
 */
export async function parseUserQuestion(questionText) {
  if (!questionText || !questionText.trim()) {
    throw new Error('Please enter a question first.');
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // No API key here — it lives on the server
      },
      body: JSON.stringify({ question: questionText.trim() })
    });
  } catch (networkError) {
    throw new Error('Could not connect to the server. Please check your internet connection.');
  }

  // Parse the response body
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Server returned an unexpected response. Please try again.');
  }

  // Handle backend error responses
  if (!response.ok || !data.success) {
    // Use the server's error message if available, otherwise a generic one
    throw new Error(data?.error || `Server error (${response.status}). Please try again.`);
  }

  return data.data; // The parsed question object
}
