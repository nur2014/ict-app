export const mutations = {
  addRoleList (state, roles) {
    state.roles = roles
  },
  addRole (state, role) {
    state.roles.push(role)
  },
  toggleUserRoleStatus (state, payload) {
    state.roles = state.roles.map(function (item) {
      if (item.id === payload.id) {
        return Object.assign(item, { status: !item.status })
      }
      return item
    })
  },
  updateRole (state, payload) {
    state.roles = state.roles.map(function (item) {
      if (item.id === payload.id) {
        return payload
      }
      return item
    })
  },
  addUserList (state, users) {
    state.users = users
  },
  deleteUser (state, user) {
    state.users.map((obj, index) => {
     if (obj.id === user.id) {
      state.users.splice(index, 1)
     }
    })
  }
}
