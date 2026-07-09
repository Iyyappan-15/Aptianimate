const fs = require('fs');
const path = require('path');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `CODING_DECODING_${num}`;
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

function createQuestion(difficulty, questionText, nextVal, wrongVals, patternText, expText, shortcutText, mistakeText) {
  const { options, correctIndex } = shuffleOptions(nextVal, wrongVals);
  
  let estTime = "30 sec";
  if (difficulty === "Medium") estTime = "45 sec";
  if (difficulty === "Hard") estTime = "90 sec";
  
  const letters = ["A", "B", "C", "D"];
  
  return {
    id: getId(),
    topic: "Logical Reasoning",
    subtopic: "Coding-Decoding",
    difficulty: difficulty,
    question: questionText,
    options: options,
    correctAnswer: letters[correctIndex],
    answer: String(nextVal),
    pattern: patternText,
    explanation: expText,
    shortcut: shortcutText || "Memorize the numerical positions of the alphabet forward (A=1...Z=26) and backward.",
    commonMistake: mistakeText || "Applying the rule in reverse or missing alternating shifts (e.g., +1, -1).",
    estimatedTime: estTime,
    keywords: ["coding", "logical reasoning", "decoding", "alphabet"],
    tags: ["placement", "logical reasoning"],
    visualizeAvailable: true
  };
}

const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getLetter(pos) {
  let p = ((pos - 1) % 26);
  if (p < 0) p += 26;
  return alpha[p];
}

function getPos(letter) {
  return alpha.indexOf(letter) + 1;
}

function applyShift(word, shiftArray) {
  let res = "";
  for(let i=0; i<word.length; i++) {
    let p = getPos(word[i]);
    res += getLetter(p + shiftArray[i % shiftArray.length]);
  }
  return res;
}

function reverseWord(word) {
  return word.split('').reverse().join('');
}

const words = [
  "CAT", "DOG", "BAT", "RAT", "SUN", "MOON", "STAR", "FISH", "BIRD", "TREE", 
  "APPLE", "MANGO", "WATER", "FIRE", "EARTH", "TRAIN", "PLANE", "RIVER", "OCEAN",
  "TIGER", "LION", "HORSE", "ZEBRA", "SNAKE", "MOUSE", "EAGLE", "SMART", "BRAIN",
  "LOGIC", "POWER", "LIGHT", "SOUND", "MAGIC", "MUSIC", "DANCE", "CLOCK", "WATCH"
];
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

let generatedQs = [];

// EASY: 40 questions
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let word1 = getRandomWord();
  let word2 = getRandomWord();
  while(word1 === word2) word2 = getRandomWord();
  
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Constant shift (+1 or +2)
    let shift = (i % 3) + 1;
    let code1 = applyShift(word1, [shift]);
    let code2 = applyShift(word2, [shift]);
    qText = `If in a certain code language ${word1} is written as ${code1}, how will ${word2} be written in that language?`;
    next = code2;
    wrongs = [applyShift(word2, [shift+1]), applyShift(word2, [shift-1]), applyShift(word2, [shift, -shift])];
    pat = `Each letter shifted by +${shift}`;
    exp = `Step 1: Identify the rule in ${word1} -> ${code1}. Each letter is shifted forward by ${shift} places in the alphabet. Step 2: Apply the rule to ${word2}. Step 3: ${word2.split('').map(c=>`${c}+${shift}=${getLetter(getPos(c)+shift)}`).join(', ')}. Final Answer: ${next}.`;
  } else if (type === 1) {
    // Backward shift (-1 or -2)
    let shift = -((i % 3) + 1);
    let code1 = applyShift(word1, [shift]);
    let code2 = applyShift(word2, [shift]);
    qText = `If in a certain code language ${word1} is written as ${code1}, how will ${word2} be written in that language?`;
    next = code2;
    wrongs = [applyShift(word2, [shift-1]), applyShift(word2, [shift+1]), applyShift(word2, [shift, -shift])];
    pat = `Each letter shifted by ${shift}`;
    exp = `Step 1: Identify the rule in ${word1} -> ${code1}. Each letter is shifted backward by ${Math.abs(shift)} places in the alphabet. Step 2: Apply the rule to ${word2}. Step 3: ${word2.split('').map(c=>`${c}${shift}=${getLetter(getPos(c)+shift)}`).join(', ')}. Final Answer: ${next}.`;
  } else if (type === 2) {
    // Reverse word
    let code1 = reverseWord(word1);
    let code2 = reverseWord(word2);
    qText = `If ${word1} is coded as ${code1}, how is ${word2} coded?`;
    next = code2;
    wrongs = [code2.substring(1) + code2[0], applyShift(word2, [1]), reverseWord(applyShift(word2, [1]))];
    pat = `The word is written in reverse order`;
    exp = `Step 1: Identify the rule. ${word1} is completely reversed to form ${code1}. Step 2: Apply the rule to ${word2}. Step 3: Reversing ${word2} gives ${next}. Final Answer: ${next}.`;
  } else {
    // Sum of positions
    let sum1 = word1.split('').reduce((acc, c) => acc + getPos(c), 0);
    let sum2 = word2.split('').reduce((acc, c) => acc + getPos(c), 0);
    qText = `If ${word1} is coded as ${sum1}, then what is the code for ${word2}?`;
    next = sum2;
    wrongs = [sum2 + 1, sum2 - 1, sum2 + word2.length];
    pat = `The sum of the numerical position values of all letters`;
    exp = `Step 1: Assign position values to letters. For ${word1}: ${word1.split('').map(c=>`${c}=${getPos(c)}`).join(', ')}. Their sum is ${sum1}. Step 2: Apply the rule to ${word2}. Step 3: For ${word2}: ${word2.split('').map(c=>`${c}=${getPos(c)}`).join(', ')}. Sum = ${sum2}. Final Answer: ${next}.`;
  }
  generatedQs.push(createQuestion("Easy", qText, next, wrongs, pat, exp));
}

