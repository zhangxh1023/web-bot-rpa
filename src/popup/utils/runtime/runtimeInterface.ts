import type { respMessage } from 'src/common/message';
import type { Workflow } from '../workflow/workflow';

export interface RuntimeInterface {

  listenContentScriptsMessage(): void;

  removeContentScriptsMessageListener(): void;

  selectDom(): Promise<respMessage<string>>;

  execWorkflow(workflow: Workflow): Promise<respMessage<null>>;

}
