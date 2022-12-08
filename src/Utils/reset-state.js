const resetState = (state) => {
    // Reseting Auth
    state.Auth.authUser = null
    state.Auth.activeRoleId = null
    state.Setting.activeComponentId = 0
    state.Setting.roles = []
    state.Setting.activeMenus = []
    state.Setting.components = []
    state.Setting.menus = []
    state.Setting.modules = []
    state.Setting.services = []
}

export default resetState
