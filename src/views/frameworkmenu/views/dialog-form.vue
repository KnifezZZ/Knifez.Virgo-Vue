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
			<template #ICon="{record, disabled}">
				<a-input v-model:value="record.ICon" :disabled="disabled">
					<template #addonAfter> <v-icon :icon="record.ICon"></v-icon> </template>
				</a-input>
			</template>
			<template #ModuleName="{record, disabled}">
				<a-select
					placeholder="请选择"
					v-model:value="record.ModuleName"
					@select="moduleSelect"
					allowClear
					style="width: 100%"
					:disabled="disabled"
				>
					<a-select-option v-for="option in modules" :key="option" :value="option.Value">
						{{ option.Text }}
					</a-select-option>
				</a-select>
			</template>
			<template #SelectedActionIDs="{record, disabled}">
				<v-checkbox-group
					:canCheckedAll="true"
					:checkedOptions="record.SelectedActionIDs"
					:options="moduleActions"
					@change="onChange($event, record)"
					:disabled="disabled"
				>
				</v-checkbox-group>
			</template>
		</v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import actions from '../api/index'
import request from '@/utils/request'
import { isArray } from '../../../utils/validate'
import VCheckboxGroup from '@c/v-checkbox-group/index'
export default {
	name: 'frameworkmenu-dialog',
	components: {
		VForm,
		VFormDialog,
		VCheckboxGroup,
	},
	data() {
		return {
			events: actions,
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
					isInclude: false,
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
						loadData: actions.GetFolders,
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
			currentModule: '',
		}
	},
	methods: {
		closed(res) {
			if (res) {
				this.$emit('reSearch')
			}
		},
		doInit() {
			request({
				...actions.GetModules,
			}).then((res) => {
				this.modules = res
			})
		},
		inited(data) {
			this.moduleSelect(data.res.SelectedModule)
		},
		beforeSubmit(payload, callback) {
			payload.SelectedModule = this.currentModule
			callback(payload)
		},
		moduleSelect(value) {
			this.currentModule = value
			if (value !== '' && value !== null) {
				request({
					...actions.GetActionsByName,
					data: { ModelName: value },
				}).then((res) => {
					this.moduleActions = res
				})
			}
		},
		onChange(checkedList, record) {
			if (isArray(checkedList)) {
				record.SelectedActionIDs = checkedList
			}
		},
	},
}
</script>
