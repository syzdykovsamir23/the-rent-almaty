"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import type { Car } from "@/lib/types";
import { CarCard } from "./CarCard";
import { CatalogEmptyState } from "./CatalogEmptyState";
import { SectionHeading } from "./SectionHeading";

export function PopularCars({ cars }: { cars: Car[] }) {
  const dict = useDict();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ start: false, end: false });

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // scrollLeft is negative in RTL, so compare on absolute distance.
    const x = Math.abs(el.scrollLeft);
    const max = el.scrollWidth - el.clientWidth;
    setCanScroll({ start: x > 8, end: x < max - 8 });
  }, []);

  useEffect(() => {
    sync();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync, cars.length]);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: dir * (rtl ? -1 : 1) * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const arrow =
    "flex size-9 cursor-pointer items-center justify-center rounded-full border border-cream-200 bg-white text-slate-heading shadow-[var(--shadow-card)] transition-all duration-200 hover:border-gold-500 hover:text-gold-600 disabled:cursor-default disabled:opacity-30 disabled:hover:border-cream-200 disabled:hover:text-slate-heading";

  return (
    <section id="cars" className="scroll-mt-[68px] bg-cream-50 py-14 sm:py-16">
      <div className="container-page">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <SectionHeading>{dict.popular.heading}</SectionHeading>
          <Link
            href="/cars"
            className="group flex shrink-0 items-center gap-1.5 pb-1 text-[0.68rem] font-bold tracking-[0.12em] text-gold-600 uppercase transition-colors hover:text-gold-700"
          >
            {dict.popular.viewAll}
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
        </div>

        <div className="mt-8">
          {cars.length === 0 ? (
            <CatalogEmptyState
              title={dict.popular.emptyTitle}
              text={dict.popular.emptyText}
              action={{ href: "#contact", label: dict.popular.emptyCta }}
            />
          ) : (
            <div className="relative">
              <div
                ref={trackRef}
                className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2"
              >
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="w-[262px] shrink-0 snap-start sm:w-[280px] lg:w-[292px]"
                  >
                    <CarCard car={car} />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-center gap-2 2xl:hidden">
                <CarouselButtons />
              </div>

              <div className="pointer-events-none absolute inset-y-0 -start-14 hidden items-center 2xl:flex">
                <span className="pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => nudge(-1)}
                    disabled={!canScroll.start}
                    aria-label={dict.common.previous}
                    className={arrow}
                  >
                    <ChevronLeft className="size-4 rtl:-scale-x-100" strokeWidth={2} />
                  </button>
                </span>
              </div>
              <div className="pointer-events-none absolute inset-y-0 -end-14 hidden items-center 2xl:flex">
                <span className="pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => nudge(1)}
                    disabled={!canScroll.end}
                    aria-label={dict.common.next}
                    className={arrow}
                  >
                    <ChevronRight className="size-4 rtl:-scale-x-100" strokeWidth={2} />
                  </button>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  function CarouselButtons() {
    return (
      <>
        <button
          type="button"
          onClick={() => nudge(-1)}
          disabled={!canScroll.start}
          aria-label={dict.common.previous}
          className={arrow}
        >
          <ChevronLeft className="size-4 rtl:-scale-x-100" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          disabled={!canScroll.end}
          aria-label={dict.common.next}
          className={arrow}
        >
          <ChevronRight className="size-4 rtl:-scale-x-100" strokeWidth={2} />
        </button>
      </>
    );
  }
}
