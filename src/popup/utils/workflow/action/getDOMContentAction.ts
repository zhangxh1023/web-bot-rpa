import { BaseAction, type BaseSerializedAction } from './baseAction';
import { ActionType } from '.';

export interface GetDOMContentSerializedAction extends BaseSerializedAction {
  selector: string | null;
}

export class GetDOMContentAction extends BaseAction {

  public selector: string | null;

  constructor() {
    super(ActionType.GET_DOM_CONTENT);
    this.selector = null;
  }

  public serialize(): GetDOMContentSerializedAction {
    return {
      type: this.type,
      selector: this.selector
    };
  }
  public deserialize(serialized: GetDOMContentSerializedAction): BaseAction {
    this.selector = serialized.selector;
    return this;
  }
}
