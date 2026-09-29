import type { MetadataRoute } from "next";

import { articles, getArticleHref } from "@/content/actualites";
import { expertises, getExpertiseHref } from "@/content/expertises";
import { isProvisionalSlug } from "@/lib/seo/provisional";
import { getSiteUrl } from "@/lib/seo/site-url";

const stablePublicPaths = [
  "/",
  "/cabinet",
  "/expertises",
  "/actualites",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const expertisePaths = expertises
    .filter(({ slug }) => !isProvisionalSlug(slug))
    .map(({ slug }) => getExpertiseHref(slug));

  const articlePaths = articles
    .filter(({ slug }) => !isProvisionalSlug(slug))
    .map(({ slug }) => getArticleHref(slug));

  return [...stablePublicPaths, ...expertisePaths, ...articlePaths].map(
    (pathname) => ({
      url: new URL(pathname, siteUrl).toString(),
    }),
  );
}
