<script setup lang="ts">
import { LineType } from '../utils/workflow/line/lineType';
import { ref } from 'vue';
import { listenContent, startSelectDOM, getAllTabs, startExecWorkflow } from '../utils/chrome/index';
import type { ElementSelectOption } from '../types/index';
import { useWorkflowStore } from '../stores/workflow';
import { GetDOMContentLine } from '../utils/workflow/line/getDOMContentLine';
import { ClickDOMLine } from '../utils/workflow/line/clickDOMLine';
import { reactive } from 'vue';

listenContent();

const workflowStore = useWorkflowStore();

const addLine = () => {
  workflowStore.getWorkflow().insertLine(workflowStore.getWorkflow().lines.length, value.value);
};

const value = ref(LineType.GET_DOM_CONTENT);
const options: ElementSelectOption[] = [];
for (const key in LineType) {
  options.push({
    value: LineType[key as keyof typeof LineType],
    label: key,
  });
}

const selectedUrl = ref('');
const allUrls = reactive({
  v: null as string[] | null,
});

getAllTabs().then(res => {
  allUrls.v = res.map(item => item.url).filter(item => item) as string[];
});

</script>

<template>
  <div class="mb-2 flex items-center text-sm">
    <el-radio-group v-model="selectedUrl" class="ml-4">
      <el-radio v-for="item in allUrls.v" :label="item" size="large" :key="item">{{ item }}</el-radio>
    </el-radio-group>
  </div>
  <el-select v-model="value" class="m-2" placeholder="Select" size="small">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>

  <el-button @click="addLine">添加操作</el-button>
  <el-button @click="startExecWorkflow(selectedUrl)">执行</el-button>

  <el-row v-for="(item, index) in workflowStore.getWorkflow().lines" v-bind:key="index">
    <el-col v-if="(item instanceof GetDOMContentLine)">
      获取
      <el-button @click="startSelectDOM(index)">节点</el-button>
      <span v-show="item.selector">{{ item.selector }}</span>
      内容
    </el-col>
    <el-col v-else-if="(item instanceof ClickDOMLine)">
      点击
      <el-button @click="startSelectDOM(index)">节点</el-button>
      <span v-show="item.selector">{{ item.selector }}</span>
    </el-col>
  </el-row>
</template>

<style></style>
