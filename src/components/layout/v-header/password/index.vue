<template>
	<a-modal width="700px" :destroyOnClose="true" v-model:visible="pageShow" :title="密码修改">
		<a-row>
			<a-col>
				<a-form-item label="旧密码" name="OldPassword">
					<a-input-password v-model:value="formData.OldPassword"></a-input-password>
				</a-form-item>
			</a-col>
			<a-col>
				<a-form-item label="新密码" name="NewPassword">
					<a-input-password v-model:value="formData.NewPassword"></a-input-password>
				</a-form-item>
			</a-col>
			<a-col>
				<a-form-item label="确认密码" name="NewPasswordComfirm">
					<a-input-password v-model:value="formData.NewPasswordComfirm"></a-input-password>
				</a-form-item>
			</a-col>
		</a-row>
	</a-modal>
</template>

<script>
import VForm from '@/components/page/v-form'
import { changePassword } from '@/api/user'
export default {
	name: 'userPassword-dialog',
	components: {
		VForm,
	},
	data() {
		return {
			formData: {
				UserId: '',
				OldPassword: '',
				NewPassword: '',
				NewPasswordComfirm: '',
			},
			pageShow: false,
		}
	},
	methods: {
		reSearch() {
			this.$emit('reSearch')
		},
	},
}
</script>
