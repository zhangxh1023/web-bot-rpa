import type { Workflow } from '../popup/utils/workflow/workflow';
import { MessageAction } from '../common/message';
import type { reqMessage } from '../common/message';
import { ActionFactory } from '../popup/utils/workflow/action';
import { GetDOMContentAction } from '../popup/utils/workflow/action/getDOMContentAction';
import { ClickDOMAction } from '../popup/utils/workflow/action/clickDOMAction';

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

    // content_script.js

    // 发送消息给background script
    chrome.runtime.sendMessage({ action: 'getTabInfo' }).then(console.log);

    // send message to chrome extension popup.js
    chrome.runtime.sendMessage({
      action: MessageAction.SELECT_NODE_DONE,
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

const chromeMessageHandle = (message: reqMessage<any>,
  sender: chrome.runtime.MessageSender,
  sendResponse: () => void) => {

  console.log('message', message);
  console.log('sender', sender);

  if (message.action === MessageAction.START_SELECT_NODE) {
    document.addEventListener('click', preventDefaultHandle);
    document.addEventListener('click', documentClickHandle, { passive: true });
    document.addEventListener('mousemove', documentMouseMoveHandle);
  } else if (message.action === MessageAction.START_EXEC_WORKFLOW) {
    const workflow: Workflow = message.data;
    for (const _line of workflow.actions) {
      const line = ActionFactory.getLineByObject(_line);
      if (line) {
        if (line instanceof ClickDOMAction && line.selector) {
          const element = document.querySelector(line.selector);
          if (element instanceof HTMLElement) {
            element.click();
          }
        } else if (line instanceof GetDOMContentAction && line.selector) {
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
