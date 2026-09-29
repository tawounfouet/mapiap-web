import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBodySection } from "@/components/sections/article-body-section";
import { ArticleDetailHeroSection } from "@/components/sections/article-detail-hero-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import {
  actualitesIndexContent,
  articles,
  getArticleBySlug,
} from "@/content/actualites";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return {
    title: `${article.title} | MAPIAP Audit & Conseils`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

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
