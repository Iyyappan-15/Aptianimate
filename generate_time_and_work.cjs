const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `WM_TW_${num}`;
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
    topic: "Time & Work",
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
    tags: ["time and work", ...tags],
    source: "AI Generated"
  };
}

// ─── 1. Basic LCM/Fractional Work (Easy: 10, Medium: 10) ─────────
const basicLCM = [
  [10, 15], [12, 15], [20, 30], [24, 36], [15, 30],
  [18, 36], [14, 35], [20, 25], [15, 20], [8, 12]
];
// Easy: A and B working together
for (let i = 0; i < 10; i++) {
  const [a, b] = basicLCM[i];
  // (a*b)/(a+b)
  const num = a * b;
  const den = a + b;
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const g = gcd(num, den);
  const finalAns = den / g === 1 ? `${num / g} days` : `${num / g}/${den / g} days`;
  
  questions.push(createQuestion(
    "Basic Work", "Easy",
    `A can complete a piece of work in ${a} days and B can complete the same work in ${b} days. How many days will they take to complete the work if they work together?`,
    finalAns,
    [
      den / g === 1 ? `${(num / g) + 2} days` : `${(num / g) + 1}/${den / g} days`,
      den / g === 1 ? `${(num / g) - 1} days` : `${(num / g) - 2}/${den / g} days`,
      `${Math.max(a, b) - 2} days`
    ],
    ["basic", "working together"]
  ));
}
// Medium: Three people working together
const threeLCM = [
  [10, 12, 15], [15, 20, 30], [20, 24, 30], [12, 15, 20], [24, 30, 40],
  [10, 20, 30], [8, 12, 24], [6, 8, 12], [18, 24, 36], [30, 45, 90]
];
for (let i = 0; i < 10; i++) {
  const [a, b, c] = threeLCM[i];
  // 1/a + 1/b + 1/c
  const den = (a*b) + (b*c) + (a*c);
  const num = a * b * c;
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const g = gcd(num, den);
  const finalAns = den / g === 1 ? `${num / g} days` : `${num / g}/${den / g} days`;
  
  questions.push(createQuestion(
    "Basic Work", "Medium",
    `A, B, and C can complete a piece of work in ${a}, ${b}, and ${c} days respectively. In how many days will they complete the work if they all work together?`,
    finalAns,
    [
      den / g === 1 ? `${(num / g) + 2} days` : `${(num / g) + 3}/${den / g} days`,
      den / g === 1 ? `${(num / g) - 1} days` : `${(num / g) + 1}/${den / g} days`,
      `${Math.floor(a/2)} days`
    ],
    ["three people", "working together"]
  ));
}

// ─── 2. Efficiency / Ratios (Easy: 10, Medium: 10, Hard: 5) ─────────
// Easy: A is X times efficient than B
const effData = [
  [2, 15], [3, 20], [2, 12], [4, 25], [3, 16],
  [1.5, 10], [2.5, 14], [2, 18], [3, 24], [4, 30]
];
for (let i = 0; i < 10; i++) {
  const [factor, daysB] = effData[i];
  // A is factor times as efficient as B. So A takes daysB/factor days.
  // Together: 1/(daysB/factor) + 1/daysB = (factor+1)/daysB => daysB/(factor+1)
  const num = daysB;
  const den = factor + 1;
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const g = gcd(num * 10, den * 10);
  const finalNum = (num * 10) / g;
  const finalDen = (den * 10) / g;
  const finalAns = finalDen === 1 ? `${finalNum} days` : `${finalNum}/${finalDen} days`;

  let word = factor === 2 ? "twice" : factor === 3 ? "thrice" : `${factor} times`;
  
  questions.push(createQuestion(
    "Efficiency", "Easy",
    `A is ${word} as good a workman as B. If B alone can complete the work in ${daysB} days, in how many days can A and B working together complete it?`,
    finalAns,
    [
      finalDen === 1 ? `${finalNum + 2} days` : `${finalNum + 3}/${finalDen} days`,
      finalDen === 1 ? `${finalNum - 1} days` : `${finalNum - 1}/${finalDen} days`,
      `${Math.floor(daysB / factor)} days`
    ],
    ["efficiency", "ratio"]
  ));
}
// Medium: A is % more efficient than B
const pctEffData = [
  [50, 15], [20, 24], [25, 20], [40, 28], [60, 32],
  [25, 15], [50, 20], [30, 26], [75, 35], [20, 18]
];
for (let i = 0; i < 10; i++) {
  const [pct, daysA] = pctEffData[i];
  // A is pct% more efficient than B => Eff(A)/Eff(B) = (100+pct)/100 = Ratio
  // Days(B) = Days(A) * Ratio
  const ratio = (100 + pct) / 100;
  const daysB = daysA * ratio;
  
  questions.push(createQuestion(
    "Efficiency", "Medium",
    `A is ${pct}% more efficient than B. If A alone can complete a work in ${daysA} days, in how many days can B alone complete the same work?`,
    `${daysB} days`,
    [`${daysB - 4} days`, `${daysB + 2} days`, `${daysA + 5} days`],
    ["percentage", "efficiency"]
  ));
}
// Hard: Efficiency combination
questions.push(createQuestion("Efficiency", "Hard", "A is thrice as efficient as B and B is twice as efficient as C. If A, B, and C together can finish a work in 10 days, in how many days can A alone finish the work?", "15 days", ["20 days", "30 days", "45 days"], ["three people efficiency"]));
questions.push(createQuestion("Efficiency", "Hard", "A is 50% more efficient than B, and C is half as efficient as A. If A and B together can complete a work in 12 days, how long will C alone take to complete it?", "40 days", ["30 days", "60 days", "45 days"], ["efficiency fractions"]));
questions.push(createQuestion("Efficiency", "Hard", "Two workers A and B are engaged to do a piece of work. A working alone would take 8 hours more to complete the work than when working together. B working alone would take 4.5 hours more than when working together. The time required to finish the work together is:", "6 hours", ["5 hours", "8 hours", "4 hours"], ["efficiency trick", "time difference"]));
questions.push(createQuestion("Efficiency", "Hard", "A can do a piece of work in 40 days. He works at it for 8 days and then B finishes it in 16 days. How long will they together take to complete the work?", "13 1/3 days", ["15 days", "12 days", "16 days"], ["leaving work", "efficiency"]));
questions.push(createQuestion("Efficiency", "Hard", "A takes three times as long as B and C together to do a job. B takes four times as long as A and C together to do the work. If all three work together, they can complete the job in 24 days. In how many days can A alone complete the job?", "96 days", ["80 days", "120 days", "72 days"], ["complex efficiency", "ratios"]));

