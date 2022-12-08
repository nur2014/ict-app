import RestApi, { commonServiceBaseUrl } from '../config/api_config'

export default {
  computed: {
    hasDropdownLoadedCommonConfig () {
      return this.$store.state.commonObjCommonConfig.hasDropdownLoaded
    }
  },
  watch: {
    hasDropdownLoadedCommonConfig: function (newValue) {
      if (!newValue) {
        this.loadDropdownCommonConfig()
      }
    }
  },
  created () {
    const hasDropdownLoadedCommonConfig = this.$store.state.commonObjCommonConfig.hasDropdownLoaded
    if (!hasDropdownLoadedCommonConfig || window.performance) {
    }
    this.loadDropdownCommonConfig()
  },
  methods: {
    loadDropdownCommonConfig () {
      RestApi.getData(commonServiceBaseUrl, 'common/dropdowns', null).then(response => {
        if (response.success) {
          this.$store.commit('mutateDropdownCommonConfig', {
            hasDropdownLoaded: true,
            customerList: response.data.customerList,
            componentList: response.data.componentList,
            moduleList: response.data.moduleList,
            serviceList: response.data.serviceList,
            serviceComList: response.data.serviceComList,
            menuList: response.data.menuList,
            notificationTypeList: response.data.notificationTypeList,
            bankList: response.data.bankList,
            cmtCommitteeList: response.data.cmtCommitteeList,
            cmtAgendaList: response.data.cmtAgendaList,
            documentCategoryList: response.data.documentCategoryList,
            branchList: response.data.branchList,
            cityCorporationList: response.data.cityCorporationList,
            pauroshobaList: response.data.pauroshobaList,
            wardList: response.data.wardList,
            serviceEligibiltyList: response.data.serviceEligibiltyList,
            messageTemplateList: response.data.messageTemplateList
          })
          this.$store.commit('localizeDropdownCommonConfig', { value: this.$i18n.locale })
        }
      })
    }
  }
}
