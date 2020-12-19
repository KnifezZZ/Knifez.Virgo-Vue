<template>
	<v-form :status="formStatus" :events="API" :form-data="formData" layout="inline">
		<template v-if="formStatus === 'detail'">
			<a-form-item style="width:100%" label="访问地址" name="ActionUrl">
				{{ formData.actionUrl }}
			</a-form-item>
			<a-form-item label="模块" name="ActionName">
				{{ formData.actionName }}
			</a-form-item>
			<a-form-item label="方法" name="ModuleName">
				{{ formData.moduleName }}
			</a-form-item>
			<a-form-item label="操作用户" name="ITCode">
				{{ formData.itCode }}
			</a-form-item>
			<a-form-item label="IP" name="IP">
				{{ formData.ip }}
			</a-form-item>
			<a-form-item label="访问时间" name="ActionTime">
				{{ formData.actionTime }}
			</a-form-item>
			<a-form-item label="耗时" name="Duration">
				{{ formData.duration }}
			</a-form-item>
			<a-form-item style="width:100%" label="备注" name="Remark">
				{{ formData.remark }}
			</a-form-item>
		</template>
	</v-form>
</template>

<script>
import VForm from '@/components/page/v-form'
import API from '../api/index'
import { ref } from 'vue'
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
		data: {
			type: Object,
		},
	},
	watch: {
		formId(val, oldVal) {
			console.log(val)
		},
	},
	setup(props) {
		let formStatus = ref(props.status)
		let formData = ref(props.data)
		return {
			formStatus,
			formData,
		}
	},
	mounted() {
		if (this.$route.params.status !== undefined) {
			this.formStatus = this.$route.params.status
		}
	},
}
</script>
<style lang="less">
.ant-form-item-label {
	width: 150px;
}
</style>
