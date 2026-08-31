import { createClient } from "@/lib/supabase/server";
import type { Car } from "@/lib/types";
import type { CarType } from "@/lib/site";

/** `%` and `_` are ilike wildcards — a search for "50%" must not match everything. */
function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (c) => `\\${c}`);
}

export type CarFilters = {
  types?: CarType[];
  minPrice?: number;
  maxPrice?: number;
  /** Admin list only — the public site never asks for unavailable cars. */
  includeUnavailable?: boolean;
  search?: string;
  limit?: number;
};

/**
 * Single read path for the catalog. Every caller (homepage carousel, catalog
 * page, admin table) goes through here so filtering rules stay in one place.
 * Returns [] whenever Supabase is not configured or the query fails, which is
 * what drives the empty state the brief asks for.
 */
export async function getCars(filters: CarFilters = {}): Promise<Car[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  let query = supabase.from("cars").select("*").order("created_at", { ascending: false });

  if (!filters.includeUnavailable) query = query.eq("available", true);
  if (filters.types?.length) query = query.in("type", filters.types);
  if (typeof filters.minPrice === "number") query = query.gte("price_per_day", filters.minPrice);
  if (typeof filters.maxPrice === "number") query = query.lte("price_per_day", filters.maxPrice);
  if (filters.search) query = query.ilike("name", `%${escapeLike(filters.search)}%`);
  if (filters.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) {
    console.error("[cars] query failed:", error.message);
    return [];
  }
  return (data ?? []) as Car[];
}

export async function getCarById(id: string): Promise<Car | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase.from("cars").select("*").eq("id", id).single();
  if (error) {
    console.error("[cars] single query failed:", error.message);
    return null;
  }
  return data as Car;
}

/** Price bounds for the catalog slider; null when the catalog is empty. */
export async function getPriceRange(): Promise<{ min: number; max: number } | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cars")
    .select("price_per_day")
    .eq("available", true);

  if (error || !data?.length) return null;
  const prices = data.map((r) => r.price_per_day as number);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
