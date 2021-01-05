<template>
	<v-form-dialog :use-dialog="false">
		<v-form :fields="fields" :events="events" @reSearch="reSearch">
			<template #Password="formData">
				<a-input-password v-model:value="formData.Password"></a-input-password>
			</template>
		</v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import apiEvents from '../api/index'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { SexEnumTypes } from '@/configs/enums'
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
					isSlot: true,
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
					type: 'upload',
					props: {
						limit: 1,
					},
				},
				{
					title: '邮箱',
					key: 'Email',
					type: 'select',
					props: {
						mode: 'multiple',
						items: SexEnumTypes,
					},
				},
				{
					title: '性别',
					key: 'Sex',
					type: 'radio',
					props: {
						items: SexEnumTypes,
					},
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
					type: 'switch',
					props: {
						checkedChildren: '启用',
						unCheckedChildren: '禁用',
					},
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
