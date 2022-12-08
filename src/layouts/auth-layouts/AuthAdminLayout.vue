<template>
  <main role="main" :class="activeFont">
    <!-- custom header -->
    <div class="custom_header container-fluid">
      <div class="logo-lang-wrapper">
        <div class="mr-3">
        </div>
        <div id="language" class="btn-group btn-group-sm" role="group" aria-label="Language">
          <button type="button" class="btn btn-danger font-weight-bold" @click="logout" v-if="checkLogin()">{{
            $t('nav.user.signout')}}</button>
          <b-dropdown :text="$t('nav.user.switchRole')" class="ml-2 bg-white switch-role" variant="outline-custom" no-caret
            v-if="checkLogin() && authUserRoles.length > 1 && authUserActiveRoleId">
            <b-dropdown-item href="#" v-for="role in authUserOtherRoles" :key="role.id" @click="switchRole(role.id)">
              {{ $i18n.locale === 'en' ? role.role_name : role.role_name_bn }} <i class="las la-arrow-circle-right"></i>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
      <div>
      </div>
    </div>
    <router-view></router-view>
  </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import logo from '../../assets/images/logo.png'
import { core } from '../../config/pluginInit'
import bgImage from '../../assets/images/login/bg1.jpg'
import RestApi, { commonServiceBaseUrl } from '@/config/api_config'
import { EventBus } from '@/EventBusLayout'
import logout from '@/Utils/logout'

export default {
  name: 'AuthLayout',
  components: {},
  created () {
    this.getDialogueInfo()
  },
  beforeMount () {
    EventBus.$on('DISPLAY_MINISTRY_USER_ROLE', this.setMinistryuserRole)
  },
  beforeDestroy () {
    EventBus.$off('DISPLAY_MINISTRY_USER_ROLE', this.setMinistryuserRole)
  },
  computed: {
    activeFont: function () {
      return this.$i18n.locale === 'en' ? 'font-en' : 'font-bn'
    },
    langLabel: function () {
      return this.$i18n.locale === 'en' ? 'বাংলা' : 'English'
    },
    authUserOtherRoles: function () {
      return this.authUserRoles.filter(item => item.id !== this.authUserActiveRoleId)
    },
    ...mapGetters({
      authUserActiveRoleId: 'Auth/getActiveRole',
      authUserRoles: 'Auth/getAuthUserRoles',
      authUser: 'Auth/authUser'
    })
  },
  methods: {
    checkLogin () {
      const loggedIn = this.$store.state.Auth.accessToken
      if (loggedIn && this.authUser) {
          return true
      }
      return false
    },
    getDialogueInfo () {
      RestApi.getData(commonServiceBaseUrl, 'agri-dialogue', null).then(response => {
        this.dialogueInfos = response.data
      })
    },
    changeLang () {
      this.$i18n.locale = this.$i18n.locale === 'bn' ? 'en' : 'bn'
      this.setLocale(this.$i18n.locale)
    },
    logout () {
      logout()
    },
    switchRole (roleId) {
      this.$store.dispatch('Auth/setActiveRole', roleId)
      this.$router.push('/auth/switch-role')
    },
    setMinistryuserRole (payload) {
      this.ministryUserRole = payload
    },
    ...mapActions({
      setLocale: 'Setting/setLocale'
    })
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      options: {
        slidesPerView: 1,
        loop: true
      },
      logo: logo,
      returnUrl: 'https://n-doptor-accounts-stage.nothi.gov.bd/logout?referer=' + btoa(window.location.origin + '/auth/login'),
      bgImageURL: bgImage,
      dialogueInfos: '',
      ministryUserRole: ''
    }
  }
}
</script>
<style>
.font-en {
    font-family: 'Poppins', sans-serif;
  }
  .font-bn {
    font-family: 'Kalpurush';
  }
</style>
<style scoped>
main {
    /* background-image: url('../../assets/images/login/bg-signup.jpg'); */
    background-color: #eeeeee;
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
    min-width: 100vw;
    font-weight: 400 !important;
    position: relative;
    overflow-x: hidden;
  }
  .custom_header{
    /* min-height: 70px; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--brand-color);
    box-shadow: 0px 2px 8px -2px rgb(0 0 0 / 40%);
  }
  .logo-lang-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .mujib{
    display: block;
    height: 70px;
  }
  .slogan-top{
    position: absolute;
    top: 45px;
    left: 20px;
    color: #000;
    border: 2px solid #fff;
    font-weight: bold;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .slogan-bottom{
    position: absolute;
    bottom: 5px;
    left: 10px;
    color: #fff;
    border-left: 5px solid #228b22;
    border-right: 5px solid #228b22;
    background: #3db043;
    font-weight: bold;
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.2);
  }
  h3.project-name {
    color:white;
    font-weight: 700 !important;
    font-size: 1.3rem;
  }
  .font-bn h3.project-name {
    font-size: 1.5rem;
  }
  h4.ministry-name {
    color: white;
    font-weight: 700 !important;
    font-size: 1rem;
  }
  .btn-custom{ background-color: #596DE1; color: #fff; }
  @media only screen and (max-width: 721px) {
    .custom_header {
      flex-direction: column;
      padding-top: 10px;
    }
    .app-title {
      margin: 10px 0;
    }
    .mujib {
      margin-bottom: 10px;
    }
  }
  @media only screen and (max-width: 768px) {
    .slogan{ position: inherit; text-align: center; margin: 20px 0 20px 20px; display: none;}
    .slogan-top, .slogan-bottom { display: none;}
  }
  div.sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .logout-btn {
    margin-left: 10px !important;
    color: #6c757d !important
  }
  .switch-role {
    border-radius: 5px;
  }
  .btn-outline-primary {
    font-size: 20px !important;
  }
</style>
