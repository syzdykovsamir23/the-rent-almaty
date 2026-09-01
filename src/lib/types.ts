import type { CarType, Drivetrain, Transmission } from "@/lib/site";

/** How one photo is framed on the card: object-position plus a zoom factor. */
export type ImageTransform = { x: number; y: number; zoom: number };

export const DEFAULT_TRANSFORM: ImageTransform = { x: 50, y: 50, zoom: 1 };

export type Car = {
  id: string;
  name: string;
  type: CarType;
  year: number;
  transmission: Transmission;
  seats: number;
  /** Boot capacity in litres. Null only on cars added before the spec fields. */
  trunk_liters: number | null;
  drivetrain: Drivetrain | null;
  price_per_day: number;
  description: string | null;
  images: string[];
  /** Keyed by image URL. Missing entries fall back to DEFAULT_TRANSFORM. */
  image_settings?: Record<string, ImageTransform> | null;
  available: boolean;
  created_at: string;
};

/** Shape the admin form posts; `id` is absent when creating. */
export type CarInput = Omit<Car, "id" | "created_at">;

/** Reads one photo's framing, tolerating a row saved before the column existed. */
export function transformFor(car: Car, url: string | undefined): ImageTransform {
  if (!url) return DEFAULT_TRANSFORM;
  const stored = car.image_settings?.[url];
  if (!stored) return DEFAULT_TRANSFORM;
  return {
    x: clamp(stored.x, 0, 100, 50),
    y: clamp(stored.y, 0, 100, 50),
    zoom: clamp(stored.zoom, 1, 3, 1),
  };
}

function clamp(value: unknown, min: number, max: number, fallback: number): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
