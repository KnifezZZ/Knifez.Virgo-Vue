<template>
	<a-form ref="formPass" :model="passForm" :labelCol="{ span: 4 }" :wrapperCol="{ span: 16 }" :rules="rules">
		<a-form-item label="旧密码" name="OldPassword">
			<a-input-password v-model:value="passForm.OldPassword"></a-input-password>
		</a-form-item>
		<a-form-item label="新密码" name="NewPassword">
			<a-input-password v-model:value="passForm.NewPassword"></a-input-password>
		</a-form-item>
		<a-form-item label="确认密码" name="NewPasswordComfirm">
			<a-input-password v-model:value="passForm.NewPasswordComfirm"></a-input-password>
		</a-form-item>
		<a-form-item :wrapperCol="{ span: 12, offset: 8 }">
			<a-button @click="handleCancel">取消</a-button>
			<a-button type="primary" @click="handleOk">确定</a-button>
		</a-form-item>
	</a-form>
</template>

<script>
import VForm from '@/components/page/v-form'
import { changePassword } from '@/api/user'
import store from '../../../../store'
import { notification } from 'ant-design-vue'
export default {
	name: 'userPassword-dialog',
	components: {
		VForm,
	},
	data() {
		let validatePass2 = async (rule, value, callback) => {
			if (value === '') {
				return Promise.reject('请再次输入新设置的密码')
			} else if (value !== this.passForm.NewPassword) {
				return Promise.reject('两次输入的密码不一致!')
			} else {
				return Promise.resolve()
			}
		}
		return {
			passForm: {
				OldPassword: '',
				NewPassword: '',
				NewPasswordComfirm: '',
			},
			rules: {
				OldPassword: [{ required: true, message: '必须验证老密码', trigger: 'blur' }],
				NewPassword: [{ required: true, message: '请输入新设置的密码', trigger: 'blur' }],
				NewPasswordComfirm: [{ validator: validatePass2, trigger: 'blur' }],
			},
		}
	},

	methods: {
		handleOk() {
			this.$refs.formPass.validate().then(() => {
				changePassword({
					ITCode: store.state.user.info.ITCode,
					OldPassword: this.passForm.OldPassword,
					NewPassword: this.passForm.NewPassword,
					NewPasswordComfirm: this.passForm.NewPasswordComfirm,
				}).then((res) => {
					notification.success('修改成功')
					this.handleCancel()
				})
			})
		},
		handleCancel() {
			this.$emit('close')
		},
	},
}
</script>
