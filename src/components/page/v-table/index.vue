<template>
  <a-card>
    <div class="v-toolbar" v-if="useToolBar">
      <a-button type="primary"><v-icon icon="add-line"></v-icon> 添加</a-button>
      <a-button type="danger"><v-icon icon="delete-bin-line"></v-icon> 批量删除</a-button>
      <a-button type="info">导出</a-button>
      <a-button type="info">导入</a-button>
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
import { ref } from "vue"
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
  },
  setup(props) {
    //查询条件
    const searchForm = ref({
      orderByColumn: null,
      isAsc: null,
    })
    //查询条件Copy
    const searchFormClone = ref({})
    //是否加载
    const loading = ref(false)
    //列表数据
    const tableData = ref([])
    //选中数据
    const selectData = ref([])
    //分页配置
    const pagination = ref({
      position: "both",
      showTotal: (total, range) => `共 ${total} 条`,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "30", "50", "100"],
      currentPage: 1,
      pageSize: 20,
      events: {},
    })

    /**
     * @param changePage 是否改变页面为1
     */
    const doSearch = (changePage) => {
      loading.value = true
      const params = {
        ...searchFormClone,
        Page: pagination.value.currentPage,
        Limit: pagination.value.pageSize,
      }
      //查询时页码默认为1
      if (!changePage) {
        params.Page = 1
      }
      //排序
      if (params["isAsc"]) {
        params["SortInfo"] = {
          Direction: params["isAsc"],
          Property: params["orderByColumn"],
        }
      }
      for (const key in params) {
        if (params[key] === "" || params[key] === undefined) {
          delete params[key]
        }
        // 删除自定义字段
        if (["isAsc", "orderByColumn"].includes(key)) {
          delete params[key]
        }
      }
      props.events
        .Search(params)
        .then((repData) => {
          loading.value = false
          pagination.value.total = repData.Count || 0
          tableData.value = repData.Data || []
        })
        .catch((error) => {
          console.error(error.response.data.Form)
          loading.value = false
        })
    }
    //翻页
    const handleChange = (page, filter, sorter) => {
      pagination.value.currentPage = page.current
      pagination.value.pageSize = page.pageSize
      doSearch(true)
    }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        debugger
        selectData.value = selectedRows
        console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows)
      },
      onSelect: (record, selected, selectedRows) => {
        debugger
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        debugger
        console.log(selected, selectedRows, changeRows)
      },
    }
    //删除
    const doDelete = () => {
      debugger
      props.events.BatchDelete().then((res) => {
        doSearch(false)
      })
    }
    //查看
    const doView = () => {}
    //修改
    const doEdit = () => {}

    return {
      loading,
      searchForm,
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
  text-align: right;
  .ant-card-body {
    padding: 8px;
  }
  .ant-btn {
    margin-right: 8px;
    margin-bottom: 16px;
    i {
      padding-right: 8px;
    }
  }
}
</style>
