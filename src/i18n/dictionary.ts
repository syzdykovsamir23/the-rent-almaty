import en, { type Dictionary } from "./dictionaries/en";
import type { Locale } from "./locales";

export type { Dictionary };

/** Arrays are swapped wholesale, not merged element-by-element. */
export type DeepPartial<T> = T extends readonly (infer U)[]
  ? readonly DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

import ru from "./dictionaries/ru";
import kk from "./dictionaries/kk";
import zh from "./dictionaries/zh";
import ar from "./dictionaries/ar";
import ko from "./dictionaries/ko";
import th from "./dictionaries/th";

const overrides: Record<Exclude<Locale, "en">, DeepPartial<Dictionary>> = {
  ru,
  kk,
  zh,
  ar,
  ko,
  th,
};

function merge<T>(base: T, patch: unknown): T {
  if (patch === undefined || patch === null) return base;
  if (Array.isArray(base)) return (Array.isArray(patch) ? patch : base) as T;
  if (typeof base === "object" && base !== null && typeof patch === "object") {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(patch as Record<string, unknown>)) {
      out[key] = merge((base as Record<string, unknown>)[key], value);
    }
    return out as T;
  }
  return patch as T;
}

const cache = new Map<Locale, Dictionary>();

export function getDictionary(locale: Locale): Dictionary {
  const cached = cache.get(locale);
  if (cached) return cached;

  const dict = locale === "en" ? en : merge(en, overrides[locale]);
  cache.set(locale, dict);
  return dict;
}
