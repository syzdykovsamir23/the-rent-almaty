"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LOCALES } from "@/i18n/locales";

export function LanguageSwitcher({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { locale, setLocale, dict } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[2];
  const trigger =
    tone === "dark"
      ? "text-white/80 hover:text-white"
      : "text-slate-heading/80 hover:text-slate-heading";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={dict.nav.language}
        className={`flex cursor-pointer items-center gap-1.5 rounded-[3px] px-2 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors ${trigger}`}
      >
        <Globe className="size-4" strokeWidth={1.6} />
        <span>{current.short}</span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {open ? (
        <div
          role="listbox"
          className="absolute end-0 z-50 mt-2 w-44 overflow-hidden rounded-[6px] border border-ink-700/60 bg-ink-900 py-1 shadow-2xl"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === locale}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className="flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-start text-sm text-white/75 transition-colors hover:bg-ink-800 hover:text-white"
            >
              <span>{l.label}</span>
              {l.code === locale ? (
                <Check className="size-4 text-gold-500" strokeWidth={2.2} />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
