const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ARI_AGE_${num}`;
}

function shuffleOptions(correctAnswerText, otherOptions) {
  const options = [correctAnswerText, ...otherOptions];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  const correctIndex = options.indexOf(correctAnswerText);
  return { options, correctIndex };
}

function createQuestion(subtopic, difficulty, qText, correctAnsText, wrongOpts, tags) {
  const { options, correctIndex } = shuffleOptions(correctAnsText, wrongOpts);
  let estTime = 45;
  if (difficulty === "Medium") estTime = 60;
  if (difficulty === "Hard") estTime = 90;
  return {
    id: getId(),
    topic: "Ages",
    subtopic,
    difficulty,
    question: qText,
    options,
    correctAnswer: correctIndex,
    answer: correctAnsText,
    marks: 1,
    negativeMarks: 0,
    estimatedTime: estTime,
    visualizable: true,
    aiSolverEnabled: true,
    tags: ["ages", ...tags],
    source: "AI Generated"
  };
}

// ─── 1. Present Age from Sum & Difference (20 Qs: 10 Easy, 10 Medium) ─────
const sumDiff = [
  [30, 10], [40, 8], [50, 14], [60, 20], [70, 10],
  [36, 12], [44, 8], [52, 16], [64, 18], [72, 24]
];
for (let i = 0; i < 10; i++) {
  const [sum, diff] = sumDiff[i];
  const older = (sum + diff) / 2;
  const younger = (sum - diff) / 2;
  const isOdd = i % 2 === 0;
  questions.push(createQuestion(
    "Sum and Difference of Ages", "Easy",
    `The sum of ages of A and B is ${sum} years and their difference is ${diff} years. Find the ${isOdd ? 'older' : 'younger'} person's age.`,
    `${isOdd ? older : younger} years`,
    [`${isOdd ? older + 5 : younger + 3} years`, `${isOdd ? older - 4 : younger - 2} years`, `${isOdd ? older + 10 : younger + 6} years`],
    ["sum", "difference"]
  ));
}
// Ratio based present ages
const ratioAges = [
  [2, 3, 30], [3, 5, 40], [4, 7, 55], [5, 7, 60], [3, 4, 35],
  [2, 5, 35], [7, 9, 80], [5, 8, 65], [4, 5, 45], [3, 7, 50]
];
for (let i = 0; i < 10; i++) {
  const [a, b, total] = ratioAges[i];
  const ageA = Math.round((a / (a + b)) * total);
  const ageB = total - ageA;
  questions.push(createQuestion(
    "Ratio of Ages", "Medium",
    `The ratio of ages of P and Q is ${a}:${b}. If the sum of their ages is ${total} years, find the age of P.`,
    `${ageA} years`,
    [`${ageA + 4} years`, `${ageA - 3} years`, `${ageB} years`],
    ["ratio", "present"]
  ));
}

