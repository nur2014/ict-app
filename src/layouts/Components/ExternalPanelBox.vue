<template>
  <div class="tablist_menu_wrapper" :class="fontClass">
    <div class="container-fluid">
        <div class="row">
          <div class="col">
              <div class="btn_menu_toggle_wrapper">
                <b-button @click="togglePanelMenus" class="btn_menu_toggle" variant="outline-success" size="md">
                  <i v-if="togglePanel === false" class="fas fa-plus" style="vertical-align: middle"></i>
                  <i v-else class="fas fa-minus" style="vertical-align: middle"></i>
                  {{ $t('externalPanel.all_service_btn') }}
                </b-button>
              </div>
              <!-- <transition name="fade"> -->
              <div class="menu_items" v-if="activePanelItem !== null && togglePanel === false">
                <ul class="menu_items_single">
                  <li class="active">
                    <a href="javascript:">
                      <div>
                        <div class="icon_bg">
                          <img :src="require(`../../assets/images/public-dashboard-icon/box/${activePanelItem.icon}`)" :alt="$t(`${activePanelItem.title}`)">
                        </div>
                        <span>{{ $t(`${activePanelItem.title}`) }}</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <!-- </transition> -->
              <transition name="fade">
              <div class="menu_items" v-if="togglePanel">
                <ul>
                    <li v-for="item in panelTop" :key="item.menuMatcher" :class="currentPanel === item.menuMatcher ? 'active' : ''">
                        <a href="javascript:" @click="setPanel(item.menuMatcher, true)">
                            <div>
                                <div class="icon_bg">
                                  <img :src="require(`../../assets/images/public-dashboard-icon/box/${item.icon}`)" alt="">
                                </div>
                                <span>{{ $t(`${item.title}`) }}</span>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul class="my-2">
                    <li v-for="item in panelBottom" :key="item.menuMatcher">
                        <a href="javascript:" @click="setPanel(item.menuMatcher, true)" class="active">
                            <div>
                                <div>
                                  <img  :src="require(`../../assets/images/public-dashboard-icon/box/${item.icon}`)" alt="">
                                </div>
                                <span>{{ $t(`${item.title}`) }}</span>
                            </div>
                        </a>
                    </li>
                </ul>
              </div>
              </transition>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { externalPanels } from '@/Utils/external-user-panels.js'
import SideBarItems from '@/FackApi/json/SideBarExternalUser'
import { EventBus } from '@/EventBusLayout'
export default {
  data () {
    return {
      activePanelItem: null,
      togglePanel: true,
      panels: externalPanels.names,
      panelTop: [],
      panelBottom: [],
      SideBarMenus: SideBarItems
    }
  },
  computed: {
    fontClass () {
      return this.$i18n.locale === 'en' ? 'en-font-size' : 'bn-font-size'
    },
    ...mapGetters({
      serviceUrl: 'Portal/serviceUrl',
      currentPanel: 'ExternalUserIrrigation/getActivePanel'
    })
  },
  created () {
    let serviceUrl = this.serviceUrl.externalPanelServiceUrl
    this.$store.dispatch('Portal/setServiceUrl', {
      externalPanelServiceUrl: ''
    })
    if (window.performance) {
      if (serviceUrl === undefined || serviceUrl === null || serviceUrl === '') {
        serviceUrl = this.$router.currentRoute.path
      }
    }
    this.setPanelBasedOnRoute(serviceUrl)
  },
  beforeMount () {
    EventBus.$on('EXTERNAL_USER_SET_PANEL', this.setPanel)
  },
  methods: {
    setPanel (menuIndex, byClick = false) {
      this.$store.commit('ExternalUserIrrigation/setActivePanel', menuIndex)
      const menus = this.SideBarMenus[menuIndex]
      const dashboardRoute = menus[0].link.name
      if (byClick) {
        this.$router.push({ name: dashboardRoute })
      }
      this.setPanelMenus(menuIndex)
      this.togglePanel = false
      EventBus.$emit('EXTERNAL_USER_SIDEBAR_MENUS', menus)
    },
    setPanelBasedOnRoute (serviceUrl) {
      let isMatched = false
      this.panels.forEach(item => {
        if (serviceUrl.indexOf(item.urlMatcher) !== -1) {
          isMatched = true
          this.setPanel(item.menuMatcher, false)
        }
      })
      if (!isMatched) {
        this.setPanel('common', false)
      }
    },
    setPanelMenus (panelName) {
      const panels = this.panels
      const panelTop = []
      const panelBottom = []
      let i = 0
      let isTop = true
      panels.forEach(item => {
        i++
        if (i <= 6) {
          panelTop.push(item)
        } else {
          panelBottom.push(item)
        }
        if (item.menuMatcher === panelName) {
          this.activePanelItem = item
          isTop = i <= 6
        }
      })
      if (isTop) {
        this.panelTop = panelTop
        this.panelBottom = panelBottom
      } else {
        this.panelTop = panelBottom
        this.panelBottom = panelTop
      }
    },
    togglePanelMenus () {
      this.togglePanel = !this.togglePanel
    }
  }
}
</script>

