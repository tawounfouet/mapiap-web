import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Heading } from "./heading";

describe("Heading", () => {
  it("separates semantic level from visual size", () => {
    render(
      <Heading as="h1" size="sm">
        MAPIAP
      </Heading>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "MAPIAP" }),
    ).toBeInTheDocument();
  });
});
