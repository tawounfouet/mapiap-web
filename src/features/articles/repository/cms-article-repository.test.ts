import { afterEach, describe, expect, it, vi } from "vitest";

import { CmsArticleRepository } from "./cms-article-repository";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CmsArticleRepository", () => {
  it("exposes only published articles in public mode", async () => {
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
            {
              slug: "brouillon-test",
              title: "Brouillon Test",
              excerpt: "Résumé de brouillon.",
              body: ["Brouillon."],
              status: "draft",
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

  it("requests uncached preview content and exposes draft articles", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          items: [
            {
              slug: "brouillon-test",
              title: "Brouillon Test",
              excerpt: "Résumé de brouillon.",
              body: ["Brouillon."],
              status: "draft",
            },
          ],
        }),
        { status: 200 },
      ),
    );

    vi.stubGlobal("fetch", fetchMock);

    const repository = new CmsArticleRepository({
      endpoint: new URL("https://cms.example.test/articles"),
    });

    await expect(
      repository.findPreviewBySlug("brouillon-test"),
    ).resolves.toEqual({
      slug: "brouillon-test",
      title: "Brouillon Test",
      excerpt: "Résumé de brouillon.",
      body: ["Brouillon."],
    });

    const [requestUrl, requestInit] = fetchMock.mock.calls[0] ?? [];

    expect(String(requestUrl)).toContain("preview=1");
    expect(requestInit).toMatchObject({
      cache: "no-store",
    });
  });

  it("fails closed when the CMS response violates the contract", async () => {
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
                status: "archived",
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
