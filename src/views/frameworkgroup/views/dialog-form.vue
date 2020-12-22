<template>
	<v-form :status="formStatus" :events="events" :form-data="formData" @closeDialog="closeDialog">
		<template v-if="formStatus === 'detail'">
			<a-form-item label="用户组编码" name="GroupCode">
				{{ formData.GroupCode }}
			</a-form-item>
			<a-form-item label="用户组名称" name="GroupName">
				{{ formData.GroupName }}
			</a-form-item>
			<a-form-item label="备注" name="GroupRemark">
				{{ formData.GroupRemark }}
			</a-form-item>
		</template>
		<template v-else>
			<a-form-item label="用户组编码" name="GroupCode">
				<a-input type="text" v-model:value="formData.GroupCode"></a-input>
			</a-form-item>
			<a-form-item label="用户组名称" name="GroupName">
				<a-input type="text" v-model:value="formData.GroupName"></a-input>
			</a-form-item>
			<a-form-item label="备注" name="GroupRemark">
				<a-input type="text" v-model:value="formData.GroupRemark"></a-input>
			</a-form-item>
		</template>
	</v-form>
</template>

<script>
import VForm from '@/components/page/v-form'
import API from '../api/index'
import compDialogForm from '@/components/comp-api/dialog-form'
export default {
	name: 'frameworkgroup-dialog',
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
	setup(props, context) {
		let model = ['ID', 'GroupCode', 'GroupName', 'GroupRemark']
		let { formStatus, formData, closeDialog } = compDialogForm(props, API, model)
		return { formStatus, formData, closeDialog }
	},
}
</script>
