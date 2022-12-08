export default {
  setAccessToken ({ commit }, payload) {
    commit('setAccessToken', payload)
  },
  setRequestHeaderVariables ({ commit }, payload) {
    commit('setRequestHeaderVariables', payload)
  },
  updateAuthUser ({ commit }, payload) {
    commit('updateAuthUser', payload)
  },
  addQuestionList ({ commit }, payload) {
    commit('addQuestionList', payload)
  },
  toggleQuestionStatus ({ commit }, payload) {
    commit('toggleQuestionStatus', payload)
  },
  updateQuestion ({ commit }, payload) {
    commit('updateQuestion', payload)
  },
  setAuthUserRoles ({ commit }, payload) {
    commit('setAuthUserRoles', payload)
  },
  setActiveRole ({ commit }, payload) {
    commit('setActiveRole', payload)
  },
  setAuthorizedComponents ({ commit }, payload) {
    commit('setAuthorizedComponents', payload)
  },
  setActiveComponentId ({ commit }, payload) {
    commit('setActiveComponentId', payload)
  },
  setActiveMenus ({ commit }, payload) {
    commit('setActiveMenus', payload)
  },
  setAuthorizedMenus ({ commit }, payload) {
    commit('setAuthorizedMenus', payload)
  },
  setUnauthorizedAccessCounter ({ commit }, payload) {
    commit('setUnauthorizedAccessCounter', payload)
  },
  clearAuthStorageOnLogout ({ commit }) {
    commit('clearAuthStorageOnLogout')
  }
}
