-- ────────────────────────────────────────────────────────
-- 1. PROFILES UPDATE (Roles)
-- ────────────────────────────────────────────────────────

-- Add role column to profiles if it doesn't exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Create policy allowing admins to update profiles (requires role column)
CREATE POLICY "Admins can update any profile" ON public.profiles 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin')
    )
  );

-- ────────────────────────────────────────────────────────
-- 2. SYSTEM SETTINGS TABLE
-- ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.system_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1), -- Enforce single row
  maintenance_mode BOOLEAN DEFAULT false,
  announcement_text TEXT,
  contact_email TEXT DEFAULT 'support@aptianimate.com',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert the default single row if it doesn't exist
INSERT INTO public.system_settings (id, maintenance_mode, announcement_text, contact_email)
VALUES (1, false, NULL, 'support@aptianimate.com')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read settings
CREATE POLICY "System settings are publicly viewable" ON public.system_settings
  FOR SELECT USING (true);

-- Only admins can update settings
CREATE POLICY "Only admins can update system settings" ON public.system_settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role IN ('admin', 'super_admin')
    )
  );

-- ────────────────────────────────────────────────────────
-- 3. ASSIGN SUPER ADMIN
-- ────────────────────────────────────────────────────────

-- Set studyprojects2005@gmail.com to super_admin.
-- Note: We have to find their UUID from the auth.users table.

UPDATE public.profiles
SET role = 'super_admin'
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'studyprojects2005@gmail.com'
);
