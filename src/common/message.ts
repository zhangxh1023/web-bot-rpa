import { Action } from './action';

export type Message<T> = {
  action: Action;
  data: T
};
