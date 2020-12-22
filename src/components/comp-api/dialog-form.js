import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default function compDialogForm(props, events, model) {
	const router = useRouter()
	const store = useStore()
	let formStatus = ref(props.status)
	let formData = ref({})
	if (formStatus.value == undefined) {
		formStatus.value = router.currentRoute.value.params.status
	}
	let id = props.id
	if (router.currentRoute.value.params.id != undefined) {
		id = router.currentRoute.value.params.id
	}
	if (formStatus.value !== 'add' && id != undefined) {
		events.Detail(id).then((res) => {
			let data = res.Entity
			if (model !== undefined) {
				let keys = Object.keys(data)
				keys.forEach((item) => {
					if (!model.includes(item)) {
						delete data[item]
					}
				})
			}
			formData.value = data
		})
	}
	const closeDialog = () => {
		if (props.dialogInfo == undefined) {
			store.commit('tabsBar/delVisitedRoute', router.currentRoute)
			const latestView = store.state.tabsBar.visitedRoutes.slice(-1)[0]
			if (latestView) router.push(latestView)
			else router.push('/')
		} else {
			props.dialogInfo.visible = false
		}
	}
	return {
		formStatus,
		formData,
		closeDialog,
	}
}