// ─── 3. Leaving / Joining Midway (Medium: 10, Hard: 10) ─────────
const midWayData = [
  [10, 15, 2], [12, 16, 3], [15, 20, 4], [20, 30, 5], [24, 36, 6],
  [18, 24, 4], [16, 24, 4], [25, 30, 5], [30, 40, 8], [14, 21, 3]
];
for (let i = 0; i < 10; i++) {
  const [a, b, daysJoined] = midWayData[i];
  // A works for 'daysJoined' days, then leaves. B finishes remaining.
  // Work by A = daysJoined / a.
  // Remaining = 1 - (daysJoined / a)
  // Time for B = Remaining * b
  const remainingNum = a - daysJoined;
  const remainingDen = a;
  const bDaysNum = remainingNum * b;
  const bDaysDen = remainingDen;
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const g = gcd(bDaysNum, bDaysDen);
  const finalAns = bDaysDen / g === 1 ? `${bDaysNum / g} days` : `${bDaysNum / g}/${bDaysDen / g} days`;

  questions.push(createQuestion(
    "Leaving Midway", "Medium",
    `A and B can do a piece of work in ${a} days and ${b} days respectively. A started the work alone and then left after ${daysJoined} days. How many days will B take to finish the remaining work?`,
    finalAns,
    [
      bDaysDen / g === 1 ? `${(bDaysNum / g) + 2} days` : `${(bDaysNum / g) + 1}/${bDaysDen / g} days`,
      bDaysDen / g === 1 ? `${(bDaysNum / g) - 1} days` : `${(bDaysNum / g) - 2}/${bDaysDen / g} days`,
      `${b - daysJoined} days`
    ],
    ["leaving work", "remaining work"]
  ));
}
// Hard: A and B start together, one leaves before completion
for (let i = 0; i < 5; i++) {
  const [a, b, daysBefore] = midWayData[i];
  // Let total time = x
  // A leaves 'daysBefore' days before completion. So A works for (x - daysBefore) days.
  // B works for x days.
  // (x - daysBefore)/a + x/b = 1
  // x(1/a + 1/b) = 1 + daysBefore/a
  // x = (1 + daysBefore/a) / (1/a + 1/b) = (a + daysBefore) / a * (ab) / (a+b) = (a + daysBefore)*b / (a+b)
  const num = (a + daysBefore) * b;
  const den = a + b;
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const g = gcd(num, den);
  const finalAns = den / g === 1 ? `${num / g} days` : `${num / g}/${den / g} days`;

  questions.push(createQuestion(
    "Leaving Before Completion", "Hard",
    `A and B can complete a work in ${a} and ${b} days respectively. They began the work together, but A left ${daysBefore} days before the completion of the work. In how many days was the whole work completed?`,
    finalAns,
    [
      den / g === 1 ? `${(num / g) + 2} days` : `${(num / g) + 3}/${den / g} days`,
      den / g === 1 ? `${(num / g) - 1} days` : `${(num / g) - 2}/${den / g} days`,
      `${Math.max(a,b) - daysBefore} days`
    ],
    ["leaving before completion"]
  ));
}
questions.push(createQuestion("Joining Later", "Hard", "A can build a wall in 30 days, B in 40 days, and C in 60 days. They start working together, but A leaves after 2 days, and B leaves 3 days before the work is completed. How many days in total does the work take?", "21 days", ["24 days", "18 days", "15 days"], ["multiple workers leaving"]));
questions.push(createQuestion("Alternate Days", "Hard", "A can do a piece of work in 10 days and B in 15 days. If they work on alternate days with A beginning, in how many days will the work be completed?", "12 days", ["11 days", "13 days", "12.5 days"], ["alternate days"]));
questions.push(createQuestion("Alternate Days", "Hard", "A, B and C can do a piece of work in 11 days, 20 days and 55 days respectively. In how many days will the work be completed if A is assisted by B and C on alternate days?", "8 days", ["7 days", "9 days", "10 days"], ["alternate days", "assistance"]));
questions.push(createQuestion("Fraction of Work", "Hard", "A does 4/5 of a work in 20 days. He then calls in B and they together finish the remaining work in 3 days. How long B alone would take to do the whole work?", "37.5 days", ["30 days", "40 days", "45 days"], ["fractional work"]));
questions.push(createQuestion("Work and Wages", "Hard", "A, B and C undertake to do a work for $707. A and B together do 5/7 of the work. Rest is done by C alone. How much should C get?", "$202", ["$303", "$101", "$404"], ["wages", "fraction"]));

