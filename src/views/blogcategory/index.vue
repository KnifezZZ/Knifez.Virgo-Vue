<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :collapse.sync="collapse" :fields="queryFields" :events="events" @search="querySearch" @reset="queryReset">
				<a-form-item label="类别名称" name="Name">
					<a-input type="text" v-model:value="queryInfos.Name"></a-input>
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
				<!-- <template #IsValid="{ record }">
					<a-switch v-model:checked="record.IsValid" disabled />
				</template> -->
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
	name: 'blogCategory',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: false,
				isActive: true,
			},
			columns: [
				{ key: 'Description', title: '类别描述' },
				{ key: 'Icon', title: '图标' },
				{ key: 'Name', title: '类别名称' },
				{ key: 'BlogCategory_Name', title: '所属类别' },
				{ key: 'Sort', title: '排序' },
				{ key: 'Url', title: '静态地址' },
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
					title: '类别名称',
					key: 'Name',
					type: 'input',
				},
			],
			queryInfos: {
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
	setup() {},
}
</script>
