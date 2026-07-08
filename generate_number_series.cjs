const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `NUMBER_SERIES_${num}`;
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

function createQuestion(difficulty, seriesArr, nextVal, wrongVals, patternText, expText, shortcutText, mistakeText) {
  const qText = `Find the next number in the series: ${seriesArr.join(", ")}, ?`;
  const { options, correctIndex } = shuffleOptions(nextVal, wrongVals);
  
  let estTime = "30 sec";
  if (difficulty === "Medium") estTime = "60 sec";
  if (difficulty === "Hard") estTime = "120 sec";
  
  // Use letter for correctAnswer index as per user prompt example ("correctAnswer": "C")
  const letters = ["A", "B", "C", "D"];
  
  return {
    id: getId(),
    topic: "Logical Reasoning",
    subtopic: "Number Series",
    difficulty: difficulty,
    question: qText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    pattern: patternText,
    explanation: expText,
    shortcut: shortcutText || "Check differences between adjacent terms first. If differences grow rapidly, check for multiplication or squares.",
    commonMistake: mistakeText || "Assuming a simple addition pattern without checking the 3rd or 4th terms.",
    estimatedTime: estTime,
    keywords: ["series", "logical reasoning", "number series"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

let generatedQs = [];

// EASY: 40 questions (AP, Constant differences, Squares, simple primes)
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let series = [];
  let next = 0;
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Arithmetic Progression
    let start = i * 2 + 3;
    let diff = (i % 5) + 3;
    for(let j=0; j<5; j++) series.push(start + diff * j);
    next = start + diff * 5;
    wrongs = [next - diff, next + diff, next + 1];
    pat = `Constant difference of +${diff}`;
    exp = `Step 1: Check differences. ${series[1]}-${series[0]} = ${diff}. Step 2: Verify. ${series[2]}-${series[1]} = ${diff}. Step 3: Add ${diff} to ${series[4]} = ${next}.`;
  } else if (type === 1) {
    // Squares
    let start = (i % 5) + 2;
    for(let j=0; j<5; j++) series.push(Math.pow(start + j, 2));
    next = Math.pow(start + 5, 2);
    wrongs = [next - 1, next + (start + 5), next + 2];
    pat = "Squares of consecutive numbers";
    exp = `Step 1: Recognize perfect squares. ${start}^2, ${start+1}^2, etc. Step 2: The next term is ${start+5}^2 = ${next}.`;
  } else if (type === 2) {
    // Geometric Progression
    let start = (i % 3) + 2;
    let ratio = (i % 2) + 2; // 2 or 3
    for(let j=0; j<4; j++) series.push(start * Math.pow(ratio, j));
    next = start * Math.pow(ratio, 4);
    wrongs = [next - start, next * ratio, next + ratio];
    pat = `Multiply by ${ratio}`;
    exp = `Step 1: Observe rapid growth. Step 2: Divide adjacent terms. Ratio is ${ratio}. Step 3: ${series[3]} × ${ratio} = ${next}.`;
  } else {
    // AP with decreasing
    let start = 100 + i * 3;
    let diff = (i % 6) + 4;
    for(let j=0; j<5; j++) series.push(start - diff * j);
    next = start - diff * 5;
    wrongs = [next + diff, next - diff*2, next - 1];
    pat = `Constant difference of -${diff}`;
    exp = `Step 1: Check differences. Series is decreasing by ${diff}. Step 2: Verify. ${series[3]} - ${diff} = ${series[4]}. Step 3: ${series[4]} - ${diff} = ${next}.`;
  }
  generatedQs.push(createQuestion("Easy", series, next, wrongs, pat, exp));
}

// MEDIUM: 40 questions (Mixed operations: *x + y, double differences, alternating)
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let series = [];
  let next = 0;
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Multiply by X and add Y (e.g. *2 + 1)
    let mult = (i % 2) + 2; // 2 or 3
    let add = (i % 3) + 1; // 1, 2, 3
    let current = (i % 4) + 2;
    for(let j=0; j<4; j++) {
      series.push(current);
      current = current * mult + add;
    }
    next = current;
    wrongs = [next - add, next * mult, next + add];
    pat = `Multiply by ${mult} and add ${add}`;
    exp = `Step 1: Check pattern between terms. ${series[0]}×${mult}+${add} = ${series[1]}. Step 2: Verify: ${series[1]}×${mult}+${add} = ${series[2]}. Step 3: Apply: ${series[3]}×${mult}+${add} = ${next}.`;
  } else if (type === 1) {
    // Double difference
    let diff = 2;
    let diff_step = (i % 3) + 1; // increases by 1, 2, or 3
    let current = (i % 5) + 5;
    for(let j=0; j<5; j++) {
      series.push(current);
      current += diff;
      diff += diff_step;
    }
    next = current;
    wrongs = [next - diff_step, next + diff, next - 1];
    pat = `Difference increases by ${diff_step} each time`;
    exp = `Step 1: Find first differences: ${series[1]-series[0]}, ${series[2]-series[1]}. Step 2: Find second differences: constant ${diff_step}. Step 3: Add next difference to last term to get ${next}.`;
  } else if (type === 2) {
    // Alternating series
    let a_start = i + 10;
    let b_start = i * 2 + 20;
    for(let j=0; j<3; j++) {
      series.push(a_start + j * 2);
      series.push(b_start - j * 3);
    }
    next = a_start + 3 * 2; // the 7th term belongs to sequence A
    wrongs = [b_start - 3 * 3, next + 2, next - 2];
    pat = `Two alternating series. Series 1: +2. Series 2: -3.`;
    exp = `Step 1: Notice numbers jumping up and down. Step 2: Split into odd/even positions. Odd indices form ${a_start}, ${a_start+2}, ${a_start+4}. Step 3: Next term is ${a_start+4} + 2 = ${next}.`;
  } else {
    // Prime numbers + constant
    let primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    let offset = (i % 3) + 1;
    let startIdx = i % 4;
    for(let j=0; j<5; j++) series.push(primes[startIdx + j] + offset);
    next = primes[startIdx + 5] + offset;
    wrongs = [next + 2, next - 1, primes[startIdx + 6] + offset];
    pat = `Prime numbers + ${offset}`;
    exp = `Step 1: Subtract ${offset} from each term: ${primes[startIdx]}, ${primes[startIdx+1]}, etc. Step 2: Recognize prime sequence. Step 3: Next prime is ${primes[startIdx+5]}, adding ${offset} gives ${next}.`;
  }
  generatedQs.push(createQuestion("Medium", series, next, wrongs, pat, exp));
}

