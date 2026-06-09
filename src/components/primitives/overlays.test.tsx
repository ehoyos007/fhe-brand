import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BandedDialog, BandedDialogContent } from "./dialog-banded";
import { Panel, PanelContent } from "./panel";
import { OverlayHistoryProvider, useOverlayHistory } from "./overlay-history";

describe("BandedDialog", () => {
  it("renders the banded header title + subtitle when open", () => {
    render(
      <BandedDialog open>
        <BandedDialogContent icon="phone-incoming" title="Disposition call" subtitle="Sarah Martinez">
          body
        </BandedDialogContent>
      </BandedDialog>,
    );
    expect(screen.getByText("Disposition call")).toBeInTheDocument();
    expect(screen.getByText("Sarah Martinez")).toBeInTheDocument();
    expect(screen.getByText("body")).toBeInTheDocument();
  });

  it("inputRequired suppresses Escape dismissal", () => {
    const onOpenChange = vi.fn();
    render(
      <BandedDialog open onOpenChange={onOpenChange}>
        <BandedDialogContent inputRequired title="Disposition call">
          body
        </BandedDialogContent>
      </BandedDialog>,
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});

describe("Panel", () => {
  it("renders a nested (level 2) panel with its title", () => {
    render(
      <Panel open>
        <PanelContent level={2} icon="id-card" title="ID Card" subtitle="Sarah Chen">
          preview
        </PanelContent>
      </Panel>,
    );
    expect(screen.getByText("ID Card")).toBeInTheDocument();
    expect(screen.getByText("preview")).toBeInTheDocument();
  });
});

describe("OverlayHistory", () => {
  function Harness() {
    const [open, setOpen] = React.useState(true);
    const { recordClosed } = useOverlayHistory();
    return (
      <>
        <button onClick={() => { recordClosed(() => setOpen(true)); setOpen(false); }}>
          dismiss
        </button>
        {open ? <div role="note">panel open</div> : null}
      </>
    );
  }

  it("Shift+Esc replays the recorded reopen thunk", () => {
    render(
      <OverlayHistoryProvider>
        <Harness />
      </OverlayHistoryProvider>,
    );
    expect(screen.getByRole("note")).toBeInTheDocument();
    fireEvent.click(screen.getByText("dismiss"));
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape", shiftKey: true });
    expect(screen.getByRole("note")).toBeInTheDocument();
  });
});
