import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MobileNavigation } from "./mobile-navigation";

const items = [
  { label: "Cabinet", href: "/cabinet" },
  { label: "Contact", href: "/contact" },
] as const;

describe("MobileNavigation", () => {
  it("opens the menu, focuses the first link and returns focus on Escape", async () => {
    const user = userEvent.setup();

    render(<MobileNavigation items={items} />);

    const trigger = screen.getByRole("button", { name: "Ouvrir le menu" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    const firstLink = screen.getByRole("link", { name: "Cabinet" });

    expect(firstLink).toHaveFocus();
    expect(
      screen.getByRole("navigation", { name: "Navigation mobile" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("navigation", { name: "Navigation mobile" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ouvrir le menu" }),
    ).toHaveFocus();
  });
});
