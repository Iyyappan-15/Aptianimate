-- ══════════════════════════════════════════════════════════════════════
-- Migration: 001 — Initial Schema
-- AptiAnimate | Created: 2026-07-20
--
-- This is the source-of-truth schema for all core tables.
-- Run this ONCE on a fresh Supabase project.
-- Re-running is safe: DROP IF EXISTS is used before each table.
-- ══════════════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────────────────────────
-- STEP 1: CLEAN SLATE — DROP OLD TABLES IF THEY EXIST
-- (Safe to re-run: CASCADE removes dependent policies automatically)
-- ────────────────────────────────────────────────────────────────────
DROP TABLE IF EXISTS public.question_bookmarks CASCADE;
DROP TABLE IF EXISTS public.roadmap_progress CASCADE;
DROP TABLE IF EXISTS public.topic_progress CASCADE;
DROP TABLE IF EXISTS public.bookmarks CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ────────────────────────────────────────────────────────────────────
-- STEP 2: CREATE TABLES
-- ────────────────────────────────────────────────────────────────────

-- Profiles Table
-- Stores public user profile data. Linked to Supabase auth.users via UUID.
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',                       -- Values: 'user' | 'admin' | 'super_admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Topic Bookmarks Table
-- Stores which learning topics a user has bookmarked.
CREATE TABLE public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT bookmarks_user_id_topic_name_key UNIQUE (user_id, topic_name)
);

-- Topic Learning Progress Table
-- Tracks completion percentage per topic per user.
CREATE TABLE public.topic_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_name TEXT NOT NULL,
  completion_percentage NUMERIC DEFAULT 0,
  completed_status BOOLEAN DEFAULT false,
  last_viewed TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT topic_progress_user_id_topic_name_key UNIQUE (user_id, topic_name)
);

-- Roadmap Learning Progress Table
-- Tracks overall roadmap phase progress per user.
CREATE TABLE public.roadmap_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  current_phase TEXT,
  unlocked_phase JSONB,
  completed_topics NUMERIC DEFAULT 0,
  total_topics NUMERIC DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT roadmap_progress_user_id_key UNIQUE (user_id)
);

-- Individual Question Bookmarks Table
-- Stores specific questions (with full data) a user has bookmarked.
CREATE TABLE public.question_bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_slug TEXT NOT NULL,
  topic_name TEXT NOT NULL,
  question_text TEXT NOT NULL,
  question_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT question_bookmarks_user_question_key UNIQUE (user_id, topic_slug, question_text)
);

-- ────────────────────────────────────────────────────────────────────
-- STEP 3: ENABLE ROW LEVEL SECURITY (RLS)
-- ────────────────────────────────────────────────────────────────────
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_bookmarks ENABLE ROW LEVEL SECURITY;

-- ────────────────────────────────────────────────────────────────────
-- STEP 4: DEFINE RLS POLICIES
-- ────────────────────────────────────────────────────────────────────

-- Profiles Policies
CREATE POLICY "Profiles are publicly viewable" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- SECURITY NOTE: WITH CHECK prevents users from self-promoting their own role.
-- The role value after update MUST equal the role value before update.
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
  );

-- Bookmarks Policies
CREATE POLICY "Users can view their own bookmarks" ON public.bookmarks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own bookmarks" ON public.bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own bookmarks" ON public.bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- Topic Progress Policies
CREATE POLICY "Users can view their own topic progress" ON public.topic_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own topic progress" ON public.topic_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own topic progress" ON public.topic_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Roadmap Progress Policies
CREATE POLICY "Users can view their own roadmap progress" ON public.roadmap_progress
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own roadmap progress" ON public.roadmap_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own roadmap progress" ON public.roadmap_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Question Bookmarks Policies
CREATE POLICY "Users can view their own question bookmarks" ON public.question_bookmarks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own question bookmarks" ON public.question_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own question bookmarks" ON public.question_bookmarks
  FOR DELETE USING (auth.uid() = user_id);
