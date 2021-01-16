<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher
				:collapse.sync="collapse"
				:events="events"
				:fields="queryFields"
				@search="querySearch"
			>
			</v-searcher>
		</a-col>
		<a-col :span="24">
			<v-table
				ref="vtable"
				:form-items="queryForm"
				:columns="columns"
				:events="events"
				:useToolBar="true"
				bordered
			>
				<template #toolbar> </template>
			</v-table>
			<dialog-form @reSearch="querySearch"></dialog-form>
		</a-col>
	</a-row>
</template>

<script>
import VSearcher from '@/components/page/v-searcher/index'
import VTable from '@/components/page/v-table/index'
import actions from './api/index'
import { ref, onMounted, watch } from 'vue'
import DialogForm from './views/dialog-form'
export default {
	name: 'frameworkRole',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: false,
				isActive: true,
			},
			columns: [
				{ key: 'RoleCode', title: '角色编号' },
				{ key: 'RoleName', title: '角色名称' },
				{ key: 'RoleRemark', title: '备注' },
				{
					title: '操作',
					isOperate: true,
					actions: { Detail: actions.Detail,Edit: actions.Edit, Delete: actions.Delete },
				},
			],
			events: actions,
			queryFields: [
				{
					title: '角色编码',
					key: 'RoleCode',
					type: 'input',
				},
				{
					title: '角色名称',
					key: 'RoleName',
					type: 'input',
				},
			],
			queryForm: {},
		}
	},
	methods: {
		querySearch(info) {
			new Promise((resolve, reject) => {
				this.queryForm = info
				resolve(true)
			}).then((res) => {
				this.$refs.vtable.doSearch(true)
			})
		},
	},
}
</script>

<style></style>
