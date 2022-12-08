<template>
    <ul class="navbar-list">
      <li class="" v-nav-toggle>
        <a href="#" class="search-toggle iq-waves-effect d-flex align-items-center rounded">
          <div class="caption">
            <slot v-if="authUser.photo">
              <img :src="authServiceBaseUrl + authUser.photo" class="img-fluid user_img" :title="authUser.name">
            </slot>
            <slot v-else>
              <h6 class="mb-0 line-height text-white" :title="authUser.name">Admin</h6>
            </slot>
          </div>
        </a>
        <div class="iq-sub-dropdown iq-user-dropdown">
          <div class="iq-card shadow-none m-0">
            <div class="iq-card-body p-0 ">
              <div class="bg-info p-3">
              </div>
              <div class="d-inline-block w-100 text-center p-3">
                <a class="bg-primary iq-sign-btn" href="javascript:void(0)" @click="logout" role="button">{{ $t('nav.user.signout') }}<i class="ri-login-box-line ml-2"></i></a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import logout from '@/Utils/logout'

export default {
  props: ['authServiceBaseUrl', 'authUser', 'userProfile'],
  data () {
    return {
      siteDropdownSettingsTitle: '',
      returnUrl: 'https://n-doptor-accounts-stage.nothi.gov.bd/logout?referer=' + btoa(window.location.origin + '/auth/login')
    }
  },
  created () {
    if (this.authUser === null) {
      this.logout()
    }
  },
  computed: {
    siteSettingDropdownTitle: function () {
      const designation = this.$store.state.commonObj.designationList.find(item => item.value === this.authUser.designation_id)
      const designationTitle = designation ? designation.text : ''
      const name = this.currentLocale === 'en' ? this.authUser.name : this.authUser.name_bn
      return `${name}, ${designationTitle}`
    },
    authUserOtherRoles: function () {
      return this.authUserRoles.filter(item => item.id !== this.authUserActiveRoleId)
    },
    currentLocale () {
      return this.$i18n.locale
    },
    ...mapGetters({
      authUserRoles: 'Auth/getAuthUserRoles',
      authUserActiveRoleId: 'Auth/getActiveRole'
    })
  },
  methods: {
    logout () {
      logout()
      // this.$store.dispatch('Auth/updateAuthUser', null)
      // this.$store.commit('mutateCommonProperties', {
      //   hasDropdownLoaded: false
      // })
      // this.$store.commit('mutateWarehouseProperties', {
      //   hasDropdownLoaded: false
      // })
      // this.$store.commit('mutateIncentiveGrantServiceProperties', {
      //   hasDropdownLoaded: false
      // })
      // this.$store.dispatch('mutateAgriMarketingProperties', { hasDropdownLoaded: false })
      // this.$router.push('/auth/login')
    },
    getLimitedAuthUserName (name) {
      const fullName = name.split(' ')
      const len = fullName.length
      let customName = ''
      if (len === 1) {
        customName = `${fullName[0][0]}${fullName[0][1]}`
      }
      if (len > 1) {
        customName = `${fullName[len - 2][0]}${fullName[len - 1][0]}`
      }
      return customName
    },
    switchRole (roleId) {
      this.$store.dispatch('Auth/setActiveRole', roleId)
      this.$router.push('/auth/switch-role')
    },
    displayMinistryUserRole () {
      if (this.authUserActiveRoleId !== 1 && this.authUser.org_id === 1) {
        return this.authUserRoles.find(item => item.id === this.authUserActiveRoleId).role_name
      }
      return false
    }
  }
}
</script>
<style scoped>
  .custom-style { cursor: pointer; }
</style>
