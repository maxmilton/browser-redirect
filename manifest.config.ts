// https://developer.chrome.com/docs/extensions/mv3/manifest/
// https://developer.chrome.com/docs/extensions/reference/

import pkg from './package.json' assert { type: 'json' };

function gitRef() {
  return Bun.spawnSync([
    'git',
    'describe',
    '--always',
    '--dirty=-dev',
    '--broken',
  ])
    .stdout.toString()
    .trim()
    .replace(/^v/, '');
}

export const createManifest = (
  debug = !process.env.CI,
): chrome.runtime.ManifestV3 => ({
  manifest_version: 3,
  name: 'Browser Redirect',
  description: pkg.description,
  homepage_url: pkg.homepage,
  version: pkg.version,
  // shippable releases should not have a named version
  version_name: debug ? gitRef() : undefined,
  minimum_chrome_version: '84', // for declarative net request
  icons: {
    16: 'icon16.png',
    48: 'icon48.png',
    128: 'icon128.png',
  },
  declarative_net_request: {
    rule_resources: [
      {
        id: 'rules',
        enabled: true,
        path: 'rules.json',
      },
    ],
  },
  permissions: [
    'declarativeNetRequest', // https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/
    'declarativeNetRequestFeedback',
  ],
  host_permissions: [
    'https://www.reddit.com/*',
    'https://old.reddit.com/*',
    'https://www.youtube.com/*',
    'https://www.youtube-nocookie.com/*',
    'https://m.youtube.com/*',
    'https://youtu.be/*',
    'https://twitter.com/*',
    'https://imgur.com/*',
    'https://www.quora.com/*',
    'https://imdb.com/*',
    'https://medium.com/*',
    'https://*.medium.com/*',
    'https://wikipedia.org/*',
    'https://en.wikipedia.org/*',
    'https://stackoverflow.com/*',
    // 'https://github.com/*',
    // 'https://translate.google.com/*',
  ],
  offline_enabled: true,
  incognito: 'spanning',
});
