<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :collapse.sync="collapse" @search="querySearch" @reset="queryReset">
				<a-form-item label="账户" name="ITCode">
					<a-input type="text" v-model:value="queryInfos.ITCode"></a-input>
				</a-form-item>
				<a-form-item label="姓名" name="Name">
					<a-input type="text" v-model:value="queryInfos.Name"></a-input>
				</a-form-item>
			</v-searcher>
		</a-col>
		<a-col :span="24">
			<v-table
				ref="vtable"
				:form-items="queryInfos"
				:useToolBar="true"
				:columns="columns"
				:actions="actions"
				:events="events"
				bordered
			>
				<template #toolbar> </template>
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
import apiEvents from './api/index'
import { ref, onMounted, watch } from 'vue'
import DialogForm from './views/dialog-form'
import { loadJson } from '@/api/baseCURD.js'
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
				{ key: 'Name', title: '姓名' },
				{ key: 'Sex', title: '性别' },
				{ key: 'RoleName_view', title: '角色' },
				{ key: 'GroupName_view', title: '用户组' },
				{ key: 'IsValid', title: '是否生效', isSlot: true },
				{
					title: '操作',
					isOperate: true,
					actions: ['detail', 'edit', 'delete'],
				},
			],
			actions: ['add', 'edit', 'detail', 'delete', 'exported', 'imported'],
			events: apiEvents,
			queryInfos: {
				ITCode: '',
				Name: '',
			},
		}
	},
	methods: {
		querySearch() {
			this.$refs.vtable.doSearch()
		},
		queryReset() {
			this.$refs.vtable.queryReset()
		},
	},
	created() {
		apiEvents.GetFrameworkRoles().then((res) => {
			this.getFrameworkRolesData = res
		})
		apiEvents.GetFrameworkGroups().then((res) => {
			this.getFrameworkGroupsData = res
		})
	},
}
</script>

<style></style>
