import RestApi, { agriMarketingServiceBaseUrl, commonServiceBaseUrl, licenseRegistrationServiceBaseUrl } from '../config/api_config'

export default {
  data () {
    return {
      countryList: [],
      marketList: []
    }
  },
  created () {
    this.getCountryList()
    this.getMarketList()
    this.loadDropdownLicenseRegistration()
  },
  methods: {
    async getCountryList () {
      const result = await RestApi.getData(commonServiceBaseUrl, 'common/country-list')
      this.countryList = result.data.length > 0 ? result.data : []
    },
    async getMarketList () {
      const result = await RestApi.getData(agriMarketingServiceBaseUrl, 'marketlist-lrcpn')
      this.marketList = result.data.marketList.length > 0 ? result.data.marketList : []
    },
    loadDropdownLicenseRegistration () {
      RestApi.getData(licenseRegistrationServiceBaseUrl, 'common-dropdowns', null).then(response => {
        if (response.success) {
          this.$store.commit('ExternalLrcpn/mutateExternalLrcpnDropdown', {
            feeNamesList: response.data.feeNamesList,
            serviceNamesList: response.data.serviceNamesList,
            stepNamesList: response.data.stepNamesList,
            menuWiseStepList: response.data.menuWiseStepList,
            dynamicFormList: response.data.dynamicFormList,
            serviceSteps: response.data.serviceSteps,
            serviceStepForm: response.data.serviceStepForm,
            dynamicButtonList: response.data.dynamicButtonList,
            stepFeeList: response.data.stepFeeList,
            seviceStepWiseButtonList: response.data.seviceStepWiseButtonList,
            menuInfoList: response.data.menuInfoList,
            reportMenuList: response.data.reportMenuList,
            autoGenNumTypeList: response.data.autoGenNumTypeList,
            labList: response.data.labList,
            activeIngredientList: response.data.activeIngredientList,
            agricultureProductTypeList: response.data.agricultureProductTypeList,
            agricultureProductList: response.data.agricultureProductList,
            foreignEnlishmentList: response.data.foreignEnlishmentList,
            countryList: this.countryList,
            marketList: this.marketList,
            preconditionList: response.data.preconditionList,
            fieldAssignList: response.data.fieldAssignList
          })
          this.$store.dispatch('ExternalLrcpn/localizeExternalLrcpnDropdown', { value: this.$i18n.locale })
        }
      })
    },
    loadDropdownCommonConfig2 () {
      RestApi.getData(commonServiceBaseUrl, 'external-common-config2-dropdowns', null).then(response => {
        if (response.success) {
          this.$store.commit('ExternalLrcpn/mutateDropdownCommonConfig', {
            bankList: response.data.bankList,
            branchList: response.data.branchList,
            cityCorporationList: response.data.cityCorporationList,
            pauroshobaList: response.data.pauroshobaList,
            wardList: response.data.wardList,
            countryList: response.data.countryList
          })
          this.$store.commit('ExternalLrcpn/localizeDropdownCommonConfig', { value: this.$i18n.locale })
        }
      })
    }
  }
}
