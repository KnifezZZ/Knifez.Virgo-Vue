<template>
	<div>
		<template v-if="useDialog">
			<a-modal :destroyOnClose="true" v-model:visible="dialogShow" :title="title" :footer="false">
				<slot />
			</a-modal>
		</template>
		<template v-if="pageShow"><slot /></template>
	</div>
</template>

<script>
import VForm from '@/components/page/v-form'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import router from '../../../router'
export default {
	name: 'v-form-dialog',
	components: {
		VForm,
	},
	props: {
		useDialog: {
			type: Boolean,
		},
	},
	setup(props) {
		const store = useStore()
		let isDialog = ref(props.useDialog)
		let dialogShow = ref(false)
		let pageShow = ref(false)
		let title = ref('新建窗口')
		watch(
			() => store.getters['app/openDialog'],
			(value, oldValue) => {
				isDialog.value = value.useDialog
				title.value = value.title
				dialogShow.value = value.visible
			}
		)
		if (router.currentRoute.value.params.status) {
			pageShow.value = true
		}
		return { isDialog, dialogShow, pageShow, title }
	},
	beforeCreate() {
		this.$store.commit('app/setOpenDialog', {
			useDialog: this.useDialog,
			visible: false,
		})
	},
}
</script>

<style lang="less" scoped></style>
