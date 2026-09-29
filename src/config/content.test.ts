import { afterEach, describe, expect, it } from "vitest";

import { getCmsContentConfig, getContentSource } from "./content";

const originalSource = process.env.CONTENT_SOURCE;
const originalEndpoint = process.env.CMS_CONTENT_API_URL;
const originalPreviewEndpoint = process.env.CMS_CONTENT_PREVIEW_API_URL;
const originalToken = process.env.CMS_CONTENT_API_TOKEN;
const originalPreviewToken = process.env.CMS_CONTENT_PREVIEW_API_TOKEN;

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

  if (originalPreviewEndpoint === undefined) {
    delete process.env.CMS_CONTENT_PREVIEW_API_URL;
  } else {
    process.env.CMS_CONTENT_PREVIEW_API_URL = originalPreviewEndpoint;
  }

  if (originalToken === undefined) {
    delete process.env.CMS_CONTENT_API_TOKEN;
  } else {
    process.env.CMS_CONTENT_API_TOKEN = originalToken;
  }

  if (originalPreviewToken === undefined) {
    delete process.env.CMS_CONTENT_PREVIEW_API_TOKEN;
  } else {
    process.env.CMS_CONTENT_PREVIEW_API_TOKEN = originalPreviewToken;
  }
});

describe("content configuration", () => {
  it("defaults to the local content source", () => {
    delete process.env.CONTENT_SOURCE;

    expect(getContentSource()).toBe("local");
  });

  it("rejects an unsupported content source", () => {
    process.env.CONTENT_SOURCE = "unknown";

    expect(() => getContentSource()).toThrow(/Unsupported CONTENT_SOURCE/);
  });

  it("requires a valid endpoint in cms mode", () => {
    process.env.CONTENT_SOURCE = "cms";
    delete process.env.CMS_CONTENT_API_URL;

    expect(() => getCmsContentConfig()).toThrow(
      /CMS_CONTENT_API_URL is required/,
    );
  });

  it("returns published and preview CMS configuration", () => {
    process.env.CMS_CONTENT_API_URL = "https://cms.example.test/articles";
    process.env.CMS_CONTENT_PREVIEW_API_URL =
      "https://cms.example.test/articles/preview";
    process.env.CMS_CONTENT_API_TOKEN = "published-token";
    process.env.CMS_CONTENT_PREVIEW_API_TOKEN = "preview-token";

    expect(getCmsContentConfig()).toEqual({
      endpoint: new URL("https://cms.example.test/articles"),
      previewEndpoint: new URL(
        "https://cms.example.test/articles/preview",
      ),
      token: "published-token",
      previewToken: "preview-token",
    });
  });
});
