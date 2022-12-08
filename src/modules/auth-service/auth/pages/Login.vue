<template>
  <div class="login_wrapper">
    <div>
      <div class="card login-form">
        <div class="card-body">
          <div class="login-form-area">
            <div class="card-title text-center" style="margin-bottom: 20px">
            </div>
            <b-alert :show="errorAlert" variant=" " dismissible fade class="login_alert text-white bg-danger"
              style="width: 100%;display: block;padding: 5px 10px;">
              <div class="iq-alert-text">{{ errorMsg }}</div>
            </b-alert>
            <div class="card-text">
              <div class="loader" v-show="loading">
                <img src="@/assets/images/login/loader.gif" alt="">
              </div>
              <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
                <b-form @submit.prevent="handleSubmit(login)" @reset.prevent="reset" autocomplete="off">
                  <ValidationProvider name="Username/Email/Mobile" vid="email" rules="required">
                    <b-input-group label-for="email" slot-scope="{ valid, errors }" style="display: block;height: 60px;">
                      <b-input-group-prepend style="display: inline-block;vertical-align: bottom;">
                        <span class="input-group-text" style="display: block;padding: 5px 12px;background: #3DB043"><i
                            class="fa fa-user fa-lg" style="color: #fff;font-size: 17px;"></i></span>
                      </b-input-group-prepend>
                      <b-form-input style="display: inline-block;width: 85%;height: 34px;" id="email" v-model="user.email"
                        :placeholder="$t('globalTrans.usernameOrEmail')" :state="errors[0] ? false : (valid ? true : null)">
                      </b-form-input>
                      <div class="invalid-feedback" style="font-size: 14px;width: auto;margin-top:0;">
                        <b>{{ errors[0] }}</b>
                      </div>
                    </b-input-group>
                  </ValidationProvider>
                  <ValidationProvider name="password" rules="required|min:3">
                    <b-input-group label-for="password" slot-scope="{ valid, errors }" style="display: block;height: 60px;"
                      class="">
                      <b-input-group-prepend style="display: inline-block;vertical-align: bottom;">
                        <span class="input-group-text" style="display: block;padding: 5px 12px;background: #3DB043"><i
                            class="fa fa-lock" style="color: #fff;font-size: 17px;" aria-hidden="true"></i></span>
                      </b-input-group-prepend>
                      <b-form-input style="display: inline-block;width: 85%;height: 34px;" id="password" type="password"
                        v-model="user.password" :placeholder="$t('globalTrans.password')" autocomplete="off"
                        :state="errors[0] ? false : (valid ? true : null)"></b-form-input>
                      <div class="invalid-feedback" style="font-size: 14px;width: auto;margin-top:0;">
                        <b>{{ errors[0] }}</b>
                      </div>
                    </b-input-group>
                  </ValidationProvider>
                  <slot v-if="isHit >= 3">
                    <ValidationProvider name="Recaptcha" vid="recaptcha" rules="required" v-slot="{ errors }">
                      <vue-recaptcha :sitekey="sitekey" :loadRecaptchaScript="true" ref="recaptcha" type="invisible"
                        @verify="onCaptchaVerified" v-model="user.recaptcha" @expired="onCaptchaExpired" />
                      <div style="font-size: 14px;color:#fb6363" class="invalid-feedback d-block"
                        v-if="capchaError && capchaError.recaptcha">
                        <b>{{ capchaError.recaptcha[0] }}</b>
                      </div>
                      <div class="d-block invalid-feedback" style="font-size: 14px;color:#fb6363">
                        <b>{{ errors[0] }} </b>
                      </div>
                    </ValidationProvider>
                  </slot>
                  <div class="custom-control custom-checkbox">
                    <b-row>
                      <b-col sm="12">
                        <input type="checkbox" class="custom-control-input" id="customControlInline" />
                        <label class="custom-control-label" for="customControlInline">{{ $t('globalTrans.remember_me')
                        }}</label>
                      </b-col>
                      </b-row>
                  </div>
                  <div class="mt-3">
                    <b-row>
                      <b-col sm="12">
                        <button class="btn btn-success btn-block login-btn" type="submit">{{ $t('globalTrans.login') }}</button>
                      </b-col>
                    </b-row>
                  </div>
                  </b-form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RestApi, { authServiceBaseUrl } from '@/config/api_config'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import logout from '@/Utils/logout'
