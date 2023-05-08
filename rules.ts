// https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/
// https://github.com/libredirect/browser_extension/blob/master/src/config.json

const REDIRECT =
  'redirect' as chrome.declarativeNetRequest.RuleActionType.REDIRECT;
const MAIN_FRAME =
  'main_frame' as chrome.declarativeNetRequest.ResourceType.MAIN_FRAME;
const SUB_FRAME =
  'sub_frame' as chrome.declarativeNetRequest.ResourceType.SUB_FRAME;

const rules: chrome.declarativeNetRequest.Rule[] = [
  {
    id: 1,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        // transform: { host: 'teddit.net' },
        transform: { host: 'libreddit.pufe.org' },
      },
    },
    condition: {
      urlFilter: '||www.reddit.com',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 2,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'piped.video' },
      },
    },
    condition: {
      urlFilter: '||www.youtube.com',
      resourceTypes: [MAIN_FRAME, SUB_FRAME],
    },
  },
  {
    id: 3,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'piped.video' },
      },
    },
    condition: {
      urlFilter: '||www.youtube-nocookie.com',
      resourceTypes: [MAIN_FRAME, SUB_FRAME],
    },
  },
  {
    id: 4,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'piped.video' },
      },
    },
    condition: {
      urlFilter: '||m.youtube.com',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 5,
    priority: 2,
    action: {
      type: REDIRECT,
      redirect: {
        regexSubstitution: 'https://piped.video/watch?v=',
      },
    },
    condition: {
      regexFilter: '^https://youtu\\.be/',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 6,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        // transform: { host: 'nitter.net' },
        transform: { host: 'nitter.pufe.org' },
      },
    },
    condition: {
      urlFilter: '||twitter.com',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 7,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'rimgo.bcow.xyz' },
      },
    },
    condition: {
      urlFilter: '||imgur.com',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 8,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        // transform: { host: 'quetre.iket.me' },
        transform: { host: 'quetre.pufe.org' },
      },
    },
    condition: {
      urlFilter: '||www.quora.com',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 9,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'libremdb.iket.me' },
      },
    },
    condition: {
      urlFilter: '||imdb.com',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 10,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'scribe.rip' },
      },
    },
    condition: {
      urlFilter: '||medium.com',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 11,
    priority: 2,
    action: {
      type: REDIRECT,
      redirect: {
        regexSubstitution: 'https://scribe.rip/@\\1/',
      },
    },
    condition: {
      regexFilter: '^https://(\\w+)\\.medium\\.com/',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 12,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'wikiless.pufe.org' },
      },
    },
    condition: {
      urlFilter: '||wikipedia.org',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 13,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'wikiless.pufe.org' },
      },
    },
    condition: {
      urlFilter: '||en.wikipedia.org',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 14,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'code.whatever.social' },
      },
    },
    condition: {
      urlFilter: '||stackoverflow.com',
      resourceTypes: [MAIN_FRAME],
    },
  },
];

export default rules;
