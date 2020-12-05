
import Cookies from 'js-cookie'
import { message, notification } from 'ant-design-vue'
import { checkLogin, login } from '@/api/user'
import config from '@/configs/index'
const state = {
    token: '',
    username: '',
    info: {},
    roles: [],
    menus: [],
    userinfo: {},
    actionlist: []
}
const getters = {
    token: (state) => state.token,
    username: (state) => state.username,
    info: (state) => state.info,
    roles: (state) => state.roles,
    menus: (state) => state.menus,
    userinfo: (state) => state.userinfo,
    actionlist: (state) => state.actionlist,
}
const mutations = {
    settoken (state, token) {
        state.token = token;
    },
    setInfo (state, info) {
        state.info = info;
    },
    setRoles (state, roles) {
        state.roles = roles;
    },
    setUserName (state, name) {
        state.username = name;
    },
    setActions (state, actions) {
        state.actionlist = actions;
    },
    setMenus (state, menus) {
        state.menus = menus;
    },
}

const actions = {
    async login ({ commit }, userInfo) {
        const res = await login(userInfo)
        commit('settoken', res)
        Cookies.set('Authorization', res.TokenType + ' ' + res.AccessToken, { expires: res.ExpiresIn })
        const hour = new Date().getHours()
        const thisTime =
            hour < 8
                ? '早上好'
                : hour <= 11
                    ? '上午好'
                    : hour <= 13
                        ? '中午好'
                        : hour < 18
                            ? '下午好'
                            : '晚上好'
        notification.success({
            message: `欢迎登录`,
            description: `${thisTime}！`,
        })
    },
    async getUserInfo ({ commit, dispatch, state }) {
        const res = await checkLogin()
        if (!res.id) {
            message.error(`验证失败，请重新登录...`)
            return false
        }
        const { id, itCode, name, photoId, roles, attributes } = res;
        commit('setRoles', roles)
        commit('setUserName', name)
        commit('setActions', attributes.Actions)
        commit('setMenus', attributes.Menus)
        commit('setInfo', { id, itCode, name, photoId })
    },
    resetAll ({ commit, dispatch }) {
        commit('settoken', '')
        commit('setRoles', [])
        commit('setActions', [])
        commit('setMenus', [])
    },
}

export default { state, getters, mutations, actions }