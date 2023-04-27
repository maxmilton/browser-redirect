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
];

export default rules;
