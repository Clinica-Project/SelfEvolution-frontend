import { CtaSection } from "@/components/home/CtaSection";
import { DifferentialsSection } from "@/components/home/DifferentialsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { LocationsSection } from "@/components/home/LocationsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <DifferentialsSection />
      <LocationsSection />
      <SocialProofSection />
      <CtaSection />
    </>
  );
}
