import { Workflow, type SerializedWorkflow } from '../utils/workflow/workflow';
import Dexie, { type Table } from 'dexie';

export const generateWorkflowId = (): string => {
  return `workflow-${Date.now()}`;
};

interface WorkflowTable {
  id: string,
  workflow: SerializedWorkflow,
  createTime: number
}

class WebBotRPADatabase extends Dexie {
  public workflows!: Table<WorkflowTable, string>;

  public constructor() {
    super('WebBotRPADatabase');
    this.version(1).stores({
      workflows: '++id,workflow,createTime'
    });
  }
}

const db = new WebBotRPADatabase();

export const storageWorkflow = async (workflow: Workflow) => {
  await db.workflows.add({
    id: generateWorkflowId(),
    workflow: workflow.serialize(),
    createTime: new Date().getTime()
  });
};
