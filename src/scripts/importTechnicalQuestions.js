/**
 * importTechnicalQuestions.js
 * Imports the technical questions into Supabase.
 * Handles the raw JSON structure internally.
 */
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const INPUT = 'C:/Users/acer/Desktop/questions/tcs/technical_questions.txt';

async function run() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) { console.error('❌ Missing env vars'); process.exit(1); }
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  console.log('Reading JSON…');
  let raw = fs.readFileSync(INPUT, 'utf8');
  
  // The file has concatenated arrays, e.g. "]\n[" or "]["
  // We can fix this by replacing all occurrences of "]" followed by whitespace and "[" with a comma ","
  raw = raw.replace(/\]\s*\[/g, ',');
  
  // Also clean unescaped newlines inside strings if they exist, to ensure valid JSON parsing
  let fixed = '';
  let inString = false, escape = false;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (inString) {
      if (escape) { fixed += c; escape = false; }
      else if (c === '\\') { fixed += c; escape = true; }
      else if (c === '"') { fixed += c; inString = false; }
      else if (c === '\n' || c === '\r') { fixed += ' '; } // replace newlines inside strings
      else { fixed += c; }
    } else {
      fixed += c;
      if (c === '"') inString = true;
    }
  }

  let data;
  try {
    data = JSON.parse(fixed);
  } catch (e) {
    console.error('❌ Still invalid JSON after fix:', e.message);
    process.exit(1);
  }

  console.log(`✅ Parsed ${data.length} questions. Importing...`);

  // Format to match DB lowercase columns
  const formatted = data.map(q => {
    const { correctAnswer, questionType, ...rest } = q;
    return {
      ...rest,
      questiontype: questionType || 'MCQ',
      correctanswer: correctAnswer,
      options: Array.isArray(q.options) ? q.options : Object.values(q.options || {}),
    };
  });

  // Supabase limits upsert batches, so let's chunk it (500 rows at a time)
  const CHUNK_SIZE = 500;
  let totalInserted = 0;
  
  for (let i = 0; i < formatted.length; i += CHUNK_SIZE) {
    const chunk = formatted.slice(i, i + CHUNK_SIZE);
    const { error } = await supabase
      .from('technical_questions')
      .upsert(chunk, { onConflict: 'id' });

    if (error) {
      console.error('❌ Upsert failed on chunk:', error.message);
      process.exit(1);
    }
    totalInserted += chunk.length;
    console.log(`... Inserted ${totalInserted} / ${formatted.length}`);
  }

  console.log(`✅ Successfully ingested ${totalInserted} technical questions!`);
}

run();
