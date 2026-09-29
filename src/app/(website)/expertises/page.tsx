import type { Metadata } from "next";

import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ExpertisesHeroSection } from "@/components/sections/expertises-hero-section";
import { ExpertisesIndexSection } from "@/components/sections/expertises-index-section";
import {
  expertiseSummaries,
  expertisesIndexContent,
} from "@/content/expertises";
import { getCanonicalUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Expertises",
  description: "Découvrez les domaines d’expertise de MAPIAP Audit & Conseils.",
  alternates: {
    canonical: getCanonicalUrl("/expertises"),
  },
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
