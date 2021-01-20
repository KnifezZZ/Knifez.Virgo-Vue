import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { createBlob } from '@/utils/files'
import { openOnTab, openOnDialog } from '@/utils/openPage'
import { getTreeData } from '@/utils/tool'
import { notification, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { createVNode } from 'vue'
import { useStore } from 'vuex'
import request from '@/utils/request'
export default function compTable(props, context) {
	const router = useRouter()
	const store = useStore()
	//是否加载
	const loading = ref(false)
	//查询条件Copy
	const searchFormClone = ref({})
	//列表数据
	const tableData = ref([])
	//分页配置
	const pagination = ref(props.pagination)
	const queryPageParams = (params) => {
		if (pagination.value) {
			params.Page = pagination.value.currentPage
			params.Limit = pagination.value.pageSize
		} else {
			params.Limit = 0
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
		request({
			...props.events.Search,
			data: params,
		})
			.then((repData) => {
				if (pagination.value.position) {
					pagination.value.total = repData.Count || 0
				}
				if (props.useTree) {
					tableData.value = getTreeData(repData.Data, props.treeParentKey, props.treeKey) || []
				} else {
					tableData.value = repData.Data || []
				}
				loading.value = false
			})
			.catch((error) => {
				notification.error(error)
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
		onSelect: (record, selected, selectedRows) => {},
		onSelectAll: (selected, selectedRows, changeRows) => {
			selectData.value = selectedRows
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
			request({
				...props.events.BatchDelete,
				data: ids,
			}).then((res) => {
				doSearch(false)
			})
		} else {
			Modal.confirm({
				title: '确定要删除吗?',
				icon: createVNode(ExclamationCircleOutlined),
				onOk() {
					return new Promise((resolve, reject) => {
						request({
							...props.events.BatchDelete,
							data: ids,
						}).then((res) => {
							doSearch(false)
							resolve(true)
						})
					}).catch(() => notification.error('Oops errors!'))
				},
				onCancel() {},
			})
		}
	}
	const showPage = (record, status) => {
		const newRouter = router.currentRoute.value.name + '-cur'
		let nextRoute = {
			path: router.currentRoute.value.path + '/cur/:status/:id',
			name: newRouter,
			component: () => import(`@/views${router.currentRoute.value.path}/views/dialog-form.vue`),
			meta: {
				title: router.currentRoute.value.meta.title + '-编辑',
				hidden: true,
				componentUrl: router.currentRoute.value.path + '/views/dialog-form.vue',
				inLayout: true,
			},
		}
		if (status == 'add') {
			nextRoute.meta.title = router.currentRoute.value.meta.title + '-添加'
		}
		if (status == 'detail') {
			nextRoute.meta.title = router.currentRoute.value.meta.title + '-查看'
		}
		let pars = { id: record.ID, status }
		let payload = undefined
		context.emit('openPage', { nextRoute, record, pars }, (res) => {
			payload = res
		})
		if (payload != undefined) {
			nextRoute = payload.nextRoute
			pars = payload.pars
		}
		if (store.getters['app/openDialog'].useDialog) {
			openOnDialog(nextRoute, pars)
		} else {
			openOnTab(nextRoute, pars)
		}
	}

	//查看
	const doAdd = () => {
		showPage({}, 'add')
	}
	//查看
	const doView = (record) => {
		showPage(record, 'detail')
	}
	//修改
	const doEdit = (record) => {
		showPage(record, 'edit')
	}
	const doImport = () => {
		showPage({}, 'imported', 'dialog')
	}

	const handleExportClick = (e) => {
		if (e.key == 'exportAll') {
			let params = {
				...props.formItems,
				orderByColumn: null,
				isAsc: null,
			}
			params = queryPageParams(params)

			request({
				...props.events.ExportExcel,
				data: params,
			}).then((res) => {
				createBlob(res)
				notification.success('导出成功')
			})
		}
		if (e.key == 'exportSelect') {
			const parameters = selectData.value.map((item) => {
				return item.ID
			})
			request({
				...props.events.ExportExcelByIds,
				data: parameters,
			}).then((res) => {
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
