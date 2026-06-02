import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Btn } from "./btn";

/**
 * A0 smoke test — proves the Vitest + Testing-Library harness renders a brand
 * primitive. Real per-component coverage lands with each A1/A2/A3 component.
 */
describe("Btn", () => {
  it("renders children as a button with default type", () => {
    render(<Btn>Save</Btn>);
    const el = screen.getByRole("button", { name: "Save" });
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute("type", "button");
  });

  it("applies variant + size classes", () => {
    render(
      <Btn variant="danger" size="lg">
        Delete
      </Btn>,
    );
    const el = screen.getByRole("button", { name: "Delete" });
    expect(el.className).toContain("error-500");
    expect(el.className).toContain("h-12");
  });

  it("disables when disabled", () => {
    render(<Btn disabled>Nope</Btn>);
    expect(screen.getByRole("button", { name: "Nope" })).toBeDisabled();
  });
});
