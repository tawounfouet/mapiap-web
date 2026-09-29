import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PersonProfile } from "./person-profile";

describe("PersonProfile", () => {
  it("renders the public person summary", () => {
    render(
      <PersonProfile
        person={{
          firstName: "Yves",
          lastName: "TCHAMO",
          role: "Titre à valider",
          shortBio: "Biographie à valider",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 3, name: "Yves TCHAMO" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Titre à valider")).toBeInTheDocument();
  });

  it("supports a different semantic heading level", () => {
    render(
      <PersonProfile
        headingAs="h2"
        person={{
          firstName: "Yves",
          lastName: "TCHAMO",
          role: "Titre à valider",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: "Yves TCHAMO" }),
    ).toBeInTheDocument();
  });
});
