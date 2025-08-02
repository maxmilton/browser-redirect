import "@maxmilton/test-utils/extend";

const noop = () => {};

function setupMocks(): void {
  // @ts-expect-error - noop stub
  globalThis.performance.mark = noop;
  // @ts-expect-error - noop stub
  globalThis.performance.measure = noop;
}

setupMocks();
