<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :collapse.sync="collapse" :events="events" :fields="queryFields" @search="querySearch"> </v-searcher>
		</a-col>
		<a-col :span="24">
			<v-table ref="vtable" :form-items="queryForm" :columns="columns" :events="events" :useToolBar="true" bordered>
				<template #toolbar="{selectData}">
					<a-button
						v-permission="events.BatchDelete"
						:disabled="selectData.length === 0"
						type="danger"
						@click="doDelete(null)"
					>
						<v-icon icon="delete-bin"></v-icon> 批量删除
					</a-button>
				</template>
				<template #ActionCol="{ }">
					<a-button v-permission="events.Detail" type="link">查看</a-button>
					<a-button v-permission="events.Edit" type="link">编辑</a-button>
				</template>
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
	name: 'dataPrivilege',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: false,
				isActive: true,
			},
			columns: [
				{ key: 'Name', title: '授权对象' },
				{ key: 'TableName', title: '权限名称' },
				{ key: 'RelateIDs', title: '权限' },
				{
					title: '操作',
					key: 'ActionCol',
					isSlot: true,
				},
			],
			events: actions,
			queryFields: [
				{
					title: '权限名称',
					key: 'TableName',
					type: 'select',
					props: {
						items: [],
						loadData: actions.GetPrivileges,
					},
				},
				{
					title: '权限类型',
					key: 'DpType',
					type: 'radio',
					props: {
						items: [
							{
								Text: '用户组权限',
								Value: 0,
							},
							{
								Text: '用户权限',
								Value: 1,
							},
						],
					},
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
		doDelete(item) {
			debugger
		},
	},
}
</script>

<style></style>
