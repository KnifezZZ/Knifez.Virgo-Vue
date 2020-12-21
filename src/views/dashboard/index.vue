<template>
	<a-row>
		<a-col :span="24">
			<a-button @click="save">保存</a-button>
			<v-editor v-model:value="entity.BodyText" editor="BodyText"></v-editor>
		</a-col>
	</a-row>
</template>

<script>
import Veditor from '@/components/v-editor'
export default {
	data() {
		return {
			entity: {
				BodyText: 'hello ,v editor',
			},
		}
	},
	components: {
		'v-editor': Veditor,
	},
	methods: {
		save() {
			console.log(this.entity.BodyText)
		},
	},
}
</script>

<style></style>
