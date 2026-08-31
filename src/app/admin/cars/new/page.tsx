import Link from "next/link";
import { CarForm } from "@/components/admin/CarForm";
import { NotConfigured } from "@/components/admin/NotConfigured";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default function NewCarPage() {
  if (!isSupabaseConfigured) return <NotConfigured />;

  return (
    <>
      <Link href="/admin" className="text-xs text-[#6B7684] hover:text-[#1F2933]">
        ← Back to cars
      </Link>
      <h1 className="mt-3 text-xl font-bold">Add car</h1>
      <div className="mt-6">
        <CarForm />
      </div>
    </>
  );
}
