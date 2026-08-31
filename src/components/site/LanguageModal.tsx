"use client";

import { useEffect } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LOCALES } from "@/i18n/locales";
import { site } from "@/lib/site";

/** Full-screen picker shown once, on the visitor's first arrival. */
export function LanguageModal() {
  const { needsChoice, setLocale, dict } = useLanguage();

  useEffect(() => {
    if (!needsChoice) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [needsChoice]);

  if (!needsChoice) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dict.langModal.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/92 px-5 backdrop-blur-sm"
    >
      <div className="w-full max-w-lg text-center">
        <Globe className="mx-auto size-8 text-gold-500" strokeWidth={1.4} />

        <p className="mt-6 font-display text-xs font-bold tracking-[0.4em] text-white/40 uppercase">
          {site.name}
        </p>
        <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white uppercase sm:text-3xl">
          {dict.langModal.title}
        </h1>
        <p className="mt-2 text-sm text-white/50">{dict.langModal.subtitle}</p>

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLocale(l.code)}
              dir={l.dir}
              className="cursor-pointer rounded-[4px] border border-white/12 bg-white/[0.04] px-4 py-3.5 text-sm font-semibold text-white/85 transition-all duration-200 hover:border-gold-500 hover:bg-gold-500 hover:text-ink-900"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
