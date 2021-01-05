<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-table
				ref="vtable"
				:form-items="queryInfos"
				:columns="columns"
				:actions="actions"
				:events="events"
				:pagination="false"
				:useToolBar="true"
				:useTree="true"
				bordered
			>
				<template #toolbar>
					<a-button @click="$refs.vtable.doSearch(false)">刷新</a-button>
				</template>
				<template #ICon="{ text }">
					<v-icon :icon="text"></v-icon>
				</template>
			</v-table>
			<dialog-form @reSearch="querySearch" :fields="fields"></dialog-form>
		</a-col>
	</a-row>
</template>

<script>
import VTable from '@/components/page/v-table/index'
import DialogForm from './views/dialog-form'
import apiEvents from './api/index'
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
					actions: ['detail', 'edit', 'delete'],
				},
			],
			actions: ['add', 'edit', 'detail', 'delete'],
			events: apiEvents,
			queryInfos: {
				PageName: '',
			},
		}
	},
	methods: {
		querySearch() {
			this.$refs.vtable.doSearch()
		},
	},
}
</script>

<style></style>
