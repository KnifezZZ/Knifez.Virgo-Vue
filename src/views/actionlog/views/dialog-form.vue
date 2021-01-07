<template>
	<v-form-dialog :use-dialog="true">
		<v-form :fields="fields" :events="events" @reSearch="reSearch"></v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import apiEvents from '../api/index'
export default {
	name: 'frameworkgroup-dialog',
	components: {
		VForm,
		VFormDialog,
	},
	data() {
		return {
			events: apiEvents,
			fields: [
				{
					key: 'ID',
					type: 'input',
					hidden: true,
				},
				{
					title: '模块',
					key: 'ActionName',
					type: 'input',
				},
				{
					title: '方法',
					key: 'ModuleName',
					type: 'input',
				},
				{
					title: '操作账户',
					key: 'ITCode',
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
					type: 'input',
				},
				{
					title: '耗时',
					key: 'Duration',
					type: 'input',
				},
				{
					title: '备注',
					key: 'Remark',
					type: 'input',
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
