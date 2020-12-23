<template>
	<v-form-dialog :use-dialog="false">
		<v-form layout="inline" :fields="fields" :events="events" @reSearch="reSearch"></v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import API from '../api/index'
export default {
	name: 'frameworkmenu-dialog',
	components: {
		VForm,
		VFormDialog,
	},
	data() {
		return {
			events: API,
		}
	},
	setup(props, context) {
		let fields = [
			{
				key: 'ID',
				type: 'input',
				hidden: true,
			},
			{
				title: '账号',
				key: 'ITCode',
				type: 'input',
			},
			{
				title: '姓名',
				key: 'Name',
				type: 'input',
			},
			{
				title: '邮箱',
				key: 'Email',
				type: 'input',
			},
		]
		const reSearch = () => {
			context.emit('reSearch')
		}
		return { fields, reSearch }
	},
}
</script>
