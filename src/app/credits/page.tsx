import type { Metadata } from "next";
import { CreditsView } from "@/components/site/CreditsView";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Photo credits — ${site.name}`,
};

export default function CreditsPage() {
  return (
    <>
      <Navbar />
      <main>
        <CreditsView />
      </main>
      <Footer />
    </>
  );
}
