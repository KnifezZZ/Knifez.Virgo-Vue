<template>
  <a-card style="padding:10px;">
    <a-form layout="inline">
      <slot></slot>
      <a-button type="primary" @click="queryClick"><v-icon icon="search-line"></v-icon> 查询</a-button>
    </a-form>
  </a-card>
</template>

<script>
import CompTable from "../v-table/comp-table"
export default {
  name: "VSearcher",
  props: {
    events: {
      type: Object,
      required: true,
    },
    formItems: {
      type: Object,
      required: true,
    },
  },
  methods: {
    queryClick() {
      this.events.doSearch(false)
    },
  },
}
</script>

<style></style>
