// https://playwright.dev/docs/chrome-extensions

/* eslint-disable no-empty-pattern */

import path from "node:path";
import { type BrowserContext, test as base, chromium } from "@playwright/test";

const dist = path.join(import.meta.dirname, "../../dist");

export const test = base.extend<object, { extension: BrowserContext }>({
  extension: [
    // biome-ignore lint/correctness/noEmptyPattern: playwright setup
    async ({}, use) => {
      const context = await chromium.launchPersistentContext("", {
        channel: "chromium",
        args: [`--disable-extensions-except=${dist}`, `--load-extension=${dist}`],
        acceptDownloads: false,
        locale: "en-US",
        offline: true, // no external network requests necessary
        strictSelectors: true,
        timezoneId: "UTC",
      });

      // Mock all requests as 200 OK; we're only checking URL redirects
      await context.route(/.*/, (route) => route.fulfill());

      await use(context);
      await context.close();
    },
    { scope: "worker" },
  ],

  async page({ extension }, use) {
    const page = await extension.newPage();
    await use(page);
    await page.close();
  },
});

export const { expect } = test;
