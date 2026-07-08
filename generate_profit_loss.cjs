const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ARI_PNL_${num}`;
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
    topic: "Profit & Loss",
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
    tags: ["profit", "loss", ...tags],
    source: "AI Generated"
  };
}

// ─── 1. Basic Profit % and Loss % (20 Qs: 12 Easy, 8 Medium) ─────────────
const cpArr1 = [100, 200, 150, 250, 300, 400, 500, 600, 800, 1000, 120, 480];
const spArr1 = [120, 240, 180, 300, 360, 480, 600, 660, 900, 1100, 96, 360];
for (let i = 0; i < 12; i++) {
  const cp = cpArr1[i], sp = spArr1[i];
  const isProfit = sp > cp;
  const pct = ((Math.abs(sp - cp) / cp) * 100).toFixed(0);
  const ans = isProfit ? `${pct}% profit` : `${pct}% loss`;
  const w1 = isProfit ? `${pct}% loss` : `${pct}% profit`;
  const w2 = isProfit ? `${Number(pct)+5}% profit` : `${Number(pct)+5}% loss`;
  const w3 = `${Number(pct)-2}% loss`;
  questions.push(createQuestion(
    "Basic Profit & Loss", "Easy",
    `An article is bought for $${cp} and sold for $${sp}. Find the profit or loss percentage.`,
    ans, [w1, w2, w3], ["basic"]
  ));
}
// SP from CP+Profit%
const cpArr2 = [500, 800, 1200, 1500, 2000, 750, 960, 1100];
const pctArr2 = [20, 25, 15, 30, 10, 40, 12.5, 20];
for (let i = 0; i < 8; i++) {
  const cp = cpArr2[i], pct = pctArr2[i];
  const sp = cp * (1 + pct / 100);
  questions.push(createQuestion(
    "Basic Profit & Loss", "Medium",
    `A trader buys an article for $${cp} and sells it at a profit of ${pct}%. What is the selling price?`,
    `$${sp}`, [`$${sp + 50}`, `$${sp - 30}`, `$${sp + 100}`], ["SP calculation"]
  ));
}

// ─── 2. Selling Price Calculation (10 Qs: 5 Easy, 5 Medium) ──────────────
const cpArr3 = [400, 600, 750, 900, 1200];
const lossArr = [10, 15, 20, 12.5, 8];
for (let i = 0; i < 5; i++) {
  const cp = cpArr3[i], pct = lossArr[i];
  const sp = cp * (1 - pct / 100);
  questions.push(createQuestion(
    "Selling Price", "Easy",
    `An item costing $${cp} is sold at a loss of ${pct}%. Find the selling price.`,
    `$${sp}`, [`$${sp + 40}`, `$${sp - 20}`, `$${sp + 60}`], ["loss SP"]
  ));
}
// CP from SP+Profit%
const spArr2 = [660, 840, 1380, 780, 1440];
const pctArr3 = [10, 5, 15, 30, 20];
for (let i = 0; i < 5; i++) {
  const sp = spArr2[i], pct = pctArr3[i];
  const cp = (sp * 100) / (100 + pct);
  questions.push(createQuestion(
    "Cost Price", "Medium",
    `An article is sold for $${sp} at a profit of ${pct}%. Find the cost price.`,
    `$${cp}`, [`$${cp + 50}`, `$${cp - 30}`, `$${cp + 80}`], ["CP calculation"]
  ));
}

// ─── 3. Discount (15 Qs: 5 Easy, 5 Medium, 5 Hard) ───────────────────────
const mpArr = [500, 800, 1200, 1500, 2000];
const discArr = [10, 20, 15, 25, 30];
for (let i = 0; i < 5; i++) {
  const mp = mpArr[i], disc = discArr[i];
  const sp = mp * (1 - disc / 100);
  questions.push(createQuestion(
    "Discount", "Easy",
    `The marked price of an item is $${mp}. A discount of ${disc}% is offered. Find the selling price.`,
    `$${sp}`, [`$${sp + 50}`, `$${sp - 30}`, `$${sp + 100}`], ["marked price"]
  ));
}
const mpArr2 = [1000, 1500, 2400, 3600, 5000];
const cpArr4 = [700, 900, 1500, 2000, 3500];
const discArr2 = [20, 25, 30, 40, 20];
for (let i = 0; i < 5; i++) {
  const mp = mpArr2[i], cp = cpArr4[i], disc = discArr2[i];
  const sp = mp * (1 - disc / 100);
  const profitPct = ((sp - cp) / cp * 100).toFixed(2);
  questions.push(createQuestion(
    "Discount", "Medium",
    `An article has a marked price of $${mp} and cost price of $${cp}. If it is sold at a ${disc}% discount, find the profit or loss percentage.`,
    `${profitPct}% profit`, [`${(Number(profitPct)+5).toFixed(2)}% profit`, `${(Number(profitPct)-3).toFixed(2)}% profit`, `${(Number(profitPct)+2).toFixed(2)}% loss`], ["discount", "profit"]
  ));
}
// Hard discount combos
questions.push(createQuestion("Discount", "Hard", "A shopkeeper marks his goods 40% above the cost price and gives a 25% discount. Find the profit or loss percentage.", "5% profit", ["10% profit", "5% loss", "15% profit"], ["successive discount"]));
questions.push(createQuestion("Discount", "Hard", "Two successive discounts of 20% and 10% are equivalent to a single discount of:", "28%", ["30%", "25%", "32%"], ["equivalent discount"]));
questions.push(createQuestion("Discount", "Hard", "A dealer marks goods 25% above cost price and allows a 10% discount. What discount % should be allowed to gain 12.5%?", "10%", ["12.5%", "8%", "15%"], ["reverse discount"]));
questions.push(createQuestion("Discount", "Hard", "A trader marks an article at $1200. He gives two successive discounts of 15% and 10%. Find the final selling price.", "$918", "$900", ["$930", "$950"], ["successive"]));
questions.push(createQuestion("Discount", "Hard", "A shopkeeper marks goods 50% above cost price. If he gives a discount of 20% and still makes a profit of $60, find the cost price.", "$500", ["$400", "$600", "$450"], ["reverse CP"]));

// ─── 4. Profit/Loss on Multiple Items (15 Qs: 5 Easy, 5 Medium, 5 Hard) ──
// Two articles at same SP, one profit one loss
const sameSP = [240, 360, 480, 600, 720];
const samePct = [20, 20, 20, 20, 20];
for (let i = 0; i < 5; i++) {
  const sp = sameSP[i];
  const pct = samePct[i];
  // CP1 = 100*sp/(100+pct), CP2 = 100*sp/(100-pct)
  const cp1 = (100 * sp) / (100 + pct);
  const cp2 = (100 * sp) / (100 - pct);
  const totalCost = cp1 + cp2;
  const totalSP = 2 * sp;
  const lossPct = ((totalCost - totalSP) / totalCost * 100).toFixed(2);
  questions.push(createQuestion(
    "Multiple Items", "Medium",
    `Two articles are sold at $${sp} each. One is sold at a ${pct}% profit and the other at a ${pct}% loss. Find the overall profit or loss percentage.`,
    `${lossPct}% loss`, [`${lossPct}% profit`, `No profit no loss`, `${(Number(lossPct)+2).toFixed(2)}% loss`], ["two articles", "trick"]
  ));
}
// Simple buying and selling
const buySell = [[10, 100, 90], [15, 120, 100], [20, 80, 100], [5, 200, 220], [8, 150, 130]];
for (let i = 0; i < 5; i++) {
  const [n, buy, sell] = buySell[i];
  const profit = n * sell - n * buy;
  const loss = n * buy - n * sell;
  const isProfit = sell > buy;
  const ans = isProfit ? `$${profit} profit` : `$${loss} loss`;
  const w1 = isProfit ? `$${profit} loss` : `$${loss} profit`;
  questions.push(createQuestion(
    "Multiple Items", "Easy",
    `A trader buys ${n} items at $${buy} each and sells them at $${sell} each. Find the total profit or loss.`,
    ans, [w1, `$${Math.abs(profit || loss) + 50} profit`, `$${Math.abs(profit || loss) - 20} loss`], ["total", "multiple"]
  ));
}
// Hard multi-item
questions.push(createQuestion("Multiple Items", "Hard", "By selling 45 lemons for $40, a person loses 20%. How many lemons should he sell for $24 to gain 20%?", "18", "16", ["20", "15"], ["price per unit"]));
questions.push(createQuestion("Multiple Items", "Hard", "A man bought some articles at the rate of 8 for $34 and sold them at 12 for $57. Find his profit or loss percentage.", "0% (no profit no loss)", "2% profit", ["5% loss", "3% profit"], ["rate"]));
questions.push(createQuestion("Multiple Items", "Hard", "A shopkeeper sells two items for $990 each. On one he gains 10% and on the other he loses 10%. His overall profit/loss is:", "1% loss", "No profit no loss", ["1% profit", "2% loss"], ["trick question"]));
questions.push(createQuestion("Multiple Items", "Hard", "A person buys 3 articles for $40 each and 4 articles for $25 each. He sells all 7 articles for $300. Find his profit percentage.", "5.88%", ["10%", "8.5%", "7.5%"], ["mixed purchase"]));
questions.push(createQuestion("Multiple Items", "Hard", "A trader sold an article at a loss of 5%. If the selling price had been $120 more, he would have gained 10%. Find the cost price.", "$800", ["$900", "$750", "$1000"], ["reverse calculation"]));

// ─── 5. Overhead / Honest Weight (10 Qs: 5 Medium, 5 Hard) ───────────────
questions.push(createQuestion("Overhead Expenses", "Medium", "A man purchases a fan for $800. He spends $200 on repair and sells it for $1200. Find his profit percentage.", "20%", ["25%", "15%", "10%"], ["overheads"]));
questions.push(createQuestion("Overhead Expenses", "Medium", "An article costs $2000 to manufacture. A 30% markup is added. After paying a sales commission of 10% of the selling price, find the actual profit percentage.", "17%", ["20%", "13%", "15%"], ["commission"]));
questions.push(createQuestion("Overhead Expenses", "Medium", "A car is bought for $10,000. $500 is spent on its painting and $1,500 on repair. It is then sold for $15,000. Find the profit percentage.", "25%", ["30%", "20%", "28%"], ["transport cost"]));
questions.push(createQuestion("Overhead Expenses", "Medium", "A shopkeeper buys rice for $1800 and spends $200 on transport. He sells the rice for $2,500. Find his gain percentage.", "25%", ["20%", "30%", "22.5%"], ["transport"]));
questions.push(createQuestion("Overhead Expenses", "Medium", "An article costs $1600. The manufacturer sells it to a wholesaler at 20% profit. The wholesaler sells it to a retailer at 10% profit. Find the price paid by the retailer.", "$2,112", ["$2,000", "$2,200", "$1,960"], ["chain selling"]));
questions.push(createQuestion("Honest Weight", "Hard", "A shopkeeper uses a 900g weight for 1 kg and sells at cost price. Find his profit percentage.", "11.11%", ["10%", "9.09%", "12.5%"], ["false weight"]));
questions.push(createQuestion("Honest Weight", "Hard", "A dishonest dealer professes to sell goods at cost price but uses a 800g weight for 1 kg. What is his actual profit %?", "25%", ["20%", "28%", "30%"], ["false weight"]));
questions.push(createQuestion("Honest Weight", "Hard", "A milkman mixes water with milk in the ratio 2:10. He claims to sell at cost price. Find his profit percentage.", "20%", ["25%", "16.67%", "18%"], ["adulteration"]));
questions.push(createQuestion("Honest Weight", "Hard", "A shopkeeper sells at 10% profit and uses a weight 20% less. Find the overall profit percentage.", "37.5%", ["30%", "32.5%", "40%"], ["false weight", "profit"]));
questions.push(createQuestion("Honest Weight", "Hard", "A trader claims to sell at cost price but gives 10% less quantity. What is his effective profit percentage?", "11.11%", ["10%", "9%", "12%"], ["quantity cheat"]));

// ─── 6. Partnership Profit (10 Qs: 5 Easy, 5 Medium) ────────────────────
const parts1 = [[2,3], [3,4], [1,2], [5,6], [3,7]];
const profits1 = [50000, 70000, 30000, 110000, 100000];
for (let i = 0; i < 5; i++) {
  const [a, b] = parts1[i];
  const total = profits1[i];
  const shareA = Math.round((a / (a + b)) * total);
  questions.push(createQuestion(
    "Partnership", "Easy",
    `A and B invest in a business in the ratio ${a}:${b}. If the total profit is $${total.toLocaleString()}, find A's share.`,
    `$${shareA.toLocaleString()}`, [`$${(shareA+500).toLocaleString()}`, `$${(shareA-1000).toLocaleString()}`, `$${(shareA+2000).toLocaleString()}`], ["partnership"]
  ));
}
// Time-weighted partnership
const partnerData = [
  [5000, 12, 6000, 9, 33000],
  [8000, 12, 10000, 8, 52000],
  [4000, 12, 6000, 10, 46000],
  [10000, 12, 15000, 8, 58000],
  [12000, 12, 8000, 9, 61200]
];
for (let i = 0; i < 5; i++) {
  const [capA, mA, capB, mB, totalProfit] = partnerData[i];
  const ratioA = capA * mA;
  const ratioB = capB * mB;
  const shareA = Math.round((ratioA / (ratioA + ratioB)) * totalProfit);
  questions.push(createQuestion(
    "Partnership", "Medium",
    `A starts a business with $${capA.toLocaleString()} for the full year. B joins after ${12 - mB} months with $${capB.toLocaleString()}. If the total annual profit is $${totalProfit.toLocaleString()}, find A's share.`,
    `$${shareA.toLocaleString()}`, [`$${(shareA+1000).toLocaleString()}`, `$${(shareA-2000).toLocaleString()}`, `$${(shareA+2500).toLocaleString()}`], ["partnership", "time"]
  ));
}

// Balance to 40/40/20
let easyCount = 0, medCount = 0, hardCount = 0;
questions.forEach(q => {
  if (q.difficulty === 'Easy') easyCount++;
  else if (q.difficulty === 'Medium') medCount++;
  else hardCount++;
});

// Fill to 100 if needed
const needed = 100 - questions.length;
for (let i = 0; i < needed; i++) {
  const cp = (Math.floor(Math.random() * 18) + 2) * 100;
  const pct = [5, 10, 15, 20, 25][i % 5];
  const sp = cp * (1 + pct / 100);
  questions.push(createQuestion(
    "Basic Profit & Loss", "Easy",
    `If an article is bought for $${cp} and sold for $${sp}, find the profit percentage.`,
    `${pct}%`, [`${pct + 5}%`, `${pct - 2}%`, `${pct + 10}%`], ["basic"]
  ));
}

// Final difficulty rebalance
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
}

fs.writeFileSync('quantitative aptitude questions/profit_and_loss.json', JSON.stringify(questions, null, 2));
console.log('Successfully generated ' + questions.length + ' questions for Profit & Loss.');