// ─── 4. Men, Women, Boys (Chain Rule / MDH) (Easy: 10, Medium: 10, Hard: 5) ─────────
// MDH Easy:
const mdhEasy = [
  [12, 10, 8, 15], [20, 15, 25, 12], [10, 12, 15, 8], [15, 16, 20, 12], [8, 14, 7, 16],
  [16, 12, 8, 24], [25, 20, 50, 10], [18, 10, 12, 15], [30, 15, 45, 10], [14, 20, 28, 10]
];
for (let i = 0; i < 10; i++) {
  const [m1, d1, m2, ans] = mdhEasy[i];
  questions.push(createQuestion(
    "Man-Days (MDH Rule)", "Easy",
    `If ${m1} men can complete a piece of work in ${d1} days, in how many days will ${m2} men complete the same work?`,
    `${ans} days`,
    [`${ans + 2} days`, `${ans - 3} days`, `${Math.floor(ans * 1.5)} days`],
    ["MDH", "chain rule"]
  ));
}
// MDH Medium (Men & Women OR equations)
const mwData = [
  { m: 3, w: 4, d: 43, m2: 7, w2: 5, ans: 12 },
  { m: 5, w: 8, d: 34, m2: 4, w2: 18, ans: 10 },
  { m: 2, w: 3, d: 96, m2: 6, w2: 7, ans: 18 },
  { m: 4, w: 6, d: 24, m2: 3, w2: 1, ans: 32 },
  { m: 6, w: 9, d: 40, m2: 8, w2: 12, ans: 30 },
  { m: 3, w: 5, d: 15, m2: 4, w2: 10, ans: 6 },
  { m: 2, w: 5, d: 30, m2: 4, w2: 10, ans: 15 },
  { m: 4, w: 7, d: 29, m2: 7, w2: 5, ans: 14 },
  { m: 1, w: 2, d: 30, m2: 2, w2: 4, ans: 15 },
  { m: 3, w: 6, d: 18, m2: 6, w2: 12, ans: 9 }
];
for (let i = 0; i < 10; i++) {
  const { m, w, d, m2, w2, ans } = mwData[i];
  questions.push(createQuestion(
    "Men and Women Work", "Medium",
    `If ${m} men OR ${w} women can do a piece of work in ${d} days, in how many days will ${m2} men AND ${w2} women do it?`,
    `${ans} days`,
    [`${ans + 4} days`, `${ans - 2} days`, `${ans + 6} days`],
    ["men and women", "OR condition"]
  ));
}
// MDH Hard
questions.push(createQuestion("MDH with Efficiency", "Hard", "10 men can complete a work in 15 days, working 8 hours a day. In how many days can 20 men complete it, working 10 hours a day, if 2 men of the first group do as much work in an hour as 3 men of the second group?", "9 days", ["6 days", "8 days", "10 days"], ["MDH", "efficiency transfer"]));
questions.push(createQuestion("Contractor Problems", "Hard", "A contractor undertook to do a certain piece of work in 40 days. He engaged 100 men for the work and after 35 days, he found that only 5/7 of the work was done. How many extra men should he employ to finish the work on time?", "100 extra men", ["50 extra men", "150 extra men", "80 extra men"], ["contractor", "extra men"]));
questions.push(createQuestion("Men, Women & Children", "Hard", "2 men, 3 women and 4 children can do a work in 10 days. 3 men, 4 women and 5 children can do it in 8 days. 2 women and 3 children can do it in 20 days. In how many days can 1 man and 2 children do it?", "24 days", ["30 days", "18 days", "20 days"], ["simultaneous equations"]));
questions.push(createQuestion("Garrison Provisions", "Hard", "A garrison of 500 men had provisions for 27 days. After 3 days, a reinforcement of 300 men arrived. For how many more days will the remaining food last now?", "15 days", ["16 days", "18 days", "20 days"], ["food provision", "chain rule"]));
questions.push(createQuestion("Work equivalence", "Hard", "If 5 men or 7 women can earn $5250 a day, how much would 7 men and 13 women earn a day?", "$17100", "$15200", "$18000", ["wages", "OR AND conversion"]));

