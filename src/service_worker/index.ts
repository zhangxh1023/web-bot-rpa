chrome.action.onClicked.addListener(async () => {
  await chrome.windows.create({
    url: chrome.runtime.getURL('./popup/index.html'),
    type: 'popup',
    width: 850,
    height: 775,
  });
});
