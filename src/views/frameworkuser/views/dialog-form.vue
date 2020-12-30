<template>
	<v-form-dialog :use-dialog="false">
		<v-form :fields="fields" :events="events" @reSearch="reSearch"></v-form>
	</v-form-dialog>
</template>

<script>
import VFormDialog from '@/components/page/v-form-dialog'
import VForm from '@/components/page/v-form'
import API from '../api/index'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
	name: 'frameworkmenu-dialog',
	components: {
		VForm,
		VFormDialog,
	},
	data() {
		return {
			events: API,
			getFrameworkRolesData: [],
			getFrameworkGroupsData: [],
		}
	},
	props: {
		fields: {
			type: Array,
		},
	},
	methods: {
		reSearch() {
			this.$emit('reSearch')
		},
	},
	created() {
		API.GetFrameworkRoles().then((res) => {
			this.getFrameworkRolesData = res
		})
		API.GetFrameworkGroups().then((res) => {
			this.getFrameworkGroupsData = res
		})
	},
}
</script>
