/* eslint-disable import/no-extraneous-dependencies */

// https://developer.chrome.com/docs/extensions/mv3/manifest/
// https://developer.chrome.com/docs/extensions/reference/

import { gitRef } from 'git-ref';
import pkg from './package.json' assert { type: 'json' };

const manifest: chrome.runtime.Manifest = {
  manifest_version: 3,
  name: 'Browser Redirect',
  description: pkg.description,
  version: pkg.version,
  version_name: process.env.GITHUB_REF ? undefined : gitRef().replace(/^v/, ''),
  minimum_chrome_version: '84', // needed for declarative net request
  homepage_url: pkg.homepage,
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
  permissions: ['declarativeNetRequest', 'declarativeNetRequestFeedback'],
  host_permissions: [
    'https://www.reddit.com/*',
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
    'https://stackoverflow.com/*',
    // 'https://github.com/*',
    // 'https://translate.google.com/*',
  ],
  offline_enabled: true,
  incognito: 'spanning',
};

export default manifest;
