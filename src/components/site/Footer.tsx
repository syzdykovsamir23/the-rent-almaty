"use client";

import Link from "next/link";
import { Headphones, Mail, MapPin, Phone } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { CAR_TYPES, site } from "@/lib/site";
import { WeChatButton } from "./WeChatButton";
import { WhatsAppIcon } from "./icons";

export function Footer() {
  const dict = useDict();

  const info = [
    { href: "/#conditions", label: dict.footer.info.conditions },
    { href: "/#faq", label: dict.footer.info.faq },
    { href: "/#delivery", label: dict.footer.info.delivery },
    { href: "/#about", label: dict.footer.info.about },
    { href: "/credits", label: dict.footer.info.credits },
  ];

  const social =
    "flex size-8 items-center justify-center rounded-full bg-white/8 text-white/70 transition-colors duration-200 hover:bg-gold-500 hover:text-ink-900";

  return (
    <footer id="contact" className="bg-ink-900 text-white/70">
      <div className="grid lg:grid-cols-[1fr_minmax(0,420px)]">
        <div className="container-page py-12 lg:ps-[max(1.25rem,calc((100vw-var(--page-max))/2+1.25rem))] lg:pe-10">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-xl leading-none font-extrabold tracking-wide text-white uppercase">
                {site.name}
              </p>
              <p className="mt-3 text-[0.8rem] leading-relaxed">{dict.footer.about}</p>

              <div className="mt-5 flex gap-2">
                <a
                  href={site.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className={social}
                >
                  <WhatsAppIcon className="size-4" />
                </a>
                <WeChatButton className={social} iconClassName="size-4" />
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
              <li className="flex items-center gap-2.5">
                <Phone className="size-3.5 shrink-0 text-gold-500" strokeWidth={1.6} />
                <a href={`tel:+${site.phoneRaw}`} className="num transition-colors hover:text-gold-400">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-3.5 shrink-0 text-gold-500" strokeWidth={1.6} />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold-400">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold-500" strokeWidth={1.6} />
                <a
                  href={site.links.mapPlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold-400"
                >
                  {dict.footer.address}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Headphones className="size-3.5 shrink-0 text-gold-500" strokeWidth={1.6} />
                <span>{dict.footer.support}</span>
              </li>
            </FooterColumn>
          </div>

          <p className="mt-10 border-t border-white/8 pt-6 text-[0.7rem] text-white/35">
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
        </div>

        <div className="relative min-h-[260px] lg:min-h-full">
          <iframe
            src={site.links.mapEmbed}
            title={dict.footer.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups"
            className="absolute inset-0 size-full border-0 grayscale-[35%]"
          />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.66rem] font-bold tracking-[0.16em] text-white uppercase">{heading}</h3>
      <ul className="mt-4 flex flex-col gap-2.5 text-[0.8rem]">{children}</ul>
    </div>
  );
}
