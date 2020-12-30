<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :collapse.sync="collapse" @search="querySearch" @reset="queryReset">
				<a-form-item label="用户组" name="GroupName">
					<a-input type="text" v-model:value="queryInfos.GroupName"></a-input>
				</a-form-item>
				<a-form-item label="用户组编码" name="GroupCode" v-show="collapse.isActive">
					<a-input type="text" v-model:value="queryInfos.GroupCode"></a-input>
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
				<template #IsValid="{ record }">
					<a-switch v-model:checked="record.IsValid" disabled />
				</template>
			</v-table>
			<dialog-form @reSearch="querySearch" :fields="fields"></dialog-form>
		</a-col>
	</a-row>
</template>

<script>
import VSearcher from '@/components/page/v-searcher/index'
import VTable from '@/components/page/v-table/index'
import API from './api/index'
import { ref, onMounted, watch } from 'vue'
import DialogForm from './views/dialog-form'
import { loadJson } from '@/api/baseCURD.js'
export default {
	name: 'frameworkuser',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: false,
				isActive: true,
			},
			columns: [],
			fields: [],
			actions: ['add', 'edit', 'detail', 'delete', 'exported', 'imported'],
			events: API,
			queryInfos: {
				ActionUrl: '',
				ActionTime: [],
			},
		}
	},
	created() {
		loadJson('frameworkgroup').then((res) => {
			this.columns = res.columns
			this.fields = res.fields
		})
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
