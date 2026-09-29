import type { Metadata } from "next";

import { BrandPillarsSection } from "@/components/sections/brand-pillars-section";
import { CabinetFounderSection } from "@/components/sections/cabinet-founder-section";
import { CabinetHeroSection } from "@/components/sections/cabinet-hero-section";
import { CabinetIntroductionSection } from "@/components/sections/cabinet-introduction-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { cabinetContent } from "@/content/cabinet";
import { getCanonicalUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Cabinet",
  description: "Présentation du cabinet MAPIAP Audit & Conseils.",
  alternates: {
    canonical: getCanonicalUrl("/cabinet"),
  },
};

export default function CabinetPage() {
  return (
    <>
      <CabinetHeroSection content={cabinetContent.hero} />
      <CabinetIntroductionSection content={cabinetContent.introduction} />
      <BrandPillarsSection content={cabinetContent.pillars} />
      <CabinetFounderSection content={cabinetContent.founder} />
      <ContactCtaSection
        content={cabinetContent.contactCta}
        headingId="cabinet-contact-title"
      />
    </>
  );
}
