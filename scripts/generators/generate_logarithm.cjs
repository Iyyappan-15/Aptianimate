const fs = require('fs');

const questions = [];
let idCounter = 1;

function getId() {
  const num = idCounter.toString().padStart(3, '0');
  idCounter++;
  return `ADV_LOG_${num}`;
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
    shortcut: shortcut || "Use fundamental log laws: log(ab) = log(a)+log(b), log(a/b) = log(a)-log(b), log(a^n) = n*log(a).",
    commonMistake: commonMistake || "Assuming log(a+b) = log(a) + log(b), which is mathematically incorrect.",
    estimatedTime: estTime,
    keywords: ["logarithm", "log laws", subtopic.toLowerCase()],
    tags: ["placement", "quantitative aptitude", "advanced aptitude", ...tags],
    visualizeAvailable: true
  };
}

// --- 1. Logarithm Basics & Definitions (Easy: 10, Medium: 10, Hard: 5) ---
for(let i = 0; i < 10; i++) {
  // log_base(base^p) = p
  const base = i + 2; // 2 to 11
  const power = (i % 4) + 2; // 2 to 5
  const val = Math.pow(base, power);
  
  questions.push(createQuestion(
    "Logarithm Basics", "Easy",
    `What is the value of log base ${base} of ${val}?`, 
    power, [power + 1, power - 1, power * 2],
    `Let x = log base ${base} of ${val}. In exponential form, this means ${base}^x = ${val}. Since ${base}^${power} = ${val}, x = ${power}.`,
    `Convert log form to exponential form: log_b(a) = c implies b^c = a.`,
    `Dividing the number by the base instead of finding the exponent.`,
    ["basics", "exponential form"]
  ));
}

for(let i = 0; i < 10; i++) {
  // log(1 / base^p) = -p
  const base = i + 2; 
  const power = (i % 3) + 2; 
  const val = Math.pow(base, power);
  
  questions.push(createQuestion(
    "Logarithm Basics", "Medium",
    `Evaluate: log base ${base} of (1/${val})`,
    -power, [power, -power - 1, 1/power],
    `We need to find x such that ${base}^x = 1/${val}. We know that ${base}^${power} = ${val}, so ${base}^(-${power}) = 1/${val}. Therefore, the answer is -${power}.`,
    `log(1/x) = -log(x). log_b(1/b^n) = -n.`,
    `Ignoring the negative sign when dealing with fractions.`,
    ["fractions", "negative exponent"]
  ));
}

for(let i = 0; i < 5; i++) {
  // log_a(b) * log_b(c) * log_c(a) = 1
  const a = i + 2;
  const b = i + 3;
  const c = i + 4;
  questions.push(createQuestion(
    "Logarithm Basics", "Hard",
    `Simplify the expression: log base ${a} of ${b} \u00D7 log base ${b} of ${c} \u00D7 log base ${c} of ${a}.`,
    1, [a*b*c, 0, "log(abc)"],
    `Using the change of base formula: log_b(a) = log(a) / log(b). So the expression becomes: (log(${b})/log(${a})) * (log(${c})/log(${b})) * (log(${a})/log(${c})). All terms cancel out, leaving 1.`,
    `Chain rule of logarithms: log_a(b) * log_b(c) = log_a(c). Here it loops back to log_a(a) = 1.`,
    `Multiplying the bases or arguments together directly.`,
    ["change of base", "chain rule"]
  ));
}

// --- 2. Log Laws & Simplification (Easy: 10, Medium: 10, Hard: 5) ---
for(let i = 0; i < 10; i++) {
  // log(a) + log(b) = log(ab)
  const a = i + 2;
  const b = (i * 2) + 3;
  const ab = a * b;
  questions.push(createQuestion(
    "Log Laws", "Easy",
    `Simplify the expression: log(${a}) + log(${b})`,
    `log(${ab})`, [`log(${a + b})`, `log(${a * 2})`, `log(${b - a})`],
    `According to the product rule of logarithms, log(m) + log(n) = log(m \u00D7 n). Therefore, log(${a}) + log(${b}) = log(${a} \u00D7 ${b}) = log(${ab}).`,
    `log(a) + log(b) = log(a*b).`,
    `Adding the arguments: log(a) + log(b) = log(a+b).`,
    ["product rule", "addition"]
  ));
}

for(let i = 0; i < 10; i++) {
  // n*log(a) - log(b) = log(a^n / b)
  const a = i + 2;
  const n = 2; // keep it square
  const b = i + 1;
  const aSq = a * a;
  questions.push(createQuestion(
    "Log Laws", "Medium",
    `Simplify the expression: ${n} log(${a}) - log(${b})`,
    `log(${aSq}/${b})`, [`log(${a * n - b})`, `log(${aSq * b})`, `log(${a}/${b})`],
    `Using the power rule, ${n} log(${a}) = log(${a}^${n}) = log(${aSq}). Then using the quotient rule, log(${aSq}) - log(${b}) = log(${aSq} / ${b}).`,
    `Apply power rule first, then quotient rule.`,
    `Subtracting the numbers before applying the power rule.`,
    ["quotient rule", "power rule"]
  ));
}

