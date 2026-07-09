const fs = require('fs');
const path = require('path');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `SYLLOGISM_${num}`;
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
    subtopic: "Syllogism",
    difficulty: difficulty,
    question: questionText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    logicRule: logicRule,
    explanation: expText,
    shortcut: shortcutText || "Draw Venn diagrams. Standardize circles for 'All', intersecting for 'Some', non-intersecting with cross for 'No'.",
    commonMistake: mistakeText || "Assuming 'Some' means 'Only Some' (e.g., if 'All A are B', 'Some A are B' is also logically true).",
    estimatedTime: estTime,
    keywords: ["syllogism", "logical reasoning", "statements", "conclusions", "venn diagram"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

const termsA = ["cats", "dogs", "lions", "tigers", "elephants", "birds", "fishes", "horses", "cows", "monkeys", "apples", "mangoes", "bananas", "grapes", "oranges"];
const termsB = ["animals", "pets", "wild", "mammals", "creatures", "living beings", "toys", "machines", "cars", "bikes", "fruits", "vegetables", "sweets", "colors", "boxes"];
const termsC = ["black", "white", "red", "smart", "fast", "slow", "tall", "short", "heavy", "light", "sweet", "sour", "hard", "soft", "round"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getDistinctTerms(count) {
  const all = [...termsA, ...termsB, ...termsC];
  const res = [];
  while(res.length < count) {
    const t = getRandom(all);
    if (!res.includes(t)) res.push(t);
  }
  return res;
}

let generatedQs = [];

// EASY: 40 questions (2 Statements, 2 Conclusions, Direct relationships)
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let qText = "";
  let next = "";
  let wrongs = [];
  let rule = "";
  let exp = "";
  
  let t = getDistinctTerms(3); // A, B, C
  
  if (type === 0) {
    // All A are B. Some B are C.
    // Conc I: Some A are C. (False)
    // Conc II: Some B are A. (True)
    qText = `Statements:\n1. All ${t[0]} are ${t[1]}.\n2. Some ${t[1]} are ${t[2]}.\n\nConclusions:\nI. Some ${t[0]} are ${t[2]}.\nII. Some ${t[1]} are ${t[0]}.`;
    next = "Only II follows";
    wrongs = ["Only I follows", "Both I and II follow", "Neither I nor II follows"];
    rule = "Universal Positive + Particular Positive";
    exp = `Step 1: Draw the Venn diagram. Draw a circle for ${t[0]} completely inside the circle for ${t[1]}. Step 2: Draw a circle for ${t[2]} overlapping with ${t[1]}. However, there is no direct relationship stated between ${t[0]} and ${t[2]}. Step 3: Conclusion I says 'Some ${t[0]} are ${t[2]}'. We cannot guarantee this from the diagram, so it doesn't follow. Conclusion II says 'Some ${t[1]} are ${t[0]}'. Since all ${t[0]} are ${t[1]}, the part of ${t[1]} covering ${t[0]} makes this definitely true. Final Answer: Only II follows.`;
  } else if (type === 1) {
    // All A are B. All B are C.
    // Conc I: All A are C. (True)
    // Conc II: Some C are A. (True)
    qText = `Statements:\n1. All ${t[0]} are ${t[1]}.\n2. All ${t[1]} are ${t[2]}.\n\nConclusions:\nI. All ${t[0]} are ${t[2]}.\nII. Some ${t[2]} are ${t[0]}.`;
    next = "Both I and II follow";
    wrongs = ["Only I follows", "Only II follows", "Neither I nor II follows"];
    rule = "Universal Positive + Universal Positive";
    exp = `Step 1: Draw circle ${t[0]} inside ${t[1]}. Step 2: Draw circle ${t[1]} completely inside ${t[2]}. Step 3: Thus, circle ${t[0]} is entirely inside circle ${t[2]}. Conclusion I ('All ${t[0]} are ${t[2]}') is true. Since ${t[2]} contains ${t[0]}, there are some ${t[2]} that are ${t[0]}. Conclusion II ('Some ${t[2]} are ${t[0]}') is also true. Final Answer: Both I and II follow.`;
  } else if (type === 2) {
    // Some A are B. No B is C.
    // Conc I: Some A are not C. (True)
    // Conc II: Some C are A. (False)
    qText = `Statements:\n1. Some ${t[0]} are ${t[1]}.\n2. No ${t[1]} is ${t[2]}.\n\nConclusions:\nI. Some ${t[0]} are not ${t[2]}.\nII. Some ${t[2]} are ${t[0]}.`;
    next = "Only I follows";
    wrongs = ["Only II follows", "Both I and II follow", "Neither I nor II follows"];
    rule = "Particular Positive + Universal Negative";
    exp = `Step 1: Draw circle ${t[0]} intersecting with circle ${t[1]}. Step 2: Draw circle ${t[2]} totally separate from circle ${t[1]}. Step 3: The part of ${t[0]} that overlaps with ${t[1]} can NEVER be ${t[2]} because No ${t[1]} is ${t[2]}. Therefore, Conclusion I ('Some ${t[0]} are not ${t[2]}') is definitely true. There is no direct relation between ${t[2]} and the rest of ${t[0]}, so Conclusion II does not follow. Final Answer: Only I follows.`;
  } else {
    // No A is B. No B is C.
    // Conc I: No A is C. (False)
    // Conc II: Some A are C. (False)
    qText = `Statements:\n1. No ${t[0]} is ${t[1]}.\n2. No ${t[1]} is ${t[2]}.\n\nConclusions:\nI. No ${t[0]} is ${t[2]}.\nII. Some ${t[0]} are ${t[2]}.`;
    next = "Either I or II follows"; // Complementary pair
    wrongs = ["Only I follows", "Only II follows", "Neither I nor II follows"];
    rule = "Universal Negative + Universal Negative (Complementary Pair)";
    exp = `Step 1: Draw circles ${t[0]}, ${t[1]}, and ${t[2]}. ${t[0]} and ${t[1]} are separate. ${t[1]} and ${t[2]} are separate. Step 2: The relationship between ${t[0]} and ${t[2]} is unknown. They could overlap, or they could be completely separate. Step 3: Conclusion I says they are separate. Conclusion II says they overlap. Since these two cover all possibilities between ${t[0]} and ${t[2]} (Subject and Predicate are the same), they form an 'Either/Or' pair. Final Answer: Either I or II follows.`;
  }
  generatedQs.push(createQuestion("Easy", qText, next, wrongs, rule, exp));
}

// MEDIUM: 40 questions (3 Statements, Possibilities, Only a few)
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let qText = "";
  let next = "";
  let wrongs = [];
  let rule = "";
  let exp = "";
  
  let t = getDistinctTerms(4); // A, B, C, D
  
  if (type === 0) {
    // Possibility: Some A are B. All B are C.
    // Conc I: All A being C is a possibility. (True)
    // Conc II: All C being A is a possibility. (True)
    qText = `Statements:\n1. Some ${t[0]} are ${t[1]}.\n2. All ${t[1]} are ${t[2]}.\n\nConclusions:\nI. All ${t[0]} being ${t[2]} is a possibility.\nII. All ${t[2]} being ${t[0]} is a possibility.`;
    next = "Both I and II follow";
    wrongs = ["Only I follows", "Only II follows", "Neither I nor II follows"];
    rule = "Possibility Cases";
    exp = `Step 1: The basic diagram has ${t[0]} intersecting ${t[1]}, and ${t[1]} fully inside ${t[2]}. Step 2: In syllogism, 'possibility' means if we can draw a diagram without violating the statements, it's true. Step 3: We can draw circle ${t[0]} entirely inside ${t[2]} without violating 'Some ${t[0]} are ${t[1]}'. Thus I follows. Similarly, we can draw ${t[2]} entirely inside ${t[0]} (meaning ${t[0]}, ${t[1]}, ${t[2]} are all equal or ${t[0]} is the largest). Thus II follows. Final Answer: Both I and II follow.`;
  } else if (type === 1) {
    // Only a few A are B. (Means Some A are B AND Some A are not B)
    // Conc I: Some B are not A. (False)
    // Conc II: All B being A is a possibility. (True)
    qText = `Statements:\n1. Only a few ${t[0]} are ${t[1]}.\n2. No ${t[1]} is ${t[2]}.\n\nConclusions:\nI. Some ${t[1]} are not ${t[0]}.\nII. All ${t[1]} being ${t[0]} is a possibility.`;
    next = "Only II follows";
    wrongs = ["Only I follows", "Both I and II follow", "Neither I nor II follows"];
    rule = "Only a few";
    exp = `Step 1: 'Only a few ${t[0]} are ${t[1]}' means 'Some ${t[0]} are ${t[1]}' AND 'Some ${t[0]} are not ${t[1]}'. Note that the restriction is on ${t[0]}, not ${t[1]}. Step 2: Thus, all ${t[0]} can NEVER go inside ${t[1]}. But all ${t[1]} CAN go inside ${t[0]}. Step 3: Conclusion I ('Some ${t[1]} are not ${t[0]}') cannot be definitively concluded. Conclusion II ('All ${t[1]} being ${t[0]} is a possibility') is completely true. Final Answer: Only II follows.`;
  } else if (type === 2) {
    // 3 Statements
    qText = `Statements:\n1. All ${t[0]} are ${t[1]}.\n2. Some ${t[1]} are ${t[2]}.\n3. No ${t[2]} is ${t[3]}.\n\nConclusions:\nI. Some ${t[0]} are not ${t[3]}.\nII. Some ${t[1]} are not ${t[3]}.`;
    next = "Only II follows";
    wrongs = ["Only I follows", "Both I and II follow", "Neither I nor II follows"];
    rule = "3 Statements Mix";
    exp = `Step 1: Draw circle ${t[0]} inside ${t[1]}. Intersect ${t[1]} with ${t[2]}. Draw ${t[3]} totally separate from ${t[2]}. Step 2: Conclusion I says 'Some ${t[0]} are not ${t[3]}'. We don't know the exact relation between ${t[0]} and ${t[2]}, so we can't definitively connect ${t[0]} and ${t[3]}. I is False. Step 3: Conclusion II says 'Some ${t[1]} are not ${t[3]}'. Because 'Some ${t[1]} are ${t[2]}' and 'No ${t[2]} is ${t[3]}', the part of ${t[1]} that is in ${t[2]} can NEVER be ${t[3]}. II is True. Final Answer: Only II follows.`;
  } else {
    // 'Only A are B' (Means All B are A, and B cannot interact with anything else)
    qText = `Statements:\n1. Only ${t[0]} are ${t[1]}.\n2. Some ${t[0]} are ${t[2]}.\n\nConclusions:\nI. All ${t[1]} being ${t[2]} is a possibility.\nII. No ${t[1]} is ${t[2]}.`;
    next = "Only II follows";
    wrongs = ["Only I follows", "Both I and II follow", "Either I or II follows"];
    rule = "Exclusive Proposition (Only A are B)";
    exp = `Step 1: 'Only ${t[0]} are ${t[1]}' means 'All ${t[1]} are ${t[0]}' AND it implies an exclusive relationship: ${t[1]} can NEVER be anything else but ${t[0]}. Step 2: Therefore, ${t[1]} will never intersect with ${t[2]}. Conclusion I says 'All ${t[1]} being ${t[2]} is a possibility', which is False because ${t[1]} is exclusive to ${t[0]}. Step 3: Conclusion II says 'No ${t[1]} is ${t[2]}', which is absolutely True due to the exclusivity. Final Answer: Only II follows.`;
  }
  generatedQs.push(createQuestion("Medium", qText, next, wrongs, rule, exp));
}

