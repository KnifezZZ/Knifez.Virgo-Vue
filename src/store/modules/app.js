const state = {
	language: '',
	openDialog: {
		useDialog: false,
		visible: false,
		title: '新建窗口',
	},
}
const getters = {
	language: (state) => state.language,
	openDialog: (state) => state.openDialog,
}
const mutations = {
	setLanguage(state, language) {
		state.language = language
	},
	setOpenDialog(state, dialog) {
		state.openDialog = dialog
	},
}

const actions = {
	steLanguage({ commit }, lang) {
		commit('setRoutes', lang)
	},
	setOpenDialog({ commit }, dialog) {
		commit('setOpenDialog', dialog)
	},
}

export default { state, getters, mutations, actions }
