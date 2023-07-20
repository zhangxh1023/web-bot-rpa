import type { Workflow } from '../popup/utils/workflow/workflow';
import { Action } from '../common/action';
import type { Message } from '../common/message';
import { LineFactory } from '../popup/utils/workflow/line/lineType';
import { GetDOMContentLine } from '../popup/utils/workflow/line/getDOMContentLine';
import { ClickDOMLine } from '../popup/utils/workflow/line/clickDOMLine';

const ownClass = ['dom-clicked'];

const preventDefaultHandle = (e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
  console.log('preventDefaultHandle');
};

const getSelectorByDom = (dom: Element): string => {
  if (!dom) return '';
  const selectorList: string[] = [];
  while (dom && dom !== document.body) {
    const selector = dom.nodeName.toLowerCase();
    const id = dom.id;
    let className = dom.className;
    if (className) {
      className = className.split(' ').filter(item => ownClass.indexOf(item) === -1).join(' ');
    }
    if (id) {
      selectorList.push(`${selector}#${id}`);
      break;
    } else if (className) {
      selectorList.push(`${selector}.${className.split(' ').join('.')}`);
    } else {
      selectorList.push(selector);
    }
    dom = dom.parentNode as Element;
  }
  return selectorList.reverse().join(' ');
};

const documentClickHandle = (e: MouseEvent) => {
  const clickDom = document.elementFromPoint(e.clientX, e.clientY);
  console.log('clickDom', clickDom);
  if (clickDom) {
    console.log('dom class: ', clickDom.classList);
    // add dom class
    clickDom.classList.add('dom-clicked');
    // remove preventDefaultHandle and documentClickHandle
    document.removeEventListener('click', preventDefaultHandle);
    document.removeEventListener('click', documentClickHandle);
    document.removeEventListener('mousemove', documentMouseMoveHandle);

    // send message to chrome extension popup.js
    chrome.runtime.sendMessage({
      action: Action.SELECT_NODE_DONE,
      data: getSelectorByDom(clickDom),
    });
  }
};

let prevDom: Element;
const documentMouseMoveHandle = (e: MouseEvent) => {
  const mouseMoveDom = document.elementFromPoint(e.clientX, e.clientY);
  if (mouseMoveDom) {
    if (prevDom) {
      prevDom.classList.remove('dom-clicked');
    }
    prevDom = mouseMoveDom;
    mouseMoveDom.classList.add('dom-clicked');
  }
};

const chromeMessageHandle = (message: Message<any>,
  sender: chrome.runtime.MessageSender,
  sendResponse: () => void) => {

  console.log('message', message);
  console.log('sender', sender);

  if (message.action === Action.START_SELECT_NODE) {
    document.addEventListener('click', preventDefaultHandle);
    document.addEventListener('click', documentClickHandle, { passive: true });
    document.addEventListener('mousemove', documentMouseMoveHandle);
  } else if (message.action === Action.START_EXEC_WORKFLOW) {
    const workflow: Workflow = message.data;
    for (const _line of workflow.lines) {
      const line = LineFactory.getLineByObject(_line);
      if (line) {
        if (line instanceof ClickDOMLine && line.selector) {
          const element = document.querySelector(line.selector);
          if (element instanceof HTMLElement) {
            element.click();
          }
        } else if (line instanceof GetDOMContentLine && line.selector) {
          const element = document.querySelector(line.selector);
          if (element instanceof HTMLElement) {
            console.log(`获取到内容: ${element.innerText}}`);
          }
        }
      }
    }
  }

  sendResponse();
  return true;
};

chrome.runtime.onMessage.addListener(chromeMessageHandle);
