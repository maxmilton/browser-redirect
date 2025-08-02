// NOTE: Uncomment lines in build.ts and src/manifest.ts for debugging.

/* eslint-disable no-console */

chrome.action.onClicked.addListener((tab) => {
  chrome.declarativeNetRequest.getMatchedRules({ tabId: tab.id }, (details) => {
    console.log("Tab:", tab);
    console.log("Matched rules:", details.rulesMatchedInfo);
  });
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((event) => {
  console.log("Rule id:", event.rule.ruleId);
  console.log("Request:", event.request);
});
