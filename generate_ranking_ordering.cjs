const fs = require('fs');
const path = require('path');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `RANKING_ORDERING_${num}`;
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

function createQuestion(difficulty, questionText, nextVal, wrongVals, patternText, expText, shortcutText, mistakeText) {
  const { options, correctIndex } = shuffleOptions(nextVal, wrongVals);
  
  let estTime = "30 sec";
  if (difficulty === "Medium") estTime = "60 sec";
  if (difficulty === "Hard") estTime = "90 sec";
  
  const letters = ["A", "B", "C", "D"];
  
  return {
    id: getId(),
    topic: "Logical Reasoning",
    subtopic: "Ranking & Ordering",
    difficulty: difficulty,
    question: questionText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    pattern: patternText,
    explanation: expText,
    shortcut: shortcutText || "Formula: Total = (Left Rank + Right Rank) - 1. Draw a quick linear diagram for relative positions.",
    commonMistake: mistakeText || "Forgetting to subtract 1 when calculating the total from both ends, counting the same person twice.",
    estimatedTime: estTime,
    keywords: ["ranking", "ordering", "logical reasoning", "position", "queue", "row"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

let generatedQs = [];

const namesM = ["Aarav", "Rohan", "Vikram", "Rahul", "Karan", "Ajay", "Amit", "Raj", "Sameer", "Ravi"];
const namesF = ["Priya", "Neha", "Simran", "Anjali", "Riya", "Pooja", "Kavita", "Anita", "Geeta", "Sunita"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getDistinct(arr, count) {
  let res = [];
  while(res.length < count) {
    let r = getRandom(arr);
    if (!res.includes(r)) res.push(r);
  }
  return res;
}

// EASY: 40 questions
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Basic Total = L + R - 1
    let name = getRandom([...namesM, ...namesF]);
    let left = 10 + (i % 15);
    let right = 15 + (i % 20);
    let total = left + right - 1;
    qText = `In a row of students, ${name} is ${left}th from the left end and ${right}th from the right end. How many students are there in the row?`;
    next = total;
    wrongs = [total + 1, total - 1, left + right + 1];
    pat = "Total = Left + Right - 1";
    exp = `Step 1: Identify the formula for total number of elements: Total = (Position from left) + (Position from right) - 1. Step 2: Plug in the values: ${left} + ${right} - 1. Step 3: ${left + right} - 1 = ${total}. Final Answer: ${total}.`;
  } else if (type === 1) {
    // Find Right given Total and Left
    let name = getRandom([...namesM, ...namesF]);
    let total = 40 + (i % 20);
    let left = 10 + (i % 25);
    let right = total - left + 1;
    qText = `In a class of ${total} students, ${name}'s rank is ${left}th from the top. What is ${name}'s rank from the bottom?`;
    next = right;
    wrongs = [right - 1, right + 1, total - left];
    pat = "Right = Total - Left + 1";
    exp = `Step 1: Use the formula: Position from bottom = (Total students) - (Position from top) + 1. Step 2: Plug in the values: ${total} - ${left} + 1. Step 3: ${total - left} + 1 = ${right}. Final Answer: ${right}.`;
  } else if (type === 2) {
    // Simple Relative Ordering (Height/Score) A > B > C
    let n = getDistinct(namesM, 3);
    qText = `${n[0]} is taller than ${n[1]}. ${n[1]} is taller than ${n[2]}. Who is the shortest among them?`;
    next = n[2];
    wrongs = [n[0], n[1], "Cannot be determined"];
    pat = "Transitive inequality";
    exp = `Step 1: Write down the relationships as inequalities: ${n[0]} > ${n[1]}. Step 2: ${n[1]} > ${n[2]}. Step 3: Combine them: ${n[0]} > ${n[1]} > ${n[2]}. The person at the end of the chain is the shortest. Final Answer: ${n[2]}.`;
  } else {
    // Finding exactly in the middle
    let total = 31 + (i % 10) * 2; // Always odd so there's an exact middle
    let mid = (total + 1) / 2;
    qText = `In a row of ${total} boys facing North, what is the position of the boy standing exactly in the middle?`;
    next = `${mid}th`;
    wrongs = [`${mid - 1}th`, `${mid + 1}th`, `${Math.floor(total/2)}th`];
    pat = "Middle position = (Total + 1) / 2";
    exp = `Step 1: For an odd number of items, the exact middle position can be found using the formula: (Total + 1) / 2. Step 2: Plug in the total: (${total} + 1) / 2. Step 3: ${total + 1} / 2 = ${mid}. Final Answer: ${mid}th.`;
  }
  generatedQs.push(createQuestion("Easy", qText, next, wrongs, pat, exp));
}

// MEDIUM: 40 questions
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Swapping positions
    let n1 = getRandom(namesM);
    let n2 = getRandom(namesF);
    let l1 = 12 + (i % 10);
    let r1 = 18 + (i % 15);
    let l1_new = l1 + 6 + (i % 4); // After swap, n1's left position increases
    let total = l1_new + r1 - 1;
    qText = `In a row of students, ${n1} is ${l1}th from the left and ${n2} is ${r1}th from the right. When they interchange their positions, ${n1} becomes ${l1_new}th from the left. How many students are there in the row?`;
    next = total;
    wrongs = [total + 1, total - 1, l1 + r1 - 1];
    pat = "Swapping: Total = New Pos of Person 1 + Old Pos of Person 2 - 1";
    exp = `Step 1: When ${n1} and ${n2} swap, ${n1} occupies ${n2}'s old seat. Step 2: This seat is given as ${l1_new}th from the left (new pos of ${n1}) AND we already knew it was ${r1}th from the right (old pos of ${n2}). Step 3: Apply the total formula to this specific seat: Total = Left + Right - 1 = ${l1_new} + ${r1} - 1 = ${total}. Final Answer: ${total}.`;
  } else if (type === 1) {
    // Number of persons between two people
    let n1 = getRandom(namesM);
    let n2 = getRandom(namesF);
    let total = 50 + (i % 10);
    let left = 15 + (i % 5);
    let right = 20 + (i % 5);
    let between = total - (left + right); // Non-overlapping case
    qText = `In a row of ${total} girls, ${n1} is ${left}th from the left end and ${n2} is ${right}th from the right end. How many girls are there between ${n1} and ${n2}?`;
    next = between;
    wrongs = [between + 1, between - 1, between + 2];
    pat = "Non-overlapping between = Total - (Left + Right)";
    exp = `Step 1: Check for overlap. Sum of their positions = ${left} + ${right} = ${left+right}. Since ${left+right} < ${total}, there is no overlap (normal case). Step 2: The number of people between them is simply the total minus the sum of their positions. Step 3: ${total} - (${left} + ${right}) = ${between}. Final Answer: ${between}.`;
  } else if (type === 2) {
    // Overlapping case for persons between
    let n1 = getRandom(namesM);
    let n2 = getRandom(namesF);
    let total = 30 + (i % 5);
    let left = 20 + (i % 5);
    let right = 22 + (i % 5);
    let between = (left + right) - total - 2;
    qText = `In a row of ${total} boys, ${n1} is ${left}th from the left end and ${n2} is ${right}th from the right end. How many boys are there between ${n1} and ${n2}?`;
    next = between;
    wrongs = [between + 1, between - 1, (left + right) - total];
    pat = "Overlapping between = (Left + Right) - Total - 2";
    exp = `Step 1: Check for overlap. Sum of positions = ${left} + ${right} = ${left+right}. Since ${left+right} > ${total}, this is an overlapping case. Step 2: The formula for overlapping is: Between = (Sum of positions) - Total - 2 (we subtract 2 to remove ${n1} and ${n2} themselves). Step 3: ${left+right} - ${total} - 2 = ${between}. Final Answer: ${between}.`;
  } else {
    // Ordering puzzle (4 people)
    let p = getDistinct(namesF, 4);
    qText = `${p[0]} scores more than ${p[1]} but less than ${p[2]}. ${p[3]} scores less than ${p[1]}. Who scored the highest?`;
    next = p[2];
    wrongs = [p[0], p[1], p[3]];
    pat = "Linear inequality chain";
    exp = `Step 1: Break down the statements. "${p[0]} scores more than ${p[1]} but less than ${p[2]}" translates to: ${p[2]} > ${p[0]} > ${p[1]}. Step 2: "${p[3]} scores less than ${p[1]}" translates to: ${p[1]} > ${p[3]}. Step 3: Combine them: ${p[2]} > ${p[0]} > ${p[1]} > ${p[3]}. The highest scorer is ${p[2]}. Final Answer: ${p[2]}.`;
  }
  generatedQs.push(createQuestion("Medium", qText, next, wrongs, pat, exp));
}

