# Supabase Migrations

This directory contains the version-controlled database schema for **AptiAnimate**.

## How to Apply Migrations

Run these files in order in the **Supabase SQL Editor**:
> Dashboard → Your Project → SQL Editor → New Query → Paste → Run

| # | File | Description |
|---|---|---|
| 001 | `001_initial_schema.sql` | Creates all core tables, enables RLS, defines base policies |
| 002 | `002_admin_roles.sql` | Adds role system, system_settings table, admin RLS policies |

## How to Add Future Migrations

1. Create a new file: `003_your_description.sql`
2. Write additive SQL only — use `IF NOT EXISTS`, `IF EXISTS`, `ON CONFLICT DO NOTHING`
3. Test it in the Supabase SQL Editor on your **dev project** first
4. Commit and push the file so the team can apply it

> ⚠️ **Never edit existing migration files** after they have been applied to production.
> Always create a new numbered migration file for any schema change.
