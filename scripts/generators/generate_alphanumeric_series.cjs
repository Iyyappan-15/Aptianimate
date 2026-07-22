const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ALPHANUMERIC_SERIES_${num}`;
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
    subtopic: "Alphanumeric Series",
    difficulty: difficulty,
    question: qText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    pattern: patternText,
    explanation: expText,
    shortcut: shortcutText || "Break the alphanumeric term into two separate series (one for letters, one for numbers) and solve them independently.",
    commonMistake: mistakeText || "Trying to relate the number directly to the letter within the same term when they actually form two independent series.",
    estimatedTime: estTime,
    keywords: ["series", "logical reasoning", "alphanumeric series", "alphabet", "numbers"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getLetter(pos) {
  let p = (pos - 1) % 26;
  if (p < 0) p += 26;
  return alpha[p];
}

function getPos(letter) {
  return alpha.indexOf(letter) + 1;
}

let generatedQs = [];

// EASY: 40 questions
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let series = [];
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Constant jumps for both letter and number: A1, B3, C5, D7...
    let l_start = (i % 5) + 1;
    let n_start = (i % 10) + 1;
    let l_jump = (i % 2) + 1;
    let n_jump = (i % 3) + 2;
    for(let j=0; j<4; j++) series.push(`${getLetter(l_start + j * l_jump)}${n_start + j * n_jump}`);
    next = `${getLetter(l_start + 4 * l_jump)}${n_start + 4 * n_jump}`;
    wrongs = [
      `${getLetter(l_start + 4 * l_jump)}${n_start + 4 * n_jump + 1}`,
      `${getLetter(l_start + 4 * l_jump + 1)}${n_start + 4 * n_jump}`,
      `${getLetter(l_start + 4 * l_jump - 1)}${n_start + 4 * n_jump}`
    ];
    pat = `Letters jump by +${l_jump}, Numbers jump by +${n_jump}`;
    exp = `Step 1: Separate into letter and number series. Letters: ${series.map(x=>x.match(/[A-Z]+/)[0]).join(', ')} (+${l_jump}). Numbers: ${series.map(x=>x.match(/[0-9]+/)[0]).join(', ')} (+${n_jump}). Step 2: Next letter is ${getLetter(l_start + 4 * l_jump)}. Step 3: Next number is ${n_start + 4 * n_jump}. Combined: ${next}.`;
  } else if (type === 1) {
    // Number in middle: A1B, C3D, E5F...
    let l_start = (i % 4) + 1;
    let n_start = (i % 5) + 2;
    let l_jump = 2;
    let n_jump = 3;
    for(let j=0; j<4; j++) {
      let l1 = getLetter(l_start + j * l_jump);
      let l2 = getLetter(l_start + j * l_jump + 1);
      let num = n_start + j * n_jump;
      series.push(`${l1}${num}${l2}`);
    }
    let n_l1 = getLetter(l_start + 4 * l_jump);
    let n_l2 = getLetter(l_start + 4 * l_jump + 1);
    let n_num = n_start + 4 * n_jump;
    next = `${n_l1}${n_num}${n_l2}`;
    wrongs = [
      `${n_l1}${n_num + 1}${n_l2}`,
      `${getLetter(l_start + 4 * l_jump + 1)}${n_num}${n_l2}`,
      `${n_l1}${n_num}${getLetter(l_start + 4 * l_jump + 2)}`
    ];
    pat = `First letter jumps by +2, second letter is consecutive to first, middle number jumps by +3`;
    exp = `Step 1: First letters are ${series.map(x=>x[0]).join(', ')} (+2 jump). Next is ${n_l1}. Step 2: Last letters are consecutive to the first letters. Next is ${n_l2}. Step 3: Middle numbers are ${series.map(x=>x.match(/[0-9]+/)[0]).join(', ')} (+3 jump). Next is ${n_num}. Combined: ${next}.`;
  } else if (type === 2) {
    // Letter and Number product: Number is position of Letter: A1, B2, C3, D4
    let l_start = (i % 15) + 1;
    for(let j=0; j<4; j++) series.push(`${getLetter(l_start + j)}${l_start + j}`);
    next = `${getLetter(l_start + 4)}${l_start + 4}`;
    wrongs = [
      `${getLetter(l_start + 4)}${l_start + 5}`,
      `${getLetter(l_start + 5)}${l_start + 4}`,
      `${getLetter(l_start + 4)}${l_start + 3}`
    ];
    pat = `The number is the alphabetical position of the letter`;
    exp = `Step 1: Observe that the number attached to each letter is exactly its position in the English alphabet (e.g., A=1, B=2). Step 2: The letters follow a simple consecutive sequence: ${series.map(x=>x[0]).join(', ')}. Next is ${getLetter(l_start + 4)}. Step 3: Its position is ${l_start + 4}. Combined: ${next}.`;
  } else {
    // Letters skip backwards, Numbers skip forward: Z1, Y2, X3...
    let l_start = 26 - (i % 5);
    let n_start = (i % 10) * 2;
    let l_jump = -1;
    let n_jump = 2;
    for(let j=0; j<4; j++) series.push(`${getLetter(l_start + j * l_jump)}${n_start + j * n_jump}`);
    next = `${getLetter(l_start + 4 * l_jump)}${n_start + 4 * n_jump}`;
    wrongs = [
      `${getLetter(l_start + 4 * l_jump)}${n_start + 4 * n_jump + 1}`,
      `${getLetter(l_start + 4 * l_jump - 1)}${n_start + 4 * n_jump}`,
      `${getLetter(l_start + 4 * l_jump + 1)}${n_start + 4 * n_jump - 2}`
    ];
    pat = `Letters go backwards by 1, numbers increase by 2`;
    exp = `Step 1: Letters sequence: ${series.map(x=>x[0]).join(', ')} (going backward). Next letter is ${getLetter(l_start + 4 * l_jump)}. Step 2: Numbers sequence: ${series.map(x=>x.match(/[0-9]+/)[0]).join(', ')} (+2 jump). Next number is ${n_start + 4 * n_jump}. Combined: ${next}.`;
  }
  generatedQs.push(createQuestion("Easy", series, next, wrongs, pat, exp));
}

// MEDIUM: 40 questions
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let series = [];
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Increasing jump for both: A1, C4, F9, J16 (Number is perfect square, letter jumps +2, +3, +4)
    let current_l = (i % 5) + 1;
    let current_n = 1;
    let l_jump = 2;
    for(let j=0; j<4; j++) {
      series.push(`${getLetter(current_l)}${current_n * current_n}`);
      current_l += l_jump;
      l_jump++;
      current_n++;
    }
    next = `${getLetter(current_l)}${current_n * current_n}`;
    wrongs = [
      `${getLetter(current_l)}${(current_n-1)*(current_n-1) + 2}`,
      `${getLetter(current_l + 1)}${current_n * current_n}`,
      `${getLetter(current_l - 1)}${current_n * current_n}`
    ];
    pat = `Letters jump by +2, +3, +4... Numbers are consecutive perfect squares`;
    exp = `Step 1: Letters: ${series.map(x=>x[0]).join(', ')}. The differences are +2, +3, +4. Next jump is +5. ${series[3][0]} + 5 = ${next[0]}. Step 2: Numbers: ${series.map(x=>x.match(/[0-9]+/)[0]).join(', ')}. These are squares of 1, 2, 3, 4. Next is 5 squared = 25. Combined: ${next}.`;
  } else if (type === 1) {
    // Number is sum of letter positions: AB3, CD7, EF11
    let start = (i % 5) + 1;
    let jump = 2;
    for(let j=0; j<4; j++) {
      let l1 = getLetter(start + j * jump);
      let l2 = getLetter(start + j * jump + 1);
      let sum = getPos(l1) + getPos(l2);
      series.push(`${l1}${l2}${sum}`);
    }
    let n_l1 = getLetter(start + 4 * jump);
    let n_l2 = getLetter(start + 4 * jump + 1);
    let n_sum = getPos(n_l1) + getPos(n_l2);
    next = `${n_l1}${n_l2}${n_sum}`;
    wrongs = [
      `${n_l1}${n_l2}${n_sum + 1}`,
      `${getLetter(start + 4 * jump + 1)}${n_l2}${n_sum}`,
      `${n_l1}${n_l2}${n_sum - 1}`
    ];
    pat = `Two letters jumping by +2 pairs, the number is the sum of their alphabetical positions`;
    exp = `Step 1: Letters progress in pairs skipping 0 letters (AB, CD, EF...). Next pair is ${n_l1}${n_l2}. Step 2: The number attached is the sum of their alphabetical positions. For ${series[0].slice(0,2)}, ${getPos(series[0][0])}+${getPos(series[0][1])}=${series[0].match(/[0-9]+/)[0]}. For ${n_l1}${n_l2}, ${getPos(n_l1)}+${getPos(n_l2)}=${n_sum}. Combined: ${next}.`;
  } else if (type === 2) {
    // Alternating alphanumeric: A1, 2B, C3, 4D
    let start_l = (i % 5) + 1;
    let start_n = (i % 10) + 1;
    for(let j=0; j<5; j++) {
      if (j % 2 === 0) series.push(`${getLetter(start_l + j)}${start_n + j}`);
      else series.push(`${start_n + j}${getLetter(start_l + j)}`);
    }
    next = `${start_n + 5}${getLetter(start_l + 5)}`; // 6th term (index 5) is odd, so number first
    wrongs = [
      `${getLetter(start_l + 5)}${start_n + 5}`, // wrong order
      `${start_n + 6}${getLetter(start_l + 5)}`,
      `${start_n + 5}${getLetter(start_l + 6)}`
    ];
    pat = `Letters and numbers increase by 1, but their order swaps every alternating term`;
    exp = `Step 1: Letters sequence: ${series.map(x=>x.match(/[A-Z]/)[0]).join(', ')} (+1 jump). Next is ${getLetter(start_l + 5)}. Step 2: Numbers sequence: ${series.map(x=>x.match(/[0-9]+/)[0]).join(', ')} (+1 jump). Next is ${start_n + 5}. Step 3: Notice the pattern of Letter-Number, Number-Letter. The 6th term must follow Number-Letter order. Combined: ${next}.`;
  } else {
    // Letter Number Letter, Number is product: A2B, B6C, C12D
    let start = (i % 10) + 1;
    for(let j=0; j<4; j++) {
      let l1 = getLetter(start + j);
      let l2 = getLetter(start + j + 1);
      let prod = getPos(l1) * getPos(l2);
      series.push(`${l1}${prod}${l2}`);
    }
    let n_l1 = getLetter(start + 4);
    let n_l2 = getLetter(start + 4 + 1);
    let n_prod = getPos(n_l1) * getPos(n_l2);
    next = `${n_l1}${n_prod}${n_l2}`;
    wrongs = [
      `${n_l1}${n_prod + getPos(n_l1)}${n_l2}`,
      `${n_l1}${n_prod - 1}${n_l2}`,
      `${getLetter(start + 5)}${n_prod}${n_l2}`
    ];
    pat = `Two consecutive letters with a number in between equal to the product of their alphabetical positions`;
    exp = `Step 1: The outer letters are consecutive (A_B, B_C, C_D). The next will be ${n_l1}_${n_l2}. Step 2: The middle number is the product of their positions. For ${series[0]}, ${getPos(series[0][0])} * ${getPos(series[0][series[0].length-1])} = ${series[0].match(/[0-9]+/)[0]}. For ${n_l1} and ${n_l2}, ${getPos(n_l1)} * ${getPos(n_l2)} = ${n_prod}. Combined: ${next}.`;
  }
  generatedQs.push(createQuestion("Medium", series, next, wrongs, pat, exp));
}

// HARD: 20 questions
for (let i = 0; i < 20; i++) {
  let type = i % 2;
  let series = [];
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // 3 components: L1 jumps +2, L2 jumps -1, Num multiplies by 2: A2Z, C4Y, E8X
    let l1_start = (i % 5) + 1;
    let l2_start = 26 - (i % 5);
    let num_start = (i % 3) + 2;
    let curr_num = num_start;
    for(let j=0; j<4; j++) {
      series.push(`${getLetter(l1_start + j * 2)}${curr_num}${getLetter(l2_start - j)}`);
      curr_num *= 2;
    }
    next = `${getLetter(l1_start + 4 * 2)}${curr_num}${getLetter(l2_start - 4)}`;
    wrongs = [
      `${getLetter(l1_start + 4 * 2)}${curr_num + num_start}${getLetter(l2_start - 4)}`,
      `${getLetter(l1_start + 4 * 2)}${curr_num}${getLetter(l2_start - 3)}`,
      `${getLetter(l1_start + 4 * 2 - 1)}${curr_num}${getLetter(l2_start - 4)}`
    ];
    pat = `First letter +2, second letter -1, middle number multiplied by 2`;
    exp = `Step 1: Split into 3 independent series. First letters: ${series.map(x=>x[0]).join(', ')} (+2). Next is ${next[0]}. Step 2: Last letters: ${series.map(x=>x[x.length-1]).join(', ')} (-1). Next is ${next[next.length-1]}. Step 3: Numbers: ${series.map(x=>x.match(/[0-9]+/)[0]).join(', ')} (x2). Next is ${curr_num}. Combined: ${next}.`;
  } else {
    // Fibonacci numbers with alternating opposite letters: 1A, 1Z, 2B, 3Y, 5C, 8X
    let fib = [1, 1, 2, 3, 5, 8, 13, 21, 34];
    let l_fwd = (i % 3) + 1;
    let l_bwd = 26 - (i % 3);
    for(let j=0; j<6; j++) {
      if (j % 2 === 0) {
        series.push(`${fib[j]}${getLetter(l_fwd)}`);
        l_fwd++;
      } else {
        series.push(`${fib[j]}${getLetter(l_bwd)}`);
        l_bwd--;
      }
    }
    next = `${fib[6]}${getLetter(l_fwd)}`; // 7th term follows the fwd letter pattern
    wrongs = [
      `${fib[6]}${getLetter(l_bwd)}`, // wrong letter sequence
      `${fib[5] + 3}${getLetter(l_fwd)}`, // wrong number
      `${fib[6]}${getLetter(l_fwd + 1)}`
    ];
    pat = `Numbers follow Fibonacci sequence, letters alternate between a forward and backward sequence`;
    exp = `Step 1: The numbers form the Fibonacci sequence: ${fib.slice(0,6).join(', ')}. The next number is 5+8 = 13. Step 2: The letters alternate between two series. Odd terms: ${series.filter((_,idx)=>idx%2===0).map(x=>x.match(/[A-Z]/)[0]).join(', ')} (+1). Even terms: ${series.filter((_,idx)=>idx%2!==0).map(x=>x.match(/[A-Z]/)[0]).join(', ')} (-1). Step 3: The missing 7th term belongs to the odd series, so the next letter is ${getLetter(l_fwd)}. Combined: ${next}.`;
  }
  generatedQs.push(createQuestion("Hard", series, next, wrongs, pat, exp));
}

// Ensure unique IDs
generatedQs.forEach((q, idx) => {
  q.id = `ALPHANUMERIC_SERIES_${String(idx + 1).padStart(3, '0')}`;
});

fs.writeFileSync('public/data/logical-reasoning/series/alphanumeric-series.json', JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
