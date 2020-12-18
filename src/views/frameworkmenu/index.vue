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
		</a-col>
	</a-row>
</template>

<script>
import VTable from '@/components/page/v-table/index'
import API from './api/index'
import { ref, onMounted, watch } from 'vue'
export default {
	name: 'frameworkmenu',
	components: { VTable },
	data() {
		return {
			collapse: {
				needCollapse: true,
				isActive: false,
			},
			columns: [],
			actions: ['add', 'edit', 'detail', 'delete'],
			events: API,
			queryInfos: {
				PageName: '',
			},
		}
	},
	created() {
		//table字段
		this.columns = [
			{ key: 'PageName', title: '页面名称' },
			{ key: 'DisplayOrder', title: '顺序' },
			{ key: 'ICon', title: '图标', isSlot: true },
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
