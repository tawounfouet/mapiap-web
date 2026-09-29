import type { Metadata } from "next";
import { cookies, draftMode } from "next/headers";
import { notFound } from "next/navigation";

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
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

async function previewSessionIsEnabled() {
  const [draft, cookieStore] = await Promise.all([
    draftMode(),
    cookies(),
  ]);
  const secret = process.env.CMS_PREVIEW_SECRET?.trim();
  const signedSession = previewSessionIsValid(
    cookieStore.get(PREVIEW_SESSION_COOKIE)?.value,
    secret,
  );

  return draft.isEnabled || signedSession;
}

async function resolvePreviewArticle(slug: string) {
  const repository = getArticleRepository();

  return repository.findPreviewBySlug(slug);
}

export async function generateMetadata({
  params,
}: ArticlePreviewPageProps): Promise<Metadata> {
  if (!(await previewSessionIsEnabled())) {
    notFound();
  }

  const { slug } = await params;
  const article = await resolvePreviewArticle(slug);

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
  if (!(await previewSessionIsEnabled())) {
    notFound();
  }

  const { slug } = await params;
  const article = await resolvePreviewArticle(slug);

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
