import type { ActionType } from '.';

export class BaseAction {

  constructor(
    public readonly type: ActionType,
  ) {
    this.type = type;
  }

}
