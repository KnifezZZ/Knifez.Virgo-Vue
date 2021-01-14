<template>
	<v-form-dialog :use-dialog="false">
		<v-form :fields="fields" :events="events" @closed="closed">
			<template #Password="{record}">
				<a-input-password v-model:value="record.Password"></a-input-password>
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
import { GenderEnumTypes } from '@/configs/enums'
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
						action: 'UploadImage',
						accept: ['.png', '.jpg', '.jpeg'],
						limit: 1,
					},
					span: 12,
				},
				{
					title: '性别',
					key: 'Gender',
					type: 'radio',
					props: {
						items: GenderEnumTypes,
					},
					span: 12,
				},
				{
					title: '邮箱',
					key: 'Email',
					type: 'input',
					span: 6,
				},
				{
					title: '手机号码',
					key: 'CellPhone',
					type: 'input',
					span: 6,
				},
				{
					title: '地址',
					key: 'Address',
					type: 'input',
					span: 8,
				},
				{
					title: '角色组',
					key: 'SelectedRolesIDs',
					type: 'select',
					isInclude: false,
					props: {
						mode: 'multiple',
						items: [],
						loadData: apiEvents.GetFrameworkRoles,
					},
					span: 12,
				},
				{
					title: '用户组',
					key: 'SelectedGroupIDs',
					type: 'select',
					isInclude: false,
					props: {
						mode: 'multiple',
						items: [],
						loadData: apiEvents.GetFrameworkGroups,
					},
					span: 8,
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
		}
	},
	methods: {
		closed() {
			this.$emit('reSearch')
		},
	},
}
</script>
