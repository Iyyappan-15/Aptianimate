const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `SC_${num}`;
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

function createQuestion(difficulty, correctSentence, wrongSentences, explanation, grammarRule, shortcut, commonMistake) {
  const qText = "Select the grammatically correct sentence from the given options.";
  const { options, correctIndex } = shuffleOptions(correctSentence, wrongSentences);
  
  let estTime = "45 sec";
  if (difficulty === "Medium") estTime = "60 sec";
  if (difficulty === "Hard") estTime = "90 sec";
  
  return {
    id: getId(),
    topic: "Grammar & Usage",
    subtopic: "Sentence Correction",
    difficulty: difficulty,
    question: qText,
    options: options,
    correctAnswer: correctIndex,
    answer: correctSentence,
    explanation: explanation,
    grammarRule: grammarRule,
    shortcut: shortcut || "Eliminate options with obvious subject-verb or tense mismatches first.",
    commonMistake: commonMistake || "Choosing an option that 'sounds correct' colloquially but violates formal grammar rules.",
    estimatedTime: estTime,
    keywords: ["grammar", "sentence correction", grammarRule.toLowerCase()],
    tags: ["placement", "verbal ability"],
    visualizeAvailable: false
  };
}

// Data Sets
const easyData = [
  {
    c: "She has been working here since 2018.",
    w: [
      "She is working here since 2018.",
      "She has been working here from 2018.",
      "She have been working here since 2018."
    ],
    exp: "When referring to an action that started in the past and continues to the present, use the present perfect continuous tense ('has been working'). 'Since' is used for a specific point in time.",
    rule: "Tenses & Prepositions",
    short: "Time markers like 'since 2018' require perfect tenses, not continuous tenses ('is working').",
    mistake: "Using 'is working' with 'since', which is a common spoken error."
  },
  {
    c: "He is the tallest boy in the class.",
    w: [
      "He is tallest boy in the class.",
      "He is the more taller boy in the class.",
      "He is the tallest boy of the class."
    ],
    exp: "Superlative adjectives ('tallest') must be preceded by the definite article 'the'. 'In the class' is the correct prepositional phrase.",
    rule: "Adjectives (Superlative) & Articles",
    short: "Always use 'the' before superlative adjectives (-est).",
    mistake: "Omitting the article 'the' or using double comparatives ('more taller')."
  },
  {
    c: "Neither of the answers is correct.",
    w: [
      "Neither of the answers are correct.",
      "Neither of the answer is correct.",
      "Neither off the answers is correct."
    ],
    exp: "'Neither of' is a singular subject and must take a singular verb ('is'). It is followed by a plural noun ('the answers').",
    rule: "Subject-Verb Agreement",
    short: "Phrases starting with 'Neither of', 'Either of', or 'Each of' take singular verbs.",
    mistake: "Matching the verb to the plural noun 'answers' instead of the true subject 'Neither'."
  },
  {
    c: "I prefer coffee to tea.",
    w: [
      "I prefer coffee than tea.",
      "I prefer coffee over tea.",
      "I prefer coffee more than tea."
    ],
    exp: "The verb 'prefer' is followed by the preposition 'to', not 'than' or 'over', when comparing two nouns.",
    rule: "Prepositions (Idiomatic)",
    short: "Prefer always pairs with 'to'.",
    mistake: "Using 'than' because it implies comparison, but 'prefer' has a specific prepositional pair."
  }
];

