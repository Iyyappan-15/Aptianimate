const fs = require('fs');
const path = require('path');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `STATEMENT_CONCLUSION_${num}`;
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
  if (difficulty === "Hard") estTime = "120 sec";
  
  const letters = ["A", "B", "C", "D"];
  
  return {
    id: getId(),
    topic: "Logical Reasoning",
    subtopic: "Statement & Conclusion",
    difficulty: difficulty,
    question: questionText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    logicRule: logicRule,
    explanation: expText,
    shortcut: shortcutText || "Only use the information strictly given in the statement. Do not use outside knowledge.",
    commonMistake: mistakeText || "Assuming a conclusion is true just because it sounds factually correct in the real world, even if it wasn't stated.",
    estimatedTime: estTime,
    keywords: ["statement", "conclusion", "logical reasoning", "inference", "deduction"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

let generatedQs = [];

// Templates for Easy
const easyTemplates = [
  {
    stmt: "The company's profit increased by 20% this year after launching the new marketing campaign.",
    c1: "The new marketing campaign was completely useless.",
    c2: "The marketing campaign likely contributed to the increase in profit.",
    ans: "Only II follows",
    rule: "Direct Cause and Effect",
    exp: "Step 1: Read the statement carefully. It links the launch of the campaign to a 20% profit increase. Step 2: Conclusion I says the campaign was useless, which contradicts the statement's implication. Step 3: Conclusion II says it likely contributed, which is a highly logical deduction from 'after launching...'. Final Answer: Only II follows."
  },
  {
    stmt: "Drinking 8 glasses of water daily keeps the body hydrated and improves skin health.",
    c1: "People who drink 8 glasses of water have better skin health than those who don't.",
    c2: "Only water can improve skin health.",
    ans: "Only I follows",
    rule: "Direct factual deduction vs Absolute words ('Only')",
    exp: "Step 1: The statement explicitly says 8 glasses of water improves skin health. Step 2: Conclusion I logically follows because it's a direct restatement of the benefit. Step 3: Conclusion II uses the extreme word 'Only'. The statement doesn't say other things (like diet) can't improve skin health. Final Answer: Only I follows."
  },
  {
    stmt: "To reduce traffic congestion, the city council has decided to increase parking fees in the downtown area.",
    c1: "The city council believes higher fees will discourage people from bringing personal cars downtown.",
    c2: "Traffic congestion will permanently disappear tomorrow.",
    ans: "Only I follows",
    rule: "Identifying the objective of an action",
    exp: "Step 1: The stated action is increasing parking fees, and the stated goal is reducing traffic. Step 2: Conclusion I correctly identifies the logical mechanism: higher costs discourage cars, thus reducing traffic. Step 3: Conclusion II is extreme ('permanently disappear tomorrow') and cannot be guaranteed by the statement. Final Answer: Only I follows."
  },
  {
    stmt: "Sunlight is a major source of Vitamin D, which is essential for strong bones.",
    c1: "People who completely avoid sunlight might suffer from Vitamin D deficiency.",
    c2: "Bones are made entirely of Vitamin D.",
    ans: "Only I follows",
    rule: "Logical Inference",
    exp: "Step 1: Sunlight = Major source of Vitamin D. Vitamin D = Essential for bones. Step 2: If someone avoids sunlight, they miss a major source of Vitamin D, so Conclusion I logically follows. Step 3: Conclusion II is scientifically false and not supported by the text; it only says it's 'essential', not that bones are 'made entirely' of it. Final Answer: Only I follows."
  }
];

// EASY: 40 questions
for (let i = 0; i < 40; i++) {
  let t = easyTemplates[i % easyTemplates.length];
  let qText = `Statement:\n${t.stmt}\n\nConclusions:\nI. ${t.c1}\nII. ${t.c2}`;
  let wrongs = ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"].filter(x => x !== t.ans);
  generatedQs.push(createQuestion("Easy", qText, t.ans, wrongs, t.rule, t.exp));
}

// Templates for Medium
const mediumTemplates = [
  {
    stmt: "Despite a massive increase in the education budget, the literacy rate in State X has dropped by 2%.",
    c1: "Money alone is not sufficient to improve literacy rates.",
    c2: "The education budget was spent entirely on corruption.",
    ans: "Only I follows",
    rule: "Logical necessity vs Baseless assumption",
    exp: "Step 1: The statement contrasts high budget with a dropping literacy rate. Step 2: Conclusion I is a sound logical deduction; if money went up but results went down, money isn't the only factor. Step 3: Conclusion II introduces 'corruption', which is outside knowledge/assumption and not explicitly stated. Final Answer: Only I follows."
  },
  {
    stmt: "The Prime Minister emphasized that adopting solar energy is the only way to combat the impending energy crisis.",
    c1: "Other forms of energy like coal and gas will soon be completely exhausted.",
    c2: "Solar energy has the potential to solve the energy crisis.",
    ans: "Only II follows",
    rule: "Evaluating strict claims in statements",
    exp: "Step 1: The PM says solar is the 'only way' to combat the crisis. Step 2: Conclusion I talks about coal/gas exhaustion. While maybe true in reality, the statement doesn't mention *why* the crisis is happening, so it doesn't strictly follow. Step 3: Conclusion II follows because if it's the 'only way', it definitely has the potential to solve it. Final Answer: Only II follows."
  },
  {
    stmt: "All successful entrepreneurs are risk-takers. John is a risk-taker.",
    c1: "John is a successful entrepreneur.",
    c2: "John might become a successful entrepreneur.",
    ans: "Only II follows",
    rule: "Syllogistic logic in statements (A->B does not mean B->A)",
    exp: "Step 1: 'All successful entrepreneurs are risk-takers' means if you are successful, you took risks. It DOES NOT mean all risk-takers are successful. Step 2: Since John is a risk-taker, we cannot guarantee he is successful (Conclusion I is invalid). Step 3: However, since he has the prerequisite trait, he *might* become one (Conclusion II is a valid possibility). Final Answer: Only II follows."
  },
  {
    stmt: "Company Y has decided to fire 10% of its workforce due to consecutive quarterly losses.",
    c1: "Company Y will definitely become profitable next quarter.",
    c2: "The workforce reduction is an attempt to cut operational costs.",
    ans: "Only II follows",
    rule: "Objective of a business decision vs Predicting the future",
    exp: "Step 1: Action: firing 10%. Reason: quarterly losses. Step 2: Conclusion I makes an absolute prediction about the future ('definitely become profitable'). We cannot know this for sure. Step 3: Conclusion II correctly deduces the motive: firing employees reduces salary expenses (cutting costs) in response to losses. Final Answer: Only II follows."
  }
];

// MEDIUM: 40 questions
for (let i = 0; i < 40; i++) {
  let t = mediumTemplates[i % mediumTemplates.length];
  let qText = `Statement:\n${t.stmt}\n\nConclusions:\nI. ${t.c1}\nII. ${t.c2}`;
  let wrongs = ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"].filter(x => x !== t.ans);
  generatedQs.push(createQuestion("Medium", qText, t.ans, wrongs, t.rule, t.exp));
}

// Templates for Hard
const hardTemplates = [
  {
    stmt: "In a recent survey, it was found that people who read fiction have higher empathy levels than those who read only non-fiction. However, the survey also noted that highly empathetic people are naturally drawn to fiction.",
    c1: "Reading fiction is the sole cause of high empathy.",
    c2: "There is a correlation between reading fiction and empathy, but the exact direction of causation is unclear.",
    ans: "Only II follows",
    rule: "Correlation vs Causation",
    exp: "Step 1: The statement presents two facts: fiction readers have high empathy, AND empathetic people like fiction. Step 2: Conclusion I says fiction is the 'sole cause'. This ignores the second part of the statement (empathetic people are drawn to it) and uses the extreme word 'sole'. Step 3: Conclusion II correctly identifies that they are linked (correlation), but because both influence each other in the text, strict causation is unclear. Final Answer: Only II follows."
  },
  {
    stmt: "If a country has a high GDP, its citizens are generally happy. Country Z has a low GDP.",
    c1: "The citizens of Country Z are definitely unhappy.",
    c2: "GDP is the only factor determining happiness.",
    ans: "Neither I nor II follows",
    rule: "Logical Fallacy: Denying the Antecedent",
    exp: "Step 1: Statement format: If A (High GDP), then B (Happy). Step 2: We are told Not A (Low GDP). In formal logic, 'If A then B' does not mean 'If Not A then Not B'. People could be happy for other reasons. Thus Conclusion I does not follow. Step 3: Conclusion II is extreme ('only factor') and not supported by the text. Final Answer: Neither I nor II follows."
  }
];

// HARD: 20 questions
for (let i = 0; i < 20; i++) {
  let t = hardTemplates[i % hardTemplates.length];
  let qText = `Statement:\n${t.stmt}\n\nConclusions:\nI. ${t.c1}\nII. ${t.c2}`;
  let wrongs = ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"].filter(x => x !== t.ans);
  generatedQs.push(createQuestion("Hard", qText, t.ans, wrongs, t.rule, t.exp));
}

// Ensure unique IDs
generatedQs.forEach((q, idx) => {
  q.id = `STATEMENT_CONCLUSION_${String(idx + 1).padStart(3, '0')}`;
});

const dir = path.join(process.cwd(), 'public/data/logical-reasoning/analytical-reasoning');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'statement-conclusion.json'), JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
