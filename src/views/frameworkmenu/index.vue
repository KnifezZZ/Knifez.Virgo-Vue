<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-table
				ref="vtable"
				:form-items="queryForm"
				:columns="columns"
				:events="events"
				:useToolBar="true"
				:useTree="true"
				:pagination="false"
				bordered
			>
				<template #toolbar>
					<a-button @click="querySearch">刷新</a-button>
				</template>
				<template #ICon="{ text }">
					<v-icon :icon="text"></v-icon>
				</template>
			</v-table>
			<dialog-form @reSearch="querySearch"></dialog-form>
		</a-col>
	</a-row>
</template>

<script>
import VTable from '@/components/page/v-table/index'
import DialogForm from './views/dialog-form'
import actions from './api/index'
import { ref, onMounted, watch } from 'vue'
export default {
	name: 'frameworkMenu',
	components: { VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: true,
				isActive: false,
			},
			columns: [
				{ key: 'PageName', title: '页面名称' },
				{ key: 'DisplayOrder', title: '顺序' },
				{ key: 'ICon', title: '图标', isSlot: true },
				{
					title: '操作',
					isOperate: true,
					actions: { Detail: actions.Detail,Edit: actions.Edit, Delete: actions.Delete },
				},
			],
			events: actions,
			queryForm: {
				PageName: '',
			},
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
