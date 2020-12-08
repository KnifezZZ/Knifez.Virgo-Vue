const state = {
    visitedRoutes: [],
    cachedViews: [],
}
const getters = {
    visitedRoutes: (state) => state.visitedRoutes,
    cachedViews: (state) => state.cachedViews,
}
const mutations = {
    setVisitedRoute (state, route) {
        state.visitedRoutes = route
    },
    /**
     * @description 添加标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    addVisitedRoute (state, route, view) {
        let target = state.visitedRoutes.find((item) => item.path === route.path)
        if (target) {
            if (route.path !== target.path) Object.assign(target, route)
            return
        }
        state.visitedRoutes.push(Object.assign({}, route))
        this.addCachedView(view)
    },
    addCachedView (view) {
        let cachedPath = "";
        if (view.path && view.path.startsWith("/")) {
            cachedPath = view.path.substr(1);
        }
        if (this.cachedViews.includes(cachedPath)) return;
        if (!view.meta.noCache) {
            this.cachedViews.push(cachedPath);
        }
    },
    /**
     * @description 删除当前标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delVisitedRoute (state, route, view) {
        state.visitedRoutes.forEach((item, index) => {
            if (item.path === route.path) state.visitedRoutes.splice(index, 1)
        })
        this.delCachedView(view)
    },
    delCachedView (view) {
        for (const [i, v] of Object.entries(this.cachedViews)) {
            const cachedPath = view.path ? view.path.substr(1) : view.name;
            if (v === cachedPath) {
                this.cachedViews.splice(parseInt(i), 1);
                break;
            }
        }
    },
    /**
     * @description 删除当前标签页以外其它全部多标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delOthersVisitedRoutes (state, route, view) {
        state.visitedRoutes = state.visitedRoutes.filter(
            (item) => item.meta.affix || item.path === route.path
        )
        this.delOthersCachedView(view)
    },
    delOthersCachedView (view) {
        for (const [i, v] of Object.entries(this.cachedViews)) {
            if (v === view.name) {
                this.cachedViews = this.cachedViews.slice(
                    parseInt(i),
                    parseInt(i) + 1
                );
                break;
            }
        }
    },
    /**
     * @description 删除当前标签页左边全部多标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delLeftVisitedRoutes (state, route) {
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
    delRightVisitedRoutes (state, route) {
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
    delAllVisitedRoutes (state) {
        state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix)
        this.delAllCachedView()
    },
    delAllCachedView () {
        this.cachedViews = []
    }
}
const actions = {
    /**
     * @description 添加标签页
     * @param {*} { commit }
     * @param {*} route
     */
    addVisitedRoute ({ commit }, route) {
        commit('addVisitedRoute', route)
    },
    /**
     * @description 删除当前标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delVisitedRoute ({ commit }, route) {
        commit('delVisitedRoute', route)
    },
    /**
     * @description 删除当前标签页以外其它全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delOthersVisitedRoutes ({ commit }, route) {
        commit('delOthersVisitedRoutes', route)
    },
    /**
     * @description 删除当前标签页左边全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delLeftVisitedRoutes ({ commit }, route) {
        commit('delLeftVisitedRoutes', route)
    },
    /**
     * @description 删除当前标签页右边全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delRightVisitedRoutes ({ commit }, route) {
        commit('delRightVisitedRoutes', route)
    },
    /**
     * @description 删除全部多标签页
     * @param {*} { commit }
     */
    delAllVisitedRoutes ({ commit }) {
        commit('delAllVisitedRoutes')
    },
}
export default { state, getters, mutations, actions }
