import type { BaseLine } from './baseLine';
import { ClickDOMLine } from './clickDOMLine';
import { GetDOMContentLine } from './getDOMContentLine';

export enum LineType {
  // 获取 DOM 内容
  GET_DOM_CONTENT = 'GET_DOM_CONTENT',
  // 点击 DOM
  CLICK_DOM = 'CLICK_DOM',
  // 暂停
  SLEEP = 'SLEEP',
}

export class LineFactory {
  public static getLine(type: LineType): BaseLine {
    switch (type) {
      case LineType.GET_DOM_CONTENT:
        return new GetDOMContentLine;
      case LineType.CLICK_DOM:
        return new ClickDOMLine;
      default:
        throw new Error('LineType not found');
    }
  }

  public static getLineByObject(obj: any): BaseLine | null {
    if (!obj) return null;
    const { type, selector } = obj;
    if (type === LineType.CLICK_DOM) {
      const temp = new ClickDOMLine();
      temp.selector = selector;
      return temp;
    } else if (type === LineType.GET_DOM_CONTENT) {
      const temp = new GetDOMContentLine();
      temp.selector = selector;
      return temp;
    }
    return null;
  }
}
