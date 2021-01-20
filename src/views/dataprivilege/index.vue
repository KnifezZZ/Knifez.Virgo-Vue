<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :collapse.sync="collapse" :events="events" :fields="queryFields" @search="querySearch"> </v-searcher>
		</a-col>
		<a-col :span="24">
			<v-table
				ref="vtable"
				:form-items="queryForm"
				:columns="columns"
				:events="events"
				:useToolBar="true"
				@openPage="openPage"
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
import router from '@/router'
import store from '@/store'
import { openOnTab, openOnDialog } from '@/utils/openPage'
import { ref, onMounted, watch } from 'vue'
import DialogForm from './views/dialog-form'
import _request from '../../utils/request'
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
					isOperate: true,
					actions: { Detail: actions.Detail, Edit: actions.Edit, Delete: actions.Delete },
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
		openPage(info, callback) {
			info.pars.TargetId = info.record.TargetId
			info.pars.TableName = info.record.TableName
			info.pars.DpType = info.record.DpType
			info.pars.Id = undefined
			callback(info)
		},
		querySearch(info) {
			new Promise((resolve, reject) => {
				this.queryForm = info
				resolve(true)
			}).then((res) => {
				this.$refs.vtable.doSearch(true)
			})
		},
	},
	mounted() {
		this.$refs.vtable.doDelete = (palyoad) => {
			_request({
				...actions.Delete,
				data: {
					ModelName: palyoad.TableName,
					Id: palyoad.TargetId,
					Type: palyoad.DpType,
				},
			}).then((res) => {})
		}
	},
}
</script>

<style></style>