const medData = [
  {
    c: "Had I known about the meeting, I would have attended.",
    w: [
      "If I would have known about the meeting, I would have attended.",
      "Had I knew about the meeting, I would have attended.",
      "If I know about the meeting, I would have attended."
    ],
    exp: "This is a third conditional sentence expressing an unreal past situation. The correct structure is 'If + Past Perfect, Subject + would have + Past Participle'. 'Had I known' is an inversion of 'If I had known'.",
    rule: "Conditionals & Inversion",
    short: "Never use 'would have' in the 'If' clause.",
    mistake: "Using 'If I would have known', which is grammatically incorrect in formal English."
  },
  {
    c: "She enjoys reading, writing, and painting.",
    w: [
      "She enjoys reading, to write, and painting.",
      "She enjoys to read, writing, and to paint.",
      "She enjoys reading, writing, and to paint."
    ],
    exp: "Items in a series must have parallel grammatical structures. Since 'reading' and 'writing' are gerunds (-ing forms), 'painting' must also be a gerund.",
    rule: "Parallelism",
    short: "Ensure all verbs in a list share the same ending (all -ing, or all infinitives).",
    mistake: "Mixing gerunds and infinitives in a single list."
  },
  {
    c: "The committee has submitted its report.",
    w: [
      "The committee have submitted its report.",
      "The committee has submitted their report.",
      "The committee have submitted their report."
    ],
    exp: "The collective noun 'committee' acts as a single unit here, so it takes a singular verb ('has') and a singular pronoun ('its').",
    rule: "Collective Nouns & Pronouns",
    short: "If a group acts together, use 'it' and a singular verb.",
    mistake: "Using the plural pronoun 'their' with a singular verb 'has'."
  },
  {
    c: "Hardly had we left the house when it started raining.",
    w: [
      "Hardly did we leave the house than it started raining.",
      "Hardly we had left the house when it started raining.",
      "Hardly had we left the house than it started raining."
    ],
    exp: "'Hardly' must be followed by an inversion (auxiliary verb before the subject, 'had we') and pairs with the conjunction 'when'.",
    rule: "Conjunctions & Inversion",
    short: "Hardly + Inverted Subject + When.",
    mistake: "Using 'than' with 'hardly', or failing to invert the subject and verb."
  }
];

const hardData = [
  {
    c: "Walking down the street, I saw a beautiful bird.",
    w: [
      "Walking down the street, a beautiful bird was seen.",
      "Walking down the street, a beautiful bird flew past me.",
      "Walking down the street, my eyes caught a beautiful bird."
    ],
    exp: "The introductory participle phrase 'Walking down the street' must modify the subject immediately following it. 'I' was the one walking, not the bird or 'my eyes'.",
    rule: "Modifiers (Dangling Participles)",
    short: "The noun immediately after the comma must be the one performing the '-ing' action.",
    mistake: "Creating a dangling modifier where the action is attributed to an inanimate object or the wrong subject."
  },
  {
    c: "He is one of the few employees who are dedicated to their work.",
    w: [
      "He is one of the few employees who is dedicated to his work.",
      "He is one of the few employees who is dedicated to their work.",
      "He is one of the few employees whom are dedicated to his work."
    ],
    exp: "In the phrase 'one of the [plural noun] who', the relative pronoun 'who' refers to the plural noun ('employees'). Therefore, it takes a plural verb ('are') and plural pronoun ('their').",
    rule: "Relative Pronouns & Subject-Verb Agreement",
    short: "'One of the [plural noun] who' always takes a plural verb.",
    mistake: "Looking at 'one' and mistakenly using singular verbs/pronouns ('is', 'his')."
  },
  {
    c: "Whom did you say you were going to invite to the party?",
    w: [
      "Who did you say you were going to invite to the party?",
      "Whom did you say was going to invite to the party?",
      "Who did you say whom were going to invite to the party?"
    ],
    exp: "'Whom' is the object of the verb 'invite' (you were going to invite whom). 'Who' is used for subjects.",
    rule: "Pronouns (Who vs. Whom)",
    short: "If you can replace it with 'him' or 'her', use 'whom'. If you can replace it with 'he' or 'she', use 'who'.",
    mistake: "Using 'who' in the objective case, which is common in casual speech but incorrect in formal grammar."
  },
  {
    c: "No sooner had the alarm rung than the students rushed out.",
    w: [
      "No sooner did the alarm rang than the students rushed out.",
      "No sooner had the alarm rung when the students rushed out.",
      "No sooner the alarm had rung than the students rushed out."
    ],
    exp: "'No sooner' takes an inversion (had + subject + past participle) and pairs with 'than'. 'Did' requires a base verb ('ring'), not 'rang'.",
    rule: "Conjunctions & Verb Forms",
    short: "No sooner + Inversion + than.",
    mistake: "Pairing 'No sooner' with 'when' or using past tense verbs with the auxiliary 'did'."
  }
];

