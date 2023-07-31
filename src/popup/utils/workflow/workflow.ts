import { BaseAction } from './action/baseAction';
import { ActionFactory, type ActionType } from './action';

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
    this.actions.splice(index, 0, ActionFactory.getLine(type));
  }

}
