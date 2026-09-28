import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Link } from "./link";

describe("Link", () => {
  it("renders an accessible link with its destination", () => {
    render(<Link href="/cabinet">Découvrir le cabinet</Link>);

    expect(
      screen.getByRole("link", { name: "Découvrir le cabinet" }),
    ).toHaveAttribute("href", "/cabinet");
  });
});
