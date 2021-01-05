<template>
	<v-form-dialog :use-dialog="false">
		<v-form :fields="fields" :events="events" @reSearch="reSearch"></v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import apiEvents from '../api/index'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
	name: 'frameworkmenu-dialog',
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
					title: '账号',
					key: 'ITCode',
					type: 'input',
				},
				{
					title: '密码',
					key: 'Password',
					type: 'input',
					hidden: '!add',
				},
				{
					title: '姓名',
					key: 'Name',
					type: 'input',
				},
				{
					title: '头像',
					key: 'PhotoId',
					type: 'input',
				},
				{
					title: '邮箱',
					key: 'Email',
					type: 'input',
				},
				{
					title: '性别',
					key: 'Sex',
					type: 'input',
				},
				{
					title: '手机号码',
					key: 'CellPhone',
					type: 'input',
				},
				{
					title: '固话',
					key: 'HomePhone',
					type: 'input',
				},
				{
					title: '地址',
					key: 'Address',
					type: 'input',
				},
				{
					title: '邮编',
					key: 'ZipCode',
					type: 'input',
				},
				{
					title: '是否启用',
					key: 'IsValid',
					type: 'input',
				},
			],
			getFrameworkRolesData: [],
			getFrameworkGroupsData: [],
		}
	},
	methods: {
		reSearch() {
			this.$emit('reSearch')
		},
	},
	created() {
		apiEvents.GetFrameworkRoles().then((res) => {
			this.getFrameworkRolesData = res
		})
		apiEvents.GetFrameworkGroups().then((res) => {
			this.getFrameworkGroupsData = res
		})
	},
}
</script>
