/** Brand marks lucide does not ship. Stroke-only, to match the icon set. */
export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.46 3.44 1.32 4.94L2 22.5l5.85-1.53a9.83 9.83 0 0 0 4.19.94h.01c5.43 0 9.86-4.43 9.86-9.87 0-2.64-1.03-5.11-2.9-6.98A9.8 9.8 0 0 0 12.04 2Zm0 17.98h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.35c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 5.8 2.4 8.15 8.15 0 0 1 2.4 5.8c0 4.52-3.68 8.19-8.2 8.19Z" />
    </svg>
  );
}

export function WeChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.69 3C4.99 3 2 5.49 2 8.56c0 1.74.97 3.29 2.48 4.31l-.62 1.87 2.18-1.09c.78.22 1.61.34 2.47.34.21 0 .42 0 .62-.02a5.1 5.1 0 0 1-.22-1.47c0-2.93 2.85-5.3 6.37-5.3.23 0 .46.01.68.03C15.35 4.72 12.32 3 8.69 3Zm-2.4 3.62a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Zm4.66 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
      <path d="M22 12.5c0-2.5-2.47-4.53-5.51-4.53s-5.51 2.03-5.51 4.53 2.47 4.53 5.51 4.53c.68 0 1.34-.1 1.95-.29l1.81.91-.51-1.53c1.4-.83 2.26-2.14 2.26-3.62Zm-7.3-.85a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Zm3.62 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
    </svg>
  );
}

/** Simple gearbox glyph for the transmission spec on car cards. */
export function TransmissionIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="1.8" />
      <circle cx="18" cy="6" r="1.8" />
      <circle cx="6" cy="18" r="1.8" />
      <path d="M6 7.8v8.4M6 6h12M12 6v6.5" />
    </svg>
  );
}

/** lucide dropped brand glyphs, so Instagram lives here too. */
export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Four wheels on two axles — reads as "drivetrain" next to the gearbox glyph. */
export function DrivetrainIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <path d="M6 8.2v7.6M18 8.2v7.6M8.2 12h7.6" />
    </svg>
  );
}
