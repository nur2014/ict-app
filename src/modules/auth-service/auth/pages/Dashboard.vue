<template>
  <div class="container-fluid">
    <div class="wrapper component-wrapper">
      <div class="row mt-3">
        <div v-if="!loader && authUser.dashboard_user !== 0" class="col-md-12">
          <router-link :to="{ path: '/ministry/dashboard/seed' }" class="btn btn-primary"><i class="fas fa-reply-all"></i>
            {{ $t('ministryDashboard.back') }}</router-link>
        </div>
        <div v-if="loader" class="col-md-12 text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
          <br />
          <p class="loading-text">{{ $t('authentication.loadingMenus') }}</p>
        </div>
        <div v-else class="col-sm-6 col-md-4 col-lg-3 component_item" v-for="item in componentList" :key="item.id"
          @click="setComponent(item.id)">
          <div class="card_item">
            <span class="item_title">{{ ($i18n.locale === 'en') ? item.component_name : item.component_name_bn }}</span>
            <img class="item_icon" :src="require(`../../../../assets/images/icon-dashboard/${item.id}.svg`)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RestApi, { commonServiceBaseUrl } from '@/config/api_config'
import { sidebarMenusApi } from '../api/routes'
import { EventBus } from '@/EventBusLayout'

export default {
  props: ['dashboardUrl'],
  data () {
    return {
      loader: false,
      orgList: [],
      componentId: 0,
      componentList: [],
      destinationUri: '',
      menus: [],
      authorizedURIs: [
        '/common-service/settings/site-preference',
        '/movement/movement-summary',
        '/security/password/change',
        '/common-service/received-notifications/list'
      ]
    }
  },
  computed: {
    currentLocale: function () {
      return this.$i18n.locale
    },
    ...mapGetters({
      authorizedComponents: 'Auth/getAuthorizedComponents',
      activeRole: 'Auth/getActiveRole',
      authUserActiveRoleId: 'Auth/getActiveRole',
      authUserRoles: 'Auth/getAuthUserRoles',
      authUser: 'Auth/authUser'
    })
  },
  watch: {
    currentLocale: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.displayMinistryUserRole(this.orgList)
      }
    },
    orgList: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.displayMinistryUserRole(newVal)
      }
    }
  },
  created () {
    this.setOrgAndOrgComponentList()
    this.setActiveMenus([])
    this.setComponentList()
    this.setUrlToComponentId()
    this.setComponent(1)
  },
  methods: {
    setUrlToComponentId () {
      if (this.dashboardUrl === undefined) {
        return
      }
      this.componentId = 0
      this.setComponent(this.componentId)
    },
    setOrgAndOrgComponentList () {
      RestApi.getData(commonServiceBaseUrl, 'common/org-and-org-component-list').then(response => {
        if (response.success === true) {
          const tmpData = response.data.orgList.map(item => {
            const tmp = this.$i18n.locale === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
          })
          this.displayMinistryUserRole(tmpData)
          this.orgList = tmpData
        }
      })
    },
    displayMinistryUserRole (orgList) {
      if (this.authUser === null) {
        return
      }
      let text = ''
      if (this.authUser.user_type !== 0) {
        text = ''
      } else if (this.authUserActiveRoleId !== 1 && this.authUser.org_id === 1) {
        const tmp = this.authUserRoles.find(item => item.id === this.authUserActiveRoleId)
        text = this.$i18n.locale === 'en' ? tmp.role_name : tmp.role_name_bn
        text = text + ' ' + this.$t('globalTrans.top_nav_panel_text')
      } else if (this.authUserActiveRoleId === 1) {
        text = ''
      } else {
        text = orgList.find(item => item.value === this.authUser.org_id).text
      }
      EventBus.$emit('DISPLAY_MINISTRY_USER_ROLE', text)
    },
    setComponentList () {
      if (this.authorizedComponents.length === 0) {
        this.componentList = []
        return
      }
      const componentList = this.authorizedComponents.map(item => ({ icon: '', ...item }))
      this.componentList = componentList
    },
    setComponent (componentId) {
      if (componentId === 1) {
        this.destinationUri = '/common-service/dashboard'
      } else {
        this.$toast.error({
          title: 'Error',
          message: this.$t('authentication.noPrivilege')
        })
        this.$router.push('/auth/login')
        return
      }
      this.authorizedURIs.push(this.destinationUri)
      this.setActiveComponentId(componentId)
      this.getMenusByRoleComponent(componentId)
    },
    getMenusByRoleComponent (componentId) {
      this.loader = true
      RestApi.getData(commonServiceBaseUrl, `${sidebarMenusApi}/${this.activeRole}/${componentId}`).then(response => {
        if (!response.success) {
            this.$toast.error({
            title: 'Error',
            message: this.$t('authentication.noPrivilege')
          })
          this.$router.push('/auth/login')
          return
        }
        this.menus = response.data
        this.formatActiveMenus(componentId)
        // this.loader = false
      }, error => {
        if (error) {
          this.loader = false
        }
      })
    },
    formatActiveMenus (componentId) {
      const componentInfo = this.authorizedComponents.find(item => item.id === componentId)
      const menusByComponent = this.menus.modules.map(item => {
        const formatedMenu = this.getFormatedModuleMenu(item)
        const serviceMenus = this.getServiceMenusByModuleId(item.id)
        const childMenus = this.getMenusByModuleId(item.id)
        if (childMenus.length) {
          formatedMenu.children.push(...childMenus)
        }
        if (serviceMenus.length) {
          formatedMenu.children.push(...serviceMenus)
        }
        return formatedMenu
      })
      const lang = this.$i18n.locale
      menusByComponent.unshift({
        title: componentInfo.component_name,
        title_bn: componentInfo.component_name,
        name: lang === 'en' ? componentInfo.component_name : componentInfo.component_name,
        is_heading: false,
        is_active: true,
        link: this.destinationUri,
        class_name: '',
        is_icon_class: false,
        icon: 'ri-record-circle-line'
      })
      menusByComponent.unshift({
        title: 'Home',
        title_bn: 'Home',
        name: lang === 'en' ? 'Home' : 'Home',
        is_heading: false,
        is_active: true,
        link: '/auth/dashboard',
        class_name: '',
        is_icon_class: true,
        icon: 'ri-home-4-line'
      })
      this.setAuthorizedUris(this.authorizedURIs)
      this.setActiveMenus(menusByComponent)
      if (this.componentId !== 0) {
        this.$router.push(this.dashboardUrl)
      } else {
        this.$router.push(this.destinationUri)
      }
    },
    getServiceMenusByModuleId (moduleId) {
      const services = this.menus.services.filter(item => item.module_id === moduleId)
      if (!services.length) {
        return []
      }
      const serviceMenus = services.map(item => this.getMenusByServiceId(item))
      return serviceMenus
    },
    getMenusByServiceId (service) {
      // Menus belog to services
      const menus = this.menus.menus.filter(item => item.service_id === service.id)
      if (!menus.length) {
        return []
      }
      const formatedMenu = this.getFormatedServiceMenu(service)
      const formatedChildMenus = menus.map(item => this.getFormatedMenu(item))
      formatedMenu.children.push(...formatedChildMenus)
      return formatedMenu
    },
    getMenusByModuleId (moduleId) {
      // Menu which does not belong to services
      const menus = this.menus.menus.filter(item => !item.service_id && item.module_id === moduleId)
      if (!menus.length) {
        return []
      }
      const formatedMenus = menus.map(item => this.getFormatedMenu(item))
      return formatedMenus
    },
    getFormatedMenu (menuItem) {
      // Format menu here
      const lang = this.$i18n.locale
      let url = menuItem.url.trim()
      url = url.startsWith('/') ? url : `/${url}`
      this.authorizedURIs.push(url)
      if (menuItem.associated_urls !== null && menuItem.associated_urls.trim() !== '') {
        const tmpUrls = menuItem.associated_urls.split(',')
        tmpUrls.forEach(item => {
          this.authorizedURIs.push(item.trim())
        })
      }
      return {
        title: menuItem.menu_name,
        title_bn: menuItem.menu_name,
        name: lang === 'en' ? menuItem.menu_name : menuItem.menu_name,
        is_heading: false,
        is_active: true,
        link: url,
        class_name: '',
        is_icon_class: true,
        icon: 'ri-record-circle-line'
      }
    },
    getFormatedModuleMenu (item) {
      const lang = this.$i18n.locale
      return {
        title: item.module_name,
        title_bn: item.module_name,
        name: lang === 'en' ? item.module_name : item.module_name,
        is_heading: false,
        is_active: false,
        link: '',
        class_name: '',
        is_icon_class: true,
        icon: 'ri-record-circle-line',
        children: []
      }
    },
    getFormatedServiceMenu (item) {
      const lang = this.$i18n.locale
      return {
        title: item.service_name,
        title_bn: item.service_name,
        name: lang === 'en' ? item.service_name : item.service_name,
        is_heading: false,
        is_active: true,
        link: '',
        class_name: 'iq-submenu-data',
        is_icon_class: true,
        icon: 'ri-record-circle-line',
        children: []
      }
    },
    ...mapActions({
      setActiveComponentId: 'Auth/setActiveComponentId',
      setActiveMenus: 'Auth/setActiveMenus',
      setAuthorizedUris: 'Auth/setAuthorizedMenus'
    })
  }
}
</script>

