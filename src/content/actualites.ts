import type {
  ActualitesIndexContent,
  ArticleContent,
  ArticleSummary,
} from "@/types/content";

/**
 * Development-only editorial placeholders.
 *
 * No real MAPIAP publication content has been supplied yet. These entries
 * exist solely to qualify the article index/detail architecture and must be
 * replaced or removed before client-final delivery.
 */
export const articles = [
  {
    slug: "article-01-a-valider",
    title: "Article 01",
    excerpt:
      "À valider — titre, angle éditorial et résumé de la première publication.",
    body: [
      "À valider — contenu éditorial de la première publication MAPIAP.",
      "À valider — développement, analyse ou actualité à publier.",
    ],
  },
  {
    slug: "article-02-a-valider",
    title: "Article 02",
    excerpt:
      "À valider — titre, angle éditorial et résumé de la deuxième publication.",
    body: [
      "À valider — contenu éditorial de la deuxième publication MAPIAP.",
      "À valider — développement, analyse ou actualité à publier.",
    ],
  },
] as const satisfies readonly ArticleContent[];

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
      "À valider — brouillon visible uniquement pendant une session d’aperçu.",
    body: [
      "À valider — contenu de brouillon utilisé pour qualifier le workflow éditorial.",
    ],
  },
] as const satisfies readonly ArticleContent[];

export const actualitesIndexContent = {
  eyebrow: "Actualités",
  title: "Actualités & publications",
  description:
    "L’espace éditorial est prêt à accueillir les publications du cabinet. Les contenus visibles à ce stade sont des placeholders de développement à remplacer par des articles validés.",
  contactCta: {
    eyebrow: "Contact",
    title: "Échanger avec MAPIAP",
    description:
      "À valider — formulation finale du message reliant les publications à la prise de contact.",
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
