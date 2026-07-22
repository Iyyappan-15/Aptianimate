const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ARI_AVG_${num}`;
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
    topic: "Averages",
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
    tags: ["average", ...tags],
    source: "AI Generated"
  };
}

// 1. Basic Averages (20 Qs)
for(let i=0; i<5; i++) {
  const start = [2, 4, 10, 15, 20][i];
  const count = [5, 6, 7, 8, 9][i];
  let sum = 0, arr = [];
  for(let j=0; j<count; j++) { sum += (start + j*2); arr.push(start + j*2); }
  const avg = sum / count;
  questions.push(createQuestion(
    "Basic Averages", "Easy",
    `Find the average of the numbers: ${arr.join(", ")}.`,
    `${avg}`, [`${avg+1}`, `${avg-2}`, `${avg+3}`], ["numbers"]
  ));
}
for(let i=0; i<5; i++) {
  const n = [10, 20, 30, 40, 50][i];
  const avg = (n + 1) / 2;
  questions.push(createQuestion(
    "Basic Averages", "Easy",
    `What is the average of the first ${n} natural numbers?`,
    `${avg}`, [`${avg+0.5}`, `${avg-0.5}`, `${avg+1}`], ["natural numbers"]
  ));
}
for(let i=0; i<5; i++) {
  const n = [15, 25, 35, 45, 55][i];
  const avg = n;
  questions.push(createQuestion(
    "Basic Averages", "Easy",
    `What is the average of the first ${n} odd numbers?`,
    `${avg}`, [`${avg+1}`, `${avg-1}`, `${avg+2}`], ["odd numbers"]
  ));
}
for(let i=0; i<5; i++) {
  const n = [12, 22, 32, 42, 52][i];
  const avg = n + 1;
  questions.push(createQuestion(
    "Basic Averages", "Easy",
    `What is the average of the first ${n} even numbers?`,
    `${avg}`, [`${avg-1}`, `${avg+1}`, `${avg+2}`], ["even numbers"]
  ));
}

// 2. Addition/Removal (25 Qs: 5 Easy, 15 Medium, 5 Hard)
for(let i=0; i<5; i++) {
  const n = [10, 20, 30, 40, 15][i];
  const avg = [15, 20, 12, 14, 16][i];
  const newAvg = avg + [1, 0.5, 2, 1.5, 1][i];
  // Teacher age = (n+1)*newAvg - n*avg
  const teacher = (n+1)*newAvg - n*avg;
  questions.push(createQuestion(
    "Addition of a Member", "Medium",
    `The average age of a class of ${n} students is ${avg} years. If the teacher's age is included, the average increases by ${newAvg - avg} years. Find the teacher's age.`,
    `${teacher} years`, [`${teacher-2} years`, `${teacher+5} years`, `${teacher+3} years`], ["ages", "teacher"]
  ));
}
for(let i=0; i<5; i++) {
  const n = [5, 6, 8, 10, 12][i];
  const inc = [1.5, 2, 2.5, 3, 1][i];
  const oldWeight = [45, 50, 60, 65, 70][i];
  // newWeight = oldWeight + n*inc
  const newWeight = oldWeight + n * inc;
  questions.push(createQuestion(
    "Replacement", "Medium",
    `The average weight of ${n} persons increases by ${inc} kg when a new person comes in place of one of them weighing ${oldWeight} kg. What is the weight of the new person?`,
    `${newWeight} kg`, [`${newWeight-5} kg`, `${newWeight+10} kg`, `${newWeight-2} kg`], ["replacement", "weight"]
  ));
}
for(let i=0; i<5; i++) {
  const n = [11, 15, 21, 25, 31][i];
  const dec = [2, 1, 3, 1.5, 2.5][i];
  const oldWeight = [60, 70, 80, 50, 90][i];
  const newWeight = oldWeight - n * dec;
  questions.push(createQuestion(
    "Replacement", "Medium",
    `The average weight of ${n} members decreases by ${dec} kg when a member weighing ${oldWeight} kg is replaced by a new member. Find the weight of the new member.`,
    `${newWeight} kg`, [`${newWeight+4} kg`, `${newWeight-3} kg`, `${newWeight+5} kg`], ["replacement", "decrease"]
  ));
}
for(let i=0; i<5; i++) {
  const total = [10, 15, 20, 25, 30][i];
  const avg = [30, 40, 50, 60, 70][i];
  const leave = [1, 2, 1, 2, 1][i];
  const dec = [1, 2, 1.5, 0.5, 2][i];
  // Sum = total*avg
  // New Sum = (total-leave)*(avg-dec)
  const leftSum = (total * avg) - ((total - leave) * (avg - dec));
  const ans = leave === 1 ? leftSum : leftSum / leave;
  const qStr = leave === 1 ? "the age of the person who left" : "the average age of the persons who left";
  questions.push(createQuestion(
    "Removal of a Member", "Hard",
    `The average age of ${total} persons is ${avg} years. If ${leave} person(s) leave the group, the average age decreases by ${dec} years. Find ${qStr}.`,
    `${ans} years`, [`${ans-5} years`, `${ans+4} years`, `${ans+10} years`], ["removal"]
  ));
}
// Easy Add/Remove
for(let i=0; i<5; i++) {
  const a1=[10,12,15,20,30][i];
  const a2=[20,30,25,40,50][i];
  questions.push(createQuestion(
    "Basic Averages", "Easy",
    `The average of two numbers is ${(a1+a2)/2}. If one number is ${a1}, what is the other number?`,
    `${a2}`, [`${a2+5}`, `${a2-2}`, `${a2+10}`], ["two numbers"]
  ));
}

// 3. Error in reading (15 Qs)
for(let i=0; i<5; i++) {
  const n = [10, 20, 25, 40, 50][i];
  const avg = [40, 50, 60, 70, 80][i];
  const correct = [60, 80, 90, 100, 120][i];
  const wrong = [40, 50, 40, 60, 70][i];
  // actual sum = n*avg - wrong + correct
  const actualAvg = avg + (correct - wrong)/n;
  questions.push(createQuestion(
    "Error in Reading", "Medium",
    `The average of ${n} numbers was calculated as ${avg}. It was later discovered that one number was mistakenly read as ${wrong} instead of ${correct}. Find the correct average.`,
    `${actualAvg}`, [`${actualAvg-1}`, `${actualAvg+0.5}`, `${actualAvg+2}`], ["error", "correction"]
  ));
}
for(let i=0; i<5; i++) {
  const n = [20, 30, 40, 50, 100][i];
  const avg = [45, 55, 65, 75, 85][i];
  const correct = [30, 40, 50, 60, 50][i];
  const wrong = [70, 100, 90, 110, 150][i];
  const actualAvg = avg + (correct - wrong)/n;
  questions.push(createQuestion(
    "Error in Reading", "Medium",
    `The average marks of ${n} students were found to be ${avg}. Later, it was realized that a score of ${correct} was misread as ${wrong}. Find the correct average.`,
    `${actualAvg}`, [`${actualAvg+1}`, `${actualAvg-0.5}`, `${actualAvg-2}`], ["error", "marks"]
  ));
}
for(let i=0; i<5; i++) {
  const n = [50, 100, 40, 20, 80][i];
  const avg = [50, 60, 40, 30, 70][i];
  const c1 = [45, 70, 35, 25, 80][i], c2 = [55, 80, 45, 35, 90][i];
  const w1 = [25, 40, 15, 10, 50][i], w2 = [35, 50, 25, 20, 60][i];
  const actualAvg = avg + ((c1+c2) - (w1+w2))/n;
  questions.push(createQuestion(
    "Error in Reading", "Hard",
    `The mean of ${n} observations was ${avg}. Later it was found that two observations, ${c1} and ${c2}, were incorrectly recorded as ${w1} and ${w2} respectively. Find the correct mean.`,
    `${actualAvg}`, [`${actualAvg+0.5}`, `${actualAvg-1}`, `${actualAvg+1.5}`], ["error", "two items"]
  ));
}

// 4. Batting and Bowling Averages (15 Qs)
for(let i=0; i<5; i++) {
  const inng = [10, 15, 20, 25, 30][i];
  const curAvg = [30, 35, 40, 45, 50][i];
  const targetAvg = curAvg + [2, 3, 1, 2, 4][i];
  // required runs = (inng+1)*targetAvg - inng*curAvg
  const req = (inng+1)*targetAvg - inng*curAvg;
  questions.push(createQuestion(
    "Batting Average", "Medium",
    `A batsman has a certain average of runs for ${inng} innings. In the ${(inng+1)}th inning, he scores ${req} runs, thereby increasing his average by ${targetAvg - curAvg}. What is his new average?`,
    `${targetAvg}`, [`${targetAvg-1}`, `${targetAvg+2}`, `${targetAvg-3}`], ["batting"]
  ));
}
for(let i=0; i<5; i++) {
  // Bowling average = Runs / Wickets
  const avg = [24.85, 12.4, 15.2, 20.5, 18.4][i];
  const w = [5, 4, 5, 5, 4][i];
  const runs = [52, 26, 40, 50, 32][i]; // new match
  const dec = [0.85, 0.4, 0.2, 0.5, 0.4][i]; // average improves by this
  const newAvg = avg - dec;
  // Let initial wickets be x. 
  // Initial runs = avg * x
  // New average = (avg*x + runs) / (x + w) = newAvg
  // avg*x + runs = newAvg*x + newAvg*w
  // x(avg - newAvg) = newAvg*w - runs
  // x(dec) = newAvg*w - runs
  const x = Math.round((newAvg * w - runs) / dec);
  const finalWickets = x + w;
  questions.push(createQuestion(
    "Bowling Average", "Hard",
    `A cricketer's bowling average is ${avg}. In his last match, he takes ${w} wickets for ${runs} runs, thereby improving his average by ${dec}. Find the total number of wickets taken by him till the last match.`,
    `${finalWickets}`, [`${finalWickets-5}`, `${finalWickets+10}`, `${finalWickets-w}`], ["bowling", "wickets"]
  ));
}
// Easy batting
for(let i=0; i<5; i++) {
  const scores = [[45,55,60,40,50], [10,20,30,40,50], [100,50,0,50,100], [25,35,45,55,65], [12,18,22,28,30]][i];
  const sum = scores.reduce((a,b)=>a+b, 0);
  const avg = sum / scores.length;
  questions.push(createQuestion(
    "Batting Average", "Easy",
    `A batsman scored ${scores.join(", ")} runs in his 5 innings. What is his average score?`,
    `${avg}`, [`${avg+5}`, `${avg-4}`, `${avg+10}`], ["batting", "simple"]
  ));
}

