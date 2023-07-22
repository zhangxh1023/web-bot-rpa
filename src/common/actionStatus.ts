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
