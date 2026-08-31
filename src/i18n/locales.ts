export const LOCALES = [
  { code: "ru", label: "Русский", short: "RU", english: "Russian", dir: "ltr" },
  { code: "kk", label: "Қазақша", short: "KK", english: "Kazakh", dir: "ltr" },
  { code: "en", label: "English", short: "EN", english: "English", dir: "ltr" },
  { code: "zh", label: "中文", short: "中文", english: "Chinese", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", english: "Arabic", dir: "rtl" },
  { code: "ko", label: "한국어", short: "KO", english: "Korean", dir: "ltr" },
  { code: "th", label: "ไทย", short: "TH", english: "Thai", dir: "ltr" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

export const DEFAULT_LOCALE: Locale = "en";
export const STORAGE_KEY = "therent.locale";

export function isLocale(value: unknown): value is Locale {
  return LOCALES.some((l) => l.code === value);
}

export function localeDir(code: Locale): "ltr" | "rtl" {
  return LOCALES.find((l) => l.code === code)?.dir ?? "ltr";
}
