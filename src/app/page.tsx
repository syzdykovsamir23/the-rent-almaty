import { ExploreKazakhstan } from "@/components/site/ExploreKazakhstan";
import { FloatingContacts } from "@/components/site/FloatingContacts";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { LanguageModal } from "@/components/site/LanguageModal";
import { Navbar } from "@/components/site/Navbar";
import { PopularCars } from "@/components/site/PopularCars";
import { Testimonials } from "@/components/site/Testimonials";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { getCars } from "@/lib/cars";

export default async function HomePage() {
  const cars = await getCars({ limit: 8 });

  return (
    <>
      <LanguageModal />
      <Navbar />
      <main>
        <Hero />
        <PopularCars cars={cars} />
        <WhyChooseUs />
        <ExploreKazakhstan />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
      <FloatingContacts />
    </>
  );
}
