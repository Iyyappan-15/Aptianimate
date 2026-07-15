import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = {};
fs.readFileSync('.env', 'utf-8').split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const sb = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_SERVICE_ROLE_KEY || env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { error: insertErr } = await sb.from('assessment_questions').insert([{ id: '00000000-0000-0000-0000-000000000000' }]);
  console.log('Insert Error 2:', insertErr);
}
run();
