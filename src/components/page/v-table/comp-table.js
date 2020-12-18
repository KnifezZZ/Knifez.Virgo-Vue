import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createBlob } from '@/utils/files'
import { saveAsyncRoutes } from '@/utils/hasRole'
import { getTreeData } from '@/utils/tool'
import { notification, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
export default function compTable(props) {
	const router = useRouter()
	//是否加载
	const loading = ref(false)
	//查询条件Copy
	const searchFormClone = ref({})
	//列表数据
	const tableData = ref([])
	//分页配置
	const pagination = ref(props.pagination)
	const queryReset = () => {
		Object.keys(props.formItems).forEach((item) => {
			if (typeof props.formItems[item] == 'object') {
				props.formItems[item] = []
			} else {
				props.formItems[item] = ''
			}
		})
		console.log(props.formItems)
	}
	const queryPageParams = (params) => {
		if (pagination.value.position) {
			params.Page = pagination.value.currentPage
			params.Limit = pagination.value.pageSize
		}
		return params
	}
	/**
	 * @param changePage 是否改变页面为1
	 */
	const doSearch = (changePage) => {
		loading.value = true
		let params = {
			...props.formItems,
			orderByColumn: null,
			isAsc: null,
		}
		params = queryPageParams(params)
		//查询时页码默认为1
		if (!changePage) {
			params.Page = 1
		}
		//排序
		if (params['isAsc']) {
			params['SortInfo'] = {
				Direction: params['isAsc'],
				Property: params['orderByColumn'],
			}
		}
		for (const key in params) {
			if (params[key] === '' || params[key] === [] || params[key] === undefined) {
				delete params[key]
			}
			// 删除自定义字段
			if (['isAsc', 'orderByColumn'].includes(key)) {
				delete params[key]
			}
		}
		props.events
			.Search(params)
			.then((repData) => {
				loading.value = false
				if (pagination.value.position) {
					pagination.value.total = repData.Count || 0
				}
				if (props.useTree) {
					tableData.value = getTreeData(repData.Data, props.treeParentKey, props.treeKey) || []
				} else {
					tableData.value = repData.Data || []
				}
			})
			.catch((error) => {
				console.error(error)
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
			selectData.value = selectedRows
		},
		onSelect: (record, selected, selectedRows) => {
			console.log(record, selected, selectedRows)
		},
		onSelectAll: (selected, selectedRows, changeRows) => {
			selectData.value = selectedRows
			console.log(selected, selectedRows, changeRows)
		},
	}
	//删除
	const doDelete = (record) => {
		let ids = selectData.value.map((item) => {
			return item.ID
		})
		//单条删除
		if (record !== null) {
			ids = [record.ID]
		}
		Modal.confirm({
			title: '确定要删除吗?',
			icon: createVNode(ExclamationCircleOutlined),
			onOk() {
				props.events.BatchDelete(ids).then((res) => {
					doSearch(false)
				})
			},
			onCancel() {},
		})
	}
	const exeNewTab = (record, status) => {
		const newRouter = router.currentRoute.value.name + '-cur'
		if (!router.hasRoute(newRouter)) {
			let asyncRoute = {
				path: router.currentRoute.value.path + '/cur',
				name: newRouter,
				component: () => import(`@/views${router.currentRoute.value.path}/views/dialog-form.vue`),
				meta: {
					title: router.currentRoute.value.name + '-编辑',
					hidden: true,
				},
			}
			router.addRoute('home', asyncRoute)
			//防止刷新404
			saveAsyncRoutes(asyncRoute, router.currentRoute.value.path)
		}
		router.push({ path: router.currentRoute.value.path + '/cur', params: { record, status } })
	}

	const exeNewDialog = (record) => {}
	//查看
	const doAdd = () => {
		exeNewTab({}, 'add')
	}
	//查看
	const doView = (record) => {
		exeNewTab(record, 'detail')
	}
	//修改
	const doEdit = (record) => {
		exeNewTab(record, 'edit')
	}
	const doImport = () => {
		exeNewDialog(null)
	}

	const handleExportClick = (e) => {
		if (e.key == 'exportAll') {
			let params = {
				...props.formItems,
				orderByColumn: null,
				isAsc: null,
			}
			params = queryPageParams(params)
			props.events.ExportExcel(params).then((res) => {
				createBlob(res)
				notification.success('导出成功')
			})
		}
		if (e.key == 'exportSelect') {
			const parameters = selectData.value.map((item) => {
				return item.ID
			})
			props.events.ExportExcelByIds(parameters).then((res) => {
				createBlob(res)
				notification.success('导出成功')
			})
		}
	}
	return {
		loading,
		searchFormClone,
		tablePagination: pagination,
		tableData,
		selectData,
		queryReset,
		doSearch,
		doView,
		doAdd,
		doEdit,
		doDelete,
		doImport,
		handleChange,
		rowSelection,
		handleExportClick,
	}
}
