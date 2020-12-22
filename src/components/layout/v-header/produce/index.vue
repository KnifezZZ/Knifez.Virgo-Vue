<template>
	<div>
		<a-steps :current="current">
			<a-step title="Select Model" />
			<a-step title="Config Columns" />
			<a-step title="Generate Codes" />
		</a-steps>
		<div class="steps-content">
			<!-- {{ steps[current].content }} -->
		</div>
		<div class="steps-action">
			<a-button v-if="current < steps.length - 1" type="primary" @click="next">
				Next
			</a-button>
			<a-button v-if="current == steps.length - 1" type="primary" @click="$message.success('Processing complete!')">
				Done
			</a-button>
			<a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
				Previous
			</a-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Virgo-Produce',
	data() {
		return {
			current: 0,
			steps: [
				{
					title: 'First',
					content: 'First-content',
				},
				{
					title: 'Second',
					content: 'Second-content',
				},
				{
					title: 'Last',
					content: 'Last-content',
				},
			],
		}
	},
	methods: {
		next() {
			this.current++
		},
		prev() {
			this.current--
		},
	},
	setup() {
		return {}
	},
}
</script>

<style lang="scss" scoped></style>
