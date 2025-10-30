[![CI status](https://badgen.net/github/checks/maxmilton/browser-redirect?label=ci)](https://github.com/maxmilton/browser-redirect/actions)
[![Licence](https://badgen.net/github/license/maxmilton/browser-redirect)](./LICENSE)

# Browser Redirect ![](./static/icon48.png)

Browser Redirect is a browser extension that redirects top level domains according to predefined rules. It uses the [`declarativeNetRequest` API](https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/), which provides a faster and more secure way to handle redirects than other [alternatives](https://github.com/libredirect/browser_extension), as it cannot read the content of web pages.

The extension comes with a predefined set of static rules that are geared towards privacy friendly alternative frontends. You can customize it to meet your specific needs.

## Default Redirect Rules

> See [rules.config.ts](./rules.config.ts).

The following table shows the default redirect rules included in the extension:

| From                       | To                                      |
| -------------------------- | --------------------------------------- |
| `www.reddit.com`           | `redlib.privacyredirect.com`            |
| `old.reddit.com`           | `redlib.privacyredirect.com`            |
| `www.youtube.com`          | `piped.video`                           |
| `www.youtube-nocookie.com` | `piped.video`                           |
| `m.youtube.com`            | `piped.video`                           |
| `youtu.be`                 | `piped.video/watch?v=`                  |
| `x.com`                    | `nitter.privacyredirect.com`            |
| `twitter.com`              | `nitter.privacyredirect.com`            |
| `imgur.com`                | `rimgo.privacyredirect.com`             |
| `www.quora.com`            | `quetre.privacyredirect.com`            |
| `imdb.com`                 | `libremdb.privacyredirect.com`          |
| `medium.com`               | `scribe.privacyredirect.com`            |
| `*.medium.com`             | `scribe.privacyredirect.com/@*`         |
| `wikipedia.org`            | `wikiless.privacyredirect.com`          |
| `en.wikipedia.org`         | `wikiless.privacyredirect.com`          |
| `stackoverflow.com`        | `anonymousoverflow.privacyredirect.com` |
| `www.pinterest.com`        | `binternet.privacyredirect.com`         |
| `www.goodreads.com`        | `biblioreads.privacyredirect.com`       |
| `translate.google.com`     | `translate.privacyredirect.com`         |
| `www.twitch.tv`            | `safetwitch.privacyredirect.com`        |

## Usage

Follow these steps to use Browser Redirect:

1. Install the [Bun JavaScript runtime](https://bun.sh), if not already installed.
1. Clone the project and edit the `rules.ts` file to add custom redirect rules.
1. Build the project using `bun run build`.
1. Load the extension into your browser:
   1. Navigate to <chrome://extensions/>.
   1. Toggle "Developer mode" to the "on" position.
   1. Click "Load unpacked" and select the `dist` directory.
1. To enable redirecting in private tabs, toggle "Allow in Private" to "on" in the extension's "Details" page.

### Pre-built Package

If you are satisfied with the default rules, you can download `chrome-extension.zip` from the [latest release](https://github.com/maxmilton/browser-redirect/releases/latest). Then follow the instructions above starting from step 4, except instead of the `dist` directory, select the downloaded `zip` file.

### Optional Linting

1. Install the project dependencies: `bun install`
1. Run linting: `bun run lint`

### Debugging Rules

1. Uncomment `declarativeNetRequestFeedback` permissions in manifest.
1. Uncomment `background.service_worker` in manifest.
1. Rebuild the project and reload the extension in your browser.
1. Open devtools for the background page and observe the console for feedback.

## Browser Support

Browser Redirect is compatible with version 84 and higher of Google Chrome and other Chromium-based browsers like Brave and Edge.

## Bugs

Report any bugs you encounter on the [GitHub issue tracker](https://github.com/maxmilton/browser-redirect/issues).

### Known Issues

We are aware of the following issues:

1. User's cannot dynamically add new rules. This is by design, as the extension uses a static rule set to simplify the implementation. You need to edit `rules.config.ts` and rebuild the project to make changes.
1. The extension is not installable via the Chrome Web Store. Build the extension with your own custom rules using the steps outlined above.

## Changelog

See [releases on GitHub](https://github.com/maxmilton/browser-redirect/releases).

## License

MIT license. See [LICENSE](./LICENSE).

The [right arrow curving left icon](https://github.com/twitter/twemoji/blob/master/assets/svg/21aa.svg) is from [twitter/twemoji](https://github.com/twitter/twemoji) which is licensed CC-BY 4.0.

---

© [Max Milton](https://maxmilton.com)
