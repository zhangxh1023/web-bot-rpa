<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { WorkflowTable } from '../data/index';
import { queryWorkflows } from '../data/index';
import dayjs from 'dayjs';
import type { TableColumnCtx } from 'element-plus';

const tableData = reactive({
  v: [] as WorkflowTable[]
});

const pageNum = ref(1);
const pageSize = ref(10);
const pageTotal = ref(0);

const deleteRow = (index: number) => {
  // TODO
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  loadTable();
};
const handleCurrentChange = (val: number) => {
  pageNum.value = val;
  loadTable();
};

const loadTable = () => {
  queryWorkflows(pageNum.value, pageSize.value).then(res => {
    tableData.v = res.workflows;
    pageTotal.value = res.total;
  });
};

const timeFormatter = (row: any, column: TableColumnCtx<any>, cellValue: any) => {
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
};

const workflowFormatter = (row: any, column: TableColumnCtx<any>, cellValue: any) => {
  return JSON.stringify(cellValue);
};

loadTable();
</script>

<template>
  <el-table :data="tableData.v" style="width: 100%" height="450">
    <el-table-column prop="id" label="ID" width="200" />
    <el-table-column prop="remark" label="备注" width="120" />
    <el-table-column prop="workflow" label="内容" width="120" :formatter="workflowFormatter" />
    <el-table-column prop="createTime" label="创建时间" width="150" :formatter="timeFormatter" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
          详细
        </el-button>
        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]" :small="false"
    :disabled="false" :background="false" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>
