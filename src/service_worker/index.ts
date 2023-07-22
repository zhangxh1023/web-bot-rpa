chrome.action.onClicked.addListener(async () => {
  await chrome.windows.create({
    url: chrome.runtime.getURL('./popup/index.html'),
    type: 'popup',
    width: 850,
    height: 775,
  });
});

const getCurrentTab = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tabs && tabs.length > 0) {
    return tabs[0];
  }
  return null;
};

// background.js

// 监听来自content_script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getTabInfo') {
    getCurrentTab().then((tab) => {
      console.log('current tabs:', tab);
    });
  }
  sendResponse();
  // 必须在异步请求结束前返回true，以确保sendResponse有效
  return true;
});
