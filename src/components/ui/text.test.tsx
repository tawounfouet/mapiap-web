import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Text } from "./text";

describe("Text", () => {
  it("renders paragraph content", () => {
    render(<Text>MAPIAP content</Text>);

    expect(screen.getByText("MAPIAP content").tagName).toBe("P");
  });
});
