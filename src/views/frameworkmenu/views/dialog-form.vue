<template>
	<v-form-dialog :use-dialog="false">
		<v-form
			layout="inline"
			:fields="fields"
			:events="events"
			:rules="rules"
			@closed="closed"
			@doInit="doInit"
			@inited="inited($event)"
			@beforeSubmit="beforeSubmit"
		>
			<template #ICon="{record}">
				<a-input v-model:value="record.ICon">
					<template #addonAfter> <v-icon :icon="record.ICon"></v-icon> </template>
				</a-input>
			</template>
			<template #ModuleName="{record}">
				<a-select
					placeholder="请选择"
					v-model:value="record.ModuleName"
					@select="moduleSelect"
					allowClear
					style="width: 100%"
				>
					<a-select-option v-for="option in modules" :key="option" :value="option.Value">
						{{ option.Text }}
					</a-select-option>
				</a-select>
			</template>
			<template #SelectedActionIDs="{record}">
				<a-select
					mode="multiple"
					placeholder="请选择"
					v-model:value="record.SelectedActionIDs"
					allowClear
					style="width: 100%"
				>
					<a-select-option v-for="option in moduleActions" :key="option" :value="option.Value">
						{{ option.Text }}
					</a-select-option>
				</a-select>
			</template>
		</v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import apiEvents from '../api/index'
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
					key: 'ModuleName',
					title: '绑定模块',
					isSlot: true,
					span: 8,
				},
				{
					key: 'ICon',
					title: '图标',
					isSlot: true,
					type: 'input',
					span: 8,
				},
				{
					key: 'SelectedActionIDs',
					title: '动作',
					isSlot: true,
				},
				{
					key: 'PageName',
					title: '页面名称',
					type: 'input',
					span: 8,
				},
				{
					key: 'ParentId',
					title: '父级菜单',
					type: 'select',
					props: {
						items: [],
						loadData: apiEvents.getFolders,
					},
					span: 8,
				},
				{
					key: 'Url',
					title: '外部地址',
					type: 'input',
				},
				{
					key: 'DisplayOrder',
					title: '排序',
					type: 'input',
					span: 6,
				},
				{
					key: 'ShowOnMenu',
					title: '菜单展示',
					type: 'switch',
					span: 8,
				},
				{
					key: 'FolderOnly',
					title: '目录',
					type: 'switch',
					span: 8,
				},
				{
					key: 'IsPublic',
					title: '是否公开',
					type: 'switch',
					span: 8,
				},
			],
			rules: {
				ModuleName: [{ required: true, message: '请选择绑定模块', trigger: 'change' }],
			},
			modules: [],
			moduleActions: [],
		}
	},
	methods: {
		closed() {
			this.$emit('reSearch')
		},
		doInit() {
			apiEvents.getModules().then((res) => {
				this.modules = res
			})
		},
		inited(data) {
			this.moduleSelect(data.ModuleName)
		},
		beforeSubmit(payload, callback) {
			payload.SelectedModule=payload.Entity.ModuleName
			callback(payload)
		},
		moduleSelect(value) {
			console.log(value)
			if (value !== '' && value !== null) {
				apiEvents.getActionsByName({ ModelName: value }).then((res) => {
					this.moduleActions = res
				})
			}
		},
	},
}
</script>
