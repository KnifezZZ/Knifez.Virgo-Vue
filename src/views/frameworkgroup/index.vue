<template>
	<a-row :gutter="[16, 16]">
		<a-col :span="24">
			<v-searcher :events="$refs" :collapse.sync="collapse">
				<a-form-item label="访问地址" name="ActionUrl">
					<a-input type="text" v-model:value="queryInfos.ActionUrl"></a-input>
				</a-form-item>
				<a-form-item label="方法" name="ActionName" v-show="collapse.isActive">
					<a-input type="text" v-model:value="queryInfos.ActionName"></a-input>
				</a-form-item>
			</v-searcher>
		</a-col>
		<a-col :span="24">
			<v-table
				ref="vtable"
				:form-items="queryInfos"
				:useToolBar="true"
				:columns="columns"
				:actions="actions"
				:events="events"
				bordered
			>
				<template #toolbar> </template>
				<template #IsValid="{ record }">
					<a-switch v-model:checked="record.IsValid" disabled />
				</template>
			</v-table>

			<a-modal :destroyOnClose="true" v-model:visible="dialogInfo.visible" :title="dialogInfo.title" :footer="false">
				<dialog-form :status="formStatus" :id="formId"></dialog-form>
			</a-modal>
		</a-col>
	</a-row>
</template>

<script>
import VSearcher from '@/components/page/v-searcher/index'
import VTable from '@/components/page/v-table/index'
import API from './api/index'
import { ref, onMounted, watch } from 'vue'
import DialogForm from './views/dialog-form'
export default {
	name: 'frameworkuser',
	components: { VSearcher, VTable, DialogForm },
	data() {
		return {
			collapse: {
				needCollapse: true,
				isActive: false,
			},
			columns: [],
			actions: ['add', 'edit', 'detail', 'delete', 'exported', 'imported'],
			events: API,
			queryInfos: {
				ActionUrl: '',
				ActionTime: [],
			},
			dialogInfo: {
				visible: false,
				title: '编辑',
			},
			formStatus: 'detail',
			formId: '',
		}
	},
	created() {
		//table字段
		this.columns = [
			{ key: 'GroupCode', title: '用户组编号' },
			{ key: 'GroupName', title: '用户组名称' },
			{ key: 'GroupRemark', title: '备注' },
			{
				title: '操作',
				isOperate: true,
				actions: ['detail', 'edit', 'delete'],
			},
		]
	},
	mounted() {
		let _this = this
		this.$refs.vtable.doView = function(record) {
			_this.formId = record.ID
			_this.formStatus = 'detail'
			_this.dialogInfo = {
				visible: true,
				title: '查看',
			}
		}
		this.$refs.vtable.doAdd = function(record) {
			_this.formId = record.ID
			_this.formStatus = 'add'
			_this.dialogInfo = {
				visible: true,
				title: '添加',
			}
		}
		this.$refs.vtable.doEdit = function(record) {
			_this.formId = record.ID
			_this.formStatus = 'edit'
			_this.dialogInfo = {
				visible: true,
				title: '添加',
			}
		}
	},
}
</script>

<style></style>
