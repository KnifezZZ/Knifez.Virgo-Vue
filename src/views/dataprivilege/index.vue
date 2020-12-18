<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :events="$refs" :collapse.sync="collapse">
				<a-form-item label="访问地址" name="ActionUrl">
					<a-input type="text" v-model:value="queryInfos.ActionUrl"></a-input>
				</a-form-item>
				<a-form-item label="方法" name="ActionName" v-show="collapse.isActive">
					<a-input type="text" v-model:value="queryInfos.ActionName"></a-input>
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
export default {
	name: 'dataprivilege',
	components: { VSearcher, VTable },
	data() {
		return {
			collapse: {
				needCollapse: true,
				isActive: false,
			},
			columns: [],
			actions: ['add', 'edit', 'detail', 'delete', 'export'],
			events: API,
			queryInfos: {
				ActionUrl: '',
				ActionTime: [],
			},
		}
	},
	created() {
		//table字段
		this.columns = [
			{ key: 'Name', title: '授权对象' },
			{ key: 'TableName', title: '权限名称' },
			{ key: 'RelateIDs', title: '权限' },
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
