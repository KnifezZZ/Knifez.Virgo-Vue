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
							<a-input type="text" v-model:value="formData[item.key]"></a-input>
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
	setup(props, context) {
		const router = useRouter()
		const store = useStore()
		let dialogConfig = store.getters['app/openDialog']
		console.log(dialogConfig)
		let formStatus = ref(dialogConfig.status)
		let formData = ref({})

		//兼容非弹窗展示
		if (!dialogConfig.useDialog) {
			formStatus.value = router.currentRoute.value.params.status
			dialogConfig.id = router.currentRoute.value.params.id
		}

		// 非添加窗口加载页面数据
		if (formStatus.value !== 'add' && dialogConfig.id != undefined) {
			props.events.Detail(dialogConfig.id).then((res) => {
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
				props.events.Add({ Entity: formData.value }).then((res) => {
					doClose(true)
				})
			}
			if (formStatus.value == 'edit') {
				props.events.Edit({ Entity: formData.value }).then((res) => {
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
