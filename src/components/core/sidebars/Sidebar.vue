<template>
  <div class="iq-sidebar" :class="fontClass">
    <div class="iq-sidebar-logo iq-sidebar-logo-wrapper">
      <router-link :to="homeURL" class="w-100 text-center">
        <img :src="logo" v-if="onlyLogo" class="img-fluid" v-bind:style="styleObject" alt="logo">
        <!-- <span class="logo_name_wrapper">কৃষি মন্ত্রণালয়</span> -->
        <span v-if="onlyLogoText"></span>
      </router-link>
      <div class="iq-menu-bt-sidebar" :class="[toggleArrow]">
        <div class="iq-menu-bt align-self-center">
          <div class="wrapper-menu" @click="miniSidebar">
            <div class="main-circle"><i class="ri-arrow-right-s-line"></i></div>
            <div class="hover-circle"><i class="ri-arrow-left-s-line"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div id="sidebar-scrollbar">
      <nav class="iq-sidebar-menu" :class="horizontal ? 'd-xl-none' : ''">
        <CollapseMenu :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle"/>
      </nav>
      <div class="p-3"></div>
    </div>
  </div>
  <!-- TOP Nav Bar -->
</template>

<script>
import CollapseMenu from '../menus/CollapseMenu'
import { APPNAME } from '../../../config/pluginInit'
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  props: {
    homeURL: { type: Object, default: () => ({ path: '/auth/dashboard' }) },
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
    CollapseMenu
  },
  methods: {
    miniSidebar () {
      this.$emit('toggle')
    },
    setImageHeight (ministryPanelText) {
      if (ministryPanelText.length === 0) {
        this.styleObject.height = '64px'
      } else {
        this.styleObject.height = '90px'
      }
    }
  },
  data () {
    return {
      appName: APPNAME,
      styleObject: {
          height: '64px'
        }
    }
  },
  computed: {
    toggleArrow () {
      return this.$store.state.Auth.activeComponentId === 1 ? '' : 'd-md-none'
    },
    fontClass () {
      return this.$i18n.locale === 'en' ? 'en-font-size' : 'bn-font-size'
    },
    ...mapGetters({
      ministryPanelText: 'Setting/getMinistryPanelText'
    })
  },
  watch: {
    ministryPanelText (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setImageHeight(newVal)
      }
    }
  },
  mounted () {
    this.setImageHeight(this.ministryPanelText)
  }
}
</script>
