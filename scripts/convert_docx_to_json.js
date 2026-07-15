/**
 * ============================================================
 * AptiAnimate — Stage 2: Master Question Bank → JSON Pipeline
 * ============================================================
 * Author  : Senior Dev Pipeline
 * Purpose : Parse AptiAnimate_Master_Question_Bank.docx →
 *           topic-wise JSON files + 7 validation reports
 *
 * Usage   : node scripts/convert_docx_to_json.js
 * ============================================================
 */

import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.resolve(__dirname, '..');

// ── Paths ────────────────────────────────────────────────────
const DOCX_PATH    = 'C:\\Users\\acer\\Desktop\\AptiAnimate_Master_Question_Bank.docx';
const BANK_ROOT    = path.join(ROOT, 'assessment-bank');
const JSON_ROOT    = path.join(BANK_ROOT, 'json');
const REPORTS_ROOT = path.join(BANK_ROOT, 'reports');
const MASTER_ROOT  = path.join(BANK_ROOT, 'master');

// ── Company Tag Map by Topic ─────────────────────────────────
// Based on real placement exam patterns from major Indian IT companies
const COMPANY_TAGS = {
  // Quantitative — all campus drives include quant
  'Algebra'                  : ['tcs', 'infosys', 'wipro', 'accenture'],
  'Average'                  : ['tcs', 'infosys', 'wipro', 'cognizant', 'capgemini'],
  'Compound Interest'        : ['tcs', 'infosys', 'sbi', 'hdfc'],
  'Geometry'                 : ['tcs', 'infosys', 'wipro'],
  'Number System'            : ['tcs', 'infosys', 'wipro', 'accenture'],
  'Percentage'               : ['tcs', 'infosys', 'wipro', 'accenture', 'capgemini', 'cognizant'],
  'Permutation & Combination': ['tcs', 'infosys', 'amazon', 'google'],
  'Pipes & Cisterns'         : ['tcs', 'wipro', 'infosys'],
  'Probability'              : ['tcs', 'infosys', 'amazon', 'google'],
  'Profit & Loss'            : ['tcs', 'infosys', 'wipro', 'accenture'],
  'Ratio & Proportion'       : ['tcs', 'infosys', 'wipro', 'accenture', 'cognizant'],
  'Simple Interest'          : ['tcs', 'infosys', 'wipro', 'sbi'],
  'Time & Work'              : ['tcs', 'infosys', 'wipro', 'accenture', 'capgemini'],
  'Time Speed Distance'      : ['tcs', 'infosys', 'wipro', 'capgemini'],

  // Logical Reasoning
  'Alphabet'                 : ['tcs', 'infosys', 'wipro'],
  'Blood Relation'           : ['tcs', 'infosys', 'wipro', 'accenture'],
  'Calendar'                 : ['tcs', 'infosys', 'accenture', 'capgemini'],
  'Clock'                    : ['tcs', 'infosys', 'wipro'],
  'Coding Decoding'          : ['tcs', 'infosys', 'wipro', 'accenture', 'cognizant'],
  'Puzzle'                   : ['tcs', 'infosys', 'accenture', 'amazon'],
  'Ranking'                  : ['tcs', 'infosys', 'wipro'],
  'Seating Arrangement'      : ['tcs', 'infosys', 'accenture', 'ibm'],
  'Statement Conclusion'     : ['tcs', 'infosys', 'accenture', 'cognizant'],

  // Verbal Ability
  'Antonyms'                 : ['tcs', 'infosys', 'cognizant', 'wipro'],
  'Grammar'                  : ['tcs', 'wipro', 'cognizant', 'accenture'],
  'Sentence Completion'      : ['tcs', 'infosys', 'wipro', 'capgemini'],
  'Sentence Correction'      : ['tcs', 'wipro', 'cognizant', 'hcl'],
  'Synonyms'                 : ['tcs', 'infosys', 'cognizant'],
  'Vocabulary'               : ['tcs', 'infosys', 'wipro', 'capgemini'],

  // Technical — product companies + service companies
  'Algorithms'               : ['google', 'amazon', 'microsoft', 'meta', 'adobe', 'flipkart', 'tcs', 'infosys'],
  'Computer Networks'        : ['cisco', 'juniper', 'amazon', 'google', 'tcs', 'infosys'],
  'DBMS'                     : ['oracle', 'ibm', 'sap', 'tcs', 'infosys', 'accenture'],
  'Data Structures'          : ['google', 'amazon', 'microsoft', 'meta', 'adobe', 'flipkart', 'tcs'],
  'OOPS'                     : ['microsoft', 'oracle', 'tcs', 'infosys', 'accenture', 'ibm'],
  'Operating System'         : ['google', 'amazon', 'microsoft', 'oracle', 'tcs', 'infosys'],
};

