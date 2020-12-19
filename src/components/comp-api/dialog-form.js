import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export default function compDialogForm(props, events) {
	const router = useRouter()
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
			formData.value = res.Entity
		})
	}
	return {
		formStatus,
		formData,
	}
}
