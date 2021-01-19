<template>
	<v-form-dialog :use-dialog="false">
		<v-form :fields="fields" :events="events" :rules="rules" @closed="closed"></v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import actions from '../api/index'
import _request from '@/utils/request'
import { onMounted, ref } from 'vue'
import {StatusTypes,} from '@/configs/enums.js'
export default {
	name: 'blog-dialog',
	components: {
		VForm,
		VFormDialog,
	},
	data() {
		return {
			events: actions,
			fields: [
				{
					title: '标题',
					key: 'Title',
					type: 'input'
				},
				{
					title: '摘要',
					key: 'Description',
					type: 'input'
				},
				{
					title: '关键字',
					key: 'Keywords',
					type: 'input'
				},
				{
					title: '正文',
					key: 'BodyText',
					type: 'input'
				},
				{
					title: '博客类别',
					key: 'BlogCategoryId',
					type: 'treeSelect',
					props: {
						items: [],
						loadData:actions.GetBlogCategoryList,
					}
				},
				{
					title: '个人分类',
					key: 'BlogClassificationMiddle',
					type: 'select',
					props: {
						mode: 'multiple',
						items: [],
						loadData:actions.GetBlogClassificationList,
					}
				},
				{
					title: '是否单页',
					key: 'IsSinglePage',
					type: 'switch'
				},
				{
					title: '访问量',
					key: 'VisitCount',
					type: 'input'
				},
				{
					title: '状态',
					key: 'Status',
					type: 'radio',
					props: {
						items: StatusTypes,
					}
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
			rules: {
				Title: [{ required: true, message: '标题 不能为空', trigger: 'change' }],
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

