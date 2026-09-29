import type { Metadata } from "next";

import { ActualitesHeroSection } from "@/components/sections/actualites-hero-section";
import { ActualitesIndexSection } from "@/components/sections/actualites-index-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import {
  actualitesIndexContent,
  toArticleSummary,
} from "@/content/actualites";
import { getArticleRepository } from "@/features/articles/repository/get-article-repository";
import { getCanonicalUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Retrouvez les actualités et publications de MAPIAP Audit & Conseils.",
  alternates: {
    canonical: getCanonicalUrl("/actualites"),
  },
};

export default async function ActualitesPage() {
  const repository = getArticleRepository();
  const articles = await repository.listPublished();
  const summaries = articles.map(toArticleSummary);

  return (
    <>
      <ActualitesHeroSection content={actualitesIndexContent} />
      <ActualitesIndexSection items={summaries} />
      <ContactCtaSection
        content={actualitesIndexContent.contactCta}
        headingId="actualites-contact-title"
      />
    </>
  );
}
