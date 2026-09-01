import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { STORAGE_KEY } from "@/i18n/locales";
import { site } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — Car rental in Almaty`,
  description:
    "Car rental in Almaty, Kazakhstan. Delivery across the city and to the airport, 24/7 support, and transparent pricing with no hidden fees.",
};

/**
 * Applies the stored language before first paint so an Arabic visitor never
 * sees an LTR frame flash before the RTL layout kicks in.
 */
const localeBootstrap = `
(function(){try{
  var v=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
  if(!v) return;
  document.documentElement.lang=v;
  document.documentElement.dir=(v==="ar")?"rtl":"ltr";
}catch(e){}})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning covers exactly one thing here: lang/dir are
    // rewritten by the bootstrap script below before React hydrates.
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${archivo.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: localeBootstrap }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
