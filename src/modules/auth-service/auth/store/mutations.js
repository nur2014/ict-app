export const mutations = {
  setAccessToken (state, payload) {
    state.accessToken = payload
  },
  setRequestHeaderVariables (state, payload) {
    state.accessUsername = payload.accessUsername
    state.accessUserId = payload.accessUserId
  },
  updateAuthUser (state, payload) {
    // state.authUser = Object.assign({}, state.authUser, payload)
    state.authUser = payload
  },
  addUser (state, user) {
    state.users.push(user)
  },
  addQuestionList (state, questions) {
    state.questions = questions
  },
  toggleQuestionStatus (state, payload) {
    state.questions = state.questions.map(function (item) {
      if (item.id === payload.id) {
        return Object.assign(item, { status: !item.status })
      }
      return item
    })
  },
  updateQuestion (state, question) {
    state.questions = state.questions.map(function (item) {
      if (item.id === question.id) {
        return question
      }
      return item
    })
  },
  setAuthUserRoles (state, payload) {
    state.authUserRoles = payload
  },
  setActiveRole (state, payload) {
    state.activeRoleId = payload
  },
  setAuthorizedComponents (state, payload) {
    state.authorizedComponents = payload
  },
  setActiveComponentId (state, payload) {
    state.activeComponentId = payload
  },
  setActiveMenus (state, data) {
    state.activeMenus = data
  },
  setAuthorizedMenus (state, payload) {
    state.authorizedURIs = payload
  },
  setUnauthorizedAccessCounter (state, payload) {
    state.unauthorizedAccessCounter = payload
  },
  clearAuthStorageOnLogout (state) {
    state.authUserRoles = []
    state.activeRoleId = 0
    state.authorizedComponents = []
    state.activeComponentId = 0
    state.activeMenus = []
    state.authorizedURIs = ['/home']
    state.unauthorizedAccessCounter = 0
  }
}
