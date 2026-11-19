import { describe, expect, it } from "vitest";

import { expertises, getExpertiseBySlug, getExpertiseHref } from "./expertises";

describe("expertises content helpers", () => {
  it("exposes exactly the four domains provided by the client", () => {
    expect(expertises.map((expertise) => expertise.title)).toEqual([
      "Comptabilité et accompagnement des TPE/PME",
      "Consolidation des comptes de groupe (normes françaises et IFRS)",
      "Fiscalité, juridique et social",
      "Audit, évaluation et conseil financier",
    ]);
    expect(new Set(expertises.map((expertise) => expertise.slug)).size).toBe(4);
  });

  it("resolves a known expertise by slug", () => {
    const expertise = getExpertiseBySlug("consolidation-comptes-groupe");
    expect(expertise?.title).toContain("IFRS");
  });

  it("does not expose old placeholders as business domains", () => {
    expect(getExpertiseBySlug("expertise-01-a-valider")).toBeUndefined();
    expect(getExpertiseBySlug("unknown-expertise")).toBeUndefined();
  });

  it("builds the expertise detail path", () => {
    expect(getExpertiseHref("fiscalite-juridique-social")).toBe(
      "/expertises/fiscalite-juridique-social",
    );
  });
});
