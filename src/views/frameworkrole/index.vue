<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :collapse.sync="collapse" @search="querySearch" @reset="queryReset">
				<a-form-item label="角色名称" name="RoleName">
					<a-input type="text" v-model:value="queryInfos.RoleName"></a-input>
				</a-form-item>
				<a-form-item label="角色编码" name="RoleCode" v-show="collapse.isActive">
					<a-input type="text" v-model:value="queryInfos.RoleCode"></a-input>
				</a-form-item>
			</v-searcher>
		</a-col>
		<a-col :span="24">
			<v-table
				ref="vtable"
				:form-items="queryInfos"
				:columns="columns"
				:actions="actions"
				:events="events"
				:useToolBar="true"
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
import apiEvents from './api/index'
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
					actions: ['detail', 'edit','', 'delete'],
				},
			],
			actions: ['add', 'edit', 'detail', 'delete', 'exported', 'imported'],
			events: apiEvents,
			queryInfos: {
				RoleCode: '',
				RoleName: '',
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
}
</script>

<style></style>