// Generate 40 Easy, 40 Medium, 20 Hard
let finalQs = [];

// EASY
for(let i=0; i<40; i++) {
  let base = easyData[i % easyData.length];
  let c = base.c;
  let w = [...base.w];
  
  if (i >= 4) {
    if (i % 4 === 0) {
      c = c.replace("2018", "2020").replace("She", "He");
      w = w.map(str => str.replace("2018", "2020").replace("She", "He"));
    }
    if (i % 4 === 1) {
      c = c.replace("boy", "student").replace("tallest", "smartest");
      w = w.map(str => str.replace("boy", "student").replace("tallest", "smartest"));
    }
    if (i % 4 === 2) {
      c = c.replace("answers", "options");
      w = w.map(str => str.replace("answers", "options"));
    }
    if (i % 4 === 3) {
      c = c.replace("coffee", "apples").replace("tea", "oranges");
      w = w.map(str => str.replace("coffee", "apples").replace("tea", "oranges"));
    }
  }
  finalQs.push(createQuestion("Easy", c, w, base.exp, base.rule, base.short, base.mistake));
}

// MEDIUM
for(let i=0; i<40; i++) {
  let base = medData[i % medData.length];
  let c = base.c;
  let w = [...base.w];
  
  if (i >= 4) {
    if (i % 4 === 0) {
      c = c.replace("meeting", "seminar");
      w = w.map(str => str.replace("meeting", "seminar"));
    }
    if (i % 4 === 1) {
      c = c.replace("reading, writing, and painting", "running, swimming, and cycling");
      w = w.map(str => str.replace("reading", "running").replace("writing", "swimming").replace("painting", "cycling").replace("to read", "to run").replace("to write", "to swim").replace("to paint", "to cycle"));
    }
    if (i % 4 === 2) {
      c = c.replace("committee", "jury").replace("report", "verdict");
      w = w.map(str => str.replace("committee", "jury").replace("report", "verdict"));
    }
    if (i % 4 === 3) {
      c = c.replace("left the house", "reached the station").replace("raining", "snowing");
      w = w.map(str => str.replace("left the house", "reached the station").replace("raining", "snowing").replace("leave the house", "reach the station"));
    }
  }
  finalQs.push(createQuestion("Medium", c, w, base.exp, base.rule, base.short, base.mistake));
}

// HARD
for(let i=0; i<20; i++) {
  let base = hardData[i % hardData.length];
  let c = base.c;
  let w = [...base.w];
  
  if (i >= 4) {
    if (i % 4 === 0) {
      c = c.replace("Walking down the street", "Looking out the window").replace("beautiful bird", "shooting star");
      w = w.map(str => str.replace("Walking down the street", "Looking out the window").replace("beautiful bird", "shooting star"));
    }
    if (i % 4 === 1) {
      c = c.replace("employees", "managers");
      w = w.map(str => str.replace("employees", "managers"));
    }
    if (i % 4 === 2) {
      c = c.replace("party", "conference");
      w = w.map(str => str.replace("party", "conference"));
    }
    if (i % 4 === 3) {
      c = c.replace("alarm rung", "bell rung").replace("students", "workers").replace("alarm rang", "bell rang");
      w = w.map(str => str.replace("alarm rung", "bell rung").replace("students", "workers").replace("alarm rang", "bell rang"));
    }
  }
  finalQs.push(createQuestion("Hard", c, w, base.exp, base.rule, base.short, base.mistake));
}

fs.writeFileSync('public/data/verbal-ability/grammar-usage/sentence-correction.json', JSON.stringify(finalQs, null, 2));

console.log('Total:', finalQs.length);
console.log('Easy:', finalQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', finalQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', finalQs.filter(x=>x.difficulty==='Hard').length);
