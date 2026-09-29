import { afterEach, describe, expect, it } from "vitest";

import { CmsArticleRepository } from "./cms-article-repository";
import { getArticleRepository } from "./get-article-repository";
import { LocalArticleRepository } from "./local-article-repository";

const originalSource = process.env.CONTENT_SOURCE;
const originalEndpoint = process.env.CMS_CONTENT_API_URL;

afterEach(() => {
  if (originalSource === undefined) {
    delete process.env.CONTENT_SOURCE;
  } else {
    process.env.CONTENT_SOURCE = originalSource;
  }

  if (originalEndpoint === undefined) {
    delete process.env.CMS_CONTENT_API_URL;
  } else {
    process.env.CMS_CONTENT_API_URL = originalEndpoint;
  }
});

describe("getArticleRepository", () => {
  it("returns the local repository by default", () => {
    delete process.env.CONTENT_SOURCE;

    expect(getArticleRepository()).toBeInstanceOf(LocalArticleRepository);
  });

  it("returns the CMS repository when explicitly configured", () => {
    process.env.CONTENT_SOURCE = "cms";
    process.env.CMS_CONTENT_API_URL = "https://cms.example.test/articles";

    expect(getArticleRepository()).toBeInstanceOf(CmsArticleRepository);
  });
});
