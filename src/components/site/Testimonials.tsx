"use client";

import { Star } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const dict = useDict();

  return (
    <section id="reviews" className="scroll-mt-[68px] bg-cream-50 pb-16 sm:pb-20">
      <div className="container-page">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <SectionHeading>{dict.reviews.heading}</SectionHeading>
          <p className="flex shrink-0 items-center gap-1.5 pb-1 text-[0.66rem] font-bold tracking-[0.12em] text-slate-body/70 uppercase">
            {dict.reviews.googleLabel}
            <Star className="size-3.5 fill-gold-500 text-gold-500" />
            <span className="num text-slate-heading">{site.googleRating}</span>
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.reviews.items.map((r) => (
            <figure key={r.author} className="card-surface flex flex-col p-5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <blockquote className="mt-3.5 grow text-[0.82rem] leading-relaxed text-slate-body">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-cream-200 pt-3.5 text-[0.78rem] font-semibold text-slate-heading">
                {r.author}
                <span className="font-normal text-slate-body"> &ndash; {r.country}</span>
              </figcaption>
            </figure>
          ))}

          <div className="flex flex-col items-center justify-center rounded-[10px] bg-ink-900 p-5 text-center">
            <p className="font-display text-[0.78rem] leading-snug font-bold tracking-wider text-white uppercase">
              {dict.reviews.seeAllTitle}
            </p>
            <GoogleG className="mt-4 size-8" />
            <a
              href={site.links.googleReviews}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light mt-4 px-4 py-2 text-[0.62rem]"
            >
              {dict.reviews.seeAllCta}
            </a>
          </div>
        </div>

        <p className="mt-4 text-[0.68rem] text-slate-body/55">{dict.reviews.placeholderNote}</p>
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
