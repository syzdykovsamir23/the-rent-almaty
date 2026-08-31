import Link from "next/link";
import { AdminSearch } from "@/components/admin/AdminSearch";
import { CarTable } from "@/components/admin/CarTable";
import { NotConfigured } from "@/components/admin/NotConfigured";
import { SignOutButton } from "@/components/admin/SignOutButton";
import { getCars } from "@/lib/cars";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  if (!isSupabaseConfigured) return <NotConfigured />;

  const supabase = await createClient();
  const { data: isAdmin } = (await supabase!.rpc("is_admin")) as { data: boolean | null };

  if (!isAdmin) {
    return (
      <div className="rounded-lg border border-[#E1E4E8] bg-white p-8">
        <h1 className="text-lg font-bold">This account is not an admin</h1>
        <p className="mt-2 max-w-xl text-sm text-[#6B7684]">
          Signing in is deliberately not enough to edit the fleet. Add this account&apos;s user id
          to the <code className="rounded bg-[#F4F5F7] px-1.5 py-0.5">public.admins</code> table —
          step 4 of <code className="rounded bg-[#F4F5F7] px-1.5 py-0.5">supabase/README.md</code>.
        </p>
        <div className="mt-5">
          <SignOutButton />
        </div>
      </div>
    );
  }

  const sp = await searchParams;
  const q = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const cars = await getCars({ includeUnavailable: true, search: q });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Cars</h1>
          <p className="mt-1 text-sm text-[#6B7684]">
            {cars.length} {cars.length === 1 ? "car" : "cars"} in the fleet
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AdminSearch />
          <Link
            href="/admin/cars/new"
            className="rounded-md bg-[#1F2933] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#323F4B]"
          >
            Add car
          </Link>
          <SignOutButton />
        </div>
      </div>

      <div className="mt-6">
        <CarTable cars={cars} searching={Boolean(q)} />
      </div>
    </>
  );
}