// 5. Average Speed & Weighted Average (25 Qs)
for(let i=0; i<5; i++) {
  const s1 = [20, 30, 40, 50, 60][i];
  const s2 = [30, 60, 60, 75, 40][i];
  const avg = (2 * s1 * s2) / (s1 + s2);
  questions.push(createQuestion(
    "Average Speed", "Easy",
    `A car travels from A to B at ${s1} km/hr and returns from B to A at ${s2} km/hr. Find the average speed for the entire journey.`,
    `${avg} km/hr`, [`${(s1+s2)/2} km/hr`, `${avg-5} km/hr`, `${avg+2} km/hr`], ["speed", "equal distance"]
  ));
}
for(let i=0; i<5; i++) {
  const n1 = [20, 30, 40, 50, 60][i];
  const a1 = [15, 20, 25, 30, 35][i];
  const n2 = [30, 20, 60, 50, 40][i];
  const a2 = [25, 30, 15, 40, 25][i];
  const avg = ((n1*a1) + (n2*a2)) / (n1+n2);
  questions.push(createQuestion(
    "Weighted Average", "Medium",
    `A class has two sections. Section A has ${n1} students with an average score of ${a1}. Section B has ${n2} students with an average score of ${a2}. Find the overall average of the class.`,
    `${avg}`, [`${avg+2}`, `${avg-1.5}`, `${avg+3}`], ["weighted", "class"]
  ));
}
// Add 15 more weighted/speed
for(let i=0; i<5; i++) {
  const d1 = [100, 150, 200, 250, 300][i];
  const t1 = [2, 3, 4, 5, 6][i];
  const d2 = [50, 100, 120, 150, 180][i];
  const t2 = [1, 2, 2, 3, 3][i];
  const avg = (d1+d2)/(t1+t2);
  questions.push(createQuestion(
    "Average Speed", "Easy",
    `A person travels ${d1} km in ${t1} hours and another ${d2} km in ${t2} hours. What is his average speed for the whole journey?`,
    `${avg} km/hr`, [`${avg+5} km/hr`, `${avg-2} km/hr`, `${avg+10} km/hr`], ["speed", "time"]
  ));
}
for(let i=0; i<5; i++) {
  const p1 = [10, 15, 20, 25, 30][i];
  const m1 = [40, 50, 60, 70, 80][i];
  const p2 = [20, 25, 30, 35, 40][i];
  const m2 = [50, 60, 70, 80, 90][i];
  const p3 = [30, 35, 40, 45, 50][i];
  const m3 = [60, 70, 80, 90, 100][i];
  const avg = ((p1*m1)+(p2*m2)+(p3*m3))/(p1+p2+p3);
  questions.push(createQuestion(
    "Weighted Average", "Hard",
    `In an exam, the average marks of ${p1} students is ${m1}, of another ${p2} students is ${m2}, and of the remaining ${p3} students is ${m3}. Find the average marks of all students.`,
    `${avg.toFixed(1)}`, [`${(avg+2).toFixed(1)}`, `${(avg-1).toFixed(1)}`, `${(avg+3).toFixed(1)}`], ["weighted", "three groups"]
  ));
}
for(let i=0; i<5; i++) {
  const w1 = [1, 2, 3, 4, 5][i];
  const v1 = [10, 20, 30, 40, 50][i];
  const w2 = [2, 3, 4, 5, 6][i];
  const v2 = [15, 25, 35, 45, 55][i];
  const avg = ((w1*v1)+(w2*v2))/(w1+w2);
  questions.push(createQuestion(
    "Weighted Average", "Medium",
    `Two varieties of rice costing $${v1}/kg and $${v2}/kg are mixed in the ratio ${w1}:${w2}. Find the average price of the mixture.`,
    `$${avg.toFixed(2)}`, [`$${(avg+1).toFixed(2)}`, `$${(avg-0.5).toFixed(2)}`, `$${(avg+2).toFixed(2)}`], ["mixture", "price"]
  ));
}

