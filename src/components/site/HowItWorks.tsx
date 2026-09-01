"use client";

import Image from "next/image";
import { CarFront, CheckCircle2, ChevronRight, KeyRound, MapPin, Send } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { SectionHeading } from "./SectionHeading";

const STEP_ICONS = [CarFront, Send, CheckCircle2, KeyRound, MapPin];

export function HowItWorks() {
  const dict = useDict();

  return (
    <section id="conditions" className="bg-cream-50 py-14 sm:py-16">
      <div className="container-page grid gap-5 lg:grid-cols-[1.45fr_1fr]">
        <div className="card-surface px-5 py-7 sm:px-7">
          <SectionHeading>{dict.how.heading}</SectionHeading>

          <ol className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
            {dict.how.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? CarFront;
              return (
                <li key={i} className="flex items-start gap-4 sm:contents">
                  <div className="flex shrink-0 flex-col items-center sm:flex-1">
                    <Icon className="size-8 text-slate-heading" strokeWidth={1.15} />
                    <p className="num mt-3 text-[0.72rem] font-extrabold text-slate-heading">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-1.5 text-center text-[0.76rem] leading-snug text-slate-body">
                      <span className="block font-semibold text-slate-heading">{step.title}</span>
                      {step.text}
                    </p>
                  </div>

                  {i < dict.how.steps.length - 1 ? (
                    <ChevronRight
                      className="mt-2 hidden size-4 shrink-0 self-start text-cream-200 sm:block rtl:-scale-x-100"
                      strokeWidth={2}
                    />
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="relative isolate flex min-h-[240px] flex-col justify-end overflow-hidden rounded-[10px] bg-ink-900 p-6">
          <Image
            src="/images/airport-almaty.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 420px, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/35" />

          <div className="relative">
            <h3 className="font-display text-lg leading-tight font-extrabold text-white uppercase">
              {dict.how.airportTitle}
              <br />
              {dict.how.airportTitle2}
            </h3>
            <p className="mt-2.5 text-[0.8rem] text-white/65">{dict.how.airportText}</p>
            <a href="#contact" className="btn btn-gold mt-5 text-[0.64rem]">
              {dict.how.airportCta}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
