<template>
	<a-card>
		<a-form layout="inline">
			<slot></slot>
			<a-button @click="resetClick"><v-icon icon="refresh"></v-icon> 重置</a-button>
			<a-button-group>
				<a-button type="primary" @click="queryClick"><v-icon icon="search"></v-icon> 查询</a-button>
				<a-button v-if="collapse.needCollapse" type="primary" style="padding:2px" @click="collapseQueryColumns"
					><v-icon icon="arrow-drop-down"></v-icon
				></a-button>
			</a-button-group>
		</a-form>
	</a-card>
</template>

<script>
export default {
	name: 'VSearcher',
	props: {
		events: {
			type: Object,
			required: true,
		},
		collapse: {
			type: Object,
			default: function() {
				return {
					needCollapse: false,
					isActive: true,
				}
			},
		},
	},
	setup(props) {
		const collapseQueryColumns = () => {
			// eslint-disable-next-line vue/no-mutating-props
			props.collapse.isActive = !props.collapse.isActive
		}
		return { collapseQueryColumns }
	},
	methods: {
		queryClick() {
			console.log(this.events)
			this.events.vtable.doSearch(false)
		},
		resetClick() {
			this.events.vtable.queryReset()
		},
	},
}
</script>

<style></style>
