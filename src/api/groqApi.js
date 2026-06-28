// src/api/groqApi.js
// ─────────────────────────────────────────────────────────────────
//  Frontend API client — UPDATED for secure backend proxy.
//  Frontend API client — calls the secure Express backend proxy.
//  API key (GEMINI_API_KEY) lives on the server, never in the browser.
//
//  Backend URL:
//    Development : VITE_API_URL=http://localhost:3000  (vite proxy → :3000)
//    Production  : VITE_API_URL=https://<your-render-backend>.onrender.com
// ─────────────────────────────────────────────────────────────────

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Send a question (and optional chart/table image) to the backend.
 * The backend calls Gemini Flash and returns a structured animation JSON.
 *
 * @param {string}      questionText  - The raw aptitude question typed by the user
 * @param {string|null} imageBase64   - Base64 data-URL of a compressed chart/table image,
 *                                      or null for text-only mode
 * @returns {Promise<Object>}  Parsed question object with animation_script
 * @throws  {Error}            If the backend returns an error
 */
export async function parseUserQuestion(questionText, imageBase64 = null) {
  // Require at least a question OR an image
  if ((!questionText || !questionText.trim()) && !imageBase64) {
    throw new Error('Please enter a question or upload an image.');
  }

  const payload = {
    question: questionText ? questionText.trim() : '',
    ...(imageBase64 ? { image: imageBase64 } : {}),
  };

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Could not connect to the server. Please check your internet connection.');
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Server returned an unexpected response. Please try again.');
  }

  if (!response.ok || !data.success) {
    throw new Error(data?.error || `Server error (${response.status}). Please try again.`);
  }

  return data.data;
}
