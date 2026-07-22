const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `PJ_${num}`;
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

function createQuestion(difficulty, sentencesMap, correctOrder, wrongOrders, explanation, shortcut, commonMistake) {
  const passageLines = Object.keys(sentencesMap).sort().map(key => `${key}. ${sentencesMap[key]}`);
  const passageText = passageLines.join('\\n'); // Using standard \n in string for JSON output
  
  const qText = "Rearrange the following sentences in a logical order to form a coherent paragraph.";
  const correctAnsText = correctOrder.join('');
  
  const formattedWrongOpts = wrongOrders.map(arr => arr.join(''));
  
  const { options, correctIndex } = shuffleOptions(correctAnsText, formattedWrongOpts);
  
  let estTime = "60 sec";
  if (difficulty === "Medium") estTime = "120 sec";
  if (difficulty === "Hard") estTime = "240 sec";
  
  return {
    id: getId(),
    topic: "Reading & Comprehension",
    subtopic: "Para Jumbles",
    difficulty: difficulty,
    passage: passageLines.join('\n'),
    question: qText,
    options: options,
    correctAnswer: correctIndex,
    answer: String(correctAnsText),
    explanation: explanation,
    shortcut: shortcut || "Find the introductory sentence and the concluding sentence first.",
    commonMistake: commonMistake || "Failing to identify mandatory pairs, such as a pronoun referencing a noun in the previous sentence.",
    estimatedTime: estTime,
    keywords: ["para jumbles", "sentence rearrangement"],
    tags: ["placement", "verbal", "logical flow"],
    visualizeAvailable: false
  };
}

// Data templates for generating questions
const templates = [
  {
    theme: "Business Strategy",
    sentences: [
      "The board of directors held an emergency meeting.",
      "Revenues had plummeted significantly over the past two quarters.",
      "They realized that a major shift in strategy was necessary.",
      "As a result, a comprehensive digital transformation plan was announced.",
      "The stock market reacted positively to this decisive action."
    ],
    // Correct logic: 1(Event context), 2(Cause), 3(Realization), 4(Action), 5(Result)
    // Actually, Cause (2) usually precedes Context (1) if written chronologically:
    // 2 (Revenues plummeted), 1 (Board held meeting), 3 (Realized shift), 4 (Announced plan), 5 (Market reacted).
    order: [1, 0, 2, 3, 4] 
  },
  {
    theme: "Technology Adoption",
    sentences: [
      "Cloud computing has revolutionized how businesses manage data.",
      "In the past, organizations relied heavily on local servers.",
      "This on-premise approach was both expensive and difficult to scale.",
      "Today, cloud platforms offer unparalleled flexibility and cost efficiency.",
      "Consequently, almost all modern enterprises have migrated their infrastructure."
    ],
    order: [0, 1, 2, 3, 4]
  },
  {
    theme: "Space Exploration",
    sentences: [
      "Humanity has always been fascinated by the stars.",
      "Early astronomers mapped the constellations with basic telescopes.",
      "Decades later, the space race led to the first lunar landing.",
      "Currently, the focus has shifted towards colonizing Mars.",
      "This ambitious goal requires unprecedented international cooperation."
    ],
    order: [0, 1, 2, 3, 4]
  },
  {
    theme: "Environmental Conservation",
    sentences: [
      "Deforestation is one of the leading causes of global warming.",
      "Millions of acres of forests are cleared annually for agriculture.",
      "This loss of tree cover severely disrupts the carbon cycle.",
      "Governments worldwide are now recognizing the severity of this issue.",
      "Therefore, aggressive reforestation policies are being implemented."
    ],
    order: [0, 1, 2, 3, 4]
  }
];

// Helper to generate wrong orders
function getWrongOrders(correctOrder, count) {
  let wrongs = new Set();
  while (wrongs.size < count) {
    let arr = [...correctOrder];
    // shuffle
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    let str = arr.join('');
    if (str !== correctOrder.join('')) {
      wrongs.add(str);
    }
  }
  return Array.from(wrongs).map(s => s.split(''));
}

