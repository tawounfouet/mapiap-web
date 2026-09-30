import { afterEach, describe, expect, it } from "vitest";

import { getAnalyticsMode, getAnalyticsWebhookUrl } from "./analytics";

const originalMode = process.env.ANALYTICS_MODE;
const originalWebhook = process.env.ANALYTICS_WEBHOOK_URL;

afterEach(() => {
  if (originalMode === undefined) {
    delete process.env.ANALYTICS_MODE;
  } else {
    process.env.ANALYTICS_MODE = originalMode;
  }

  if (originalWebhook === undefined) {
    delete process.env.ANALYTICS_WEBHOOK_URL;
  } else {
    process.env.ANALYTICS_WEBHOOK_URL = originalWebhook;
  }
});

describe("analytics configuration", () => {
  it("is disabled by default", () => {
    delete process.env.ANALYTICS_MODE;

    expect(getAnalyticsMode()).toBe("disabled");
  });

  it("accepts explicit consent mode", () => {
    process.env.ANALYTICS_MODE = "consent";

    expect(getAnalyticsMode()).toBe("consent");
  });

  it("rejects unsupported modes", () => {
    process.env.ANALYTICS_MODE = "always-on";

    expect(() => getAnalyticsMode()).toThrow(/Unsupported ANALYTICS_MODE/);
  });

  it("returns an optional validated webhook URL", () => {
    process.env.ANALYTICS_WEBHOOK_URL = "https://analytics.example.test/events";

    expect(getAnalyticsWebhookUrl()?.toString()).toBe(
      "https://analytics.example.test/events",
    );
  });
});
