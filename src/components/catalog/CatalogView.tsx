"use client";

import { useDict } from "@/i18n/LanguageProvider";
import { CarCard } from "@/components/site/CarCard";
import { CatalogEmptyState } from "@/components/site/CatalogEmptyState";
import type { Car } from "@/lib/types";
import { CatalogFilters } from "./CatalogFilters";

export function CatalogView({ cars, filtered }: { cars: Car[]; filtered: boolean }) {
  const dict = useDict();

  return (
    <>
      <section className="bg-ink-900 py-10 sm:py-12">
        <div className="container-page">
          <h1 className="heading-display heading-rule text-[1.5rem] leading-none text-white sm:text-[1.9rem]">
            {dict.catalog.title}
          </h1>
          <p className="mt-3 text-sm text-white/55">{dict.catalog.subtitle}</p>
        </div>
      </section>

      <section className="bg-cream-50 py-8 sm:py-10">
        <div className="container-page">
          <CatalogFilters resultCount={cars.length} />

          <div className="mt-6">
            {cars.length === 0 ? (
              <CatalogEmptyState
                title={filtered ? dict.catalog.emptyTitle : dict.popular.emptyTitle}
                text={filtered ? dict.catalog.emptyText : dict.popular.emptyText}
                action={filtered ? undefined : { href: "/#contact", label: dict.popular.emptyCta }}
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