// ── Topic → JSON filename slug ───────────────────────────────
const TOPIC_SLUG = {
  'Algebra'                  : 'algebra',
  'Average'                  : 'average',
  'Compound Interest'        : 'compound-interest',
  'Geometry'                 : 'geometry',
  'Number System'            : 'number-system',
  'Percentage'               : 'percentage',
  'Permutation & Combination': 'permutation-combination',
  'Pipes & Cisterns'         : 'pipes-cisterns',
  'Probability'              : 'probability',
  'Profit & Loss'            : 'profit-loss',
  'Ratio & Proportion'       : 'ratio-proportion',
  'Simple Interest'          : 'simple-interest',
  'Time & Work'              : 'time-work',
  'Time Speed Distance'      : 'time-speed-distance',
  'Alphabet'                 : 'alphabet',
  'Blood Relation'           : 'blood-relation',
  'Calendar'                 : 'calendar',
  'Clock'                    : 'clock',
  'Coding Decoding'          : 'coding-decoding',
  'Puzzle'                   : 'puzzle',
  'Ranking'                  : 'ranking',
  'Seating Arrangement'      : 'seating-arrangement',
  'Statement Conclusion'     : 'statement-conclusion',
  'Antonyms'                 : 'antonyms',
  'Grammar'                  : 'grammar',
  'Sentence Completion'      : 'sentence-completion',
  'Sentence Correction'      : 'sentence-correction',
  'Synonyms'                 : 'synonyms',
  'Vocabulary'               : 'vocabulary',
  'Algorithms'               : 'algorithms',
  'Computer Networks'        : 'computer-networks',
  'DBMS'                     : 'dbms',
  'Data Structures'          : 'data-structures',
  'OOPS'                     : 'oops',
  'Operating System'         : 'operating-system',
};

// ── Category → JSON subfolder ────────────────────────────────
const CATEGORY_DIR = {
  'Quantitative Aptitude': 'quantitative',
  'Logical Reasoning'    : 'logical',
  'Verbal Ability'       : 'verbal',
  'Technical'            : 'technical',
};

// ── Difficulty → estimatedTime (seconds) ────────────────────
const DIFFICULTY_TIME = { Easy: 45, Medium: 60, Hard: 90 };

// ════════════════════════════════════════════════════════════
//  PARSER
// ════════════════════════════════════════════════════════════

