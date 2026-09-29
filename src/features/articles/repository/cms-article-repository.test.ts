import { afterEach, describe, expect, it, vi } from "vitest";

import { CmsArticleRepository } from "./cms-article-repository";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CmsArticleRepository", () => {
  it("maps the provider-neutral published CMS response", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          items: [
            {
              slug: "publication-test",
              title: "Publication Test",
              excerpt: "Résumé de publication.",
              body: ["Premier paragraphe."],
              status: "published",
            },
          ],
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    const repository = new CmsArticleRepository({
      endpoint: new URL("https://cms.example.test/articles"),
      token: "token-test",
    });

    await expect(repository.listPublished()).resolves.toEqual([
      {
        slug: "publication-test",
        title: "Publication Test",
        excerpt: "Résumé de publication.",
        body: ["Premier paragraphe."],
      },
    ]);

    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("loads draft content from the dedicated preview endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          item: {
            slug: "publication-brouillon",
            title: "Publication brouillon",
            excerpt: "Résumé non publié.",
            body: ["Contenu de prévisualisation."],
            status: "draft",
          },
        }),
        { status: 200 },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    const repository = new CmsArticleRepository({
      endpoint: new URL("https://cms.example.test/articles"),
      previewEndpoint: new URL(
        "https://cms.example.test/articles/preview",
      ),
      token: "published-token",
      previewToken: "preview-token",
    });

    await expect(
      repository.findPreviewBySlug("publication-brouillon"),
    ).resolves.toEqual({
      slug: "publication-brouillon",
      title: "Publication brouillon",
      excerpt: "Résumé non publié.",
      body: ["Contenu de prévisualisation."],
    });

    const requestedUrl = fetchMock.mock.calls[0]?.[0];

    expect(String(requestedUrl)).toContain(
      "slug=publication-brouillon",
    );
  });

  it("requires a dedicated preview endpoint for CMS preview", async () => {
    const repository = new CmsArticleRepository({
      endpoint: new URL("https://cms.example.test/articles"),
    });

    await expect(
      repository.findPreviewBySlug("publication-brouillon"),
    ).rejects.toThrow(/CMS_CONTENT_PREVIEW_API_URL is required/);
  });

  it("fails closed when the published CMS response violates the contract", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            items: [
              {
                slug: "invalid slug",
                title: "",
                excerpt: "",
                body: [],
                status: "draft",
              },
            ],
          }),
          { status: 200 },
        ),
      ),
    );

    const repository = new CmsArticleRepository({
      endpoint: new URL("https://cms.example.test/articles"),
    });

    await expect(repository.listPublished()).rejects.toThrow(
      /does not match the expected contract/,
    );
  });

  it("fails closed when the CMS endpoint returns an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 503 })),
    );

    const repository = new CmsArticleRepository({
      endpoint: new URL("https://cms.example.test/articles"),
    });

    await expect(repository.listPublished()).rejects.toThrow(/status 503/);
  });
});
