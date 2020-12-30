<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :events="$refs" :collapse.sync="collapse">
				<a-form-item label="账户" name="ITCode">
					<a-input type="text" v-model:value="queryInfos.ITCode"></a-input>
				</a-form-item>
				<a-form-item label="姓名" name="Name">
					<a-input type="text" v-model:value="queryInfos.Name"></a-input>
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
	components: { VSearcher, VTable,DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: false,
				isActive: false,
			},
			columns: [],
			fields: [],
			actions: ['add', 'edit', 'detail', 'delete', 'exported', 'imported'],
			events: API,
			queryInfos: {
				ITCode: '',
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
	created() {
		loadJson('frameworkuser').then((res) => {
			this.columns = res.columns
			this.fields = res.fields
		})
		API.GetFrameworkRoles().then((res) => {
			this.getFrameworkRolesData = res
		})
		API.GetFrameworkGroups().then((res) => {
			this.getFrameworkGroupsData = res
		})
	},
}
</script>

<style></style>
