<script setup lang="ts">
import { Action } from '../utils/workflow/action/index';

</script>

<template>
  <el-popover :width="300" trigger="click">
    <template #reference>
      <el-button style="margin-right: 16px">添加操作</el-button>
    </template>
    <template #default>
      选择你的操作：
      <div v-for="item in Action.getAllActionsDesc()" :key="item.type">
        {{ item.title }}

        <el-popover placement="top" :width="200" trigger="hover"
          :content="item.desc">
          <template #reference>
            <el-button class="m-2">info</el-button>
          </template>
        </el-popover>
      </div>
    </template>
  </el-popover>
</template>
