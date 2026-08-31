-- ═══════════════════════════════════════════════════════════════════════════
--  THE RENT — database schema
--  Run once in the Supabase SQL Editor of a fresh project.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Admin allowlist ────────────────────────────────────────────────────────
-- Being logged in is NOT enough to edit the fleet: the account also has to be
-- listed here. Without this, anyone who signs up through the public Supabase
-- auth endpoint could write to the catalog.
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  email      text,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- An admin may read the allowlist (used by the UI to confirm access);
-- nobody can write to it from the client — add rows from the SQL Editor.
drop policy if exists "admins read self" on public.admins;
create policy "admins read self"
  on public.admins for select
  to authenticated
  using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

-- ── Cars ───────────────────────────────────────────────────────────────────
create table if not exists public.cars (
  id            uuid primary key default gen_random_uuid(),
  name          text        not null,
  type          text        not null check (type in ('Economy','Sedan','SUV','4WD','Premium')),
  year          integer     not null check (year between 1990 and 2100),
  transmission  text        not null check (transmission in ('Automatic','Manual')),
  seats         integer     not null check (seats between 1 and 20),
  price_per_day integer     not null check (price_per_day >= 0),
  description   text,
  images        text[]      not null default '{}',
  available     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists cars_available_idx on public.cars (available);
create index if not exists cars_type_idx      on public.cars (type);
create index if not exists cars_price_idx     on public.cars (price_per_day);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cars_touch_updated_at on public.cars;
create trigger cars_touch_updated_at
  before update on public.cars
  for each row execute function public.touch_updated_at();

alter table public.cars enable row level security;

-- Public site: only cars the owner has marked available.
drop policy if exists "cars public read" on public.cars;
create policy "cars public read"
  on public.cars for select
  to anon, authenticated
  using (available = true or public.is_admin());

-- Admin panel: full write access, allowlist only.
drop policy if exists "cars admin insert" on public.cars;
create policy "cars admin insert"
  on public.cars for insert to authenticated with check (public.is_admin());

drop policy if exists "cars admin update" on public.cars;
create policy "cars admin update"
  on public.cars for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "cars admin delete" on public.cars;
create policy "cars admin delete"
  on public.cars for delete to authenticated using (public.is_admin());

-- ── Storage bucket for car photos ──────────────────────────────────────────
-- Raster images only, 8 MB each. The admin form checks this too, but the
-- bucket is the boundary that actually holds: a signed-in admin could
-- otherwise POST straight to the storage API.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'car-photos', 'car-photos', true, 8388608,
  array['image/jpeg','image/png','image/webp','image/avif']
)
on conflict (id) do update
  set public             = excluded.public,
      file_size_limit    = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "car photos public read" on storage.objects;
create policy "car photos public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'car-photos');

drop policy if exists "car photos admin write" on storage.objects;
create policy "car photos admin write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'car-photos' and public.is_admin());

drop policy if exists "car photos admin delete" on storage.objects;
create policy "car photos admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'car-photos' and public.is_admin());
