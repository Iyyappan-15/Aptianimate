const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ADV_PNC_${num}`;
}

function shuffleOptions(correctAnswerText, otherOptions) {
  const options = [String(correctAnswerText), ...otherOptions.map(String)];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  const correctIndex = options.indexOf(String(correctAnswerText));
  return { options, correctIndex };
}

// Math Helpers
function fact(n) {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

function nPr(n, r) {
  if (r > n) return 0;
  return fact(n) / fact(n - r);
}

function nCr(n, r) {
  if (r > n) return 0;
  if (r === 0 || r === n) return 1;
  if (r > n / 2) r = n - r;
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res *= (n - i + 1);
    res /= i;
  }
  return res;
}

function createQuestion(subtopic, difficulty, qText, correctAnsText, wrongOpts, explanation, shortcut, commonMistake, tags) {
  const slicedWrongs = wrongOpts.slice(0, 3);
  const { options, correctIndex } = shuffleOptions(correctAnsText, slicedWrongs);
  let estTime = "45 sec";
  if (difficulty === "Medium") estTime = "90 sec";
  if (difficulty === "Hard") estTime = "120 sec";
  
  return {
    id: getId(),
    topic: "Advanced Aptitude",
    subtopic: subtopic,
    difficulty: difficulty,
    question: qText,
    options: options,
    correctAnswer: correctIndex,
    answer: String(correctAnsText),
    explanation: explanation,
    shortcut: shortcut || "Identify if order matters (Permutation) or does not matter (Combination).",
    commonMistake: commonMistake || "Confusing permutation (arrangements) with combination (selections).",
    estimatedTime: estTime,
    keywords: ["permutation", "combination", "pnc", subtopic.toLowerCase()],
    tags: ["placement", "quantitative aptitude", "advanced aptitude", ...tags],
    visualizeAvailable: true
  };
}

// --- 1. Combinations (Selection) (Easy: 10, Medium: 10, Hard: 5) ---
for(let i = 0; i < 10; i++) {
  const n = i + 5; // 5 to 14
  const r = (i % 3) + 2; // 2, 3, 4
  const ans = nCr(n, r);
  questions.push(createQuestion(
    "Combinations", "Easy",
    `In how many ways can a committee of ${r} members be selected from a group of ${n} people?`,
    ans, [ans + 10, ans - n, ans + n],
    `This is a selection problem (order does not matter). Use combination formula nCr = n! / (r! * (n-r)!). Here n = ${n}, r = ${r}. ${n}C${r} = ${ans}.`,
    `nCr formula.`,
    `Using nPr (permutations) instead of nCr.`,
    ["selection", "committee"]
  ));
}

for(let i = 0; i < 10; i++) {
  const men = i + 4; // 4 to 13
  const women = i + 3; // 3 to 12
  const ans = nCr(men, 2) * nCr(women, 2);
  questions.push(createQuestion(
    "Combinations", "Medium",
    `In how many ways can a committee of 4 people be chosen from ${men} men and ${women} women if it must contain exactly 2 men and 2 women?`,
    ans, [ans + 20, ans - 12, ans + men*women],
    `Select 2 men from ${men}: ${men}C2 = ${nCr(men, 2)}. Select 2 women from ${women}: ${women}C2 = ${nCr(women, 2)}. Total ways = ${nCr(men, 2)} * ${nCr(women, 2)} = ${ans}.`,
    `AND condition means multiply: nC2 * mC2.`,
    `Adding the combinations instead of multiplying them.`,
    ["selection", "committee", "conditional"]
  ));
}

for(let i = 0; i < 5; i++) {
  const total = 10 + i;
  // committee of 4, at least 1 woman. Say 4 women, (total-4) men.
  const women = 4;
  const men = total - 4;
  // Total ways without restriction = total C 4
  // Ways with NO women (only men) = men C 4
  // At least 1 woman = Total ways - Ways with NO women
  const totalWays = nCr(total, 4);
  const noWomen = nCr(men, 4);
  const ans = totalWays - noWomen;
  questions.push(createQuestion(
    "Combinations", "Hard",
    `A group consists of ${men} men and ${women} women. In how many ways can a committee of 4 be formed such that it contains at least one woman?`,
    ans, [ans + 15, totalWays, noWomen],
    `'At least one woman' = (Total ways to form committee) - (Ways to form committee with NO women). Total ways to select 4 from ${total} is ${total}C4 = ${totalWays}. Ways to select 4 from ${men} men is ${men}C4 = ${noWomen}. Answer = ${totalWays} - ${noWomen} = ${ans}.`,
    `At least one = Total - None.`,
    `Manually calculating 1W3M + 2W2M + 3W1M + 4W and making a calculation error.`,
    ["selection", "at least one", "complement"]
  ));
}

// --- 2. Word Arrangements (Permutations) (Easy: 10, Medium: 10, Hard: 5) ---
const easyWords = ["CAT", "MATH", "LOGIC", "PAPER", "BOTTLE", "CUP", "BAG", "PENCIL", "LAPTOP", "DESK"];
for(let i = 0; i < 10; i++) {
  const word = easyWords[i];
  let freqs = {};
  for(let char of word) freqs[char] = (freqs[char] || 0) + 1;
  let ans = fact(word.length);
  for(let char in freqs) {
    if(freqs[char] > 1) ans /= fact(freqs[char]);
  }
  questions.push(createQuestion(
    "Word Arrangements", "Easy",
    `In how many different ways can the letters of the word '${word}' be arranged?`,
    ans, [ans - 2, ans + 4, ans * 2],
    `The word '${word}' has ${word.length} letters. Calculate factorial of total letters, then divide by factorial of repeated letters. Total ways = ${word.length}! / (repeated letters factorial) = ${ans}.`,
    `n! / (p! * q!) where n is total letters and p, q are repeating letter counts.`,
    `Forgetting to divide by the factorial of repeating letters.`,
    ["word arrangement", "anagrams"]
  ));
}

const vowelWords = ["EQUATION", "MACHINE", "COMPUTER", "PROBLEM", "SOLUTION", "ARTICLE", "DIAGRAM", "SECTION", "LIBRARY", "STUDENT"];
for(let i = 0; i < 10; i++) {
  const word = vowelWords[i];
  const vowels = word.split('').filter(c => 'AEIOU'.includes(c));
  const cons = word.split('').filter(c => !'AEIOU'.includes(c));
  // Treat all vowels as one entity. Entities = cons.length + 1
  let entityArrangements = fact(cons.length + 1);
  let vowelArrangements = fact(vowels.length);
  // Need to account for repeating letters in the whole word, but for simplicity in this generated problem
  // we divide by duplicates within vowels and within consonants.
  let vFreqs = {}; for(let c of vowels) vFreqs[c] = (vFreqs[c] || 0) + 1;
  let cFreqs = {}; for(let c of cons) cFreqs[c] = (cFreqs[c] || 0) + 1;
  for(let c in vFreqs) if(vFreqs[c] > 1) vowelArrangements /= fact(vFreqs[c]);
  for(let c in cFreqs) if(cFreqs[c] > 1) entityArrangements /= fact(cFreqs[c]);
  
  const ans = entityArrangements * vowelArrangements;
  
  questions.push(createQuestion(
    "Word Arrangements", "Medium",
    `In how many different ways can the letters of the word '${word}' be arranged such that all the vowels always come together?`,
    ans, [ans / 2, ans * 2, ans + 120],
    `Vowels in '${word}' are [${vowels.join(',')}]. Treat them as a single entity. Number of entities = ${cons.length} consonants + 1 vowel group = ${cons.length + 1}. Arrange entities: ${(cons.length + 1)}!. Arrange vowels internally: ${vowels.length}!. (Divide by any repeating letters). Total ways = ${ans}.`,
    `Treat grouped items as a single unit, then multiply by the internal arrangement of the group.`,
    `Forgetting to arrange the vowels internally.`,
    ["vowels together", "grouping"]
  ));
}

const noTogetherWords = ["CAPITAL", "NATION", "OFFICE", "LEADER", "MARKET"];
for(let i = 0; i < 5; i++) {
  const word = noTogetherWords[i];
  const vowels = word.split('').filter(c => 'AEIOU'.includes(c));
  const cons = word.split('').filter(c => !'AEIOU'.includes(c));
  
  // Total arrangements
  let freqs = {}; for(let char of word) freqs[char] = (freqs[char] || 0) + 1;
  let totalArr = fact(word.length);
  for(let char in freqs) if(freqs[char] > 1) totalArr /= fact(freqs[char]);
  
  // Vowels together arrangements
  let entityArr = fact(cons.length + 1);
  let vowArr = fact(vowels.length);
  let vFreqs = {}; for(let c of vowels) vFreqs[c] = (vFreqs[c] || 0) + 1;
  let cFreqs = {}; for(let c of cons) cFreqs[c] = (cFreqs[c] || 0) + 1;
  for(let c in vFreqs) if(vFreqs[c] > 1) vowArr /= fact(vFreqs[c]);
  for(let c in cFreqs) if(cFreqs[c] > 1) entityArr /= fact(cFreqs[c]);
  
  const togetherArr = entityArr * vowArr;
  const ans = totalArr - togetherArr;

  questions.push(createQuestion(
    "Word Arrangements", "Hard",
    `In how many ways can the letters of the word '${word}' be arranged such that the vowels never come together?`,
    ans, [togetherArr, totalArr, totalArr + togetherArr],
    `First find total arrangements of '${word}' = ${totalArr}. Then find arrangements where vowels ARE together = ${togetherArr}. 'Never together' = Total - 'Always together' = ${totalArr} - ${togetherArr} = ${ans}.`,
    `Never together = Total ways - Always together.`,
    `Trying to calculate 'never together' by placing vowels in gaps (which means no two vowels are together, which is a different question than 'all vowels are not together'). Note: Usually 'vowels never come together' means 'not ALL vowels come together'.`,
    ["vowels never together", "complement"]
  ));
}

// --- 3. Number Formations (Easy: 10, Medium: 10, Hard: 5) ---
for(let i = 0; i < 10; i++) {
  const digits = i + 4; // 4 to 13
  // How many 3-digit numbers can be formed from 'digits' non-zero numbers without repetition
  const ans = nPr(digits, 3);
  questions.push(createQuestion(
    "Number Formations", "Easy",
    `How many 3-digit numbers can be formed using the digits 1 to ${digits} if no digit is repeated?`,
    ans, [ans - digits, Math.pow(digits, 3), ans + 10],
    `We need to select and arrange 3 digits out of ${digits}. This is a permutation problem. ${digits}P3 = ${digits} * ${digits-1} * ${digits-2} = ${ans}.`,
    `nP3 = n * (n-1) * (n-2)`,
    `Using combinations (nCr) instead of permutations, ignoring the order of digits.`,
    ["digits", "without repetition"]
  ));
}

for(let i = 0; i < 10; i++) {
  // How many even 3-digit numbers from 1,2,3,4,5,6 (with restriction)
  // Let's use 1 to N.
  const N = i % 4 + 5; // 5, 6, 7, 8
  const evenCount = Math.floor(N / 2);
  const oddCount = N - evenCount;
  // 3 digit number. Last digit must be even. (evenCount choices)
  // First digit: N-1 choices
  // Second digit: N-2 choices
  const ans = (N - 1) * (N - 2) * evenCount;
  questions.push(createQuestion(
    "Number Formations", "Medium",
    `How many 3-digit even numbers can be formed using the digits 1 to ${N} if no digit is repeated?`,
    ans, [ans + evenCount, ans - evenCount, ans * 2],
    `A number is even if it ends in an even digit. Digits available: 1 to ${N}. Even digits available: ${evenCount}. So, the units place can be filled in ${evenCount} ways. The remaining 2 places can be filled from the remaining ${N-1} digits in ${N-1}P2 ways. Total = ${evenCount} * ${N-1} * ${N-2} = ${ans}.`,
    `Fill the restricted position (units place) first, then fill the rest.`,
    `Filling from left to right and getting stuck at the units place constraint.`,
    ["even numbers", "digit constraints"]
  ));
}

for(let i = 0; i < 5; i++) {
  // 4 digit numbers divisible by 5 from 0,1,2,3,4,5,6,7,8,9 (without repetition)
  // Let's generalize: from 0 to N.
  const N = i + 5; // 0 to 5..9
  // Ends in 0: 1 way for units. First digit: N choices. Second: N-1. Third: N-2. -> 1 * N * (N-1) * (N-2)
  // Ends in 5: 1 way for units. First digit: Cannot be 0, so N-1 choices. Second: N-1. Third: N-2. -> 1 * (N-1) * (N-1) * (N-2)
  const endsIn0 = 1 * N * (N - 1) * (N - 2);
  const endsIn5 = 1 * (N - 1) * (N - 1) * (N - 2);
  const ans = endsIn0 + endsIn5;
  questions.push(createQuestion(
    "Number Formations", "Hard",
    `How many 4-digit numbers divisible by 5 can be formed using the digits 0 to ${N} without repetition?`,
    ans, [ans + 10, endsIn0, endsIn5],
    `A number is divisible by 5 if it ends in 0 or 5. Case 1 (ends in 0): Units place=1 way. Thousands=non-zero from remaining (${N} ways). Hundreds=${N-1}. Tens=${N-2}. Total=${endsIn0}. Case 2 (ends in 5): Units=1 way. Thousands=Cannot be 0 (${N-1} ways). Hundreds=${N-1}. Tens=${N-2}. Total=${endsIn5}. Total = ${endsIn0} + ${endsIn5} = ${ans}.`,
    `Split into two mutually exclusive cases: ending in 0 and ending in 5.`,
    `Forgetting that the first digit cannot be 0 when calculating numbers ending in 5.`,
    ["divisibility", "zero constraint"]
  ));
}

// --- 4. Seating / Circular / Lines (Easy: 10, Medium: 10, Hard: 5) ---
for(let i = 0; i < 10; i++) {
  const n = i + 4; // 4 to 13
  const ans = fact(n - 1);
  questions.push(createQuestion(
    "Circular Permutations", "Easy",
    `In how many ways can ${n} people be seated around a circular table?`,
    ans, [fact(n), ans / 2, ans * 2],
    `For circular permutations of n distinct items, the formula is (n-1)!. Here n=${n}. So, (${n}-1)! = ${n-1}! = ${ans}.`,
    `Circular arrangement of n items = (n-1)!`,
    `Using n! instead of (n-1)!.`,
    ["circular", "seating"]
  ));
}

for(let i = 0; i < 10; i++) {
  const boys = i + 3; // 3 to 12
  const girls = 3;
  // All 3 girls sit together. Treat as 1 entity.
  // Entities = boys + 1 = boys + 1. Arranged in line: (boys+1)!
  // Girls arrange internally: 3! = 6
  const ans = fact(boys + 1) * fact(girls);
  questions.push(createQuestion(
    "Seating Arrangements", "Medium",
    `In how many ways can ${boys} boys and ${girls} girls be seated in a row such that all the girls always sit together?`,
    ans, [fact(boys + girls), ans / 6, fact(boys) * fact(girls)],
    `Treat the ${girls} girls as a single unit. Total units = ${boys} boys + 1 girl-unit = ${boys + 1} units. They can be arranged in (${boys + 1})! ways. The ${girls} girls can arrange among themselves in ${girls}! ways. Total ways = (${boys + 1})! * ${girls}! = ${ans}.`,
    `Group the restricted items into 1 unit, arrange units, then multiply by internal arrangement of the group.`,
    `Forgetting to arrange the girls among themselves.`,
    ["row arrangement", "grouping together"]
  ));
}

for(let i = 0; i < 5; i++) {
  const beads = i + 5; // 5 to 9
  // Circular, reflection allowed (necklace) -> (n-1)! / 2
  const ans = fact(beads - 1) / 2;
  questions.push(createQuestion(
    "Circular Permutations", "Hard",
    `In how many ways can ${beads} different colored beads be strung into a necklace?`,
    ans, [fact(beads - 1), fact(beads) / 2, fact(beads)],
    `For a necklace or garland, clockwise and anti-clockwise arrangements are identical because it can be flipped over. The formula is (n-1)! / 2. Here n=${beads}, so (${beads}-1)! / 2 = ${ans}.`,
    `Necklace arrangement = (n-1)! / 2.`,
    `Forgetting to divide by 2 for reflection symmetry.`,
    ["necklace", "circular symmetry"]
  ));
}

// Current Counts:
// Combinations: 10E, 10M, 5H
// Words: 10E, 10M, 5H
// Numbers: 10E, 10M, 5H
// Seating: 10E, 10M, 5H
// Total: 40 Easy, 40 Medium, 20 Hard. Exactly 100 questions.

const easy = questions.filter(q => q.difficulty === 'Easy').slice(0, 40);
const med = questions.filter(q => q.difficulty === 'Medium').slice(0, 40);
const hard = questions.filter(q => q.difficulty === 'Hard').slice(0, 20);

const finalQs = [...easy, ...med, ...hard];
finalQs.forEach((q, idx) => {
  q.id = `ADV_PNC_${String(idx + 1).padStart(3, '0')}`;
});

fs.writeFileSync('public/data/quantitative-aptitude/advanced-aptitude/permutation-combination.json', JSON.stringify(finalQs, null, 2));

console.log('Total:', finalQs.length);
console.log('Easy:', finalQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', finalQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', finalQs.filter(x=>x.difficulty==='Hard').length);
