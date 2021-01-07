<template>
	<a-card>
		<a-row>
			<template v-for="item in fields.filter((x) => !x.hidden)">
				<template v-if="formStatus === 'detail'">
					<a-col :span="item.span ? item.span : 24" :key="item.key">
						<a-form-item
							:label-col="{ span: item.span ? 48 / item.span : 2 }"
							:wrapper-col="{ span: 16 }"
							:label="item.title"
							:name="item.key"
						>
							{{ formData[item.key] }}
						</a-form-item>
					</a-col>
				</template>
				<template v-else>
					<a-col :span="item.span ? item.span : 24" :key="item.key">
						<template v-if="item.isSlot">
							<a-form-item
								:label-col="{ span: item.span ? 48 / item.span : 2 }"
								:wrapper-col="{ span: 16 }"
								:label="item.title"
								:key="item.key"
								:name="item.key"
							>
								<template v-slot[`index`]>
									<slot :name="item.key" v-bind="formData" />
								</template>
							</a-form-item>
						</template>
						<template v-else>
							<a-form-item
								:label-col="{ span: item.span ? 48 / item.span : 2 }"
								:wrapper-col="{ span: 16 }"
								:label="item.title"
								:key="item.key"
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
										:treeDefaultExpandedKeys="item.props.items.map((x) => x.Value)"
										placeholder="请选择"
									/>
								</template>
								<template v-else-if="item.type === 'upload'">
									<a-upload
										action="api/_file/upload"
										list-type="picture"
										v-model:fileList="formData[item.key]"
										:before-upload="beforeUpload"
										class="upload-list-inline"
									>
										<!-- v-if="formData[item.key].length < item.props.limit" -->
										<a-button>
											<v-icon icon="upload-2"></v-icon>
										</a-button>
									</a-upload>
								</template>
								<template v-else-if="item.type === 'switch'">
									<a-switch
										:checked-children="item.props ? item.props.checkedChildren : '开'"
										:un-checked-children="item.props ? item.props.unCheckedChildren : '关'"
										v-model:checked="formData[item.key]"
									/>
								</template>
								<template v-else-if="item.type === 'datePicker'">
									<a-date-picker v-model:value="formData[item.key]" show-time type="date" style="width: 100%" />
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
						</template>
					</a-col>
				</template>
			</template>
			<a-col :span="24">
				<a-form-item :wrapper-col="{ span: 12, offset: 12 }" v-if="formStatus !== 'detail'">
					<a-button @click="doClose(false)"> 关闭 </a-button>
					<a-button type="primary" @click="doSubmit"> 提交 </a-button>
				</a-form-item>
			</a-col>
		</a-row>
	</a-card>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { closeOnDialog, closeOnTab } from '@/utils/openPage'
import { message } from 'ant-design-vue'
import { fileUploadOptions } from '@/configs/index'
import { getTreeData } from '@/utils/tool'
import { getTreeNode } from '../../../utils/tool'
export default {
	name: 'VForm',
	props: {
		events: {
			type: Object,
			required: true,
		},
		fields: {
			type: Array,
			required: true,
		},
	},
	methods: {
		beforeUpload(file) {
			const isJpgOrPng = fileUploadOptions.UploadTypes.includes(file.type)
			if (!isJpgOrPng) {
				message.error('请上传jpg格式的图片!')
			}
			const isLt2M = file.size < fileUploadOptions.UploadLimit
			if (!isLt2M) {
				message.error('请上传小于2MB的图片!')
			}
			return isJpgOrPng && isLt2M
		},
	},
	setup(props, context) {
		const router = useRouter()
		const store = useStore()
		let dialogConfig = store.getters['app/openDialog']
		let formStatus = ref(dialogConfig.status)
		let formData = ref({})
		//兼容非弹窗展示
		if (!dialogConfig.useDialog) {
			formStatus.value = router.currentRoute.value.params.status
			dialogConfig.id = router.currentRoute.value.params.id
		}
		props.fields.forEach((item) => {
			if (typeof item.hidden === 'string') {
				if (item.hidden.startsWith('!')) {
					item.hidden = formStatus.value !== item.hidden.substr(1)
				} else {
					item.hidden = formStatus.value == item.hidden
				}
			}
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
		// 非添加窗口加载页面数据
		if (formStatus.value !== 'add' && dialogConfig.id != undefined) {
			props.events.detail(dialogConfig.id).then((res) => {
				let data = {}
				if (props.fields !== undefined) {
					props.fields.forEach((item) => {
						data[item.key] = res.Entity[item.key]
						if (item.type === 'treeSelect' || item.type === 'select') {
							data[item.key] = getTreeNode(item.props.items, 'ParentId', 'Value', res.Entity[item.key]).Text
						}
					})
				}
				formData.value = data
			})
		}

		const doClose = (refresh) => {
			if (dialogConfig.useDialog) {
				closeOnDialog()
				if (refresh) {
					context.emit('reSearch')
				}
			} else {
				closeOnTab()
			}
		}
		const doSubmit = () => {
			if (formStatus.value == 'add') {
				props.events.add({ Entity: formData.value }).then((res) => {
					doClose(true)
				})
			}
			if (formStatus.value == 'edit') {
				props.events.edit({ Entity: formData.value }).then((res) => {
					doClose(true)
				})
			}
		}
		return {
			formStatus,
			formData,
			doSubmit,
			doClose,
		}
	},
}
</script>
<style lang="less">
.ant-form-item-label {
	min-width: 100px;
}
</style>
