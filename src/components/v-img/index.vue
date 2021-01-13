<template>
	<img :src="url" :height="height" />
</template>

<script>
import config from '@/configs/index'
import { defineComponent, ref } from 'vue'
export default defineComponent({
	name: 'VImg',
	props: {
		src: {
			type: String,
			required: true,
			default: function() {
				return null
			},
		},
		height: {
			type: Number,
			default: function() {
				return 80
			},
		},
	},
	setup(props) {
    let url = ref(props.src)

		if (props.src != '' && props.src != null) {
			url = config.readFileApi + props.src
		}else{
      url='./static/images/no-image.png'
    }
		return { url }
	},
})
</script>
