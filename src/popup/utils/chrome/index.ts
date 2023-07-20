import { useWorkflowStore } from '../../stores/workflow';
import { Action } from '../../../common/action';
import type { Message } from '../../../common/message';

export const listenContent = () => {
  const chromeMessageHandle = (message: Message<string>,
    sender: chrome.runtime.MessageSender,
    sendResponse: () => void) => {

    if (message.action === Action.SELECT_NODE_DONE) {
      const workflowStore = useWorkflowStore();
      workflowStore.selectDone(message.data);
    }

    console.log('message', message);
    console.log('sender', sender);
    sendResponse();
    return true;
  };

  try {
    chrome.runtime.onMessage.addListener(chromeMessageHandle);
  } catch (error) {
    console.log(error);
  }
};

export const startSelectDOM = async (index: number) => {
  const allWindows = await chrome.windows.getAll();
  console.log(allWindows);
  for (const window of allWindows) {
    if (window.type === 'popup') continue;
    let allTabs;
    try {
      allTabs = await chrome.tabs.query({ windowId: window.id });
    } catch (error) {
      console.log(error);
    }
    console.log(allTabs);
    if (!allTabs) continue;
    for (const tab of allTabs) {
      const { id } = tab;
      if (id) {
        try {
          await chrome.tabs.sendMessage(id, { action: Action.START_SELECT_NODE });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  const workflowStore = useWorkflowStore();
  console.log(`select dom: ${index}`);
  workflowStore.startSelectDOM(index);
};

export const getAllTabs = async () => {
  const ret = [] as chrome.tabs.Tab[];
  let allWindows;
  try {
    allWindows = await chrome.windows.getAll();
  } catch (error) {
    console.log(error);
  }
  console.log(allWindows);
  if (!allWindows) return ret;
  for (const window of allWindows) {
    if (window.type === 'popup') continue;
    let tabs;
    try {
      tabs = await chrome.tabs.query({ windowId: window.id });
    } catch (error) {
      console.log(error);
    }
    console.log(tabs);
    if (!tabs) continue;
    ret.push(...tabs);
  }
  return ret;
};

export const startExecWorkflow = async (startPage: string) => {
  const window = await chrome.windows.create({
    url: startPage,
    type: 'normal',
    width: 800,
    height: 600
  });
  if (window && window.tabs) {
    console.log(window);
    for (const tab of window.tabs) {
      const { id } = tab;
      if (id) {
        try {
          const workflowStore = useWorkflowStore();
          chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
            if (tabId === id && changeInfo.status === 'complete') {
              await chrome.tabs.sendMessage(id, { action: Action.START_EXEC_WORKFLOW, data: workflowStore.getWorkflow() });
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
