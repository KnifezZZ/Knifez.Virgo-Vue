<template>
	<a-card>
		<a-form :layout="layout" class="v-form">
			<slot></slot>
			<a-form-item :wrapper-col="{ span: 12, offset: 12 }" v-if="status !== 'detail'">
				<a-button @click="doClose">
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
export default {
	name: 'VForm',
	props: {
		status: {
			type: String,
			required: true,
		},
		events: {
			type: Object,
			required: true,
		},
		formData: {
			type: Object,
			required: true,
		},
		model: {
			type: Object,
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
		const doClose = (refresh) => {
			context.emit('closeDialog', refresh)
		}
		const doSubmit = () => {
			//clean model
			if (props.status == 'add') {
				props.events.Add({ Entity: props.formData }).then((res) => {
					doClose(true)
				})
			}
			if (props.status == 'edit') {
				props.events.Edit({ Entity: props.formData }).then((res) => {
					doClose(true)
				})
			}
		}
		return {
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
