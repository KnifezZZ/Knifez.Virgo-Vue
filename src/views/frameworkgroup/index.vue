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
				:actions="actions"
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
import apiEvents from './api/index'
import { ref, onMounted, watch } from 'vue'
import DialogForm from './views/dialog-form'
export default {
	name: 'frameworkGroup',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: false,
				isActive: true,
			},
			columns: [
				{ key: 'GroupCode', title: '用户组编号' },
				{ key: 'GroupName', title: '用户组名称' },
				{ key: 'GroupRemark', title: '备注' },
				{
					title: '操作',
					isOperate: true,
					actions: ['detail', 'edit', 'delete'],
				},
			],
			actions: ['add', 'edit', 'detail', 'delete', 'exported', 'imported'],
			events: apiEvents,
			queryFields: [
				{
					title: '用户组',
					key: 'GoupName',
					type: 'input',
				},
				{
					title: '用户组编号',
					key: 'GroupCode',
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
