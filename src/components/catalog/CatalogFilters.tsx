"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { RotateCcw } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { CAR_TYPES } from "@/lib/site";

export function CatalogFilters({ resultCount }: { resultCount: number }) {
  const dict = useDict();
  const router = useRouter();
  const params = useSearchParams();

  const selected = params.getAll("type");
  const minPrice = params.get("min") ?? "";
  const maxPrice = params.get("max") ?? "";
  const hasFilters = selected.length > 0 || minPrice !== "" || maxPrice !== "";

  const push = useCallback(
    (next: URLSearchParams) => {
      const qs = next.toString();
      router.replace(qs ? `/cars?${qs}` : "/cars", { scroll: false });
    },
    [router],
  );

  const toggleType = (type: string) => {
    const next = new URLSearchParams(params.toString());
    const current = next.getAll("type");
    next.delete("type");
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updated.forEach((t) => next.append("type", t));
    push(next);
  };

  const setPrice = (key: "min" | "max", value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    push(next);
  };

  const chip = (active: boolean) =>
    `cursor-pointer rounded-[3px] border px-3.5 py-2 text-[0.68rem] font-bold tracking-[0.1em] uppercase transition-colors duration-200 ${
      active
        ? "border-gold-500 bg-gold-500 text-ink-900"
        : "border-cream-200 bg-white text-slate-body hover:border-gold-500 hover:text-gold-700"
    }`;

  return (
    <div className="card-surface flex flex-col gap-5 p-5">
      <div>
        <p className="text-[0.62rem] font-bold tracking-[0.16em] text-slate-heading uppercase">
          {dict.catalog.filterType}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => push(stripTypes(params))} className={chip(selected.length === 0)}>
            {dict.catalog.all}
          </button>
          {CAR_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={chip(selected.includes(type))}
            >
              {dict.carTypes[type]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-end gap-4 border-t border-cream-200 pt-5">
        <div>
          <p className="text-[0.62rem] font-bold tracking-[0.16em] text-slate-heading uppercase">
            {dict.catalog.filterPrice}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <PriceInput
              value={minPrice}
              placeholder="0"
              onCommit={(v) => setPrice("min", v)}
              aria-label={dict.catalog.minPrice}
            />
            <span className="text-slate-body/50">&ndash;</span>
            <PriceInput
              value={maxPrice}
              placeholder="∞"
              onCommit={(v) => setPrice("max", v)}
              aria-label={dict.catalog.maxPrice}
            />
            <span className="text-[0.72rem] text-slate-body">₸</span>
          </div>
        </div>

        <div className="ms-auto flex items-center gap-4">
          <p className="num text-[0.72rem] text-slate-body">
            <span className="font-bold text-slate-heading">{resultCount}</span>{" "}
            {resultCount === 1 ? dict.catalog.resultsOne : dict.catalog.resultsMany}
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={() => router.replace("/cars", { scroll: false })}
              className="flex cursor-pointer items-center gap-1.5 text-[0.66rem] font-bold tracking-[0.1em] text-gold-600 uppercase transition-colors hover:text-gold-700"
            >
              <RotateCcw className="size-3.5" strokeWidth={2} />
              {dict.catalog.reset}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function stripTypes(params: URLSearchParams) {
  const next = new URLSearchParams(params.toString());
  next.delete("type");
  return next;
}

function PriceInput({
  value,
  placeholder,
  onCommit,
  ...rest
}: {
  value: string;
  placeholder: string;
  onCommit: (value: string) => void;
} & React.ComponentProps<"input">) {
  return (
    <input
      {...rest}
      type="number"
      min={0}
      step={1000}
      defaultValue={value}
      placeholder={placeholder}
      onBlur={(e) => onCommit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
      }}
      className="num w-24 rounded-[3px] border border-cream-200 bg-white px-2.5 py-1.5 text-[0.78rem] text-slate-heading outline-none transition-colors focus:border-gold-500"
    />
  );
}
