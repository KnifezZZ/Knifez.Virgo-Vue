<template>
	<v-form :status="formStatus" :events="events" :form-data="formData" layout="inline">
		<template v-if="formStatus === 'detail'">
			<a-form-item style="width:100%" label="访问地址" name="ActionUrl">
				{{ formData.ActionUrl }}
			</a-form-item>
			<a-form-item label="模块" name="ActionName">
				{{ formData.ActionName }}
			</a-form-item>
			<a-form-item label="方法" name="ModuleName">
				{{ formData.ModuleName }}
			</a-form-item>
			<a-form-item label="操作用户" name="ITCode">
				{{ formData.ITCode }}
			</a-form-item>
			<a-form-item label="IP" name="IP">
				{{ formData.IP }}
			</a-form-item>
			<a-form-item label="访问时间" name="ActionTime">
				{{ formData.ActionTime }}
			</a-form-item>
			<a-form-item label="耗时" name="Duration">
				{{ formData.Duration }}
			</a-form-item>
			<a-form-item style="width:100%" label="备注" name="Remark">
				{{ formData.Remark }}
			</a-form-item>
		</template>
	</v-form>
</template>

<script>
import VForm from '@/components/page/v-form'
import API from '../api/index'
import compDialogForm from '@/components/comp-api/dialog-form'
export default {
	name: 'actionlog-dialog',
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
	},
	setup(props) {
		let { formStatus, formData } = compDialogForm(props, API.Detail)
		return { formStatus, formData }
	},
}
</script>
