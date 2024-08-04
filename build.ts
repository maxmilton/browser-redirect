import { createManifest } from './manifest.config';
import { createRules } from './rules.config';

console.time('prebuild');
await Bun.$`rm -rf dist`;
await Bun.$`cp -r static dist`;
console.timeEnd('prebuild');

console.time('build');
await Bun.write('dist/manifest.json', JSON.stringify(createManifest()));
await Bun.write('dist/rules.json', JSON.stringify(createRules()));
console.timeEnd('build');
