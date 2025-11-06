import { expect, test } from "bun:test";
import dist from "../../dist/rules.json" with { type: "json" };
import { createRules } from "../../src/rules.ts";

const rules = createRules();

test("is an array of objects", () => {
  expect.hasAssertions();
  expect(rules).toBeArray();
  expect(rules.length).toBeGreaterThanOrEqual(1);
  for (const rule of rules) {
    expect(rule).toBeObject();
  }
});

test("is valid JSON", () => {
  expect.assertions(1);
  // eslint-disable-next-line unicorn/prefer-structured-clone
  expect(JSON.parse(JSON.stringify(rules))).toEqual(rules);
});

test("is equal to dist/rules.json", () => {
  expect.assertions(1);
  expect(rules).toEqual(dist as []);
});

test("has sequential ids", () => {
  expect.hasAssertions();
  for (const [i, rule] of rules.entries()) {
    expect(rule.id).toBe(i + 1);
  }
});
