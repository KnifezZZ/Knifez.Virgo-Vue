<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :collapse.sync="collapse" @search="querySearch" @reset="queryReset">
				<a-form-item label="访问时间" name="ActionTime">
					<a-range-picker v-model:value="queryInfos.ActionTime" allowClear />
				</a-form-item>
				<a-form-item label="访问地址" name="ActionUrl">
					<a-input type="text" v-model:value="queryInfos.ActionUrl"></a-input>
				</a-form-item>
				<a-form-item label="日志类型" name="LogType">
					<a-select v-model:value="queryInfos.LogType" mode="multiple" placeholder="请选择" style="width:200px">
						<a-select-option v-for="i in logTypes" :key="i.Value">
							{{ i.Text }}
						</a-select-option>
					</a-select>
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
				<template #LogType="{text}">
					<a-tag :color="text == 1 ? 'red' : 'gray'">{{ logTypes[text].Text }}</a-tag>
				</template>
				<template #Duration="{ text }">
					<a-tag :color="text > 0.15 ? 'red' : 'green'"> {{ text }} </a-tag>
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
import API from './api/index'
import { LogTypeEnum } from '@/views/enums.js'
export default {
	name: 'actionlog',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: true,
				isActive: false,
			},
			columns: [],
			actions: ['detail', 'delete', 'exported', 'imported'],
			events: API,
			queryInfos: {
				ActionUrl: '',
				ActionTime: [],
				LogType: [],
			},
			logTypes: LogTypeEnum,
		}
	},
	created() {
		//table字段
		this.columns = [
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
		]
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
