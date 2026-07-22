const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `LETTER_SERIES_${num}`;
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
  const qText = `Find the next term in the series: ${seriesArr.join(", ")}, ?`;
  const { options, correctIndex } = shuffleOptions(nextVal, wrongVals);
  
  let estTime = "30 sec";
  if (difficulty === "Medium") estTime = "45 sec";
  if (difficulty === "Hard") estTime = "90 sec";
  
  const letters = ["A", "B", "C", "D"];
  
  return {
    id: getId(),
    topic: "Logical Reasoning",
    subtopic: "Letter Series",
    difficulty: difficulty,
    question: qText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    pattern: patternText,
    explanation: expText,
    shortcut: shortcutText || "Memorize the alphabetical order numbers (A=1, B=2, Z=26) and their reverse orders (Z=1).",
    commonMistake: mistakeText || "Miscounting the gap between letters, especially when crossing from Z back to A.",
    estimatedTime: estTime,
    keywords: ["series", "logical reasoning", "letter series", "alphabet"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

// Helper functions for letters
const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getLetter(pos) {
  // Wrap around logic (1 = A, 26 = Z, 27 = A)
  let p = (pos - 1) % 26;
  if (p < 0) p += 26;
  return alpha[p];
}

function getPos(letter) {
  return alpha.indexOf(letter) + 1;
}

let generatedQs = [];

// EASY: 40 questions (Constant jumps, Alternating simple, Skip letters)
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let series = [];
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Constant forward jump
    let start = (i % 5) + 1;
    let jump = (i % 3) + 2; // +2, +3, +4
    for(let j=0; j<5; j++) series.push(getLetter(start + j * jump));
    next = getLetter(start + 5 * jump);
    wrongs = [getLetter(start + 5*jump + 1), getLetter(start + 5*jump - 1), getLetter(start + 4*jump + jump*2)];
    pat = `Forward jump of +${jump}`;
    exp = `Step 1: Assign numbers to letters. ${series[0]}=${getPos(series[0])}, ${series[1]}=${getPos(series[1])}. Step 2: Difference is +${jump}. Step 3: ${series[4]} is ${getPos(series[4])}. ${getPos(series[4])} + ${jump} = ${getPos(series[4])+jump}, which is ${next}.`;
  } else if (type === 1) {
    // Constant backward jump
    let start = 26 - (i % 5);
    let jump = (i % 3) + 2;
    for(let j=0; j<5; j++) series.push(getLetter(start - j * jump));
    next = getLetter(start - 5 * jump);
    wrongs = [getLetter(start - 5*jump + 1), getLetter(start - 5*jump - 1), getLetter(start - 5*jump - jump)];
    pat = `Backward jump of -${jump}`;
    exp = `Step 1: Assign numbers to letters. ${series[0]}=${getPos(series[0])}. Step 2: The series decreases by ${jump} each time. Step 3: ${series[4]} = ${getPos(series[4])}. ${getPos(series[4])} - ${jump} = ${getPos(series[4])-jump}, which is ${next}.`;
  } else if (type === 2) {
    // Letter Pairs (e.g. AB, CD, EF)
    let start = (i % 5) + 1;
    let jump = (i % 2) + 2; // jump between start of pairs
    for(let j=0; j<4; j++) {
      let first = start + j * jump;
      series.push(getLetter(first) + getLetter(first + 1));
    }
    let nFirst = start + 4 * jump;
    next = getLetter(nFirst) + getLetter(nFirst + 1);
    wrongs = [
      getLetter(nFirst+1) + getLetter(nFirst+2),
      getLetter(nFirst) + getLetter(nFirst+2),
      getLetter(nFirst-1) + getLetter(nFirst)
    ];
    pat = `Pairs of consecutive letters, skipping ${jump-2} letter(s) between pairs`;
    exp = `Step 1: Look at the first letter of each pair: ${series.map(x=>x[0]).join(', ')}. They increase by +${jump}. Step 2: The second letter is always consecutive to the first. Step 3: Next first letter is ${getLetter(nFirst)}. Consecutive is ${getLetter(nFirst+1)}. Therefore, ${next}.`;
  } else {
    // Vowels logic
    let vowels = ["A", "E", "I", "O", "U"];
    let startIdx = i % 2; // 0 or 1
    for(let j=0; j<4; j++) series.push(vowels[(startIdx + j) % 5]);
    next = vowels[(startIdx + 4) % 5];
    wrongs = ["B", "Y", vowels[(startIdx + 5) % 5]];
    pat = "Sequence of Vowels";
    exp = `Step 1: Recognize that the letters do not follow a standard numerical jump. Step 2: Identify them as the vowels of the English alphabet. Step 3: After ${series[3]}, the next vowel is ${next}.`;
  }
  generatedQs.push(createQuestion("Easy", series, next, wrongs, pat, exp));
}

