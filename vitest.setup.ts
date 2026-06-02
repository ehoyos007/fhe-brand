import "@testing-library/jest-dom/vitest";

// jsdom lacks ResizeObserver, which cmdk (and some Radix components) require.
// Stub it so component tests can mount in the test environment.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (!("ResizeObserver" in globalThis)) {
  (globalThis as unknown as { ResizeObserver: typeof ResizeObserverStub }).ResizeObserver =
    ResizeObserverStub;
}

// jsdom doesn't implement scrollIntoView (cmdk calls it on the active item).
if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function scrollIntoView() {};
}
