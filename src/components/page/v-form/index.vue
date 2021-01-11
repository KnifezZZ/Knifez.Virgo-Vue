<template>
	<a-card>
		<a-form ref="vform" :rules="rules" :model="formData">
			<a-row class="vForm">
				<template v-for="item in formFields.filter((x) => !x.hidden)">
					<template v-if="formStatus === 'detail'">
						<a-col :span="item.span ? item.span : 24" :key="item.key">
							<a-form-item
								:label-col="{ span: item.span ? 48 / item.span : 2 }"
								:wrapper-col="{ span: 24 - (item.span ? 48 / item.span : 4) }"
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
									:wrapper-col="{ span: 24 - (item.span ? 48 / item.span : 4) }"
									:label="item.title"
									:key="item.key"
									:name="item.key"
								>
									<template v-slot[`index`]>
										<slot :name="item.key" v-bind="{ record: formData }" />
									</template>
								</a-form-item>
							</template>
							<template v-else>
								<a-form-item
									:label-col="{ span: item.span ? 48 / item.span : 2 }"
									:wrapper-col="{ span: 24 - (item.span ? 48 / item.span : 4) }"
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
											:replace-fields="{ children: 'children', title: 'Text', key: 'Id', value: 'Id' }"
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
		</a-form>
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
		rules: [],
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
		//提交
		doSubmit() {
			this.$refs.vform.validate().then(() => {
				var payload = {}
				var middleIds = {}
				this.formFields.forEach((element) => {
					if (element.key.startsWith('Selected') && element.key.includes('IDs')) {
						payload[element.key] = this.formData[element.key]
					}
				})
				payload.Entity = this.formData
				let res = this.beforeSubmit(payload)
				if (res) {
					payload = res
				} else {
					return false
				}
				if (this.formStatus == 'add') {
					this.events.add(payload).then((res) => {
						this.doClose(res)
					})
				}
				if (this.formStatus == 'edit') {
					this.events.edit(payload).then((res) => {
						this.doClose(res)
					})
				}
			})
		},
	},
	setup(props, context) {
		const router = useRouter()
		const store = useStore()
		let dialogConfig = store.getters['app/openDialog']
		let formStatus = ref(dialogConfig.status)
		let formData = ref({})
		let formFields = ref(props.fields)
		//兼容非弹窗展示
		if (!dialogConfig.useDialog) {
			formStatus.value = router.currentRoute.value.params.status
			dialogConfig.id = router.currentRoute.value.params.id
		}

		formFields.value.forEach((item) => {
			if (typeof item.hidden === 'string') {
				if (item.hidden.startsWith('!')) {
					item.hidden = formStatus.value !== item.hidden.substr(1)
				} else {
					item.hidden = formStatus.value == item.hidden
				}
			}
			if (['select', 'treeSelect'].includes(item.type)) {
				if (item.props.items.length === 0) {
					item.props.loadData().then((res) => {
						item.props.items = res
					})
				}
			}
		})

		//自定义处理fields和formdata
		const doInit = () => {
			let initData = ''
			context.emit('doInit', { formStatus, id: dialogConfig.id, fields: formFields.value }, (res) => {
				initData = res
			})
			return initData
		}
		//页面初始化
		const doInitData = () => {
			let re = doInit()
			if (!re) {
				// 非添加窗口加载页面数据
				if (formStatus.value !== 'add' && dialogConfig.id != undefined) {
					props.events.detail(dialogConfig.id).then((res) => {
						let data = {}
						if (formFields.value !== undefined) {
							formFields.value.forEach((item) => {
								let fieldValue = res.Entity[item.key]
								if (res[item.key] !== undefined) {
									fieldValue = res[item.key]
								}
								data[item.key] = fieldValue
								if (item.type === 'treeSelect' || item.type === 'select') {
									if (formStatus.value === 'detail') {
										data[item.key] = getTreeNode(item.props.items, 'ParentId', 'Value', fieldValue).Text
									}
								}
							})
						}
						formData.value = data
						inited()
					})
				}
			} else {
				formData.value = re.formData
				formFields.value = re.formFields
			}
		}
		//初始化加载后执行事件
		const inited = () => {
			context.emit('inited', formData.value)
		}
		//关闭弹窗或Tab页
		const doClose = () => {
			if (dialogConfig.useDialog) {
				closeOnDialog()
			} else {
				closeOnTab()
			}
			closed()
		}
		//关闭页面后执行事件
		const closed = (res) => {
			context.emit('closed', res)
		}
		//提交数据预处理
		const beforeSubmit = (payload) => {
			let data = {}
			context.emit('beforeSubmit', payload, (val) => {
				data = val
			})
			return data
		}
		return {
			formStatus,
			formData,
			formFields,
			doInit,
			doInitData,
			inited,
			beforeSubmit,
			doClose,
			closed,
		}
	},
	created() {
		this.doInitData()
	},
}
</script>
<style lang="less">
.vForm {
	.ant-form-item-label {
		min-width: 100px;
	}
}
</style>
