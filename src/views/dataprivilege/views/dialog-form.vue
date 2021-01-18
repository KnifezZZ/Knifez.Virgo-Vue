<template>
	<v-form-dialog width="1200px" :use-dialog="true">
		<a-card>
			<a-radio-group name="IsGroup" v-model:value="isGroup">
				<a-radio :value="0">
					用户组
				</a-radio>
				<a-radio :value="1">
					用户
				</a-radio>
			</a-radio-group>
		</a-card>
		<v-form
			:fields="fields"
			:events="events"
			:rules="rules"
			@doInit="initData"
			@closed="closed"
			@beforeSubmit="beforeSubmit"
		>
		</v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import actions from '../api/index'
import { onMounted, ref } from 'vue'
import router from '../../../router'
import _request from '../../../utils/request'

export default {
	name: 'dataprivilege-dialog',
	components: {
		VForm,
		VFormDialog,
	},
	data() {
		return {
			events: actions,
			isGroup: 0,
			groupFileds: {},
			fields: [
				// {
				// 	title: '权限类型',
				// 	key: 'DpType',
				// 	type: 'radio',
				// 	props: {
				// 		items: [
				// 			{ Text: '用户组', Value: 0 },
				// 			{ Text: '用户', Value: 1 },
				// 		],
				// 	},
				// 	isInclude: false,
				// },
				{
					title: '用户组',
					key: 'GroupId',
					type: 'select',
					props: {
						items: [],
						loadData: actions.GetUserGroups,
					},
				},
				{
					title: '权限名称',
					key: 'TableName',
					type: 'select',
					props: {
						items: [],
						loadData: actions.GetPrivileges,
					},
				},
				{
					title: '全部权限',
					key: 'IsAll',
					type: 'switch',
					isInclude: false,
				},
				{
					title: '允许访问',
					key: 'SelectedItemsID',
					type: 'select',
					isInclude: false,
					props: {
						items: [],
						loadData: actions.GetPrivilegeByTableName,
					},
				},
				{
					key: 'ID',
					type: 'input',
					hidden: true,
				},
			],
			rules: {},
		}
	},
	watch: {
		isGroup(newValue, oldValue) {
			if (newValue === 0) {
				this.fields.splice(0, 1, this.groupFileds)
			} else {
				this.groupFileds = this.fields[0]
				this.fields.splice(0, 1, {
					title: '用户',
					key: 'UserItCode',
					isInclude: false,
					type: 'input',
				})
			}
		},
	},
	methods: {
		beforeSubmit(payload, callback) {
			payload.DpType = this.isGroup
			callback(payload)
		},
		async initData(payload, callback) {
			let res = await _request({
				...actions.Detail,
				data: payload.params,
			})
			if (payload.formStatus != 'Add') {
				this.isGroup = res.DpType
				let data = {}
				if (payload.fields !== undefined) {
					payload.fields.forEach((item) => {
						let fieldValue = res.Entity[item.key]
						if (res[item.key] !== undefined) {
							fieldValue = res[item.key]
						}
						data[item.key] = fieldValue
					})
				}
				payload.formData = data
			}
			callback(payload)
		},
		closed(res) {
			if (res) {
				this.$emit('reSearch')
			}
		},
	},
}
</script>
