"use client";

import { CarFront } from "lucide-react";

type Props = {
  title: string;
  text: string;
  action?: { href: string; label: string };
};

/** Shown wherever the catalog would be — the fleet is empty until the owner
 *  publishes cars from the admin panel. */
export function CatalogEmptyState({ title, text, action }: Props) {
  return (
    <div className="flex flex-col items-center rounded-[10px] border border-dashed border-cream-200 bg-white/60 px-6 py-14 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-cream-100">
        <CarFront className="size-7 text-gold-600" strokeWidth={1.3} />
      </div>
      <h3 className="mt-5 font-display text-base font-bold tracking-wide text-slate-heading uppercase">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm text-slate-body">{text}</p>
      {action ? (
        <a href={action.href} className="btn btn-gold mt-6">
          {action.label}
        </a>
      ) : null}
    </div>
  );
}
