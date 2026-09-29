import { describe, expect, it } from "vitest";

import { readBearerToken, secretsMatch } from "./secrets";

describe("secret helpers", () => {
  it("compares configured secrets", () => {
    expect(secretsMatch("same-secret", "same-secret")).toBe(true);
    expect(secretsMatch("wrong-secret", "same-secret")).toBe(false);
    expect(secretsMatch(undefined, "same-secret")).toBe(false);
  });

  it("reads a bearer token from a request", () => {
    const request = new Request("https://example.test", {
      headers: {
        authorization: "Bearer webhook-secret",
      },
    });

    expect(readBearerToken(request)).toBe("webhook-secret");
  });
});
