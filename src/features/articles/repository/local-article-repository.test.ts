import { describe, expect, it } from "vitest";

import { LocalArticleRepository } from "./local-article-repository";

describe("LocalArticleRepository", () => {
  const repository = new LocalArticleRepository();

  it("lists only the local published development articles", async () => {
    const articles = await repository.listPublished();

    expect(articles).toHaveLength(2);
    expect(articles.map(({ slug }) => slug)).not.toContain(
      "article-brouillon-a-valider",
    );
  });

  it("finds a published local article by slug", async () => {
    const article = await repository.findPublishedBySlug(
      "article-01-a-valider",
    );

    expect(article?.title).toBe("Article 01");
  });

  it("keeps the local draft hidden from published lookups", async () => {
    await expect(
      repository.findPublishedBySlug("article-brouillon-a-valider"),
    ).resolves.toBeUndefined();
  });

  it("exposes the local draft only through the preview lookup", async () => {
    const article = await repository.findPreviewBySlug(
      "article-brouillon-a-valider",
    );

    expect(article?.title).toBe("Brouillon éditorial");
  });
});
