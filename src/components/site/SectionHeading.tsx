import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  subtitle?: string;
  /** Dark bands invert the text colour but keep the gold rule. */
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ children, subtitle, tone = "light", className = "" }: Props) {
  return (
    <div className={className}>
      <h2
        className={`heading-display heading-rule text-[1.375rem] leading-none sm:text-[1.625rem] ${
          tone === "dark" ? "text-white" : ""
        }`}
      >
        {children}
      </h2>
      {subtitle ? (
        <p
          className={`mt-3 text-sm ${
            tone === "dark" ? "text-white/60" : "text-slate-body/80"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
