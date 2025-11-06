// https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/
// https://github.com/libredirect/browser_extension/blob/master/src/config.json

const REDIRECT = "redirect" as chrome.declarativeNetRequest.RuleActionType.REDIRECT;
const MAIN_FRAME = "main_frame" as chrome.declarativeNetRequest.ResourceType.MAIN_FRAME;
const SUB_FRAME = "sub_frame" as chrome.declarativeNetRequest.ResourceType.SUB_FRAME;
const IMAGE = "image" as chrome.declarativeNetRequest.ResourceType.IMAGE;

export const createRules = (): chrome.declarativeNetRequest.Rule[] => [
  {
    id: 1,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "redlib.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||www.reddit.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 2,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "redlib.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||old.reddit.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 3,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "piped.video" },
      },
    },
    condition: {
      urlFilter: "||www.youtube.com",
      resourceTypes: [MAIN_FRAME, SUB_FRAME],
    },
  },
  {
    id: 4,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "piped.video" },
      },
    },
    condition: {
      urlFilter: "||www.youtube-nocookie.com",
      resourceTypes: [MAIN_FRAME, SUB_FRAME],
    },
  },
  {
    id: 5,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "piped.video" },
      },
    },
    condition: {
      urlFilter: "||m.youtube.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 6,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        regexSubstitution: "https://piped.video/watch?v=",
      },
    },
    condition: {
      regexFilter: String.raw`^https://youtu\.be/`,
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 7,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "nitter.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||x.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 8,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "nitter.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||twitter.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 9,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "rimgo.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||imgur.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 10,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "rimgo.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||i.imgur.com",
      resourceTypes: [MAIN_FRAME, IMAGE],
    },
  },
  {
    id: 11,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "quetre.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||www.quora.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 12,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "libremdb.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||www.imdb.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 13,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "scribe.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||medium.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 14,
    priority: 2,
    action: {
      type: REDIRECT,
      redirect: {
        regexSubstitution: String.raw`https://scribe.privacyredirect.com/@\1/`,
      },
    },
    condition: {
      regexFilter: String.raw`^https://(\w+)\.medium\.com/`,
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 15,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "wikiless.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||wikipedia.org",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 16,
    priority: 2, // higher than rule that matches non-"en" lang subdomain
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "wikiless.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||en.wikipedia.org",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 17,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        regexSubstitution: String.raw`https://wikiless.privacyredirect.com/\2?lang=\1\3`,
      },
    },
    condition: {
      regexFilter: String.raw`^https://(\w+)\.wikipedia\.org/([^#]*)(#.*)?$`,
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 18,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "anonymousoverflow.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||stackoverflow.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 19,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "binternet.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||www.pinterest.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 20,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        regexSubstitution: String.raw`https://binternet.privacyredirect.com/image_proxy.php?url=\0`,
      },
    },
    condition: {
      regexFilter: String.raw`^https://i\.pinimg\.com/`,
      resourceTypes: [MAIN_FRAME, IMAGE],
    },
  },
  {
    id: 21,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "biblioreads.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||www.goodreads.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 22,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "translate.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||translate.google.com",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 23,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "safetwitch.privacyredirect.com" },
      },
    },
    condition: {
      urlFilter: "||www.twitch.tv",
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 24,
    priority: 2, // higher than fallback
    action: {
      type: REDIRECT,
      redirect: {
        regexSubstitution: String.raw`https://safetwitch.privacyredirect.com/\1`,
      },
    },
    condition: {
      regexFilter: String.raw`^https://player\.twitch\.tv/\?(.+?)&.*$`,
      resourceTypes: [MAIN_FRAME, SUB_FRAME],
    },
  },
  {
    id: 25,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: "safetwitch.privacyredirect.com" },
      },
    },
    condition: {
      // Simple fallback when regex match fails
      urlFilter: "||player.twitch.tv",
      resourceTypes: [MAIN_FRAME, SUB_FRAME],
    },
  },
];
