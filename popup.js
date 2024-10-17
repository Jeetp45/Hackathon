document.getElementById('focus-here').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const focusTab = tabs[0];
    chrome.runtime.sendMessage(
      { type: 'focusHere', tabId: focusTab.id },
      (response) => {
        console.log(response);
        // chrome.notifications.create(
        //   'focusNotification',
        //   {
        //     type: 'basic',
        //     iconUrl: chrome.runtime.getURL('smile.png'), // Ensure correct path
        //     title: 'Focus Set',
        //     message: 'Okay, focus on this tab or I will seriously judge you!',
        //     priority: 2,
        //   },
        //   () => {
        window.close();
      }
    );
  });
});
