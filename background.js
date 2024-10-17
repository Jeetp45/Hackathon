let focusTabId = null;
//let isFocused = true; ///???

function injectContentScript(tabId) {
  return chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js'],
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'focusHere') {
    focusTabId = message.tabId;
    injectContentScript(focusTabId);
    sendResponse({ status: 'Successfully set focus tab' });
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  //this is how you listen for being on the focus tab
  changeSmiley(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    changeSmiley(tabId);
  }
});

// Function to handle tab activation and send appropriate messages
function changeSmiley(activeTabId) {
  if (focusTabId === null) return; // No focus tab set

  // Inject content script into the activated tab
  injectContentScript(activeTabId).then(() => {
    // Determine if the activated tab is the focus tab
    const isFocused = activeTabId === focusTabId;

    // Send a message to the activated tab to display smiley or angry face
    chrome.tabs.sendMessage(
      activeTabId,
      { type: 'judgeUser', isFocused },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            'Error sending message to content script:',
            chrome.runtime.lastError
          );
          // Optionally, you can attempt to re-inject the content script and resend the message
        } else {
          console.log(
            `Sent message to tab ${activeTabId}: isFocused = ${isFocused}`
          );
        }
      }
    );
  });
}
