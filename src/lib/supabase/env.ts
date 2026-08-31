/**
 * The site must render fully before Supabase is wired up: the catalog simply
 * shows its empty state. Every Supabase entry point therefore goes through
 * this guard instead of throwing on a missing key.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
