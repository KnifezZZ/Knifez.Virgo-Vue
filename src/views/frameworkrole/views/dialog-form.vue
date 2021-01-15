<template>
	<v-form-dialog :use-dialog="false">
		<v-form :fields="fields" :events="events" @closed="closed" @inited="inited">
			<template #Pages="{disabled}">
				<a-card>
					<a-table :data-source="pages" rowKey="ID" :pagination="false">
						<a-table-column key="Name" title="菜单" data-index="Name" />
						<a-table-column key="AllActions" title="权限" data-index="AllActions">
							<template #default="{ text,record }">
								<v-checkbox-group
									:name="record.Name"
									:canCheckedAll="true"
									:checkedOptions="record.Actions"
									:options="text"
									@change="onChange($event, record)"
									:disabled="disabled"
								/>
							</template>
						</a-table-column>
					</a-table>
				</a-card>
			</template>
		</v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import actions from '../api/index'
import request from '@/utils/request'
import VCheckboxGroup from '@c/v-checkbox-group/index'
import { isArray } from '../../../utils/validate'
export default {
	name: 'frameworkRole-dialog',
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
					title: '用户组编码',
					key: 'RoleCode',
					type: 'input',
					span: 8,
				},
				{
					title: '用户组名称',
					key: 'RoleName',
					type: 'input',
					span: 8,
				},
				{
					title: '备注',
					key: 'RoleRemark',
					type: 'input',
					span: 16,
				},
				{
					title: '菜单权限',
					key: 'Pages',
					isInclude: false,
					isSlot: true,
				},
			],
			pages: [],
		}
	},
	methods: {
		inited(data) {

			request({
				...actions.GetPageActions,
				data: { id: data.formData.ID },
			}).then((res) => {
				this.pages = res.Pages
			})
		},
		closed(data) {
			if (data) {
				debugger
				let selectPages = this.pages.filter((ele) => {
					if (ele.Actions.length > 0) {
						return {
							Actions: ele.Actions,
						}
					}
				})
				request({
					...actions.EditPrivilege,
					data: { Pages: selectPages, Entity: data },
				}).then((res) => {})
				this.$emit('reSearch')
			}
		},
		onChange(checkedList, record) {
			if (isArray(checkedList)) {
				record.Actions = checkedList
			}
		},
	},
}
</script>
