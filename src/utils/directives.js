import store from '@/store'
import { isArray } from './validate'
export default (Vue) => {
	Vue.directive('permission', {
		mounted(el, { value }, vNode) {
			let allActions = store.getters['user/actionList']
			allActions = allActions.map((item) => {
				if (item != null) {
					return item.toLowerCase()
				}
			})

			let hasPermission = false
			if (value === undefined) {
				hasPermission = false
			} else if (isArray(value)) {
				const fsList = value.filter((item) => !!item && allActions.includes(item.url.toLowerCase()))
				if (fsList.length > 0) {
					hasPermission = true
				}
			} else if (allActions.includes(value.url.toLowerCase())) {
				hasPermission = true
			}
			if (!hasPermission) {
				el.parentNode && el.parentNode.removeChild(el)
			}
		},
	})
}
