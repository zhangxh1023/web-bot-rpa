import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { Workflow } from '../utils/workflow/workflow';
import { ClickDOMAction } from '../utils/workflow/action/clickDOMAction';
import { GetDOMContentAction } from '../utils/workflow/action/getDOMContentAction';

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
    const line = store.v.actions[store.currentSelect];
    if (line instanceof ClickDOMAction
      || line instanceof GetDOMContentAction) {
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
