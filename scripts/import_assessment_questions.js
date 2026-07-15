import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// Use service role key if available for admin tasks, otherwise anon key (needs RLS bypass or admin role)
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const questionSchema = z.object({
  category: z.string(),
  topic: z.string(),
  subtopic: z.string().optional().nullable(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  question: z.string().min(5),
  options: z.array(z.string()).min(2),
  correct_answer: z.string(),
  explanation: z.string().optional().nullable(),
  estimated_time: z.number().int().positive().optional().nullable(),
  company_tags: z.array(z.string()).optional().default([]),
  source: z.string().optional().nullable(),
}).refine(data => data.options.includes(data.correct_answer), {
  message: "correct_answer must exactly match one of the options",
  path: ["correct_answer"]
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BANK_DIR = path.join(__dirname, '..', 'assessment-bank');
const REVIEW_DIR = path.join(__dirname, '..', 'assessment-bank', 'manual-review');

// Ensure directories exist
if (!fs.existsSync(BANK_DIR)) {
  fs.mkdirSync(BANK_DIR, { recursive: true });
}
if (!fs.existsSync(REVIEW_DIR)) {
  fs.mkdirSync(REVIEW_DIR, { recursive: true });
}

function generateHash(question, options) {
  const hash = crypto.createHash('sha256');
  hash.update(question);
  hash.update(JSON.stringify(options));
  return hash.digest('hex');
}

async function processFile(filePath) {
  console.log(`Processing: ${filePath}`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const rawData = JSON.parse(fileContent);
    
    // Support either a single object or an array of objects
    const questions = Array.isArray(rawData) ? rawData : [rawData];
    
    const validQuestions = [];
    const invalidQuestions = [];

    for (const item of questions) {
      try {
        const validated = questionSchema.parse(item);
        
        // Enforce lowercase company tags
        validated.company_tags = validated.company_tags.map(tag => tag.toLowerCase());
        
        // Generate hash to prevent duplicate imports
        const question_hash = generateHash(validated.question, validated.options);
        
        validQuestions.push({
          ...validated,
          status: item.status || 'draft',
          question_hash,
          // random_seed defaults dynamically in Postgres
        });
      } catch (err) {
        console.error(`Validation failed for a question in ${filePath}:`);
        console.error(err.errors || err);
        invalidQuestions.push(item);
      }
    }

    if (invalidQuestions.length > 0) {
      const fileName = path.basename(filePath);
      const reviewPath = path.join(REVIEW_DIR, `failed_${Date.now()}_${fileName}`);
      fs.writeFileSync(reviewPath, JSON.stringify(invalidQuestions, null, 2));
      console.warn(`Moved ${invalidQuestions.length} invalid questions to manual-review: ${reviewPath}`);
    }

    if (validQuestions.length > 0) {
      // Upsert in batches of 100 to respect Supabase API limits
      const batchSize = 100;
      for (let i = 0; i < validQuestions.length; i += batchSize) {
        const batch = validQuestions.slice(i, i + batchSize);
        const { error } = await supabase
          .from('assessment_questions')
          .upsert(batch, { onConflict: 'question_hash' });
          
        if (error) {
          console.error("Supabase UPSERT Error:", error);
        } else {
          console.log(`Successfully imported batch of ${batch.length} questions`);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading or parsing file ${filePath}:`, error.message);
  }
}

function findJsonFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      // Don't scan the manual-review folder
      if (file !== 'manual-review') {
        findJsonFiles(path.join(dir, file), fileList);
      }
    } else if (file.endsWith('.json')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

async function runImport() {
  console.log("Scanning for assessment bank JSON files in:", BANK_DIR);
  const files = findJsonFiles(BANK_DIR);
  
  if (files.length === 0) {
    console.log("No JSON files found in assessment-bank/");
    console.log("Please add .json files in folders like assessment-bank/quantitative/topic/");
    return;
  }

  for (const file of files) {
    await processFile(file);
  }
  
  console.log("Import process complete.");
}

runImport();
