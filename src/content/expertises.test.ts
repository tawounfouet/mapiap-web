import { describe, expect, it } from "vitest";

import { expertises, getExpertiseBySlug, getExpertiseHref } from "./expertises";

describe("expertises content helpers", () => {
  it("resolves a known expertise by slug", () => {
    const expertise = getExpertiseBySlug(expertises[0].slug);

    expect(expertise?.title).toBe("Expertise 01");
  });

  it("returns undefined for an unknown expertise slug", () => {
    expect(getExpertiseBySlug("unknown-expertise")).toBeUndefined();
  });

  it("builds the public expertise detail path", () => {
    expect(getExpertiseHref("expertise-test")).toBe(
      "/expertises/expertise-test",
    );
  });
});
