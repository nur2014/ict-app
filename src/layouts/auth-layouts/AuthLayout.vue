<template>
  <main :class="activeFont">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 d-none d-md-block">
                <div id="language" class="btn-group btn-group-sm ml-1 mt-1" role="group" aria-label="Language">
                </div>
                <div class="row">
                    <div class="col mojib">
                    </div>
                </div>
                <div class="row">
                    <div class="col title text-center py-2">
                    </div>
                </div>
            </div>
            <div class="col-md-4 bg-green d-flex justify-content-center align-items-center">
                <router-view></router-view>
            </div>
        </div>
    </div>
  </main>
</template>
<script>
import { mapActions } from 'vuex'
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
    langLabel: function () {
      return this.$i18n.locale === 'en' ? 'বাংলা' : 'English'
    }
  },
  methods: {
    getDialogueInfo () {
      RestApi.getData(commonServiceBaseUrl, 'agri-dialogue', null).then(response => {
        this.dialogueInfos = response.data
      })
    },
    changeLang () {
      this.$i18n.locale = this.$i18n.locale === 'bn' ? 'en' : 'bn'
      this.setLocale(this.$i18n.locale)
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
      bgImageURL: bgImage,
      dialogueInfos: ''
    }
  }
}
</script>
<style scoped>
  main {
      width: 100%;
      min-height: 100vh;
      background-image: url('../../assets/images/login/bg-signup.jpg');
      background-size: cover;
      background-repeat: no-repeat;
      font-weight: 400 !important;
  }
  #language{
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 9999;
  }
  h4.slogan-top {
    position: absolute;
    top: 45px;
    left: 20px;
    color: #fff;
    font-weight: bold;
    border: 2px solid #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  h4.slogan-bottom{
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-weight: bold;
    color: #fff;
    border: 2px solid #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .bg-green {
      min-height: 100vh;
      width: 100%;
      background-color: rgba(15, 70, 0, 70%);
  }
  @media only screen and (max-width: 667px) {
      main {
          background-image: none !important;
      }
      .bg-green {
          width: 100%;
          height: 100vh;
          background-image: url('../../assets/images/login/bg1.jpg');
          background-size: cover;
      }
  }
  .card {
      background-color: transparent !important;
      border: none !important;
      color: #fff !important;
      min-width: 24em !important;
  }
  * a {
      color: #ddd !important;
  }
  a:hover {
      color: #eee !important;
      text-decoration: underline !important;
  }
  .mojib {
      width: 100%;
  }
  .title {
      text-transform: uppercase;
      border-bottom: 1px solid seagreen;
  }
  .title-sm {
      text-transform: uppercase;
      border: none;
  }
  .title h3,
  h4 {
      font-weight: 700 !important;
  }
  .remember {
      margin: 0;
  }
  .form-control:focus {
      border: none;
      outline: 0;
      box-shadow: none;
  }
  [dir=ltr][mode=light] label {
    color: #ffffff;
  }
  .form-control {
    border: 1px solid #515252;
    background: #FFF;
  }
  h3.project-name {
    color: rgb(22, 21, 21) !important;
    font-weight: 700 !important;
    font-size: 1.79rem;
  }
  h4.ministry-name {
    font-weight: 700 !important;
    font-size: 1.35rem;
    color: #161515;
  }
</style>
