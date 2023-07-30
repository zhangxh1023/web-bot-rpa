import { BaseAction } from './baseAction';
import { ActionType } from '.';

export class ClickDOMAction extends BaseAction {

  public selector: string | null;

  constructor() {
    super(ActionType.CLICK_DOM);
    this.selector = null;
  }
}