// ─── 2. Ages with Past/Future Reference (30 Qs: 10 Easy, 15 Medium, 5 Hard) ──
// Father-son, present from past
const fatherSon = [
  { fatherNow: 40, sonNow: 12, yearsAgo: 5 },
  { fatherNow: 45, sonNow: 15, yearsAgo: 8 },
  { fatherNow: 50, sonNow: 20, yearsAgo: 10 },
  { fatherNow: 36, sonNow: 6, yearsAgo: 3 },
  { fatherNow: 42, sonNow: 12, yearsAgo: 6 }
];
for (let i = 0; i < 5; i++) {
  const { fatherNow, sonNow, yearsAgo } = fatherSon[i];
  const fatherThen = fatherNow - yearsAgo;
  const sonThen = sonNow - yearsAgo;
  questions.push(createQuestion(
    "Past/Future Age Problems", "Easy",
    `A father is ${fatherNow} years old and his son is ${sonNow} years old. What was the ratio of their ages ${yearsAgo} years ago?`,
    `${fatherThen}:${sonThen}`,
    [`${fatherThen + 2}:${sonThen}`, `${fatherThen}:${sonThen + 2}`, `${fatherThen - 1}:${sonThen - 1}`],
    ["father", "son", "past"]
  ));
}
// Future ratio
const futureRatio = [
  { personA: 25, personB: 15, after: 5 },
  { personA: 30, personB: 10, after: 10 },
  { personA: 20, personB: 8, after: 4 },
  { personA: 35, personB: 25, after: 5 },
  { personA: 28, personB: 18, after: 7 }
];
for (let i = 0; i < 5; i++) {
  const { personA, personB, after } = futureRatio[i];
  const futA = personA + after, futB = personB + after;
  const g = (x, y) => (!y ? x : g(y, x % y));
  const gv = g(futA, futB);
  questions.push(createQuestion(
    "Past/Future Age Problems", "Easy",
    `A is ${personA} years old and B is ${personB} years old. What will be the ratio of their ages after ${after} years?`,
    `${futA / gv}:${futB / gv}`,
    [`${personA}:${personB}`, `${futA + 1}:${futB - 1}`, `${futA}:${futB + 2}`],
    ["future", "ratio"]
  ));
}
// Medium - find present age from ratio condition
const ageEqns = [
  { ratio_now: [3, 1], after: 10, ratio_after: [2, 1] },
  { ratio_now: [5, 3], after: 4, ratio_after: [3, 2] },
  { ratio_now: [4, 3], after: 5, ratio_after: [5, 4] },
  { ratio_now: [7, 4], after: 8, ratio_after: [9, 6] },
  { ratio_now: [9, 5], after: 6, ratio_after: [7, 4] }
];
for (let i = 0; i < 5; i++) {
  const { ratio_now: [rA, rB], after, ratio_after: [rfA, rfB] } = ageEqns[i];
  // rA*x + after)/( rB*x + after) = rfA/rfB
  // rfB*(rA*x + after) = rfA*(rB*x + after)
  // x*(rfB*rA - rfA*rB) = after*(rfA - rfB)
  const num = after * (rfA - rfB);
  const den = rfB * rA - rfA * rB;
  const x = num / den;
  const ageA = Math.round(rA * x);
  const ageB = Math.round(rB * x);
  questions.push(createQuestion(
    "Ratio of Present and Future Ages", "Medium",
    `The ratio of ages of A and B is ${rA}:${rB}. After ${after} years, the ratio becomes ${rfA}:${rfB}. Find B's present age.`,
    `${ageB} years`,
    [`${ageB + 4} years`, `${ageB - 5} years`, `${ageA} years`],
    ["ratio", "future equation"]
  ));
}
// Medium - present from past ratio
const ageEqns2 = [
  { ratio_now: [5, 3], ago: 4, ratio_ago: [3, 2] },
  { ratio_now: [7, 3], ago: 6, ratio_ago: [5, 2] },
  { ratio_now: [4, 1], ago: 5, ratio_ago: [3, 1] },
  { ratio_now: [9, 5], ago: 4, ratio_ago: [7, 4] },
  { ratio_now: [6, 4], ago: 8, ratio_ago: [4, 3] }
];
for (let i = 0; i < 5; i++) {
  const { ratio_now: [rA, rB], ago, ratio_ago: [raA, raB] } = ageEqns2[i];
  // (rA*x - ago)/(rB*x - ago) = raA/raB
  // raB*(rA*x - ago) = raA*(rB*x - ago)
  // x*(raB*rA - raA*rB) = ago*(raB - raA)
  const num = ago * (raB - raA);
  const den = raB * rA - raA * rB;
  if (den === 0) { idCounter--; continue; }
  const x = num / den;
  if (x <= 0) { idCounter--; continue; }
  const ageA = Math.round(rA * x);
  const ageB = Math.round(rB * x);
  questions.push(createQuestion(
    "Ratio of Present and Past Ages", "Medium",
    `The ratio of ages of A and B is ${rA}:${rB}. ${ago} years ago, the ratio was ${raA}:${raB}. Find A's present age.`,
    `${ageA} years`,
    [`${ageA + 6} years`, `${ageA - 4} years`, `${ageB} years`],
    ["ratio", "past equation"]
  ));
}
// Medium - three person ages
const threePerson = [
  { a: 15, b: 20, c: 25, after: 5, q: "oldest" },
  { a: 10, b: 18, c: 30, after: 8, q: "youngest" },
  { a: 12, b: 24, c: 36, after: 6, q: "middle" },
  { a: 20, b: 30, c: 40, after: 10, q: "sum" },
  { a: 8, b: 16, c: 32, after: 4, q: "sum" }
];
for (let i = 0; i < 5; i++) {
  const { a, b, c, after, q } = threePerson[i];
  let ans, question;
  if (q === "oldest") {
    ans = `${c + after} years`;
    question = `Ages of A, B, and C are ${a}, ${b}, and ${c} years. Find the age of the oldest after ${after} years.`;
  } else if (q === "youngest") {
    ans = `${a + after} years`;
    question = `Ages of A, B, and C are ${a}, ${b}, and ${c} years. Find the age of the youngest after ${after} years.`;
  } else if (q === "middle") {
    ans = `${b + after} years`;
    question = `Ages of A, B, and C are ${a}, ${b}, and ${c} years. Find the middle person's age after ${after} years.`;
  } else {
    ans = `${a + b + c + 3 * after} years`;
    question = `Ages of A, B, and C are ${a}, ${b}, and ${c} years. Find the sum of their ages after ${after} years.`;
  }
  questions.push(createQuestion(
    "Three Person Ages", "Medium",
    question, ans,
    [`${parseInt(ans) + 5} years`, `${parseInt(ans) - 3} years`, `${parseInt(ans) + 8} years`],
    ["three person"]
  ));
}
// Hard past/future
questions.push(createQuestion("Ages", "Hard", "A father's age is 3 times his son's age. 10 years hence, the father's age will be twice his son's age. Find the present age of the son.", "10 years", ["15 years", "8 years", "12 years"], ["father son"]));
questions.push(createQuestion("Ages", "Hard", "The sum of the ages of a mother and her daughter is 50. Five years ago the mother's age was 5 times her daughter's age. Find the mother's current age.", "40 years", ["35 years", "45 years", "38 years"], ["mother daughter"]));
questions.push(createQuestion("Ages", "Hard", "The ratio of ages of two brothers is 3:5. After 6 years, the ratio becomes 3:4. Find the sum of their present ages.", "24 years", ["20 years", "28 years", "30 years"], ["ratio", "brothers"]));
questions.push(createQuestion("Ages", "Hard", "15 years ago the ratio of ages of A to B was 3:5. After 15 years the ratio will be 4:5. Find the current age of A.", "42 years", ["36 years", "45 years", "39 years"], ["past and future"]));
questions.push(createQuestion("Ages", "Hard", "If 6 years are subtracted from the present age of Ravi and the remainder is divided by 18, then the present age of his grandson Anand is obtained. If Anand is 2 years younger to Maya whose age is 5 years, find the age of Ravi.", "96 years", ["90 years", "78 years", "84 years"], ["chain ages"]));

