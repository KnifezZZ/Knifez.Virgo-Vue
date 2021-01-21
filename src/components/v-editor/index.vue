<template>
	<div :id="editor" :value="value"></div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import configs from '../../configs'
import { nextTick } from 'vue'
export default {
	name: 'Veditor',
	data() {
		return {
			editorInstance: '',
		}
	},
	props: {
		value: {
			default: '',
		},
		disabled: {
			default: false,
		},
		editor: {
			type: String,
			default: function() {
				return 'vditor'
			},
		},
		height: {
			type: Number,
			default: function() {
				return 360
			},
		},
		outline: {
			type: Boolean,
			default: function() {
				return true
			},
		},
		mode: {
			type: String,
			default: function() {
				return 'wysiwyg'
			},
		},
	},
	watch: {
		value(newValue, oldValue) {
			if (oldValue == '') {
				this.editorInstance.setValue(newValue)
			}
		},
	},

	created() {
		let vm = this
		vm.$nextTick(() => {
			vm.editorInstance = new Vditor(vm.editor, {
				mode: vm.mode,
				height: vm.height,
				outline: vm.outline,
				placeholder: 'enjoy write with markdown',
				upload: {
					url: configs.headerApi + '/_file/Upload',
				},
				input: (value) => {
					vm.$emit('update:value', value)
				},
				cache: {
					enable: false,
				},
			})
		})
	},
}
</script>
