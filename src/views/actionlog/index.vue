<template>
  <a-row>
    <a-col :span="24">
      <v-table :columns="columns" :actions="actions" :events="events" bordered>
        <template #Duration="{ text }">
          <a-tag color="green"> {{ text }} </a-tag>
        </template>
      </v-table>
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
      },
    }
  },
}
</script>

<style></style>
