// src/services/aiInterviewService.js

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_CONVERSATION = 'llama-3.1-8b-instant';
const MODEL_EVALUATION = 'llama-3.3-70b-versatile';

/**
 * Gets the active Groq API Key for live conversational turns (llama-3.1-8b-instant).
 */
export function getActiveInterviewKey() {
  const envKey = import.meta.env.VITE_GROQ_INTERVIEW_KEY || import.meta.env.VITE_GROQ_API_KEY;
  if (envKey && envKey.trim()) return envKey.trim();
  const localKey = localStorage.getItem('aptianimate_groq_interview_key') || localStorage.getItem('aptianimate_groq_key');
  if (localKey && localKey.trim()) return localKey.trim();
  return null;
}

/**
 * Gets the active Groq API Key for comprehensive scorecard evaluation (llama-3.3-70b-versatile).
 */
export function getActiveScorecardKey() {
  const envKey = import.meta.env.VITE_GROQ_SCORECARD_KEY || import.meta.env.VITE_GROQ_API_KEY;
  if (envKey && envKey.trim()) return envKey.trim();
  const localKey = localStorage.getItem('aptianimate_groq_scorecard_key') || localStorage.getItem('aptianimate_groq_key');
  if (localKey && localKey.trim()) return localKey.trim();
  return null;
}

/**
 * Legacy/general getter that returns the primary active key.
 */
export function getActiveGroqKey() {
  return getActiveInterviewKey();
}

/**
 * Saves a custom Groq API key in localStorage.
 */
export function saveGroqKey(key, target = 'both') {
  if (!key) {
    if (target === 'interview' || target === 'both') {
      localStorage.removeItem('aptianimate_groq_interview_key');
      localStorage.removeItem('aptianimate_groq_key');
    }
    if (target === 'scorecard' || target === 'both') {
      localStorage.removeItem('aptianimate_groq_scorecard_key');
    }
  } else {
    if (target === 'interview') {
      localStorage.setItem('aptianimate_groq_interview_key', key.trim());
    } else if (target === 'scorecard') {
      localStorage.setItem('aptianimate_groq_scorecard_key', key.trim());
    } else {
      localStorage.setItem('aptianimate_groq_key', key.trim());
    }
  }
}

const PROXY_API_URL = '/api/interview';

/**
 * Executes a Groq completion request.
 * Tries the secure serverless proxy (/api/interview) first so the secret key stays hidden on the server.
 * If the proxy is unavailable (e.g. running in standard local Vite dev), falls back to direct client call if clientApiKey is provided.
 */
