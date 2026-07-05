-- ============================================================
-- AptiAnimate Analytics Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Table 1: practice_sessions
-- Records every time a user attempts/solves a question
CREATE TABLE IF NOT EXISTS public.practice_sessions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  topic       TEXT,
  solved      BOOLEAN DEFAULT FALSE,
  time_seconds INTEGER DEFAULT 0,          -- How long they spent on this question
  session_date DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Index for fast user + date queries
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_date
  ON public.practice_sessions(user_id, session_date);

CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id
  ON public.practice_sessions(user_id);

-- Table 2: daily_activity
-- Aggregated per-day stats (upserted after each session)
CREATE TABLE IF NOT EXISTS public.daily_activity (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id           UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_date     DATE NOT NULL,
  problems_solved   INTEGER DEFAULT 0,
  minutes_practiced INTEGER DEFAULT 0,
  topics_studied    TEXT[] DEFAULT '{}',
  sessions_count    INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, activity_date)
);

CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date
  ON public.daily_activity(user_id, activity_date);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_activity ENABLE ROW LEVEL SECURITY;

-- practice_sessions policies
CREATE POLICY "Users can view own sessions" ON public.practice_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON public.practice_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON public.practice_sessions
  FOR DELETE USING (auth.uid() = user_id);

-- daily_activity policies
CREATE POLICY "Users can view own activity" ON public.daily_activity
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own activity" ON public.daily_activity
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activity" ON public.daily_activity
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own activity" ON public.daily_activity
  FOR DELETE USING (auth.uid() = user_id);
