import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createBlob } from '@/utils/files'
import { saveAsyncRoutes } from '@/utils/hasRole'
import { notification } from 'ant-design-vue'
export default function compTable(props) {
	const router = useRouter()
	//是否加载
	const loading = ref(false)
	//查询条件Copy
	const searchFormClone = ref({})
	//列表数据
	const tableData = ref([])
	//分页配置
	const pagination = ref({
		position: 'both',
		showTotal: (total, range) => `共 ${total} 条`,
		showQuickJumper: true,
		showSizeChanger: true,
		pageSizeOptions: ['10', '20', '30', '50', '100'],
		currentPage: 1,
		pageSize: 20,
		events: {},
	})
	const queryReset = () => {
		Object.keys(props.formItems).forEach((item) => {
			if (typeof props.formItems[item] == Array) {
				props.formItems[item] = undefined
			} else {
				props.formItems[item] = ''
			}
		})
	}
	/**
	 * @param changePage 是否改变页面为1
	 */
	const doSearch = (changePage) => {
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
		debugger
		let ids = selectData.value.map((item) => {
			return item.ID
		})
		//单条删除
		if (record !== null && record !== undefined) {
			ids = [record.ID]
		}
		props.events.BatchDelete({ ids }).then((res) => {
			doSearch(false)
		})
	}
	const exeNewTab = (record) => {
		const addroute = router.currentRoute.value.name + '-cur'
		if (!router.hasRoute(addroute)) {
			//防止刷新404
			let asyncRoute = {
				path: router.currentRoute.value.path + '/cur',
				name: addroute,
				component: () => import(`@/views${router.currentRoute.value.path}/views/dialog-form.vue`),
				meta: {
					title: router.currentRoute.value.name + '-编辑',
					hidden: true,
				},
			}
			router.addRoute('home', asyncRoute)
			saveAsyncRoutes(asyncRoute, router.currentRoute.value.path)
		}
		router.push({ path: router.currentRoute.value.path + '/cur', params: record })
	}
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

	const handleExportClick = (e) => {
		if (e.key == 'exportAll') {
			const params = {
				...props.formItems,
				orderByColumn: null,
				isAsc: null,
				Page: pagination.value.currentPage,
				Limit: pagination.value.pageSize,
			}
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
		pagination,
		tableData,
		selectData,
		queryReset,
		doSearch,
		doView,
		doAdd,
		doEdit,
		doDelete,
		handleChange,
		rowSelection,
		handleExportClick,
	}
}