// HARD: 20 questions
for (let i = 0; i < 20; i++) {
  let type = i % 2;
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Finding new position after swap
    let n1 = getRandom(namesM);
    let n2 = getRandom(namesF);
    let l1 = 15 + (i % 5);
    let r1 = 20 + (i % 5);
    let diff = 8 + (i % 4);
    let l1_new = l1 + diff;
    let r1_new = r1 + diff; // The other person moves by the exact same amount
    
    qText = `In a row of children, ${n1} is ${l1}th from the left and ${n2} is ${r1}th from the right. When they interchange their places, ${n1} becomes ${l1_new}th from the left. What will be ${n2}'s new position from the right?`;
    next = `${r1_new}th`;
    wrongs = [`${r1_new + 1}th`, `${r1_new - 1}th`, `${r1_new + diff}th`];
    pat = "Shift invariance during swap";
    exp = `Step 1: Analyze the shift for ${n1}. ${n1} moved from ${l1}th from the left to ${l1_new}th from the left. This is an increase of ${l1_new - l1} positions. Step 2: This means there are exactly ${l1_new - l1 - 1} people between them. Step 3: When they swap, ${n2} travels the exact same distance in the opposite direction. Therefore, ${n2}'s position from the right will also increase by ${diff}. Step 4: New position = ${r1} + ${diff} = ${r1_new}. Final Answer: ${r1_new}th.`;
  } else {
    // Complex Ordering Puzzle (5 people)
    let p = getDistinct([...namesM, ...namesF], 5);
    qText = `Among five friends ${p[0]}, ${p[1]}, ${p[2]}, ${p[3]}, and ${p[4]}, ${p[0]} is taller than only ${p[1]}. ${p[2]} is shorter than ${p[3]} but taller than ${p[4]}. Who is the third tallest among them?`;
    // p[0] is taller than ONLY p[1] -> p[1] is 5th, p[0] is 4th.
    // Remaining are p[2], p[3], p[4].
    // p[2] is shorter than p[3] (p[3] > p[2]) but taller than p[4] (p[2] > p[4])
    // So top 3 are p[3] > p[2] > p[4].
    // Full order: p[3] > p[2] > p[4] > p[0] > p[1].
    // Third tallest is p[4].
    next = p[4];
    wrongs = [p[2], p[0], p[3]];
    pat = "Keyword 'only' in inequality puzzles";
    exp = `Step 1: The key phrase "${p[0]} is taller than ONLY ${p[1]}" means ${p[1]} is the shortest (5th) and ${p[0]} is the second shortest (4th). Step 2: We are left with ${p[2]}, ${p[3]}, and ${p[4]} for the top 3 spots. Step 3: The problem states ${p[3]} > ${p[2]} and ${p[2]} > ${p[4]}. This gives the sequence ${p[3]} > ${p[2]} > ${p[4]}. Step 4: Combining everything: ${p[3]} > ${p[2]} > ${p[4]} > ${p[0]} > ${p[1]}. The third tallest is ${p[4]}. Final Answer: ${p[4]}.`;
  }
  generatedQs.push(createQuestion("Hard", qText, next, wrongs, pat, exp));
}

// Ensure unique IDs
generatedQs.forEach((q, idx) => {
  q.id = `RANKING_ORDERING_${String(idx + 1).padStart(3, '0')}`;
});

const dir = path.join(process.cwd(), 'public/data/logical-reasoning/logical-relations');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'ranking-ordering.json'), JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
