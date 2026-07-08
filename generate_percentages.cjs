const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ARI_PER_${num}`;
}

function shuffleOptions(correctAnswerText, otherOptions) {
  const options = [correctAnswerText, ...otherOptions];
  // Simple deterministic shuffle
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
    topic: "Percentages",
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
    tags: ["percentage", ...tags],
    source: "AI Generated"
  };
}

// 1. Basic Percentages (20 questions: 10 Easy, 8 Medium, 2 Hard)
const bases1 = [120, 150, 200, 250, 300, 350, 400, 450, 500, 600];
const percs1 = [10, 15, 20, 25, 30, 40, 50, 60, 75, 80];
for(let i = 0; i < 10; i++) {
  const base = bases1[i];
  const p = percs1[i];
  const ans = (base * p) / 100;
  questions.push(createQuestion(
    "Basic Percentages", "Easy",
    `What is ${p}% of ${base}?`,
    ans.toString(),
    [(ans + 10).toString(), (ans - 5).toString(), (ans + 15).toString()],
    ["basic"]
  ));
}

// x is what % of y
for(let i = 0; i < 8; i++) {
  const x = [20, 45, 60, 90, 120, 150, 240, 300][i];
  const y = [100, 150, 200, 300, 400, 500, 600, 800][i];
  const ans = (x / y) * 100;
  questions.push(createQuestion(
    "Basic Percentages", "Medium",
    `If ${x} is a certain percentage of ${y}, what is that percentage?`,
    `${ans}%`,
    [`${ans + 5}%`, `${ans - 10}%`, `${ans + 15}%`],
    ["fraction to percentage"]
  ));
}

// Hard basic
questions.push(createQuestion(
  "Basic Percentages", "Hard",
  "If 16.66% of a number is 45, what is 83.33% of the same number?",
  "225", ["270", "180", "315"], ["fractions"]
));
questions.push(createQuestion(
  "Basic Percentages", "Hard",
  "A number is increased by 37.5%, resulting in 330. What was the original number?",
  "240", ["280", "220", "260"], ["fractions", "reverse"]
));

// 2. Percentage Increase/Decrease (20 questions: 10 Easy, 8 Medium, 2 Hard)
const items = ["A laptop", "A mobile phone", "A bicycle", "A television", "A watch", "A book", "A bag", "A shoe", "A desk", "A chair"];
for(let i=0; i<5; i++) {
  const p = [10, 20, 25, 15, 30][i];
  const val = [500, 800, 1200, 400, 600][i];
  const ans = val + (val * p / 100);
  questions.push(createQuestion(
    "Percentage Increase", "Easy",
    `The price of ${items[i].toLowerCase()} is $${val}. If the price increases by ${p}%, what is the new price?`,
    `$${ans}`, [`$${ans + 20}`, `$${ans - 30}`, `$${ans + 50}`], ["increase"]
  ));
}
for(let i=5; i<10; i++) {
  const p = [10, 20, 25, 40, 50][i-5];
  const val = [1000, 1500, 2000, 500, 800][i-5];
  const ans = val - (val * p / 100);
  questions.push(createQuestion(
    "Percentage Decrease", "Easy",
    `The price of ${items[i].toLowerCase()} is $${val}. During a sale, it decreases by ${p}%. What is the sale price?`,
    `$${ans}`, [`$${ans + 50}`, `$${ans - 40}`, `$${ans + 100}`], ["decrease"]
  ));
}

// Medium Increase/Decrease
for(let i=0; i<4; i++) {
  const v1 = [40, 50, 60, 80][i];
  const v2 = [50, 65, 72, 100][i];
  const ans = ((v2 - v1)/v1 * 100).toFixed(0);
  questions.push(createQuestion(
    "Percentage Increase", "Medium",
    `The daily wage of a worker increased from $${v1} to $${v2}. Find the percentage increase.`,
    `${ans}%`, [`${Number(ans)+5}%`, `${Number(ans)-5}%`, `${Number(ans)+10}%`], ["wage"]
  ));
}
for(let i=0; i<4; i++) {
  const v1 = [120, 150, 200, 300][i];
  const v2 = [90, 120, 150, 210][i];
  const ans = ((v1 - v2)/v1 * 100).toFixed(0);
  questions.push(createQuestion(
    "Percentage Decrease", "Medium",
    `The monthly expenses of a family dropped from $${v1} to $${v2}. What is the percentage decrease?`,
    `${ans}%`, [`${Number(ans)+5}%`, `${Number(ans)-5}%`, `${Number(ans)+10}%`], ["expenses"]
  ));
}
questions.push(createQuestion(
  "Percentage Increase", "Hard",
  "If the price of petrol increases by 25%, by what percentage must a person reduce their consumption so that their expenditure remains the same?",
  "20%", ["25%", "16.66%", "33.33%"], ["consumption", "expenditure"]
));
questions.push(createQuestion(
  "Percentage Decrease", "Hard",
  "A's salary is 20% less than B's salary. By what percentage is B's salary more than A's salary?",
  "25%", ["20%", "30%", "33.33%"], ["comparison"]
));

// 3. Successive Percentage (20 questions)
for(let i=0; i<5; i++) {
  const p1 = [10, 20, 15, 30, 25][i];
  const p2 = [10, 10, 20, 20, 15][i];
  const ans = (p1 + p2 + (p1*p2)/100).toFixed(1);
  questions.push(createQuestion(
    "Successive Percentage", "Easy",
    `The price of an item is successively increased by ${p1}% and then by ${p2}%. What is the net percentage increase?`,
    `${ans}%`, [`${p1+p2}%`, `${Number(ans)+2}%`, `${Number(ans)-1.5}%`], ["successive increase"]
  ));
}
for(let i=0; i<5; i++) {
  const p1 = [10, 20, 15, 25, 30][i];
  const p2 = [10, 10, 20, 20, 10][i];
  const ans = (-p1 - p2 + (p1*p2)/100).toFixed(1).replace('-', '');
  questions.push(createQuestion(
    "Successive Percentage", "Easy",
    `A shopkeeper offers two successive discounts of ${p1}% and ${p2}%. What is the single equivalent discount percentage?`,
    `${ans}%`, [`${p1+p2}%`, `${Number(ans)+2}%`, `${Number(ans)-1}%`], ["discount"]
  ));
}
for(let i=0; i<8; i++) {
  const p1 = [10, 20, 25, 30, 40, 50, 15, 20][i];
  const p2 = [10, 20, 20, 10, 20, 10, 15, 25][i]; // p1 is increase, p2 is decrease
  const ans = p1 - p2 - (p1*p2)/100;
  const ansTxt = ans === 0 ? "No change" : (ans > 0 ? `${ans}% increase` : `${Math.abs(ans)}% decrease`);
  const wrong1 = ans === 0 ? "1% decrease" : (ans > 0 ? `${ans+2}% increase` : `${Math.abs(ans)+2}% decrease`);
  const wrong2 = ans === 0 ? "1% increase" : (ans > 0 ? `${ans-1}% increase` : `${Math.abs(ans)-1}% decrease`);
  const wrong3 = `${Math.abs(p1-p2)}% increase`;
  questions.push(createQuestion(
    "Successive Percentage", "Medium",
    `A number is first increased by ${p1}% and then decreased by ${p2}%. What is the overall percentage change?`,
    ansTxt, [wrong1, wrong2, wrong3], ["successive change"]
  ));
}
questions.push(createQuestion(
  "Successive Percentage", "Hard",
  "The population of a town increases by 10% in the first year, decreases by 20% in the second year, and increases by 30% in the third year. What is the net percentage change?",
  "14.4% increase", ["20% increase", "12.5% increase", "15% increase"], ["population", "3 years"]
));
questions.push(createQuestion(
  "Successive Percentage", "Hard",
  "A trader marks his goods 40% above the cost price and then allows a successive discount of 15% and 10%. Find his net profit or loss percentage.",
  "7.1% profit", ["8% profit", "6.5% profit", "10% profit"], ["profit", "discount"]
));

// 4. Population & Depreciation (15 questions)
for(let i=0; i<5; i++) {
  const pop = [10000, 20000, 50000, 80000, 150000][i];
  const r = [5, 10, 4, 8, 2][i];
  const ans = Math.round(pop * Math.pow(1 + r/100, 2));
  questions.push(createQuestion(
    "Population", "Easy",
    `The current population of a town is ${pop}. If it increases at the rate of ${r}% per annum, what will be the population after 2 years?`,
    `${ans}`, [`${ans+500}`, `${ans-200}`, `${ans+1200}`], ["growth"]
  ));
}
for(let i=0; i<4; i++) {
  const val = [50000, 80000, 120000, 200000][i];
  const r = [10, 15, 20, 25][i];
  const ans = Math.round(val * Math.pow(1 - r/100, 2));
  questions.push(createQuestion(
    "Depreciation", "Medium",
    `A machine is bought for $${val}. Its value depreciates at the rate of ${r}% per annum. What will be its value after 2 years?`,
    `$${ans}`, [`$${ans+2000}`, `$${ans-1500}`, `$${ans+3500}`], ["depreciation"]
  ));
}
for(let i=0; i<4; i++) {
  const pop = [11025, 12100, 14400, 44100][i];
  const r = [5, 10, 20, 5][i];
  const ans = Math.round(pop / Math.pow(1 + r/100, 2));
  questions.push(createQuestion(
    "Population", "Medium",
    `The population of a city is ${pop}. If it has been growing at ${r}% per annum, what was its population 2 years ago?`,
    `${ans}`, [`${ans+500}`, `${ans-1000}`, `${ans+200}`], ["reverse growth"]
  ));
}
questions.push(createQuestion(
  "Population", "Hard",
  "In a town, the population of males increases by 8% and females by 5%. If the total population grew from 10,000 to 10,680, find the original number of males.",
  "6,000", ["4,000", "5,500", "6,500"], ["alligation", "population"]
));
questions.push(createQuestion(
  "Depreciation", "Hard",
  "The value of a car depreciates by 20% in the first year and by 25% in the second year. If its value after 2 years is $12,000, what was its original price?",
  "$20,000", ["$22,500", "$24,000", "$25,000"], ["successive depreciation"]
));


// 5. Salary & Expenditure (15 questions)
for(let i=0; i<5; i++) {
  const sal = [2000, 3000, 4500, 6000, 8000][i];
  const p = [15, 20, 25, 30, 40][i];
  const ans = (sal * p) / 100;
  questions.push(createQuestion(
    "Salary", "Easy",
    `A person earns $${sal} a month and saves ${p}% of it. What is his monthly saving?`,
    `$${ans}`, [`$${ans+100}`, `$${ans-50}`, `$${ans+200}`], ["savings"]
  ));
}
for(let i=0; i<6; i++) {
  const p1 = [20, 30, 25, 15, 40, 35][i]; // food
  const p2 = [10, 15, 20, 25, 10, 15][i]; // rent
  const p3 = [15, 20, 10, 10, 20, 25][i]; // misc
  const left = [2750, 3500, 4500, 5000, 6000, 7500][i];
  const total = p1 + p2 + p3;
  const ans = Math.round((left * 100) / (100 - total));
  questions.push(createQuestion(
    "Salary", "Medium",
    `A man spends ${p1}% of his income on food, ${p2}% on rent, and ${p3}% on miscellaneous expenses. If he saves $${left}, what is his total income?`,
    `$${ans}`, [`$${ans-500}`, `$${ans+1000}`, `$${ans+500}`], ["expenditure", "income"]
  ));
}
questions.push(createQuestion(
  "Salary", "Hard",
  "A man spends 20% of his income on food. Of the remaining, he spends 25% on rent, and of the remaining, 30% on education. If he is left with $2,100, find his total income.",
  "$5,000", ["$4,800", "$5,500", "$6,000"], ["successive remaining"]
));
questions.push(createQuestion(
  "Expenditure", "Hard",
  "The price of sugar is increased by 20%. A family wants to keep its expenditure on sugar the same as before. If they previously consumed 30 kg, what should be their new consumption?",
  "25 kg", ["24 kg", "26 kg", "20 kg"], ["consumption", "price increase"]
));
questions.push(createQuestion(
  "Salary", "Hard",
  "Ravi's salary was reduced by 20%. To bring it back to the original level, by what percentage must the reduced salary be increased?",
  "25%", ["20%", "30%", "22.5%"], ["reverse salary"]
));
questions.push(createQuestion(
  "Salary", "Hard",
  "If the tax on a commodity is reduced by 10% and its consumption increases by 10%, what is the net effect on the revenue?",
  "1% decrease", ["No change", "1% increase", "2% decrease"], ["revenue", "tax"]
));


// 6. Examination, Election & Venn (10 questions)
for(let i=0; i<3; i++) {
  const max = [500, 600, 800][i];
  const pass = [35, 40, 45][i];
  const got = [150, 200, 320][i];
  const fail = (max * pass / 100) - got;
  questions.push(createQuestion(
    "Examination", "Medium",
    `A student needs ${pass}% marks to pass an exam. If the total marks are ${max} and he got ${got} marks, by how many marks did he fail?`,
    `${fail}`, [`${fail-10}`, `${fail+15}`, `${fail+5}`], ["pass marks"]
  ));
}
for(let i=0; i<3; i++) {
  const diff = [15, 20, 10][i];
  const votes = [450, 800, 600][i]; // winner won by these votes
  // winner got 50 + diff/2 %, loser got 50 - diff/2 %
  // difference is diff %
  const total = (votes * 100) / diff;
  questions.push(createQuestion(
    "Election", "Medium",
    `In an election between two candidates, the winner got ${(50 + diff/2)}% of the valid votes and won by a majority of ${votes} votes. Find the total number of valid votes.`,
    `${total}`, [`${total-500}`, `${total+1000}`, `${total+200}`], ["election", "majority"]
  ));
}
questions.push(createQuestion(
  "Examination", "Hard",
  "A candidate who gets 20% marks fails by 10 marks, but another candidate who gets 42% marks gets 12% more than the passing marks. What is the maximum marks?",
  "100", ["150", "200", "250"], ["comparative marks"]
));
questions.push(createQuestion(
  "Election", "Hard",
  "In an election, 10% of voters did not cast their vote, and 10% of the votes cast were found invalid. The winning candidate got 54% of the valid votes and won by 1620 votes. Find the total number of enrolled voters.",
  "25,000", ["20,000", "30,000", "22,500"], ["invalid votes", "election"]
));
questions.push(createQuestion(
  "Venn Diagram", "Hard",
  "In a class, 60% of students passed in Math and 70% passed in Science. If 20% failed in both and 150 students passed in both, what is the total number of students?",
  "300", ["400", "250", "350"], ["sets", "pass/fail"]
));
questions.push(createQuestion(
  "Venn Diagram", "Hard",
  "In an office, 55% of people like tea, 60% like coffee, and 45% like both. What percentage of people like neither tea nor coffee?",
  "30%", ["20%", "25%", "35%"], ["sets", "beverages"]
));

// We need exactly 100 questions.
// Let's count them and fill the rest up to 100 with random variations of "Basic Percentages".
const totalGenerated = questions.length;
const needed = 100 - totalGenerated;

for(let i=0; i<needed; i++) {
  const p = Math.floor(Math.random() * 80) + 10;
  const v = Math.floor(Math.random() * 900) + 100;
  const ans = parseFloat(((p * v) / 100).toFixed(2));
  questions.push(createQuestion(
    "Miscellaneous Percentages", "Easy",
    `Evaluate: ${p}% of ${v}`,
    `${ans}`, [`${(ans+12).toFixed(2)}`, `${(ans-8).toFixed(2)}`, `${(ans+25).toFixed(2)}`], ["basic"]
  ));
}

// Ensure the final object is formatted properly
fs.writeFileSync('quantitative aptitude questions/percentages.json', JSON.stringify(questions, null, 2));
console.log('Successfully generated ' + questions.length + ' questions for Percentages.');
