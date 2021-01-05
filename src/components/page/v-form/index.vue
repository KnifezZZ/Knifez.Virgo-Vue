<template>
	<a-card>
		<a-form :layout="layout" class="v-form">
			<template v-for="item in fields.filter((x) => !x.hidden)">
				<template v-if="formStatus === 'detail'">
					<a-form-item :label="item.title" :key="item.key" :name="item.key">
						{{ formData[item.key] }}
					</a-form-item>
				</template>
				<template v-else>
					<template v-if="item.isSlot">
						<a-form-item :label="item.title" :key="item.key" :name="item.key">
							<template v-slot[`index`]>
								<slot :name="item.key" v-bind="formData" />
							</template>
						</a-form-item>
					</template>
					<template v-else>
						<a-form-item :label="item.title" :key="item.key" :name="item.key">
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
								<a-date-picker v-model:value="formData[item.key]" show-time type="date" style="width: 100%;" />
							</template>
							<template v-else-if="item.type === 'radio'">
								<a-radio-group :name="item.key" v-model:value="formData[item.key]">
									<a-radio v-for="rad in item.props.items" :key="rad.Value" :value="rad.Value">{{ rad.Text }}</a-radio>
								</a-radio-group>
							</template>
							<template v-else-if="item.type === 'radioButton'">
								<a-radio-group :name="item.key" button-style="solid" v-model:value="formData[item.key]">
									<a-radio-button v-for="rad in item.props.items" :key="rad.Value" :value="rad.Value">{{
										rad.Text
									}}</a-radio-button>
								</a-radio-group>
							</template>
							<template v-else-if="item.type === 'treeSelect'"></template>
							<template v-else>
								<a-input type="text" v-model:value="formData[item.key]"></a-input>
							</template>
						</a-form-item>
					</template>
				</template>
			</template>
			<a-form-item :wrapper-col="{ span: 12, offset: 12 }" v-if="formStatus !== 'detail'">
				<a-button @click="doClose(false)">
					关闭
				</a-button>
				<a-button type="primary" @click="doSubmit">
					提交
				</a-button>
			</a-form-item>
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
		layout: {
			type: String,
			default: function() {
				return 'horizontal'
			},
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
		})
		// 非添加窗口加载页面数据
		if (formStatus.value !== 'add' && dialogConfig.id != undefined) {
			props.events.detail(dialogConfig.id).then((res) => {
				let data = {}
				if (props.fields !== undefined) {
					props.fields.forEach((item) => {
						data[item.key] = res.Entity[item.key]
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
.v-form {
	.ant-form-item {
		// width: 48%;
		.ant-form-item-label {
			min-width: 100px;
		}
		.ant-form-item-control-wrapper {
			width: 70%;
			min-width: 300px;
		}
	}
}
</style>
