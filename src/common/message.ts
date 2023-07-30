export enum MessageAction {
  // 开始选择节点
  START_SELECT_NODE = 'START_SELECT_NODE',

  // 取消选择节点
  CANCEL_SELECT_NODE = 'CANCEL_SELECT_NODE',

  // 节点选择完成
  SELECT_NODE_DONE = 'SELECT_NODE_DONE',

  // 开始执行
  START_EXEC_WORKFLOW = 'START_EXEC_WORKFLOW',
}

export enum ActionStatus {

  // 成功
  SUCCESS = 'SUCCESS',

  // 失败
  FAIL = 'FAIL',

  // 用户主动取消
  CANCEL = 'CANCEL',

  // 用户执行了下一个事件, 取消当前事件
  CANCEL_BECAUSE_NEXT_ACTION = 'CANCEL_BECAUSE_NEXT_ACTION',

}

export type reqMessage<T> = {
  action: MessageAction;
  data: T;
};

export type respMessage<T> = {
  action: MessageAction;
  actionStatus: ActionStatus;
  data: T;
}
