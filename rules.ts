// https://developer.chrome.com/docs/extensions/reference/declarativeNetRequest/

const REDIRECT =
  'redirect' as chrome.declarativeNetRequest.RuleActionType.REDIRECT;
const MAIN_FRAME =
  'main_frame' as chrome.declarativeNetRequest.ResourceType.MAIN_FRAME;

const rules: chrome.declarativeNetRequest.Rule[] = [
  {
    id: 1,
    priority: 1,
    action: {
      type: REDIRECT,
      redirect: {
        transform: { host: 'teddit.net' },
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
      resourceTypes: [MAIN_FRAME],
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
      urlFilter: '||m.youtube.com',
      resourceTypes: [MAIN_FRAME],
    },
  },
  {
    id: 4,
    priority: 1,
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
];

export default rules;
