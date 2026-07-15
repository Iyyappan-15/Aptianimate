import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = {};
fs.readFileSync('.env', 'utf-8').split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

console.log("Using URL:", env.VITE_SUPABASE_URL);
console.log("Using Key:", env.VITE_SUPABASE_SERVICE_ROLE_KEY ? "Service Role" : "Anon");

// Let's deliberately use anon key to test if it's returning [] due to RLS
const sb = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await sb.from('assessment_questions').select('*').limit(5);
  console.log('assessment_questions:', data);
  console.log('Error:', error);
}
run();