function parseDocxText(rawText) {
  const lines  = rawText.split('\n').map(l => l.trim());
  const blocks = [];
  let current  = null;
  let mode     = null; // 'question' | 'options'

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    // ── Start of new question block ──
    if (line.startsWith('Question ID:')) {
      if (current) blocks.push(current);
      const rawId = line.replace('Question ID:', '').split('(')[0].trim();
      current = {
        rawId,
        category   : '',
        topic      : '',
        subtopic   : '',
        difficulty : '',
        question   : '',
        options    : { A: '', B: '', C: '', D: '' },
        correctAnswer: '',
        verificationStatus: '',
        status     : '',
        parseErrors: [],
      };
      mode = null;
      continue;
    }

    if (!current) continue;

    if (line.startsWith('Category:'))      { current.category   = line.replace('Category:', '').trim(); mode = null; continue; }
    if (line.startsWith('Topic:'))         { current.topic      = line.replace('Topic:', '').trim();    mode = null; continue; }
    if (line.startsWith('Subtopic:'))      { current.subtopic   = line.replace('Subtopic:', '').trim(); mode = null; continue; }
    if (line.startsWith('Difficulty:'))    { current.difficulty = line.replace('Difficulty:', '').trim(); mode = null; continue; }
    if (line.startsWith('Options:'))       { mode = 'options'; continue; }
    if (line.startsWith('Correct Answer:')){ current.correctAnswer = line.replace('Correct Answer:', '').trim(); mode = null; continue; }
    if (line.startsWith('Verification Status:')) { current.verificationStatus = line.replace('Verification Status:', '').trim(); mode = null; continue; }
    if (line.startsWith('Status:'))        { current.status = line.replace('Status:', '').trim(); mode = null; continue; }

    if (line.startsWith('Question:')) {
      current.question = line.replace('Question:', '').trim();
      mode = 'question';
      continue;
    }

    // Continue multi-line question text
    if (mode === 'question') {
      // Stop accumulating if we hit a field keyword
      if (/^(Options:|Category:|Topic:|Subtopic:|Difficulty:|Correct Answer:|Verification|Status:|Question ID:)/.test(line)) {
        mode = null;
        i--; // re-process this line
        continue;
      }
      current.question += ' ' + line;
      continue;
    }

    // Parse options A. / B. / C. / D.
    if (mode === 'options') {
      const optMatch = line.match(/^([A-D])\.\s+(.+)/);
      if (optMatch) {
        current.options[optMatch[1]] = optMatch[2].trim();
        continue;
      }
      // Option continuation (multi-line option text)
      if (/^[A-D]\./.test(line) === false && current.options.D === '' ) {
        // Append to last filled option
        const filled = ['D','C','B','A'].find(k => current.options[k] !== '');
        if (filled) current.options[filled] += ' ' + line;
        continue;
      }
      // Stop options mode if we hit another field
      if (/^(Correct Answer:|Verification|Status:|Question ID:|Question:)/.test(line)) {
        mode = null;
        i--;
        continue;
      }
    }
  }

  if (current) blocks.push(current);
  return blocks;
}

// ════════════════════════════════════════════════════════════
//  VALIDATOR
// ════════════════════════════════════════════════════════════

function validate(blocks) {
  const errors   = [];
  const warnings = [];
  const seenIds  = new Set();
  const seenQs   = new Set();

  blocks.forEach((b, idx) => {
    const loc = `Q at index ${idx} (ID: ${b.rawId || 'MISSING'})`;

    // Required fields
    if (!b.rawId)       errors.push(`${loc}: Missing Question ID`);
    if (!b.category)    errors.push(`${loc}: Missing Category`);
    if (!b.topic)       errors.push(`${loc}: Missing Topic`);
    if (!b.subtopic)    errors.push(`${loc}: Missing Subtopic`);
    if (!b.difficulty)  errors.push(`${loc}: Missing Difficulty`);
    if (!b.question || b.question.length < 5) errors.push(`${loc}: Missing/empty Question text`);
    if (!b.options.A)   errors.push(`${loc}: Missing Option A`);
    if (!b.options.B)   errors.push(`${loc}: Missing Option B`);
    if (!b.options.C)   errors.push(`${loc}: Missing Option C`);
    if (!b.options.D)   errors.push(`${loc}: Missing Option D`);
    if (!b.correctAnswer) errors.push(`${loc}: Missing Correct Answer`);

    // Correct answer letter extraction
    const caLetter = b.correctAnswer ? b.correctAnswer.trim().charAt(0).toUpperCase() : '';
    if (b.correctAnswer && !['A','B','C','D'].includes(caLetter)) {
      errors.push(`${loc}: Invalid correct answer letter "${caLetter}" — must be A/B/C/D`);
    }

    // Duplicate ID check
    if (b.rawId) {
      if (seenIds.has(b.rawId)) errors.push(`${loc}: Duplicate Question ID "${b.rawId}"`);
      else seenIds.add(b.rawId);
    }

    // Duplicate question text check
    const qKey = (b.question || '').toLowerCase().trim().substring(0, 80);
    if (qKey.length > 5) {
      if (seenQs.has(qKey)) warnings.push(`${loc}: Possible duplicate question text`);
      else seenQs.add(qKey);
    }

    // Topic mapping check
    if (b.topic && !TOPIC_SLUG[b.topic]) {
      warnings.push(`${loc}: Topic "${b.topic}" has no slug mapping — will go to 'misc'`);
    }
    if (b.category && !CATEGORY_DIR[b.category]) {
      warnings.push(`${loc}: Category "${b.category}" has no directory mapping`);
    }
  });

  return { errors, warnings };
}

// ════════════════════════════════════════════════════════════
//  TRANSFORMER  (block → final JSON record)
// ════════════════════════════════════════════════════════════

