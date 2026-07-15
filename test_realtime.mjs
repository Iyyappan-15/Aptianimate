import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const env = {};
fs.readFileSync('.env', 'utf-8').split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const sb = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const channel = sb.channel('test-channel');

channel.on('broadcast', { event: 'test_event' }, payload => {
  console.log('Received broadcast:', payload);
});

channel.subscribe((status) => {
  console.log('Status:', status);
  if (status === 'SUBSCRIBED') {
    channel.send({
      type: 'broadcast',
      event: 'test_event',
      payload: { hello: 'world' }
    }).then(res => {
      console.log('Send result:', res);
      setTimeout(() => process.exit(0), 1000);
    });
  }
});