for(let i = 0; i < 5; i++) {
  // log(x^2 - y^2) - log(x - y) = log(x + y)
  const x = i + 5;
  const y = i + 2;
  const sum = x + y;
  questions.push(createQuestion(
    "Log Laws", "Hard",
    `If x = ${x} and y = ${y}, evaluate: log(x\u00B2 - y\u00B2) - log(x - y).`,
    `log(${sum})`, [`log(${x - y})`, `log(${x*x + y*y})`, `log(${x*y})`],
    `We know that x\u00B2 - y\u00B2 = (x - y)(x + y). According to quotient rule, log(x\u00B2 - y\u00B2) - log(x - y) = log( (x\u00B2 - y\u00B2) / (x - y) ) = log(x + y). Substituting the values, log(${x} + ${y}) = log(${sum}).`,
    `Algebraic identities mixed with log quotient rule simplifies to log(x+y).`,
    `Evaluating the squares first and making a calculation error instead of simplifying algebraically.`,
    ["algebraic identity", "quotient rule"]
  ));
}

// --- 3. Solving Log Equations (Easy: 10, Medium: 10, Hard: 5) ---
for(let i = 0; i < 10; i++) {
  // log_base(x) = p => x = base^p
  const base = (i % 4) + 2; // 2, 3, 4, 5
  const p = (i % 3) + 2; // 2, 3, 4
  const ans = Math.pow(base, p);
  questions.push(createQuestion(
    "Solving Equations", "Easy",
    `Solve for x: log base ${base} of x = ${p}`,
    ans, [ans + base, ans - p, p * base],
    `Convert the logarithmic equation into an exponential equation: if log_b(x) = y, then x = b^y. Here, x = ${base}^${p}. So, x = ${ans}.`,
    `x = base^exponent.`,
    `Multiplying the base and the exponent instead of raising to the power.`,
    ["equation", "exponential form"]
  ));
}

for(let i = 0; i < 10; i++) {
  // log(x) + log(x-a) = log(b)
  // x(x-a) = b. Let's build it backwards.
  // We want positive roots. Let x = i + 4;
  const x = i + 4; 
  const a = 2; 
  const b = x * (x - a);
  questions.push(createQuestion(
    "Solving Equations", "Medium",
    `Solve for x: log(x) + log(x - ${a}) = log(${b})`,
    x, [x + 2, x - 1, -x + a],
    `Using the product rule, log(x(x - ${a})) = log(${b}). Since the bases are the same, x(x - ${a}) = ${b}. This simplifies to the quadratic equation x\u00B2 - ${a}x - ${b} = 0. Factoring gives (x - ${x})(x + ${x-a}) = 0. x = ${x} or x = -${x-a}. Since log of a negative number is undefined, x must be ${x}.`,
    `Combine logs using product rule, drop logs, solve quadratic, reject negative roots.`,
    `Accepting the negative root as a valid answer.`,
    ["quadratic", "extraneous roots"]
  ));
}

for(let i = 0; i < 5; i++) {
  // x^(log x) = base^something
  // let's do a classic: base 10. log(x) = y. y^2 = c.
  const roots = [2, 3, 4, 1.5, 2.5]; // some random values for variety, actually let's stick to simple integers for y.
  const y = (i % 2) + 2; // 2 or 3. Let's say y=2.
  const c = y * y; // 4
  const val1 = Math.pow(10, y);
  const val2 = Math.pow(10, -y);
  // To avoid extremely large numbers we just format as 10^y or a fraction.
  // Example: solve x^(log x) = 10000. log base is 10. 
  // Take log both sides: (log x) * (log x) = log(10000) = 4. 
  // (log x)^2 = 4 => log x = 2 or -2. x = 100 or 1/100.
  const c_val = Math.pow(10, c);
  questions.push(createQuestion(
    "Solving Equations", "Hard",
    `Solve for x: x^(log\u2081\u2080 x) = 10^${c}`,
    `10^${y} or 10^-${y}`, [`10^${y} only`, `10^${c} or 10^-${c}`, `${y} or -${y}`],
    `Take log base 10 on both sides: log(x^(log x)) = log(10^${c}). By the power rule, (log x) * (log x) = ${c}. So, (log x)\u00B2 = ${c}. This means log x = ${y} or log x = -${y}. Therefore, x = 10^${y} or x = 10^-${y}.`,
    `Take log on both sides to bring the exponent down.`,
    `Forgetting the negative root when taking the square root.`,
    ["variable exponent", "taking logs"]
  ));
}

