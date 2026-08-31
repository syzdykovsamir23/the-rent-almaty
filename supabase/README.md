# Supabase setup

Run these once, in order.

1. **Create the project** at https://supabase.com/dashboard, then copy
   `Project Settings → API → Project URL` and the `anon public` key into
   `.env.local` (see `.env.example`).

2. **Create the schema**: open `SQL Editor`, paste all of `schema.sql`, run it.

3. **Create the owner account**: `Authentication → Users → Add user`, with a
   real email and a password. Copy the new user's UUID.

4. **Grant admin rights** — being logged in is deliberately not enough:

   ```sql
   insert into public.admins (user_id, email)
   values ('<paste-the-uuid>', '<the-email>');
   ```

5. **Close public signup** so nobody else can create an account:
   `Authentication → Sign In / Providers → Email → disable "Allow new users to sign up"`.

Step 4 and step 5 are what keep the catalog writable by the owner only. The
`is_admin()` check in every write policy fails for any account not in
`public.admins`, so an account created before signup was closed still cannot
touch the fleet.
