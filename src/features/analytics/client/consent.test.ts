import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  ANALYTICS_CONSENT_CHANGED_EVENT,
  ANALYTICS_CONSENT_STORAGE_KEY,
  hasAnalyticsConsent,
  readAnalyticsConsent,
  writeAnalyticsConsent,
} from "./consent";

describe("analytics consent storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("has no consent by default", () => {
    expect(readAnalyticsConsent()).toBeUndefined();
    expect(hasAnalyticsConsent()).toBe(false);
  });

  it("stores explicit acceptance and broadcasts the change", () => {
    const listener = vi.fn();

    window.addEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, listener);
    writeAnalyticsConsent("accepted");

    expect(window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)).toBe(
      "accepted",
    );
    expect(hasAnalyticsConsent()).toBe(true);
    expect(listener).toHaveBeenCalledOnce();

    window.removeEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, listener);
  });

  it("stores explicit refusal", () => {
    writeAnalyticsConsent("declined");

    expect(readAnalyticsConsent()).toBe("declined");
    expect(hasAnalyticsConsent()).toBe(false);
  });
});