// --- 4. Given Values Applications (Easy: 10, Medium: 10, Hard: 5) ---
for(let i = 0; i < 10; i++) {
  // Given log 2 = 0.3010, find log(val)
  // Let val be powers of 2.
  const p = i + 2; 
  const val = Math.pow(2, p);
  const ans = (p * 0.3010).toFixed(4);
  questions.push(createQuestion(
    "Given Values", "Easy",
    `Given log 2 = 0.3010, find the value of log ${val}.`,
    ans, [(p * 0.3).toFixed(4), ((p+1) * 0.3010).toFixed(4), (val * 0.3010).toFixed(4)],
    `We can write ${val} as 2^${p}. So, log(${val}) = log(2^${p}) = ${p} * log(2). Substitute the given value: ${p} * 0.3010 = ${ans}.`,
    `Express the number as a power of the given value and multiply the exponent by the given log value.`,
    `Multiplying the given log value by the number itself instead of its exponent.`,
    ["common log", "substitution"]
  ));
}

for(let i = 0; i < 10; i++) {
  // Given log 2 = 0.3010, log 3 = 0.4771. Find log(2^a * 3^b)
  const a = (i % 3) + 1;
  const b = (i % 2) + 1;
  const val = Math.pow(2, a) * Math.pow(3, b);
  const ans = (a * 0.3010 + b * 0.4771).toFixed(4);
  questions.push(createQuestion(
    "Given Values", "Medium",
    `Given log 2 = 0.3010 and log 3 = 0.4771, find the value of log ${val}.`,
    ans, [(a * 0.3010 + b * 0.3010).toFixed(4), (a * 0.4771 + b * 0.3010).toFixed(4), ((a+b)*(0.3010+0.4771)).toFixed(4)],
    `Prime factorize ${val}: ${val} = 2^${a} * 3^${b}. Therefore, log(${val}) = log(2^${a} * 3^${b}) = log(2^${a}) + log(3^${b}) = ${a}log(2) + ${b}log(3). Substituting the values: ${a}(0.3010) + ${b}(0.4771) = ${ans}.`,
    `Prime factorize the number, then apply product and power rules.`,
    `Making arithmetic errors during multiplication or addition of decimals.`,
    ["prime factorization", "multiple logs"]
  ));
}

for(let i = 0; i < 5; i++) {
  // Find number of digits in val^p. Formula: floor(p * log(val)) + 1
  // We'll use base 2 or 3 where we "give" the log value.
  const base = (i % 2 === 0) ? 2 : 3;
  const logVal = base === 2 ? 0.3010 : 0.4771;
  const p = (i * 10) + 20; // 20, 30, 40, etc.
  const digits = Math.floor(p * logVal) + 1;
  
  questions.push(createQuestion(
    "Given Values", "Hard",
    `Given log ${base} = ${logVal}, find the number of digits in ${base}^${p}.`,
    digits, [digits - 1, digits + 1, digits * 2],
    `The number of digits in N is given by the formula: floor(log N) + 1. Here N = ${base}^${p}. log(N) = log(${base}^${p}) = ${p} * log(${base}) = ${p} * ${logVal} = ${(p * logVal).toFixed(4)}. The floor of this is ${Math.floor(p * logVal)}. So, number of digits = ${Math.floor(p * logVal)} + 1 = ${digits}.`,
    `Number of digits = Integer part of (Exponent * log(Base)) + 1.`,
    `Forgetting to add 1 to the integer part of the logarithm.`,
    ["number of digits", "characteristics"]
  ));
}

// Current Counts:
// Basics: 10E, 10M, 5H
// Laws: 10E, 10M, 5H
// Equations: 10E, 10M, 5H
// Given Values: 10E, 10M, 5H
// Total: 40 Easy, 40 Medium, 20 Hard. Exactly 100 questions.

const easy = questions.filter(q => q.difficulty === 'Easy').slice(0, 40);
const med = questions.filter(q => q.difficulty === 'Medium').slice(0, 40);
const hard = questions.filter(q => q.difficulty === 'Hard').slice(0, 20);

const finalQs = [...easy, ...med, ...hard];
finalQs.forEach((q, idx) => {
  q.id = `ADV_LOG_${String(idx + 1).padStart(3, '0')}`;
});

fs.writeFileSync('public/data/quantitative-aptitude/advanced-aptitude/logarithm.json', JSON.stringify(finalQs, null, 2));

console.log('Total:', finalQs.length);
console.log('Easy:', finalQs.filter(x=>x.difficulty==='Easy').length);
console.log('Medium:', finalQs.filter(x=>x.difficulty==='Medium').length);
console.log('Hard:', finalQs.filter(x=>x.difficulty==='Hard').length);
