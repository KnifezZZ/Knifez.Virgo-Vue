
import { cookiePre } from '@/configs'
import { message, notification } from 'ant-design-vue'
import { checkLogin, login } from '@/api/user'
const state = {
    token: '',
    username: '',
    roles: [],
    menus: [],
    userinfo: {},
    actionlist: []
}
const getters = {
    token: (state) => state.token,
}
const mutations = {
    settoken (state, token) {
        state.token = token;
        localStorage.setItem(cookiePre + 'token', token)
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
    settoken ({ commit }, token) {
        commit('settoken', token)
    },
    async login ({ commit }, userInfo) {
        const { data } = await login(userInfo)
        const accessToken = data[cookiePre + 'token']
        if (accessToken) {
            commit('settoken', accessToken)
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
            notification.open({
                message: `欢迎登录`,
                description: `${thisTime}！`,
            })
        } else {
            message.error(`登录异常`)
        }
    },
    async getUserInfo ({ commit, dispatch, state }) {
        const { data } = await checkLogin({ ID: state.token })
        if (!data) {
            message.error(`验证失败，请重新登录...`)
            return false
        }
        const { Id, ITCode, Name, PhotoId, Roles, Attributes } = data;
        commit('setRoles', Roles)
        commit('setUserName', Name)
        commit('setActions', Attributes.Actions)
        commit('setMenus', Attributes.Menus)
        commit('setInfo', { Id, ITCode, Name, PhotoId })
    },
    resetAll ({ commit, dispatch }) {
        commit('settoken', '')
        commit('setRoles', [])
        commit('setActions', [])
        commit('setMenus', [])
    },
}

export default { state, getters, mutations, actions }