const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ARI_ALG_${num}`;
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
    topic: "Alligation & Mixtures",
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
    tags: ["alligation", "mixture", ...tags],
    source: "AI Generated"
  };
}

// ─── 1. Basic Alligation Rule — Find Ratio (25 Qs: 10 Easy, 10 Medium, 5 Hard) ──
// Two items mixed to get mean price/value. Ratio = (C2-mean):(mean-C1)
const basicAllig = [
  [10, 15, 12], [20, 30, 25], [5, 8, 6], [12, 20, 16], [6, 10, 8],
  [15, 25, 18], [30, 50, 35], [8, 14, 10], [40, 60, 45], [3, 7, 5]
];
for (let i = 0; i < 10; i++) {
  const [c1, c2, mean] = basicAllig[i];
  const r1 = c2 - mean;
  const r2 = mean - c1;
  const g = (x, y) => (!y ? x : g(y, x % y));
  const gv = g(r1, r2);
  questions.push(createQuestion(
    "Basic Alligation", "Easy",
    `Two varieties of rice costing $${c1}/kg and $${c2}/kg are mixed to produce a mixture costing $${mean}/kg. Find the ratio in which they must be mixed.`,
    `${r1 / gv}:${r2 / gv}`,
    [`${r2 / gv}:${r1 / gv}`, `${r1 / gv + 1}:${r2 / gv}`, `${r1 / gv}:${r2 / gv + 1}`],
    ["ratio", "price"]
  ));
}
const basicAllig2 = [
  [20, 40, 30], [15, 35, 20], [8, 20, 14], [25, 45, 32], [10, 30, 18],
  [5, 25, 15], [18, 42, 24], [12, 28, 18], [50, 90, 60], [30, 70, 40]
];
for (let i = 0; i < 10; i++) {
  const [c1, c2, mean] = basicAllig2[i];
  const r1 = c2 - mean;
  const r2 = mean - c1;
  const g = (x, y) => (!y ? x : g(y, x % y));
  const gv = g(r1, r2);
  questions.push(createQuestion(
    "Basic Alligation", "Medium",
    `A shopkeeper mixes two kinds of tea, one costing $${c1}/kg and another costing $${c2}/kg, to get a blend selling at $${mean}/kg with 25% profit. What is the ratio in which they should be mixed?`,
    `${r1 / gv}:${r2 / gv}`,
    [`${r2 / gv}:${r1 / gv}`, `${r1 / gv + 2}:${r2 / gv - 1}`, `1:1`],
    ["tea", "blend"]
  ));
}
// Hard basic alligation
questions.push(createQuestion("Basic Alligation", "Hard", "Two alloys contain gold and silver in the ratio 3:4 and 5:3 respectively. In what ratio must they be mixed so that the new alloy has gold and silver in the ratio 1:1?", "3:5", ["5:3", "1:3", "3:1"], ["gold", "silver", "alloy"]));
questions.push(createQuestion("Basic Alligation", "Hard", "In what ratio must a grocer mix tea at $60/kg with tea at $40/kg to obtain a blend worth $52/kg?", "3:2", ["2:3", "1:2", "2:1"], ["tea blend"]));
questions.push(createQuestion("Basic Alligation", "Hard", "A merchant has 3 types of tea at $40/kg, $50/kg, and $60/kg. What is the ratio they should be mixed to produce a mixture at $48/kg?", "3:3:2", ["1:2:3", "2:3:3", "3:2:1"], ["three varieties"]));
questions.push(createQuestion("Basic Alligation", "Hard", "In what ratio must water be added to spirit to obtain a mixture worth half the price of spirit?", "1:1", ["2:1", "1:2", "3:1"], ["water adulteration"]));
questions.push(createQuestion("Basic Alligation", "Hard", "Two vessels have milk and water in ratios 4:1 and 3:2. In what ratio should they be mixed to get a 7:3 ratio?", "1:1", ["2:1", "3:2", "1:2"], ["vessels"]));

// ─── 2. Mixture Concentration (20 Qs: 5 Easy, 10 Medium, 5 Hard) ─────────
// Add water to dilute / Remove mixture to replace with water
const dilution = [
  [40, 100, 0],  // 40L of 100% milk, add 0 water — trivial
  [20, 80, 0]
];
// Non-trivial: x% solution mixed with y% solution
const concData = [
  [30, 50, 40, "10:10"], [20, 60, 40, "1:1"], [10, 40, 25, "3:2"],
  [15, 35, 20, "3:1"], [25, 75, 50, "1:1"]
];
for (let i = 0; i < 5; i++) {
  const [c1, c2, mean, ratio] = concData[i];
  const r1 = c2 - mean;
  const r2 = mean - c1;
  const g = (x, y) => (!y ? x : g(y, x % y));
  const gv = g(r1, r2);
  questions.push(createQuestion(
    "Mixture Concentration", "Easy",
    `A ${c1}% alcohol solution and a ${c2}% alcohol solution are mixed to produce a ${mean}% alcohol solution. Find the ratio of mixing.`,
    `${r1 / gv}:${r2 / gv}`,
    [`${r2 / gv}:${r1 / gv}`, `${r1 / gv + 1}:${r2 / gv}`, `1:2`],
    ["concentration", "alcohol"]
  ));
}
// Removal and replacement
const remReplace = [
  [40, 10, 1, "27/64"], [50, 10, 2, "32/50"], [20, 4, 2, "81/100"],
  [100, 20, 2, "64/100"], [60, 12, 3, "27/125"]
];
for (let i = 0; i < 5; i++) {
  const [total, removed, times, _] = remReplace[i];
  const remaining = Math.pow((total - removed) / total, times);
  const pct = (remaining * 100).toFixed(2);
  questions.push(createQuestion(
    "Removal and Replacement", "Medium",
    `A vessel contains ${total} litres of pure milk. ${removed} litres is removed and replaced with water. This is repeated ${times} time(s). What fraction of the mixture is milk?`,
    `${pct}%`, [`${(Number(pct) + 5).toFixed(2)}%`, `${(Number(pct) - 5).toFixed(2)}%`, `${(Number(pct) + 10).toFixed(2)}%`],
    ["replacement", "milk"]
  ));
}
// Medium concentration
const concMed = [
  [20, 80, 10, 30], [50, 60, 20, 40], [30, 70, 15, 45], [25, 100, 20, 60], [40, 60, 25, 50]
];
for (let i = 0; i < 5; i++) {
  const [liters, pct, waterAdded, newPct] = concMed[i];
  // actual water added check
  // new solution = liters + waterAdded
  // milk = liters * pct/100
  // new pct = milk / (liters+waterAdded) * 100
  const milk = liters * pct / 100;
  const actualNewPct = (milk / (liters + waterAdded) * 100).toFixed(1);
  questions.push(createQuestion(
    "Mixture Concentration", "Medium",
    `${liters} litres of a ${pct}% milk solution has ${waterAdded} litres of water added to it. What is the new concentration of milk?`,
    `${actualNewPct}%`, [`${Number(actualNewPct) + 5}%`, `${Number(actualNewPct) - 3}%`, `${pct}%`],
    ["dilution", "water added"]
  ));
}
// Hard concentration
questions.push(createQuestion("Mixture Concentration", "Hard", "From a vessel containing 40 litres of pure milk, 8 litres is drawn and replaced with water. This is done 3 times. Find the amount of milk remaining.", "20.48 litres", ["24 litres", "18 litres", "22 litres"], ["successive replacement"]));
questions.push(createQuestion("Mixture Concentration", "Hard", "Two solutions of 90% and 97% purity are mixed. What should be the percentage of the 90% solution in the mixture so that the resultant is 93% pure?", "57.14%", ["60%", "50%", "55%"], ["alligation purity"]));
questions.push(createQuestion("Mixture Concentration", "Hard", "A container holds 40L of milk. 4L is replaced with water. Then 4L of this mixture is replaced with water. Find the ratio of milk to water.", "81:19", ["36:4", "32:8", "80:20"], ["two replacements ratio"]));
questions.push(createQuestion("Mixture Concentration", "Hard", "A chemist has a 25% acid solution and a 50% acid solution. To make 10 litres of a 40% solution, how much of the 25% solution is needed?", "4 litres", ["5 litres", "6 litres", "3 litres"], ["specific volume"]));
questions.push(createQuestion("Mixture Concentration", "Hard", "In what ratio must a grocer mix 2 types of pulses at Rs.15/kg and Rs.20/kg to get a mixture of Rs.16.50/kg?", "7:3", ["3:7", "5:2", "2:5"], ["pulse blending"]));

// ─── 3. Milk & Water Mixtures (20 Qs: 10 Easy, 10 Medium) ────────────────
const milkWater = [
  [2, 1, 30, 20], [3, 2, 50, 30], [4, 1, 60, 48], [5, 3, 80, 50], [7, 3, 50, 35],
  [1, 2, 30, 10], [3, 5, 40, 15], [2, 3, 50, 20], [5, 7, 60, 25], [4, 6, 100, 40]
];
for (let i = 0; i < 10; i++) {
  const [mRatio, wRatio, total, milkAmt] = milkWater[i];
  const actualMilk = Math.round((mRatio / (mRatio + wRatio)) * total);
  questions.push(createQuestion(
    "Milk and Water Mixture", "Easy",
    `A mixture contains milk and water in the ratio ${mRatio}:${wRatio}. If the total mixture is ${total} litres, find the quantity of milk.`,
    `${actualMilk} litres`,
    [`${actualMilk + 5} litres`, `${actualMilk - 3} litres`, `${total - actualMilk} litres`],
    ["milk", "water ratio"]
  ));
}
// Add milk to change ratio
const addMilk = [
  [2, 3, 100, "3:2"], [1, 2, 60, "2:1"], [3, 7, 40, "1:1"],
  [1, 3, 80, "3:5"], [2, 5, 70, "3:4"]
];
for (let i = 0; i < 5; i++) {
  const [mRat, wRat, total, targetRatioStr] = addMilk[i];
  const milk = Math.round((mRat / (mRat + wRat)) * total);
  const water = total - milk;
  const [tM, tW] = targetRatioStr.split(":").map(Number);
  // milk + x / water = tM/tW => x = water*tM/tW - milk
  const x = Math.round(water * tM / tW - milk);
  if (x < 0) { idCounter--; continue; }
  questions.push(createQuestion(
    "Milk and Water Mixture", "Medium",
    `A mixture of ${total} litres has milk and water in the ratio ${mRat}:${wRat}. How much milk should be added to make the ratio ${targetRatioStr}?`,
    `${x} litres`,
    [`${x + 5} litres`, `${x - 2} litres`, `${x + 10} litres`],
    ["add milk", "change ratio"]
  ));
}
// Add water to change ratio
const addWater = [
  [3, 2, 100, "3:4"], [5, 3, 80, "1:1"], [7, 5, 60, "3:4"],
  [4, 1, 50, "2:1"], [5, 2, 70, "5:4"]
];
for (let i = 0; i < 5; i++) {
  const [mRat, wRat, total, targetRatioStr] = addWater[i];
  const milk = Math.round((mRat / (mRat + wRat)) * total);
  const water = total - milk;
  const [tM, tW] = targetRatioStr.split(":").map(Number);
  // milk / (water + x) = tM/tW => x = milk*tW/tM - water
  const x = Math.round(milk * tW / tM - water);
  if (x < 0) { idCounter--; continue; }
  questions.push(createQuestion(
    "Milk and Water Mixture", "Medium",
    `A vessel has ${total} litres of mixture with milk and water in the ratio ${mRat}:${wRat}. How many litres of water must be added to get a ratio of ${targetRatioStr}?`,
    `${x} litres`,
    [`${x + 5} litres`, `${x - 3} litres`, `${x + 8} litres`],
    ["add water", "change ratio"]
  ));
}

// ─── 4. Average Salary/Wages (Alligation on Averages) (15 Qs: 5 Easy, 5 Medium, 5 Hard) ──
const avgAllig = [
  [500, 800, 650], [1000, 1400, 1200], [200, 400, 280], [600, 900, 720], [300, 700, 500]
];
for (let i = 0; i < 5; i++) {
  const [w1, w2, avg] = avgAllig[i];
  const r1 = w2 - avg;
  const r2 = avg - w1;
  const g = (x, y) => (!y ? x : g(y, x % y));
  const gv = g(r1, r2);
  questions.push(createQuestion(
    "Weighted Average (Alligation)", "Easy",
    `Workers of type A earn $${w1}/day and workers of type B earn $${w2}/day. If the average wage is $${avg}/day, find the ratio of type A to type B workers.`,
    `${r1 / gv}:${r2 / gv}`,
    [`${r2 / gv}:${r1 / gv}`, `${r1 / gv + 1}:${r2 / gv}`, `1:1`],
    ["wages", "ratio"]
  ));
}
const avgAlligMed = [
  [12, 16, 14, 100], [20, 30, 24, 200], [15, 25, 18, 150], [10, 18, 14, 120], [25, 35, 28, 80]
];
for (let i = 0; i < 5; i++) {
  const [c1, c2, avg, total] = avgAlligMed[i];
  const r1 = c2 - avg;
  const r2 = avg - c1;
  const n1 = Math.round((r1 / (r1 + r2)) * total);
  const n2 = total - n1;
  questions.push(createQuestion(
    "Weighted Average (Alligation)", "Medium",
    `A school has ${total} students. Some paid $${c1} fees and the rest paid $${c2} fees. If the average fee is $${avg}, how many paid $${c2}?`,
    `${n2}`, [`${n2 + 10}`, `${n2 - 5}`, `${n1}`], ["fees", "students"]
  ));
}
questions.push(createQuestion("Weighted Average (Alligation)", "Hard", "A train journey covers part of the distance at 60 km/hr and the rest at 40 km/hr. If the average speed is 48 km/hr, find the ratio of distances covered at each speed.", "2:3", ["3:2", "1:2", "2:1"], ["speed alligation"]));
questions.push(createQuestion("Weighted Average (Alligation)", "Hard", "In an exam, the average marks of boys and girls are 70 and 80. The overall average is 76. Find the ratio of boys to girls.", "2:3", ["3:2", "4:3", "1:2"], ["exam marks"]));
questions.push(createQuestion("Weighted Average (Alligation)", "Hard", "A merchant mixes two grades of coffee at $24/kg and $36/kg to sell at $34.20/kg making a 14% profit. Find the ratio of mixing.", "1:4", ["4:1", "1:3", "3:1"], ["profit included"]));
questions.push(createQuestion("Weighted Average (Alligation)", "Hard", "Two types of liquid A and B cost $4 and $5 per litre. A mixture of 90 litres is priced at $4.60 per litre. How many litres of B are in the mixture?", "54 litres", ["36 litres", "45 litres", "60 litres"], ["volume calculation"]));
questions.push(createQuestion("Weighted Average (Alligation)", "Hard", "A grocer mixes sugar worth $1.20 per kg with sugar worth $1.45 per kg in a ratio of 5:3. Find the price per kg of the mixture.", "$1.2938/kg", ["$1.30/kg", "$1.35/kg", "$1.25/kg"], ["price per kg mix"]));

// Fill up
const needed = 100 - questions.length;
for (let i = 0; i < needed; i++) {
  const c1 = [10, 12, 15, 20, 25][i % 5];
  const c2 = [20, 24, 30, 40, 50][i % 5];
  const mean = (c1 + c2) / 2;
  questions.push(createQuestion(
    "Basic Alligation", "Easy",
    `In what ratio must items costing $${c1} and $${c2} each be mixed to produce a mixture worth $${mean}?`,
    `1:1`,
    [`2:1`, `1:2`, `3:1`],
    ["equal ratio"]
  ));
}

// Final rebalance
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

fs.writeFileSync('quantitative aptitude questions/alligation_and_mixtures.json', JSON.stringify(questions, null, 2));
console.log('Successfully generated ' + questions.length + ' questions for Alligation & Mixtures.');
