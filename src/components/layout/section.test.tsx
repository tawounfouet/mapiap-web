import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Section } from "./section";

describe("Section", () => {
  it("renders a semantic section landmark", () => {
    render(
      <Section aria-label="Example section">
        <p>Section content</p>
      </Section>,
    );

    expect(
      screen.getByRole("region", { name: "Example section" }),
    ).toBeInTheDocument();
  });
});
