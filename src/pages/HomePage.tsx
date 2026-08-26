import { CtaSection } from "@/components/home/CtaSection";
import { DifferentialsSection } from "@/components/home/DifferentialsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { SocialProofSection } from "@/components/home/SocialProofSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ManifestoSection />
      <ServicesSection />
      <DifferentialsSection />
      <SocialProofSection />
      <CtaSection />
    </>
  );
}
