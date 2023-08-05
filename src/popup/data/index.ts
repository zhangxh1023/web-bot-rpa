import { Workflow, type SerializedWorkflow } from '../utils/workflow/workflow';
import Dexie, { type Table } from 'dexie';

export const generateWorkflowId = (): string => {
  return `workflow-${Date.now()}`;
};

export interface WorkflowTable {
  id: string,
  workflow: SerializedWorkflow,
  remark: string,
  createTime: number
}

class WebBotRPADatabase extends Dexie {
  public workflows!: Table<WorkflowTable, string>;

  public constructor() {
    super('WebBotRPADatabase');
    this.version(1).stores({
      workflows: 'id,workflow,createTime'
    });
  }
}

const db = new WebBotRPADatabase();

export const storageWorkflow = async (workflow: Workflow, remark: string) => {
  await db.workflows.add({
    id: generateWorkflowId(),
    workflow: workflow.serialize(),
    remark,
    createTime: new Date().getTime()
  });
};

export const queryWorkflows = async (pageNum: number, pageSize: number) => {
  const workflows = await db.workflows.orderBy('createTime').reverse().offset((pageNum - 1) * pageSize).limit(pageSize).toArray();
  const total = await db.workflows.count();
  return {
    workflows,
    total
  };
};