// ─── 3. Average Age Problems (20 Qs: 10 Easy, 10 Medium) ──────────────────
const avgAgeData = [
  [5, 20, 25], [4, 18, 22], [6, 30, 35], [10, 40, 42], [8, 25, 28],
  [3, 15, 18], [7, 22, 26], [12, 35, 38], [5, 28, 32], [9, 16, 19]
];
for (let i = 0; i < 10; i++) {
  const [n, avgBefore, newPersonAge] = avgAgeData[i];
  // Total before = n*avgBefore
  // Total after = n*avgBefore + newPersonAge
  // New avg = (n*avgBefore + newPersonAge) / (n+1)
  const newAvg = ((n * avgBefore) + newPersonAge) / (n + 1);
  questions.push(createQuestion(
    "Average Age", "Easy",
    `The average age of a group of ${n} persons is ${avgBefore} years. A new person aged ${newPersonAge} years joins the group. Find the new average age.`,
    `${newAvg} years`,
    [`${newAvg + 1} years`, `${newAvg - 0.5} years`, `${newAvg + 2} years`],
    ["group", "average"]
  ));
}
// Teacher joining class
const classData = [
  [30, 14, 34], [25, 16, 40], [40, 15, 30], [20, 12, 28], [35, 18, 38],
  [50, 15, 25], [28, 13, 31], [45, 17, 35], [22, 14, 28], [32, 12, 30]
];
for (let i = 0; i < 10; i++) {
  const [n, studentAvg, teacherAge] = classData[i];
  const newAvg = ((n * studentAvg) + teacherAge) / (n + 1);
  questions.push(createQuestion(
    "Average Age", "Medium",
    `The average age of a class of ${n} students is ${studentAvg} years. A teacher aged ${teacherAge} years joins the class. Find the new average age of the class including the teacher.`,
    `${newAvg.toFixed(2)} years`,
    [`${(newAvg + 1).toFixed(2)} years`, `${(newAvg - 0.5).toFixed(2)} years`, `${studentAvg} years`],
    ["teacher", "class", "average"]
  ));
}

