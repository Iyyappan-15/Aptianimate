const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ARI_CI_${num}`;
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
    topic: "Compound Interest",
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
    tags: ["compound interest", "CI", ...tags],
    source: "AI Generated"
  };
}

// Formula: A = P*(1 + R/100)^T, CI = A - P
function roundTo2(n) { return Math.round(n * 100) / 100; }

// ─── 1. Find CI / Amount (Annual compounding) (25 Qs: 10 Easy, 10 Medium, 5 Hard) ──
const ciAnnual = [
  [1000, 10, 2], [2000, 5, 2], [5000, 8, 2], [3000, 10, 3], [4000, 5, 3],
  [6000, 10, 2], [8000, 5, 2], [10000, 8, 3], [1500, 20, 2], [2500, 4, 3]
];
for (let i = 0; i < 10; i++) {
  const [P, R, T] = ciAnnual[i];
  const A = roundTo2(P * Math.pow(1 + R / 100, T));
  const CI = roundTo2(A - P);
  questions.push(createQuestion(
    "Finding CI", "Easy",
    `Find the Compound Interest on $${P} at ${R}% per annum for ${T} years, compounded annually.`,
    `$${CI}`, [`$${CI + 50}`, `$${CI - 30}`, `$${CI + 100}`], ["annual"]
  ));
}
const ciAnnual2 = [
  [12000, 10, 2], [15000, 8, 3], [20000, 5, 4], [25000, 10, 3], [30000, 4, 3],
  [50000, 10, 2], [8000, 15, 2], [6000, 25, 2], [9000, 10, 3], [4000, 10, 4]
];
for (let i = 0; i < 10; i++) {
  const [P, R, T] = ciAnnual2[i];
  const A = roundTo2(P * Math.pow(1 + R / 100, T));
  const CI = roundTo2(A - P);
  questions.push(createQuestion(
    "Finding Amount", "Medium",
    `What will $${P} amount to in ${T} years at ${R}% per annum compound interest?`,
    `$${A}`, [`$${A + 500}`, `$${A - 200}`, `$${A + 1000}`], ["amount"]
  ));
}
// Hard annual CI
questions.push(createQuestion("Finding CI", "Hard", "The compound interest on a sum for 2 years at 10% is $2100. Find the principal.", "$10000", ["$8000", "$12000", "$9000"], ["reverse principal"]));
questions.push(createQuestion("Finding CI", "Hard", "If the amount on compound interest after 2 years at 10% is $12100, find the principal.", "$10000", ["$11000", "$9000", "$10500"], ["reverse amount"]));
questions.push(createQuestion("Finding CI", "Hard", "Find the CI on $64000 at 12.5% per annum for 3 years, compounded annually.", "$27100", ["$25000", "$28000", "$24000"], ["3 years large principal"]));
questions.push(createQuestion("Finding CI", "Hard", "A certain sum of money at CI amounts to $21980 in 2 years and $24178 in 3 years. Find the rate of interest.", "10%", ["8%", "12%", "15%"], ["find rate from amounts"]));
questions.push(createQuestion("Finding CI", "Hard", "If CI on a sum for 2 years at 5% per annum is $328, find the sum.", "$3200", ["$3000", "$3500", "$2800"], ["reverse calculation"]));

// ─── 2. Half-Yearly and Quarterly Compounding (15 Qs: 5 Easy, 5 Medium, 5 Hard) ──
const halfYearly = [
  [10000, 10, 2], [8000, 20, 1], [5000, 8, 2], [20000, 10, 1], [16000, 20, 2]
];
for (let i = 0; i < 5; i++) {
  const [P, R, T] = halfYearly[i];
  // Half yearly: R/2, T*2
  const A = roundTo2(P * Math.pow(1 + R / 200, T * 2));
  const CI = roundTo2(A - P);
  questions.push(createQuestion(
    "Half-Yearly Compounding", "Easy",
    `Find the CI on $${P} at ${R}% per annum for ${T} year(s), compounded half-yearly.`,
    `$${CI}`, [`$${CI + 100}`, `$${CI - 50}`, `$${CI + 200}`], ["half-yearly"]
  ));
}
const quarterly = [
  [10000, 40, 1], [8000, 20, 1], [16000, 20, 1], [100000, 10, 1], [50000, 8, 1]
];
for (let i = 0; i < 5; i++) {
  const [P, R, T] = quarterly[i];
  const A = roundTo2(P * Math.pow(1 + R / 400, T * 4));
  const CI = roundTo2(A - P);
  questions.push(createQuestion(
    "Quarterly Compounding", "Medium",
    `Find the CI on $${P} at ${R}% per annum for 1 year, compounded quarterly.`,
    `$${CI}`, [`$${CI + 200}`, `$${CI - 100}`, `$${CI + 500}`], ["quarterly"]
  ));
}
// Hard compounding
questions.push(createQuestion("Half-Yearly Compounding", "Hard", "The difference between compound interest compounded half-yearly and annually on $10000 at 10% for 1 year is:", "$25", ["$50", "$20", "$30"], ["difference annual vs half-yearly"]));
questions.push(createQuestion("Half-Yearly Compounding", "Hard", "Find the CI on Rs. 1000 at 10% per annum for 1.5 years, compounded half-yearly.", "Rs. 157.625", ["Rs. 150", "Rs. 160", "Rs. 165"], ["fractional years"]));
questions.push(createQuestion("Quarterly Compounding", "Hard", "Rs. 10000 is invested at 10% per annum compounded quarterly. What is the amount after 6 months?", "Rs. 10506.25", ["Rs. 10500", "Rs. 10510", "Rs. 10250"], ["6 months quarterly"]));
questions.push(createQuestion("Half-Yearly Compounding", "Hard", "If principal $P amounts to $4410 in 2 years at 5% per annum compounded half-yearly, find P.", "$4000", ["$3800", "$4200", "$4500"], ["reverse half-yearly"]));
questions.push(createQuestion("Quarterly Compounding", "Hard", "What is the difference between SI and CI on $2000 at 10% per annum for 2 years compounded annually?", "$20", ["$40", "$10", "$25"], ["SI vs CI difference"]));

// ─── 3. CI vs SI Comparison (15 Qs: 5 Easy, 5 Medium, 5 Hard) ───────────
// Diff = P*(R/100)^2 for 2 years
const ciSiDiff = [
  [10000, 10], [5000, 4], [8000, 5], [20000, 5], [1000, 10]
];
for (let i = 0; i < 5; i++) {
  const [P, R] = ciSiDiff[i];
  const diff = roundTo2(P * Math.pow(R / 100, 2));
  const SI = (P * R * 2) / 100;
  const CI = roundTo2(P * (Math.pow(1 + R / 100, 2) - 1));
  questions.push(createQuestion(
    "CI vs SI Comparison", "Easy",
    `Find the difference between Compound Interest and Simple Interest on $${P} at ${R}% per annum for 2 years.`,
    `$${diff}`, [`$${diff + 10}`, `$${diff - 5}`, `$${diff + 20}`], ["difference", "2 years"]
  ));
}
const ciSiDiff2 = [
  [6000, 10], [4000, 5], [12000, 10], [15000, 4], [8000, 10]
];
for (let i = 0; i < 5; i++) {
  const [P, R] = ciSiDiff2[i];
  const diff2 = roundTo2(P * Math.pow(R/100, 2));
  const SI2 = (P * R * 2) / 100;
  const CI2 = roundTo2(P * (Math.pow(1 + R / 100, 2) - 1));
  questions.push(createQuestion(
    "CI vs SI Comparison", "Medium",
    `The SI on a sum at ${R}% for 2 years is $${SI2}. Find the CI for the same period.`,
    `$${CI2}`, [`$${CI2 + 50}`, `$${CI2 - 30}`, `$${CI2 + 100}`], ["SI given", "find CI"]
  ));
}
// 3-year CI vs SI diff = P*(R/100)^2 * (3 + R/100)
questions.push(createQuestion("CI vs SI Comparison", "Hard", "The difference between CI and SI on $1000 at 10% per annum for 3 years is:", "$31", ["$30", "$20", "$25"], ["3 year difference"]));
questions.push(createQuestion("CI vs SI Comparison", "Hard", "For 2 years at compound interest, if the SI is $800 and CI is $840, find the rate of interest.", "10%", ["8%", "12%", "5%"], ["find rate from difference"]));
questions.push(createQuestion("CI vs SI Comparison", "Hard", "The CI on a sum for 2 years at 5% is $51.25. Find the SI for the same sum and period.", "$50", ["$48", "$55", "$52"], ["find SI from CI"]));
questions.push(createQuestion("CI vs SI Comparison", "Hard", "If the difference between CI and SI on a certain sum for 3 years at 10% is $31, find the sum.", "$1000", ["$1100", "$900", "$1200"], ["find sum from difference"]));
questions.push(createQuestion("CI vs SI Comparison", "Hard", "The SI on a sum for 2 years is $240 and CI is $252. Find the rate of interest and the sum.", "Rate = 10%, Sum = $1200", ["Rate = 8%, Sum = $1500", "Rate = 12%, Sum = $1000", "Rate = 10%, Sum = $1000"], ["both R and P"]));

// ─── 4. Depreciation & Population Growth at CI (15 Qs: 5 Easy, 5 Medium, 5 Hard) ──
const depData = [
  [100000, 10, 2], [50000, 20, 2], [80000, 5, 3], [200000, 10, 3], [40000, 25, 2]
];
for (let i = 0; i < 5; i++) {
  const [P, R, T] = depData[i];
  const A = roundTo2(P * Math.pow(1 - R / 100, T));
  questions.push(createQuestion(
    "Depreciation", "Easy",
    `A machine costs $${P}. It depreciates at ${R}% per annum. Find its value after ${T} years.`,
    `$${A}`, [`$${A + 2000}`, `$${A - 1000}`, `$${A + 5000}`], ["depreciation"]
  ));
}
const popData = [
  [10000, 10, 2], [50000, 5, 3], [100000, 2, 3], [200000, 10, 2], [75000, 4, 2]
];
for (let i = 0; i < 5; i++) {
  const [P, R, T] = popData[i];
  const A = Math.round(P * Math.pow(1 + R / 100, T));
  questions.push(createQuestion(
    "Population Growth", "Medium",
    `The current population of a town is ${P}. If it grows at the compound rate of ${R}% per annum, what will be its population after ${T} years?`,
    `${A}`, [`${A + 500}`, `${A - 1000}`, `${A + 200}`], ["population", "growth"]
  ));
}
questions.push(createQuestion("Depreciation", "Hard", "A car worth $100000 depreciates by 20% in the first year and 10% in subsequent years. Find its value after 3 years.", "$57600", ["$60000", "$55000", "$64000"], ["successive depreciation"]));
questions.push(createQuestion("Population Growth", "Hard", "The population of a city was 125000 three years ago. It grew at 4% per annum. Find the current population.", "140608", ["140000", "145000", "138000"], ["reverse population"]));
questions.push(createQuestion("Depreciation", "Hard", "A laptop depreciates at 20% per year. After how many years will its value be less than half the original price?", "4 years", ["3 years", "5 years", "6 years"], ["when value halves"]));
questions.push(createQuestion("Population Growth", "Hard", "The population of a town grows at 5% per annum. If the population 2 years hence will be 44100, find the present population.", "40000", ["42000", "38000", "45000"], ["reverse compounding"]));
questions.push(createQuestion("Depreciation", "Hard", "A machine is depreciated by 10% at the end of each year. After 2 years its value is $8100. Find its original cost.", "$10000", ["$9000", "$11000", "$9500"], ["reverse depreciation"]));

// ─── 5. Installments (10 Qs: 5 Medium, 5 Hard) ───────────────────────────
questions.push(createQuestion("Installments", "Medium", "A sum of $8820 is to be paid back in 2 equal annual installments at 5% CI. Find each installment.", "$4410", ["$4200", "$4500", "$4800"], ["installments", "2 years"]));
questions.push(createQuestion("Installments", "Medium", "What is the present value of $4840 due in 2 years at 10% compound interest?", "$4000", ["$4200", "$3800", "$4400"], ["present value"]));
questions.push(createQuestion("Installments", "Medium", "A TV set is available for $12000 cash or $6000 down payment and $7200 after 1 year at 20% CI. Which is better?", "Cash payment is better", ["Installment is better", "Both are same", "Cannot be determined"], ["installment comparison"]));
questions.push(createQuestion("Installments", "Medium", "Find the present worth of $1331 due in 3 years at 10% per annum compound interest.", "$1000", ["$1100", "$1200", "$900"], ["present worth"]));
questions.push(createQuestion("Installments", "Medium", "Rs. 9261 is to be paid back in 3 equal annual installments at 5% CI. Find each installment.", "Rs. 3087", ["Rs. 3000", "Rs. 3200", "Rs. 3500"], ["3 year installments"]));
questions.push(createQuestion("Installments", "Hard", "A borrowed Rs. 16000 and agreed to repay it in 3 years in equal annual installments at 10% CI. What is each installment?", "Rs. 6430.48", ["Rs. 6000", "Rs. 6500", "Rs. 7000"], ["complex installment"]));
questions.push(createQuestion("Installments", "Hard", "A person borrows $13280 to be paid back in 2 years in 2 equal installments at 10% per annum CI. Find each installment.", "$7744", ["$7000", "$8000", "$6800"], ["installment hard"]));
questions.push(createQuestion("Installments", "Hard", "If the present value of an amount due 2 years hence at 5% CI is $9070.29, find the amount.", "$10000", ["$9500", "$9800", "$10500"], ["present value reverse"]));
questions.push(createQuestion("Installments", "Hard", "A sum of money doubles in 3 years at compound interest. In how many years will it become 8 times?", "9 years", ["6 years", "12 years", "8 years"], ["geometric growth"]));
questions.push(createQuestion("Installments", "Hard", "A sum amounts to $1331 in 3 years and $1464.10 in 4 years at compound interest. Find the rate of interest.", "10%", ["11%", "9%", "12%"], ["find rate from 2 amounts"]));

// Balance to 40/40/20
let easyCount = 0, medCount = 0, hardCount = 0;
questions.forEach(q => {
  if (q.difficulty === 'Easy') easyCount++;
  else if (q.difficulty === 'Medium') medCount++;
  else hardCount++;
});

const needed = 100 - questions.length;
for (let i = 0; i < needed; i++) {
  const P = (Math.floor(Math.random() * 9) + 1) * 1000;
  const R = [5, 10, 20, 8, 4][i % 5];
  const T = [2, 2, 1, 3, 2][i % 5];
  const A = roundTo2(P * Math.pow(1 + R / 100, T));
  const CI = roundTo2(A - P);
  questions.push(createQuestion(
    "Finding CI", "Easy",
    `Calculate the CI on $${P} at ${R}% per annum for ${T} years.`,
    `$${CI}`, [`$${CI + 50}`, `$${CI - 20}`, `$${CI + 100}`], ["basic CI"]
  ));
}

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

fs.writeFileSync('quantitative aptitude questions/compound_interest.json', JSON.stringify(questions, null, 2));
console.log('Successfully generated ' + questions.length + ' questions for Compound Interest.');
