export default {
  addRoleList ({ commit }, payload) {
    commit('addRoleList', payload)
  },
  addRole ({ commit }, payload) {
    commit('addRole', payload)
  },
  toggleUserRoleStatus ({ commit }, payload) {
    commit('toggleUserRoleStatus', payload)
  },
  updateRole ({ commit }, payload) {
    commit('updateRole', payload)
  },
  addUserList ({ commit }, payload) {
    commit('addUserList', payload)
  },
  deleteUser ({ commit }, payload) {
    commit('deleteUser', payload)
  }
}
