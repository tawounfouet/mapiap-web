import type { Metadata } from "next";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ExpertisesHeroSection } from "@/components/sections/expertises-hero-section";
import { ExpertisesIndexSection } from "@/components/sections/expertises-index-section";
import {
  expertiseSummaries,
  expertisesIndexContent,
} from "@/content/expertises";

export const metadata: Metadata = {
  title: "Expertises | MAPIAP Audit & Conseils",
  description: "Découvrez les domaines d’expertise de MAPIAP Audit & Conseils.",
};

export default function ExpertisesPage() {
  return (
    <>
      <ExpertisesHeroSection content={expertisesIndexContent} />
      <ExpertisesIndexSection items={expertiseSummaries} />
      <ContactCtaSection
        content={expertisesIndexContent.contactCta}
        headingId="expertises-contact-title"
      />
    </>
  );
}
