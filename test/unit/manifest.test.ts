import { expect, test } from 'bun:test';
import dist from '../../dist/manifest.json' with { type: 'json' };
import { createManifest } from '../../src/manifest.ts';

const manifest = createManifest(true);

test('is an object', () => {
  expect.assertions(1);
  expect(manifest).toBePlainObject();
});

test('is valid JSON', () => {
  expect.assertions(1);
  // eslint-disable-next-line unicorn/prefer-structured-clone
  expect(JSON.parse(JSON.stringify(manifest))).toEqual(manifest);
});

test('is equal to dist/manifest.json (excluding version_name)', () => {
  expect.assertions(1);
  const { version_name: vn1, ...restSrc } = manifest;
  const { version_name: vn2, ...restDist } = dist as ReturnType<typeof createManifest>;
  expect(restSrc).toEqual(restDist);
});

test('contains expected properties', () => {
  expect.assertions(17);
  expect(manifest).toHaveProperty('manifest_version');
  expect(manifest).toHaveProperty('name');
  expect(manifest).toHaveProperty('description');
  expect(manifest).toHaveProperty('homepage_url');
  expect(manifest).toHaveProperty('version');
  expect(manifest).toHaveProperty('version_name');
  expect(manifest).toHaveProperty('minimum_chrome_version');
  expect(manifest).toHaveProperty('icons');
  expect(manifest).toHaveProperty(['icons', '16']);
  expect(manifest).toHaveProperty(['icons', '48']);
  expect(manifest).toHaveProperty(['icons', '128']);
  expect(manifest).toHaveProperty('declarative_net_request');
  expect(manifest).toHaveProperty(['declarative_net_request', 'rule_resources']);
  expect(manifest).toHaveProperty('permissions');
  expect(manifest).toHaveProperty('host_permissions');
  expect(manifest).toHaveProperty('offline_enabled');
  expect(manifest).toHaveProperty('incognito');
  // expect(manifest).toHaveProperty('key');
});

test('properties are the correct type', () => {
  expect.assertions(17);
  expect(manifest.manifest_version).toBeNumber();
  expect(manifest.name).toBeString();
  expect(manifest.description).toBeString();
  expect(manifest.homepage_url).toBeString();
  expect(manifest.version).toBeString();
  expect(manifest.version_name).toBeString();
  expect(manifest.minimum_chrome_version).toBeString();
  expect(manifest.icons).toBePlainObject();
  expect(manifest.icons?.[16]).toBeString();
  expect(manifest.icons?.[48]).toBeString();
  expect(manifest.icons?.[128]).toBeString();
  expect(manifest.declarative_net_request).toBePlainObject();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  expect(manifest.declarative_net_request?.rule_resources).toBeArray();
  expect(manifest.permissions).toBeArray();
  expect(manifest.host_permissions).toBeArray();
  expect(manifest.offline_enabled).toBeBoolean();
  expect(manifest.incognito).toBeString();
  // expect(manifest.key).toBeString();
});

test('does not contain any unexpected properties', () => {
  expect.assertions(14);
  const expectedProperties = [
    'manifest_version',
    'name',
    'description',
    'homepage_url',
    'version',
    'version_name',
    'minimum_chrome_version',
    'icons',
    'declarative_net_request',
    'permissions',
    'host_permissions',
    'offline_enabled',
    'incognito',
    // 'key',
  ];
  // eslint-disable-next-line guard-for-in
  for (const property in manifest) {
    expect(expectedProperties).toContain(property);
  }
  expect(Object.keys(manifest)).toHaveLength(expectedProperties.length);
});

// test('does not contain any properties for development/debugging', () => {
//   expect.assertions(1);
//   expect(manifest.options_ui?.open_in_tab).toBeUndefined();
// });

test('manifest version is v3', () => {
  expect.assertions(1);
  expect(manifest.manifest_version).toBe(3);
});

test('permissions contains expected values', () => {
  expect.assertions(2);
  expect(manifest.permissions).toContain('declarativeNetRequest');
  // expect(manifest.permissions).toContain('declarativeNetRequestFeedback'); // debugging builds only
  expect(manifest.permissions).toHaveLength(1);
});

test('has correct icons.* values', () => {
  expect.assertions(4);
  expect(manifest.icons?.[16]).toBe('icon16.png');
  expect(manifest.icons?.[48]).toBe('icon48.png');
  expect(manifest.icons?.[128]).toBe('icon128.png');
  expect(Object.keys(manifest.icons!)).toHaveLength(3);
});

// test('has correct service_worker value', () => {
//   expect.assertions(1);
//   expect(manifest.background?.service_worker).toBe('sw.js'); // debugging builds only
// });

test('has version_name when debug option is true', () => {
  expect.assertions(1);
  const manifest2 = createManifest(true);
  expect(manifest2.version_name).toBeDefined();
});

test('does not have version_name when when debug option is false', () => {
  expect.assertions(1);
  const manifest2 = createManifest(false);
  expect(manifest2.version_name).toBeUndefined();
});

// HACK: Mutating env vars that were set before the process started doesn't
// work in bun, so we skip tests which rely on the CI env var _not_ being set.
test.skipIf(!!process.env.CI)('has version_name when CI env var is not set', () => {
  expect.assertions(1);
  const manifest2 = createManifest();
  expect(manifest2.version_name).toBeDefined();
});

const oldCI = process.env.CI;
const restoreCI = () => {
  if (oldCI === undefined) {
    // TODO: Consider setting to undefined instead. Delete does not currently
    // work in bun for env vars that were set before the process started.
    //  ↳ https://github.com/oven-sh/bun/issues/1559#issuecomment-1440507885
    //  ↳ May be fixed, need to investigate; https://github.com/oven-sh/bun/pull/7614
    delete process.env.CI;
  } else {
    process.env.CI = oldCI;
  }
};

test('does not have version_name when env var CI=true', () => {
  expect.assertions(1);
  process.env.CI = 'true';
  const manifest2 = createManifest();
  expect(manifest2.version_name).toBeUndefined();
  restoreCI();
});
