import { describe, expect, it } from "vitest";

import { serverSecretMatches } from "./server-secret";

describe("serverSecretMatches", () => {
  it("accepts identical non-empty secrets", () => {
    expect(serverSecretMatches("secret-value", "secret-value")).toBe(true);
  });

  it("rejects different secrets", () => {
    expect(serverSecretMatches("wrong-secret", "secret-value")).toBe(false);
  });

  it("rejects missing secrets", () => {
    expect(serverSecretMatches(undefined, "secret-value")).toBe(false);
    expect(serverSecretMatches("secret-value", undefined)).toBe(false);
  });
});
