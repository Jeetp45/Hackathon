let focusTabId = null;
let isFocused = true;

function injectContentScript(tabId) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js'],
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'focusHere') {
    focusTabId = message.tabId;
    injectContentScript(focusTabId);
    sendResponse({ status: 'Successfully set focus tab' });
    /////////////////we might need an else statement to account for when we have not yet received the message
    //} else if (message.type  ) {}
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  //this is how you listen for being on the focus tab
  changeSmiley(activeInfo.tabId);
});

function changeSmiley(activeTabId) {
  if (focusTabId !== null) {
    isFocused = activeTabId === focusTabId; //////*******i think its ok to put this variable inside of a conditional but check here if we need to debug
    chrome.tabs.sendMessage(
      focusTabId,
      { type: 'judgeUser', isFocused },
      (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            'Error sending message to content script:',
            chrome.runtime.lastError
          );
          // Optionally re-inject the content script if needed
          injectContentScript(focusTabId);
        }
      }
    );
    //send a message back to the main how to update the smiley based on waht the background knows
  }
}

//   chrome.tabs.sendMessage(focusTabId, { type: 'judgeUser', isFocused }).catch((error) => {
//     console.error('Error sending message to content script:', error);
//     injectContentScript(focusTabId);
//   });

// function injectContentScript(tabId) {
//   chrome.scripting.executeScript({
//     target: { tabId: tabId },
//     files: ['content.js'],
//   });
// }
