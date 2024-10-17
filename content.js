if (!window.hasJudgmentScript) {
  window.hasJudgmentScript = true;

  let smiley = null;

  function judgment(image) {
    if (smiley === null) {
      smiley = document.createElement('img');
      smiley.style.position = 'fixed';
      smiley.style.width = '150px';
      smiley.style.height = '150px';
      smiley.style.zIndex = '2147483647';
      smiley.style.bottom = '5px';
      smiley.style.right = '5px';
      document.body.appendChild(smiley);
    }
    smiley.src = chrome.runtime.getURL(image);
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'judgeUser') {
      if (message.isFocused) {
        judgment('smile.png');
      } else {
        judgment('angry.png');
      }
    }
  });
}