// HARD: 20 questions (3+ Statements, complex possibilities, Only/Only a few combinations)
for (let i = 0; i < 20; i++) {
  let type = i % 2;
  let qText = "";
  let next = "";
  let wrongs = [];
  let rule = "";
  let exp = "";
  
  let t = getDistinctTerms(4); // A, B, C, D
  
  if (type === 0) {
    // Complex 4 statements with Either/Or and Neither/Nor concepts
    qText = `Statements:\n1. Only a few ${t[0]} are ${t[1]}.\n2. Some ${t[1]} are ${t[2]}.\n3. All ${t[2]} are ${t[3]}.\n4. No ${t[3]} is ${t[0]}.\n\nConclusions:\nI. Some ${t[1]} are not ${t[0]}.\nII. Some ${t[3]} are ${t[1]}.`;
    next = "Both I and II follow";
    wrongs = ["Only I follows", "Only II follows", "Neither I nor II follows"];
    rule = "Complex overlapping constraints";
    exp = `Step 1: 'Only a few ${t[0]} are ${t[1]}' means ${t[0]} and ${t[1]} intersect. 'No ${t[3]} is ${t[0]}' means ${t[3]} and ${t[0]} are totally separate. Step 2: 'Some ${t[1]} are ${t[2]}' and 'All ${t[2]} are ${t[3]}' means that the part of ${t[1]} which is ${t[2]} is definitely inside ${t[3]}. Step 3: Since ${t[3]} cannot touch ${t[0]}, the part of ${t[1]} inside ${t[3]} can NEVER touch ${t[0]}. Therefore, 'Some ${t[1]} are not ${t[0]}' (Conclusion I) is definitely true. Step 4: 'All ${t[2]} are ${t[3]}' and 'Some ${t[1]} are ${t[2]}' directly implies that 'Some ${t[3]} are ${t[1]}' is true (Conclusion II). Final Answer: Both I and II follow.`;
  } else {
    // Multiple Possibilities and Negative Possibilities
    qText = `Statements:\n1. All ${t[0]} are ${t[1]}.\n2. No ${t[1]} is ${t[2]}.\n3. Some ${t[2]} are ${t[3]}.\n\nConclusions:\nI. All ${t[0]} being ${t[3]} is a possibility.\nII. Some ${t[3]} are not ${t[0]}.`;
    next = "Both I and II follow";
    wrongs = ["Only I follows", "Only II follows", "Neither I nor II follows"];
    rule = "Possibility with Universal Negative";
    exp = `Step 1: ${t[0]} is entirely inside ${t[1]}. ${t[1]} and ${t[2]} are separate. Therefore, ${t[0]} and ${t[2]} are completely separate (No ${t[0]} is ${t[2]}). Step 2: ${t[2]} intersects with ${t[3]}. Step 3: Conclusion I: We can draw ${t[3]} very large to encompass all of ${t[0]}, without touching ${t[1]}'s restriction on ${t[2]}. So, 'All ${t[0]} being ${t[3]}' is possible. True. Step 4: Conclusion II: The part of ${t[3]} that intersects with ${t[2]} can NEVER be ${t[1]}, and thus can NEVER be ${t[0]}. So, 'Some ${t[3]} are not ${t[0]}' is definitively True. Final Answer: Both I and II follow.`;
  }
  generatedQs.push(createQuestion("Hard", qText, next, wrongs, rule, exp));
}

// Ensure unique IDs
generatedQs.forEach((q, idx) => {
  q.id = `SYLLOGISM_${String(idx + 1).padStart(3, '0')}`;
});

const dir = path.join(process.cwd(), 'public/data/logical-reasoning/analytical-reasoning');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'syllogism.json'), JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
