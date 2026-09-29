import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExpertiseCard } from "./expertise-card";

const expertise = {
  slug: "expertise-test",
  title: "Expertise Test",
  shortDescription: "Description de test",
};

describe("ExpertiseCard", () => {
  it("renders the expertise summary without forcing a detail route", () => {
    render(<ExpertiseCard expertise={expertise} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Expertise Test" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders an explicit link when a destination is provided", () => {
    render(
      <ExpertiseCard
        expertise={expertise}
        href="/expertises/expertise-test"
      />,
    );

    expect(screen.getByRole("link", { name: /en savoir plus/i })).toHaveAttribute(
      "href",
      "/expertises/expertise-test",
    );
  });
});