// MEDIUM: 40 questions (Increasing gaps, Reverse pairs (AZ, BY), Alternate series)
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let series = [];
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Increasing jump (+1, +2, +3, +4)
    let current = (i % 5) + 1;
    let diff = 1;
    for(let j=0; j<5; j++) {
      series.push(getLetter(current));
      current += diff;
      diff++;
    }
    next = getLetter(current);
    wrongs = [getLetter(current + 1), getLetter(current - 1), getLetter(current + diff)];
    pat = "Difference increases by 1 at each step (+1, +2, +3, +4)";
    exp = `Step 1: Convert to numbers: ${series.map(x=>getPos(x)).join(', ')}. Step 2: Observe differences: +1, +2, +3, +4. Step 3: Next difference is +5. ${getPos(series[4])} + 5 = ${getPos(series[4])+5}, which is ${next}.`;
  } else if (type === 1) {
    // Opposite pairs (AZ, BY, CX)
    let start = (i % 4) + 1;
    for(let j=0; j<4; j++) {
      let first = start + j;
      let second = 27 - first; // Opposite letter logic
      series.push(getLetter(first) + getLetter(second));
    }
    let nFirst = start + 4;
    let nSecond = 27 - nFirst;
    next = getLetter(nFirst) + getLetter(nSecond);
    wrongs = [
      getLetter(nFirst) + getLetter(nSecond + 1),
      getLetter(nFirst + 1) + getLetter(nSecond),
      getLetter(nFirst) + getLetter(nSecond - 1)
    ];
    pat = "First letter moves +1, second letter is its opposite (sum to 27)";
    exp = `Step 1: First letter of each pair goes +1 (${series.map(x=>x[0]).join(', ')}). Next is ${getLetter(nFirst)}. Step 2: The second letter is the alphabetical opposite (A=1, Z=26 -> 1+26=27). Step 3: Opposite of ${getLetter(nFirst)} is ${getLetter(nSecond)}. So, ${next}.`;
  } else if (type === 2) {
    // Alternating series (A, Z, C, X, E, ?)
    let a_start = (i % 3) + 1;
    let b_start = 26 - (i % 3);
    for(let j=0; j<3; j++) {
      series.push(getLetter(a_start + j * 2));
      series.push(getLetter(b_start - j * 2));
    }
    next = getLetter(a_start + 3 * 2); // 7th term belongs to first series
    wrongs = [getLetter(b_start - 3 * 2), getLetter(a_start + 3*2 + 1), getLetter(a_start + 3*2 - 1)];
    pat = "Two alternating series: Odd positions +2, Even positions -2";
    exp = `Step 1: Note the zigzag pattern. Step 2: Split into two series. Odd terms: ${getLetter(a_start)}, ${getLetter(a_start+2)}, ${getLetter(a_start+4)}. Even terms: ${getLetter(b_start)}, ${getLetter(b_start-2)}, ${getLetter(b_start-4)}. Step 3: The missing term is the 7th, which follows the odd sequence: ${getLetter(a_start+4)} + 2 = ${next}.`;
  } else {
    // Triple letters (ABC, DEF, GHI) or similar
    let start = (i % 4) + 1;
    let jump = 3; 
    for(let j=0; j<4; j++) {
      let first = start + j * jump;
      series.push(getLetter(first) + getLetter(first+1) + getLetter(first+2));
    }
    let nFirst = start + 4 * jump;
    next = getLetter(nFirst) + getLetter(nFirst+1) + getLetter(nFirst+2);
    wrongs = [
      getLetter(nFirst-1) + getLetter(nFirst) + getLetter(nFirst+1),
      getLetter(nFirst) + getLetter(nFirst+2) + getLetter(nFirst+4),
      getLetter(nFirst+1) + getLetter(nFirst+2) + getLetter(nFirst+3)
    ];
    pat = "Consecutive triplets starting with the next letter in the alphabet";
    exp = `Step 1: Look at the triplets. Each triplet consists of 3 consecutive letters. Step 2: The next triplet starts exactly where the previous one left off. Step 3: After ${series[3]}, the next letter is ${getLetter(nFirst)}. Therefore, the next triplet is ${next}.`;
  }
  generatedQs.push(createQuestion("Medium", series, next, wrongs, pat, exp));
}

