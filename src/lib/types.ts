import type { CarType, Transmission } from "@/lib/site";

export type Car = {
  id: string;
  name: string;
  type: CarType;
  year: number;
  transmission: Transmission;
  seats: number;
  price_per_day: number;
  description: string | null;
  images: string[];
  available: boolean;
  created_at: string;
};

/** Shape the admin form posts; `id` is absent when creating. */
export type CarInput = Omit<Car, "id" | "created_at">;
