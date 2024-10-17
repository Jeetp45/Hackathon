document.getElementById('focus-here').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const focusTab = tabs[0];
    chrome.runtime.sendMessage(
      { type: 'focusHere', tabId: focusTab.id },
      (response) => {
        console.log(response);
      }
    );
    // if we hav time lets add an alert that explains "stay on this tab or he'll seriously judge you"
  });
});