// HARD: 20 questions (Cubes + logic, *n + n, Fibonacci variants)
for (let i = 0; i < 20; i++) {
  let type = i % 3;
  let series = [];
  let next = 0;
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // n^3 + n or n^3 - n
    let sign = (i % 2 === 0) ? 1 : -1;
    let start = (i % 3) + 2;
    for(let j=0; j<4; j++) {
      let n = start + j;
      series.push(Math.pow(n, 3) + sign * n);
    }
    let nNext = start + 4;
    next = Math.pow(nNext, 3) + sign * nNext;
    wrongs = [next + nNext, next - sign, next * 2];
    pat = sign === 1 ? "n³ + n" : "n³ - n";
    exp = `Step 1: Notice rapid cubic growth. Step 2: Compare to perfect cubes. ${start}^3=${Math.pow(start,3)}, given is ${series[0]}. Step 3: Pattern is ${pat}. Next is ${nNext}^3 ${sign===1?'+':'-'} ${nNext} = ${next}.`;
  } else if (type === 1) {
    // Multiply by N and add N
    let current = (i % 3) + 2;
    for(let j=1; j<=4; j++) {
      series.push(current);
      current = current * j + j; // *1+1, *2+2, *3+3
    }
    next = current;
    let wrongN = 5;
    wrongs = [next - wrongN, next + 10, next * 2];
    pat = "Multiply by n and add n (where n increases)";
    exp = `Step 1: Analyze multipliers. ${series[0]}×1+1 = ${series[1]}. ${series[1]}×2+2 = ${series[2]}. Step 2: Verify ${series[2]}×3+3 = ${series[3]}. Step 3: Apply: ${series[3]}×4+4 = ${next}.`;
  } else {
    // Fibonacci sum of previous 3
    let a = 1, b = 2, c = 3;
    if (i % 2 === 0) { a=2; b=3; c=5; }
    series.push(a, b, c);
    for(let j=0; j<2; j++) {
      let sum = a + b + c;
      series.push(sum);
      a = b; b = c; c = sum;
    }
    next = a + b + c;
    wrongs = [next - c, next + a, next - b];
    pat = "Sum of previous three terms";
    exp = `Step 1: Differences don't form a clear pattern. Step 2: Check additions of previous terms. ${series[0]}+${series[1]}+${series[2]} = ${series[3]}. Step 3: Apply: ${series[2]}+${series[3]}+${series[4]} = ${next}.`;
  }
  generatedQs.push(createQuestion("Hard", series, next, wrongs, pat, exp));
}

// Ensure unique IDs
generatedQs.forEach((q, idx) => {
  q.id = `NUMBER_SERIES_${String(idx + 1).padStart(3, '0')}`;
});

fs.writeFileSync('public/data/logical-reasoning/series/number-series.json', JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
