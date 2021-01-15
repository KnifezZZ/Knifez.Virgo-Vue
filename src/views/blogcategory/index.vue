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
				:useTree="true"
				:pagination="false"
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
import actions from './api/index'
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
				{ key: 'Name', title: '类别名称' },
				{ key: 'Description', title: '类别描述' },
				{ key: 'Icon', title: '图标' },
				{ key: 'Url', title: '静态地址' },
				{ key: 'Sort', title: '排序' },
				{ key: 'BlogCategory_Name', title: '父目录' },
				{
					title: '操作',
					isOperate: true,
					actions: ['detail', 'edit', 'delete'],
				},
			],
			actions: ['add', 'edit', 'detail', 'delete', 'exported', 'imported'],
			events: actions,
			queryFields: [
				{
					title: '类别描述',
					key: 'Description',
					type: 'input'
				},
				{
					title: '静态地址',
					key: 'Url',
					type: 'input'
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

