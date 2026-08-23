import { describe, expect, test } from "bun:test";
import pkg from "../../package.json" with { type: "json" };

describe("dist files", () => {
  // TODO: Remove the file MIME type checks? Bun inferrs it from the file
  // extension, not the actual file data, so the usefulness is questionable.

  // NOTE: Files of unknown type (e.g., symlinks) fall back to the default
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

  describe.each(distFiles)("%s", (filename, type, minBytes, maxBytes) => {
    const file = Bun.file(`dist/${filename}`);

    test("exists with correct MIME type", () => {
      expect.assertions(3);
      expect(file.exists()).resolves.toBeTrue();
      expect(file.size).toBeGreaterThan(0);
      expect(file.type).toBe(type);
    });

    if (typeof minBytes === "number" && typeof maxBytes === "number") {
      test("is within expected file size limits", () => {
        expect.assertions(2);
        expect(file.size).toBeGreaterThan(minBytes);
        expect(file.size).toBeLessThan(maxBytes);
      });
    }
  });

  test("contains no unexpected files", () => {
    expect.assertions(1);
    const expectedFiles = new Set(distFiles.map(([filename]) => filename));
    const actualFiles = new Set(new Bun.Glob("**").scanSync({ cwd: "dist" }));
    expect(actualFiles.difference(expectedFiles)).toBeEmpty();
  });
});

describe("package.json", () => {
  const file = Bun.file("package.json");

  test("exists with correct MIME type", () => {
    expect.assertions(2);
    expect(file.exists()).resolves.toBeTrue();
    expect(file.type).toBe("application/json;charset=utf-8");
  });

  test("contains valid JSON", async () => {
    expect.assertions(1);
    const text = await file.text();
    expect(JSON.parse(text)).toBePlainObject();
  });

  test("contains properties used in manifest", () => {
    expect.assertions(6);
    expect(pkg).toHaveProperty("description", expect.any(String));
    expect(pkg).toHaveProperty("version", expect.any(String));
    expect(pkg).toHaveProperty("homepage", expect.any(String));
    expect(pkg.description.length).toBeGreaterThan(0);
    expect(pkg.version.length).toBeGreaterThan(0);
    expect(pkg.homepage.length).toBeGreaterThan(0);
  });
});
