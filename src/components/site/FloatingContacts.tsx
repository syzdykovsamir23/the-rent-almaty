"use client";

import { Phone } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";
import { WeChatButton } from "./WeChatButton";
import { WhatsAppIcon } from "./icons";

/** The sticky contact bubbles pinned to the side of the viewport. */
export function FloatingContacts() {
  const dict = useDict();

  const base =
    "flex size-12 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-200 hover:scale-110 focus-visible:scale-110 sm:size-14";

  // Pinned bottom-end on phones (where these are used most) and centred on the
  // side from sm up, as in the reference.
  return (
    <div className="fixed end-3 bottom-4 z-40 flex flex-col gap-2.5 sm:end-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:gap-3">
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
    </div>
  );
}
