<template>
	<v-form-dialog :use-dialog="true">
		<v-form :fields="fields" :events="events" @closed="closed"></v-form>
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
					title: '用户组编码',
					key: 'GroupCode',
					type: 'input',
				},
				{
					title: '用户组名称',
					key: 'GroupName',
					type: 'input',
				},
				{
					title: '备注',
					key: 'GroupRemark',
					type: 'input',
				},
			],
		}
	},
	methods: {
		closed() {
			this.$emit('reSearch')
		},
	},
}
</script>
