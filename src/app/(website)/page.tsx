import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { FounderSection } from "@/components/sections/founder-section";
import { HeroSection } from "@/components/sections/hero-section";
import { IntroductionSection } from "@/components/sections/introduction-section";
import { expertiseSummaries } from "@/content/expertises";
import { homeContent } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <HeroSection content={homeContent.hero} />
      <IntroductionSection content={homeContent.introduction} />
      <ExpertiseSection items={expertiseSummaries} />
      <FounderSection content={homeContent.founder} />
      <ContactCtaSection content={homeContent.contactCta} />
    </>
  );
}
