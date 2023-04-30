[![Build status](https://img.shields.io/github/actions/workflow/status/maxmilton/browser-redirect/ci.yml?branch=master)](https://github.com/maxmilton/browser-redirect/actions)
[![Licence](https://img.shields.io/github/license/maxmilton/browser-redirect.svg)](https://github.com/maxmilton/browser-redirect/blob/master/LICENSE)

# Browser Redirect ![](./static/icon48.png)

Browser Redirect is a simple, yet powerful browser extension that makes it easy to automatically redirect your web traffic according to your preferred rules. Built with a predefined set of static rules for a simple and strightforward experience.

## Default redirect rules

| From              | To            |
| ----------------- | ------------- |
| `www.reddit.com`  | `teddit.net`  |
| `www.youtube.com` | `piped.video` |
| `m.youtube.com`   | `piped.video` |

## Usage

To use Browser Redirect, follow these easy steps:

1. Install the bun JavaScript runtime, if not already installed, by following the instructions at <https://bun.sh>.
1. Clone the project locally and edit the `rules.ts` file to add your own custom redirect rules.
1. Build the project using `bun run build`.
1. Load the extension into your browser by following these steps:
   1. Navigate to <chrome://extensions/>.
   1. Toggle "Developer mode" to the on position.
   1. Click "Load unpacked" and select the dist directory.
1. Optionally, to also redirect in private tabs, go into the extension's "Details" and toggle "Allow in Private" to on

### Optional linting

1. Install the project dependencies: `bun install`
1. Run linting: `bun run lint`

## Browser support

Browser Redirect is compatible with version 84 and higher of Google Chrome and other Chromium-based browsers like Brave and Edge.

## Bugs

Report any bugs you encounter on the [GitHub issue tracker](https://github.com/maxmilton/browser-redirect/issues).

### Known issues

We are aware of the following issues:

1. User's cannot add new rules. This is by design, as the extension uses a static rule set to simplify the implementation.
1. The extension is not installable via the Chrome Web Store. We recommend building the extension with your own custom rules using the steps outlined above.

## Changelog

See [releases on GitHub](https://github.com/maxmilton/browser-redirect/releases).

## License

MIT license. See [LICENSE](https://github.com/maxmilton/browser-redirect/blob/master/LICENSE).

The [right arrow icon](https://github.com/twitter/twemoji/blob/master/assets/svg/27a1.svg) is from [twitter/twemoji](https://github.com/twitter/twemoji) which is licensed CC-BY 4.0.

---

© 2023 [Max Milton](https://maxmilton.com)
