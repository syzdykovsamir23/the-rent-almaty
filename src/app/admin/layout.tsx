import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Admin — ${site.name}`,
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#1F2933]">
      <header className="border-b border-[#E1E4E8] bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
          <Link href="/admin" className="flex items-baseline gap-2">
            <span className="font-display text-sm font-extrabold tracking-wide uppercase">
              {site.name}
            </span>
            <span className="text-xs text-[#6B7684]">admin</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-xs font-medium text-[#6B7684] transition-colors hover:text-[#1F2933]"
          >
            View site ↗
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
    </div>
  );
}