// MEDIUM: 40 questions
for (let i = 0; i < 40; i++) {
  let type = i % 4;
  let word1 = getRandomWord();
  let word2 = getRandomWord();
  while(word1 === word2 || word1.length !== word2.length) word2 = getRandomWord();
  
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Alternating shift (+1, -1)
    let shifts = [1, -1];
    if (i % 2 === 0) shifts = [2, -2];
    let code1 = applyShift(word1, shifts);
    let code2 = applyShift(word2, shifts);
    qText = `If ${word1} is coded as ${code1}, how will ${word2} be coded?`;
    next = code2;
    wrongs = [applyShift(word2, [-shifts[0], -shifts[1]]), applyShift(word2, [shifts[0]]), applyShift(word2, [shifts[0]+1, shifts[1]-1])];
    pat = `Alternating shift of +${shifts[0]} and ${shifts[1]}`;
    exp = `Step 1: Check letter by letter. 1st letter: ${word1[0]} -> ${code1[0]} (+${shifts[0]}). 2nd letter: ${word1[1]} -> ${code1[1]} (${shifts[1]}). The pattern is alternating. Step 2: Apply to ${word2}. Step 3: ${word2[0]} + ${shifts[0]} = ${code2[0]}, ${word2[1]} ${shifts[1]} = ${code2[1]}, etc. Final Answer: ${next}.`;
  } else if (type === 1) {
    // Increasing shift (+1, +2, +3)
    let shifts = [];
    for(let j=0; j<word1.length; j++) shifts.push(j+1);
    let code1 = applyShift(word1, shifts);
    let code2 = applyShift(word2, shifts);
    qText = `If ${word1} is coded as ${code1}, how is ${word2} coded?`;
    next = code2;
    wrongs = [applyShift(word2, shifts.map(x=>x+1)), applyShift(word2, shifts.map(x=>1)), applyShift(word2, shifts.map((x,idx)=>shifts[shifts.length-1-idx]))];
    pat = `Letters are shifted by increasing amounts: +1, +2, +3...`;
    exp = `Step 1: Compare ${word1} and ${code1}. ${word1[0]}->${code1[0]} (+1), ${word1[1]}->${code1[1]} (+2), ${word1[2]}->${code1[2]} (+3). The shift increases by 1 each time. Step 2: Apply to ${word2}. Step 3: ${word2[0]}+1=${code2[0]}, ${word2[1]}+2=${code2[1]}, etc. Final Answer: ${next}.`;
  } else if (type === 2) {
    // Opposite letters
    let opp = (w) => w.split('').map(c => getLetter(27 - getPos(c))).join('');
    let code1 = opp(word1);
    let code2 = opp(word2);
    qText = `If ${word1} is coded as ${code1}, what is the code for ${word2}?`;
    next = code2;
    wrongs = [applyShift(word2, [1]), applyShift(code2, [1]), applyShift(code2, [-1])];
    pat = `Each letter is replaced by its opposite letter in the alphabet`;
    exp = `Step 1: Observe ${word1} -> ${code1}. Sum of positions of corresponding letters is always 27 (e.g., A=1, Z=26, 1+26=27). They are opposite letters. Step 2: Apply to ${word2}. Step 3: Find opposite of each letter. Final Answer: ${next}.`;
  } else {
    // Vowels to next vowel, Consonants +1
    let nextVowel = (c) => {
      const v = ["A", "E", "I", "O", "U"];
      let idx = v.indexOf(c);
      if (idx !== -1) return v[(idx + 1) % 5];
      return getLetter(getPos(c) + 1);
    };
    let encodeV = (w) => w.split('').map(nextVowel).join('');
    let code1 = encodeV(word1);
    let code2 = encodeV(word2);
    qText = `In a certain code, ${word1} is written as ${code1}. How is ${word2} written in that code?`;
    next = code2;
    wrongs = [applyShift(word2, [1]), encodeV(applyShift(word2, [1])), applyShift(word2, [2])];
    pat = `Vowels shift to the next vowel, consonants shift +1`;
    exp = `Step 1: Analyze ${word1} -> ${code1}. Consonants are shifted by +1. Vowels are replaced by the next vowel in the sequence A, E, I, O, U. Step 2: Apply to ${word2}. Step 3: Convert vowels to next vowel and consonants +1. Final Answer: ${next}.`;
  }
  generatedQs.push(createQuestion("Medium", qText, next, wrongs, pat, exp));
}

