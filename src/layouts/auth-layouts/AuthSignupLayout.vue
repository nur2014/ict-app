<template>
  <main role="main" class="container" :class="activeFont">
    <div id="language" class="btn-group btn-group-sm" role="group" aria-label="Language">
        <button type="button" class="btn btn-secondary bg-white text-success font-weight-bold" @click="changeLang()">{{ langLabel }}</button>
        <button type="button" class="btn btn-secondary bg-white font-weight-bold logout-btn" @click="logout" v-if="checkLogin()">{{ $t('nav.user.signout')}}</button>
        <b-dropdown :text="$t('nav.user.switchRole')" class="ml-2 bg-white switch-role" variant="outline-custom" no-caret v-if="checkLogin() && authUserRoles.length > 1 && authUserActiveRoleId">
          <b-dropdown-item href="#" v-for="role in authUserOtherRoles" :key="role.id" @click="switchRole(role.id)">
            {{ $i18n.locale === 'en' ? role.role_name : role.role_name_bn }} <i class="las la-arrow-circle-right"></i>
          </b-dropdown-item>
        </b-dropdown>
    </div>
    <div class="row py-2 sticky">
      <div class="col title text-center py-2">
          <h3 class="project-name">{{ $t('globalTrans.project_name') }}</h3>
          <h4 class="ministry-name">({{ $t('globalTrans.ministry_full_name') }})</h4>
      </div>
    </div>
    <router-view></router-view>
    <p class="slogan-top p-2 m-2" v-if="dialogueInfos.position === 2">{{ this.$i18n.locale === 'bn' ? dialogueInfos.dialogue_bn : dialogueInfos.dialogue }}</p>
    <p class="slogan-bottom p-2 m-2"  v-if="dialogueInfos.position === 1">{{ this.$i18n.locale === 'bn' ? dialogueInfos.dialogue_bn : dialogueInfos.dialogue }}</p>
  </main>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import logo from '../../assets/images/logo.png'
import { core } from '../../config/pluginInit'
import bgImage from '../../assets/images/login/bg1.jpg'
import RestApi, { commonServiceBaseUrl } from '@/config/api_config'

export default {
  name: 'AuthLayout',
  components: {},
  created () {
    this.getDialogueInfo()
  },
  computed: {
    activeFont: function () {
      return this.$i18n.locale === 'en' ? 'font-en' : 'font-bn'
    },
    authUserOtherRoles: function () {
      return this.authUserRoles.filter(item => item.id !== this.authUserActiveRoleId)
    },
    ...mapGetters({
      authUserActiveRoleId: 'Auth/getActiveRole',
      authUserRoles: 'Auth/getAuthUserRoles'
    })
  },
  methods: {
    checkLogin () {
      const loggedIn = this.$store.state.Auth.accessToken
      const authUser = this.$store.state.Auth.authUser
      if (loggedIn && authUser) {
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
      this.langLabel = this.$i18n.locale === 'bn' ? this.$t('globalTrans.en') : this.$t('globalTrans.bn')
      this.setLocale(this.$i18n.locale)
    },
    logout () {
      this.$store.dispatch('Auth/updateAuthUser', null)
      this.$store.commit('mutateCommonProperties', {
        hasDropdownLoaded: false
      })
      this.$router.push('/auth/login')
    },
    switchRole (roleId) {
      this.$store.dispatch('Auth/setActiveRole', roleId)
      this.$router.push('/auth/switch-role')
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
      langLabel: this.$i18n.locale === 'bn' ? this.$t('globalTrans.en') : this.$t('globalTrans.bn'),
      options: {
        slidesPerView: 1,
        loop: true
      },
      logo: logo,
      bgImageURL: bgImage,
      dialogueInfos: ''
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
        background-image: url('../../assets/images/login/bg-signup.jpg');
        background-attachment: fixed;
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 100vh;
        min-width: 100vw;
        font-weight: 400 !important;
        position: relative;
      }
      #language{
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 9999;
      }
      .mujib{ position: absolute; top: 10px; right: 10px; }
      .slogan-top{
          position: absolute;
          top: 45px;
          left: 20px;
          color: #fff;
          font-weight: bold;
          border: 2px solid #fff;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
      .slogan-bottom{ position: absolute; bottom: 5px; left: 10px; border: 2px solid #fff; font-weight: bold; color: #fff; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);}
      h3.project-name {
        color: rgb(22, 21, 21) !important;
        font-weight: 700 !important;
        font-size: 1.79rem;
        text-shadow: 1px 0px 1px #fff;
      }
      h4.ministry-name {
        font-weight: 700 !important;
    font-size: 1.35rem;
    color: #161515;
        text-shadow: 1px 0px 1px #fff;
      }
      .btn-custom{ background-color: #596DE1; color: #fff; }
      @media only screen and (max-width: 768px) {
          .mujib{ position: inherit; display: block; margin:10px auto; padding-top: 50px;}
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
