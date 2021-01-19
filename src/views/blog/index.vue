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
				:events="events"
				:useToolBar="true"
				:useTree="false"				
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
import _request from '@/utils/request'
import { ref, onMounted, watch } from 'vue'
import DialogForm from './views/dialog-form'
import {StatusTypes,} from '@/configs/enums.js'
export default {
	name: 'blog',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: false,
				isActive: true,
			},
			columns: [
				{ key: 'Title', title: '标题' },
				{ key: 'Description', title: '摘要' },
				{ key: 'Keywords', title: '关键字' },
				{ key: 'BlogCategory_Name', title: '博客类别' },
				{ key: 'BlogClassification_Name', title: '个人分类' },
				{ key: 'VisitCount', title: '访问量' },
				{ key: 'Status', title: '状态' },
				{ key: 'Url', title: '静态地址' },
				{
					title: '操作',
					isOperate: true,
					actions: { Detail: actions.Detail,Edit: actions.Edit, Delete: actions.Delete },
				},
			],
			events: actions,
			queryFields: [
				{
					title: '标题',
					key: 'Title',
					type: 'input'
				},
				{
					title: '状态',
					key: 'Status',
					type: 'select',
					props: {
						items: StatusTypes,
					}
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

