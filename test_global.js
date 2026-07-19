import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTest() {
  console.log("Authenticating...");
  // Log in using an existing user or mock token. 
  // We need the email/password of a user, or we can just try to sign up a dummy user.
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: 'test_global_' + Date.now() + '@example.com',
    password: 'password123'
  });
  
  if (authError) {
    console.error("Auth error:", authError);
    return;
  }
  
  const user = authData.user;
  console.log("Logged in as:", user.id);

  console.log("Attempting RPC join_global_match...");
  const { data: matchId, error } = await supabase.rpc('join_global_match');
  if (error) {
    console.error("RPC Error:", error);
  } else {
    console.log("RPC returned matchId:", matchId);
  }

  console.log("Attempting INSERT...");
  const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const { data: newMatch, error: insertError } = await supabase
    .from('friendly_matches')
    .insert([{
      host_id: user.id,
      status: 'waiting_global',
      question_ids: [],
      join_code: joinCode,
      paper_config: {}
    }])
    .select()
    .single();

  if (insertError) {
    console.error("Insert Error:", insertError);
  } else {
    console.log("Inserted match successfully:", newMatch.id);
  }
}

runTest();
