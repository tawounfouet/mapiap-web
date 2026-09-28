import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MobileNavigation } from "./mobile-navigation";

const items = [
  { label: "Cabinet", href: "/cabinet" },
  { label: "Contact", href: "/contact" },
] as const;

describe("MobileNavigation", () => {
  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();

    render(<MobileNavigation items={items} />);

    const trigger = screen.getByRole("button", { name: "Ouvrir le menu" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Navigation mobile" }),
    ).not.toBeInTheDocument();

    await user.click(trigger);

    expect(
      screen.getByRole("button", { name: "Fermer le menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Navigation mobile" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("navigation", { name: "Navigation mobile" }),
    ).not.toBeInTheDocument();
  });
});
