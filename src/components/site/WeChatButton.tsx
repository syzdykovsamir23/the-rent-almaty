"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDict } from "@/i18n/LanguageProvider";
import { site } from "@/lib/site";
import { WeChatIcon } from "./icons";

/**
 * WeChat has no link that opens a chat from a browser, so the contact point is
 * the account QR. The trigger and its dialog ship together, which lets both the
 * floating rail and the footer reuse it with their own button styling.
 */
export function WeChatButton({
  className,
  iconClassName = "size-5",
}: {
  className: string;
  iconClassName?: string;
}) {
  const dict = useDict();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.contact.wechatTitle}
        aria-haspopup="dialog"
        className={`${className} cursor-pointer`}
      >
        <WeChatIcon className={iconClassName} />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={dict.contact.wechatTitle}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-ink-950/85 px-5 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xs rounded-[10px] bg-white p-6 text-center shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={dict.common.close}
              className="absolute end-3 top-3 cursor-pointer text-slate-body/60 transition-colors hover:text-slate-heading"
            >
              <X className="size-4" />
            </button>

            <h2 className="font-display text-sm font-bold tracking-wider text-slate-heading uppercase">
              {dict.contact.wechatTitle}
            </h2>
            <p className="mt-1.5 text-[0.78rem] text-slate-body">{dict.contact.wechatText}</p>

            {/* unoptimized on purpose: the file is already a hand-sized lossless
                WebP, and re-encoding a QR to lossy JPEG puts ringing artefacts
                on the modules, which is exactly what breaks scanning. */}
            <Image
              src={site.links.wechatQr}
              alt={dict.contact.wechatTitle}
              width={560}
              height={560}
              unoptimized
              className="mx-auto mt-4 h-auto w-full max-w-[220px] rounded-[6px]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