import SidebarItemsExternal from '@/FackApi/json/SideBarExternalUser'
import { VueRecaptcha } from 'vue-recaptcha'

export default {
  components: { ValidationObserver, ValidationProvider, VueRecaptcha },
  data: () => ({
    loading: false,
    returnUrl: '',
    user: {
      username: '',
      password: '',
      email: '',
      nothi_login: 0,
      recaptcha: ''
    },
    capchaError: [],
    sitekey: '',
    errorAlert: false,
    loadingPage: true,
    validateCaptcha: false,
    isHit: 0,
    errorMsg: ''
  }),
  created () {
    localStorage.setItem('user_panel_type', 'guest')
    this.sitekey = process.env.VUE_APP_SITE_KEY
    this.returnUrl = process.env.VUE_APP_NOTHI_BASE_URL + '/login?referer=' + btoa(window.location.origin + '/auth/nothi-login-process')
  },
  computed: {
    ...mapGetters({
      serviceUrl: 'Portal/serviceUrl'
    })
  },
  mounted () {
    this.loadingPage = false
    this.$store.dispatch('Auth/setAccessToken', null)
    this.$store.dispatch('Auth/updateAuthUser', null)
    this.$store.dispatch('Auth/setRequestHeaderVariables', { accessUsername: '', accessUserId: 0 })
  },
  methods: {
    onCaptchaVerified: function (recaptchaToken) {
      this.user.recaptcha = recaptchaToken
      this.validateCaptcha = true
    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset()
      this.user.recaptcha = ''
      this.validateCaptcha = false
    },
    async login () {
      // if user already logged in
      const isLoginPanel = localStorage.getItem('user_panel_type')
      if (isLoginPanel && isLoginPanel !== 'guest') {
        this.loading = true
        window.location.reload()
        this.loading = false
        return
      }

      try {
          this.loading = true
          this.user.username = this.user.email
          const apiResponse = await RestApi.postData(authServiceBaseUrl, '/v1/oauth/token', this.user)

          if (!apiResponse.access_token) {
            this.capchaError = apiResponse.errors
            this.errorAlert = true
            this.errorMsg = this.$t('authentication.loginError')
            this.loading = false
            this.isHit++
            return
          }
          this.$store.dispatch('Auth/setAccessToken', apiResponse.access_token)
          if (apiResponse.success) {
            this.$store.dispatch('Auth/updateAuthUser', Object.assign(
              {},
              apiResponse.user.data,
              { ssoLogin: false },
              {
                username: apiResponse.user.username,
                user_id: apiResponse.user.user_id,
                nid: apiResponse.user.nid,
                user_type: apiResponse.user.user_type,
                is_org_admin: apiResponse.user.is_org_admin,
                movement_summary: apiResponse.user.movement_summary,
                dashboard_user: apiResponse.user.dashboard_user,
                office_detail: apiResponse.user.office_detail,
                last_panel: apiResponse.user.last_panel,
                panels: apiResponse.user.panels
              }
            ))
            // please understand the whole process before changing this (implemented by Hasinur)
            const loginPanel = apiResponse.user.office_detail !== null ? 'admin' : 'external'
            localStorage.setItem('user_panel_type', loginPanel)
            // end changes
            this.$store.dispatch('Auth/setRequestHeaderVariables', {
              accessUsername: apiResponse.user.username,
              accessUserId: apiResponse.user.user_id
            })
            /** except office user other user will be go to external panel common dashboard */
            // if (apiResponse.user.user_type === 0) {
            //   this.$router.push('/auth/role-select').catch(() => {})
            //   return
            // }
            let homePage = ''
            if (homePage === undefined || homePage === null || homePage.length < 10) {
              homePage = '/common-service/dashboard'
            }
            if (apiResponse.user.user_type === 0) {
              homePage = '/auth/role-select'
            }
            this.$router.push(homePage).catch(() => {})
            // this.navigateToExternalPanel()
            // this.onCaptchaExpired()
          } else {
              this.capchaError = apiResponse.errors
              this.errorAlert = true
              this.errorMsg = this.$t('authentication.loginError')
              this.$router.push('/auth/login')
          }
      } catch (error) {
        if (error) {
          //
        }
        this.errorAlert = true
        this.errorMsg = this.$t('authentication.loginError')
        this.loading = false
      }
    },
    navigateToExternalPanel () {
      const serviceUrl = this.serviceUrl.externalPanelServiceUrl
      if (serviceUrl === undefined || serviceUrl === null || serviceUrl === '') {
        const homePage = this.getLastActivePanelUrl()
        this.$router.push({ name: homePage }).catch(() => {})
        return
      }
      this.$router.push(serviceUrl).catch(() => {})
    },
    getLastActivePanelUrl () {
      const panelName = this.$store.state.Auth.authUser.last_panel
      if (panelName === '') {
        return 'external-user.common_dashboard'
      }
      const targetUrl = SidebarItemsExternal[panelName][0].link.name
      return targetUrl
    },
    logout () {
      logout()
    }
  }
}
</script>

