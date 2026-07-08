/**
 * generate_di_tables.cjs
 * AptiAnimate — DI Tables Question Bank Generator
 *
 * Generates:
 *   - 50 unique table PNG images (1200×auto, 2× DPI, Puppeteer)
 *   - tables.json with 100 questions (40 Easy | 40 Medium | 20 Hard)
 * Then runs full automatic validation.
 */

'use strict';
const fs   = require('fs');
const path = require('path');

// ─── PATHS ──────────────────────────────────────────────────────────────────
const IMG_DIR  = path.join(process.cwd(), 'public', 'assets', 'di-images', 'tables');
const JSON_DIR = path.join(process.cwd(), 'public', 'data', 'quantitative-aptitude', 'data-interpretation');
const JSON_OUT = path.join(JSON_DIR, 'tables.json');
[IMG_DIR, JSON_DIR].forEach(d => { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); });

// ─── MATH HELPERS ───────────────────────────────────────────────────────────
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pct  = (a, b) => +((b - a) / a * 100).toFixed(1);
const avg  = arr => +(arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(1);
const sum  = arr => arr.reduce((s, v) => s + v, 0);
const gcd  = (a, b) => b === 0 ? a : gcd(b, a % b);

function shuffleOptions(correct, wrongs) {
  const all = [String(correct), ...wrongs.map(String)];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return { options: all, correctAnswer: all.indexOf(String(correct)) };
}

// ─── DATASET GENERATORS ─────────────────────────────────────────────────────
// Each returns { title, headers[], rows[][], raw{} }

function salesDS(seed) {
  const YEARS    = [2019, 2020, 2021, 2022, 2023];
  const PRODUCTS = ['Product A', 'Product B', 'Product C', 'Product D'];
  const base = 120 + seed * 9;
  const data = {};
  PRODUCTS.forEach((p, pi) => {
    data[p] = YEARS.map((_, yi) => base + pi * 18 + yi * 12 + rand(-8, 10));
  });
  return {
    title: `Annual Sales (₹ Lakh) of Four Products (${YEARS[0]}–${YEARS[YEARS.length - 1]})`,
    headers: ['Product / Year', ...YEARS.map(String)],
    rows: PRODUCTS.map(p => [p, ...data[p].map(String)]),
    raw: { YEARS, PRODUCTS, data, type: 'sales' }
  };
}

function employeeDS(seed) {
  const DEPTS = ['HR', 'Finance', 'IT', 'Marketing', 'Operations'];
  const base  = 35 + seed * 5;
  const rows  = DEPTS.map((d, i) => {
    const m = base + i * 9 + rand(0, 12);
    const f = base + i * 6 + rand(0, 10);
    return { dept: d, m, f, t: m + f };
  });
  return {
    title: `Number of Employees Across Five Departments`,
    headers: ['Department', 'Male', 'Female', 'Total'],
    rows: rows.map(r => [r.dept, String(r.m), String(r.f), String(r.t)]),
    raw: { DEPTS, rows, type: 'employee' }
  };
}

function examDS(seed) {
  const SUBJECTS = ['Maths', 'Physics', 'Chemistry', 'English', 'Biology'];
  const STUDENTS = ['Student A', 'Student B', 'Student C', 'Student D'];
  const base = 52 + seed * 4;
  const data = {};
  STUDENTS.forEach((s, si) => {
    data[s] = SUBJECTS.map((_, sj) => Math.min(100, base + si * 5 + sj * 3 + rand(-6, 10)));
  });
  return {
    title: `Marks Obtained by Students in Five Subjects (Max: 100)`,
    headers: ['Student / Subject', ...SUBJECTS],
    rows: STUDENTS.map(s => [s, ...data[s].map(String)]),
    raw: { SUBJECTS, STUDENTS, data, type: 'exam' }
  };
}

function populationDS(seed) {
  const STATES = ['State A', 'State B', 'State C', 'State D', 'State E'];
  const YEARS  = [2018, 2019, 2020, 2021, 2022];
  const base   = 12 + seed * 2;
  const data   = {};
  STATES.forEach((s, si) => {
    data[s] = YEARS.map((_, yi) => +(base + si * 2.8 + yi * 0.9 + rand(-1, 2)).toFixed(1));
  });
  return {
    title: `Population (in Lakhs) of Five States (${YEARS[0]}–${YEARS[YEARS.length - 1]})`,
    headers: ['State / Year', ...YEARS.map(String)],
    rows: STATES.map(s => [s, ...data[s].map(String)]),
    raw: { STATES, YEARS, data, type: 'population' }
  };
}

function productionDS(seed) {
  const FACTORIES = ['Factory A', 'Factory B', 'Factory C', 'Factory D', 'Factory E'];
  const QUARTERS  = ['Q1', 'Q2', 'Q3', 'Q4'];
  const base = 550 + seed * 35;
  const data = {};
  FACTORIES.forEach((f, fi) => {
    data[f] = QUARTERS.map((_, qi) => base + fi * 120 + qi * 60 + rand(-40, 40));
  });
  return {
    title: `Production (Units) Across Factories — Quarterly Breakdown`,
    headers: ['Factory / Quarter', ...QUARTERS],
    rows: FACTORIES.map(f => [f, ...data[f].map(String)]),
    raw: { FACTORIES, QUARTERS, data, type: 'production' }
  };
}

function revenueDS(seed) {
  const YEARS = [2019, 2020, 2021, 2022, 2023];
  const base  = 220 + seed * 15;
  const rows  = YEARS.map((y, i) => {
    const rev  = base + i * 45 + rand(-18, 22);
    const exp  = base - 35 + i * 28 + rand(-12, 16);
    const prof = rev - exp;
    return { year: y, rev, exp, prof };
  });
  return {
    title: `Revenue, Expenditure & Profit of a Company (₹ Crore)`,
    headers: ['Year', 'Revenue', 'Expenditure', 'Profit'],
    rows: rows.map(r => [String(r.year), String(r.rev), String(r.exp), String(r.prof)]),
    raw: { YEARS, rows, type: 'revenue' }
  };
}

function exportDS(seed) {
  const COUNTRIES = ['USA', 'UK', 'China', 'Japan', 'Germany'];
  const base = 520 + seed * 28;
  const rows = COUNTRIES.map((c, ci) => {
    const exp  = base + ci * 85 + rand(-30, 45);
    const imp  = base + ci * 65 + rand(-25, 38);
    const bal  = exp - imp;
    return { country: c, exp, imp, bal };
  });
  return {
    title: `Export, Import & Trade Balance with Five Countries (₹ Crore)`,
    headers: ['Country', 'Export', 'Import', 'Trade Balance'],
    rows: rows.map(r => [r.country, String(r.exp), String(r.imp), String(r.bal)]),
    raw: { COUNTRIES, rows, type: 'export' }
  };
}

function crimeDS(seed) {
  const CITIES = ['City A', 'City B', 'City C', 'City D', 'City E'];
  const base   = 105 + seed * 7;
  const rows   = CITIES.map((c, ci) => {
    const theft   = base + ci * 12 + rand(-10, 16);
    const assault = base - 22 + ci * 9  + rand(-7, 12);
    const fraud   = base - 42 + ci * 6  + rand(-6, 9);
    const total   = theft + assault + fraud;
    return { city: c, theft, assault, fraud, total };
  });
  return {
    title: `Crime Statistics (Cases Registered) in Five Cities`,
    headers: ['City', 'Theft', 'Assault', 'Fraud', 'Total'],
    rows: rows.map(r => [r.city, String(r.theft), String(r.assault), String(r.fraud), String(r.total)]),
    raw: { CITIES, rows, type: 'crime' }
  };
}

const DS_GENERATORS = [
  salesDS, employeeDS, examDS, populationDS,
  productionDS, revenueDS, exportDS, crimeDS
];

function getDataset(idx) {
  return DS_GENERATORS[idx % DS_GENERATORS.length](Math.floor(idx / DS_GENERATORS.length));
}

// ─── QUESTION FACTORIES ──────────────────────────────────────────────────────

function buildQ(id, difficulty, imgPath, question, options, correctAnswer, answer, rawData, explanation, shortcut, commonMistake) {
  return {
    id,
    topic: 'Data Interpretation',
    subtopic: 'Tables',
    difficulty,
    question: `Study the following table carefully and answer the question.\n\n${question}`,
    image: imgPath,
    rawData,
    options,
    correctAnswer,
    answer: String(answer),
    marks: 1,
    negativeMarks: 0,
    explanation,
    shortcut,
    commonMistake,
    estimatedTime: difficulty === 'Easy' ? '60 sec' : difficulty === 'Medium' ? '90 sec' : '120 sec',
    keywords: ['data interpretation', 'table', 'DI', 'aptitude'],
    tags: ['placement', 'aptitude', 'DI', 'tables'],
    visualizable: true,
    aiSolverEnabled: true,
    source: 'AI Generated'
  };
}

function makeQsFromSales(ds, imgPath, idStart, difficulty) {
  const { YEARS, PRODUCTS, data } = ds.raw;
  const Qs = [];

  // Q1: Highest in year[2]
  const yr = YEARS[2];
  const ranked = PRODUCTS.map(p => ({ p, v: data[p][2] })).sort((a, b) => b.v - a.v);
  const top = ranked[0];
  const { options: o1, correctAnswer: ca1 } = shuffleOptions(top.p, PRODUCTS.filter(p => p !== top.p));
  Qs.push(buildQ(`DI_TABLE_${String(idStart).padStart(3,'0')}`, difficulty, imgPath,
    `In the year ${yr}, which product had the highest sales?`,
    o1, ca1, top.p, ds.raw,
    `Column ${yr}: ${ranked.map(x => `${x.p}=₹${x.v}L`).join(', ')}. Highest → ${top.p} (₹${top.v}L).`,
    `Scan the ${yr} column, pick maximum.`,
    `Comparing wrong year column.`));

  // Q2: Row total for PRODUCTS[1]
  const p2 = PRODUCTS[1];
  const tot2 = sum(data[p2]);
  const { options: o2, correctAnswer: ca2 } = shuffleOptions(`₹${tot2}L`, [`₹${tot2+10}L`, `₹${tot2-15}L`, `₹${tot2+25}L`]);
  Qs.push(buildQ(`DI_TABLE_${String(idStart+1).padStart(3,'0')}`, difficulty, imgPath,
    `What is the total sales of ${p2} over all ${YEARS.length} years?`,
    o2, ca2, `₹${tot2}L`, ds.raw,
    `Sum of ${p2} = ${data[p2].join('+')} = ₹${tot2}L.`,
    `Sum all values in the ${p2} row.`,
    `Adding only 4 out of 5 years.`));

  return Qs;
}

function makeQsFromEmployee(ds, imgPath, idStart, difficulty) {
  const { rows } = ds.raw;
  const Qs = [];

  // Q1: Dept with max female
  const maxF = rows.reduce((mx, r) => r.f > mx.f ? r : mx, rows[0]);
  const { options: o1, correctAnswer: ca1 } = shuffleOptions(maxF.dept, rows.filter(r => r.dept !== maxF.dept).slice(0, 3).map(r => r.dept));
  Qs.push(buildQ(`DI_TABLE_${String(idStart).padStart(3,'0')}`, difficulty, imgPath,
    `Which department has the highest number of female employees?`,
    o1, ca1, maxF.dept, ds.raw,
    `Female counts: ${rows.map(r => `${r.dept}=${r.f}`).join(', ')}. Maximum → ${maxF.dept} (${maxF.f}).`,
    `Scan the Female column.`,
    `Confusing Female column with Total.`));

  // Q2: Overall total
  const total = sum(rows.map(r => r.t));
  const { options: o2, correctAnswer: ca2 } = shuffleOptions(`${total}`, [`${total+20}`, `${total-15}`, `${total+35}`]);
  Qs.push(buildQ(`DI_TABLE_${String(idStart+1).padStart(3,'0')}`, difficulty, imgPath,
    `What is the total number of employees across all departments?`,
    o2, ca2, `${total}`, ds.raw,
    `Total = ${rows.map(r => r.t).join('+')} = ${total}.`,
    `Sum the Total column directly.`,
    `Summing Male + Female separately leads to same answer, but avoid double counting.`));

  return Qs;
}

function makeQsFromExam(ds, imgPath, idStart, difficulty) {
  const { STUDENTS, SUBJECTS, data } = ds.raw;
  const Qs = [];

  // Q1: Highest total student
  const totals = STUDENTS.map(s => ({ s, t: sum(data[s]) })).sort((a, b) => b.t - a.t);
  const best = totals[0];
  const { options: o1, correctAnswer: ca1 } = shuffleOptions(best.s, STUDENTS.filter(s => s !== best.s));
  Qs.push(buildQ(`DI_TABLE_${String(idStart).padStart(3,'0')}`, difficulty, imgPath,
    `Which student scored the highest aggregate marks across all subjects?`,
    o1, ca1, best.s, ds.raw,
    `Totals: ${totals.map(x => `${x.s}=${x.t}`).join(', ')}. Highest → ${best.s} (${best.t}).`,
    `Row-sum each student and compare.`,
    `Judging by a single subject instead of total.`));

  // Q2: Average in subject[0]
  const subj = SUBJECTS[0];
  const scores = STUDENTS.map(s => data[s][0]);
  const avgScore = avg(scores);
  const { options: o2, correctAnswer: ca2 } = shuffleOptions(`${avgScore}`,
    [`${+(avgScore+4).toFixed(1)}`, `${+(avgScore-3).toFixed(1)}`, `${+(avgScore+8).toFixed(1)}`]);
  Qs.push(buildQ(`DI_TABLE_${String(idStart+1).padStart(3,'0')}`, difficulty, imgPath,
    `What is the average score of all students in ${subj}?`,
    o2, ca2, `${avgScore}`, ds.raw,
    `Scores: ${scores.join(', ')}. Avg = ${sum(scores)}/${STUDENTS.length} = ${avgScore}.`,
    `Sum column ÷ number of students.`,
    `Dividing by number of subjects instead of students.`));

  return Qs;
}

function makeQsFromGeneric(ds, imgPath, idStart, difficulty) {
  const Qs = [];
  const numColName = ds.headers[1]; // first numeric column header
  const colValues  = ds.rows.map(r => ({ label: r[0], val: parseFloat(r[1]) || 0 }));
  const colSum     = +sum(colValues.map(x => x.val)).toFixed(1);
  colValues.sort((a, b) => b.val - a.val);
  const maxRow = colValues[0];
  const minRow = colValues[colValues.length - 1];

  // Q1: Maximum
  const { options: o1, correctAnswer: ca1 } = shuffleOptions(maxRow.label,
    colValues.slice(1, 4).map(x => x.label));
  Qs.push(buildQ(`DI_TABLE_${String(idStart).padStart(3,'0')}`, difficulty, imgPath,
    `Which entity recorded the highest value for ${numColName}?`,
    o1, ca1, maxRow.label, ds.raw,
    `${numColName} values: ${colValues.map(x => `${x.label}=${x.val}`).join(', ')}. Maximum → ${maxRow.label} (${maxRow.val}).`,
    `Scan the ${numColName} column for the largest value.`,
    `Confusing row and column labels.`));

  // Q2: Total
  const { options: o2, correctAnswer: ca2 } = shuffleOptions(`${colSum}`,
    [`${+(colSum+12).toFixed(1)}`, `${+(colSum-10).toFixed(1)}`, `${+(colSum+22).toFixed(1)}`]);
  Qs.push(buildQ(`DI_TABLE_${String(idStart+1).padStart(3,'0')}`, difficulty, imgPath,
    `What is the total of all values in the ${numColName} column?`,
    o2, ca2, `${colSum}`, ds.raw,
    `Total = ${colValues.map(x => x.val).join('+')} = ${colSum}.`,
    `Add all values in the column.`,
    `Skipping the last row.`));

  return Qs;
}

// Master dispatcher — always returns 2 questions safely
function makeQuestions(ds, imgPath, idStart, difficulty) {
  try {
    const type = ds.raw.type;
    if (type === 'sales')    return makeQsFromSales(ds, imgPath, idStart, difficulty);
    if (type === 'employee') return makeQsFromEmployee(ds, imgPath, idStart, difficulty);
    if (type === 'exam')     return makeQsFromExam(ds, imgPath, idStart, difficulty);
    return makeQsFromGeneric(ds, imgPath, idStart, difficulty);
  } catch (e) {
    return makeQsFromGeneric(ds, imgPath, idStart, difficulty);
  }
}

// ─── HTML TABLE TEMPLATE ─────────────────────────────────────────────────────
function buildHTML(ds) {
  const thHTML = ds.headers.map((h, i) =>
    `<th class="${i === 0 ? 'lbl' : 'num'}">${h}</th>`).join('');
  const trHTML = ds.rows.map((row, ri) =>
    `<tr class="${ri % 2 === 0 ? 'even' : 'odd'}">${row.map((cell, ci) =>
      `<td class="${ci === 0 ? 'lbl' : 'num'}">${cell}</td>`).join('')}</tr>`
  ).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;background:#fff;padding:36px 44px 44px;width:1200px}
.title{font-size:19px;font-weight:700;color:#1a1a2e;text-align:center;margin-bottom:26px;
  padding-bottom:14px;border-bottom:2.5px solid #4f46e5;letter-spacing:.3px}
table{width:100%;border-collapse:collapse;font-size:14.5px}
thead tr{background:#4f46e5;color:#fff}
th{padding:13px 20px;font-weight:700;letter-spacing:.4px;font-size:13.5px}
td{padding:11px 20px;color:#1f2937;border-bottom:1px solid #e5e7eb}
.lbl{text-align:left;font-weight:600}
.num{text-align:center}
tr.even td{background:#f9fafb}
tr.odd td{background:#fff}
.footer{margin-top:14px;font-size:11px;color:#9ca3af;text-align:right;font-style:italic}
</style></head>
<body>
  <div class="title">${ds.title}</div>
  <table>
    <thead><tr>${thHTML}</tr></thead>
    <tbody>${trHTML}</tbody>
  </table>
  <div class="footer">All values are illustrative. For aptitude practice only.</div>
</body></html>`;
}

// ─── SCREENSHOT with retry & browser-restart ────────────────────────────────
const BROWSER_RESTART_EVERY = 10; // restart browser every N screenshots

async function screenshotTable(puppeteer, browserRef, ds, imgDiskPath) {
  // Try up to 3 times
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const page = await browserRef.browser.newPage();
      await page.setContent(buildHTML(ds), { waitUntil: 'networkidle0' });
      await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
      const body = await page.$('body');
      const box  = await body.boundingBox();
      await page.screenshot({
        path: imgDiskPath,
        clip: { x: 0, y: 0, width: Math.ceil(box.width), height: Math.ceil(box.height) }
      });
      await page.close();
      return; // success
    } catch (err) {
      // Browser crashed — restart it
      try { await browserRef.browser.close(); } catch (_) {}
      await new Promise(r => setTimeout(r, 800));
      browserRef.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      if (attempt === 3) throw err; // give up after 3 attempts
    }
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  const puppeteer = require('puppeteer');
  console.log('\n🚀  AptiAnimate — DI Tables Generator\n');

  // Plan: 50 tables × 2 Qs = 100 Qs
  const PLAN = [
    { count: 20, difficulty: 'Easy'   },
    { count: 20, difficulty: 'Medium' },
    { count: 10, difficulty: 'Hard'   },
  ];

  // Shared browser reference (allows restart inside the loop)
  const browserRef = {
    browser: await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    })
  };

  const allQ = [];
  let dsIdx  = 0;
  let imgIdx = 1;
  let shotCount = 0;

  for (const { count, difficulty } of PLAN) {
    for (let i = 0; i < count; i++) {
      // Proactively restart browser every N shots to prevent memory buildup
      if (shotCount > 0 && shotCount % BROWSER_RESTART_EVERY === 0) {
        try { await browserRef.browser.close(); } catch (_) {}
        await new Promise(r => setTimeout(r, 500));
        browserRef.browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
      }

      const ds          = getDataset(dsIdx++);
      const imgFile     = `table_${String(imgIdx).padStart(3, '0')}.png`;
      const imgDiskPath = path.join(IMG_DIR, imgFile);
      const imgWebPath  = `/assets/di-images/tables/${imgFile}`;

      await screenshotTable(puppeteer, browserRef, ds, imgDiskPath);
      shotCount++;

      // Small breathing room between shots
      await new Promise(r => setTimeout(r, 100));

      // Generate questions
      const idStart = allQ.length + 1;
      const qs = makeQuestions(ds, imgWebPath, idStart, difficulty);
      allQ.push(...qs);

      process.stdout.write(`\r  📸 Tables: ${String(imgIdx).padStart(3)} | ❓ Questions: ${String(allQ.length).padStart(3)}`);
      imgIdx++;
    }
  }

  try { await browserRef.browser.close(); } catch (_) {}


  // Enforce 40 / 40 / 20
  const easy   = allQ.filter(q => q.difficulty === 'Easy').slice(0, 40);
  const medium = allQ.filter(q => q.difficulty === 'Medium').slice(0, 40);
  const hard   = allQ.filter(q => q.difficulty === 'Hard').slice(0, 20);
  const final  = [...easy, ...medium, ...hard];
  final.forEach((q, i) => { q.id = `DI_TABLE_${String(i + 1).padStart(3, '0')}`; });

  fs.writeFileSync(JSON_OUT, JSON.stringify(final, null, 2));
  console.log(`\n\n✅  Generation complete!  Questions: ${final.length}  Images: ${imgIdx - 1}`);

  // ─── AUTOMATIC VALIDATION ─────────────────────────────────────────────────
  console.log('\n🔍  Running Automatic Validation...\n');
  const data   = JSON.parse(fs.readFileSync(JSON_OUT, 'utf8'));
  const errors = [];
  const seenId = new Set();

  data.forEach((q, i) => {
    const lbl = `Q${i + 1} [${q.id}]`;
    if (!q.id)                                             errors.push(`${lbl}: Missing ID`);
    if (seenId.has(q.id))                                  errors.push(`${lbl}: Duplicate ID`);
    else seenId.add(q.id);
    if (!q.image)                                          errors.push(`${lbl}: Missing image path`);
    if (q.image) {
      const abs = path.join(process.cwd(), 'public', q.image);
      if (!fs.existsSync(abs))                             errors.push(`${lbl}: Image not on disk → ${abs}`);
      else if (fs.statSync(abs).size < 5000)               errors.push(`${lbl}: Image file suspiciously small (${fs.statSync(abs).size}B)`);
    }
    if (!q.question || q.question.length < 10)             errors.push(`${lbl}: Missing/short question`);
    if (!q.answer)                                         errors.push(`${lbl}: Missing answer`);
    if (!q.explanation || q.explanation.length < 10)       errors.push(`${lbl}: Missing explanation`);
    if (!q.rawData)                                        errors.push(`${lbl}: Missing rawData`);
    if (!q.shortcut)                                       errors.push(`${lbl}: Missing shortcut`);
    if (!q.commonMistake)                                  errors.push(`${lbl}: Missing commonMistake`);
    if (!q.estimatedTime)                                  errors.push(`${lbl}: Missing estimatedTime`);
    if (!Array.isArray(q.options) || q.options.length !== 4)
                                                           errors.push(`${lbl}: Options must be 4-element array`);
    if (q.correctAnswer < 0 || q.correctAnswer > 3)        errors.push(`${lbl}: Invalid correctAnswer index`);
    if (!['Easy','Medium','Hard'].includes(q.difficulty))  errors.push(`${lbl}: Invalid difficulty`);
  });

  // Counts
  const eCnt = data.filter(q => q.difficulty === 'Easy').length;
  const mCnt = data.filter(q => q.difficulty === 'Medium').length;
  const hCnt = data.filter(q => q.difficulty === 'Hard').length;
  if (data.length !== 100) errors.push(`Total = ${data.length} (expected 100)`);
  if (eCnt !== 40)         errors.push(`Easy = ${eCnt} (expected 40)`);
  if (mCnt !== 40)         errors.push(`Medium = ${mCnt} (expected 40)`);
  if (hCnt !== 20)         errors.push(`Hard = ${hCnt} (expected 20)`);

  // Image files on disk
  const pngs = fs.readdirSync(IMG_DIR).filter(f => f.endsWith('.png'));

  console.log(`  ✓ Total questions : ${data.length}`);
  console.log(`  ✓ Easy / Med / Hard : ${eCnt} / ${mCnt} / ${hCnt}`);
  console.log(`  ✓ Unique IDs      : ${seenId.size}`);
  console.log(`  ✓ PNG files saved : ${pngs.length}`);

  if (errors.length === 0) {
    console.log('\n🎉  ALL VALIDATION CHECKS PASSED — tables.json is production ready!\n');
  } else {
    console.error(`\n⚠️  ${errors.length} error(s) found:\n`);
    errors.forEach(e => console.error('   ❌', e));
    process.exit(1);
  }
}

main().catch(err => { console.error('\n💥 Fatal:', err.message); process.exit(1); });
