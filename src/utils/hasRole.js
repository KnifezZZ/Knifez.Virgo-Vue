import store from '@/store'
import router from '@/router'
export function hasRole(value) {
	if (store.getters['acl/admin']) return true
	if (value instanceof Array && value.length > 0)
		return can(store.getters['acl/role'], {
			role: value,
			mode: 'oneOf',
		})
	let mode = 'oneOf'
	if (Object.prototype.hasOwnProperty.call(value, 'mode')) mode = value['mode']
	let result = true
	if (Object.prototype.hasOwnProperty.call(value, 'role'))
		result = result && can(store.getters['acl/role'], { role: value['role'], mode })
	if (result && Object.prototype.hasOwnProperty.call(value, 'ability'))
		result =
			result &&
			can(store.getters['acl/ability'], {
				role: value['ability'],
				mode,
			})
	return result
}

export function can(roleOrAbility, value) {
	let hasRole = false
	if (
		value instanceof Object &&
		Object.prototype.hasOwnProperty.call(value, 'role') &&
		Object.prototype.hasOwnProperty.call(value, 'mode')
	) {
		const { role, mode } = value
		if (mode === 'allOf') {
			hasRole = role.every((item) => {
				return roleOrAbility.includes(item)
			})
		}
		if (mode === 'oneOf') {
			hasRole = role.some((item) => {
				return roleOrAbility.includes(item)
			})
		}
		if (mode === 'except') {
			hasRole = !role.some((item) => {
				return roleOrAbility.includes(item)
			})
		}
	}
	return hasRole
}
// 保存动态路由
export function saveAsyncRoutes(asyncRoute, path) {
	asyncRoute.meta.view = path + '/views/dialog-form.vue'
	if (sessionStorage.getItem('asyncRoutes') !== null) {
		let asyncRoutes = JSON.parse(sessionStorage.getItem('asyncRoutes'))
		if (!asyncRoutes.includes((x) => x.path == asyncRoute.path)) {
			asyncRoutes.push(asyncRoute)
			sessionStorage.setItem('asyncRoutes', JSON.stringify(asyncRoutes))
		}
	} else {
		sessionStorage.setItem('asyncRoutes', JSON.stringify([asyncRoute]))
	}
}
// 加载动态添加路由
export function loadAsyncRoutes() {
	if (sessionStorage.getItem('asyncRoutes') !== null) {
		let asyncRoutes = JSON.parse(sessionStorage.getItem('asyncRoutes'))
		asyncRoutes.forEach((element) => {
			element.component = () => import(`@/views${element.meta.view}`)
			router.addRoute('home', element)
		})
	}
}
