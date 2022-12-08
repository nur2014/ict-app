import Custom from '@/store/custom'

/**
 * This store will be used for all modules of this component
 */
const stateVars = {
    hasDropdownLoaded: false,
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
  }

export default stateVars