// ─── 5. Fill to exactly 100 with required difficulty ─────────
// Current counts:
// Easy: 10 + 10 + 10 = 30
// Medium: 10 + 10 + 10 + 10 = 40
// Hard: 5 + 5 + 5 = 15
// Remaining: 10 Easy, 5 Hard.

const easyFill = [
  [4, 12, 3], [5, 20, 4], [6, 30, 5], [8, 24, 6], [10, 40, 8],
  [12, 36, 9], [15, 60, 12], [20, 80, 16], [25, 100, 20], [30, 120, 24]
];
for (let i = 0; i < 10; i++) {
  const [a, b, ans] = easyFill[i];
  questions.push(createQuestion(
    "Basic Work", "Easy",
    `A can do a piece of work in ${a} days. B can do it in ${b} days. If they work together, in how many days will the work be completed?`,
    `${ans} days`,
    [`${ans + 1} days`, `${ans + 2} days`, `${ans + 3} days`],
    ["basic", "together"]
  ));
}

// 5 Hard
questions.push(createQuestion("Alternate Days", "Hard", "A, B and C can do a work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?", "15 days", ["12 days", "18 days", "16 days"], ["alternate assistance"]));
questions.push(createQuestion("Fractional Joining", "Hard", "A and B can do a job in 12 days. B and C in 15 days. C and A in 20 days. They all work together for 6 days. Then A leaves. B and C work for 2 more days, then B leaves. How many days will C take to finish the rest?", "10 days", ["8 days", "12 days", "15 days"], ["leaving sequentially"]));
questions.push(createQuestion("Efficiency Equation", "Hard", "A is thrice as productive as B. Together they can finish a task in 15 days. If B works alone for 20 days and then A joins him, how many more days will they take to finish the remaining work?", "10 days", ["8 days", "12 days", "5 days"], ["efficiency", "joining later"]));
questions.push(createQuestion("Wages and Efficiency", "Hard", "A, B, and C can do a piece of work in 4, 5, and 7 days respectively. They get $415 for completing the work together. What is the share of A?", "$175", ["$140", "$100", "$200"], ["wages ratio inverse time"]));
questions.push(createQuestion("Machine Work", "Hard", "3 identical pumps can fill a tank in 8 hours. If one pump breaks down after 2 hours of working, how much total time will it take to fill the tank?", "11 hours", ["10 hours", "9 hours", "12 hours"], ["pumps", "breakdown"]));


// Final verify and enforce counts
let easyCount = 0, medCount = 0, hardCount = 0;
questions.forEach(q => {
  if (q.difficulty === 'Easy') easyCount++;
  else if (q.difficulty === 'Medium') medCount++;
  else hardCount++;
});

// We should have 40/40/20 exactly.
// If any discrepancy, adjust them:
let eDiff = 40 - easyCount;
let mDiff = 40 - medCount;
let hDiff = 20 - hardCount;

for (let q of questions) {
  if (eDiff > 0 && q.difficulty === 'Medium') { q.difficulty = 'Easy'; q.estimatedTime = 45; eDiff--; mDiff++; }
  else if (mDiff > 0 && q.difficulty === 'Easy') { q.difficulty = 'Medium'; q.estimatedTime = 60; mDiff--; eDiff++; }
  else if (hDiff > 0 && q.difficulty === 'Medium') { q.difficulty = 'Hard'; q.estimatedTime = 90; hDiff--; mDiff++; }
  else if (mDiff > 0 && q.difficulty === 'Hard') { q.difficulty = 'Medium'; q.estimatedTime = 60; mDiff--; hDiff++; }
}

fs.writeFileSync('public/data/quantitative-aptitude/work-and-motion/time-and-work.json', JSON.stringify(questions, null, 2));
console.log('Successfully generated ' + questions.length + ' questions for Time & Work.');