<style scoped>
   .btn_menu_toggle_wrapper {
    position: relative;
    text-align: right;
   }

  .tablist_menu_wrapper .menu_items {
    margin: 15px 0 30px;
    background: #fff;
    border-radius: 10px;
    border: none;
    box-shadow: 0 0 3px rgb(120 146 141 / 50%);
    padding: 35px 0 15px;
  }

  .tablist_menu_wrapper .menu_items ul {
      margin: 0;
      padding: 0;
      height: 100%;
      list-style: none;
      text-align: center;
  }

  .tablist_menu_wrapper .menu_items ul:first-child li a span {
    margin-bottom: 4px;
  }

  .tablist_menu_wrapper .menu_items ul:last-child li a {
    padding: 8px 0;
  }

  .tablist_menu_wrapper .menu_items ul.menu_items_single li {
    min-width: 158px;
  }

  .tablist_menu_wrapper .menu_items ul.menu_items_single li a {
    margin-bottom: 4px;
    padding: 0;
  }

  .tablist_menu_wrapper .menu_items ul.menu_items_single li a span {
    margin-bottom: 4px;
  }

  .tablist_menu_wrapper .menu_items ul li {
    position: relative;
    display: inline-flex;
    padding: 0 15px;
    border-radius: 5px;
    min-width: 15%;
    align-items: center;
    justify-content: center;
    background: var(--brand-secondary-color);
    margin: 0 5px;
    transition: .5s all;
  }

  .tablist_menu_wrapper .menu_items ul li:hover {
    background: var(--brand-color);
  }

  .tablist_menu_wrapper .menu_items ul li::before{
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    top: 0;
    left: 0;
    background-color: transparent;
    transition: 0.3s ease-in;
  }

  .tablist_menu_wrapper .menu_items ul li:hover::before{
    top: 0;
    height: 100%;
    border-radius: 5px;
    background: var(--brand-color);
    z-index: 1;
  }

  .tablist_menu_wrapper .menu_items ul li a {
      text-decoration: none;
      color: var(--iq-white);
      font-size: 1.2rem;
      width: 100%;
      z-index: 10;
  }

  .tablist_menu_wrapper .menu_items ul li div {
      margin: 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 2px;
      text-decoration: none;
      font-weight: 300;
      font-size: 1.2rem;
  }

  .tablist_menu_wrapper .menu_items ul li a span {
    font-weight: 600;
  }

  .tablist_menu_wrapper .menu_items ul li a .icon_bg {
    padding: 5px;
    margin-top: -35px;
    border-radius: 50%;
    border: 3px solid #29AC0A;
    background-color: #d3ffc9;
    box-shadow: inset 0 0 1px 3px #fff;
  }

  .tablist_menu_wrapper .menu_items ul li a .icon_bg img {
    width: 32px;
    height: 32px;
  }

  .tablist_menu_wrapper .menu_items ul li:hover,
  .tablist_menu_wrapper .menu_items ul li:active,
  .tablist_menu_wrapper .menu_items ul li:focus,
  .tablist_menu_wrapper .menu_items ul li.active {
      border-radius: 5px;
      background-color: var(--brand-color);
  }

  .tablist_menu_wrapper .menu_items ul li:hover a .icon_bg,
  .tablist_menu_wrapper .menu_items ul li:active a .icon_bg,
  .tablist_menu_wrapper .menu_items ul li:focus a .icon_bg,
  .tablist_menu_wrapper .menu_items ul li.active a .icon_bg {
    border: 3px solid var(--brand-color);
  }

  .en-font-size .menu_items ul li a span {
    font-size: 1rem;
    letter-spacing: 0;
  }

  .bn-font-size .menu_items ul li a span {
    font-size: 19px;
  }
  /** Transition */
  .fade-enter-active, .fade-leave-active {
    transition: opacity .8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
