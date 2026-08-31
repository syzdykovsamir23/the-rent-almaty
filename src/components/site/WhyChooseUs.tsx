"use client";

import { CalendarCheck, CarFront, CircleDollarSign, Headphones, ShieldCheck } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";

const ICONS = [ShieldCheck, CalendarCheck, CarFront, Headphones, CircleDollarSign];

export function WhyChooseUs() {
  const dict = useDict();

  return (
    <section id="about" className="bg-ink-900 py-14 sm:py-16">
      <div className="container-page">
        <h2 className="heading-display heading-rule text-[1.375rem] leading-none text-white sm:text-[1.625rem]">
          {dict.why.heading.replace("{brand}", site.name)}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {dict.why.items.map((item, i) => {
            const Icon = ICONS[i] ?? ShieldCheck;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center px-2 text-center lg:border-s lg:border-white/10 lg:first:border-s-0"
              >
                <Icon className="size-9 text-gold-500" strokeWidth={1.15} />
                <h3 className="mt-4 text-[0.72rem] font-bold tracking-[0.12em] text-white uppercase">
                  {item.title}
                </h3>
                <p className="mt-2.5 max-w-[15rem] text-[0.78rem] leading-relaxed text-white/50">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
