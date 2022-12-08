import DamCustom from './dam-portal-custom'
import actions from './actions'
import getters from './getters'
import { mutations } from './mutations'

const state = {
  loading: false,
  header: {},
  serviceData: {},
  serviceList: [],
  customerTypeList: [],
  searchData: {
    loading: false,
    org_id: 0,
    customer_type_id: 0,
    service_category_id: 0
  },
  agriObj: {
    hasDropdownLoaded: false,
    organizationProfileList: [],
    divisionList: [],
    districtList: [],
    upazilaList: [],
    marketList: [],
    measurementUnitList: [],
    infrastructureList: [],
    communicationLinkageList: [],
    designationOfProductList: [],
    vehicleList: [],
    commodityTypeList: [],
    commodityGroupList: [],
    commoditySubGroupList: [],
    commodityNameList: [],
    campaignTypeList: DamCustom.campaignTypeList,
    yearList: DamCustom.yearList,
    monthList: DamCustom.monthList,
    weekList: DamCustom.weekList,
    timePreiodList: DamCustom.timePreiodList,
    priceEntryTypeList: DamCustom.priceEntryTypeList,
    priceTypeList: DamCustom.priceTypeList,
    dayList: DamCustom.dayList
  },
  trainObj: {
    hasDropdownLoaded: false,
    trainingTypeList: [],
    trainingCategoryList: [],
    trainingTitleList: []
  },
  agriResearchObj: {
    hasDropdownLoaded: false,
    publicationTypeList: [],
    publicationTitleList: [],
    organizationProfileList: [],
    thematicAreaList: [],
    publicationContentAreaList: [],
    sectorList: [],
    subSectorList: []
  },
 commonObj: {
    hasDropdownLoaded: false,
    orgList: [],
    officeTypeList: [],
    officeList: [],
    fiscalYearList: []
  },
  categoryList: [],
  orgList: [],
  faqList: [],
  newsList: [],
  noticeList: [],
  serviceUrl: {
    externalPanelServiceUrl: '',
    externalPanelCurrentServiceUrl: '',
    subsidyCircularId: 0
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
