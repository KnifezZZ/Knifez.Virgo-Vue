<template>
	<a-card>
		<a-form ref="vform" :rules="rules" :model="formData">
			<a-row class="vForm">
				<template v-for="item in formFields.filter((x) => !x.hidden)">
					<template v-if="formStatus === 'detail'">
						<a-col :span="item.span ? item.span : 24" :key="item.key">
							<template v-if="item.isSlot">
								<a-form-item
									:label-col="{ span: item.span ? 48 / item.span : 2 }"
									:wrapper-col="{ span: 24 - (item.span ? 48 / item.span : 4) }"
									:label="item.title"
									:name="item.key"
								>
									<template v-slot[`index`]>
										<slot :name="item.key" v-bind="{ record: formData, disabled: true }" />
									</template>
								</a-form-item>
							</template>
							<template v-else>
								<a-form-item
									:label-col="{ span: item.span ? 48 / item.span : 2 }"
									:wrapper-col="{ span: 24 - (item.span ? 48 / item.span : 4) }"
									:label="item.title"
									:name="item.key"
								>
									<p v-html="showDetail(item)"></p>
								</a-form-item>
							</template>
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
										<v-upload
											:action="`/api/_file/${item.props ? item.props.action : 'Upload'}`"
											:accept="item.props.accept"
											:limit="item.props.limit"
											:files="formData[item.key]"
											@bindValue="bindFile($event, item)"
											@remove="removeFile($event, item)"
										></v-upload>
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
import request from '@/utils/request'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { closeOnDialog, closeOnTab } from '@/utils/openPage'
import { message } from 'ant-design-vue'
import { getTreeNode } from '@/utils/tool'
import { deleteFile } from '@/api/baseApi'
import VUpload from '@c/v-upload/index'
import config from '@/configs/index'
import { isArray } from '../../../utils/validate'
export default {
	name: 'VForm',
	components: {
		VUpload,
	},
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
		//提交
		doSubmit() {
			this.$refs.vform.validate().then(() => {
				var payload = { Entity: {} }
				var middleIds = {}
				this.formFields.forEach((element) => {
					if (!element.isInclude && element.isInclude !== undefined) {
						payload[element.key] = this.formData[element.key]
					} else {
						payload.Entity[element.key] = this.formData[element.key]
					}
				})
				let res = this.beforeSubmit(payload)
				if (res === false) {
					return false
				}
				if (res.Entity) {
					payload = res
				}
				if (this.formStatus == 'add') {
					request({
						...this.events.Add,
						data: payload,
					}).then((res) => {
						this.doClose(res)
					})
				}
				if (this.formStatus == 'edit') {
					request({
						...this.events.Edit,
						data: payload,
					}).then((res) => {
						this.doClose(res)
					})
				}
			})
		},
		showDetail(item) {
			let showInfo = this.formData[item.key]
			if (showInfo == undefined) {
				return ''
			}
			if (['radio', 'select'].includes(item.type)) {
				var tmpRadio = item.props.items.find((x) => x.Value == this.formData[item.key])
				if (tmpRadio) {
					showInfo = tmpRadio.Text
				}
			}
			if (item.type === 'treeSelect') {
				showInfo = getTreeNode(item.props.items, 'ParentId', 'Id', this.formData[item.key]).Text
			}
			if (item.type === 'upload') {
				showInfo = '<img height="80" src="' + config.readFileApi + this.formData[item.key] + '"/>'
				let info = this.formData[item.key]
				if (info.indexOf(',') > -1) {
					showInfo = ''
					info.split(',').forEach((ele) => {
						showInfo += '<img height="80" src="' + config.readFileApi + this.formData[item.key] + '"/>'
					})
				}
			}
			return showInfo
		},
		bindFile(res, item) {
			if (item.props.limit > 1) {
				this.formData[item.key] += res.id + ','
			} else {
				this.formData[item.key] = res.Id
			}
		},
		removeFile(id, item) {
			this.removeFiles.push(id)
			if (item.props.limit > 1) {
				this.formData[item.key] = this.formData[item.key].replace(id + ',', '')
			} else {
				this.formData[item.key] = null
			}
		},
	},
	setup(props, context) {
		const router = useRouter()
		const store = useStore()
		let dialogConfig = store.getters['app/openDialog']
		let formStatus = ref(dialogConfig.status)
		let formData = ref({})
		let formFields = ref(props.fields)
		let removeFiles = ref([])
		//兼容非弹窗展示
		if (!dialogConfig.useDialog) {
			formStatus.value = router.currentRoute.value.params.status
			dialogConfig.id = router.currentRoute.value.params.id
			dialogConfig.params = router.currentRoute.value.params
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
					request({
						...item.props.loadData,
					}).then((res) => {
						item.props.items = res
					})
				}
			}
		})

		//自定义处理fields和formdata
		const doInit = async () => {
			var re = await context.emit('doInit', { formStatus, params: dialogConfig.params, fields: formFields.value })

			if (!re) {
				// 非添加窗口加载页面数据
				if (formStatus.value !== 'add' && dialogConfig.id != undefined) {
					request({
						...props.events.Detail,
						data: { id: dialogConfig.id },
					}).then((res) => {
						let data = {}
						if (formFields.value !== undefined) {
							formFields.value.forEach((item) => {
								let fieldValue = res.Entity[item.key]
								if (res[item.key] !== undefined) {
									fieldValue = res[item.key]
								}
								data[item.key] = fieldValue
							})
						}
						formData.value = data
						inited(res)
					})
				} else {
					inited({ formData: {}, res: {} })
				}
			} else {
				formData.value = re.formData
				formFields.value = re.fields
			}
		}
		//初始化加载后执行事件
		const inited = (res) => {
			context.emit('inited', { formData: formData.value, res: res })
		}
		//关闭弹窗或Tab页
		const doClose = (res) => {
			if (removeFiles.value.length > 0) {
				//提交后删除附件表关联附件
				removeFiles.value.forEach((element) => {
					deleteFile(element)
				})
			}
			if (dialogConfig.useDialog) {
				closeOnDialog()
			} else {
				closeOnTab()
			}
			closed(res)
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
			removeFiles,
			doInit,
			inited,
			beforeSubmit,
			doClose,
			closed,
		}
	},
	created() {
		this.doInit()
	},
}
</script>
<style lang="less">
.vForm {
	.ant-form-item-label {
		min-width: 80px;
	}
}
</style>
