<template>
  <div class="iq-sidebar" :class="fontClass">
    <div class="iq-sidebar-logo iq-sidebar-logo-wrapper">
      <router-link :to="homeURL" class="w-100 text-center">
        <img :src="logo" v-if="onlyLogo" class="img-fluid" alt="logo">
        <!-- <span v-if="onlyLogoText">{{ appName }}</span> -->
        <span v-if="onlyLogoText">{{ appName }}</span>
      </router-link>
      <div class="iq-menu-bt-sidebar" :class="[toggleArrow]">
        <div class="iq-menu-bt align-self-center">
          <div class="wrapper-menu" @click="miniSidebar">
            <div class="main-circle"><i class="ri-arrow-left-s-line"></i></div>
            <div class="hover-circle"><i class="ri-arrow-right-s-line"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div id="sidebar-scrollbar">
      <nav class="iq-sidebar-menu" :class="horizontal ? 'd-xl-none' : ''">
        <CollapseMenuExternal :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle"/>
      </nav>
      <div class="p-3"></div>
    </div>
  </div>
  <!-- TOP Nav Bar -->
</template>

<script>
import CollapseMenuExternal from '../menus/CollapseMenuExternal'
import { APPNAME } from '../../../config/pluginInit'
export default {
  name: 'SidebarExternal',
  props: {
    homeURL: { type: Object, default: () => ({ path: '/common/dashboard' }) },
    items: { type: Array },
    logo: { type: String, default: require('../../../assets/images/logo.png') },
    horizontal: { type: Boolean },
    toggleButton: { type: Boolean, default: true },
    logoShow: { type: Boolean, default: true },
    onlyLogo: { type: Boolean, default: false },
    onlyLogoText: { type: Boolean, default: false },
    sidebarGroupTitle: { type: Boolean, default: true }
  },
  components: {
    CollapseMenuExternal
  },
  methods: {
    miniSidebar () {
      this.$emit('toggle')
    }
  },
  data () {
    return {
      appName: APPNAME
    }
  },
  computed: {
    toggleArrow () {
      return this.$store.state.Auth.activeComponentId === 1 ? '' : 'd-md-none'
    },
    fontClass () {
      return this.$i18n.locale === 'en' ? 'en-font-size' : 'bn-font-size'
    }
  }
}
</script>
