import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  EmptyState,
  Toolbar,
  Calendar,
  DatePicker,
  DataTable,
  Board,
  Command,
  CommandInput,
  CommandList,
  CommandItem,
} from "./index";
import {
  AppShell,
  Sidebar,
  SidebarNav,
  SidebarSection,
  SidebarItem,
  PageHeader,
  SplitPane,
} from "../shell/index";

describe("EmptyState + Toolbar", () => {
  it("EmptyState shows title", () => {
    render(<EmptyState title="No leads" description="Try a different filter" />);
    expect(screen.getByText("No leads")).toBeInTheDocument();
  });
  it("Toolbar renders children", () => {
    render(<Toolbar><span>filters</span></Toolbar>);
    expect(screen.getByText("filters")).toBeInTheDocument();
  });
});

describe("Calendar", () => {
  it("shows the month label and selects a day", () => {
    const onSelect = vi.fn();
    const june = new Date(2026, 5, 15);
    render(<Calendar defaultMonth={june} selected={june} onSelect={onSelect} />);
    expect(screen.getByText("June 2026")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "15" }));
    expect(onSelect).toHaveBeenCalled();
  });
});

describe("DatePicker", () => {
  it("renders the placeholder when empty", () => {
    render(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByText("Pick a date")).toBeInTheDocument();
  });
});

describe("DataTable", () => {
  const columns = [{ accessorKey: "name", header: "Name" }];
  it("renders headers and rows", () => {
    render(<DataTable columns={columns} data={[{ name: "Ivan" }, { name: "Kelsey" }]} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Ivan")).toBeInTheDocument();
    expect(screen.getByText("Kelsey")).toBeInTheDocument();
  });
  it("shows an empty state with no data", () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
  });
});

describe("Board", () => {
  it("renders columns and cards", () => {
    const items = [{ id: "1", col: "todo", name: "Call Ivan" }];
    render(
      <Board
        columns={[{ id: "todo", title: "To do" }, { id: "done", title: "Done" }]}
        items={items}
        getId={(i) => i.id}
        getColumnId={(i) => i.col}
        renderCard={(i) => <div>{i.name}</div>}
      />,
    );
    expect(screen.getByText("To do")).toBeInTheDocument();
    expect(screen.getByText("Call Ivan")).toBeInTheDocument();
  });
});

describe("Command", () => {
  it("renders items", () => {
    render(
      <Command>
        <CommandInput placeholder="Search…" />
        <CommandList>
          <CommandItem>Call lead</CommandItem>
        </CommandList>
      </Command>,
    );
    expect(screen.getByText("Call lead")).toBeInTheDocument();
  });
});

describe("Shell", () => {
  it("Sidebar item carries active state", () => {
    render(
      <Sidebar>
        <SidebarNav>
          <SidebarSection label="Main">
            <SidebarItem icon="home" label="Dashboard" active />
            <SidebarItem icon="inbox" label="Inbox" />
          </SidebarSection>
        </SidebarNav>
      </Sidebar>,
    );
    expect(screen.getByText("Dashboard").closest("[data-active]")).not.toBeNull();
    expect(screen.getByText("Inbox")).toBeInTheDocument();
  });
  it("PageHeader renders the title", () => {
    render(<PageHeader title="Applications" description="CS queue" />);
    expect(screen.getByRole("heading", { name: "Applications" })).toBeInTheDocument();
  });
  it("SplitPane renders both panes", () => {
    render(<SplitPane left={<div>L</div>} right={<div>R</div>} />);
    expect(screen.getByText("L")).toBeInTheDocument();
    expect(screen.getByText("R")).toBeInTheDocument();
  });
  it("AppShell renders sidebar + content", () => {
    render(<AppShell sidebar={<div>nav</div>}><div>body</div></AppShell>);
    expect(screen.getByText("nav")).toBeInTheDocument();
    expect(screen.getByText("body")).toBeInTheDocument();
  });
});