// HARD: 20 questions (Complex multiple patterns, jumping triplets like DEF, HIJ, LMN -> +4,+1,+1)
for (let i = 0; i < 20; i++) {
  let type = i % 3;
  let series = [];
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Triplet where L1=+1, L2=+2, L3=+3 each step
    let L1 = (i%3)+1, L2 = (i%3)+2, L3 = (i%3)+3;
    for(let j=0; j<4; j++) {
      series.push(getLetter(L1) + getLetter(L2) + getLetter(L3));
      L1 += 1; L2 += 2; L3 += 3;
    }
    next = getLetter(L1) + getLetter(L2) + getLetter(L3);
    wrongs = [
      getLetter(L1+1) + getLetter(L2) + getLetter(L3),
      getLetter(L1) + getLetter(L2+1) + getLetter(L3),
      getLetter(L1) + getLetter(L2) + getLetter(L3+1)
    ];
    pat = "First letter +1, Second letter +2, Third letter +3";
    exp = `Step 1: Analyze each position independently. First letters: ${series.map(x=>x[0]).join(', ')} (Pattern: +1). Second letters: ${series.map(x=>x[1]).join(', ')} (Pattern: +2). Third letters: ${series.map(x=>x[2]).join(', ')} (Pattern: +3). Step 2: Apply to last term ${series[3]}. First: ${series[3][0]}+1=${next[0]}. Second: ${series[3][1]}+2=${next[1]}. Third: ${series[3][2]}+3=${next[2]}. Step 3: Combine to form ${next}.`;
  } else if (type === 1) {
    // 4 letter sequences with shifting inner pairs
    // ABCD, BCDA, CDAB, DABC -> rotation
    let startStr = getLetter(i+1) + getLetter(i+2) + getLetter(i+3) + getLetter(i+4);
    series.push(startStr);
    for(let j=1; j<4; j++) {
      let prev = series[j-1];
      let shifted = prev.substring(1) + prev[0]; // move first letter to end
      series.push(shifted);
    }
    next = series[3].substring(1) + series[3][0];
    wrongs = [
      series[3][3] + series[3].substring(0,3), // shift right instead of left
      getLetter(i+2) + getLetter(i+3) + getLetter(i+4) + getLetter(i+5), // new letters
      series[3].substring(2) + series[3].substring(0,2)
    ];
    pat = "Left cyclic rotation of letters";
    exp = `Step 1: Notice the letters in each term are identical, just in a different order. Step 2: The first letter of the term moves to the end of the next term (left rotation). Step 3: Rotating '${series[3]}' left gives '${next}'.`;
  } else {
    // First letter increases by increasing amounts (+1, +2, +3)
    // Second letter decreases by increasing amounts (-1, -2, -3)
    let first = i+1;
    let second = 26 - i;
    let d1 = 1;
    let d2 = 1;
    for(let j=0; j<4; j++) {
      series.push(getLetter(first) + getLetter(second));
      first += d1; d1++;
      second -= d2; d2++;
    }
    next = getLetter(first) + getLetter(second);
    wrongs = [
      getLetter(first - 1) + getLetter(second),
      getLetter(first) + getLetter(second + 1),
      getLetter(first + d1) + getLetter(second - d2)
    ];
    pat = "First letter jumps +1, +2, +3... Second letter jumps -1, -2, -3...";
    exp = `Step 1: Track the first letters: ${series.map(x=>x[0]).join(', ')}. Differences are +1, +2, +3. Next difference is +4, so ${series[3][0]} + 4 = ${next[0]}. Step 2: Track the second letters: ${series.map(x=>x[1]).join(', ')}. Differences are -1, -2, -3. Next difference is -4, so ${series[3][1]} - 4 = ${next[1]}. Step 3: Combine them: ${next}.`;
  }
  generatedQs.push(createQuestion("Hard", series, next, wrongs, pat, exp));
}

// Ensure unique IDs
generatedQs.forEach((q, idx) => {
  q.id = `LETTER_SERIES_${String(idx + 1).padStart(3, '0')}`;
});

fs.writeFileSync('public/data/logical-reasoning/series/letter-series.json', JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
