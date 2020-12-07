/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import Menu from '@/router/menu'
import store from '@/store'

const state = {
    // 全部
    routes: [],
    partialRoutes: [],
    // 页面列表
    pageList: []
}
const getters = {
    routes: (state) => state.routes,
    partialRoutes: (state) => state.partialRoutes,

}
const mutations = {
    setRoutes (state, routes) {
        state.routes = constantRoutes.concat(routes);
    },
    setPartialRoutes (state, routes) {
        state.partialRoutes = routes
    },
}
const actions = {
    /**
     * @description intelligence模式设置路由
     * @param {*} { commit }
     * @returns
     */
    async setRoutes ({ commit }) {
        // TODO fix
        const finallyRoutes = [...constantRoutes, ...asyncRoutes]
        commit('setRoutes', finallyRoutes)
        return [...asyncRoutes]
    },
    /**
     * @description all模式设置路由
     * @param {*} { commit }
     * @returns
     */
    async setAllRoutes ({ commit }) {
        let data = store.getters['user/menus'];
        const asyncRoutes = Menu.getTreeMenu(data);
        commit('setRoutes', asyncRoutes)
        return [...asyncRoutes]
    },
    /**
     * @description 画廊布局、综合布局设置路由
     * @param {*} { commit }
     * @param accessedRoutes 画廊布局、综合布局设置路由
     */
    setPartialRoutes ({ commit }, accessedRoutes) {
        commit('setPartialRoutes', accessedRoutes)
    },
}
export default { state, getters, mutations, actions }
