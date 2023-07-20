import type { LineType } from './lineType';

export class BaseLine {

  constructor(
    public readonly type: LineType,
  ) {
    this.type = type;
  }

}
