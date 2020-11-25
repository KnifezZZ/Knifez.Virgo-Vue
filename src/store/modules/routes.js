/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes } from '@/router'
import { convertRouter, filterRoutes } from '@/utils/routes'

const state = { routes: [], partialRoutes: [] }
const getters = {
    routes: (state) => state.routes,
    partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
    setRoutes (state, routes) {
        state.routes = routes
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
        const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
        commit('setRoutes', finallyRoutes)
        return [...asyncRoutes]
    },
    /**
     * @description all模式设置路由
     * @param {*} { commit }
     * @returns
     */
    async setAllRoutes ({ commit }) {
        console.log('setAllRoutes')
        let data = [];
        // let { data } = await getRouterList()
        if (data[data.length - 1].path !== '*')
            data.push({ path: '*', redirect: '/404', hidden: true })
        const asyncRoutes = convertRouter(data)
        const finallyRoutes = filterRoutes([...constantRoutes, ...asyncRoutes])
        commit('setRoutes', finallyRoutes)
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
