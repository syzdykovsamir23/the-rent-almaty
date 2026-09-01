"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Headphones } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";

const FEATURE_ICONS = [Headphones, BadgeCheck];

export function Hero() {
  const dict = useDict();

  return (
    <section className="relative isolate overflow-hidden bg-ink-900">
      {/* The car is part of the photograph now — no separate cut-out layer. */}
      <Image
        src="/images/hero-almaty.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[62%_50%] sm:object-center"
      />

      {/* Scrims: darken the start edge for the headline without flattening the
          landscape, then ground the bottom so the feature row reads. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 from-5% via-ink-950/55 via-45% to-ink-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-transparent via-45% to-ink-950/30" />

      <div className="relative container-page">
        <div className="max-w-xl py-20 sm:py-28 lg:py-36">
          <h1 className="font-display text-[2.1rem] leading-[1.04] font-extrabold tracking-tight text-balance text-white uppercase sm:text-5xl lg:text-[3.15rem]">
            {dict.hero.titleLine1}
            <br />
            <span className="text-gold-400">{dict.hero.titleLine2}</span>
          </h1>

          <p className="mt-5 text-base text-white/70 sm:text-lg">{dict.hero.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cars" className="btn btn-gold">
              {dict.hero.ctaPrimary}
            </Link>
            <a href="#contact" className="btn btn-outline-light">
              {dict.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Feature row — deliberately without any price line. */}
      <div className="relative border-t border-white/8 bg-ink-950/55 backdrop-blur-[2px]">
        <div className="container-page flex flex-wrap gap-x-12 gap-y-5 py-5 sm:py-6">
          {dict.hero.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i] ?? Headphones;
            return (
              <div key={f.title} className="flex items-center gap-3">
                <Icon className="size-6 shrink-0 text-gold-500" strokeWidth={1.35} />
                <div className="min-w-0">
                  <p className="text-[0.82rem] font-bold text-white">{f.title}</p>
                  <p className="text-[0.75rem] text-white/55">{f.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
