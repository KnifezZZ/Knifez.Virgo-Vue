const state = {
    language: '',
}
const getters = {
    language: (state) => state.language,
}
const mutations = {
    setLanguage (state, language) {
        state.language = language
    },
}

const actions = {
    steLanguage ({ commit }, lang) {
        commit('setRoutes', lang)
    }
}

export default { state, getters, mutations, actions }