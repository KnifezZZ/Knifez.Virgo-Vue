<template>
  <a-card>
    <div class="v-toolbar" v-if="useToolBar">
      <slot name="toolbar" />
      <a-button type="primary"><v-icon icon="add-line"></v-icon> 添加</a-button>
      <a-button type="danger"><v-icon icon="delete-bin-line"></v-icon> 批量删除</a-button>
      <a-dropdown v-if="actions.includes('export')">
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item v-if="actions.includes('import')" key="import">导入 </a-menu-item>
            <a-menu-item key="exportAll">导出全部 </a-menu-item>
            <a-menu-item key="exportSelect">导出勾选 </a-menu-item>
          </a-menu>
        </template>
        <a-button> 导出 <v-icon icon="arrow-down-s-line"></v-icon></a-button>
      </a-dropdown>
    </div>
    <a-table
      :rowKey="rowKey"
      :data-source="tableData"
      :pagination="pagination"
      @change="handleChange"
      :row-selection="rowSelection"
      bordered
    >
      <template v-for="item in columns">
        <template v-if="item.isSlot">
          <a-table-column :data-index="item.key" :title="item.title" :key="item.key">
            <template v-slot[`index`]="{ text, record }">
              <slot :name="item.key" v-bind="{ text, record }" />
            </template>
          </a-table-column>
        </template>
        <template v-else-if="item.isOperate">
          <a-table-column :data-index="item.key" :title="item.title" :key="item.key">
            <template v-slot[`index`]="{ text, record }">
              <a-button type="link">查看</a-button>
              <a-button type="link">修改</a-button>

              <a-popconfirm placement="topRight" title="确定要删除吗?" @confirm="doDelete">
                <a-button type="link">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
        <template v-else>
          <a-table-column :data-index="item.key" :title="item.title" :key="item.key"> </a-table-column>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import CompTable from "./comp-table"
export default {
  name: "VTable",
  props: {
    useToolBar: {
      type: Boolean,
      required: false,
      default() {
        return true
      },
    },
    rowKey: {
      type: String,
      required: false,
      default() {
        return "ID"
      },
    },
    columns: {
      type: Array,
      required: true,
    },
    events: {
      type: Object,
      required: true,
    },
    actions: {
      type: Array,
      required: false,
    },
    formItems: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const {
      loading,
      searchFormClone,
      selectData,
      pagination,
      tableData,
      doSearch,
      doDelete,
      doView,
      doEdit,
      handleChange,
      rowSelection,
      handleMenuClick,
    } = CompTable(props)
    return {
      loading,
      searchFormClone,
      tableData,
      selectData,
      doSearch,
      doDelete,
      doView,
      doEdit,
      pagination,
      handleChange,
      rowSelection,
      handleMenuClick,
    }
  },
  created() {
    this.doSearch(false)
  },
}
</script>

<style lang="less">
.v-toolbar {
  border: 0;
  // text-align: right;
  .ant-card-body {
    padding: 8px;
  }
}
</style>
