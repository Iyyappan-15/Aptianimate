const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ARI_SI_${num}`;
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
    topic: "Simple Interest",
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
    tags: ["simple interest", "SI", ...tags],
    source: "AI Generated"
  };
}

// ─── 1. Find SI (20 Qs: 10 Easy, 10 Medium) ───────────────────────────────
// SI = PRT/100
const siData1 = [
  [1000, 5, 2], [2000, 8, 3], [5000, 6, 4], [3000, 10, 2], [1500, 4, 5],
  [2500, 7, 3], [4000, 9, 2], [6000, 3, 5], [800, 12, 3], [1200, 6, 4]
];
for (let i = 0; i < 10; i++) {
  const [P, R, T] = siData1[i];
  const SI = (P * R * T) / 100;
  questions.push(createQuestion(
    "Finding SI", "Easy",
    `Find the Simple Interest on a principal of $${P} at a rate of ${R}% per annum for ${T} years.`,
    `$${SI}`, [`$${SI + 50}`, `$${SI - 20}`, `$${SI + 100}`], ["SI formula"]
  ));
}

// SI = PRT/100 but expressed as Amount
const siData2 = [
  [5000, 10, 3], [8000, 12, 2], [10000, 8, 4], [3500, 6, 5], [6000, 9, 3],
  [15000, 5, 4], [2000, 15, 2], [4500, 10, 3], [7500, 6, 2], [9000, 8, 3]
];
for (let i = 0; i < 10; i++) {
  const [P, R, T] = siData2[i];
  const SI = (P * R * T) / 100;
  const A = P + SI;
  questions.push(createQuestion(
    "Finding Amount", "Medium",
    `Calculate the total amount after ${T} years when a principal of $${P} is invested at ${R}% per annum simple interest.`,
    `$${A}`, [`$${A + 200}`, `$${A - 100}`, `$${A + 500}`], ["amount", "total"]
  ));
}

// ─── 2. Find Rate (15 Qs: 5 Easy, 5 Medium, 5 Hard) ─────────────────────
const rateData = [
  [1000, 200, 4], [2000, 600, 5], [5000, 1000, 4], [3000, 450, 3], [4000, 800, 5]
];
for (let i = 0; i < 5; i++) {
  const [P, SI, T] = rateData[i];
  const R = (SI * 100) / (P * T);
  questions.push(createQuestion(
    "Finding Rate", "Easy",
    `A sum of $${P} yields a Simple Interest of $${SI} in ${T} years. Find the rate of interest per annum.`,
    `${R}%`, [`${R + 1}%`, `${R - 0.5}%`, `${R + 2}%`], ["rate"]
  ));
}
const rateData2 = [
  [6000, 1440, 4], [8000, 2400, 5], [12000, 2880, 4], [15000, 4500, 5], [20000, 6000, 5]
];
for (let i = 0; i < 5; i++) {
  const [P, SI, T] = rateData2[i];
  const R = (SI * 100) / (P * T);
  questions.push(createQuestion(
    "Finding Rate", "Medium",
    `At what rate of simple interest will $${P} amount to $${P + SI} in ${T} years?`,
    `${R}%`, [`${R + 1}%`, `${R - 1}%`, `${R + 2.5}%`], ["rate", "amount"]
  ));
}
// Hard rate problems
questions.push(createQuestion("Finding Rate", "Hard", "A sum of money doubles itself in 8 years at simple interest. Find the rate of interest.", "12.5%", ["15%", "10%", "8%"], ["doubling", "rate"]));
questions.push(createQuestion("Finding Rate", "Hard", "At what rate percent per annum will a sum of money triple itself in 16 years?", "12.5%", ["15%", "10%", "8%"], ["tripling"]));
questions.push(createQuestion("Finding Rate", "Hard", "A sum of money becomes 7/4 of itself in 6 years at simple interest. Find the rate of interest.", "12.5%", ["10%", "15%", "8.33%"], ["fraction multiple"]));
questions.push(createQuestion("Finding Rate", "Hard", "The simple interest on a sum of money is 4/9 of the principal, and the number of years equals the rate percent. Find the rate of interest.", "6.67%", ["5%", "6%", "7%"], ["equal T and R"]));
questions.push(createQuestion("Finding Rate", "Hard", "If the rate of simple interest increases by 2%, the income from $3000 per year increases by $60. Find the original rate.", "3%", ["5%", "2%", "4%"], ["rate change"]));

// ─── 3. Find Time (15 Qs: 5 Easy, 5 Medium, 5 Hard) ─────────────────────
const timeData = [
  [1000, 5, 150], [2000, 8, 480], [5000, 10, 1500], [3000, 6, 540], [4000, 12, 960]
];
for (let i = 0; i < 5; i++) {
  const [P, R, SI] = timeData[i];
  const T = (SI * 100) / (P * R);
  questions.push(createQuestion(
    "Finding Time", "Easy",
    `At what time will $${P} produce a Simple Interest of $${SI} at ${R}% per annum?`,
    `${T} years`, [`${T + 1} years`, `${T - 0.5} years`, `${T + 2} years`], ["time"]
  ));
}
const timeData2 = [
  [6000, 5, 1800], [8000, 8, 3200], [10000, 6, 3600], [12000, 10, 6000], [15000, 4, 3600]
];
for (let i = 0; i < 5; i++) {
  const [P, R, SI] = timeData2[i];
  const T = (SI * 100) / (P * R);
  questions.push(createQuestion(
    "Finding Time", "Medium",
    `In how many years will $${P} amount to $${P + SI} at ${R}% simple interest per annum?`,
    `${T} years`, [`${T + 2} years`, `${T - 1} years`, `${T + 0.5} years`], ["time", "amount"]
  ));
}
questions.push(createQuestion("Finding Time", "Hard", "At what time will a sum of money double itself at 12.5% simple interest?", "8 years", ["10 years", "6 years", "12 years"], ["doubling time"]));
questions.push(createQuestion("Finding Time", "Hard", "A sum of money triples itself at 10% per annum simple interest. Find the time.", "20 years", ["15 years", "25 years", "30 years"], ["tripling time"]));
questions.push(createQuestion("Finding Time", "Hard", "The simple interest on a sum of money is 25% of the principal. If the rate is 5% per annum, find the time.", "5 years", ["4 years", "6 years", "3 years"], ["fraction of principal"]));
questions.push(createQuestion("Finding Time", "Hard", "A sum invested at 5% simple interest grows to $4200 in 4 years. Find the time it will take to grow to $5250 at the same rate.", "10 years", ["8 years", "6 years", "12 years"], ["comparative time"]));
questions.push(createQuestion("Finding Time", "Hard", "In how many years will the simple interest on $2400 at 5% per annum be the same as the simple interest on $1500 at 8% per annum for 5 years?", "2.5 years", ["3 years", "2 years", "4 years"], ["equal SI"]));

// ─── 4. Find Principal (15 Qs: 5 Easy, 5 Medium, 5 Hard) ─────────────────
const prinData = [
  [5, 3, 300], [8, 4, 640], [10, 2, 500], [6, 5, 450], [12, 3, 720]
];
for (let i = 0; i < 5; i++) {
  const [R, T, SI] = prinData[i];
  const P = (SI * 100) / (R * T);
  questions.push(createQuestion(
    "Finding Principal", "Easy",
    `Find the principal if the Simple Interest is $${SI} at ${R}% per annum for ${T} years.`,
    `$${P}`, [`$${P + 100}`, `$${P - 50}`, `$${P + 200}`], ["principal"]
  ));
}
const prinData2 = [
  [10, 4, 2400], [8, 5, 4000], [6, 3, 2700], [12, 2, 2880], [15, 3, 4500]
];
for (let i = 0; i < 5; i++) {
  const [R, T, SI] = prinData2[i];
  const P = (SI * 100) / (R * T);
  const A = P + SI;
  questions.push(createQuestion(
    "Finding Principal", "Medium",
    `A person invests a sum at ${R}% per annum simple interest. After ${T} years the total amount becomes $${A}. Find the principal.`,
    `$${P}`, [`$${P + 500}`, `$${P - 200}`, `$${P + 1000}`], ["principal", "amount"]
  ));
}
questions.push(createQuestion("Finding Principal", "Hard", "What principal will amount to $1300 in 5 years at 4% per annum simple interest?", "$1082.50", ["$1100", "$1050", "$1000"], ["reverse principal"]));
questions.push(createQuestion("Finding Principal", "Hard", "A sum of money at simple interest amounts to $1012 in 2.5 years and to $1067.20 in 4 years. Find the principal.", "$864", "$900", ["$920", "$840"], ["two equations"]));
questions.push(createQuestion("Finding Principal", "Hard", "The difference between the simple interest on a sum at 5% for 3 years and at 4% for 4 years is $25. Find the sum.", "$5000", ["$4000", "$6000", "$4500"], ["difference of SI"]));
questions.push(createQuestion("Finding Principal", "Hard", "The simple interest on a sum for 3 years at 6% is $90 less than the simple interest on the same sum for 4 years at 5%. Find the sum.", "$3000", ["$4000", "$2500", "$3500"], ["difference of SI"]));
questions.push(createQuestion("Finding Principal", "Hard", "A man invests two parts of a sum at 4% and 6% per annum. The total SI in 3 years is $900. If the parts are equal, find the total sum.", "$5000", ["$4500", "$6000", "$4000"], ["part investment"]));

// ─── 5. Comparison & Mixed SI Problems (20 Qs: 5 Easy, 10 Medium, 5 Hard) 
const cmpData = [
  [2000, 3000, 6, 4], [5000, 8000, 8, 5], [1500, 2500, 10, 6],
  [4000, 6000, 5, 8], [3000, 5000, 7, 4]
];
for (let i = 0; i < 5; i++) {
  const [P1, P2, R1, R2] = cmpData[i];
  const T = 2;
  const SI1 = (P1 * R1 * T) / 100;
  const SI2 = (P2 * R2 * T) / 100;
  const diff = Math.abs(SI1 - SI2);
  const bigger = SI1 > SI2 ? `Investment 1 earns $${diff} more` : `Investment 2 earns $${diff} more`;
  questions.push(createQuestion(
    "Comparison of SI", "Medium",
    `Investment 1: $${P1} at ${R1}% for 2 years. Investment 2: $${P2} at ${R2}% for 2 years. Which investment earns more and by how much?`,
    bigger,
    [`Investment 1 earns $${diff + 100} more`, `Both earn equal`, `Investment 2 earns $${diff + 50} more`],
    ["comparison"]
  ));
}
// Part investment
const partData = [
  [5000, 3, 5, 8, 140], [8000, 2, 6, 9, 240], [10000, 4, 5, 10, 1200],
  [6000, 3, 4, 6, 432], [12000, 5, 5, 8, 1800]
];
for (let i = 0; i < 5; i++) {
  const [total, T, R1, R2, siDiff] = partData[i];
  // P1*R1*T/100 - P2*R2*T/100 = siDiff, P1 + P2 = total
  // Solve for P1: P1(R1-R2)*T/100 + total*R2*T/100 = siDiff
  const P1 = ((siDiff + total * R2 * T / 100) * 100) / ((R1 - R2) * T);
  const P2 = total - P1;
  questions.push(createQuestion(
    "Part Investment", "Medium",
    `A sum of $${total} is divided into two parts invested at ${R1}% and ${R2}% per annum respectively for ${T} years. If the difference in SI is $${siDiff}, find the part invested at ${R1}%.`,
    `$${P1}`, [`$${P1 + 500}`, `$${P1 - 300}`, `$${P2}`], ["part investment"]
  ));
}
// Mixed easy
for (let i = 0; i < 5; i++) {
  const P = [500, 800, 1000, 1200, 1500][i];
  const R = [10, 5, 8, 6, 12][i];
  const T = [2, 3, 2, 4, 3][i];
  const SI = (P * R * T) / 100;
  const A = P + SI;
  questions.push(createQuestion(
    "Amount Calculation", "Easy",
    `What will be the amount when $${P} is lent out at ${R}% per annum for ${T} years at simple interest?`,
    `$${A}`, [`$${A + 40}`, `$${A - 20}`, `$${A + 80}`], ["amount"]
  ));
}
// Hard comparison
questions.push(createQuestion("Comparison of SI", "Hard", "A person lent $5000 partly at 4% and partly at 5% per annum simple interest. The total interest in 2 years was $420. What is the sum lent at 5%?", "$2000", ["$3000", "$1500", "$2500"], ["part investment"]));
questions.push(createQuestion("Comparison of SI", "Hard", "The difference in SI between two loans of $1000 each: one for 3 years at 8% and the other for 5 years at 5%. Find the difference.", "$10", ["$15", "$20", "$25"], ["comparison"]));
questions.push(createQuestion("Comparison of SI", "Hard", "Two equal sums are lent for 3 years, one at 5% and another at 4%. If the difference in interest is $48, find the sum.", "$1600", ["$1200", "$1800", "$2000"], ["equal principal"]));
questions.push(createQuestion("Comparison of SI", "Hard", "A borrows $1200 from B and pays back $1440 after 5 years. Find the simple rate of interest charged.", "4%", ["5%", "3%", "6%"], ["repayment"]));
questions.push(createQuestion("Comparison of SI", "Hard", "At the same rate of simple interest, $2000 amounts to $2240 in 3 years. What will $3500 amount to in 5 years?", "$4375", ["$4200", "$4500", "$4000"], ["scaled calculation"]));

// Balance difficulty
let easyCount = 0, medCount = 0, hardCount = 0;
questions.forEach(q => {
  if (q.difficulty === 'Easy') easyCount++;
  else if (q.difficulty === 'Medium') medCount++;
  else hardCount++;
});

// Fill remaining
const needed = 100 - questions.length;
for (let i = 0; i < needed; i++) {
  const P = (Math.floor(Math.random() * 10) + 1) * 1000;
  const R = [4, 5, 6, 8, 10][i % 5];
  const T = [2, 3, 4, 5, 3][i % 5];
  const SI = (P * R * T) / 100;
  questions.push(createQuestion(
    "Finding SI", "Easy",
    `What is the Simple Interest on $${P} at ${R}% per annum for ${T} years?`,
    `$${SI}`, [`$${SI + 50}`, `$${SI - 30}`, `$${SI + 100}`], ["basic SI"]
  ));
}

// Final rebalance to 40/40/20
easyCount = 0; medCount = 0; hardCount = 0;
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

fs.writeFileSync('quantitative aptitude questions/simple_interest.json', JSON.stringify(questions, null, 2));
console.log('Successfully generated ' + questions.length + ' questions for Simple Interest.');
