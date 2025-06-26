/* eslint-disable no-console */

import { createManifest } from './src/manifest.ts';
import { createRules } from './src/rules.ts';

console.time('prebuild');
await Bun.$`rm -rf dist`;
await Bun.$`cp -r static dist`;
console.timeEnd('prebuild');

console.time('build');
await Bun.write('dist/manifest.json', JSON.stringify(createManifest()));
await Bun.write('dist/rules.json', JSON.stringify(createRules()));
// await Bun.build({ entrypoints: ['src/sw.ts'], outdir: 'dist', minify: true }); uncomment for debugging
console.timeEnd('build');
