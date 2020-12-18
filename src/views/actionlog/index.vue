<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :events="$refs" :collapse.sync="collapse">
				<a-form-item label="访问时间" name="ActionTime">
					<a-range-picker v-model:value="queryInfos.ActionTime" allowClear />
				</a-form-item>
				<a-form-item label="访问地址" name="ActionUrl">
					<a-input type="text" v-model:value="queryInfos.ActionUrl"></a-input>
				</a-form-item>
				<a-form-item label="日志类型" name="LogType">
					<a-select v-model:value="queryInfos.LogType" mode="multiple" placeholder="请选择" style="width:200px">
						<a-select-option v-for="i in logTypes" :key="i.value">
							{{ i.text }}
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
					<a-tag :color="text == 1 ? 'red' : 'gray'">{{ logTypes[text].text }}</a-tag>
				</template>
				<template #Duration="{ text }">
					<a-tag :color="text > 0.15 ? 'red' : 'green'"> {{ text }} </a-tag>
				</template>
			</v-table>
		</a-col>
	</a-row>
</template>

<script>
import VSearcher from '@/components/page/v-searcher/index'
import VTable from '@/components/page/v-table/index'
import API from './api/index'
import { LogTypeEnum } from './config'
import { ref, onMounted, watch } from 'vue'
export default {
	name: 'actionlog',
	components: { VSearcher, VTable },
	data() {
		return {
			collapse: {
				needCollapse: true,
				isActive: false,
			},
			columns: [],
			actions: ['detail', 'delete', 'export', 'import'],
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
			{ key: 'ActionTime', title: '执行时间' },
			{ key: 'ModuleName', title: '模块' },
			{ key: 'ActionName', title: '方法' },
			{ key: 'ActionUrl', title: '访问地址' },
			{ key: 'LogType', title: '日志类型', isSlot: true },
			{
				key: 'Duration',
				title: '耗时',
				width: 200,
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
}
</script>

<style></style>
