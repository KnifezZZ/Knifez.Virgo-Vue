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
				:useToolBar="true"
				:columns="columns"
				:actions="actions"
				:events="events"
				bordered
			>
				<template #toolbar> </template>
				<template #LogType="{text}">
					<a-tag :color="text == 1 ? 'red' : 'gray'">{{ logTypes[text].Text }}</a-tag>
				</template>
				<template #Duration="{ text }">
					<a-tag :color="text > 0.3 ? 'red' : 'green'"> {{ text }} </a-tag>
				</template>
			</v-table>
			<dialog-form @search="querySearch"></dialog-form>
		</a-col>
	</a-row>
</template>

<script>
import VSearcher from '@/components/page/v-searcher/index'
import VTable from '@/components/page/v-table/index'
import DialogForm from './views/dialog-form'
import actions from './api/index'
import { LogTypeEnum } from '@/configs/enums.js'
export default {
	name: 'actionLog',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: true,
				isActive: false,
			},
			columns: [
				{ key: 'ActionTime', width: 200, title: '执行时间' },
				{ key: 'ModuleName', width: 100, title: '模块' },
				{ key: 'ActionName', width: 100, title: '方法' },
				{ key: 'ActionUrl', width: 300, title: '访问地址' },
				{ key: 'LogType', width: 100, title: '日志类型', isSlot: true },
				{
					key: 'Duration',
					width: 100,
					title: '耗时',
					isSlot: true,
				},
				{ key: 'IP', title: 'IP' },
				{ key: 'Remark', title: '备注' },
				{
					title: '操作',
					isOperate: true,
					actions: ['detail', 'delete'],
				},
			],
			actions: ['detail', 'delete', 'exported', 'imported'],
			events: actions,
			queryFields: [
				{
					title: '操作账户',
					key: 'ITCode',
					type: 'input',
				},
				{
					title: '访问路径',
					key: 'ActionUrl',
					type: 'input',
				},
				{
					title: 'IP',
					key: 'IP',
					type: 'input',
				},
				{
					title: '访问时间',
					key: 'ActionTime',
					type: 'dataPicker',
				},
			],
			queryForm: {},
			logTypes: LogTypeEnum,
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
