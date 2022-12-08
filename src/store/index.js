import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
import Setting from './Setting/index'
import Custom from './custom'
import Auth from '../modules/auth-service/auth/store'
import Portal from '../modules/portal/store'
// import PortalMarket from '../modules/portal/pages/market-directory/store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Setting,
    Portal,
    Auth
  },
  state: {
    list: [],
    notificationList: [],
    totalNotification: 0,
    isPushNotification: [],
    toggleNotification: false,
    commonObj: {
      hasDropdownLoaded: false,
      perPage: 10,
      dateFormat: 'DD/MM/YYYY',
      fiscaleYear: 'YYYY-YYYY',
      timeFormat: 'h:m',
      unitOfTime: 'day',
      loading: false,
      listReload: false,
      countryList: [],
      divisionList: [],
      districtList: [],
      upazilaList: [],
      unionList: [],
      cityCorporationList: [],
      pauroshobaList: [],
      wardList: [],
      organizationProfileList: [],
      portalServiceCategoryList: [],
      portalServiceCustomerTypeList: [],
      moduleList: [],
      officeTypeList: [],
      noticeforList: Custom.noticeForList,
      comStatusList: Custom.statusList,
      refundByList: Custom.refundByList,
      paymentTypeList: Custom.paymentTypeList,
      testingTypeList: Custom.testingTypeList,
      waterTestingStatusList: Custom.waterTestingStatusList,
      waterTestingParameters: Custom.waterTestingParameters,
      irrigationTaskTypeList: Custom.irrigationTaskTypeList,
      maritalStatus: Custom.maritalStatus,
      genderList: Custom.genderList,
      genderListEx: Custom.genderListEx,
      smartCardStatus: Custom.smartCardStatus,
      reissueStatus: Custom.reissueStatus,
      paymentApplicationTypeList: Custom.paymentApplicationTypeList,
      paymentSchemeBADCPaymentTypeList: Custom.paymentSchemeBADCPaymentTypeList,
      paymentSchemeBMDAPaymentTypeList: Custom.paymentSchemeBMDAPaymentTypeList,
      schemePaymentList: Custom.schemePaymentList,
      paymetPumpOperationPaymentTypeList: Custom.paymetPumpOperationPaymentTypeList,
      paymetSmartCardPaymentTypeList: Custom.paymetSmartCardPaymentTypeList,
      paymetWaterTestingPaymentTypeList: Custom.paymetWaterTestingPaymentTypeList,
      smartCardStatusList: Custom.smartCardStatusList,
      smartCardApplicationTypeList: Custom.smartCardApplicationTypeList,
      directoryTypeList: Custom.directoryTypeList,
      wardTypeList: Custom.wardTypeList,
      activeIntactive: Custom.activeIntactive,
      pumpOptAppStatus: Custom.pumpOptAppStatus,
      officeList: [],
      designationList: [],
      gradeList: [],
      bankObj: { componentId: null, bankList: [], branchList: [] },
      notifications: [],
      fiscalYearList: [],
      growerBuyer: Custom.growerBuyer,
      monthList: Custom.monthList,
      banglaMonthList: Custom.banglaMonthList
    },
    commonObjCommonConfig: {
      hasDropdownLoaded: false,
      customerList: [],
      componentList: [],
      reportTypes: Custom.reportTypes,
      formTypes: Custom.formTypes,
      moduleList: [],
      serviceList: [],
      serviceComList: [],
      menuList: [],
      notificationTypeList: [],
      cmtCommitteeList: [],
      cmtAgendaList: [],
      bankList: [],
      cityCorporationList: [],
      pauroshobaList: [],
      documentCategoryList: [],
      branchList: [],
      wardList: [],
      serviceEligibiltyList: [],
      buttonTypeList: Custom.buttonTypeList,
      mediaList: Custom.mediaList,
      recipientList: Custom.recipientList,
      messageTemplateList: []
    },
    warehouse: {
        hasDropdownLoaded: false,
        perPage: 10,
        dateFormat: 'dd/mm/YYYY',
        timeFormat: 'h:m',
        loading: false,
        listReload: false,
        commodityGroupList: [],
        commodityNameList: [],
        fiscalYearList: [],
        regionList: [],
        warehouseDesignationList: [],
        warehouseTypeList: [],
        warehouseInfoList: [],
        warehouseLevelList: [],
        warehouseCategoryList: [],
        serviceTypeList: [],
        marketInfoList: []
    },
    orgList: [],
    orgComponentList: [],
    dataFilters: {
      orgId: 0,
      officeTypeId: 0,
      officeId: 0
    }
  },
  actions,
  mutations,
  getters,
  plugins: [createPersistedState()],
  strict: debug
})
