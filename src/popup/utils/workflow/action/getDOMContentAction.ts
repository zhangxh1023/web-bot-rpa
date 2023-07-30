import { BaseAction } from './baseAction';
import { ActionType } from '.';

export class GetDOMContentAction extends BaseAction {

  public selector: string | null;

  constructor() {
    super(ActionType.GET_DOM_CONTENT);
    this.selector = null;
  }
}