// HARD: 20 questions
for (let i = 0; i < 20; i++) {
  let type = i % 2;
  let word1 = getRandomWord();
  let word2 = getRandomWord();
  while(word1 === word2 || word1.length !== word2.length) word2 = getRandomWord();
  
  let qText = "";
  let next = "";
  let wrongs = [];
  let pat = "";
  let exp = "";
  
  if (type === 0) {
    // Cross coding (reverse + shift)
    let shift = (i % 2) + 1;
    let encode = (w) => applyShift(reverseWord(w), [shift]);
    let code1 = encode(word1);
    let code2 = encode(word2);
    qText = `If ${word1} is coded as ${code1}, how is ${word2} coded?`;
    next = code2;
    wrongs = [applyShift(word2, [shift]), reverseWord(word2), applyShift(reverseWord(word2), [-shift])];
    pat = `The word is reversed, then each letter shifted by +${shift}`;
    exp = `Step 1: Notice that a direct shift doesn't work. Try reversing ${word1} to get ${reverseWord(word1)}. Step 2: Compare ${reverseWord(word1)} to ${code1}. Each letter is shifted +${shift}. Rule: Reverse then +${shift}. Step 3: Apply to ${word2}. Reverse: ${reverseWord(word2)}. Shift +${shift}: ${next}. Final Answer: ${next}.`;
  } else {
    // Split into halves, reverse each half, then +1
    let encode = (w) => {
      let mid = Math.floor(w.length / 2);
      let left = reverseWord(w.substring(0, mid));
      let right = reverseWord(w.substring(mid));
      return applyShift(left + right, [1]);
    };
    // Ensure word lengths are > 3
    while(word1.length < 4) word1 = getRandomWord();
    while(word2.length !== word1.length) word2 = getRandomWord();
    
    let code1 = encode(word1);
    let code2 = encode(word2);
    qText = `If in a code language ${word1} is written as ${code1}, what is the code for ${word2}?`;
    next = code2;
    wrongs = [applyShift(reverseWord(word2), [1]), applyShift(word2, [1]), encode(applyShift(word2, [1]))];
    pat = `Word split in half, both halves reversed, then each letter shifted +1`;
    exp = `Step 1: The word ${word1} is split in half. Both halves are reversed. Step 2: Then +1 shift is applied to all letters to get ${code1}. Step 3: Apply to ${word2}. Split in half, reverse each half, then add +1. Final Answer: ${next}.`;
  }
  generatedQs.push(createQuestion("Hard", qText, next, wrongs, pat, exp));
}

const dir = path.join(process.cwd(), 'public/data/logical-reasoning/logical-relations');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

fs.writeFileSync(path.join(dir, 'coding-decoding.json'), JSON.stringify(generatedQs, null, 2));

console.log('Total:', generatedQs.length);
console.log('Easy:', generatedQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', generatedQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', generatedQs.filter(x=>x.difficulty==='Hard').length);
