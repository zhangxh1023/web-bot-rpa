import { BaseAction, type BaseSerializedAction } from './baseAction';
import { ActionType } from '.';

export interface SleepSerializedAction extends BaseSerializedAction {
  time: number | null;
}

export class SleepAction extends BaseAction {

  // second
  public time: number | null;

  constructor() {
    super(ActionType.SLEEP);
    this.time = null;
  }

  public serialize(): SleepSerializedAction {
    return {
      type: this.type,
      time: this.time
    };
  }
  public deserialize(serialized: SleepSerializedAction): BaseAction {
    this.time = serialized.time;
    return this;
  }
}
