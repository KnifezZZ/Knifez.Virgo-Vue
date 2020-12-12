<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="24"> <v-searcher></v-searcher></a-col>
    <a-col :span="24">
      <v-table :useToolBar="true" :columns="columns" :actions="actions" :events="events" bordered>
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
import { Search, BatchDelete, ExportExcel } from "./api/index"
export default {
  name: "actionlog",
  components: { VSearcher, VTable },
  data() {
    return {
      columns: [
        { key: "ActionTime", title: "执行时间" },
        { key: "ModuleName", title: "模块" },
        { key: "ActionName", title: "方法" },
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
      ],
      actions: ["add", "edit", "detail", "delete", "export", "import"],
      events: {
        Search,
        BatchDelete,
        ExportExcel,
      },
    }
  },
}
</script>

<style></style>
