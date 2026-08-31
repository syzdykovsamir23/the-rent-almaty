"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { DEFAULT_LOCALE, localeDir, type Locale } from "./locales";
import { getDictionary, type Dictionary } from "./dictionary";
import { UNKNOWN, getServerSnapshot, getSnapshot, subscribe, writeLocale } from "./localeStore";

type LanguageContextValue = {
  locale: Locale;
  dict: Dictionary;
  dir: "ltr" | "rtl";
  setLocale: (next: Locale) => void;
  /** True until the visitor has picked a language for the first time. */
  needsChoice: boolean;
  dismissChoice: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Locale lives in localStorage rather than the URL: only English copy exists
 * today, so per-locale routes would be seven identical pages. The dictionaries
 * are already split per locale, which keeps the move to /[locale] routing a
 * mechanical change once real translations land.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  const locale: Locale = stored === UNKNOWN || stored === null ? DEFAULT_LOCALE : stored;
  const needsChoice = stored === null && !dismissed;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeDir(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => writeLocale(next), []);
  const dismissChoice = useCallback(() => setDismissed(true), []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dict: getDictionary(locale),
      dir: localeDir(locale),
      setLocale,
      needsChoice,
      dismissChoice,
    }),
    [locale, needsChoice, setLocale, dismissChoice],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

/** Convenience hook for components that only need the copy deck. */
export function useDict(): Dictionary {
  return useLanguage().dict;
}
