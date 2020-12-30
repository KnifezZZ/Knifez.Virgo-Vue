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
import API from './api/index'
import { ref, onMounted, watch } from 'vue'
import { loadJson } from '@/api/baseCURD.js'
export default {
	name: 'frameworkmenu',
	components: { VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: true,
				isActive: false,
			},
			columns: [],
			fields: [],
			actions: ['add', 'edit', 'detail', 'delete'],
			events: API,
			queryInfos: {
				PageName: '',
			},
		}
	},
	created() {
		loadJson('frameworkmenu').then((res) => {
			this.columns = res.columns
			this.fields = res.fields
		})
	},
	methods: {
		querySearch() {
			this.$refs.vtable.doSearch()
		},
	},
}
</script>

<style></style>
