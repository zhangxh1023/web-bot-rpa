import { BaseLine } from './baseLine';
import { LineType } from './lineType';

export class GetDOMContentLine extends BaseLine {

  public selector: string | null;

  constructor() {
    super(LineType.GET_DOM_CONTENT);
    this.selector = null;
  }
}
