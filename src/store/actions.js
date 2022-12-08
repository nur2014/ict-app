export default {
    mutateCommonProperties ({ commit }, payload) {
      commit('mutateCommonProperties', payload)
    },
    mutateWarehouseProperties ({ commit }, payload) {
        commit('mutateWarehouseProperties', payload)
    },
    mutateAgriMarketingProperties ({ commit }, payload) {
        commit('mutateAgriMarketingProperties', payload)
    },
    mutateIncentiveGrantServiceProperties ({ commit }, payload) {
        commit('mutateIncentiveGrantServiceProperties', payload)
    },
    mutateLicenseRegistrationServiceProperties ({ commit }, payload) {
      commit('mutateLicenseRegistrationServiceProperties', payload)
    },
    changeCommonDropdown ({ commit }, payload) {
      commit('changeCommonDropdown', payload)
    },
    localizeDropdownCommonConfig ({ commit }, payload) {
      commit('localizeDropdownCommonConfig', payload)
    },
    changeWarehouseDropdown ({ commit }, payload) {
        commit('changeWarehouseDropdown', payload)
    },
    changeAgriMarketingDropdown ({ commit }, payload) {
      commit('changeAgriMarketingDropdown', payload)
    },
    changeLicenseRegistrationDropdown ({ commit }, payload) {
      commit('changeLicenseRegistrationDropdown', payload)
    },
    setOrgList ({ commit }, payload) {
      commit('setOrgList', payload)
    },
    setList ({ commit }, payload) {
      commit('setList', payload)
    },
    resetList ({ commit }) {
      commit('resetList', [])
    },
    setNotificationList ({ commit }, payload) {
      commit('setNotificationList', payload)
    },
    setPushNotification ({ commit }, payload) {
      commit('setPushNotification', payload)
    },
    removeSinglePushNotification ({ commit }, payload) {
      commit('removeSinglePushNotification', payload)
    },
    setTotalNotification ({ commit }, payload) {
      commit('setTotalNotification', payload)
    },
    isToggleNotification ({ commit }, payload) {
      commit('isToggleNotification', payload)
    },
    removeItemFromSetList ({ commit }, payload) {
      commit('removeItemFromSetList', payload)
    },
    toggleStatus ({ commit }, payload) {
      commit('toggleStatus', payload)
    },
    toggleDropdownItemStatus ({ commit }, payload) {
      commit('toggleDropdownItemStatus', payload)
    },
    resetState ({ commit }) {
      commit('resetState')
    },
    setNotification ({ commit }, payload) {
      commit('setNotification', payload)
    },
    clearStoreBasedOnLayout ({ commit }, payload) {
      commit('clearStoreBasedOnLayout', payload)
    },
    setDataFilteringParam ({ commit }, payload) {
      commit('setDataFilteringParam', payload)
    }
  }