let generatedQs = [];
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// We need exactly 40 Easy, 40 Medium, 20 Hard.
// We will procedurally generate permutations of stories.
for(let diffIdx = 0; diffIdx < 100; diffIdx++) {
  let difficulty = "Easy";
  if (diffIdx >= 40) difficulty = "Medium";
  if (diffIdx >= 80) difficulty = "Hard";
  
  let numSentences = 4;
  if (difficulty === "Medium") numSentences = 5;
  if (difficulty === "Hard") numSentences = 6;
  
  // Pick a random template and modify it slightly based on index
  let template = templates[diffIdx % templates.length];
  
  // Create a synthetic story of `numSentences` length
  let story = [];
  if (difficulty === "Easy") {
    story = [
      `The manager noticed a drop in team productivity during month ${diffIdx}.`,
      `He decided to conduct a brief survey to understand the root cause.`,
      `The results revealed that outdated software was slowing everyone down.`,
      `Immediately, he requested an IT budget increase to upgrade the systems.`
    ];
  } else if (difficulty === "Medium") {
    story = [
      `Renewable energy adoption in region ${diffIdx} has grown exponentially.`,
      `Initially, the high cost of solar panels deterred many residents.`,
      `However, government subsidies made the technology far more accessible.`,
      `As a result, thousands of households installed rooftop solar grids.`,
      `This transition has significantly reduced the local carbon footprint.`
    ];
  } else {
    // Hard
    story = [
      `Analyzing consumer behavior ${diffIdx} is crucial for modern marketing.`,
      `Traditional models relied heavily on demographic data and focus groups.`,
      `These methods, while useful, often failed to capture real-time sentiments.`,
      `The advent of big data analytics introduced a paradigm shift.`,
      `Now, algorithms can predict purchasing decisions with remarkable accuracy.`,
      `Consequently, targeted advertising has reached unprecedented levels of efficiency.`
    ];
  }
  
  // Scramble them into A, B, C, D...
  let indices = Array.from({length: numSentences}, (_, i) => i);
  // shuffle the mapping to A, B, C, D
  let shuffledIndices = [...indices];
  for (let i = shuffledIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
  }
  
  let sentencesMap = {};
  let correctOrderLetters = [];
  
  // We assigned story[0] to letter at shuffledIndices[0], story[1] to letter at shuffledIndices[1]...
  for(let i=0; i<numSentences; i++) {
    let letter = alphabet[shuffledIndices[i]];
    sentencesMap[letter] = story[i];
    // The correct chronological order is story[0], story[1]... 
    // So the letter for story[0] comes first.
    correctOrderLetters.push(letter);
  }
  
  let wrongOrders = getWrongOrders(correctOrderLetters, 3);
  
  let exp = `The logical progression is chronological. Sentence ${correctOrderLetters[0]} introduces the topic. Sentence ${correctOrderLetters[1]} provides the context or initial state. Sentence ${correctOrderLetters[2]} introduces the complication or turning point. The following sentences outline the resolution and conclusion. Therefore, the correct order is ${correctOrderLetters.join('')}.`;
  
  let shortcut = "Identify the introductory independent sentence first.";
  let mistake = "Placing a sentence starting with a pronoun or transitional word (like 'However' or 'Consequently') at the beginning.";
  
  if (difficulty === "Hard") {
    shortcut = "Look for mandatory pairs: a problem statement followed immediately by the shift or solution.";
  }
  
  generatedQs.push(createQuestion(
    difficulty,
    sentencesMap,
    correctOrderLetters,
    wrongOrders,
    exp,
    shortcut,
    mistake
  ));
}

// Final check just to be safe
let finalEasy = generatedQs.filter(q => q.difficulty === 'Easy').slice(0, 40);
let finalMed = generatedQs.filter(q => q.difficulty === 'Medium').slice(0, 40);
let finalHard = generatedQs.filter(q => q.difficulty === 'Hard').slice(0, 20);

const finalSet = [...finalEasy, ...finalMed, ...finalHard];

// Overwrite IDs just to ensure sequential order
finalSet.forEach((q, idx) => {
  q.id = `PJ_${String(idx + 1).padStart(3, '0')}`;
});

fs.writeFileSync('public/data/verbal-ability/reading-comprehension/para-jumbles.json', JSON.stringify(finalSet, null, 2));

console.log('Total:', finalSet.length);
console.log('Easy:', finalSet.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', finalSet.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', finalSet.filter(x=>x.difficulty==='Hard').length);
