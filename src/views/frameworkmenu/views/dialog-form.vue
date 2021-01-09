<template>
	<v-form-dialog :use-dialog="false">
		<v-form layout="inline" :fields="fields" :events="events" @reSearch="reSearch">
			<!-- <template #ModuleName="{formData}">
				<a-select
					:mode="formData.ModuleName.props.mode"
					placeholder="请选择"
					v-model:value="formData[item.key]"
					allowClear
					style="width: 100%"
				>
					<a-select-option v-for="option in item.props.items" :key="option" :value="option.Value">
						{{ option.Text }}
					</a-select-option>
				</a-select>
			</template> -->
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
					type: 'select',
					props: {
						items: [],
						loadData: apiEvents.getModules,
					},
					events: {
						select: this.moduleSelect,
					},
					span: 8,
				},
				{
					key: 'Icon',
					title: '图标',
					type: 'input',
					span: 8,
				},
				{
					key: 'SelectedActionIDs',
					title: '动作',
					type: 'select',
					props: {
						mode: 'multiple',
						items: [{}],
					},
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
		}
	},
	methods: {
		moduleSelect(value) {
			debugger
			console.log(value)
		},
		reSearch() {
			this.$emit('reSearch')
		},
	},
}
</script>
