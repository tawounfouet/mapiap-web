import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { connection } from "next/server";

import { PreviewBanner } from "@/components/layout/preview-banner";
import { ArticleBodySection } from "@/components/sections/article-body-section";
import { ArticleDetailHeroSection } from "@/components/sections/article-detail-hero-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { actualitesIndexContent } from "@/content/actualites";
import { getArticleRepository } from "@/features/articles/repository/get-article-repository";
import {
  PREVIEW_SESSION_COOKIE,
  previewSessionIsValid,
} from "@/lib/security/preview-session";

interface ArticlePreviewPageProps {
  searchParams: Promise<{
    slug?: string | string[];
  }>;
}

export const metadata: Metadata = {
  title: "Aperçu éditorial",
  robots: {
    index: false,
    follow: false,
  },
};

async function resolvePreviewArticle(
  searchParams: ArticlePreviewPageProps["searchParams"],
) {
  await connection();

  const cookieStore = await cookies();
  const secret = process.env.CMS_PREVIEW_SECRET?.trim();

  if (
    !previewSessionIsValid(
      cookieStore.get(PREVIEW_SESSION_COOKIE)?.value,
      secret,
    )
  ) {
    notFound();
  }

  const query = await searchParams;
  const slug = typeof query.slug === "string" ? query.slug.trim() : "";

  if (!slug) {
    notFound();
  }

  const repository = getArticleRepository();
  const article = await repository.findPreviewBySlug(slug);

  if (!article) {
    notFound();
  }

  return article;
}

export default async function ArticlePreviewPage({
  searchParams,
}: ArticlePreviewPageProps) {
  const article = await resolvePreviewArticle(searchParams);

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
