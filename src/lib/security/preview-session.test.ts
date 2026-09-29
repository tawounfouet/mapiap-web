import { describe, expect, it } from "vitest";

import {
  createPreviewSessionToken,
  previewSessionIsValid,
} from "./preview-session";

describe("preview session", () => {
  it("validates a token generated from the same secret", () => {
    const token = createPreviewSessionToken("preview-secret");

    expect(previewSessionIsValid(token, "preview-secret")).toBe(true);
  });

  it("rejects a token generated from another secret", () => {
    const token = createPreviewSessionToken("other-secret");

    expect(previewSessionIsValid(token, "preview-secret")).toBe(false);
  });

  it("rejects missing session data", () => {
    expect(previewSessionIsValid(undefined, "preview-secret")).toBe(false);
    expect(previewSessionIsValid("token", undefined)).toBe(false);
  });
});
