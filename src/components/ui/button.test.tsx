import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "./button";

describe("Button", () => {
  it("renders a native button with an accessible name", () => {
    render(<Button>Send</Button>);

    expect(screen.getByRole("button", { name: "Send" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("forwards the disabled state", () => {
    render(<Button disabled>Send</Button>);

    expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
  });
});
