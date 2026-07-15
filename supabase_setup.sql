-- ==============================================================================
-- PHASE 1: APTIANIMATE ASSESSMENT QUESTION BANK SCHEMA
-- Copy and paste this entirely into your Supabase SQL Editor and run it.
-- ==============================================================================

-- 1. Create Question Status Enum
CREATE TYPE question_status AS ENUM ('draft', 'verified', 'published', 'archived');

-- 2. Create Assessment Questions Table
CREATE TABLE public.assessment_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,         -- 'quantitative', 'logical', 'verbal', 'technical'
  topic TEXT NOT NULL,
  subtopic TEXT,
  difficulty TEXT NOT NULL,       -- 'easy', 'medium', 'hard'
  question TEXT NOT NULL,
  options JSONB NOT NULL,         -- Flexible array: ["A) 10", "B) 20"]
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  estimated_time INT,
  company_tags TEXT[],            -- STRICTLY lowercase: ['tcs', 'infosys']
  source TEXT,
  version INT DEFAULT 1,
  
  -- Admin Workflow Fields --
  status question_status DEFAULT 'draft',
  created_by UUID REFERENCES auth.users(id), -- Tracks which admin imported this
  
  question_hash TEXT UNIQUE,      -- Prevents duplicate imports (SHA-256)
  random_seed FLOAT DEFAULT random(), -- CRITICAL for zero-cost random generation
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Essential Performance Indexes
CREATE INDEX idx_assessment_category ON public.assessment_questions(category, status);
CREATE INDEX idx_assessment_company ON public.assessment_questions USING GIN(company_tags);
CREATE INDEX idx_assessment_random ON public.assessment_questions(random_seed);

-- 4. Enable Row Level Security (RLS) on Questions
ALTER TABLE public.assessment_questions ENABLE ROW LEVEL SECURITY;

-- IMPORTANT SECURITY POLICY:
-- Regular users CANNOT read assessment questions directly. 
-- They must use the Secure RPC functions (which we will create in Phase 2) to get a paper without answers.
-- Admins CAN read all questions.
CREATE POLICY "Admins can manage all assessment questions" 
  ON public.assessment_questions
  FOR ALL
  USING (
    -- Assuming your auth system assigns 'admin' or 'super_admin' roles.
    -- If you use a custom profile table for roles, you may need to adjust this.
    -- For now, we'll restrict direct SELECT entirely to prevent accidental answer leakage.
    false 
  );

-- ==============================================================================
-- 5. Mock Tests Table
-- Tracks a user's attempt at a mock test
-- ==============================================================================
CREATE TABLE public.mock_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  status TEXT DEFAULT 'in_progress', -- 'in_progress', 'completed'
  start_time TIMESTAMPTZ DEFAULT NOW(),
  end_time TIMESTAMPTZ,
  score INT DEFAULT 0,
  total_questions INT NOT NULL,
  correct_count INT DEFAULT 0,
  incorrect_count INT DEFAULT 0,
  unanswered_count INT DEFAULT 0,
  paper_config JSONB, -- The config used to generate it: { quant: 20, logical: 20 }
  question_ids UUID[] NOT NULL, -- Array of IDs generated for this test
  user_answers JSONB, -- The answers the user submitted
  analytics JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;

-- Users can only read their own mock tests
CREATE POLICY "Users can view their own mock tests"
  ON public.mock_tests FOR SELECT
  USING (auth.uid() = user_id);

-- ==============================================================================
-- 6. Friendly Matches Table
-- ==============================================================================
CREATE TABLE public.friendly_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  join_code TEXT UNIQUE NOT NULL, -- Short code like "ABC-123"
  host_id UUID REFERENCES auth.users(id) NOT NULL,
  opponent_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'waiting', -- 'waiting', 'in_progress', 'completed'
  question_ids UUID[] NOT NULL, -- Pre-generated paper for both players
  paper_config JSONB,
  host_score INT,
  opponent_score INT,
  host_time_taken INT,
  opponent_time_taken INT,
  winner_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.friendly_matches ENABLE ROW LEVEL SECURITY;

-- Anyone can read a match if they have the join code (handled by RPC usually, but allow SELECT)
CREATE POLICY "Anyone can read friendly matches"
  ON public.friendly_matches FOR SELECT
  USING (true);
