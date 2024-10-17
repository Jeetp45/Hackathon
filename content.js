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

// const button = document.createElement('button');
// button.id = 'button';
// button.innerHTML = 'Focus here';

//when clicking the button, label current tab as the one that causes smiley face, and the rest without
// document.getElementById('focus-here').addEventListener('click', () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const focusTab = tabs[0];
//     chrome.runtime.sendMessage(
//       { type: 'focusHere', tabID: focusTab.id },
//       (response) => {
//         console.log(response);
//       }
//     );
//     // if we hav time lets add an alert that explains "stay on this time or he'll seriously judge you"
//   });
// });

//receive the isFocused flag message from the background
//update the smiley display accordingly
