# THE RENT — car rental, Almaty

Marketing site + car catalog + owner's admin panel.
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Supabase.

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:3000 (the preview config in `../.claude/launch.json`
uses port 3055).

The site runs fine **without** Supabase: the catalog shows its empty state and
the admin panel explains what is missing. Nothing else degrades.

## Supabase

`.env.local` already holds the project URL and the anon key, and the schema is
live: `cars`, `admins`, the `car-photos` bucket and every RLS policy are in
place and were verified against the running project (anonymous writes are
rejected on all of them).

Two things still need the dashboard, because they cannot be done with the anon
key:

1. **Turn off public signup** — `Authentication → Sign In / Providers → Email`,
   disable *Allow new users to sign up*. It is currently **on**, so anyone can
   register an account on the project. They still cannot touch the catalog (the
   `is_admin()` check blocks every write), but there is no reason to leave it open.
2. **Run `supabase/hardening.sql`** in the SQL Editor. It caps the photo bucket
   at 8 MB and raster formats only, and prints which accounts hold admin rights.

The owner account itself is created in `Authentication → Users` and then added
to `public.admins` — step 4 of `supabase/README.md`. Signing in is deliberately
not enough on its own.

## What lives where

| Path | What it is |
| --- | --- |
| `src/lib/site.ts` | Brand name, phone, email, WhatsApp/WeChat/map links. **Change contacts here.** |
| `src/i18n/dictionaries/en.ts` | All page copy. Other locales override it key by key. |
| `src/i18n/dictionaries/{ru,kk,zh,ar,ko,th}.ts` | Full translations for the other six languages. |
| `src/lib/cars.ts` | The only read path for the catalog. |
| `src/app/admin/actions.ts` | Create / update / delete server actions. |
| `supabase/schema.sql` | Tables, RLS policies, storage bucket. |
| `supabase/migration-image-settings.sql` | Adds the per-photo framing column. **Run once.** |
| `supabase/migration-car-specs.sql` | Adds boot capacity and drivetrain. **Run once.** |
| `public/images/` | Site photography — see `PHOTO-CREDITS.md`. |

## Language system

Seven languages (Russian, Kazakh, English, Chinese, Arabic, Korean, Thai). A
full-screen picker appears on the first visit; after that the navbar switcher
handles it and the choice is remembered in `localStorage`. Arabic flips the
whole layout to RTL — the components use logical properties (`ms-`, `pe-`,
`start-`, `end-`) so nothing needs a mirrored stylesheet.

All seven dictionaries are fully translated (142 keys each), including body
types, place names and the photo-credits page. `src/i18n/dictionaries/en.ts` is
the reference shape; every other locale overrides it key by key, so an unfinished
key falls back to English instead of blanking the page.

The locale lives in `localStorage` rather than the URL. Moving to `/[locale]`
routes later is a mechanical change — the dictionaries are already split per
locale — and is worth doing when SEO per language starts to matter.

## Deploy

Live on Vercel, linked to `syzdykovsamir23/the-rent-almaty` — every push to
`main` redeploys.

- Project: https://vercel.com/tyler-s-projects5/the-rent-almaty
- Production: https://the-rent-almaty-tyler-s-projects5.vercel.app

The two `NEXT_PUBLIC_SUPABASE_*` values live in `.env.production` in the repo.
They are public by design — `NEXT_PUBLIC_*` is inlined into the client bundle,
so every visitor receives them regardless; row-level security is what protects
the data. Setting the same names in the Vercel dashboard overrides the file,
which is the route to take whenever the key is rotated.

`next.config.ts` derives the allowed image host from the Supabase URL, so car
photos uploaded through the admin panel are served through `next/image`
automatically.

## Security

- Every write path is gated by RLS plus an `admins` allowlist, not by the UI.
  The anon key in the client bundle is public by design and cannot write.
- `next.config.ts` sends CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options` and `Permissions-Policy`; `/admin/*` also sends
  `X-Robots-Tag: noindex`.
- `?next=` on the login page is restricted to same-site `/admin` paths, so it
  cannot be used as an open redirect.
- Photo uploads accept JPEG/PNG/WebP/AVIF up to 8 MB, and the stored extension
  comes from the sniffed MIME type rather than the file name.

## Checking the build

```bash
npm run audit:i18n        # every locale complete, nothing left in English
npm run audit:responsive  # layout at 13 widths x 7 languages
```

`audit:i18n` compares each locale against the English reference and fails on a
missing key, an unknown key, or a value still sitting at the English text.

`audit:responsive`

renders both pages at thirteen widths from 320px to 1920px in all seven
languages — 182 combinations — and reports three things only: the page
scrolling sideways, text cut off by its own box, and anything sticking out of
the viewport once ancestor clipping is accounted for. A deliberately zoomed car
photo overflows its crop box by design, so that is not counted.

Needs the dev server running (`npm run dev`) and Playwright's chromium shell
(`npx playwright install chromium --only-shell`).

## Car specs

A car record carries name, body type, year, transmission, seats, drivetrain,
boot capacity in litres, price per day, photos, description and an availability
flag. Drivetrain and boot capacity are required by the form but nullable in the
database, so the cars added before `supabase/migration-car-specs.sql` are not
invalidated — their cards simply show three specs instead of five until someone
opens them in the admin panel and fills the two fields in.

## Photo framing

Each car photo carries its own framing — position and zoom — set by dragging it
inside a preview that uses the exact CSS the public card uses. It is stored in
`cars.image_settings`, a JSON map from photo URL to `{x, y, zoom}`.

That column is added by `supabase/migration-image-settings.sql`. Until it is run,
the admin panel still saves everything else and says so, and the public cards
fall back to centred, un-zoomed photos.

## Still placeholder

- Testimonials (three sample reviews) — the Google reviews link is real.
- The five landscape photos in `public/images/` are free-licence stock whose
  licence requires attribution. `PHOTO-CREDITS.md` records it; see the open item
  at the bottom of that file.
