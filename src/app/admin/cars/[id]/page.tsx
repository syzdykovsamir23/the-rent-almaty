import Link from "next/link";
import { notFound } from "next/navigation";
import { CarForm } from "@/components/admin/CarForm";
import { NotConfigured } from "@/components/admin/NotConfigured";
import { getCarById } from "@/lib/cars";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  if (!isSupabaseConfigured) return <NotConfigured />;

  const { id } = await params;
  const car = await getCarById(id);
  if (!car) notFound();

  return (
    <>
      <Link href="/admin" className="text-xs text-[#6B7684] hover:text-[#1F2933]">
        ← Back to cars
      </Link>
      <h1 className="mt-3 text-xl font-bold">{car.name}</h1>
      <div className="mt-6">
        <CarForm car={car} />
      </div>
    </>
  );
}
