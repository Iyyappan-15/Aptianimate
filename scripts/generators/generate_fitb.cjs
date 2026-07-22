const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `FITB_${num}`;
}

function shuffleOptions(correctAnswerText, otherOptions) {
  const options = [String(correctAnswerText), ...otherOptions.map(String)].slice(0, 4);
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  const correctIndex = options.indexOf(String(correctAnswerText));
  return { options, correctIndex };
}

function createQuestion(difficulty, qText, correctAns, wrongOpts, explanation, grammarRule, shortcut, commonMistake) {
  const { options, correctIndex } = shuffleOptions(correctAns, wrongOpts);
  
  let estTime = "30 sec";
  if (difficulty === "Medium") estTime = "45 sec";
  if (difficulty === "Hard") estTime = "90 sec";
  
  return {
    id: getId(),
    topic: "Grammar & Usage",
    subtopic: "Fill in the Blanks",
    difficulty: difficulty,
    question: qText,
    options: options,
    correctAnswer: correctIndex,
    answer: correctAns,
    explanation: explanation,
    grammarRule: grammarRule,
    shortcut: shortcut || "Look for contextual clues in the sentence before and after the blank.",
    commonMistake: commonMistake || "Choosing an option that sounds good but violates a specific grammatical rule or preposition pairing.",
    estimatedTime: estTime,
    keywords: ["grammar", "fill in the blanks", grammarRule.toLowerCase()],
    tags: ["placement", "verbal ability"],
    visualizeAvailable: false
  };
}

// Data Sets
const easyData = [
  {
    q: "The book is ____ the table.",
    c: "on",
    w: ["in", "at", "over"],
    exp: "The preposition 'on' is used to indicate position on a surface. 'In' implies inside, and 'over' implies above without touching.",
    rule: "Prepositions (Surface)"
  },
  {
    q: "She has been studying ____ three hours.",
    c: "for",
    w: ["since", "from", "by"],
    exp: "Use 'for' to indicate a duration of time (three hours). 'Since' is used for a specific starting point in time (e.g., since 3 PM).",
    rule: "Prepositions (Time - For vs Since)"
  },
  {
    q: "I would like to have ____ apple.",
    c: "an",
    w: ["a", "the", "some"],
    exp: "'Apple' starts with a vowel sound, so the indefinite article 'an' is required.",
    rule: "Articles (Vowel Sounds)"
  },
  {
    q: "They ____ to the market yesterday.",
    c: "went",
    w: ["go", "gone", "were going"],
    exp: "The word 'yesterday' indicates a completed action in the past, so the simple past tense 'went' is required.",
    rule: "Tenses (Simple Past)"
  }
];

const medData = [
  {
    q: "He is entirely absorbed ____ his studies.",
    c: "in",
    w: ["with", "by", "into"],
    exp: "The word 'absorbed' is idiomatically followed by the preposition 'in' when referring to deep attention or involvement.",
    rule: "Phrasal Verbs & Fixed Prepositions"
  },
  {
    q: "If I ____ you, I would not make that decision.",
    c: "were",
    w: ["was", "am", "have been"],
    exp: "In subjunctive conditional sentences expressing a hypothetical situation, 'were' is used regardless of the subject.",
    rule: "Subjunctive Mood"
  },
  {
    q: "Neither the manager nor the employees ____ informed about the meeting.",
    c: "were",
    w: ["was", "has been", "is"],
    exp: "When using 'neither...nor', the verb agrees with the subject closest to it. 'Employees' is plural, so 'were' is correct.",
    rule: "Subject-Verb Agreement"
  },
  {
    q: "The company's new policy will ____ both local and international branches.",
    c: "affect",
    w: ["effect", "affects", "effecting"],
    exp: "'Affect' is the verb meaning 'to influence'. 'Effect' is usually a noun. After the modal 'will', a base verb is required.",
    rule: "Vocabulary (Affect vs Effect)"
  }
];

const hardData = [
  {
    q: "The CEO, accompanied by his vice presidents, ____ attending the conference tomorrow.",
    c: "is",
    w: ["are", "were", "have been"],
    exp: "Phrases like 'accompanied by', 'along with', or 'as well as' do not make the subject plural. The main subject 'The CEO' is singular, so the verb must be 'is'.",
    rule: "Subject-Verb Agreement (Intervening Phrases)"
  },
  {
    q: "Scarcely ____ the station when the train departed.",
    c: "had he reached",
    w: ["he had reached", "did he reach", "he reached"],
    exp: "When a sentence begins with a negative adverb like 'Scarcely', inversion is required (auxiliary verb before the subject). Also, 'scarcely' pairs with the past perfect tense.",
    rule: "Inversion & Conjunctions"
  },
  {
    q: "She was so exhausted that she could barely ____ her eyes open.",
    c: "keep",
    w: ["hold", "maintain", "leave"],
    exp: "The idiomatic expression is 'to keep one's eyes open'. 'Hold', 'maintain', and 'leave' do not fit this specific collocation.",
    rule: "Idiomatic Collocations"
  },
  {
    q: "The detective sought to ____ the truth from the suspect's contradictory statements.",
    c: "elicit",
    w: ["illicit", "extract", "deduce"],
    exp: "'Elicit' means to draw out or evoke (a response or fact). 'Illicit' means illegal. 'Extract' and 'deduce' are less precise for drawing out truth through questioning.",
    rule: "Advanced Vocabulary & Homophones"
  }
];

// Generate 40 Easy, 40 Medium, 20 Hard
let finalQs = [];

// EASY
for(let i=0; i<40; i++) {
  let base = easyData[i % easyData.length];
  let q = base.q;
  
  if (i >= 4) {
    if (i % 4 === 0) q = q.replace("book", "laptop").replace("table", "desk");
    if (i % 4 === 1) q = q.replace("three hours", "five days").replace("She", "He");
    if (i % 4 === 2) q = q.replace("apple", "orange");
    if (i % 4 === 3) q = q.replace("market", "park").replace("They", "We");
  }
  finalQs.push(createQuestion("Easy", q, base.c, base.w, base.exp, base.rule));
}

// MEDIUM
for(let i=0; i<40; i++) {
  let base = medData[i % medData.length];
  let q = base.q;
  
  if (i >= 4) {
    if (i % 4 === 0) q = q.replace("studies", "work").replace("He is", "She is");
    if (i % 4 === 1) q = q.replace("decision", "mistake");
    if (i % 4 === 2) q = q.replace("manager", "director").replace("employees", "staff members");
    if (i % 4 === 3) q = q.replace("policy", "strategy").replace("branches", "offices");
  }
  finalQs.push(createQuestion("Medium", q, base.c, base.w, base.exp, base.rule));
}

// HARD
for(let i=0; i<20; i++) {
  let base = hardData[i % hardData.length];
  let q = base.q;
  
  if (i >= 4) {
    if (i % 4 === 0) q = q.replace("CEO", "President").replace("vice presidents", "ministers");
    if (i % 4 === 1) q = q.replace("station", "airport").replace("train", "flight");
    if (i % 4 === 2) q = q.replace("exhausted", "tired");
    if (i % 4 === 3) q = q.replace("detective", "lawyer").replace("suspect's", "witness's");
  }
  finalQs.push(createQuestion("Hard", q, base.c, base.w, base.exp, base.rule));
}

fs.writeFileSync('public/data/verbal-ability/grammar-usage/fill-in-the-blanks.json', JSON.stringify(finalQs, null, 2));

console.log('Total:', finalQs.length);
console.log('Easy:', finalQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', finalQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', finalQs.filter(x=>x.difficulty==='Hard').length);
