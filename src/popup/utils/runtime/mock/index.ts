import type { respMessage } from 'src/common/message';
import type { Workflow } from '../../workflow/workflow';
import type { RuntimeInterface } from '../runtimeInterface';
import { MessageAction, ActionStatus } from 'src/common/message';

export class MockRuntime implements RuntimeInterface {
  protected static instance: MockRuntime | null;

  constructor() { }

  public static getInstance(): RuntimeInterface {
    if (!MockRuntime.instance) {
      MockRuntime.instance = new MockRuntime();
    }
    return MockRuntime.instance;
  }

  listenContentScriptsMessage(): void {
  }

  removeContentScriptsMessageListener(): void {
  }

  selectDom(): Promise<respMessage<string>> {
    return Promise.resolve({
      action: MessageAction.SELECT_NODE_DONE,
      actionStatus: ActionStatus.SUCCESS,
      data: '#selector'
    });
  }

  execWorkflow(workflow: Workflow): Promise<respMessage<null>> {
    return Promise.resolve({
      action: MessageAction.SELECT_NODE_DONE,
      actionStatus: ActionStatus.SUCCESS,
      data: null
    });
  }
}