<style scoped>
.login_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 0 2rem; */
  }
  .login_wrapper .company-logo {
    margin-top: 50px;
    padding: 2px 15px;
    color: #fff;
    background: rgb(29 76 29 / 70%) !important;
    text-align: right;
    border-radius: 4px;
    box-shadow: 0px 1px 6px 1px rgb(24 51 21);
  }
  .login_wrapper .company-logo a:hover {
    text-decoration: none !important;
  }
  .card {
    background: rgb(29 76 29 / 34%) !important;
    /* border: none !important; */
    color: #fff !important;
    min-width: 22em !important;
    border: 1px solid rgb(0, 255, 255);
    z-index: 999999;
    box-shadow: 0px 1px 6px 1px rgb(24 51 21);
  }
  .card-body {
    padding: 20px;
  }
  .login_wrapper .company-logo {
    margin-top: 50px;
    padding: 2px 15px;
    color: #fff;
    background: rgb(29 76 29 / 70%) !important;
    text-align: right;
    border-radius: 4px;
    box-shadow: 0px 1px 6px 1px rgb(24 51 21);
  }
  .login_wrapper .company-logo a:hover {
    text-decoration: none !important;
  }
  .login-form {
    border: 1px #FFF !important;
  }
  .login-form-area {
    position: relative !important;
  }
  .login-form-area .login-btn {
    font-size: 0.96rem;
  }
  .login-form-area .login-btn:hover {
    text-decoration: none !important;
  }
  .font-bn .login-form-area .login-btn {
    font-size: 1.1rem;
  }
  .loader {
    background: rgb(29 80 26 / 90%);
    left: -20px !important;
    top: 32px !important;
    width: 114% !important;
    height: 119% !important;
    z-index: 100;
  }
  .loader img {
    position: absolute !important;
    top: 50%;
    left: 50%;
    width: 85px;
    transform: translate(-50%, -50%);
    z-index: 9;
  }
  input#email[data-v-3f9ae065], input#password[data-v-3f9ae065] {
      height: 32px;
      background: #ffffffc2 !important;
      border: none;
      border-radius: 0px 50px 50px 0px;
  }
  a {
    color: #ffffff !important;
  }
  a:hover {
      color: #eee !important;
      text-decoration: underline !important;
  }
  .card-header{
    background-color: #c7cef8 !important; border-bottom: 0px!important;
  }
  .btn-custom{
    background-color: #596DE1;
    color: #fff;
  }
  input#email, input#password{
    border: 1px solid #c1c1c1;
  }
  .invalid-feedback{
    margin-left: 43px;
  }
  .form-control {
    background: #FFF !important;
    color: #000 !important;
  }
  label {
    color: #ffffff;
  }
  [dir=ltr][mode=light] .is-invalid ~ .invalid-feedback, [dir=ltr][mode=light] .is-invalid ~ .invalid-tooltip, [dir=ltr][mode=light] .was-validated :invalid ~ .invalid-feedback, [dir=ltr][mode=light] .was-validated :invalid ~ .invalid-tooltip {
    font-weight: 500;
    font-size: 14px;
    color: #fb6363;
  }

  .alert .iq-alert-text {
    width: 95%;
    font-size: 13px;
    display: inline-block;
  }
</style>
