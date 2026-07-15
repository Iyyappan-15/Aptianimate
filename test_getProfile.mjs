import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = {};
fs.readFileSync('.env', 'utf-8').split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const sb = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function test() {
  console.log('Testing getProfile...');
  const start = Date.now();
  // Using a random UUID
  const { data, error } = await sb.from('profiles').select('*').eq('id', '123e4567-e89b-12d3-a456-426614174000').maybeSingle();
  console.log('Finished in', Date.now() - start, 'ms');
  console.log('Data:', data);
  console.log('Error:', error);
  process.exit(0);
}
test();