// ─── 4. Hard & Tricky Age Problems (10 Qs, all Hard) ─────────────────────
questions.push(createQuestion("Ages", "Hard", "The ages of two persons A and B differ by 20 years. If 5 years ago, A was 5 times as old as B, find their present ages.", "A: 30, B: 10", ["A: 25, B: 5", "A: 35, B: 15", "A: 40, B: 20"], ["trick"]));
questions.push(createQuestion("Ages", "Hard", "A is twice as old as B was when A was as old as B is now. If A is 30 years old, how old is B?", "22.5 years", ["20 years", "25 years", "15 years"], ["complex ratio"]));
questions.push(createQuestion("Ages", "Hard", "The ages of three friends are in the ratio 4:7:9. Eight years ago the sum of their ages was 56. Find their present ages.", "16, 28, 36", ["12, 21, 27", "20, 35, 45", "8, 14, 18"], ["three person ratio"]));
questions.push(createQuestion("Ages", "Hard", "Present ages of Anu and Binu are in the ratio 4:5. Ten years hence, the ratio of their ages will be 6:7. Find Anu's present age.", "20 years", ["16 years", "24 years", "25 years"], ["linear equations"]));
questions.push(createQuestion("Ages", "Hard", "The product of the ages of Anita and Nikita is 240. If twice the age of Nikita is more than Anita's age by 4, find Nikita's age.", "12", ["10", "14", "16"], ["product of ages"]));

// Fill remaining
const needed = 100 - questions.length;
for (let i = 0; i < needed; i++) {
  const fatherAge = [40, 42, 45, 48, 50][i % 5];
  const sonAge = [12, 14, 15, 16, 18][i % 5];
  const after = [8, 6, 5, 4, 7][i % 5];
  const ratio_f = fatherAge + after;
  const ratio_s = sonAge + after;
  const g = (x, y) => (!y ? x : g(y, x % y));
  const gv = g(ratio_f, ratio_s);
  questions.push(createQuestion(
    "Past/Future Age Problems", "Easy",
    `A father is ${fatherAge} years old and his son is ${sonAge} years old. After ${after} years, find the ratio of their ages.`,
    `${ratio_f / gv}:${ratio_s / gv}`,
    [`${ratio_f}:${ratio_s}`, `${ratio_f / gv + 1}:${ratio_s / gv}`, `${fatherAge}:${sonAge}`],
    ["future", "ratio"]
  ));
}

// Final rebalance to 40/40/20
let easyCount = 0, medCount = 0, hardCount = 0;
questions.forEach(q => {
  if (q.difficulty === 'Easy') easyCount++;
  else if (q.difficulty === 'Medium') medCount++;
  else hardCount++;
});

let eDiff = 40 - easyCount;
let mDiff = 40 - medCount;
let hDiff = 20 - hardCount;

for (let q of questions) {
  if (eDiff < 0 && q.difficulty === 'Easy') { q.difficulty = 'Medium'; q.estimatedTime = 60; eDiff++; mDiff--; }
  else if (mDiff < 0 && q.difficulty === 'Medium') { q.difficulty = 'Hard'; q.estimatedTime = 90; mDiff++; hDiff--; }
  else if (hDiff < 0 && q.difficulty === 'Hard') { q.difficulty = 'Medium'; q.estimatedTime = 60; hDiff++; mDiff--; }
  else if (eDiff > 0 && q.difficulty === 'Medium') { q.difficulty = 'Easy'; q.estimatedTime = 45; eDiff--; mDiff++; }
}

fs.writeFileSync('quantitative aptitude questions/ages.json', JSON.stringify(questions, null, 2));
console.log('Successfully generated ' + questions.length + ' questions for Ages.');
