import { STORAGE_KEY, isLocale, type Locale } from "./locales";

/**
 * localStorage is an external store, so the provider subscribes to it with
 * `useSyncExternalStore` instead of copying it into state from an effect.
 *
 * Three states matter:
 *   "unknown" — server render and hydration, before storage can be read
 *   null      — storage read, nothing chosen yet (first visit)
 *   Locale    — the visitor's saved choice
 *
 * Returning "unknown" during hydration is what keeps the first-visit modal
 * out of the server HTML, so a returning visitor never sees it flash.
 */
export const UNKNOWN = "unknown" as const;
export type StoredLocale = Locale | null | typeof UNKNOWN;

let cached: Locale | null | undefined;
const listeners = new Set<() => void>();

function read(): Locale | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    // Private mode or storage blocked — behave like a first visit.
    return null;
  }
}

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  // Another tab changing the language should update this one too.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cached = undefined;
      onChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function getSnapshot(): StoredLocale {
  if (cached === undefined) cached = read();
  return cached;
}

export function getServerSnapshot(): StoredLocale {
  return UNKNOWN;
}

export function writeLocale(next: Locale): void {
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // The choice just will not persist; the session still switches.
  }
  listeners.forEach((l) => l());
}
