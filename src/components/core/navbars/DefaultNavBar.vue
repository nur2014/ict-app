<template>
  <!-- TOP Nav Bar -->
  <div class="iq-top-navbar" ref="iqTopNavbar">
    <div class="iq-navbar-custom" :class="horizontal ? 'd-flex align-items-center justify-content-between' : ''">
      <!-- <div class="iq-sidebar-logo">
        <div class="top-logo">
          <router-link :to="homeURL">
            <img :src="logo" class="img-fluid" alt="MoA">
            <span>{{ appName }} </span>
          </router-link>
        </div>
      </div> -->
      <div class="iq-menu-horizontal" v-if="horizontal">
        <div class="iq-sidebar-menu">
          <CollapseMenu :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle" class="collapse-menu"/>
          <HoverMenu :items="items" :sidebarGroupTitle="sidebarGroupTitle" class="hover-menu" />
        </div>
      </div>
      <div class="project-title-mobile d-md-none d-sm-block">
        {{ $t('globalTrans.project_name') }}
        <div class="project-sub-title-mobile">({{ $t('globalTrans.ministry_full_name') }})</div>
        <div v-if="panelText.length !== 0">{{ panelText }}</div>
      </div>
      <nav class="navbar navbar-expand-lg navbar-light py-0 px-3">
        <div class="project-title text-center w-100 d-sm-none d-md-block">
          <div v-if="panelText.length !== 0" class="banner-bottom-text">{{ panelText }}</div>
        </div>
        <b-navbar-toggle target="nav-collapse" class="mr-2 text-primary">
          <i class="ri-menu-3-line"></i>
        </b-navbar-toggle>
        <div class="iq-menu-bt align-self-center" v-if="$route.meta.layout !== 'two-sidebar'">
          <div class="wrapper-menu" @click="miniSidebar">
            <div class="main-circle"><i class="ri-arrow-right-s-line"></i></div>
            <div class="hover-circle"><i class="ri-arrow-left-s-line"></i></div>
          </div>
        </div>
        <b-collapse id="nav-collapse" is-nav>
          <slot name="responsiveRight"/>
        </b-collapse>
        <slot name="right"/>
      </nav>
    </div>
  </div>
  <!-- TOP Nav Bar END -->
</template>
<script>
import { APPNAME } from '../../../config/pluginInit'
import { mapGetters, mapActions } from 'vuex'
import HoverMenu from '../menus/HoverMenu'
import CollapseMenu from '../menus/CollapseMenu'
export default {
  name: 'DefaultNavBar',
  props: {
    homeURL: { type: Object, default: () => ({ name: 'authSignUp.dashboard' }) },
    logo: { type: String, default: require('../../../assets/images/logo.png') },
    horizontal: { type: Boolean, default: false },
    items: { type: Array },
    sidebarGroupTitle: { type: Boolean, default: true }
  },
  mounted () {
    this.storeDefaultNavbarHeight()
  },
  components: {
    HoverMenu,
    CollapseMenu
  },
  computed: {
    currentLocale () {
      return this.$i18n.locale
    },
    ...mapGetters({
      bookmark: 'Setting/bookmarkState',
      authUser: 'Auth/authUser',
      authUserRoles: 'Auth/getAuthUserRoles',
      authUserActiveRoleId: 'Auth/getActiveRole'
    })
  },
  data () {
    return {
      appName: APPNAME,
      showSearch: false,
      showMenu: false,
      panelText: ''
    }
  },
  watch: {
    $route () {
      if (window.innerWidth < 991) {
        this.$emit('toggle')
      }
    },
    currentLocale: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.setMinistryPanelText()
      }
    }
  },
  created () {
    this.setMinistryPanelText()
  },
  methods: {
    miniSidebar () {
      this.$emit('toggle')
    },
    displayMinistryUserRole () {
      if (this.authUser === null) {
        return ''
      }
      if (this.authUser.user_type !== 0) {
        return ''
      }
      if (this.authUserRoles.length === 0) {
        return ''
      }
      if (this.authUserActiveRoleId !== 1 && this.authUser.org_id === 1) {
        const role = this.authUserRoles.find(item => item.id === this.authUserActiveRoleId)
        return this.currentLocale === 'en' ? role.role_name + ' Dashboard' : role.role_name_bn + ' ড্যাশবোর্ড '
      } else if (this.authUserActiveRoleId === 1) {
        return ''
      }
      const org = this.$store.state.orgList.find(item => item.value === this.authUser.org_id)
      return this.currentLocale === 'en' ? org.text_en : org.text_bn
    },
    storeDefaultNavbarHeight () {
      let height = this.$refs.iqTopNavbar.clientHeight
      let text = this.displayMinistryUserRole()
      if (text) {
        height += -50
      } else {
        text = ''
      }
      this.updateDefaultNavbarHeight({ height, text })
    },
    setMinistryPanelText () {
      const tmp = this.displayMinistryUserRole()
      if (tmp) {
        this.panelText = tmp
      }
    },
    ...mapActions({
      updateDefaultNavbarHeight: 'Setting/setDefaultNavbarHeight'
    })
  }
}
</script>

<style scoped lang="scss">
@media only screen and (max-width: 768px) {
    .project-title-mobile {
      padding: 10px 10px 5px;
      font-size: 15px;
      color: rgb(255, 255, 255);
      font-weight: 700;
      width: 100%;
      text-align: center;
    }
    .project-sub-title-mobile {
      font-size: 16px;
      color: red;
      margin-top: 0;
    }
  }
  // .project-title-mobile, .project-sub-title-mobile{
  //   display: none;
  // }
  .project-title {
    // padding-left: 100px;
    font-size: 26px;
    color: #ffffff;
    font-weight: 500;
    // width: 70%;
  }
  .project-sub-title {
    font-size: 18px;
    color: #ffffff;
    margin-top: -10px;
    font-weight: 500;
  }

  .banner-bottom-text {
    font-size: 18px;
  }

  .collapse-menu{
    @media (min-width:1300px) {
      display: none;
    }
  }
  .iq-sidebar-menu .iq-menu.hover-menu{
    display: flex;
    @media (max-width:1299px){
      display: none !important;
    }
  }
</style>
