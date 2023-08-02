import { BaseAction, type BaseSerializedAction } from './action/baseAction';
import { ActionFactory, ActionType } from './action';

export interface SerializedWorkflow {
  actions: BaseSerializedAction[];
}

export class Workflow {
  public actions: BaseAction[] = [];

  constructor() {
    // todo
  }

  /**
   * 移动 行
   * @param from 待移动的行 index
   * @param to 移动的目标 index
   */
  public moveLine(from: number, to: number): void {
    const delLine = this.actions.splice(from, 1);
    this.actions.splice(to, 0, ...delLine);
  }

  /**
   * 删除 行
   * @param index 待删除的行 index
   */
  public removeLine(index: number): void {
    this.actions.splice(index, 1);
  }

  /**
   * 插入 行
   * @param index 待插入的行 index
   */
  public insertLine(index: number, type: ActionType): void {
    this.actions.splice(index, 0, ActionFactory.getAction(type));
  }

  public serialize(): SerializedWorkflow {
    const actions = [];
    for (const item of this.actions) {
      actions.push(item.serialize());
    }
    return { actions };
  }

  public deserialize(serialize: SerializedWorkflow) {
    for (const item of serialize.actions) {
      const type = item.type;
      const action = ActionFactory.getAction(ActionType[type as keyof typeof ActionType]);
      this.actions.push(action.deserialize(item));
    }
  }

}
