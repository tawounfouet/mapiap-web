import type { Metadata } from "next";

import { ActualitesHeroSection } from "@/components/sections/actualites-hero-section";
import { ActualitesIndexSection } from "@/components/sections/actualites-index-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { actualitesIndexContent, articleSummaries } from "@/content/actualites";

export const metadata: Metadata = {
  title: "Actualités | MAPIAP Audit & Conseils",
  description:
    "Retrouvez les actualités et publications de MAPIAP Audit & Conseils.",
};

export default function ActualitesPage() {
  return (
    <>
      <ActualitesHeroSection content={actualitesIndexContent} />
      <ActualitesIndexSection items={articleSummaries} />
      <ContactCtaSection
        content={actualitesIndexContent.contactCta}
        headingId="actualites-contact-title"
      />
    </>
  );
}
