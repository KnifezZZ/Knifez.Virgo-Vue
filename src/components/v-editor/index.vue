<template>
	<div :id="editor" :value="value"></div>
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
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
	mounted() {
		this.editorInstance = new Vditor(this.editor, {
			mode: this.mode,
			height: this.height,
			outline: this.outline,
			placeholder: 'enjoy write with markdown',
			input: (value) => {
				this.$emit('update:value', value)
			},
			cache: {
				enable: false,
			},
			after: () => {
				this.editorInstance.setValue(this.value)
			},
		})
	},
}
</script>