async function executeGroqRequest({ model, messages, temperature = 0.7, max_tokens = 150, clientApiKey }) {
  // 1. Try secure serverless proxy (Zero key exposure in browser)
  try {
    const proxyRes = await fetch(PROXY_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages, temperature, max_tokens })
    });
    if (proxyRes.ok) {
      const data = await proxyRes.json();
      return data;
    }
  } catch {
    // Serverless proxy not accessible in current environment
  }

  // 2. Direct fallback if a client key is configured in localStorage or .env
  if (clientApiKey) {
    const directRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${clientApiKey}`
      },
      body: JSON.stringify({ model, messages, temperature, max_tokens })
    });
    if (directRes.ok) {
      return await directRes.json();
    }
  }

  throw new Error('Groq execution failed.');
}

/**
 * Generates the next question or live conversational reply from the AI interviewer.
 * Uses llama-3.1-8b-instant for sub-400ms low-latency response.
 *
 * @param {Object} params
 * @param {number} params.questionIndex (0 to 5)
 * @param {string} params.candidateName
 * @param {Array<string>} params.skills
 * @param {Array<string>} params.projects
 * @param {string} params.resumeSummary
 * @param {string} params.targetRole (e.g., 'Full-Stack Developer', 'TCS / Service-Based', 'Product Startup')
 * @param {Array<Object>} params.chatHistory [{ role: 'interviewer'|'candidate', text: string }]
 * @param {string} params.latestCandidateAnswer
 */
export async function getNextInterviewTurn({
  questionIndex,
  candidateName,
  skills = [],
  projects = [],
  resumeSummary = '',
  targetRole = 'Software Engineer',
  chatHistory = [],
  latestCandidateAnswer = ''
}) {
  // Question 1 is strictly Compulsory Self Introduction
  if (questionIndex === 0) {
    const greeting = candidateName && candidateName !== 'Candidate'
      ? `Hello ${candidateName}, welcome to your technical screening interview!`
      : `Hello and welcome to your technical screening interview!`;
    return {
      interviewerText: `${greeting} To get us started, please walk me through your background, the key projects you've built, and what areas of technology you are most passionate about.`
    };
  }

  const apiKey = getActiveInterviewKey();

  const promptStages = [
    "Question 1 (Self Intro already completed)",
    "Question 2: Project Architecture & Implementation. Ask a specific, realistic technical question about one of the projects or frameworks mentioned on their resume.",
    "Question 3: Problem Solving & Debugging. Ask about a challenging bug, optimization, or edge-case they had to solve in their projects or coursework.",
    "Question 4: Core Technical Deep-Dive. Test a fundamental concept related to their listed skills (e.g. database indexing, OOPs, asynchronous handling, or API design).",
    "Question 5: Real-World System Scenario. Give them a practical scenario relevant to the target role (e.g. handling high traffic, securing endpoints, or state management).",
    "Question 6: HR & Motivation. Ask a concise behavioral question (e.g. how they prioritize tight deadlines or why they want to work in this domain)."
  ];

  const currentStagePrompt = promptStages[questionIndex] || "Ask an insightful closing interview question.";

  const systemPrompt = `You are a professional, encouraging, yet thorough Technical Hiring Interviewer conducting an 8-minute voice screening call with candidate "${candidateName}".
Target Role: ${targetRole}
Candidate Skills: ${skills.join(', ') || 'Computer Science fundamentals'}
Candidate Projects: ${projects.join('; ') || 'Software development projects'}
Resume Context:
${resumeSummary.slice(0, 1500)}

INSTRUCTIONS FOR YOUR RESPONSE:
1. Speak in natural, spoken conversational English.
2. If the candidate just answered (indicated in latestCandidateAnswer), provide a BRIEF acknowledgment (1 short sentence like "Good explanation of how you structured the database." or "That makes sense regarding your error handling.").
3. Then immediately ask the NEXT question according to stage: ${currentStagePrompt}.
4. Keep your total response under 3 to 4 sentences maximum (approx 45-60 words). Long answers sound tedious over voice.
5. Do NOT include markdown bolding, asterisks (*), emojis, or bullet points, because your output is read aloud via speech synthesis.`;

  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  // Add recent context
  chatHistory.slice(-4).forEach(turn => {
    messages.push({
      role: turn.role === 'candidate' ? 'user' : 'assistant',
      content: turn.text
    });
  });

  if (latestCandidateAnswer) {
    messages.push({
      role: 'user',
      content: latestCandidateAnswer
    });
  }

  try {
    const data = await executeGroqRequest({
      model: MODEL_CONVERSATION,
      messages,
      temperature: 0.7,
      max_tokens: 150,
      clientApiKey: apiKey
    });

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error('Empty response from Groq');
    // Clean any accidental markdown asterisks so speech synthesis reads naturally
    const cleanReply = reply.replace(/[*#_~]/g, '');
    return { interviewerText: cleanReply };
  } catch (err) {
    console.warn('Groq conversational turn using fallback turn:', err.message);
    return getOfflineInterviewerTurn({ questionIndex, candidateName, skills, projects, latestCandidateAnswer });
  }
}

/**
 * Fallback questions when running offline or without an API key.
 */
function getOfflineInterviewerTurn({ questionIndex, candidateName, skills, projects, latestCandidateAnswer: _ }) {
  const topSkill = skills[0] || 'your core programming language';
  const secondSkill = skills[1] || 'database management';
  const topProject = projects[0] || 'one of your primary projects';

  const bank = {
    1: `Thank you for sharing your background. Looking at your resume, you highlighted ${topProject}. Could you explain the overall architecture and the specific role you played in building it?`,
    2: `That is insightful. When developing applications with ${topSkill}, what was one of the most frustrating bugs or performance bottlenecks you faced, and how did you diagnose and resolve it?`,
    3: `Great problem-solving approach. Let's touch upon ${secondSkill}. How do you ensure data integrity, and what trade-offs do you consider when designing queries or schema structures?`,
    4: `Understood. Imagine you are working on a high-concurrency feature and several users report intermittent timeout errors. What steps would you take systematically to isolate whether the issue is network, backend, or database related?`,
    5: `Thanks for walking through that. To conclude our conversation, what key technical skills or technologies are you currently most eager to master next, and how do you handle learning new stacks under tight deadlines?`
  };

  return {
    interviewerText: bank[questionIndex] || `Thank you ${candidateName}, that concludes our screening questions. Let us proceed to your comprehensive evaluation.`
  };
}

/**
 * Helper to identify if a question answer was skipped or empty
 */
export function isQuestionSkipped(answer) {
  if (!answer) return true;
  const cleaned = answer.trim().toLowerCase();
  if (cleaned.length < 5) return true;
  return (
    cleaned.includes('candidate moved to next question') ||
    cleaned.includes('skipped') ||
    cleaned.includes('no response') ||
    cleaned.includes('no answer') ||
    cleaned === 'self introduction completed.'
  );
}

/**
 * Generates the comprehensive post-interview scorecard using llama-3.3-70b-versatile.
 * Evaluates candidate responses against industry placement benchmarks.
 *
 * @param {Object} params
 * @param {string} params.candidateName
 * @param {Array<string>} params.skills
 * @param {Array<string>} params.projects
 * @param {Array<{ question: string, answer: string }>} params.qaPairs
 * @param {string} params.targetRole
 */
export async function generateInterviewScorecard({
  candidateName,
  skills = [],
  projects = [],
  qaPairs = [],
  targetRole = 'Software Engineer'
}) {
  const totalQuestions = Math.max(qaPairs.length, 1);
  const answeredCount = qaPairs.filter(p => !isQuestionSkipped(p.answer)).length;

  // ── ALL QUESTIONS SKIPPED: strictly return 0 scorecard immediately ──
  if (answeredCount === 0) {
    return generateOfflineScorecard({ candidateName, skills, qaPairs });
  }

  const apiKey = getActiveScorecardKey();

  const prompt = `You are a Lead Technical Interviewer and Placement Director.
Candidate Name: ${candidateName}
Target Role: ${targetRole}
Key Skills: ${skills.join(', ')}
Candidate Projects: ${projects.join('; ')}

Here is the full transcript of questions and the candidate's spoken/typed answers:
${JSON.stringify(qaPairs, null, 2)}

SCORING RULES (CRITICAL):
1. Any question answer marked "(Skipped)" or containing no response MUST receive score = 0.
2. Deduct points proportionally for skipped questions. The candidate answered ${answeredCount} of ${totalQuestions} questions.
3. If overall score is below 65, verdict must be "Needs More Practice".

Provide a strict, professional assessment in valid JSON with EXACTLY this structure:
{
  "overallScore": 82,
  "verdict": "Placement Ready" | "Needs Practice" | "Strong Hire",
  "categoryScores": {
    "communication": 85,
    "technicalDepth": 78,
    "projectClarity": 86,
    "problemSolving": 80
  },
  "selfIntroAnalysis": {
    "score": 85,
    "feedback": "Concise overview of education and passion, but could explicitly mention target career milestones."
  },
  "strengths": [
    "Clear explanation of project tech choices"
  ],
  "areasForImprovement": [
    "Elaborate more on quantifiable metrics"
  ],
  "questionReviews": [
    {
      "questionNumber": 1,
      "question": "Walk me through your background...",
      "candidateAnswerSnippet": "...",
      "score": 85,
      "feedback": "Strong self introduction.",
      "modelAnswer": "A benchmark candidate should cover: 1) Education, 2) Technical stack, 3) Projects."
    }
  ]
}

Ensure the response contains ONLY pure JSON without markdown code fences or backticks.`;

  try {
    const data = await executeGroqRequest({
      model: MODEL_EVALUATION,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 1500,
      clientApiKey: apiKey
    });

    let text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('No content received from evaluation engine');
    if (text.startsWith('```json')) text = text.replace(/```json\n?/, '').replace(/\n?```$/, '');
    else if (text.startsWith('```')) text = text.replace(/```\n?/, '').replace(/\n?```$/, '');

    const result = JSON.parse(text);

    // Enforce 0 score on any skipped questions
    if (result.questionReviews && Array.isArray(result.questionReviews)) {
      result.questionReviews = result.questionReviews.map((rev, idx) => {
        const originalAnswer = qaPairs[idx]?.answer;
        if (isQuestionSkipped(originalAnswer)) {
          return {
            ...rev,
            candidateAnswerSnippet: '(Skipped — no response recorded)',
            score: 0,
            feedback: 'This question was skipped. Score: 0/100.'
          };
        }
        return rev;
      });
    }

    // Apply proportional score cap based on answered fraction
    const answeredRatio = answeredCount / totalQuestions;
    if (answeredRatio < 1) {
      result.overallScore = Math.min(result.overallScore, Math.round(result.overallScore * answeredRatio));
      if (result.categoryScores) {
        result.categoryScores.communication = Math.round((result.categoryScores.communication || 0) * answeredRatio);
        result.categoryScores.technicalDepth = Math.round((result.categoryScores.technicalDepth || 0) * answeredRatio);
        result.categoryScores.projectClarity = Math.round((result.categoryScores.projectClarity || 0) * answeredRatio);
        result.categoryScores.problemSolving = Math.round((result.categoryScores.problemSolving || 0) * answeredRatio);
      }
      if (result.overallScore < 65) {
        result.verdict = 'Needs More Practice';
      }
    }

    return result;
  } catch (err) {
    console.warn('Groq 70b evaluation failed, generating offline scorecard:', err.message);
    return generateOfflineScorecard({ candidateName, skills, qaPairs });
  }
}

/**
 * Intelligent deterministic scorecard generator used as fallback.
 * Analyzes answer quality beyond just length — detects garbled speech,
 * penalizes incoherent/skipped answers, and rewards well-structured technical responses.
 * Skipped questions score 0. All-skipped = 0/100.
 */
function generateOfflineScorecard({ candidateName: _candidateName, skills: _skills, qaPairs = [] }) {
  const technicalKeywords = [
    'database', 'api', 'server', 'client', 'function', 'variable', 'array', 'object', 'class', 'method',
    'algorithm', 'complexity', 'performance', 'optimize', 'debug', 'error', 'exception', 'test', 'deploy',
    'framework', 'library', 'component', 'module', 'interface', 'async', 'promise', 'callback', 'state',
    'design', 'pattern', 'architecture', 'scalable', 'system', 'network', 'request', 'response', 'cache',
    'security', 'authentication', 'query', 'schema', 'index', 'constraint', 'model', 'view', 'controller',
    'experience', 'project', 'built', 'developed', 'implemented', 'worked', 'team', 'problem', 'solution',
    'example', 'approach', 'consider', 'ensure', 'manage', 'handle', 'process', 'data', 'user', 'feature'
  ];

  const analyzeAnswer = (answer) => {
    // No answer / skipped → strictly 0 score
    if (isQuestionSkipped(answer)) return { score: 0, quality: 'skipped' };

    const words = answer.trim().split(/\s+/).filter(w => w.length > 1);
    const wordCount = words.length;
    const lowerAnswer = answer.toLowerCase();

    // Detect garbled/nonsensical text: very low real-word ratio
    const realWordCount = words.filter(w => /^[a-zA-Z'-]{2,}$/.test(w)).length;
    const realWordRatio = realWordCount / Math.max(wordCount, 1);

    // Count technical keyword matches
    const keywordCount = technicalKeywords.filter(kw => lowerAnswer.includes(kw)).length;

    // Detect incoherent patterns (garbled speech has short unrelated words)
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / Math.max(words.length, 1);
    const isLikelyGarbled = realWordRatio < 0.7 || avgWordLength < 3.2;

    // Garbled speech: low score (12–25) — better than skipped but barely
    if (isLikelyGarbled && wordCount < 15) return { score: 12, quality: 'garbled' };
    if (isLikelyGarbled) return { score: 25, quality: 'garbled' };

    // Score based on: word count (max 30pts), keywords (max 40pts), coherence (max 30pts)
    const lengthScore = Math.min(30, Math.round((wordCount / 80) * 30));
    const keywordScore = Math.min(40, keywordCount * 6);
    const coherenceScore = realWordRatio >= 0.9 ? 28 : realWordRatio >= 0.8 ? 20 : 12;

    // Minimum for a real answered question is 35 (not applied to skipped/garbled)
    return {
      score: Math.max(35, Math.min(92, lengthScore + keywordScore + coherenceScore)),
      quality: keywordCount >= 3 ? 'good' : 'basic'
    };
  };

  const analyses = qaPairs.map(p => analyzeAnswer(p.answer));
  const questionScores = analyses.map(a => a.score);

  // Count actually answered questions (not skipped)
  const answeredCount = analyses.filter(a => a.quality !== 'skipped').length;
  const totalQuestions = qaPairs.length || 6;

  // avgScore is weighted: skipped questions count as 0 in the average
  const rawAvg = questionScores.length > 0
    ? questionScores.reduce((a, b) => a + b, 0) / totalQuestions
    : 0;
  const avgScore = Math.round(rawAvg);

  // ── ALL SKIPPED: return zero scorecard ──────────────────────────────
  if (answeredCount === 0) {
    return {
      overallScore: 0,
      verdict: 'No Answers Recorded',
      categoryScores: { communication: 0, technicalDepth: 0, projectClarity: 0, problemSolving: 0 },
      selfIntroAnalysis: {
        score: 0,
        feedback: 'No self-introduction was recorded. Click "Practice Another Resume" to try again and speak clearly when the microphone is active.'
      },
      strengths: [],
      areasForImprovement: [
        'No answers were captured during this session.',
        'Ensure your microphone is working before starting the interview.',
        'Try using "Switch to Type Mode" if voice recognition is not working for you.'
      ],
      questionReviews: qaPairs.map((p, idx) => ({
        questionNumber: idx + 1,
        question: p.question,
        candidateAnswerSnippet: '(No response captured — question was skipped)',
        score: 0,
        feedback: 'This question was skipped. Every question you answer improves your score.',
        modelAnswer: 'Focus on technical architecture, specific library decisions, performance considerations, and lessons learned from production or testing.'
      }))
    };
  }

  // ── PARTIAL ANSWERS: penalize proportionally ─────────────────────────
  // Apply category-level variance around the weighted average
  const communication = Math.min(95, Math.max(0, avgScore + 4));
  const technicalDepth = Math.min(92, Math.max(0, avgScore - 5));
  const projectClarity = Math.min(93, Math.max(0, avgScore + 2));
  const problemSolving = Math.min(90, Math.max(0, avgScore - 2));

  const overallScore = Math.round((communication + technicalDepth + projectClarity + problemSolving) / 4);

  const skippedCount = totalQuestions - answeredCount;
  const verdict = overallScore >= 80
    ? 'Placement Ready'
    : overallScore >= 65
    ? 'Good Foundation — Needs Polish'
    : overallScore >= 35
    ? 'Needs More Practice'
    : 'Needs More Practice';

  return {
    overallScore,
    verdict,
    categoryScores: { communication, technicalDepth, projectClarity, problemSolving },
    selfIntroAnalysis: {
      score: Math.min(90, Math.max(0, avgScore + 1)),
      feedback: analyses[0]?.quality === 'skipped'
        ? 'The self-introduction question was not answered. This is the most important question — always start with a clear 60-second introduction.'
        : "You covered your academic background and interests clearly. Next time, try framing your introduction using the 'Present-Past-Future' formula."
    },
    strengths: avgScore >= 70 ? [
      'Good willingness to articulate thought process directly.',
      'Practical familiarity with key tools from your resume.',
      'Clear conversational pace and tone.'
    ] : answeredCount > 0 ? [
      `Answered ${answeredCount} of ${totalQuestions} questions.`,
      'Showed willingness to engage with technical questions.'
    ] : [],
    areasForImprovement: [
      ...(skippedCount > 0 ? [`${skippedCount} question${skippedCount > 1 ? 's were' : ' was'} skipped — each skipped question scores 0 and lowers your overall score.`] : []),
      'Incorporate the STAR technique (Situation, Task, Action, Result) when discussing project challenges.',
      'Provide specific real-world metrics (e.g., response time, error rates) rather than generic descriptions.',
      ...(analyses.some(a => a.quality === 'garbled')
        ? ['Speak clearly and at a steady pace — some answers were not fully captured by voice recognition. Consider using Type Mode for complex answers.']
        : [])
    ],
    questionReviews: qaPairs.map((p, idx) => {
      const analysis = analyses[idx] || { score: 0, quality: 'skipped' };
      const isSkipped = analysis.quality === 'skipped';
      const isGarbled = analysis.quality === 'garbled';
      return {
        questionNumber: idx + 1,
        question: p.question,
        candidateAnswerSnippet: p.answer || '(No response captured — skipped)',
        score: analysis.score,
        feedback: isSkipped
          ? 'This question was skipped (0 points). Answering even briefly is better than skipping.'
          : isGarbled
          ? 'The voice recognition could not capture a clear answer. Try using the "Switch to Type Mode" button for technical questions, or speak closer to your microphone.'
          : analysis.quality === 'good'
          ? 'Good technical depth and relevant points mentioned. Structure your answer with clear steps for maximum impact.'
          : 'Answer captured. Try to include more specific technical details and concrete examples from your past projects.',
        modelAnswer: 'Focus on technical architecture, specific library decisions, performance considerations, and lessons learned from production or testing.'
      };
    })
  };
}

