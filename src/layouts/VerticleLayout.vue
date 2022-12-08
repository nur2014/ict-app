<template>
  <div :class="activeFont">
    <Customizer @onLogo="changeLogo" @toggle="sidebarMini" @animationChange="routerAnimationChange" />
    <div class="wrapper">
      <!-- Sidebar  -->
      <Sidebar :items="verticalMenu" :logo="logo" :onlyLogo="onlyLogo" :onlyLogoText="onlyLogoText" @toggle="sidebarMini" :toggleButton="toggleSideIcon" :sidebarGroupTitle="sidebarGroupTitle" />
      <!-- TOP Nav Bar -->
      <DefaultNavBar :homeURL="{ name: 'common_service.dashboard.dashboard' }" :sidebarGroupTitle="sidebarGroupTitle" @toggle="sidebarMini" :logo="logo">
        <template slot="responsiveRight">
          <ul class="navbar-nav ml-auto navbar-list">
            <li class="nav-item d-flex" v-nav-toggle>
              <lang-button/>
            </li>
            <li class="nav-item" v-nav-toggle>
              <a href="#" class="search-toggle iq-waves-effect" v-if="$store.state.Auth.activeRoleId !== 1">
                <i class="ri-notification-line"></i>
                <span class="dots"></span>
                <small class="notification_count" v-if="totalNotification">{{ totalNotification }}</small>
              </a>
              <notification :component_id="1"/>
            </li>
          </ul>
        </template>
        <template slot="right">
          <SiteSettings :authServiceBaseUrl="authServiceBaseUrl" :authUser="authUser" :userProfile="userProfile"/>
        </template>
      </DefaultNavBar>
      <!-- TOP Nav Bar END -->
      <div id="content-page" class="content-page" v-bind:class="{ ' ministry-user': isMinistryUser }">
        <transition name="router-anim" :enter-active-class="`animated ${animated.enter}`" mode="out-in"
                    :leave-active-class="`animated ${animated.exit}`">
          <router-view/>
        </transition>
      </div>
    </div>
    <PushNotification :component_id="1" />
    <LayoutFooter />
  </div>
</template>
<script>
import { authServiceBaseUrl } from '@/config/api_config'
import { core } from '../config/pluginInit'
import { mapActions, mapGetters } from 'vuex'
import Sidebar from '../components/core/sidebars/Sidebar'
import DefaultNavBar from '../components/core/navbars/DefaultNavBar'
import profile from '../assets/images/user/user-1.jpeg'
import Logo from '../assets/images/logo.png'
import Notification from './Components/Notification'
import Customizer from './Components/Customizer'
import SiteSettings from './Components/SitePreferenceSetting'
import LayoutFooter from './Components/LayoutFooter'
import CommonDropdownMixin from '@/mixins/dropdown'
import DropdownMixin from '@/mixins/dropdown-common-config'
import stateVars from '@/Utils/state-vars/common-service'
import LangButton from './Components/LangButton'
import PushNotification from './Components/PushNotification'

export default {
  name: 'VerticleLayout',
  mixins: [CommonDropdownMixin, DropdownMixin],
  components: {
    LayoutFooter,
    Customizer,
    SiteSettings,
    Notification,
    Sidebar,
    DefaultNavBar,
    LangButton,
    PushNotification
  },
  computed: {
    currentLocale () {
      return this.$i18n.locale
    },
    totalNotification () {
      return this.$store.state.totalNotification
    },
    ...mapGetters({
      authUser: 'Auth/authUser',
      verticalMenu: 'Auth/getActiveMenus'
    }),
    toggleSideIcon () {
      let show = false
      switch (this.$route.name) {
        case 'dashboard.home-6':
          show = false
          break
      }
      return show
    }
  },
  // sidebarTicket
  data () {
    return {
      animated: { enter: 'fadeInUp', exit: 'fadeOut' },
      userProfile: profile,
      onlyLogo: true,
      onlyLogoText: false,
      sidebarGroupTitle: true,
      logo: Logo,
      SmallSidebarLogo: Logo,
      // notBookmarkRouts: [],
      mixinComponentId: 1,
      // role: this.$store.state.Auth.loggedUseRole,
      authServiceBaseUrl: authServiceBaseUrl
    }
  },
  watch: {
    currentLocale: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.localizeDropdownCommonConfig({ value: newVal })
      }
    }
  },
  created () {
    this.mixinSetOrganizationProfileList()

    if (window.performance) {
      // this.langChange(this.selectedLang)
      this.$store.dispatch('mutateCommonProperties', { hasDropdownLoaded: false })
    }
  },
  methods: {
    changeLogo (e) {
      this.logo = e
    },
    sidebarMini () {
      core.triggerSet()
      this.$store.dispatch('Setting/miniSidebarAction')
    },
    logout () {
      this.$store.dispatch('Auth/updateAuthUser', null)
      this.$store.commit('mutateCommonProperties', {
        hasDropdownLoaded: false
      })
      this.$router.push('/auth/login')
    },
    routerAnimationChange (e) {
      this.animated = e
    },
    ...mapActions({
      // changeCommonDropdown: 'changeCommonDropdown',
      localizeDropdownCommonConfig: 'localizeDropdownCommonConfig'
    })
  },
  beforeDestroy () {
    this.$store.dispatch('clearStoreBasedOnLayout', { destination: 'commonObjCommonConfig', stateVars: stateVars })
  }
}
</script>
<style>
  @import url("../assets/css/custom.css");
</style>