function transform(block) {
  const caLetter = block.correctAnswer.trim().charAt(0).toUpperCase();
  const topic    = block.topic;
  const diff     = block.difficulty;

  return {
    id           : block.rawId,
    category     : block.category,
    topic        : topic,
    subtopic     : block.subtopic,
    difficulty   : diff,
    question     : block.question.trim(),
    options      : {
      A: block.options.A.trim(),
      B: block.options.B.trim(),
      C: block.options.C.trim(),
      D: block.options.D.trim(),
    },
    correctAnswer : caLetter,
    estimatedTime : DIFFICULTY_TIME[diff] || 60,
    companyTags   : COMPANY_TAGS[topic] || [],
    status        : 'published',
    created_by    : 'bulk_import',
  };
}

// ════════════════════════════════════════════════════════════
//  FILE WRITERS
// ════════════════════════════════════════════════════════════

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// ════════════════════════════════════════════════════════════
//  REPORT GENERATORS
// ════════════════════════════════════════════════════════════

function generateValidationReport(blocks, validation, outputCount) {
  const lines = [
    '# Validation Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    `| Metric | Value |`,
    `|---|---|`,
    `| Total questions in document | ${blocks.length} |`,
    `| Successfully converted | ${outputCount} |`,
    `| Validation errors | ${validation.errors.length} |`,
    `| Warnings | ${validation.warnings.length} |`,
    '',
    '## Errors',
    validation.errors.length === 0 ? '_No errors found._' : validation.errors.map(e => `- ❌ ${e}`).join('\n'),
    '',
    '## Warnings',
    validation.warnings.length === 0 ? '_No warnings._' : validation.warnings.map(w => `- ⚠️ ${w}`).join('\n'),
  ];
  return lines.join('\n');
}

function generateDuplicateReport(blocks) {
  const seenIds = {};
  const seenQs  = {};
  const dupIds  = [];
  const dupQs   = [];

  blocks.forEach(b => {
    if (b.rawId) {
      seenIds[b.rawId] = (seenIds[b.rawId] || 0) + 1;
    }
    const key = (b.question || '').toLowerCase().trim().substring(0, 100);
    if (key.length > 10) seenQs[key] = (seenQs[key] || 0) + 1;
  });

  Object.entries(seenIds).forEach(([id, cnt]) => { if (cnt > 1) dupIds.push(id); });
  Object.entries(seenQs).forEach(([q, cnt]) => { if (cnt > 1) dupQs.push(q.substring(0, 60) + '...'); });

  const lines = [
    '# Duplicate Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Duplicate IDs',
    dupIds.length === 0 ? '✅ No duplicate IDs found.' : dupIds.map(d => `- ${d}`).join('\n'),
    '',
    '## Duplicate Questions',
    dupQs.length === 0 ? '✅ No duplicate question texts found.' : dupQs.map(d => `- ${d}`).join('\n'),
  ];
  return lines.join('\n');
}

function generateJSONSummary(records, fileMap) {
  const lines = [
    '# JSON Summary Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Total Records',
    `**${records.length} questions** successfully converted to JSON.`,
    '',
    '## Files Generated',
    '| File | Questions |',
    '|---|---|',
    ...Object.entries(fileMap)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([f, qs]) => `| \`${f}\` | ${qs.length} |`),
    '',
    '## Schema Fields',
    '```json',
    JSON.stringify(Object.keys(records[0] || {}), null, 2),
    '```',
  ];
  return lines.join('\n');
}

function generateCategoryDist(records) {
  const cats = {};
  records.forEach(r => { cats[r.category] = (cats[r.category] || 0) + 1; });
  const lines = [
    '# Category Distribution',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| Category | Count | % |',
    '|---|---|---|',
    ...Object.entries(cats).map(([c, n]) => `| ${c} | ${n} | ${((n/records.length)*100).toFixed(1)}% |`),
    '',
    `**Total: ${records.length} questions**`,
  ];
  return lines.join('\n');
}

function generateTopicDist(records) {
  const topics = {};
  records.forEach(r => { topics[`${r.category} → ${r.topic}`] = (topics[`${r.category} → ${r.topic}`] || 0) + 1; });
  const sorted = Object.entries(topics).sort((a,b) => b[1] - a[1]);
  const lines = [
    '# Topic Distribution',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| Category → Topic | Count |',
    '|---|---|',
    ...sorted.map(([t, n]) => `| ${t} | ${n} |`),
  ];
  return lines.join('\n');
}

