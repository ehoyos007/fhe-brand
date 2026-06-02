import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
  Skeleton,
  Spinner,
  Switch,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./index";

describe("Breadcrumb", () => {
  it("renders trail with a current page", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/cs">CS</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Applications</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole("link", { name: "CS" })).toBeInTheDocument();
    expect(screen.getByText("Applications")).toHaveAttribute("aria-current", "page");
  });
});

describe("Pagination", () => {
  it("marks the current page and fires onPageChange", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} pageCount={5} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: "2" })).toHaveAttribute("aria-current", "page");
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("renders nothing for a single page", () => {
    const { container } = render(<Pagination page={1} pageCount={1} onPageChange={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("Skeleton + Spinner", () => {
  it("Skeleton pulses", () => {
    const { container } = render(<Skeleton className="h-4 w-20" />);
    expect(container.firstChild).toHaveClass("animate-pulse");
  });
  it("Spinner has a status role + label", () => {
    render(<Spinner label="Loading leads" />);
    expect(screen.getByRole("status", { name: "Loading leads" })).toBeInTheDocument();
  });
});

describe("Form controls", () => {
  it("Switch renders a switch role", () => {
    render(<Switch aria-label="notify" />);
    expect(screen.getByRole("switch", { name: "notify" })).toBeInTheDocument();
  });
  it("Checkbox renders a checkbox role", () => {
    render(<Checkbox aria-label="agree" />);
    expect(screen.getByRole("checkbox", { name: "agree" })).toBeInTheDocument();
  });
  it("RadioGroup renders radios", () => {
    render(
      <RadioGroup aria-label="plan">
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>,
    );
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });
});

describe("Tabs", () => {
  it("shows the active tab's content only", () => {
    render(
      <Tabs defaultValue="one">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText("Panel one")).toBeInTheDocument();
    expect(screen.queryByText("Panel two")).not.toBeInTheDocument();
  });
});

describe("Accordion", () => {
  it("renders a collapsed trigger", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Body A</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByRole("button", { name: "Section A" })).toHaveAttribute("aria-expanded", "false");
  });
});

describe("Overlays (triggers render closed)", () => {
  it("Tooltip trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });
  it("Dialog trigger (content portaled until open)", () => {
    render(
      <Dialog>
        <DialogTrigger>Open dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole("button", { name: "Open dialog" })).toBeInTheDocument();
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
  });
  it("DropdownMenu trigger", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });
  it("Popover trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Body</PopoverContent>
      </Popover>,
    );
    expect(screen.getByText("Open popover")).toBeInTheDocument();
  });
});
