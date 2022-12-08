import resetState from '../Utils/reset-state'
export default {
    mutateCommonProperties (state, payload) {
      state.commonObj = Object.assign({}, state.commonObj, payload)
    },
    mutateDropdownCommonConfig (state, payload) {
      state.commonObjCommonConfig = Object.assign({}, state.commonObjCommonConfig, payload)
    },
    mutateWarehouseProperties (state, payload) {
        state.warehouse = Object.assign({}, state.warehouse, payload)
    },
    mutateAgriMarketingProperties (state, payload) {
        state.agriMarketing = Object.assign({}, state.agriMarketing, payload)
    },
    mutateIncentiveGrantServiceProperties (state, payload) {
        state.incentiveGrant = Object.assign({}, state.incentiveGrant, payload)
    },
    mutateLicenseRegistrationServiceProperties (state, payload) {
      state.licenseRegistration = Object.assign({}, state.licenseRegistration, payload)
    },
    listMapping (data) {
        return data.map(item => {
            if (this.$i18n.locale === 'bn') {
                return { value: item.value, text: item.text_bn }
            } else {
                return { value: item.value, text: item.text }
            }
        })
    },
    changeCommonDropdown (state, payload) {
      state.commonObj.divisionList = state.commonObj.divisionList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.districtList = state.commonObj.districtList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.upazilaList = state.commonObj.upazilaList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.unionList = state.commonObj.unionList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.cityCorporationList = state.commonObj.cityCorporationList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.pauroshobaList = state.commonObj.pauroshobaList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.wardList = state.commonObj.wardList.map(item => {
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
      state.commonObj.fiscalYearList = state.commonObj.fiscalYearList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.designationList = state.commonObj.designationList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.gradeList = state.commonObj.gradeList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })

      state.commonObjCommonConfig.bankList = state.commonObjCommonConfig.bankList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObjCommonConfig.branchList = state.commonObjCommonConfig.branchList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.orgList = state.orgList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.monthList = state.commonObj.monthList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.portalServiceCategoryList = state.commonObj.portalServiceCategoryList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.portalServiceCustomerTypeList = state.commonObj.portalServiceCustomerTypeList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObj.moduleList = state.commonObj.moduleList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
    },
    localizeDropdownCommonConfig (state, payload) {
      state.commonObjCommonConfig.customerList = state.commonObjCommonConfig.customerList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObjCommonConfig.componentList = state.commonObjCommonConfig.componentList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObjCommonConfig.moduleList = state.commonObjCommonConfig.moduleList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObjCommonConfig.menuList = state.commonObjCommonConfig.menuList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObjCommonConfig.buttonTypeList = state.commonObjCommonConfig.buttonTypeList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObjCommonConfig.mediaList = state.commonObjCommonConfig.mediaList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObjCommonConfig.recipientList = state.commonObjCommonConfig.recipientList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.commonObjCommonConfig.messageTemplateList = state.commonObjCommonConfig.messageTemplateList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text } : { text: item.text }
        return Object.assign({}, item, tmp)
      })
    },
    changeWarehouseDropdown (state, payload) {
        state.warehouse.commodityGroupList = state.warehouse.commodityGroupList.map(item => {
          const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
          return Object.assign({}, item, tmp)
        })
        state.warehouse.commodityNameList = state.warehouse.commodityNameList.map(item => {
          const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
          return Object.assign({}, item, tmp)
        })
        state.warehouse.regionList = state.warehouse.regionList.map(item => {
          const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
          return Object.assign({}, item, tmp)
        })
        state.warehouse.warehouseDesignationList = state.warehouse.warehouseDesignationList.map(item => {
          const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
          return Object.assign({}, item, tmp)
        })
        state.warehouse.warehouseTypeList = state.warehouse.warehouseTypeList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.warehouse.warehouseInfoList = state.warehouse.warehouseInfoList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.warehouse.warehouseLevelList = state.warehouse.warehouseLevelList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.warehouse.fiscalYearList = state.warehouse.fiscalYearList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.warehouse.warehouseCategoryList = state.warehouse.warehouseCategoryList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.warehouse.serviceTypeList = state.warehouse.serviceTypeList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
        state.warehouse.marketInfoList = state.warehouse.marketInfoList.map(item => {
            const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
        })
    },
    changeAgriMarketingDropdown (state, payload) {
      state.agriMarketing.regionList = state.agriMarketing.regionList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.agriMarketing.zoneList = state.agriMarketing.zoneList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.agriMarketing.cottonVaritiesList = state.agriMarketing.cottonVaritiesList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
      state.agriMarketing.commodityGroupList = state.agriMarketing.commodityGroupList.map(item => {
        const tmp = payload.value === 'en' ? { text: item.text_en } : { text: item.text_bn }
        return Object.assign({}, item, tmp)
      })
        /* state.agriMarketing.regionList = state.agriMarketing.regionList.map(item => {
            const en = item.text
            const tmp = payload.value === 'en' ? { text: item.text } : { text: item.text_bn }
            return Object.assign({}, item, tmp, { text_en: en })
        }) */
    },
    setOrgAndOrgComponentList (state, payload) {
      state.orgList = payload.orgList
      state.orgComponentList = payload.orgComponentList
    },
    setList (state, payload) {
      state.list = payload
    },
    resetList (state, payload) {
      state.list = payload
    },
    setNotificationList (state, payload) {
      state.notificationList = payload
    },
    setPushNotification (state, payload) {
      state.isPushNotification.push(payload)
    },
    removeSinglePushNotification (state, payload) {
      state.isPushNotification.splice(state.isPushNotification.indexOf(payload))
    },
    setTotalNotification (state, payload) {
      state.totalNotification = payload
    },
    isToggleNotification (state, payload) {
      state.toggleNotification = payload
    },
    removeItemFromSetList (state, payload) {
      const index = state.list.findIndex(item => item.id === payload)
      state.list.splice(index, 1)
    },
    toggleStatus (state, payload) {
      state.list = state.list.map(function (item) {
        if (item.id === payload.id && item.status === 2) {
          return Object.assign(item, { status: 1 })
        } else if (item.id === payload.id && item.status === 0) {
          return Object.assign(item, { status: 1 })
        }
        return item
      })
    },
    // for farmer request reject
    toggleRejectItemStatus (state, payload) {
        state.commonObj[payload.dropdownName] = state.commonObj[payload.dropdownName].map(item => {
            if (item.value === payload.itemId) {
              return Object.assign(item, { status: item.status === 2 ? 1 : 2 })
            }
            return item
          })
    },
    toggleDropdownItemStatus (state, payload) {
      if (payload.destination === 'common') {
        state.commonObj[payload.dropdownName] = state.commonObj[payload.dropdownName].map(item => {
          if (item.value === payload.itemId) {
            return Object.assign(item, { status: item.status ? 0 : 1 })
          }
          return item
        })
      } else if (payload.destination === 'common_config') {
        state.commonObjCommonConfig[payload.dropdownName] = state.commonObjCommonConfig[payload.dropdownName].map(item => {
          if (item.value === payload.itemId) {
            return Object.assign(item, { status: item.status ? 0 : 1 })
          }
          return item
        })
      } else if (payload.destination === 'irrigation') {
        state.IrriConfig.commonObj[payload.dropdownName] = state.IrriConfig.commonObj[payload.dropdownName].map(item => {
          if (item.value === payload.itemId) {
            return Object.assign(item, { status: item.status ? 0 : 1 })
          }
          return item
        })
      } else if (payload.destination === 'warehosue') {
        state.warehouse[payload.dropdownName] = state.warehouse[payload.dropdownName].map(item => {
          if (item.value === payload.itemId) {
            return Object.assign(item, { status: item.status ? 0 : 1 })
          }
          return item
        })
      } else if (payload.destination === 'seeds_fertilizer') {
        state.SeedsFertilizer[payload.dropdownName] = state.SeedsFertilizer.commonObj[payload.dropdownName].map(item => {
          if (item.value === payload.itemId) {
            return Object.assign(item, { status: item.status === 2 ? 1 : 2 })
          }
          return item
        })
      } else if (payload.destination === 'agriMarketing') {
        state.agriMarketing.commonObj[payload.dropdownName] = state.agriMarketing.commonObj[payload.dropdownName].map(item => {
          if (item.value === payload.itemId) {
            return Object.assign(item, { status: item.status === 2 ? 1 : 2 })
          }
          return item
        })
      } else if (payload.destination === 'incentive_grant') {
        state.incentiveGrant.commonObj[payload.dropdownName] = state.incentiveGrant.commonObj[payload.dropdownName].map(item => {
          if (item.value === payload.itemId) {
            return Object.assign(item, { status: item.status === 2 ? 1 : 2 })
          }
          return item
        })
      } else if (payload.destination === 'training_e_learning') {
        state.TrainingElearning.commonObj[payload.dropdownName] = state.TrainingElearning.commonObj[payload.dropdownName].map(item => {
          if (item.value === payload.itemId) {
            return Object.assign(item, { status: item.status === 2 ? 1 : 2 })
          }
          return item
        })
      } else if (payload.destination === 'agri_research') {
        state.AgriResearch.commonObj[payload.dropdownName] = state.AgriResearch.commonObj[payload.dropdownName].map(item => {
          if (item.value === payload.itemId) {
            return Object.assign(item, { status: item.status === 2 ? 1 : 2 })
          }
          return item
        })
      } else {
        // Nothing to do
      }
    },
    resetState (state) {
      resetState(state)
    },
    setNotification (state, payload) {
      state.commonObj.notificationso = payload
    },
    clearStoreBasedOnLayout (state, payload) {
      state[payload.destination] = payload.stateVars
    },
    setDataFilteringParam (state, payload) {
      state.dataFilters = Object.assign({}, state.dataFilters, payload)
    }
  }
