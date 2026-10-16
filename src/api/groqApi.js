// src/api/groqApi.js
// ─────────────────────────────────────────────────────────────────
//  Frontend API client — UPDATED for secure backend proxy.
//  API key (GEMINI_API_KEY) lives on the server, never in the browser.
//
//  Backend URL:
//    Development : VITE_API_URL=http://localhost:3000
//    Production  : https://aptianimate-api.onrender.com (fallback)
//
//  Features:
//    • Auto-retry with exponential backoff (rate limit / cold start)
//    • Render wake-ping on demand (called from AskPage on mount)
// ─────────────────────────────────────────────────────────────────

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://aptianimate-api.onrender.com';

// ── Retry helper ─────────────────────────────────────────────────
// Retries up to `maxAttempts` times with exponential backoff.
// Treats HTTP 429, 503, 502 and network errors as retryable.
async function fetchWithRetry(url, options, maxAttempts = 3) {
  const RETRYABLE_STATUS = new Set([429, 502, 503, 504]);
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let response;
    try {
      response = await fetch(url, options);
    } catch (networkErr) {
      // Pure network failure (offline, DNS, CORS)
      lastError = new Error('Could not connect to the server. Please check your internet connection.');
      if (attempt < maxAttempts) {
        await sleep(attempt * 2000); // 2s → 4s
        continue;
      }
      throw lastError;
    }

    // Parse body once
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('Server returned an unexpected response. Please try again.');
    }

    // Success path
    if (response.ok && data.success) return data;

    // Retryable server errors (rate limit / cold start)
    if (RETRYABLE_STATUS.has(response.status) && attempt < maxAttempts) {
      const waitMs = attempt * 2500; // 2.5s → 5s
      lastError = new Error(
        `AI is under high demand. Auto-retrying in ${Math.round(waitMs / 1000)}s… (attempt ${attempt}/${maxAttempts})`
      );
      // Re-throw a special retrying error so the UI can show "Retrying…"
      lastError.retrying = true;
      lastError.retryIn = waitMs;
      // We don't throw here — we wait and loop
      await sleep(waitMs);
      continue;
    }

    // Non-retryable error
    throw new Error(data?.error || `Server error (${response.status}). Please try again.`);
  }

  // All attempts exhausted
  throw new Error(
    lastError?.message ||
    'The AI is under high demand. Please wait a moment and try again.'
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Render Wake-Ping ──────────────────────────────────────────────
// Call this once when the AI page mounts.
// Fires a silent GET /health so Render warms up before the user submits.
export async function pingBackend() {
  try {
    await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
  } catch {
    // Silently ignore — this is best-effort only
  }
}

/**
 * Send a question (and optional chart/table image) to the backend.
 * The backend calls Gemini Flash and returns a structured animation JSON.
 *
 * @param {string}      questionText  - The raw aptitude question typed by the user
 * @param {string|null} imageBase64   - Base64 data-URL of a compressed chart/table image,
 *                                      or null for text-only mode
 * @param {Function}    [onRetry]     - Optional callback called before each retry with
 *                                      the retry message string, so the UI can update.
 * @returns {Promise<Object>}  Parsed question object with animation_script
 * @throws  {Error}            If the backend returns an error after all retries
 */
export async function parseUserQuestion(questionText, imageBase64 = null, onRetry) {
  if ((!questionText || !questionText.trim()) && !imageBase64) {
    throw new Error('Please enter a question or upload an image.');
  }

  const payload = {
    question: questionText ? questionText.trim() : '',
    ...(imageBase64 ? { image: imageBase64 } : {}),
  };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  // Use fetchWithRetry — up to 3 attempts total
  const MAX = 3;
  const RETRYABLE_STATUS = new Set([429, 502, 503, 504]);
  let lastError;

  for (let attempt = 1; attempt <= MAX; attempt++) {
    let response;
    try {
      response = await fetch(`${API_BASE_URL}/api/generate`, options);
    } catch {
      lastError = new Error('Could not connect to the server. Please check your internet connection.');
      if (attempt < MAX) {
        const waitMs = attempt * 2000;
        if (onRetry) onRetry(`Connection failed. Retrying in ${waitMs / 1000}s… (${attempt}/${MAX})`);
        await sleep(waitMs);
        continue;
      }
      throw lastError;
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error('Server returned an unexpected response. Please try again.');
    }

    if (response.ok && data.success) return data.data;

    if (RETRYABLE_STATUS.has(response.status) && attempt < MAX) {
      const waitMs = attempt * 2500;
      const msg = `AI is under high demand. Retrying in ${waitMs / 1000}s… (${attempt}/${MAX})`;
      lastError = new Error(msg);
      if (onRetry) onRetry(msg);
      await sleep(waitMs);
      continue;
    }

    throw new Error(data?.error || `Server error (${response.status}). Please try again.`);
  }

  throw new Error(
    lastError?.message || 'The AI is under high demand. Please wait a moment and try again.'
  );
}

/**
 * Send extracted resume text to the backend proxy for analysis.
 *
 * @param {string} resumeText - Raw text extracted from the user's resume
 * @returns {Promise<Object>} Analyzed resume report data and generated questions
 */
export async function analyzeUserResume(resumeText) {
  if (!resumeText || !resumeText.trim()) {
    throw new Error('Please select a valid resume file to extract text.');
  }

  const payload = { text: resumeText.trim() };

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/analyze-resume`, {
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
