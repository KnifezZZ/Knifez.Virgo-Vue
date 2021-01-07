import Cookies from 'js-cookie'
import { message, notification } from 'ant-design-vue'
import { checkLogin, login, logOut } from '@/api/user'
const state = {
	token: '',
	username: '',
	info: {},
	roles: [],
	menus: [],
	actionList: [],
}
const getters = {
	token: (state) => state.token,
	username: (state) => state.username,
	info: (state) => state.info,
	roles: (state) => state.roles,
	menus: (state) => state.menus,
	actionList: (state) => state.actionList,
}
const mutations = {
	setToken(state, token) {
		state.token = token
	},
	setInfo(state, info) {
		state.info = info
	},
	setRoles(state, roles) {
		state.roles = roles
	},
	setUserName(state, name) {
		state.username = name
	},
	setActions(state, actions) {
		state.actionList = actions
	},
	setMenus(state, menus) {
		state.menus = menus
	},
}

const actions = {
	async login({ commit }, userInfo) {
		const res = await login(userInfo)
		commit('setToken', res)
		Cookies.set('Authorization', res.token_type + ' ' + res.access_token, { expires: res.expires_in })
		const hour = new Date().getHours()
		const thisTime =
			hour < 8 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好'
		message.success(`${thisTime}！欢迎登录`)
	},
	async getUserInfo({ commit, dispatch, state }) {
		const res = await checkLogin()
		if (res == null || !res.Id) {
			message.error(`验证失败，请重新登录...`)
			return false
		}
		const { Id, ITCode, Name, PhotoId, Roles, Attributes } = res
		commit('setRoles', Roles)
		commit('setUserName', Name)
		commit('setActions', Attributes.Actions)
		commit('setMenus', Attributes.Menus)
		commit('setInfo', { Id, ITCode, Name, PhotoId })
	},
	doLogOut({ commit, dispatch, state }) {
		const { Id } = state.info
		logOut(Id)
		dispatch('resetAll')
	},
	resetAll({ commit, dispatch }) {
		Cookies.remove('Authorization')
		sessionStorage.removeItem('allRoutes')
		sessionStorage.removeItem('visitedTabs')
		commit('setToken', '')
		commit('setRoles', [])
		commit('setActions', [])
		commit('setMenus', [])
	},
}

export default { state, getters, mutations, actions }
