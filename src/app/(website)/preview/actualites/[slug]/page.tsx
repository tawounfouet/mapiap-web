import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { PreviewBanner } from "@/components/layout/preview-banner";
import { ArticleBodySection } from "@/components/sections/article-body-section";
import { ArticleDetailHeroSection } from "@/components/sections/article-detail-hero-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { actualitesIndexContent } from "@/content/actualites";
import { getArticleRepository } from "@/features/articles/repository/get-article-repository";

interface ArticlePreviewPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ArticlePreviewPageProps): Promise<Metadata> {
  const draft = await draftMode();

  if (!draft.isEnabled) {
    notFound();
  }

  const { slug } = await params;
  const repository = getArticleRepository();
  const article = await repository.findPreviewBySlug(slug);

  if (!article) {
    notFound();
  }

  return {
    title: `Aperçu — ${article.title}`,
    description: article.excerpt,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ArticlePreviewPage({
  params,
}: ArticlePreviewPageProps) {
  const draft = await draftMode();

  if (!draft.isEnabled) {
    notFound();
  }

  const { slug } = await params;
  const repository = getArticleRepository();
  const article = await repository.findPreviewBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PreviewBanner />
      <ArticleDetailHeroSection article={article} />
      <ArticleBodySection article={article} />
      <ContactCtaSection
        content={actualitesIndexContent.contactCta}
        headingId="article-preview-contact-title"
      />
    </>
  );
}
