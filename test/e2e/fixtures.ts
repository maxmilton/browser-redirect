// https://playwright.dev/docs/chrome-extensions

/* eslint-disable no-empty-pattern */

import path from "node:path";
import { type BrowserContext, test as base, chromium } from "@playwright/test";

export const test = base.extend<{ context: BrowserContext }>({
  // biome-ignore lint/correctness/noEmptyPattern: playwright setup
  async context({}, use) {
    const dist = path.join(import.meta.dirname, "../../dist");
    const context = await chromium.launchPersistentContext("", {
      channel: "chromium",
      args: [`--disable-extensions-except=${dist}`, `--load-extension=${dist}`],
    });
    await use(context);
    await context.close();
  },
});

export const { expect } = test;
