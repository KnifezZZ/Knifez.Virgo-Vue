<template>
  <a-row>
    <a-col :span="24">
      <v-table :columns="columns" :actions="actions" :events="events" bordered> </v-table>
    </a-col>
  </a-row>
</template>

<script>
import VTable from "@/components/page/v-table/index"
import { Search } from "./api/index"
export default {
  name: "actionlog",
  components: {
    VTable,
  },
  data() {
    return {
      columns: [
        { dataIndex: "ActionTime", title: "执行时间" },
        { dataIndex: "ModuleName", title: "模块" },
        { dataIndex: "ActionName", title: "方法" },
        { dataIndex: "LogType", title: "日志类型" },
        { dataIndex: "Duration", title: "耗时", sortable: "custom", isSlot: true },
        { dataIndex: "IP", title: "IP" },
        { dataIndex: "Remark", title: "备注" },
        { isOperate: true, title: "操作", actions: ["detail", "deleted"] },
      ],
      actions: ["add", "edit", "delete", "export", "import"],
      events: {
        Search,
      },
    }
  },
}
</script>

<style></style>
