<template>
	<i :class="'ri-' + icon + type" aria-hidden="true"></i>
</template>

<script>
import 'remixicon/fonts/remixicon.css'
export default {
	name: 'VIcon',
	props: {
		icon: {
			type: String,
			required: true,
			default: function() {
				return 'price-tag'
			},
		},
		type: {
			type: String,
			required: false,
			default: function() {
				return '-line'
			},
		},
	},
}
</script>

<style lang="less" scoped>
[class*='ri'] {
	font-size: 16px;
	vertical-align: -1px;
}
</style>
