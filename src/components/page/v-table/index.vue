<template>
	<a-card>
		<div class="v-toolbar" v-if="useToolBar">
			<slot name="toolbar" />
			<a-button v-if="actions.includes('add')" type="primary" @click="doAdd">
				<v-icon icon="add"></v-icon> 添加
			</a-button>
			<a-button v-if="actions.includes('delete')" :disabled="selectData.length === 0" type="danger" @click="doDelete">
				<v-icon icon="delete-bin"></v-icon> 批量删除
			</a-button>
			<a-button v-if="actions.includes('import')" @click="doImport">导入</a-button>
			<a-dropdown v-if="actions.includes('export')">
				<template #overlay>
					<a-menu @click="handleExportClick">
						<a-menu-item key="exportAll">导出全部 </a-menu-item>
						<a-menu-item key="exportSelect">导出勾选 </a-menu-item>
					</a-menu>
				</template>
				<a-button> 导出 <v-icon icon="arrow-down-s"></v-icon></a-button>
			</a-dropdown>
		</div>
		<a-table
			:rowKey="rowKey"
			:data-source="tableData"
			:pagination="tablePagination"
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
							<a-button v-if="item.actions.includes('detail')" @click="doView(record)" type="link">查看</a-button>
							<a-button v-if="item.actions.includes('edit')" @click="doEdit(record)" type="link">修改</a-button>
							<a-popconfirm placement="topRight" title="确定要删除吗?" @confirm="doDelete(record)">
								<a-button v-if="item.actions.includes('delete')" type="link">删除</a-button>
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
import CompTable from './comp-table'
export default {
	name: 'VTable',
	props: {
		rowKey: {
			type: String,
			required: false,
			default() {
				return 'ID'
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
		pagination: {
			type: Object,
			required: false,
			default() {
				return {
					position: 'both',
					showTotal: (total, range) => `共 ${total} 条`,
					showQuickJumper: true,
					showSizeChanger: true,
					pageSizeOptions: ['10', '20', '30', '50', '100'],
					currentPage: 1,
					pageSize: 20,
					events: {},
				}
			},
		},
		useToolBar: {
			type: Boolean,
			required: false,
			default() {
				return true
			},
		},
		useTree: {
			type: Boolean,
			required: false,
			default: function() {
				return false
			},
		},
		treeKey: {
			type: String,
			required: false,
			default: function() {
				return 'ID'
			},
		},
		treeParentKey: {
			type: String,
			required: false,
			default: function() {
				return 'ParentID'
			},
		},
	},
	setup(props) {
		const {
			loading,
			searchFormClone,
			selectData,
			tablePagination,
			tableData,
			queryReset,
			doSearch,
			doView,
			doAdd,
			doDelete,
			doEdit,
			doImport,
			handleChange,
			rowSelection,
			handleExportClick,
		} = CompTable(props)
		return {
			loading,
			searchFormClone,
			tableData,
			selectData,
			queryReset,
			doSearch,
			doView,
			doAdd,
			doDelete,
			doEdit,
			doImport,
			tablePagination,
			handleChange,
			rowSelection,
			handleExportClick,
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
