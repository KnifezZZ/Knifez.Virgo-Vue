const state = {
	visitedRoutes: [],
	cachedViews: [],
}
const getters = {
	visitedRoutes: (state) => state.visitedRoutes,
	cachedViews: (state) => state.cachedViews,
}
const mutations = {
	setVisitedRoute(state, route) {
		state.visitedRoutes = route
	},
	/**
	 * @description 添加标签页
	 * @param {*} state
	 * @param {*} route
	 * @returns
	 */
	addVisitedRoute(state, route) {
		let target = state.visitedRoutes.find((item) => item.path === route.path)
		if (target) {
			if (route.path !== target.path) Object.assign(target, route)
			return
		}
		state.visitedRoutes.push(Object.assign({}, route))
	},
	addCachedView(state, route) {
		let cachedPath = ''
		if (route.path && route.path.startsWith('/')) {
			cachedPath = route.path.substr(1)
		}
		if (state.cachedViews.includes(cachedPath)) return
		if (!route.meta.noCache) {
			state.cachedViews.push(cachedPath)
		}
	},
	/**
	 * @description 删除当前标签页
	 * @param {*} state
	 * @param {*} route
	 * @returns
	 */
	delVisitedRoute(state, route) {
		debugger
		state.visitedRoutes.forEach((item, index) => {
			if (item.path === route.path) state.visitedRoutes.splice(index, 1)
		})
	},
	delCachedView(state, route) {
		for (const [i, v] of Object.entries(state.cachedViews)) {
			const cachedPath = route.path ? route.path.substr(1) : route.name
			if (v === cachedPath) {
				state.cachedViews.splice(parseInt(i), 1)
				break
			}
		}
	},
	/**
	 * @description 删除当前标签页以外其它全部多标签页
	 * @param {*} state
	 * @param {*} route
	 * @returns
	 */
	delOthersVisitedRoutes(state, route) {
		state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix || item.path === route.path)
	},
	delOthersCachedView(state, route) {
		for (const [i, v] of Object.entries(state.cachedViews)) {
			if (v === route.name) {
				state.cachedViews = state.cachedViews.slice(parseInt(i), parseInt(i) + 1)
				break
			}
		}
	},
	/**
	 * @description 删除当前标签页左边全部多标签页
	 * @param {*} state
	 * @param {*} route
	 * @returns
	 */
	delLeftVisitedRoutes(state, route) {
		let index = state.visitedRoutes.length
		state.visitedRoutes = state.visitedRoutes.filter((item) => {
			if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
			return item.meta.affix || index <= state.visitedRoutes.indexOf(item)
		})
	},
	/**
	 * @description 删除当前标签页右边全部多标签页
	 * @param {*} state
	 * @param {*} route
	 * @returns
	 */
	delRightVisitedRoutes(state, route) {
		let index = state.visitedRoutes.length
		state.visitedRoutes = state.visitedRoutes.filter((item) => {
			if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
			return item.meta.affix || index >= state.visitedRoutes.indexOf(item)
		})
	},
	/**
	 * @description 删除全部多标签页
	 * @param {*} state
	 * @param {*} route
	 * @returns
	 */
	delAllVisitedRoutes(state) {
		state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix)
	},
	delAllCachedView(state) {
		state.cachedViews = []
	},
}
const actions = {
	/**
	 * @description 添加标签页
	 * @param {*} { commit }
	 * @param {*} route
	 */
	addVisitedRoute({ commit }, route) {
		commit('addVisitedRoute', route)
		commit('addCachedView', route)
	},
	/**
	 * @description 删除当前标签页
	 * @param {*} { commit }
	 * @param {*} route
	 */
	delVisitedRoute({ commit }, route) {
		commit('delVisitedRoute', route)
		commit('delCachedView', route)
	},
	/**
	 * @description 删除当前标签页以外其它全部多标签页
	 * @param {*} { commit }
	 * @param {*} route
	 */
	delOthersVisitedRoutes({ commit }, route) {
		commit('delOthersVisitedRoutes', route)
		commit('delOthersCachedView', route)
	},
	/**
	 * @description 删除当前标签页左边全部多标签页
	 * @param {*} { commit }
	 * @param {*} route
	 */
	delLeftVisitedRoutes({ commit }, route) {
		commit('delLeftVisitedRoutes', route)
	},
	/**
	 * @description 删除当前标签页右边全部多标签页
	 * @param {*} { commit }
	 * @param {*} route
	 */
	delRightVisitedRoutes({ commit }, route) {
		commit('delRightVisitedRoutes', route)
	},
	/**
	 * @description 删除全部多标签页
	 * @param {*} { commit }
	 */
	delAllVisitedRoutes({ commit }) {
		commit('delAllVisitedRoutes')
		commit('delAllVisitedRoutes')
	},
}
export default { state, getters, mutations, actions }
