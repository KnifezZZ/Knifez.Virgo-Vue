<template>
	<a-card>
		<a-row>
			<template v-for="item in fields.filter((x) => !x.hidden)">
				<template v-if="item.isSlot">
					<a-col :key="item.key" :span="item.span ? item.span : 8">
						<a-form-item
							:labelCol="{ span: item.span ? 48 / item.span : 6 }"
							:wrapper-col="{ span: 16 }"
							:label="item.title"
							:name="item.key"
						>
							<template v-slot[`index`]>
								<slot :name="item.key" v-bind="formData" />
							</template>
						</a-form-item>
					</a-col>
				</template>
				<template v-else>
					<a-col :key="item.key" :span="item.span ? item.span : 8">
						<a-form-item
							:labelCol="{ span: item.span ? 48 / item.span : 6 }"
							:wrapper-col="{ span: 16 }"
							:label="item.title"
							:name="item.key"
						>
							<template v-if="item.type === 'select'">
								<a-select
									:mode="item.props.mode"
									placeholder="请选择"
									v-model:value="formData[item.key]"
									allowClear
									style="width: 100%"
								>
									<a-select-option v-for="option in item.props.items" :key="option" :value="option.Value">
										{{ option.Text }}
									</a-select-option>
								</a-select>
							</template>
							<template v-else-if="item.type === 'treeSelect'">
								<a-tree-select
									v-model:value="formData[item.key]"
									style="width: 100%"
									:dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
									:tree-data="item.props.items"
									:replace-fields="{ children: 'children', title: 'Text', key: 'Value', value: 'Value' }"
									:tree-checkable="item.props.treeCheckable ? item.props.treeCheckable : false"
									placeholder="请选择"
								/>

								<!-- :replace-fields="{ children: 'children', title: 'Text', key: 'Value', value: 'Value' }" -->
							</template>
							<template v-else-if="item.type === 'switch'">
								<a-switch
									:checked-children="item.props ? item.props.checkedChildren : '开'"
									:un-checked-children="item.props ? item.props.unCheckedChildren : '关'"
									v-model:checked="formData[item.key]"
								/>
							</template>
							<template v-else-if="item.type === 'datePicker'">
								<a-range-picker v-model:value="formData[item.key]" style="width: 100%;" />
							</template>
							<template v-else-if="item.type === 'radio'">
								<a-radio-group :name="item.key" v-model:value="formData[item.key]" button-style="solid">
									<template v-if="item.props.button">
										<a-radio-button v-for="rad in item.props.items" :key="rad.Value" :value="rad.Value">
											{{ rad.Text }}
										</a-radio-button>
									</template>
									<template v-else>
										<a-radio v-for="rad in item.props.items" :key="rad.Value" :value="rad.Value">
											{{ rad.Text }}
										</a-radio>
									</template>
								</a-radio-group>
							</template>
							<template v-else>
								<a-input type="text" v-model:value="formData[item.key]"></a-input>
							</template>
						</a-form-item>
					</a-col>
				</template>
			</template>
			<a-col :span="4" :offset="2">
				<a-button @click="resetClick"><v-icon icon="refresh"></v-icon> 重置</a-button>
				<a-button-group>
					<a-button type="primary" @click="queryClick"><v-icon icon="search"></v-icon> 查询</a-button>
					<a-button v-if="collapse.needCollapse" type="primary" style="padding:2px" @click="collapseQueryColumns">
						<v-icon icon="arrow-drop-down"></v-icon>
					</a-button>
				</a-button-group>
			</a-col>
		</a-row>
	</a-card>
</template>

<script>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { fileUploadOptions } from '@/configs/index'
import { getTreeData } from '@/utils/tool'
export default {
	name: 'VSearcher',
	props: {
		collapse: {
			type: Object,
			default: function() {
				return {
					needCollapse: false,
					isActive: true,
				}
			},
		},
		events: {
			type: Object,
			required: true,
		},
		fields: {
			type: Array,
			required: true,
		},
	},
	setup(props, context) {
		const collapseQueryColumns = () => {
			// eslint-disable-next-line vue/no-mutating-props
			props.collapse.isActive = !props.collapse.isActive
		}
		let formData = ref({})
		props.fields.forEach((item) => {
			if (item.type === 'select') {
				if (item.props.items.length === 0) {
					item.props.loadData().then((res) => {
						item.props.items = res
					})
				}
			}
			if (item.type === 'treeSelect') {
				if (item.props.items.length === 0) {
					item.props.loadData().then((res) => {
						item.props.items = getTreeData(res, 'ParentId', 'Value', '')
					})
				}
			}
		})

		return {
			formData,
			collapseQueryColumns,
		}
	},
	methods: {
		queryClick() {
			this.$emit('search', this.formData)
		},
		resetClick() {
			this.$emit('reset')
		},
	},
}
</script>

<style></style>
