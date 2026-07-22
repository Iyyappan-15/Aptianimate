-- ══════════════════════════════════════════════════════════════════════
-- Migration: 002 — Admin Role System
-- AptiAnimate | Created: 2026-07-20
--
-- Adds: role-based admin system, system_settings table, and admin RLS policies.
-- Run AFTER migration 001. Safe to re-run (uses IF EXISTS / ON CONFLICT).
-- ══════════════════════════════════════════════════════════════════════

-- ────────────────────────────────────────────────────────────────────
-- STEP 1: ENSURE role COLUMN EXISTS ON profiles
-- (migration 001 already adds it, but this is safe to re-run)
-- ────────────────────────────────────────────────────────────────────
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- ────────────────────────────────────────────────────────────────────
-- STEP 2: ADD ADMIN UPDATE POLICY
-- Allows admins and super_admins to update any user's profile
-- (e.g. to change another user's role or issue warnings)
-- ────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;

CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('admin', 'super_admin')
    )
  );

-- ────────────────────────────────────────────────────────────────────
-- STEP 3: SYSTEM SETTINGS TABLE
-- Single-row table (id = 1 enforced via CHECK) for global app settings.
-- ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.system_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),   -- Enforces single-row
  maintenance_mode BOOLEAN DEFAULT false,
  announcement_text TEXT,
  contact_email TEXT DEFAULT 'support@aptianimate.com',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed default row (idempotent)
INSERT INTO public.system_settings (id, maintenance_mode, announcement_text, contact_email)
VALUES (1, false, NULL, 'support@aptianimate.com')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read settings (e.g. maintenance_mode banner, announcement)
DROP POLICY IF EXISTS "System settings are publicly viewable" ON public.system_settings;
CREATE POLICY "System settings are publicly viewable" ON public.system_settings
  FOR SELECT USING (true);

-- Only admins can update settings
DROP POLICY IF EXISTS "Only admins can update system settings" ON public.system_settings;
CREATE POLICY "Only admins can update system settings" ON public.system_settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.role IN ('admin', 'super_admin')
    )
  );

-- ────────────────────────────────────────────────────────────────────
-- STEP 4: ASSIGN SUPER ADMIN ACCOUNTS
-- ⚠️  Replace email addresses with your own before running.
-- ────────────────────────────────────────────────────────────────────
UPDATE public.profiles
SET role = 'super_admin'
WHERE id IN (
  SELECT id FROM auth.users
  WHERE email IN (
    'studyprojects2005@gmail.com',
    'iyyappan200509@gmail.com'
  )
);
