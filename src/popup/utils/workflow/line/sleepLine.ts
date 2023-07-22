import { BaseLine } from './baseLine';
import { LineType } from './lineType';

export class SleepLine extends BaseLine {
  constructor() {
    super(LineType.SLEEP);
  }
}
