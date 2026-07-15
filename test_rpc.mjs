import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = {};
fs.readFileSync('.env', 'utf-8').split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const sb = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await sb.rpc('submit_friendly_match', { 
    p_match_id: '123e4567-e89b-12d3-a456-426614174000', 
    p_answers: [{ question_id: "Q001", selected_option: "A" }],
    p_completion_time_seconds: 60
  });
  console.log('Error:', error);
}
run();
