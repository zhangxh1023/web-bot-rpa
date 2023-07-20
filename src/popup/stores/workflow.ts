import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { Workflow } from '../utils/workflow/workflow';
import { ClickDOMLine } from '../utils/workflow/line/clickDOMLine';
import { GetDOMContentLine } from '../utils/workflow/line/getDOMContentLine';

export const useWorkflowStore = defineStore('workflow', () => {
  const store = reactive({
    v: new Workflow(),
    currentSelect: null as number | null,
  });

  const getWorkflow = () => store.v;
  const startSelectDOM = (index: number) => {
    console.log(`selectdom: ${index}`);
    store.currentSelect = index;
  };
  const selectDone = (selector: string) => {
    console.log(store.currentSelect);
    console.log(selector);
    if (store.currentSelect === null) return;
    const line = store.v.lines[store.currentSelect];
    if (line instanceof ClickDOMLine
      || line instanceof GetDOMContentLine) {
      line.selector = selector;
    }
    store.currentSelect = null;
  };

  return {
    store,
    getWorkflow,
    startSelectDOM,
    selectDone
  };
});
