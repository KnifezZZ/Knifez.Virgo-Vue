<template>
	<a-upload
		:action="action"
		:accept="accept"
		name="avatar"
		list-type="picture-card"
		class="avatar-uploader"
		v-model:fileList="fileList"
		:show-upload-list="true"
		:multiple="limit > 1"
		:before-upload="beforeUpload"
		@change="handleChange"
		:remove="handleRemove"
	>
		<template v-if="isAdd">
			<v-icon v-if="loading" icon="loader-3"></v-icon>
			<v-icon v-else icon="upload-2"></v-icon>
		</template>
	</a-upload>
</template>

<script>
import { fileUploadOptions } from '@/configs/index'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
export default {
	name: 'VUpload',
	props: {
		action: {
			type: String,
			default: function() {
				return '/api/_file/upload'
			},
		},
		accept: {
			type: Array,
			default: function() {
				return fileUploadOptions.UploadTypes
			},
		},
		limit: {
			type: Number,
		},
		files: {
			type: String,
			default() {
				return ''
			},
		},
	},
	data() {
		return {
			imageUrl: '',
			fileList: [],
			loading: false,
		}
	},
	methods: {
		beforeUpload(file) {
			const isLt2M = file.size < fileUploadOptions.UploadLimit
			if (!isLt2M) {
				message.error('请上传小于2MB的图片!')
			}
			return isLt2M
		},
		handleChange(info) {
			if (info.file.status === 'uploading') {
				this.loading = true
				return
			}
			if (info.file.status === 'done') {
				this.$emit('bindValue', info.file.response)
				this.loading = false
			}
			if (info.file.status === 'error') {
				this.loading = false
			}
		},
		handleRemove(info) {
			this.fileList.splice(this.fileList.indexOf(info), 1)
			this.$emit('remove', info.name)
		},
	},
	watch: {
		files(newValue, oldValue) {
			if (this.fileList.length == 0) {
				if (newValue != '' && newValue != null) {
					let i = 1
					newValue.split(',').forEach((element) => {
						this.fileList.push({
							uid: i++,
							status: 'done',
							name: element,
							url: '/api/_file/GetFile/' + element,
							thumbUrl: '/api/_file/GetFile/' + element,
						})
					})
				}
			} else {
				this.fileList.forEach((node) => {
					if (node.url == undefined) {
						node.url = '/api/_file/GetFile/' + node.response.Id
						node.name = node.response.Id
					}
				})
			}
		},
	},
	computed: {
		isAdd() {
			return this.fileList.length < this.limit
		},
	},
	setup(props) {
		return {}
	},
}
</script>

<style lang="less" scoped></style>
