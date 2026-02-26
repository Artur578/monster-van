import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Conveyor } from "@/components/sections/Conveyor";
import { Essence } from "@/components/sections/Essence";
import { Services } from "@/components/sections/Services";
import { Fleet } from "@/components/sections/Fleet";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Conveyor />
        <Essence />
        <Services />
        <Fleet />
        <CTASection />
  <Footer />
       
      </main>
    </>
  );
}
