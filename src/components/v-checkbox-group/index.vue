<template>
	<div>
		<a-checkbox
			v-if="canCheckedAll"
			v-model:checked="selectAll"
			:indeterminate="indeterminate"
			:disabled="disabled"
			@change="onCheckAllChange"
		>
			全选
		</a-checkbox>
		<a-checkbox-group :disabled="disabled" v-model:value="checkedList" @change="onChange">
			<slot />
			<a-checkbox v-for="option in allOptions" :value="option.Value" :key="option.Value">
				{{ option.Text }}
			</a-checkbox>
		</a-checkbox-group>
	</div>
</template>

<script>
import { ref } from 'vue'
export default {
	name: 'VCheckboxGroup',
	props: {
		options: {
			type: Array,
			required: true,
			default: function() {
				return []
			},
		},
		checkedOptions: {
			type: Array,
		},
		canCheckedAll: {
			type: Boolean,
			default: function() {
				return false
			},
		},
		disabled: {
			type: Boolean,
			default: function() {
				return false
			},
		},
	},
	methods: {
		doCheckAll() {
			this.indeterminate = !!this.checkedList.length && this.checkedList.length < this.allOptions.length
			this.selectAll = this.checkedList.length === this.allOptions.length
		},
		onChange() {
			if (this.canCheckedAll) {
				this.doCheckAll()
			}
			this.$emit('change', this.checkedList)
		},
		onCheckAllChange() {
			this.checkedList = this.selectAll
				? this.allOptions.map((element) => {
						return element.Value
				})
				: []
			this.indeterminate = false
			this.$emit('change', this.checkedList)
		},
	},
	watch: {
		options(newValue, oldValue) {
			this.allOptions = newValue
			this.doCheckAll()
		},
		checkedOptions(newValue, oldValue) {
			this.checkedList = newValue
			this.doCheckAll()
		},
	},
	setup(props) {
		let checkedList = ref(props.checkedOptions)
		let allOptions = ref(props.options)
		let selectAll = ref(false)
		let indeterminate = ref(false)
		if (checkedList.value == undefined) {
			checkedList.value = []
		}
		if (allOptions.value == undefined) {
			allOptions.value = []
		}
		indeterminate = !!checkedList.length && checkedList.length < allOptions.length
		selectAll = checkedList.length === allOptions.length
		return { checkedList, allOptions, selectAll, indeterminate }
	},
}
</script>

<style lang="scss" scoped></style>