function generateDifficultyDist(records) {
  const diff = { Easy: 0, Medium: 0, Hard: 0 };
  records.forEach(r => { if (diff[r.difficulty] !== undefined) diff[r.difficulty]++; else diff['Unknown'] = (diff['Unknown']||0)+1; });
  const lines = [
    '# Difficulty Distribution',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| Difficulty | Count | Est. Time |',
    '|---|---|---|',
    ...Object.entries(diff).map(([d, n]) => `| ${d} | ${n} | ${DIFFICULTY_TIME[d] || '?'}s |`),
  ];
  return lines.join('\n');
}

function generateImportReadiness(records, validation, fileMap) {
  const schemaFields    = ['id','category','topic','subtopic','difficulty','question','options','correctAnswer','estimatedTime','companyTags','status','created_by'];
  const missingFields   = schemaFields.filter(f => records[0] && records[0][f] === undefined);
  const emptyRecords    = records.filter(r => !r.question || !r.correctAnswer || !r.options.A);
  const invalidStatuses = records.filter(r => r.status !== 'published');
  const noCompanyTags   = records.filter(r => r.companyTags.length === 0);

  const isReady = validation.errors.length === 0 && emptyRecords.length === 0 && missingFields.length === 0;

  const lines = [
    '# Import Readiness Report',
    `Generated: ${new Date().toISOString()}`,
    '',
    `## Overall Status: ${isReady ? '✅ READY FOR IMPORT' : '❌ NOT READY — Fix errors first'}`,
    '',
    '## Schema Compatibility Check',
    '| Field | Present | Valid |',
    '|---|---|---|',
    ...schemaFields.map(f => {
      const present = records[0] && records[0][f] !== undefined ? '✅' : '❌';
      const valid   = missingFields.includes(f) ? '❌' : '✅';
      return `| ${f} | ${present} | ${valid} |`;
    }),
    '',
    '## Data Quality',
    `| Check | Result |`,
    `|---|---|`,
    `| Total records | ${records.length} |`,
    `| Validation errors | ${validation.errors.length === 0 ? '✅ 0' : '❌ ' + validation.errors.length} |`,
    `| Empty/invalid records | ${emptyRecords.length === 0 ? '✅ 0' : '⚠️ ' + emptyRecords.length} |`,
    `| All statuses = published | ${invalidStatuses.length === 0 ? '✅ Yes' : '⚠️ ' + invalidStatuses.length + ' are not'} |`,
    `| Questions with company tags | ${records.length - noCompanyTags.length} / ${records.length} |`,
    '',
    '## Files Ready',
    Object.keys(fileMap).map(f => `- ✅ ${f}`).join('\n'),
    '',
    '## Next Steps',
    '1. Review this report',
    '2. Open `assessment-bank/reports/Validation_Report.md` for any errors',
    '3. Run: `node scripts/import_assessment_questions.js` to push to Supabase',
    '> ⚠️ Do NOT import until this report shows ✅ READY FOR IMPORT',
  ];
  return lines.join('\n');
}

// ════════════════════════════════════════════════════════════
//  MAIN PIPELINE
// ════════════════════════════════════════════════════════════

