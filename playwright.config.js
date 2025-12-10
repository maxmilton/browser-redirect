import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "test/e2e",
  testMatch: "test/e2e/**/*.spec.ts",
  failOnFlakyTests: !!process.env.CI,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    acceptDownloads: false,
    contextOptions: { strictSelectors: true },
    locale: "en-US",
    offline: true, // no external network requests necessary
    timezoneId: "UTC",
    trace: "on-first-retry",
  },
});
