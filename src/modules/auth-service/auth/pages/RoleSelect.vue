<template>
  <div>
    <div class="row justify-content-center mt-2">
      <div class="col-md-4">
          <div class="card overflow-hidden">
              <div class="card-header">
                  <div class="avatar-md profile-user-wid">
                      <span class="avatar-title rounded-circle bg-light">
                          <img class="mx-auto d-block" src="@/assets/images/login/logo.png" height="80" />
                      </span>
                  </div>
              </div>
              <div class="card-body">
                <b-alert :show="errorAlert" variant=" " dismissible fade class="text-white bg-danger">
                  <div class="iq-alert-icon">
                    <i class="ri-information-line"></i>
                  </div>
                  <div class="iq-alert-text">{{ errorMsg }}</div>
                </b-alert>
                <div class="text-center" v-if="loading">
                  <b-spinner variant="primary" label="Text Centered"></b-spinner>
                  <br/>{{ message }}
                </div></div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import RestApi, { authServiceBaseUrl, commonServiceBaseUrl } from '@/config/api_config'
import { componentsByRoleApi, componentsOfSuperAdminApi } from '../api/routes'

export default {
  data: () => ({
    loading: true,
    errorAlert: false,
    errorMsg: '',
    message: '',
    userRoles: [],
    selectedRole: 1
  }),
  computed: {
    currentLocale () {
      return this.$i18n.locale
    }
  },
  created () {
    this.$store.dispatch('Auth/setActiveRole', 0)
    // this.getUserRoles()
    this.getComponentsByRole()
  },
  methods: {
    getComponentsByRole () {
      let baseUrl = authServiceBaseUrl
      let api = `${componentsByRoleApi}/${this.selectedRole}`
      if (this.selectedRole === 1) {
        baseUrl = commonServiceBaseUrl
        api = componentsOfSuperAdminApi
      }

      this.loading = true
      this.message = this.$t('authentication.checkingPermissions')
      RestApi.getData(baseUrl, api).then(response => {
        if (!response.success) {
          this.$toast.error({
            title: 'Error',
            message: this.$t(response.message_i18n_code)
          })
          this.$router.push('/auth/login')
          return
        } else if (response.data.length === 0) {
          this.$toast.error({
            title: 'Error',
            message: this.$t('authentication.noPrivilege')
          })
          this.$router.push('/auth/login')
          return
        }
        this.$store.dispatch('Auth/setActiveRole', 1)
        this.$store.dispatch('Auth/setAuthorizedComponents', response.data)
        this.loading = false
        this.$router.push('/auth/dashboard')
         }, error => {
        this.loading = false
        this.$router.push('/auth/login')
        if (error) {
          //
        }
      })
    }
  }
}
</script>
<style>
/* @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@600&display=swap'); */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;900&display=swap');
</style>

<style scoped>
        .overflow-hidden {
          box-shadow: 1px 4px 12px 2px black;
        }
        .card{border: 0px!important;}
        .card-header{
          background-color: #c7cef8 !important; border-bottom: 0px!important;
        }
        .btn-custom{background-color: #596DE1; color: #fff;}
        input#email, input#password{
          border: 1px solid #c1c1c1;
        }
        .invalid-feedback{
          margin-left: 43px;
        }
</style>
