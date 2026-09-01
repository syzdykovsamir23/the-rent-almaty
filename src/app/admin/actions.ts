"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CAR_TYPES, TRANSMISSIONS } from "@/lib/site";

export type ActionState = { error?: string };

function parseCar(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const type = String(formData.get("type") ?? "");
  const transmission = String(formData.get("transmission") ?? "");
  const year = Number(formData.get("year"));
  const seats = Number(formData.get("seats"));
  const price = Number(formData.get("price_per_day"));
  const description = String(formData.get("description") ?? "").trim();
  const images = formData
    .getAll("images")
    .map((v) => String(v).trim())
    .filter(Boolean);
  const available = formData.get("available") === "on";
  const imageSettings = parseImageSettings(formData.get("image_settings"), images);

  if (!name) return { error: "Name is required." as const };
  if (!(CAR_TYPES as readonly string[]).includes(type)) return { error: "Pick a body type." as const };
  if (!(TRANSMISSIONS as readonly string[]).includes(transmission))
    return { error: "Pick a transmission." as const };
  if (!Number.isInteger(year) || year < 1990 || year > 2100)
    return { error: "Year must be between 1990 and 2100." as const };
  if (!Number.isInteger(seats) || seats < 1 || seats > 20)
    return { error: "Seats must be between 1 and 20." as const };
  if (!Number.isFinite(price) || price < 0) return { error: "Price must be a positive number." as const };

  return {
    values: {
      name,
      type,
      transmission,
      year,
      seats,
      price_per_day: Math.round(price),
      description: description || null,
      images,
      image_settings: imageSettings,
      available,
    },
  };
}

/** Per-photo framing, clamped and limited to photos still attached to the car. */
function parseImageSettings(raw: FormDataEntryValue | null, images: string[]) {
  if (typeof raw !== "string" || !raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object") return {};

  const out: Record<string, { x: number; y: number; zoom: number }> = {};
  for (const [url, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (!images.includes(url) || !value || typeof value !== "object") continue;
    const v = value as Record<string, unknown>;
    out[url] = {
      x: clamp(v.x, 0, 100, 50),
      y: clamp(v.y, 0, 100, 50),
      zoom: clamp(v.zoom, 1, 3, 1),
    };
  }
  return out;
}

function clamp(value: unknown, min: number, max: number, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.round(Math.min(max, Math.max(min, n)) * 100) / 100;
}

const MIGRATION_HINT =
  "Saved, but the photo framing was not: run supabase/migration-image-settings.sql in the Supabase SQL Editor to add the image_settings column.";

/**
 * The image_settings column arrived after the first deploy. If the migration
 * has not been run yet, save everything else rather than failing the whole form.
 */
async function writeWithFramingFallback(
  run: (values: Record<string, unknown>) => PromiseLike<{ error: { message: string } | null }>,
  values: Record<string, unknown>,
): Promise<ActionState | null> {
  const { error } = await run(values);
  if (!error) return null;
  if (!error.message.includes("image_settings")) return { error: error.message };

  const rest = { ...values };
  delete rest.image_settings;
  const retry = await run(rest);
  return retry.error ? { error: retry.error.message } : { error: MIGRATION_HINT };
}

export async function createCar(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase is not configured yet." };

  const parsed = parseCar(formData);
  if ("error" in parsed) return { error: parsed.error };

  const failure = await writeWithFramingFallback(
    (values) => supabase.from("cars").insert(values),
    parsed.values,
  );
  if (failure) return failure;

  revalidatePath("/admin");
  revalidatePath("/cars");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateCar(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase is not configured yet." };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing car id." };

  const parsed = parseCar(formData);
  if ("error" in parsed) return { error: parsed.error };

  const failure = await writeWithFramingFallback(
    (values) => supabase.from("cars").update(values).eq("id", id),
    parsed.values,
  );
  if (failure) return failure;

  revalidatePath("/admin");
  revalidatePath("/cars");
  revalidatePath("/");
  redirect("/admin");
}

export async function deleteCar(formData: FormData): Promise<void> {
  const supabase = await createClient();
  if (!supabase) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { error } = await supabase.from("cars").delete().eq("id", id);
  if (error) console.error("[admin] delete failed:", error.message);

  revalidatePath("/admin");
  revalidatePath("/cars");
  revalidatePath("/");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  revalidatePath("/admin");
  redirect("/admin/login");
}
