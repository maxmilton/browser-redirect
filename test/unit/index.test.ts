import { describe, expect, test } from "bun:test";
import { readdir } from "node:fs/promises";

describe("dist files", () => {
  // FIXME: The bun file type is just inferred from the file extension, not the
  // underlying file data... so that part of this test is not very useful.

  // XXX: Files with unknown type (e.g., symlinks) fall back to the default
  // "application/octet-stream". Bun.file() does not resolve symlinks so it's
  // safe to infer that all these files are therefore regular files.
  const distFiles: [filename: string, type: string, minBytes?: number, maxBytes?: number][] = [
    ["icon16.png", "image/png", 200, 250],
    ["icon48.png", "image/png", 350, 450],
    ["icon128.png", "image/png", 650, 800],
    ["manifest.json", "application/json;charset=utf-8", 900, 1200],
    ["rules.json", "application/json;charset=utf-8", 2000, 6000],
    // ['sw.js', 'text/javascript;charset=utf-8'], // debugging builds only
  ];

  for (const [filename, type, minBytes, maxBytes] of distFiles) {
    describe(filename, () => {
      const file = Bun.file(`dist/${filename}`);

      test("exists with correct type", () => {
        expect.assertions(3);
        expect(file.exists()).resolves.toBeTruthy();
        expect(file.size).toBeGreaterThan(0);
        expect(file.type).toBe(type); // TODO: Keep this? Type seems to be resolved from the file extension, not the file data.
      });

      if (minBytes != null && maxBytes != null) {
        test("is within expected file size limits", () => {
          expect.assertions(2);
          expect(file.size).toBeGreaterThan(minBytes);
          expect(file.size).toBeLessThan(maxBytes);
        });
      }
    });
  }

  test("contains no extra files", async () => {
    expect.assertions(1);
    const files = await readdir("dist");
    // HACK: Remove _metadata directory created by browsers on extension install.
    const metadataIndex = files.indexOf("_metadata");
    if (metadataIndex !== -1) files.splice(metadataIndex, 1);
    expect(files).toHaveLength(distFiles.length);
  });
});
