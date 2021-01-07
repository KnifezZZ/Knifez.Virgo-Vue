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
	name: 'frameworkRole-dialog',
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
					key: 'RoleCode',
					type: 'input',
				},
				{
					title: '用户组名称',
					key: 'RoleName',
					type: 'input',
				},
				{
					title: '备注',
					key: 'RoleRemark',
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
