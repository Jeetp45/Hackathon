let focusTabId = null;

function injectContentScript(tabId) {
  return chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js'],
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'focusHere') {
    focusTabId = message.tabId;
    injectContentScript(focusTabId).then(() => {
      chrome.tabs.sendMessage(focusTabId, {
        type: 'judgeUser',
        isFocused: true,
      });
      sendResponse({ status: 'Successfully set focus tab' });
    });
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  changeSmiley(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    changeSmiley(tabId);
  }
});

function changeSmiley(activeTabId) {
  if (focusTabId === null) return;
  injectContentScript(activeTabId).then(() => {
    const isFocused = activeTabId === focusTabId;
    chrome.tabs.sendMessage(activeTabId, { type: 'judgeUser', isFocused });
  });
}
