<template>
	<v-form-dialog :use-dialog="true">
		<v-form :fields="fields" :events="events" @reSearch="reSearch"></v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import apiEvents from '../api/index'
import { onMounted, ref } from 'vue'

export default {
	name: 'blogCategory-dialog',
	components: {
		VForm,
		VFormDialog,
	},
	data() {
		return {
			events: apiEvents,
			fields: [
				{
					title: '类别描述',
					key: 'Description',
					type: 'input'
				},
				{
					title: '图标',
					key: 'Icon',
					type: 'input'
				},
				{
					title: '类别名称',
					key: 'Name',
					type: 'input'
				},
				{
					title: 'Parent',
					key: 'ParentId',
					type: 'treeSelect',
					props: {
						items: [],
						loadData: apiEvents.getBlogCategoryList,
					}
				},
				{
					title: '排序',
					key: 'Sort',
					type: 'input'
				},
				{
					title: '静态地址',
					key: 'Url',
					type: 'input'
				},
				{
					key: 'ID',
					type: 'input',
					hidden: true,
				},
			],
		}
	},
	methods: {
		reSearch() {
			this.$emit('reSearch')
		},
	},
}
</script>

