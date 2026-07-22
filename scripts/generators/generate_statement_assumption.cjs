const fs = require('fs');
const path = require('path');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `STATEMENT_ASSUMPTION_${num}`;
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

function createQuestion(difficulty, questionText, nextVal, wrongVals, logicRule, expText, shortcutText, mistakeText) {
  const { options, correctIndex } = shuffleOptions(nextVal, wrongVals);
  
  let estTime = "45 sec";
  if (difficulty === "Medium") estTime = "60 sec";
  if (difficulty === "Hard") estTime = "90 sec";
  
  const letters = ["A", "B", "C", "D"];
  
  return {
    id: getId(),
    topic: "Logical Reasoning",
    subtopic: "Statement & Assumption",
    difficulty: difficulty,
    question: questionText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    logicRule: logicRule,
    explanation: expText,
    shortcut: shortcutText || "An assumption is something the speaker believes to be true *before* making the statement.",
    commonMistake: mistakeText || "Confusing an assumption (a hidden premise) with a conclusion (a result derived after the fact).",
    estimatedTime: estTime,
    keywords: ["statement", "assumption", "logical reasoning", "implicit", "premise"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

let generatedQs = [];

// Templates for Easy
const easyTemplates = [
  {
    stmt: "Please do not use mobile phones inside the library.",
    c1: "People generally carry mobile phones to the library.",
    c2: "Mobile phones cause cancer.",
    ans: "Only I is implicit",
    rule: "Existence and Purpose",
    exp: "Step 1: The statement is an instruction given in a library. Step 2: Assumption I is implicit because instructions are only put up if there's a possibility of the action occurring (people carrying phones). Step 3: Assumption II is completely irrelevant to the context of a library rule. Final Answer: Only I is implicit."
  },
  {
    stmt: "The school has decided to provide free lunch to all students to improve attendance.",
    c1: "Free lunch might attract more students to attend school.",
    c2: "The school has unlimited funds.",
    ans: "Only I is implicit",
    rule: "Motive of an Action",
    exp: "Step 1: The action is providing free lunch, and the stated goal is improving attendance. Step 2: Assumption I is implicit because the school administration must believe that free lunch acts as an incentive, otherwise they wouldn't do it. Step 3: Assumption II is extreme ('unlimited funds') and not a necessary prerequisite for providing lunch. Final Answer: Only I is implicit."
  },
  {
    stmt: "Vote for our party for a better future, a political leader appeals to the people.",
    c1: "People desire a better future.",
    c2: "Other parties will definitely ruin the future.",
    ans: "Only I is implicit",
    rule: "Appeal/Advertisement Logic",
    exp: "Step 1: The leader is appealing to voters by promising a 'better future'. Step 2: Assumption I is implicit because an appeal only works if it offers something the target audience actually wants. Step 3: Assumption II is a strong negative claim about others which the speaker might believe, but is not the *necessary* hidden assumption for their own positive appeal. Final Answer: Only I is implicit."
  },
  {
    stmt: "If it rains tomorrow, the outdoor concert will be cancelled.",
    c1: "It might rain tomorrow.",
    c2: "The concert organizers hate rain.",
    ans: "Only I is implicit",
    rule: "Conditional Probability",
    exp: "Step 1: The statement is a conditional warning about the future. Step 2: Assumption I is implicit because you only make contingency plans for events that have some probability of happening. Step 3: Assumption II assigns an emotional state ('hate') which is not necessary; they might just lack a waterproof stage. Final Answer: Only I is implicit."
  }
];

// EASY: 40 questions
for (let i = 0; i < 40; i++) {
  let t = easyTemplates[i % easyTemplates.length];
  let qText = `Statement:\n${t.stmt}\n\nAssumptions:\nI. ${t.c1}\nII. ${t.c2}`;
  let wrongs = ["Only I is implicit", "Only II is implicit", "Both I and II are implicit", "Neither I nor II is implicit"].filter(x => x !== t.ans);
  generatedQs.push(createQuestion("Easy", qText, t.ans, wrongs, t.rule, t.exp));
}

// Templates for Medium
const mediumTemplates = [
  {
    stmt: "To increase our market share, we should lower the price of our premium product, suggested the Marketing Manager.",
    c1: "Lowering the price of the premium product will not decrease its perceived quality.",
    c2: "Price is a significant factor preventing people from buying the premium product.",
    ans: "Both I and II are implicit",
    rule: "Feasibility and Obstacle Identification",
    exp: "Step 1: The manager proposes a price drop to gain market share. Step 2: Assumption I is implicit because if the price drop ruined the brand's quality reputation, they wouldn't gain market share, thus defeating the purpose. The manager assumes this won't happen. Step 3: Assumption II is implicit because lowering the price only increases sales if the current price is a barrier for potential buyers. Final Answer: Both I and II are implicit."
  },
  {
    stmt: "Despite heavy discounts, the new shopping mall is struggling to attract customers.",
    c1: "Discounts are usually sufficient to attract customers to a shopping mall.",
    c2: "The mall is located in a dangerous neighborhood.",
    ans: "Only I is implicit",
    rule: "Expectation vs Reality (The 'Despite' Keyword)",
    exp: "Step 1: The word 'Despite' indicates an unexpected outcome. Step 2: Assumption I is implicit because the speaker expected the discounts to work; the surprise implies a general assumption that discounts usually work. Step 3: Assumption II is a possible *reason* for the failure, but it is not an assumption made *before* the statement. Final Answer: Only I is implicit."
  },
  {
    stmt: "Warning: Consumption of alcohol is injurious to health.",
    c1: "People read and understand warnings.",
    c2: "People will immediately stop drinking alcohol after reading the warning.",
    ans: "Only I is implicit",
    rule: "Purpose of a Warning",
    exp: "Step 1: A public warning is issued. Step 2: Assumption I is implicit because the authority issuing the warning assumes people are literate and capable of understanding it. Step 3: Assumption II is extreme; warnings are meant to inform and deter, but the authority doesn't naively assume *immediate, universal compliance*. Final Answer: Only I is implicit."
  },
  {
    stmt: "The government has decided to impose a heavy fine on industries discharging untreated waste into the river.",
    c1: "The heavy fine will deter industries from discharging untreated waste.",
    c2: "The river water is currently unfit for human consumption.",
    ans: "Only I is implicit",
    rule: "Deterrence Mechanism",
    exp: "Step 1: Action: Imposing a fine. Target: Stopping river pollution. Step 2: Assumption I is implicit because the government assumes the financial penalty will alter corporate behavior (deterrence). Step 3: Assumption II might be factually true, but it's not the core assumption behind the *mechanism* of the fine; the fine is about pollution, not specifically drinking water quality. Final Answer: Only I is implicit."
  }
];

// MEDIUM: 40 questions
for (let i = 0; i < 40; i++) {
  let t = mediumTemplates[i % mediumTemplates.length];
  let qText = `Statement:\n${t.stmt}\n\nAssumptions:\nI. ${t.c1}\nII. ${t.c2}`;
  let wrongs = ["Only I is implicit", "Only II is implicit", "Both I and II are implicit", "Neither I nor II is implicit"].filter(x => x !== t.ans);
  generatedQs.push(createQuestion("Medium", qText, t.ans, wrongs, t.rule, t.exp));
}

// Templates for Hard
const hardTemplates = [
  {
    stmt: "Due to the recent cyber-attack on our servers, we are mandating all employees to change their passwords every 30 days.",
    c1: "Changing passwords every 30 days prevents all types of cyber-attacks.",
    c2: "Employees were not previously changing their passwords frequently enough to maintain security.",
    ans: "Only II is implicit",
    rule: "Remedial Action Logic",
    exp: "Step 1: Action: Mandating 30-day password changes due to an attack. Step 2: Assumption I uses the extreme word 'prevents all types'. No IT policy assumes 100% invulnerability. Thus, it's not implicit. Step 3: Assumption II is implicit because the new policy implies the old policy (or lack thereof) was inadequate for their security needs. Final Answer: Only II is implicit."
  },
  {
    stmt: "If you want to understand the history of ancient Rome, you must read this newly published book.",
    c1: "This newly published book contains accurate and comprehensive information about ancient Rome.",
    c2: "There are no other books available on the history of ancient Rome.",
    ans: "Only I is implicit",
    rule: "Recommendation and Necessity",
    exp: "Step 1: The speaker strongly recommends a specific book to understand Rome. Step 2: Assumption I is implicit; the speaker must believe the book is highly informative to recommend it so strongly. Step 3: Assumption II is not implicit. The phrase 'you must read' implies it is highly recommended or essential, not that it is literally the *only* book in existence. Final Answer: Only I is implicit."
  }
];

// HARD: 20 questions
for (let i = 0; i < 20; i++) {
  let t = hardTemplates[i % hardTemplates.length];
  let qText = `Statement:\n${t.stmt}\n\nAssumptions:\nI. ${t.c1}\nII. ${t.c2}`;
  let wrongs = ["Only I is implicit", "Only II is implicit", "Both I and II are implicit", "Neither I nor II is implicit"].filter(x => x !== t.ans);
  generatedQs.push(createQuestion("Hard", qText, t.ans, wrongs, t.rule, t.exp));
}

// Ensure unique IDs
generatedQs.forEach((q, idx) => {
  q.id = `STATEMENT_ASSUMPTION_${String(idx + 1).padStart(3, '0')}`;
});

const dir = path.join(process.cwd(), 'public/data/logical-reasoning/analytical-reasoning');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'statement-assumption.json'), JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
