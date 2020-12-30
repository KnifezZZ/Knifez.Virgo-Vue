<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :events="$refs" :collapse.sync="collapse">
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
		</a-col>
	</a-row>
</template>

<script>
import VSearcher from '@/components/page/v-searcher/index'
import VTable from '@/components/page/v-table/index'
import API from './api/index'
import { ref, onMounted, watch } from 'vue'
import { loadJson } from '@/api/baseCURD.js'
export default {
	name: 'frameworkuser',
	components: { VSearcher, VTable },
	data() {
		return {
			collapse: {
				needCollapse: true,
				isActive: false,
			},
			columns: [],
			actions: ['add', 'edit', 'detail', 'delete', 'exported', 'imported'],
			events: API,
			queryInfos: {
				RoleCode: '',
				RoleName: '',
			},
		}
	},
	created() {
		//table字段
		this.columns = [
			{ key: 'RoleCode', title: '角色编号' },
			{ key: 'RoleName', title: '角色名称' },
			{ key: 'RoleRemark', title: '备注' },
			{
				title: '操作',
				isOperate: true,
				actions: ['detail', 'edit', 'delete'],
			},
		]
	},
	mounted() {},
}
</script>

<style></style>
