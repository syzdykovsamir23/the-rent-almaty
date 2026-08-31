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
      available,
    },
  };
}

export async function createCar(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Supabase is not configured yet." };

  const parsed = parseCar(formData);
  if ("error" in parsed) return { error: parsed.error };

  const { error } = await supabase.from("cars").insert(parsed.values);
  if (error) return { error: error.message };

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

  const { error } = await supabase.from("cars").update(parsed.values).eq("id", id);
  if (error) return { error: error.message };

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
