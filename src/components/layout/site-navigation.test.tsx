import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteNavigation } from "./site-navigation";

const items = [
  { label: "Cabinet", href: "/cabinet" },
  { label: "Contact", href: "/contact" },
] as const;

describe("SiteNavigation", () => {
  it("renders navigation items with their destinations", () => {
    render(<SiteNavigation items={items} />);

    expect(
      screen.getByRole("navigation", { name: "Navigation principale" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cabinet" })).toHaveAttribute(
      "href",
      "/cabinet",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});