<style scoped>
.card_item{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    margin: 15px 0;
    height: 120px;
    cursor: pointer;
    border-left: 8px solid var(--brand-secondary-color);
    border-radius: 5px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 0px 11px 3px rgba(0,0,0,0.4);
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.2);
    transition: 0.5s all;
  }
  .card_item .item_title{
    color: #2d3436;
    font-size: 15px;
    font-weight: 600;
  }
  .card_item .item_icon{
    width: 40px;
    margin-left: 10px;
    display: block;
    transition: 0.5s all;
  }
  /* .component_item:nth-child(1){
    color: #002C6A;
    border-color: #002C6A;
  }
  .component_item:nth-child(2){
    color: #00B894;
    border-color: #00B894;
  }
  .component_item:nth-child(3){
    color: #B02790;
    border-color: #B02790;
  }
  .component_item:nth-child(4){
    color: #E98B00;
    border-color: #E98B00;
  }
  .component_item:nth-child(5){
    color: #9C27B0;
    border-color: #9C27B0;
  }
  .component_item:nth-child(6){
    color: #2196F3;
    border-color: #2196F3;
  }
  .component_item:nth-child(7){
    color: #E91F63;
    border-color: #E91F63;
  }
  .component_item:nth-child(8){
    color: #00AB2F;
    border-color: #00AB2F;
  }
  .component_item:nth-child(9){
    color: #513CE9;
    border-color: #513CE9;
  }
  .component_item:nth-child(10){
    color: #E74C3C;
    border-color: #E74C3C;
  } */
  .card_item:hover .item_icon{
    transform: scale(1.2);
  }
  .card_item:hover{
    transform: scale(1.1);
    box-shadow: -3px 0px 5px 2px rgb(0 0 0 / 18%) inset;
  }
  .font-bn .card_item .item_title {
    font-size: 17px;
    font-weight: 600;
    line-height: 1.8rem;
  }
  /* .card {border: 0px!important;}
  .card-header {background-color: #c7cef8 !important; border-bottom: 0px!important;}
  .btn-custom {background-color: #596DE1; color: #fff;}
  .singleItem {
    box-shadow: 2px 6px 11px 0px #000;
    background-color: transparent !important;
    background: #1d4c1da6 !important;
    min-height: 179px !important;
    transition: transform 600ms;
  }
  .singleItem:hover {
    background-color: transparent !important;
    background: #153615d8 !important;
    transition: 900ms;
    transform: skew(-10deg, 0deg);
  }
  .singleItem:hover h3 {
    color: rgb(255, 98, 87) !important;
  }
  h3 {
    text-shadow: 1px 1px 1px #000;
    color: #2b9200 !important;
    color: #FFF !important;
  } */
  .loading-text {
    font-size: 18px;
    font-weight: 600;
  }
  .component-wrapper {
    padding: 0 50px;
  }
  @media only screen and (max-width: 425px) {
  .component-wrapper {
      padding: 0 10px;
    }
  }
</style>
