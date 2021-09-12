/* global chrome */
chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome extension successfully installed");

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: "linkedin.com", urlContains: "/in/", schemes: ["https"] }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
