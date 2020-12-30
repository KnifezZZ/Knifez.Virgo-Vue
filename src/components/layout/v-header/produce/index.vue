<template>
	<a-row>
		<a-col :span="8">
			<a-list item-layout="horizontal" :data-source="data" :bordered="true" header="Head">
				<template #renderItem="{ item }">
					<a-list-item @click="getFields(item.Value)">
						<a-list-item-meta :title="item.Text" :description="item.Value"> </a-list-item-meta>
					</a-list-item>
				</template>
			</a-list>
		</a-col>
		<a-col :span="16">
			<a-row>
				<a-col :span="12">
					<a-form-item label="模块名称">
						<a-input v-model:value="codeModel.ModelName" placeholder="请输入模块名称" type="text" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="生成菜单">
						<a-switch v-model:checked="codeModel.IsInsertMenu" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-table :data-source="tableData" :pagination="false">
				<a-table-column title="字段" key="FieldName" data-index="FieldName"></a-table-column>
				<a-table-column title="描述" key="FieldDes" data-index="FieldDes"></a-table-column>
				<a-table-column title="关联表显示字段" key="SubField" data-index="SubField">
					<template #default="{record}">
						<a-select v-model:checked="record.SubField">

						</a-select>
					</template>
				</a-table-column>
				<a-table-column title="查询" key="IsSearcherField" data-index="IsSearcherField">
					<template #default="{record}">
						<a-switch v-model:checked="record.IsSearcherField" />
					</template>
				</a-table-column>
				<a-table-column title="列表" key="IsListField" data-index="IsListField">
					<template #default="{record}">
						<a-switch v-model:checked="record.IsListField" />
					</template>
				</a-table-column>
				<a-table-column title="表单" key="IsFormField" data-index="IsFormField">
					<template #default="{record}">
						<a-switch v-model:checked="record.IsFormField" />
					</template>
				</a-table-column>
				<a-table-column title="导入" key="IsImportField" data-index="IsImportField">
					<template #default="{record}">
						<a-switch v-model:checked="record.IsImportField" />
					</template>
				</a-table-column>
			</a-table>
		</a-col>
	</a-row>
</template>

<script>
import request from '@/utils/request'
export default {
	name: 'Virgo-Produce',
	data() {
		return {
			current: 0,
			data: [],
			tableData: [],
			codeModel: {
				ModelName: '',
				IsInsertMenu: true,
			},
		}
	},
	methods: {
		getFields(info) {
			request({
				url: 'api/_VGen/GetModelFields?modelName=' + info,
				method: 'get',
			}).then((res) => {
				this.tableData = res
				debugger
			})
		},
		loadModels() {
			request({
				url: 'api/_VGen/GetModelList',
				method: 'get',
			}).then((res) => {
				this.data = res
			})
		},
	},
	setup() {
		return {}
	},
	created() {
		this.loadModels()
	},
}
</script>

<style lang="scss" scoped></style>
