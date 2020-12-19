<template>
	<a-card>
		<a-form :layout="layout">
			<slot></slot>
			<a-form-item :wrapper-col="{ span: 14, offset: 4 }" v-if="status !== 'detail'">
				<a-button>
					重置
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
		layout: {
			type: String,
			default: function() {
				return 'horizontal'
			},
		},
	},
	setup(props) {
		const doSubmit = () => {
			if (props.status == 'add') {
				console.log('add')
			}
			if (props.status == 'edit') {
				console.log('edit')
			}
		}
		return {
			doSubmit,
		}
	},
}
</script>

<style lang="less" scoped>
.ant-form-item {
	width: 48%;
}
</style>