// Ensure exactly 100 by filling the rest with basic easy questions
const totalGenerated = questions.length;
const needed = 100 - totalGenerated;

for(let i=0; i<needed; i++) {
  const start = Math.floor(Math.random()*10)+5;
  const count = Math.floor(Math.random()*4)+4;
  let sum = 0, arr = [];
  for(let j=0; j<count; j++) {
    const val = start + j*3;
    sum += val;
    arr.push(val);
  }
  const avg = sum / count;
  questions.push(createQuestion(
    "Basic Averages", "Easy",
    `Find the average of the following set of numbers: ${arr.join(", ")}.`,
    `${avg}`, [`${avg+1.5}`, `${avg-2}`, `${avg+3}`], ["numbers"]
  ));
}

// Balance difficulties to 40/40/20
let easyCount = 0, medCount = 0, hardCount = 0;
questions.forEach(q => {
  if(q.difficulty === 'Easy') easyCount++;
  else if(q.difficulty === 'Medium') medCount++;
  else hardCount++;
});

let eDiff = 40 - easyCount;
let mDiff = 40 - medCount;
let hDiff = 20 - hardCount;

for(let q of questions) {
  if (eDiff > 0 && q.difficulty === 'Medium') { q.difficulty = 'Easy'; q.estimatedTime=45; eDiff--; mDiff++; }
  else if (eDiff > 0 && q.difficulty === 'Hard') { q.difficulty = 'Easy'; q.estimatedTime=45; eDiff--; hDiff++; }
  
  else if (hDiff > 0 && q.difficulty === 'Easy') { q.difficulty = 'Hard'; q.estimatedTime=90; hDiff--; eDiff++; }
  else if (hDiff > 0 && q.difficulty === 'Medium') { q.difficulty = 'Hard'; q.estimatedTime=90; hDiff--; mDiff++; }
  
  else if (mDiff > 0 && q.difficulty === 'Easy') { q.difficulty = 'Medium'; q.estimatedTime=60; mDiff--; eDiff++; }
  else if (mDiff > 0 && q.difficulty === 'Hard') { q.difficulty = 'Medium'; q.estimatedTime=60; mDiff--; hDiff++; }
}

fs.writeFileSync('quantitative aptitude questions/averages.json', JSON.stringify(questions, null, 2));
console.log('Successfully generated ' + questions.length + ' questions for Averages.');
