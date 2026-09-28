import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExpertiseCard } from "./expertise-card";

describe("ExpertiseCard", () => {
  it("renders the expertise summary without inventing a detail route", () => {
    render(
      <ExpertiseCard
        expertise={{
          slug: "expertise-test",
          title: "Expertise Test",
          shortDescription: "Description de test",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Expertise Test" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /voir les expertises/i }),
    ).toHaveAttribute("href", "/expertises");
  });
});
