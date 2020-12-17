<template>
	<a-card style="padding:10px;">
		<a-form :layout="layout">
			<slot></slot>
			<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button type="primary" @click="onSubmit">
					提交
				</a-button>
				<a-button>
					重置
				</a-button>
			</a-form-item>
		</a-form>
	</a-card>
</template>

<script>
export default {
	name: 'VForm',
	props: {
		events: {
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
	methods: {
		onSubmit() {
			this.events.doSearch(false)
		},
		resetClick() {
			this.events.queryReset()
		},
	},
}
</script>

<style></style>
