import { describe, expect, it } from "vitest";

import { analyticsEventSchema } from "./analytics-event";

describe("analyticsEventSchema", () => {
  it("accepts a privacy-minimal page view", () => {
    expect(
      analyticsEventSchema.safeParse({
        type: "page_view",
        path: "/cabinet",
        timestamp: "2026-09-30T00:00:00.000Z",
      }).success,
    ).toBe(true);
  });

  it("accepts a web vital", () => {
    expect(
      analyticsEventSchema.safeParse({
        type: "web_vital",
        path: "/",
        timestamp: "2026-09-30T00:00:00.000Z",
        metric: {
          id: "v1-123",
          name: "LCP",
          value: 1200,
          delta: 1200,
          rating: "good",
        },
      }).success,
    ).toBe(true);
  });

  it("rejects absolute URLs to avoid collecting query-level navigation data", () => {
    expect(
      analyticsEventSchema.safeParse({
        type: "page_view",
        path: "https://example.test/private?email=user@example.com",
        timestamp: "2026-09-30T00:00:00.000Z",
      }).success,
    ).toBe(false);
  });
});
