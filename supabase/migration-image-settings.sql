-- ═══════════════════════════════════════════════════════════════════════════
--  Adds per-photo framing (position + zoom) set from the admin panel.
--  Run once in the Supabase SQL Editor. Safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

-- Maps a photo URL to how it should be framed on the card, e.g.
--   {"https://…/abc.jpg": {"x": 50, "y": 35, "zoom": 1.2}}
-- x and y are object-position percentages; zoom is a multiplier from 1 to 3.
alter table public.cars
  add column if not exists image_settings jsonb not null default '{}'::jsonb;
