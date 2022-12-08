export default {
  horizontalMenuAction (context, payload) {
    if (context.state.horizontalMenu) {
      context.commit('horizontalMenuCommit', false)
    } else {
      context.commit('horizontalMenuCommit', true)
    }
  },
  miniSidebarAction (context, payload) {
    return new Promise((resolve, reject) => {
      if (context.state.miniSidebarMenu) {
        context.commit('miniSidebarCommit', false)
        resolve(false)
      } else {
        context.commit('miniSidebarCommit', true)
        resolve(true)
      }
    })
  },
  activePageAction (context, payload) {
    context.commit('activePageCommit', payload)
  },
  addBookmarkAction (context, payload) {
    context.commit('addBookmarkCommit', payload)
  },
  removeBookmarkAction (context, payload) {
    context.commit('removeBookmarkCommit', payload)
  },
  layoutModeAction (context, payload) {
    const dark = payload.dark ? 'dark' : 'light'
    document.getElementsByTagName('html')[0].setAttribute('mode', dark)
    context.commit('layoutModeCommit', {
      dark: payload.dark,
      sidebar: ''
    })
  },
  setDefaultNavbarHeight (context, payload) {
    context.commit('setDefaultNavbarHeight', payload)
  },
  setLocale (context, payload) {
    context.commit('setLocale', payload)
  }
}
