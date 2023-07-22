import { Action } from './action';
import type { ActionStatus } from './actionStatus';

export type reqMessage<T> = {
  action: Action;
  data: T;
};

export type respMessage<T> = {
  action: Action;
  actionStatus: ActionStatus;
  data: T;
}
