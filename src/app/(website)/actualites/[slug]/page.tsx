import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBodySection } from "@/components/sections/article-body-section";
import { ArticleDetailHeroSection } from "@/components/sections/article-detail-hero-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { actualitesIndexContent, getArticleHref } from "@/content/actualites";
import { getArticleRepository } from "@/features/articles/repository/get-article-repository";
import { isProvisionalSlug } from "@/lib/seo/provisional";
import { getCanonicalUrl } from "@/lib/seo/site-url";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const repository = getArticleRepository();
  const articles = await repository.listPublished();

  return articles.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const repository = getArticleRepository();
  const article = await repository.findPublishedBySlug(slug);

  if (!article) {
    notFound();
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: getCanonicalUrl(getArticleHref(slug)),
    },
    robots: isProvisionalSlug(slug)
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const repository = getArticleRepository();
  const article = await repository.findPublishedBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <ArticleDetailHeroSection article={article} />
      <ArticleBodySection article={article} />
      <ContactCtaSection
        content={actualitesIndexContent.contactCta}
        headingId="article-contact-title"
      />
    </>
  );
}
