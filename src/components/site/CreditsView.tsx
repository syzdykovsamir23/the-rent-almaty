"use client";

import Link from "next/link";
import { useDict } from "@/i18n/LanguageProvider";
import { PHOTO_CREDITS } from "@/lib/photoCredits";

export function CreditsView() {
  const dict = useDict();

  return (
    <>
      <section className="bg-ink-900 py-10 sm:py-12">
        <div className="container-page">
          <h1 className="heading-display heading-rule text-[1.5rem] leading-none text-white sm:text-[1.9rem]">
            {dict.credits.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/55">{dict.credits.intro}</p>
        </div>
      </section>

      <section className="bg-cream-50 py-10 sm:py-12">
        <div className="container-page">
          <ul className="grid gap-3 sm:grid-cols-2">
            {PHOTO_CREDITS.map((c) => (
              <li key={c.source} className="card-surface p-5">
                <p className="text-[0.62rem] font-bold tracking-[0.14em] text-gold-600 uppercase">
                  {dict.credits.slots[c.slot]}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-heading">{c.title}</p>
                <p className="mt-1 text-[0.8rem] text-slate-body">
                  {dict.credits.by} {c.author}
                </p>
                <p className="mt-2.5 text-[0.75rem] text-slate-body/80">
                  {dict.credits.notes[c.note]}
                </p>
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem]">
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold-600 hover:text-gold-700"
                  >
                    {dict.credits.source}
                  </a>
                  <a
                    href={c.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold-600 hover:text-gold-700"
                  >
                    {c.license}
                  </a>
                </p>
              </li>
            ))}
          </ul>

          <Link href="/" className="btn btn-dark mt-8">
            {dict.credits.back}
          </Link>
        </div>
      </section>
    </>
  );
}
