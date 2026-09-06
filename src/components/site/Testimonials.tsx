"use client";

import { Star } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { REVIEWS } from "@/lib/reviews";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const dict = useDict();

  return (
    <section id="reviews" className="scroll-mt-[68px] bg-cream-50 pb-16 sm:pb-20">
      <div className="container-page">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <SectionHeading>{dict.reviews.heading}</SectionHeading>
          <a
            href={site.links.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 pb-1 text-[0.66rem] font-bold tracking-[0.12em] text-slate-body/70 uppercase transition-colors hover:text-slate-heading"
          >
            {dict.reviews.googleLabel}
            <GoogleG className="size-3.5" />
          </a>
        </div>

        {/* Columns rather than a grid: the reviews run from two lines to twelve,
            and equal-height cards would leave most of them half empty. */}
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
          {REVIEWS.map((r) => (
            <figure key={r.author} className="card-surface mb-4 break-inside-avoid p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* lang so each script gets the right font and line breaking. */}
              <blockquote
                lang={r.lang}
                className="mt-3.5 text-[0.82rem] leading-relaxed text-slate-body"
              >
                {r.text}
              </blockquote>

              <figcaption className="mt-5 border-t border-cream-200 pt-3.5 text-[0.78rem] font-semibold text-slate-heading">
                {r.author}
              </figcaption>
            </figure>
          ))}
        </div>

        <a
          href={site.links.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex flex-col items-center justify-between gap-4 rounded-[10px] bg-ink-900 p-5 text-center transition-colors hover:bg-ink-800 sm:flex-row sm:text-start"
        >
          <span className="flex items-center gap-3">
            <GoogleG className="size-7 shrink-0" />
            <span className="font-display text-[0.85rem] leading-snug font-bold tracking-wider text-white uppercase">
              {dict.reviews.seeAllTitle}
            </span>
          </span>
          <span className="btn btn-outline-light shrink-0 px-4 py-2 text-[0.62rem]">
            {dict.reviews.seeAllCta}
          </span>
        </a>
      </div>
    </section>
  );
}

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17Z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7A21.99 21.99 0 0 0 24 46Z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18a13.2 13.2 0 0 1 0-8.43v-5.7H4.34a22.01 22.01 0 0 0 0 19.83l7.35-5.7Z"
      />
      <path
        fill="#EA4335"
        d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.05l7.35 5.7C13.42 14.55 18.27 9.75 24 9.75Z"
      />
    </svg>
  );
}
