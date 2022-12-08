import Store from '@/store'
import RestApi, { authServiceBaseUrl } from '@/config/api_config'
import Router from '@/router'

const logout = () => {
    /** Logout from backend */
    const ssoLogin = Store.state.Auth.authUser.ssoLogin
    RestApi.postData(authServiceBaseUrl, 'auth/logout', null).then(response => {
    })
    /** clearing store from frontend */
    Store.dispatch('Auth/setAccessToken', null)
    Store.dispatch('Auth/updateAuthUser', null)
    Store.dispatch('Auth/clearAuthStorageOnLogout')
    Store.commit('mutateCommonProperties', {
      hasDropdownLoaded: false
    })
    // implemented by hasinur for security issues
    localStorage.setItem('user_panel_type', 'guest')
    localStorage.setItem('logout', 'logout-' + Math.random())

    if (ssoLogin) {
      window.location.href = process.env.VUE_APP_NOTHI_BASE_URL + '/logout?referer=' + btoa(window.location.origin + '/auth/login')
    } else {
      Router.push('/auth/login').catch(() => {})
    }
}

export default logout
