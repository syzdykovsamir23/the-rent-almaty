-- ═══════════════════════════════════════════════════════════════════════════
--  Run this once on the existing project (SQL Editor).
--  Safe to re-run; it only tightens what is already there.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Constrain the photo bucket at the server, not just in the admin form.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'car-photos', 'car-photos', true, 8388608,
  array['image/jpeg','image/png','image/webp','image/avif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- 2. Confirm RLS is on for both tables (should print rowsecurity = true twice).
select relname, relrowsecurity as rls_enabled
from pg_class
where relname in ('cars', 'admins') and relnamespace = 'public'::regnamespace;

-- 3. Confirm who currently has admin rights (should be exactly the owner).
select user_id, email, created_at from public.admins;
