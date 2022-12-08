<template>
  <div class="iq-sidebar" :class="fontClass">
    <div class="iq-sidebar-logo iq-sidebar-logo-wrapper">
      <router-link :to="homeURL" class="w-100 text-center">
        <img :src="logo" v-if="onlyLogo" class="img-fluid" alt="logo" v-bind:style="styleObject">
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
      <nav class="iq-sidebar-menu ministry-iq-sidebar-menu" :class="horizontal ? 'd-xl-none' : ''">
        <CollapseMenuExternal :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle"/>
      </nav>
      <div class="p-3"></div>
    </div>
  </div>
  <!-- TOP Nav Bar -->
</template>

<script>
import CollapseMenuExternal from '../menus/CollapseMenuMinistryDashboard'
import { APPNAME } from '../../../config/pluginInit'
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarExternal',
  props: {
    homeURL: { type: Object, default: () => ({ path: '/ministry/dashboard/fertilizer' }) },
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

<style scoped>
  .iq-sidebar .iq-sidebar-logo {
    box-shadow: rgb(0 0 0 / 24%) 0 3px 8px;
  }
  .iq-sidebar #sidebar-scrollbar {
    padding: 0 0 10px !important;
    background: #fff !important;
    box-shadow: rgb(0 0 0 / 24%) 0 3px 8px !important;
  }
</style>
