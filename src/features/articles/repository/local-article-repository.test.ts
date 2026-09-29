import { describe, expect, it } from "vitest";

import { LocalArticleRepository } from "./local-article-repository";

describe("LocalArticleRepository", () => {
  const repository = new LocalArticleRepository();

  it("lists the local development articles", async () => {
    const articles = await repository.listPublished();

    expect(articles).toHaveLength(2);
  });

  it("finds a local published article by slug", async () => {
    const article = await repository.findPublishedBySlug(
      "article-01-a-valider",
    );

    expect(article?.title).toBe("Article 01");
  });

  it("finds a local preview article by slug", async () => {
    const article = await repository.findPreviewBySlug("article-01-a-valider");

    expect(article?.title).toBe("Article 01");
  });

  it("returns undefined for an unknown local slug", async () => {
    await expect(
      repository.findPublishedBySlug("article-inconnu"),
    ).resolves.toBeUndefined();
  });
});
