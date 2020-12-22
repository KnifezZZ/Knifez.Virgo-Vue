<template>
	<v-form :status="formStatus" :events="events" :form-data="formData" @closeDialog="closeDialog">
		<template v-if="formStatus === 'detail'">
			<a-form-item label="账号" name="ITCode">
				{{ formData.ITCode }}
			</a-form-item>
			<a-form-item label="姓名" name="Name">
				{{ formData.Name }}
			</a-form-item>
			<a-form-item label="邮箱" name="Email">
				{{ formData.Email }}
			</a-form-item>
		</template>
		<template v-else>
			<a-form-item label="用户组编码" name="GroupCode">
				<a-input type="text" v-model:value="formData.ITCode"></a-input>
			</a-form-item>
			<a-form-item label="用户组名称" name="GroupName">
				<a-input type="text" v-model:value="formData.Name"></a-input>
			</a-form-item>
			<a-form-item label="备注" name="Email">
				<a-input type="text" v-model:value="formData.Email"></a-input>
			</a-form-item>
		</template>
	</v-form>
</template>

<script>
import VForm from '@/components/page/v-form'
import API from '../api/index'
import compDialogForm from '@/components/comp-api/dialog-form'
export default {
	name: 'frameworkuser-dialog',
	components: {
		VForm,
	},
	data() {
		return {
			events: API,
		}
	},
	props: {
		status: {
			type: String,
		},
		id: {
			type: String,
		},
		dialogInfo: {
			type: Object,
		},
	},
	setup(props) {
		let model = ['ID', 'ITCode', 'Name', 'Email']
		let { formStatus, formData, closeDialog } = compDialogForm(props, API, model)
		return { formStatus, formData, closeDialog }
	},
}
</script>
