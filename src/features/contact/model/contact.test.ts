import { describe, expect, it } from "vitest";

import { contactFormSchema } from "./contact";

describe("contactFormSchema", () => {
  it("accepts a qualified contact request", () => {
    const result = contactFormSchema.safeParse({
      fullName: "Jean Dupont",
      email: "jean@example.com",
      organization: "Entreprise Test",
      phone: "",
      message:
        "Je souhaite échanger au sujet d’un besoin professionnel précis.",
      privacyAccepted: true,
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an invalid contact request", () => {
    const result = contactFormSchema.safeParse({
      fullName: "",
      email: "invalid",
      organization: "",
      phone: "",
      message: "Trop court",
      privacyAccepted: false,
      website: "",
    });

    expect(result.success).toBe(false);
  });
});
