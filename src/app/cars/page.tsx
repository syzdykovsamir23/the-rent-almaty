import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog/CatalogView";
import { FloatingContacts } from "@/components/site/FloatingContacts";
import { Footer } from "@/components/site/Footer";
import { LanguageModal } from "@/components/site/LanguageModal";
import { Navbar } from "@/components/site/Navbar";
import { getCars } from "@/lib/cars";
import { CAR_TYPES, site, type CarType } from "@/lib/site";

export const metadata: Metadata = {
  title: `Cars — ${site.name}`,
  description: "Full car rental catalog in Almaty: economy, sedan, SUV, 4WD and premium.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function toNumber(value: string | string[] | undefined): number | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const types = toArray(sp.type).filter((t): t is CarType =>
    (CAR_TYPES as readonly string[]).includes(t),
  );
  const minPrice = toNumber(sp.min);
  const maxPrice = toNumber(sp.max);
  const filtered = types.length > 0 || minPrice !== undefined || maxPrice !== undefined;

  const cars = await getCars({ types, minPrice, maxPrice });

  return (
    <>
      <LanguageModal />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <CatalogView cars={cars} filtered={filtered} />
        </Suspense>
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
