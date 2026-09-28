import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./container";

describe("Container", () => {
  it("renders its content", () => {
    render(<Container>Container content</Container>);

    expect(screen.getByText("Container content")).toBeInTheDocument();
  });

  it("supports a reading-width variant", () => {
    render(<Container data-testid="container" size="reading" />);

    expect(screen.getByTestId("container")).toHaveClass("max-w-3xl");
  });
});
