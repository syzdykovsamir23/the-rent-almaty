"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";
import { WeChatButton } from "./WeChatButton";
import { WhatsAppIcon, YandexMapsIcon } from "./icons";

/** The sticky contact rail pinned to the side of the viewport. */
export function FloatingContacts() {
  const dict = useDict();

  const base =
    "flex size-11 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:scale-110 sm:size-14";
  // The map brands are multi-colour marks, so they sit on white rather than
  // being recoloured to fit a tinted button.
  const brand = base.replace("text-white", "bg-white ring-1 ring-black/5");

  return (
    <div className="fixed inset-x-0 bottom-3 z-40 flex justify-center gap-2 px-3 sm:inset-x-auto sm:end-4 sm:bottom-auto sm:top-1/2 sm:w-auto sm:-translate-y-1/2 sm:flex-col sm:justify-normal sm:gap-3 sm:px-0">
      <a
        href={site.links.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className={`${base} bg-[#25D366]`}
      >
        <WhatsAppIcon className="size-6 sm:size-7" />
      </a>

      <a href={`tel:+${site.phoneRaw}`} aria-label={dict.contact.call} className={`${base} bg-ink-800`}>
        <Phone className="size-5 sm:size-6" strokeWidth={1.8} />
      </a>

      <WeChatButton className={`${base} bg-[#07C160]`} iconClassName="size-6 sm:size-7" />

      <a
        href={site.links.twoGis}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="2GIS"
        className={brand}
      >
        <Image src="/images/2gis.webp" alt="" width={136} height={136} className="size-7 sm:size-8" />
      </a>

      <a
        href={site.links.yandexMaps}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Yandex Maps"
        className={brand}
      >
        <YandexMapsIcon className="size-6 sm:size-7" />
      </a>
    </div>
  );
}
