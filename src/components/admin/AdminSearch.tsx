"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function AdminSearch() {
  return (
    <Suspense fallback={null}>
      <AdminSearchInner />
    </Suspense>
  );
}

function AdminSearchInner() {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <input
      type="search"
      name="q"
      defaultValue={params.get("q") ?? ""}
      placeholder="Search by name…"
      onChange={(e) => {
        const next = new URLSearchParams(params.toString());
        if (e.target.value) next.set("q", e.target.value);
        else next.delete("q");
        router.replace(next.toString() ? `/admin?${next}` : "/admin", { scroll: false });
      }}
      className="w-56 rounded-md border border-[#E1E4E8] bg-white px-3 py-2 text-sm outline-none focus:border-[#1F2933]"
    />
  );
}
