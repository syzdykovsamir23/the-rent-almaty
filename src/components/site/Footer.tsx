"use client";

import Link from "next/link";
import { Headphones, Mail, MapPin, Phone } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { CAR_TYPES, site } from "@/lib/site";
import {
  LICENSE_LABEL,
  LICENSE_URL,
  PHOTO_CREDITS,
  SOURCE_LABEL,
} from "@/lib/photoCredits";
import { WeChatButton } from "./WeChatButton";
import { WhatsAppIcon } from "./icons";

export function Footer() {
  const dict = useDict();

  const info = [
    { href: "/#conditions", label: dict.footer.info.conditions },
    { href: "/#delivery", label: dict.footer.info.delivery },
    { href: "/#about", label: dict.footer.info.about },
  ];

  const contactButton =
    "flex size-12 items-center justify-center rounded-full bg-white/10 text-white/85 transition-colors duration-200 hover:bg-gold-500 hover:text-ink-900";

  return (
    <footer id="contact" className="scroll-mt-[68px] bg-ink-900 text-white/75">
      <div className="grid lg:grid-cols-[1fr_minmax(0,420px)]">
        <div className="container-page py-14 lg:ps-[max(1.25rem,calc((100vw-var(--page-max))/2+1.25rem))] lg:pe-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-2xl leading-none font-extrabold tracking-wide text-white uppercase">
                {site.name}
              </p>
              <p className="mt-3.5 text-[0.95rem] leading-relaxed">{dict.footer.about}</p>

              <div className="mt-6 flex gap-3">
                <a
                  href={site.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className={contactButton}
                >
                  <WhatsAppIcon className="size-6" />
                </a>
                <a
                  href={`tel:+${site.phoneRaw}`}
                  aria-label={dict.contact.call}
                  className={contactButton}
                >
                  <Phone className="size-5" strokeWidth={1.8} />
                </a>
                <WeChatButton className={contactButton} iconClassName="size-6" />
              </div>
            </div>

            <FooterColumn heading={dict.footer.carsHeading}>
              {CAR_TYPES.map((type) => (
                <li key={type}>
                  <Link
                    href={`/cars?type=${encodeURIComponent(type)}`}
                    className="transition-colors hover:text-gold-400"
                  >
                    {dict.carTypes[type]}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn heading={dict.footer.infoHeading}>
              {info.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-gold-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn heading={dict.footer.contactHeading}>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-gold-500" strokeWidth={1.6} />
                <a href={`tel:+${site.phoneRaw}`} className="num transition-colors hover:text-gold-400">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold-500" strokeWidth={1.6} />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-400">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-gold-500" strokeWidth={1.6} />
                <a
                  href={site.links.mapPlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-400"
                >
                  {dict.footer.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Headphones className="size-4 shrink-0 text-gold-500" strokeWidth={1.6} />
                <span>{dict.footer.support}</span>
              </li>
            </FooterColumn>
          </div>

          <div className="mt-12 border-t border-white/8 pt-6">
            <p className="text-[0.82rem] text-white/40">
              © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
            </p>

            {/* CC BY-SA requires the author and licence to be named wherever the
                photo is used. Each name links to its source file page, which
                states that photo's exact licence. */}
            <p className="mt-2 text-[0.68rem] leading-relaxed text-white/25">
              {dict.footer.photoCredit}:{" "}
              {PHOTO_CREDITS.map((c, i) => (
                <span key={c.source}>
                  {i > 0 ? ", " : null}
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-white/60"
                  >
                    {c.author}
                  </a>
                </span>
              ))}{" "}
              &middot; {SOURCE_LABEL},{" "}
              <a
                href={LICENSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white/60"
              >
                {LICENSE_LABEL}
              </a>
            </p>
          </div>
        </div>

        {/* No sandbox attribute: Google's embed redirects to /maps/embed and
            does not run under a sandboxed frame. It is cross-origin, so it
            cannot reach this document either way. */}
        <div className="relative min-h-[300px] lg:min-h-full">
          <iframe
            src={site.links.mapEmbed}
            title={dict.footer.mapTitle}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.78rem] font-bold tracking-[0.16em] text-white uppercase">{heading}</h3>
      <ul className="mt-4 flex flex-col gap-3 text-[0.95rem]">{children}</ul>
    </div>
  );
}
