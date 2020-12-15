<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="24">
      <v-searcher :events="$refs.vtable">
        <a-form-item label="访问地址" name="ActionUrl">
          <a-input type="text" v-model:value="queryInfos.ActionUrl"></a-input>
        </a-form-item>
        <a-form-item label="方法" name="ActionName">
          <a-input type="text" v-model:value="queryInfos.ActionName"></a-input>
        </a-form-item>
      </v-searcher>
    </a-col>
    <a-col :span="24">
      <v-table
        ref="vtable"
        :form-items="queryInfos"
        :useToolBar="true"
        :columns="columns"
        :actions="actions"
        :events="events"
        bordered
      >
        <template #toolbar>
          <a-button>Hello</a-button>
        </template>
        <template #Duration="{ text }">
          <a-tag :color="text > 0.15 ? 'red' : 'green'"> {{ text }} </a-tag>
        </template>
      </v-table>
    </a-col>
  </a-row>
</template>

<script>
import VSearcher from "@/components/page/v-searcher/index"
import VTable from "@/components/page/v-table/index"
import { Search, BatchDelete, ExportExcel, ExportExcelByIds } from "./api/index"
import { ref, onMounted, watch } from "vue"
export default {
  name: "actionlog",
  components: { VSearcher, VTable },
  data() {
    return {
      columns: [],
      actions: ["view", "add", "edit", "detail", "delete", "export", "import"],
      events: {
        Search,
        BatchDelete,
        ExportExcel,
        ExportExcelByIds,
      },
      queryInfos: {
        ActionUrl: "",
        ActionTime: [],
      },
    }
  },
  created() {
    //table字段
    this.columns = [
      { key: "ActionTime", title: "执行时间" },
      { key: "ModuleName", title: "模块" },
      { key: "ActionName", title: "方法" },
      { key: "ActionUrl", title: "访问地址" },
      { key: "LogType", title: "日志类型" },
      {
        key: "Duration",
        title: "耗时",
        width: 200,
        isSlot: true,
      },
      { key: "IP", title: "IP" },
      { key: "Remark", title: "备注" },
      {
        title: "操作",
        isOperate: true,

        actions: ["detail", "edit", "deleted"],
      },
    ]
  },
  mounted() {},
}
</script>

<style></style>
