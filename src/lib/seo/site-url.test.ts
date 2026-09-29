import { afterEach, describe, expect, it } from "vitest";

import { getCanonicalUrl, getSiteUrl } from "./site-url";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    return;
  }

  process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
});

describe("site URL helpers", () => {
  it("returns undefined when no canonical site URL is configured", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    expect(getSiteUrl()).toBeUndefined();
    expect(getCanonicalUrl("/cabinet")).toBeUndefined();
  });

  it("rejects an invalid site URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "not-a-url";

    expect(getSiteUrl()).toBeUndefined();
  });

  it("normalizes the configured site URL to its origin", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://mapiap.test/some/path";

    expect(getSiteUrl()?.toString()).toBe("https://mapiap.test/");
    expect(getCanonicalUrl("/cabinet")).toBe("https://mapiap.test/cabinet");
  });
});
