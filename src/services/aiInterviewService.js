// src/services/aiInterviewService.js

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_CONVERSATION = 'llama-3.1-8b-instant';
const MODEL_EVALUATION = 'llama-3.3-70b-versatile';

/**
 * Gets the active Groq API Key from environment or local storage.
 */
export function getActiveGroqKey() {
  const envKey = import.meta.env.VITE_GROQ_API_KEY;
  if (envKey && envKey.trim()) return envKey.trim();
  const localKey = localStorage.getItem('aptianimate_groq_key');
  if (localKey && localKey.trim()) return localKey.trim();
  return null;
}

/**
 * Saves a custom Groq API key in localStorage.
 */
export function saveGroqKey(key) {
  if (!key) {
    localStorage.removeItem('aptianimate_groq_key');
  } else {
    localStorage.setItem('aptianimate_groq_key', key.trim());
  }
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

  const apiKey = getActiveGroqKey();

  // If no Groq API Key is configured, use structured professional fallback turns
  if (!apiKey) {
    return getOfflineInterviewerTurn({ questionIndex, candidateName, skills, projects, latestCandidateAnswer });
  }

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
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL_CONVERSATION,
        messages,
        temperature: 0.7,
        max_tokens: 150
      })
    });

    if (!res.ok) {
      console.warn('Groq conversational turn failed, falling back to built-in turn.', res.statusText);
      return getOfflineInterviewerTurn({ questionIndex, candidateName, skills, projects, latestCandidateAnswer });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    // Clean any accidental markdown asterisks so speech synthesis reads naturally
    const cleanReply = reply.replace(/[*#_~]/g, '');
    return { interviewerText: cleanReply };
  } catch (err) {
    console.error('Error fetching Groq interview turn:', err);
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
  const apiKey = getActiveGroqKey();

  if (!apiKey) {
    return generateOfflineScorecard({ candidateName, skills, qaPairs });
  }

  const prompt = `You are a Lead Technical Interviewer and Placement Director.
Candidate Name: ${candidateName}
Target Role: ${targetRole}
Key Skills: ${skills.join(', ')}
Candidate Projects: ${projects.join('; ')}

Here is the full transcript of questions and the candidate's spoken/typed answers:
${JSON.stringify(qaPairs, null, 2)}

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
    "Clear explanation of project tech choices",
    "Good understanding of fundamental concepts",
    "Confident spoken pace"
  ],
  "areasForImprovement": [
    "Elaborate more on quantifiable metrics (e.g. latency reduced, users served)",
    "Deepen database indexing rationale"
  ],
  "questionReviews": [
    {
      "questionNumber": 1,
      "question": "Walk me through your background...",
      "candidateAnswerSnippet": "...",
      "score": 85,
      "feedback": "Strong self introduction.",
      "modelAnswer": "A benchmark candidate should cover: 1) Current education/experience, 2) Key technical stack mastered, 3) 1 notable project highlight with outcome, 4) Career ambition."
    }
  ]
}

Ensure the response contains ONLY pure JSON without markdown code fences or backticks.`;

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL_EVALUATION,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 1500
      })
    });

    if (!res.ok) {
      console.warn('Groq 70b evaluation failed, generating offline scorecard.');
      return generateOfflineScorecard({ candidateName, skills, qaPairs });
    }

    const data = await res.json();
    let text = data.choices?.[0]?.message?.content?.trim();
    if (text.startsWith('```json')) text = text.replace(/```json\n?/, '').replace(/\n?```$/, '');
    else if (text.startsWith('```')) text = text.replace(/```\n?/, '').replace(/\n?```$/, '');

    return JSON.parse(text);
  } catch (err) {
    console.error('Error generating scorecard with Groq:', err);
    return generateOfflineScorecard({ candidateName, skills, qaPairs });
  }
}

/**
 * Intelligent deterministic scorecard generator used as fallback.
 */
function generateOfflineScorecard({ candidateName: _candidateName, skills: _skills, qaPairs = [] }) {
  const answeredCount = qaPairs.filter(p => p.answer && p.answer.trim().length > 10).length;
  const wordCount = qaPairs.reduce((acc, p) => acc + (p.answer ? p.answer.split(/\s+/).length : 0), 0);

  const baseScore = Math.min(94, Math.max(65, Math.round(55 + (answeredCount * 5) + Math.min(20, wordCount / 12))));

  return {
    overallScore: baseScore,
    verdict: baseScore >= 80 ? "Placement Ready" : "Good Foundation - Needs Polish",
    categoryScores: {
      communication: Math.min(95, baseScore + 2),
      technicalDepth: Math.max(60, baseScore - 3),
      projectClarity: Math.min(92, baseScore + 4),
      problemSolving: Math.max(65, baseScore - 2)
    },
    selfIntroAnalysis: {
      score: Math.min(90, baseScore + 1),
      feedback: "You covered your academic background and interests clearly. Next time, try framing your introduction using the 'Present-Past-Future' formula."
    },
    strengths: [
      "Good willingness to articulate thought process directly.",
      "Practical familiarity with key tools from your resume.",
      "Clear conversational pace and tone."
    ],
    areasForImprovement: [
      "Incorporate the STAR technique (Situation, Task, Action, Result) when discussing project challenges.",
      "Provide specific real-world metrics (e.g., response time, error rates) rather than generic descriptions."
    ],
    questionReviews: qaPairs.map((p, idx) => ({
      questionNumber: idx + 1,
      question: p.question,
      candidateAnswerSnippet: p.answer || "(No response captured)",
      score: p.answer && p.answer.length > 20 ? Math.min(90, 75 + (idx % 15)) : 50,
      feedback: p.answer && p.answer.length > 20
        ? "Good key points mentioned. Structure your answer with clear bulleted steps for maximum impact."
        : "Try to speak more elaborately and provide concrete examples from your past projects.",
      modelAnswer: "Focus on technical architecture, specific library decisions, performance considerations, and lessons learned from production or testing."
    }))
  };
}
