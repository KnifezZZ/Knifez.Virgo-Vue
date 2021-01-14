<template>
	<v-form-dialog :use-dialog="true">
		<v-form :fields="fields" :events="events" :rules="rules" @closed="closed"></v-form>
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
					title: '类别名称',
					key: 'Name',
					type: 'input',
				},
				{
					title: '类别描述',
					key: 'Description',
					type: 'input',
				},
				{
					title: '图标',
					key: 'Icon',
					type: 'input',
				},
				{
					title: '静态地址',
					key: 'Url',
					type: 'input',
				},
				{
					title: '排序',
					key: 'Sort',
					type: 'input',
				},
				{
					title: '父目录',
					key: 'ParentId',
					type: 'treeSelect',
					props: {
						items: [],
						loadData: apiEvents.getBlogCategoryList,
					},
				},
				{
					key: 'ID',
					type: 'input',
					hidden: true,
				},
			],
			rules: {
				Name: [{ required: true, message: '类别名称是必填项', trigger: 'change' }],
			},
		}
	},
	methods: {
		closed(res) {
			if (res) {
				this.$emit('reSearch')
			}
		},
	},
}
</script>
