import type { BaseAction } from './baseAction';
import { ClickDOMAction } from './clickDOMAction';
import { GetDOMContentAction } from './getDOMContentAction';

export enum ActionType {
  // 获取 DOM 内容
  GET_DOM_CONTENT = 'GET_DOM_CONTENT',
  // 点击 DOM
  CLICK_DOM = 'CLICK_DOM',
  // 暂停
  SLEEP = 'SLEEP',
}

export class ActionFactory {
  public static getLine(type: ActionType): BaseAction {
    switch (type) {
      case ActionType.GET_DOM_CONTENT:
        return new GetDOMContentAction;
      case ActionType.CLICK_DOM:
        return new ClickDOMAction;
      default:
        throw new Error('LineType not found');
    }
  }

  public static getLineByObject(obj: any): BaseAction | null {
    if (!obj) return null;
    const { type, selector } = obj;
    if (type === ActionType.CLICK_DOM) {
      const temp = new ClickDOMAction();
      temp.selector = selector;
      return temp;
    } else if (type === ActionType.GET_DOM_CONTENT) {
      const temp = new GetDOMContentAction();
      temp.selector = selector;
      return temp;
    }
    return null;
  }
}

export type ActionDesc = {
  type: ActionType,
  title: string,
  desc: string,
  icon: string,
};

export class Action {
  constructor() { }

  public static getAllActionsDesc(): ActionDesc[] {
    return [
      {
        type: ActionType.GET_DOM_CONTENT,
        title: '获取节点内容',
        desc: '获取节点内容',
        icon: '',
      },
      {
        type: ActionType.CLICK_DOM,
        title: '点击节点',
        desc: '点击节点',
        icon: '',
      },
      {
        type: ActionType.SLEEP,
        title: '暂停等待',
        desc: '暂停等待',
        icon: '',
      }
    ];
  }
}
