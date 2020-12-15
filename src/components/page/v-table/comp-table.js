import { ref, onMounted, watch } from "vue"
import { createBlob } from "@/utils/files"
import { notification } from "ant-design-vue"
export default function compTable(props) {
  //是否加载
  const loading = ref(false)
  //查询条件Copy
  const searchFormClone = ref({})
  //列表数据
  const tableData = ref([])
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
    debugger
    loading.value = true
    const params = {
      ...props.formItems,
      orderByColumn: null,
      isAsc: null,
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
  //选中数据
  const selectData = ref([])
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

  const handleMenuClick = (e) => {
    console.log("click", e)
    if (e.key == "exportAll") {
      const params = {
        ...props.formItems,
        orderByColumn: null,
        isAsc: null,
        Page: pagination.value.currentPage,
        Limit: pagination.value.pageSize,
      }
      props.events.ExportExcel(params).then((res) => {
        createBlob(res)
        notification.success("导出成功")
      })
    }
    if (e.key == "exportSelect") {
      debugger
      const parameters = selectData.value.map((item) => {
        return item.ID
      })
      props.events.ExportExcelByIds(parameters).then((res) => {
        createBlob(res)
        notification.success("导出成功")
      })
    }
  }
  return {
    loading,
    searchFormClone,
    pagination,
    tableData,
    selectData,
    doSearch,
    doDelete,
    doView,
    doEdit,
    handleChange,
    rowSelection,
    handleMenuClick,
  }
}
