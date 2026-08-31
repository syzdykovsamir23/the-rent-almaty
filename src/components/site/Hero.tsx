"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Headphones, ShieldCheck, Truck } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";

const FEATURE_ICONS = [Truck, ShieldCheck, Headphones, BadgeCheck];

export function Hero() {
  const dict = useDict();

  return (
    <section className="relative isolate overflow-hidden bg-ink-900">
      <Image
        src="/images/hero-almaty.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_38%]"
      />

      {/* Scrims: darken the start edge for the headline without flattening the
          landscape, then ground the bottom so the feature row reads. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/88 from-5% via-ink-950/45 via-45% to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent via-40% to-ink-950/25" />

      <div className="relative container-page">
        <div className="grid items-center gap-8 pt-14 pb-10 sm:pt-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:pt-24 md:pb-16">
          <div className="max-w-xl">
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

          {/* Foreground car, as in the reference. Hidden on phones, where the
              landscape alone carries the hero. */}
          <div className="relative hidden md:block">
            <Image
              src="/images/hero-car.webp"
              alt="Rental SUV"
              width={1455}
              height={910}
              priority
              sizes="(min-width: 1280px) 640px, 50vw"
              className="h-auto w-full drop-shadow-[0_35px_45px_rgba(0,0,0,0.55)] rtl:-scale-x-100"
            />
          </div>
        </div>
      </div>

      {/* Feature row — deliberately without any price line. */}
      <div className="relative border-t border-white/8 bg-ink-950/55 backdrop-blur-[2px]">
        <div className="container-page grid grid-cols-2 gap-x-6 gap-y-5 py-5 sm:grid-cols-4 sm:py-6">
          {dict.hero.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i] ?? Truck;
            return (
              <div key={f.title} className="flex items-center gap-3">
                <Icon className="size-6 shrink-0 text-gold-500" strokeWidth={1.35} />
                <div className="min-w-0">
                  <p className="truncate text-[0.78rem] font-bold text-white">{f.title}</p>
                  <p className="truncate text-[0.72rem] text-white/55">{f.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
