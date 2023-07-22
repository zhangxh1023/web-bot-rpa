import type { respMessage } from 'src/common/message';
import type { Workflow } from '../workflow/workflow';

export interface RuntimeInterface {

  listenContentScriptMessage(): void;

  removeContentScriptMessageListener(): void;

  selectDom(): Promise<respMessage<string>>;

  execWorkflow(workflow: Workflow): Promise<respMessage<void>>;

}
