<template>
  <main role="main" class="container" :class="activeFont">
    <div class="row py-2">
        <div class="col">
            <h3 class="text-center project-name"></span></h3>
        </div>
    </div>
    <router-view></router-view>
    <p class="slogan p-2 m-2"></p>
  </main>
</template>
<script>
import logo from '../../assets/images/logo.png'
import { core } from '../../config/pluginInit'
import bgImage from '../../assets/images/login/bg1.jpg'
import RestApi, { authServiceBaseUrl } from '@/config/api_config'
import { userTypeListApi } from '@/modules/external-user-service/auth/api/routes'

export default {
  components: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      logo: logo,
      bgImageURL: bgImage
    }
  },
  computed: {
    activeFont: function () {
      return this.$i18n.locale === 'en' ? 'font-en' : 'font-bn'
    }
  },
  created () {
    RestApi.getData(authServiceBaseUrl, userTypeListApi, null).then(response => {
      this.$store.dispatch('ExternalUserAuth/setUserTypeList', response.data)
    })
  }
}
</script>
<style scoped>
    main {
        background-image: url('../../assets/images/login/bg1.jpg');
        background-attachment: fixed;
        background-size: cover;
        background-repeat: no-repeat;
        min-height: 100vh;
      }
      .mujib{ position: absolute; top: 10px; right: 10px; }
      .slogan{ position: absolute; bottom: 20px; left: 20px; border: 2px solid #fff; font-weight: bold; color: #fff; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);}
      .project-name { font-size: 24px; color: green !important; font-weight: bold; }
      .project-name span{ color: red; font-size: 20px; }
      .btn-custom{ background-color: #596DE1; color: #fff; }
      @media only screen and (max-width: 768px) {
          .mujib{ position: inherit; display: block; margin:10px auto; padding-top: 50px;}
          .slogan{ position: inherit; text-align: center; margin: 20px 0 20px 20px; display: none;}
      }
</style>
