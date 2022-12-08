import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  defaultNavbarHeight: 300, /** as px */
  ministryPanelText: '',
  horizontalMenu: false,
  miniSidebarMenu: false,
  locale: 'bn',
  colors: [
    { primary: '#827af3', primaryLight: '#b47af3', bodyBgLight: '#efeefd', bodyBgDark: '#1d203f' }
  ],
  globalSearch: [],
  bookmark: [
    {
      title: 'Video Chat',
      link: { name: 'app.chat' },
      is_icon_class: true,
      icon: 'ri-message-line'
    }
  ],
  activePage: {
    name: 'Dashboard',
    breadCrumb: [
      {
        html: '<i class="ri-home-4-line mr-1 float-left"></i>Home',
        to: { name: 'authSignUp.dashboard' }
      },
      {
        text: '',
        href: '#'
      }
    ]
  },
  layoutMode: {
    dark: false,
    sidebar: ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
