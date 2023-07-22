import { useWorkflowStore } from '../../../stores/workflow';
import { Action } from '../../../../common/action';
import type { reqMessage, respMessage } from '../../../../common/message';
import type { RuntimeInterface } from '../runtimeInterface';
import type { Workflow } from '../../workflow/workflow';

export class ChromeRuntime implements RuntimeInterface {
  protected static instance: RuntimeInterface | null;

  constructor() { }

  public static getInstance(): RuntimeInterface {
    if (!ChromeRuntime.instance) {
      ChromeRuntime.instance = new ChromeRuntime();
    }
    return ChromeRuntime.instance;
  }

  public listenContentScriptMessage(): void {
    chrome.runtime.onMessage.addListener(this.contentScriptMessageHandle);
  }

  removeContentScriptMessageListener(): void {
    chrome.runtime.onMessage.removeListener(this.contentScriptMessageHandle);
  }

  private contentScriptMessageHandle(
    message: reqMessage<string>,
    sender: chrome.runtime.MessageSender,
    sendResponse: () => void
  ): boolean {
    if (message.action === Action.SELECT_NODE_DONE) {
      const workflowStore = useWorkflowStore();
      workflowStore.selectDone(message.data);
    }

    console.log('message', message);
    console.log('sender', sender);
    sendResponse();
    return true;
  }

  public async selectDom(): Promise<respMessage<string>> {
    const allWindows = await chrome.windows.getAll();
    const contentScriptsTask: Promise<respMessage<string>>[] = [];
    for (const window of allWindows) {
      if (window.type === 'popup') continue;
      const allTabs = window.tabs;
      if (!allTabs) continue;
      for (const tab of allTabs) {
        const { id } = tab;
        if (id) {
          contentScriptsTask.push(
            chrome.tabs.sendMessage(id, { action: Action.START_SELECT_NODE }));
        }
      }
    }

    // todo:
    // 1. focus chrome window and tab?
    // 2. send content_scripts (other tabs) `SELECT_NODE_DONE` action

    const ret = Promise.race(contentScriptsTask);

    return ret;
  }

  public async execWorkflow(workflow: Workflow): Promise<respMessage<void>> {
    // todo
    // chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
    //   if (tabId === id && changeInfo.status === 'complete') {
    //     await chrome.tabs.sendMessage(id, { action: Action.START_EXEC_WORKFLOW, data: workflowStore.getWorkflow() });
    //   }
    // });
    return {} as respMessage<void>;
  }

}
