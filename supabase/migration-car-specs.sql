-- ═══════════════════════════════════════════════════════════════════════════
--  Adds boot capacity and drivetrain to the car record.
--  Run once in the Supabase SQL Editor. Safe to re-run.
-- ═══════════════════════════════════════════════════════════════════════════

-- Nullable on purpose: cars added before this migration have no value yet, and
-- a NOT NULL column would need a made-up default for them. Both fields are
-- required by the admin form, so anything added or edited from now on has them;
-- the card simply omits a spec it does not have.
alter table public.cars
  add column if not exists trunk_liters integer,
  add column if not exists drivetrain   text;

alter table public.cars drop constraint if exists cars_trunk_liters_check;
alter table public.cars
  add constraint cars_trunk_liters_check
  check (trunk_liters is null or (trunk_liters > 0 and trunk_liters <= 5000));

alter table public.cars drop constraint if exists cars_drivetrain_check;
alter table public.cars
  add constraint cars_drivetrain_check
  check (drivetrain is null or drivetrain in ('FWD', 'RWD', 'AWD', '4WD'));

-- The two cars added before this migration still need filling in:
select id, name, trunk_liters, drivetrain
from public.cars
where trunk_liters is null or drivetrain is null;
