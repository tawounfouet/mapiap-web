import { describe, expect, it } from "vitest";

import { isNavigationItemActive } from "./navigation-state";

describe("isNavigationItemActive", () => {
  it("matches the homepage only on the root route", () => {
    expect(isNavigationItemActive("/", "/")).toBe(true);
    expect(isNavigationItemActive("/cabinet", "/")).toBe(false);
  });

  it("matches a section and its nested routes", () => {
    expect(isNavigationItemActive("/expertises", "/expertises")).toBe(true);
    expect(
      isNavigationItemActive("/expertises/audit", "/expertises"),
    ).toBe(true);
  });

  it("is safe when the pathname is temporarily unavailable", () => {
    expect(isNavigationItemActive(null, "/cabinet")).toBe(false);
  });
});
