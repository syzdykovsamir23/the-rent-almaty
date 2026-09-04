"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Mountain, Sun, Waves } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { SectionHeading } from "./SectionHeading";

const PLACE_IMAGES = [
  "/images/dest-big-almaty-lake.webp",
  "/images/dest-charyn-canyon.webp",
  "/images/dest-kolsai-lakes.webp",
  "/images/dest-altyn-emel.webp",
];
const PLACE_ICONS = [Mountain, Camera, Waves, Sun];

export function ExploreKazakhstan() {
  const dict = useDict();

  return (
    <section id="delivery" className="scroll-mt-[68px] bg-cream-100 py-14 sm:py-16">
      <div className="container-page">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <SectionHeading subtitle={dict.explore.subtitle}>{dict.explore.heading}</SectionHeading>
          <a
            href="#conditions"
            className="group flex shrink-0 items-center gap-1.5 pb-1 text-[0.68rem] font-bold tracking-[0.12em] text-gold-600 uppercase transition-colors hover:text-gold-700"
          >
            {dict.explore.restrictions}
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </a>
        </div>

        <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {dict.explore.places.map((place, i) => {
            const Icon = PLACE_ICONS[i] ?? Mountain;
            return (
              <article
                key={place.name}
                className="card-surface group flex w-[16rem] shrink-0 snap-start flex-col overflow-hidden hover:shadow-[var(--shadow-card-hover)] sm:w-auto sm:shrink"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={PLACE_IMAGES[i]}
                    alt={place.name}
                    fill
                    sizes="(min-width: 1024px) 290px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-[600ms] ease-[var(--ease-out-soft)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-ink-950/25" />

                  <div className="absolute inset-x-0 top-0 p-3.5">
                    <span className="flex size-9 items-center justify-center rounded-full border border-white/60">
                      <Icon className="size-4 text-white" strokeWidth={1.5} />
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-3.5">
                    <h3 className="font-display text-[0.82rem] font-bold tracking-wider text-white uppercase">
                      {place.name}
                    </h3>
                    <p className="num mt-0.5 text-[0.7rem] text-white/70">
                      {place.distance} {dict.explore.distanceFrom}
                    </p>
                  </div>
                </div>

                <p className="px-4 py-4 text-[0.78rem] leading-relaxed text-slate-body">
                  {place.text}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-9 flex flex-col items-center">
          <Link href="/cars" className="btn btn-gold px-8 text-center">
            {dict.explore.cta}
          </Link>

          <p className="mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[0.95rem] leading-relaxed font-semibold text-slate-heading sm:text-[1.05rem]">
            <span className="text-[1.35rem] leading-none">🇰🇬</span>
            <span>{dict.explore.kyrgyzstan}</span>
          </p>

          <p className="mt-4 max-w-xl text-center text-[0.72rem] text-slate-body/70">
            {dict.explore.note}
          </p>
        </div>
      </div>
    </section>
  );
}
