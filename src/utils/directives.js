import store from '@/store'
import { isArray } from './validate'
export default (Vue) => {
	Vue.directive('permission', {
		mounted(el, { value }, vNode) {
			const allActions = store.getters['user/actionList']
			let hasPermission = false
			if (value === undefined) {
				hasPermission = false
			} else if (isArray(value)) {
				const fsList = value.filter((item) => !!item && allActions.includes(item.url))
				if (fsList.length > 0) {
					hasPermission = true
				}
			} else if (allActions.includes(value.url)) {
				hasPermission = true
			}
			if (!hasPermission) {
				el.parentNode && el.parentNode.removeChild(el)
			}
		},
	})
}
