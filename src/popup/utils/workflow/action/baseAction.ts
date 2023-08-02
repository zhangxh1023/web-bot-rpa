import type { ActionType } from '.';

export interface BaseSerializedAction {
  type: string;
}

export abstract class BaseAction {

  constructor(
    public readonly type: ActionType,
  ) {
    this.type = type;
  }

  public abstract serialize(): BaseSerializedAction;

  public abstract deserialize(serialized: BaseSerializedAction):BaseAction;

}
