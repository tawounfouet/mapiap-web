import type { MetadataRoute } from "next";

import { getArticleHref } from "@/content/actualites";
import { expertises, getExpertiseHref } from "@/content/expertises";
import { getArticleRepository } from "@/features/articles/repository/get-article-repository";
import { isProvisionalSlug } from "@/lib/seo/provisional";
import { getSiteUrl } from "@/lib/seo/site-url";

const stablePublicPaths = [
  "/",
  "/cabinet",
  "/expertises",
  "/actualites",
  "/contact",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const repository = getArticleRepository();
  const publishedArticles = await repository.listPublished();

  const expertisePaths = expertises
    .filter(({ slug }) => !isProvisionalSlug(slug))
    .map(({ slug }) => getExpertiseHref(slug));

  const articlePaths = publishedArticles
    .filter(({ slug }) => !isProvisionalSlug(slug))
    .map(({ slug }) => getArticleHref(slug));

  return [...stablePublicPaths, ...expertisePaths, ...articlePaths].map(
    (pathname) => ({
      url: new URL(pathname, siteUrl).toString(),
    }),
  );
}
