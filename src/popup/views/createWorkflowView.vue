<script setup lang="ts">
import { reactive } from 'vue';
import { Action, ActionType } from '../utils/workflow/action/index';
import { Workflow } from '../utils/workflow/workflow';
import { ref } from 'vue';
import type ElPopover from 'element-plus/lib/components/popover/index.js';

const _w = new Workflow();
const workflow = reactive({
  v: _w
});

const isShowSelectActionDrawer = ref(false);

const selectAction = (type: ActionType) => {
  workflow.v.insertLine(workflow.v.actions.length, type);
};

const cancelClick = () => {
  isShowSelectActionDrawer.value = false;
};
const confirmClick = () => {
  console.log('confire');
  isShowSelectActionDrawer.value = false;
};

</script>

<template>
  <div v-for="(item, index) in workflow.v.actions" :key="index">
    {{ item }}
  </div>

  <el-button style="margin-right: 16px" @click="isShowSelectActionDrawer = true">添加操作</el-button>

  <el-drawer v-model="isShowSelectActionDrawer" :with-header="false">
    <template #default>
      <div class="hand" v-for="item in Action.getAllActionsDesc()" :key="item.type" @click="selectAction(item.type)">
        {{ item.title }}

        <el-popover placement="top" :width="200" trigger="hover" :content="item.desc">
          <template #reference>
            <el-button class="m-2" style="float: right;">info</el-button>
          </template>
        </el-popover>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped>
.hand {
  cursor: pointer;
  height: 50px;
  line-height: 50px;
}

.hand:hover {
  background-color: red;
}
</style>
