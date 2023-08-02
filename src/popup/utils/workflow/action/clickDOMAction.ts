import { BaseAction, type BaseSerializedAction } from './baseAction';
import { ActionType } from '.';

export interface ClickDOMSerializedAction extends BaseSerializedAction {
  selector: string | null;
}

export class ClickDOMAction extends BaseAction {

  public selector: string | null;

  constructor() {
    super(ActionType.CLICK_DOM);
    this.selector = null;
  }

  public serialize(): ClickDOMSerializedAction {
    return {
      type: this.type,
      selector: this.selector
    };
  }
  public deserialize(serialized: ClickDOMSerializedAction): BaseAction {
    this.selector = serialized.selector;
    return this;
  }
}
