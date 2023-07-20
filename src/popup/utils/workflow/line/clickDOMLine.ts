import { BaseLine } from './baseLine';
import { LineType } from './lineType';

export class ClickDOMLine extends BaseLine {

  public selector: string | null;

  constructor() {
    super(LineType.CLICK_DOM);
    this.selector = null;
  }
}
