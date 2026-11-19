import { describe, expect, it } from "vitest";

import { LocalArticleRepository } from "./local-article-repository";

describe("LocalArticleRepository", () => {
  const repository = new LocalArticleRepository();

  it("does not list unapproved local articles publicly", async () => {
    await expect(repository.listPublished()).resolves.toEqual([]);
  });

  it("never exposes former placeholder articles by public slug", async () => {
    await expect(
      repository.findPublishedBySlug("article-01-a-valider"),
    ).resolves.toBeUndefined();
  });

  it("keeps the preview fixture hidden from published lookups", async () => {
    await expect(
      repository.findPublishedBySlug("article-brouillon-a-valider"),
    ).resolves.toBeUndefined();
  });

  it("exposes the development fixture only in preview mode", async () => {
    const article = await repository.findPreviewBySlug(
      "article-brouillon-a-valider",
    );
    expect(article?.title).toBe("Brouillon éditorial");
  });
});
