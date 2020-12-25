<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :events="$refs" :collapse.sync="collapse">
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
			<dialog-form @reSearch="querySearch"></dialog-form>
		</a-col>
	</a-row>
</template>

<script>
import VSearcher from '@/components/page/v-searcher/index'
import VTable from '@/components/page/v-table/index'
import API from './api/index'
import { ref, onMounted, watch } from 'vue'
import DialogForm from './views/dialog-form'
export default {
	name: 'frameworkuser',
	components: { VSearcher, VTable,DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: false,
				isActive: false,
			},
			columns: [],
			actions: ['add', 'edit', 'detail', 'delete', 'exported', 'imported'],
			events: API,
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
		//table字段
		this.columns = [
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
		]
		API.GetFrameworkRoles().then((res) => {
			this.getFrameworkRolesData = res
		})
		API.GetFrameworkGroups().then((res) => {
			this.getFrameworkGroupsData = res
		})
	},
}
</script>

<style></style>
