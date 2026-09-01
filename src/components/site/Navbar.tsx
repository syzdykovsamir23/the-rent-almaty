"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const dict = useDict();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/cars", label: dict.nav.cars },
    { href: "/#conditions", label: dict.nav.conditions },
    { href: "/#delivery", label: dict.nav.delivery },
    { href: "/#about", label: dict.nav.about },
    { href: "/#contact", label: dict.nav.contact },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-ink-900">
      <div className="container-page flex h-[68px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <span className="block font-display text-[1.35rem] leading-none font-extrabold tracking-[0.02em] text-white uppercase">
            {site.name}
          </span>
          <span className="mt-1 block text-[0.5rem] leading-none font-semibold tracking-[0.22em] text-white/45 uppercase">
            {dict.nav.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative text-[0.7rem] font-semibold tracking-[0.11em] text-white/75 uppercase transition-colors duration-200 hover:text-white after:absolute after:-bottom-1.5 after:start-0 after:h-px after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? dict.common.close : dict.common.menu}
            aria-expanded={open}
            className="-me-2 cursor-pointer p-2 text-white/80 transition-colors hover:text-white lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-white/8 bg-ink-900 transition-[max-height] duration-300 ease-out lg:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav className="container-page flex flex-col py-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/6 py-3.5 text-[0.78rem] font-semibold tracking-[0.11em] text-white/75 uppercase last:border-b-0"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
