import manifest from './manifest.config';
import rules from './rules';

await Bun.write('dist/manifest.json', JSON.stringify(manifest));
await Bun.write('dist/rules.json', JSON.stringify(rules));
