<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :collapse.sync="collapse" :events="events" :fields="queryFields" @search="querySearch"> </v-searcher>
		</a-col>
		<a-col :span="24">
			<v-table
				ref="vtable"
				:form-items="queryForm"
				:useToolBar="true"
				:columns="columns"
				:events="events"
				bordered
			>
				<template #toolbar> </template>
				<template #PhotoId="{ record }">
					<v-img :src="record.PhotoId" />
				</template>
				<template #IsValid="{ record }">
					<a-switch v-model:checked="record.IsValid" disabled />
				</template>
			</v-table>
			<dialog-form @reSearch="querySearch" :fields="fields"></dialog-form>
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
	name: 'frameworkuser',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: false,
				isActive: false,
			},
			columns: [
				{ key: 'ITCode', title: '账户' },
				{ key: 'PhotoId', title: '头像', isSlot: true },
				{ key: 'Name', title: '姓名' },
				{ key: 'Gender', title: '性别' },
				{ key: 'RoleName_view', title: '角色' },
				{ key: 'GroupName_view', title: '用户组' },
				{ key: 'IsValid', title: '是否生效', isSlot: true },
				{
					title: '操作',
					isOperate: true,
					actions: { Detail: actions.Detail,Edit: actions.Edit, Delete: actions.Delete },
				},
			],
			events: actions,
			queryFields: [
				{
					title: '姓名',
					key: 'Name',
					type: 'input',
				},
				{
					title: '账号',
					key: 'ITCode',
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