async function run() {
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║  AptiAnimate — Stage 2: Question Bank Pipeline  ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  // ── Step 0: Ensure directory structure ──
  console.log('📁 Step 0: Setting up folder structure...');
  ensureDir(path.join(BANK_ROOT, 'master'));
  ensureDir(path.join(JSON_ROOT, 'quantitative'));
  ensureDir(path.join(JSON_ROOT, 'logical'));
  ensureDir(path.join(JSON_ROOT, 'verbal'));
  ensureDir(path.join(JSON_ROOT, 'technical'));
  ensureDir(REPORTS_ROOT);
  console.log('   ✅ Folders created.\n');

  // ── Step 1: Copy docx to master folder (read-only reference) ──
  const masterCopy = path.join(MASTER_ROOT, 'AptiAnimate_Master_Question_Bank.docx');
  if (!fs.existsSync(masterCopy)) {
    fs.copyFileSync(DOCX_PATH, masterCopy);
    console.log('📄 Step 1: Master docx copied to assessment-bank/master/');
  } else {
    console.log('📄 Step 1: Master docx already in assessment-bank/master/ ✅');
  }
  console.log();

  // ── Step 2: Extract raw text ──
  console.log('📖 Step 2: Extracting text from .docx...');
  const result  = await mammoth.extractRawText({ path: DOCX_PATH });
  const rawText = result.value;
  console.log(`   ✅ Extracted ${rawText.length.toLocaleString()} characters.\n`);

  // ── Step 3: Parse all question blocks ──
  console.log('🔍 Step 3: Parsing question blocks...');
  const blocks = parseDocxText(rawText);
  console.log(`   ✅ Found ${blocks.length} question blocks.\n`);

  // ── Step 4: Validate ──
  console.log('✔️  Step 4: Validating all questions...');
  const validation = validate(blocks);
  if (validation.errors.length > 0) {
    console.log(`   ❌ ${validation.errors.length} ERRORS found:`);
    validation.errors.slice(0, 10).forEach(e => console.log('     -', e));
    if (validation.errors.length > 10) console.log(`     ... and ${validation.errors.length - 10} more`);
  } else {
    console.log('   ✅ No errors found!');
  }
  if (validation.warnings.length > 0) {
    console.log(`   ⚠️  ${validation.warnings.length} warnings`);
  }
  console.log();

  // ── Step 5: Transform to final schema ──
  console.log('🔄 Step 5: Transforming to final JSON schema...');
  const records = blocks
    .filter(b => b.rawId && b.category && b.question && b.correctAnswer)
    .map(transform);
  console.log(`   ✅ Transformed ${records.length} records.\n`);

  // ── Step 6: Organize by topic → write JSON files ──
  console.log('📂 Step 6: Writing topic-wise JSON files...');
  const fileMap = {};

  records.forEach(record => {
    const catDir  = CATEGORY_DIR[record.category];
    const topicFile = TOPIC_SLUG[record.topic];

    if (!catDir || !topicFile) {
      console.log(`   ⚠️  Skipping "${record.id}" — unknown category/topic: ${record.category}/${record.topic}`);
      return;
    }

    const fileKey = path.join(catDir, topicFile + '.json');
    if (!fileMap[fileKey]) fileMap[fileKey] = [];
    fileMap[fileKey].push(record);
  });

  let fileCount = 0;
  for (const [fileKey, questions] of Object.entries(fileMap)) {
    const absPath = path.join(JSON_ROOT, fileKey);
    writeJson(absPath, questions);
    console.log(`   ✅ ${fileKey} (${questions.length} questions)`);
    fileCount++;
  }
  console.log(`\n   📦 ${fileCount} JSON files written.\n`);

  // ── Step 7: Generate all reports ──
  console.log('📊 Step 7: Generating reports...');

  const reports = [
    ['Validation_Report.md',       generateValidationReport(blocks, validation, records.length)],
    ['Duplicate_Report.md',        generateDuplicateReport(blocks)],
    ['JSON_Summary.md',            generateJSONSummary(records, fileMap)],
    ['Category_Distribution.md',   generateCategoryDist(records)],
    ['Topic_Distribution.md',      generateTopicDist(records)],
    ['Difficulty_Distribution.md', generateDifficultyDist(records)],
    ['Import_Readiness_Report.md', generateImportReadiness(records, validation, fileMap)],
  ];

  reports.forEach(([name, content]) => {
    fs.writeFileSync(path.join(REPORTS_ROOT, name), content, 'utf8');
    console.log(`   ✅ ${name}`);
  });

  // ── Final Summary ──
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║             PIPELINE COMPLETE ✅                 ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`\n  📝 Questions parsed    : ${blocks.length}`);
  console.log(`  ✅ Records converted   : ${records.length}`);
  console.log(`  ❌ Validation errors   : ${validation.errors.length}`);
  console.log(`  ⚠️  Warnings            : ${validation.warnings.length}`);
  console.log(`  📁 JSON files created  : ${fileCount}`);
  console.log(`  📊 Reports generated   : ${reports.length}`);
  console.log('\n  👉 Next: Review Import_Readiness_Report.md, then run import script.\n');
}

run().catch(err => {
  console.error('\n❌ PIPELINE FAILED:', err.message);
  process.exit(1);
});
