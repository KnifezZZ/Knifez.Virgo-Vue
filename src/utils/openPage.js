import router from '@/router'
/**
 * 在新建tab标签内打开
 */
export function openOnTab(next, params) {
	if (!router.hasRoute(next.path)) {
		if (next.meta.inLayout == false) {
			router.addRoute(next)
		} else {
			router.addRoute('home', next)
		}
		//防止刷新404
		saveAsyncRoutes(next)
	}
	router.push({ name: next.name, params: params })
}

// 保存动态路由
const saveAsyncRoutes = (asyncRoute) => {
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
			element.component = () => import(`@/views${element.meta.componentUrl}`)
			if (element.meta.inLayout == false) {
				router.addRoute(element)
			} else {
				router.addRoute('home', element)
			}
		})
	}
}

export function openOnDialog(record, status) {
	// TODO openDialog
}
