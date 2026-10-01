/* global process */
// api/interview.js
// ─────────────────────────────────────────────────────────────────
// Secure Server-Side Proxy for Groq AI Voice Interview
// Runs on Vercel Serverless Functions.
// The GROQ_API_KEY / GROQ_INTERVIEW_KEY / GROQ_SCORECARD_KEY
// stays 100% hidden on the server and is NEVER sent to the browser.
// ─────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { model, messages, temperature, max_tokens } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid "messages" array in request body.' });
  }

  // Determine which server secret to use
  const isScorecard = model === 'llama-3.3-70b-versatile';
  const apiKey = isScorecard
    ? (process.env.GROQ_SCORECARD_KEY || process.env.GROQ_API_KEY || process.env.GROQ_INTERVIEW_KEY)
    : (process.env.GROQ_INTERVIEW_KEY || process.env.GROQ_API_KEY || process.env.GROQ_SCORECARD_KEY);

  if (!apiKey) {
    return res.status(500).json({
      error: 'GROQ_API_KEY environment variable is not configured on the server.'
    });
  }

  try {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'llama-3.1-8b-instant',
        messages,
        temperature: typeof temperature === 'number' ? temperature : 0.7,
        max_tokens: typeof max_tokens === 'number' ? max_tokens : 150
      })
    });

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      return res.status(groqResponse.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error('Serverless Groq proxy error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to communicate with Groq AI API.'
    });
  }
}
