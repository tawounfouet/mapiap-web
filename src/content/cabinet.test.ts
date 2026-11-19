import { describe, expect, it } from "vitest";

import { cabinetContent, founderProfile } from "./cabinet";

describe("cabinet source material", () => {
  it("uses the institutional introduction supplied by the client", () => {
    expect(cabinetContent.hero.description).toContain(
      "des micro-entreprises aux groupes",
    );
    expect(cabinetContent.pillars.title).toBe(
      "Expertise. Innovation. Performance.",
    );
  });

  it("reuses one founder profile and awaits portrait authorization", () => {
    expect(cabinetContent.founder.person).toBe(founderProfile);
    expect(founderProfile.firstName).toBe("Yves");
    expect(founderProfile.lastName).toBe("TCHAMO");
    expect(founderProfile.shortBio).toContain("IFRS");
    expect(founderProfile).not.toHaveProperty("portraitSrc");
  });
});
