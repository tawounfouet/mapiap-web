import { z } from "zod";

import type { CmsContentConfig } from "@/config/content";
import type { ArticleRepository } from "@/features/articles/repository/article-repository";
import type { ArticleContent } from "@/types/content";

const cmsArticleBaseSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().trim().min(1).max(600),
  body: z.array(z.string().trim().min(1)).min(1),
});

const cmsPublishedArticleSchema = cmsArticleBaseSchema.extend({
  status: z.literal("published"),
});

const cmsPreviewArticleSchema = cmsArticleBaseSchema.extend({
  status: z.enum(["draft", "published"]),
});

export const cmsArticlesResponseSchema = z.object({
  items: z.array(cmsPublishedArticleSchema),
});

export const cmsArticlePreviewResponseSchema = z.object({
  item: cmsPreviewArticleSchema.nullable(),
});

function toArticleContent(
  article:
    | z.infer<typeof cmsPublishedArticleSchema>
    | z.infer<typeof cmsPreviewArticleSchema>,
): ArticleContent {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    body: article.body,
  };
}

function createHeaders(token: string | undefined) {
  const headers = new Headers({
    accept: "application/json",
  });

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
}

export class CmsArticleRepository implements ArticleRepository {
  constructor(private readonly config: CmsContentConfig) {}

  private async fetchPublishedArticles(): Promise<readonly ArticleContent[]> {
    const response = await fetch(this.config.endpoint, {
      headers: createHeaders(this.config.token),
      next: {
        revalidate: 300,
        tags: ["cms:articles"],
      },
    });

    if (!response.ok) {
      throw new Error(
        `CMS article request failed with status ${response.status}.`,
      );
    }

    const payload: unknown = await response.json();
    const parsed = cmsArticlesResponseSchema.safeParse(payload);

    if (!parsed.success) {
      throw new Error(
        "CMS article response does not match the expected contract.",
      );
    }

    return parsed.data.items.map(toArticleContent);
  }

  async listPublished() {
    return this.fetchPublishedArticles();
  }

  async findPublishedBySlug(slug: string) {
    const articles = await this.fetchPublishedArticles();

    return articles.find((article) => article.slug === slug);
  }

  async findPreviewBySlug(slug: string) {
    if (!this.config.previewEndpoint) {
      throw new Error(
        "CMS_CONTENT_PREVIEW_API_URL is required to preview CMS articles.",
      );
    }

    const previewUrl = new URL(this.config.previewEndpoint);
    previewUrl.searchParams.set("slug", slug);

    const response = await fetch(previewUrl, {
      cache: "no-store",
      headers: createHeaders(this.config.previewToken ?? this.config.token),
    });

    if (!response.ok) {
      throw new Error(
        `CMS preview request failed with status ${response.status}.`,
      );
    }

    const payload: unknown = await response.json();
    const parsed = cmsArticlePreviewResponseSchema.safeParse(payload);

    if (!parsed.success) {
      throw new Error(
        "CMS preview response does not match the expected contract.",
      );
    }

    return parsed.data.item ? toArticleContent(parsed.data.item) : undefined;
  }
}
