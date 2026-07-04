-- Supabase Schema for AptitudeAnimate

-- 1. Bookmarks Table
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure a user can only bookmark a topic once
ALTER TABLE public.bookmarks ADD CONSTRAINT bookmarks_user_id_topic_name_key UNIQUE (user_id, topic_name);

-- 2. Topic Progress Table
CREATE TABLE IF NOT EXISTS public.topic_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_name TEXT NOT NULL,
  completion_percentage NUMERIC DEFAULT 0,
  completed_status BOOLEAN DEFAULT false,
  last_viewed TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure one progress record per user per topic
ALTER TABLE public.topic_progress ADD CONSTRAINT topic_progress_user_id_topic_name_key UNIQUE (user_id, topic_name);

-- 3. Roadmap Progress Table
CREATE TABLE IF NOT EXISTS public.roadmap_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  current_phase TEXT,
  unlocked_phase JSONB,
  completed_topics NUMERIC DEFAULT 0,
  total_topics NUMERIC DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure one roadmap progress record per user
ALTER TABLE public.roadmap_progress ADD CONSTRAINT roadmap_progress_user_id_key UNIQUE (user_id);


-- --------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- --------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;

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
