export const mutations = {
    mutatePortalLoad (state, payload) {
        state.loading = payload
    },
    mutateHeader (state, payload) {
        state.header = payload
    },
    mutateServiceData (state, payload) {
        state.serviceData = payload
        state.orgList = payload.orgList
        state.customerTypeList = payload.serviceCustomerTypeList
        state.categoryList = payload.serviceCategoryList
    },
    mutateCustomerTypeList (state, payload) {
        state.customerTypeList = payload
    },
    mutateServiceList (state, payload) {
        state.serviceList = payload
    },
    mutateSearch (state, payload) {
        state.searchData.loading = !state.searchData.loading
        state.searchData = Object.assign(state.searchData, payload)
    },
    mutateOrgList (state, payload) {
        state.orgList = payload
    },
    mutateCategoryList (state, payload) {
        state.categoryList = payload
    },
    mutateFaqList (state, payload) {
        state.faqList = payload
    },
    mutateNoticeList (state, payload) {
        state.noticeList = payload
    },
    mutateNewsList (state, payload) {
        state.newsList = payload
    },
    mutateExternalagriDropdown (state, payload) {
        state.agriObj = Object.assign(state.agriObj, payload)
    },
    mutateAgriResearchDropdown (state, payload) {
        state.agriResearchObj = Object.assign(state.agriResearchObj, payload)
    },
    mutateTrainDropdown (state, payload) {
        state.trainObj = Object.assign(state.trainObj, payload)
    },
    mutateCommonDropdown (state, payload) {
        state.commonObj = Object.assign(state.commonObj, payload)
    },
    localizeTrainDropdown (state, payload) {
        state.trainObj.trainingTypeList = state.trainObj.trainingTypeList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.trainObj.trainingCategoryList = state.trainObj.trainingCategoryList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.trainObj.trainingTitleList = state.trainObj.trainingTitleList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
    },
    localizeExternalagriDropdown (state, payload) {
        state.agriObj.organizationProfileList = state.agriObj.organizationProfileList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.divisionList = state.agriObj.divisionList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.districtList = state.agriObj.districtList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.upazilaList = state.agriObj.upazilaList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.marketList = state.agriObj.marketList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.infrastructureList = state.agriObj.infrastructureList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.communicationLinkageList = state.agriObj.communicationLinkageList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.designationOfProductList = state.agriObj.designationOfProductList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.vehicleList = state.agriObj.vehicleList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.commodityTypeList = state.agriObj.commodityTypeList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.commodityGroupList = state.agriObj.commodityGroupList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.commoditySubGroupList = state.agriObj.commoditySubGroupList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.commodityNameList = state.agriObj.commodityNameList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.timePreiodList = state.agriObj.timePreiodList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.weekList = state.agriObj.weekList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.yearList = state.agriObj.yearList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.monthList = state.agriObj.monthList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.priceEntryTypeList = state.agriObj.priceEntryTypeList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.priceTypeList = state.agriObj.priceTypeList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriObj.measurementUnitList = state.agriObj.measurementUnitList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
    },
    localizeAgriResearchDropdown (state, payload) {
        state.agriResearchObj.publicationTypeList = state.agriResearchObj.publicationTypeList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriResearchObj.publicationTitleList = state.agriResearchObj.publicationTitleList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriResearchObj.thematicAreaList = state.agriResearchObj.thematicAreaList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriResearchObj.organizationProfileList = state.agriResearchObj.organizationProfileList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriResearchObj.publicationContentAreaList = state.agriResearchObj.publicationContentAreaList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriResearchObj.sectorList = state.agriResearchObj.sectorList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.agriResearchObj.subSectorList = state.agriResearchObj.subSectorList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
    },
    localizeCommonDropdown (state, payload) {
        state.commonObj.fiscalYearList = state.commonObj.fiscalYearList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.commonObj.organizationProfileList = state.commonObj.organizationProfileList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.commonObj.officeTypeList = state.commonObj.officeTypeList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.commonObj.officeList = state.commonObj.officeList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
    },
    getAgriDetails (state, payload) {
        state.agri = payload
    },
    setServiceUrl (state, payload) {
        state.serviceUrl = Object.assign(state.serviceUrl, payload)
    }
}
