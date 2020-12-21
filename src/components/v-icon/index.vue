<template>
	<i :class="'ri-' + icon + type" aria-hidden="true"></i>
</template>

<script lang="ts">
import 'remixicon/fonts/remixicon.css'
import { defineComponent } from 'vue'
export default defineComponent({
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
	setup() {
		return {}
	},
})
</script>

<style lang="less" scoped>
[class*='ri'] {
	font-size: 16px;
	vertical-align: -1px;
}
</style>
