import type {
  ActualitesIndexContent,
  ArticleContent,
  ArticleSummary,
} from "@/types/content";

/**
 * No MAPIAP publication has been approved for public release yet.
 * Keep the public local repository empty until validated content exists.
 */
export const articles: readonly ArticleContent[] = [];

/**
 * Local preview-only fixture.
 *
 * This article must never appear in public listings. It exists to qualify the
 * Draft Mode workflow before a real CMS provides unpublished editorial data.
 */
export const draftArticles = [
  {
    slug: "article-brouillon-a-valider",
    title: "Brouillon éditorial",
    excerpt:
      "À valider - brouillon visible uniquement pendant une session d’aperçu.",
    body: [
      "À valider - contenu de brouillon utilisé pour qualifier le workflow éditorial.",
    ],
  },
] as const satisfies readonly ArticleContent[];

export const actualitesIndexContent = {
  eyebrow: "Actualités",
  title: "Actualités & publications",
  description:
    "Les publications de MAPIAP seront présentées ici dès qu’elles auront été validées.",
  contactCta: {
    eyebrow: "Contact",
    title: "Échanger avec MAPIAP",
    description:
      "À valider - formulation finale du message reliant les publications à la prise de contact.",
    action: {
      label: "Nous contacter",
      href: "/contact",
    },
  },
} satisfies ActualitesIndexContent;

export function toArticleSummary(article: ArticleContent): ArticleSummary {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
  };
}

export function getArticleHref(slug: string) {
  return `/actualites/${slug}`;
}
