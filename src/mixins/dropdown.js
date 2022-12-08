import RestApi, { commonServiceBaseUrl, agriMarketingServiceBaseUrl } from '../config/api_config'
import { mapGetters, mapActions } from 'vuex'
import { getOrgByUserPriviledge, getOfficeByUserPriviledge, orgFilteredList } from '@/Utils/data-filtering-by-priviledge'

export default {
  data () {
    return {
      mixinComponentId: 0,
      isMinistryUser: false,
      marketList: []
    }
  },
  computed: {
    activeFont: function () {
      return this.$i18n.locale === 'en' ? 'font-en' : 'font-bn'
    },
    hasAllDropdownLoaded () {
      return this.$store.state.commonObj.hasDropdownLoaded
    },
    mixinCurrentLocale () {
      return this.$i18n.locale
    },
    ...mapGetters({
      orgList: 'orgList',
      orgComponentList: 'orgComponentList',
      authUser: 'Auth/authUser',
      activeRoleId: 'Auth/getActiveRole'
    })
  },
  watch: {
    hasAllDropdownLoaded: function (newValue) {
      if (!newValue) {
        this.loadCommonDropdown()
      }
    },
    $route () {
      this.checkMenuAccessPermission()
    },
    mixinCurrentLocale: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.changeLangActiveMenus(newValue)
        this.changeCommonDropdown({ value: newValue })
      }
    }
  },
  created () {
    this.setIsMinistryUser()
    // Loading common dropdowns
    const hasDropdownLoaded = this.$store.state.commonObj.hasDropdownLoaded

    if (!hasDropdownLoaded || window.performance) {
      this.setOrgAndOrgComponentList()
      this.loadCommonDropdown()
    }
    this.checkMenuAccessPermission()
    this.setDataFilteringParams()
    this.getMarketList()
  },
  methods: {
    async getMarketList () {
      const result = await RestApi.getData(agriMarketingServiceBaseUrl, 'marketlist-lrcpn')
      this.marketList = result.data.marketList.length > 0 ? result.data.marketList : []
    },
    setOrgAndOrgComponentList () {
      RestApi.getData(commonServiceBaseUrl, 'common/org-and-org-component-list').then(response => {
        if (response.success === true) {
          const tmpData = response.data.orgList.map(item => {
            const tmp = this.$i18n.locale === 'en' ? { text: item.text_en } : { text: item.text_bn }
            return Object.assign({}, item, tmp)
          })
          this.$store.commit('setOrgAndOrgComponentList', {
            orgList: tmpData,
            orgComponentList: response.data.orgComponentList
          })

          this.mixinSetOrganizationProfileList()
        }
      })
    },
    mixinSetOrganizationProfileList () {
      const orgComponents = this.getOrgAdminData()
      const orgCompList = orgComponents.map(item => {
        const orgObj = this.orgList.find(org => org.value === item.org_id)

        return this.$i18n.locale === 'en' ? Object.assign({}, orgObj, { text: orgObj.text_en }) : Object.assign({}, orgObj, { text: orgObj.text_bn })
      })
      const filteredOrgComponentList = this.getOrgByUserType(orgCompList)
      filteredOrgComponentList.sort((a, b) => {
        if (a.text_en < b.text_en) {
          return -1
        }
        if (a.text_en > b.text_en) {
          return 1
        }
        return 0
      })
      this.$store.commit('mutateCommonProperties', { organizationProfileList: filteredOrgComponentList })
    },
    loadCommonDropdown () {
      RestApi.getData(commonServiceBaseUrl, 'common-dropdowns', null).then(response => {
        if (response.success) {
          const fieldOfficerFilterData = this.getFieldOfficerFilterData(response.data)
          const filteredOfficeData = this.getFilteredOfficeData(response.data)
          this.$store.commit('mutateCommonProperties', {
            hasDropdownLoaded: true,
            divisionList: fieldOfficerFilterData.divisionList,
            districtList: fieldOfficerFilterData.districtList,
            upazilaList: fieldOfficerFilterData.upazilaList,
            unionList: fieldOfficerFilterData.unionList,
            cityCorporationList: response.data.cityCorporationList,
            pauroshobaList: response.data.pauroshobaList,
            wardList: response.data.wardList,
            officeTypeList: filteredOfficeData.officeTypeList,
            officeList: filteredOfficeData.officeList,
            designationList: response.data.designationList,
            gradeList: response.data.gradeList,
            countryList: response.data.countryList,
            moduleList: response.data.moduleList,
            bankObj: {
                bankList: response.data.bankList,
                branchList: response.data.branchList
            },
            fiscalYearList: this.fiscalYearBnAdd(response.data.fiscalYearList),
            portalServiceCategoryList: response.data.portalServiceCategoryList,
            portalServiceCustomerTypeList: response.data.portalServiceCustomerTypeList,
            marketList: this.marketList
          })
          this.$store.dispatch('changeCommonDropdown', { value: this.$i18n.locale })
        }
      })
    },
    fiscalYearBnAdd (data) {
      const bnList = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
      const bnAdded = data.map(item => {
        const fiscalYearData = {}
        const result = item.text_bn.split('').map(item => item === '-' ? '-' : bnList[item])
        fiscalYearData.text_bn = result.join('')
        return Object.assign({}, item, fiscalYearData)
      })
      return bnAdded
    },
    checkMenuAccessPermission () {
      const authorizedURIs = this.$store.state.Auth.authorizedURIs
      const unauthorizedAccessCounter = this.$store.state.Auth.unauthorizedAccessCounter
      const accessUri = this.$route.matched[1].path
      if (authorizedURIs.indexOf(accessUri) === -1 && unauthorizedAccessCounter > 2) {
        this.$store.dispatch('Auth/setUnauthorizedAccessCounter', 0)
        this.$toast.error({
          title: 'Error',
          message: 'Sorry! Unauthorized access.' + accessUri
        })
        this.$router.push('/auth/login')
      } else if (authorizedURIs.indexOf(accessUri) === -1) {
        this.$store.dispatch('Auth/setUnauthorizedAccessCounter', (unauthorizedAccessCounter + 1))
        this.$toast.error({
          title: 'Error',
          message: 'Sorry! Unauthorized access.' + accessUri
        })
        this.$router.go(-1)
      }
    },
    changeLangActiveMenus (lang) {
      const activeMenus = this.$store.state.Auth.activeMenus
      const tmpMenus = activeMenus.map(item => {
        if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          return Object.assign({}, item, {
            name: lang === 'en' ? item.title : item.title_bn,
            children: this.getChildMenus(item.children, lang)
          })
        } else {
          return Object.assign({}, item, {
            name: lang === 'en' ? item.title : item.title_bn
          })
        }
      })
      this.$store.dispatch('Auth/setActiveMenus', tmpMenus)
    },
    getChildMenus (menuItems, lang) {
      return menuItems.map(item => {
        if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          return Object.assign({}, item, {
            name: lang === 'en' ? item.title : item.title_bn,
            children: this.getChildMenus(item.children, lang)
          })
        } else {
          return Object.assign({}, item, {
            name: lang === 'en' ? item.title : item.title_bn
          })
        }
      })
    },
    getOrgAdminData () {
      if ([10].indexOf(this.mixinComponentId) !== -1) {
        return orgFilteredList(this.orgComponentList, this.mixinComponentId)
      }
      if (this.authUser.is_org_admin) {
        return this.orgComponentList.filter(item => (item.component_id === this.mixinComponentId) && (item.org_id === this.authUser.org_id))
      }
      return this.orgComponentList.filter(item => item.component_id === this.mixinComponentId)
    },
    getOrgByUserType (orgList) {
      if (this.activeRoleId === 1 || this.isMinistryUser) {
        return orgList
      } else {
        return orgList.filter(item => item.value === parseInt(this.authUser.org_id))
      }
    },
    getFieldOfficerFilterData (data) {
      const filteredData = {
        divisionList: data.divisionList,
        districtList: data.districtList,
        upazilaList: data.upazilaList,
        unionList: data.unionList
      }
      if (this.activeRoleId === 1 || this.isMinistryUser) {
        return filteredData
      }
      if (this.authUser.office_detail.division_id && this.authUser.is_org_admin === 0) {
        filteredData.divisionList = data.divisionList.filter(item => item.value === parseInt(this.authUser.office_detail.division_id))
      }
      if (this.authUser.office_detail.district_id && this.authUser.is_org_admin === 0) {
        filteredData.districtList = data.districtList.filter(item => item.value === parseInt(this.authUser.office_detail.district_id))
      }
      if (this.authUser.office_detail.upazilla_id && this.authUser.is_org_admin === 0) {
        filteredData.upazilaList = data.upazilaList.filter(item => item.value === parseInt(this.authUser.office_detail.upazilla_id))
      }
      if (this.authUser.office_detail.upazilla_id && this.authUser.is_org_admin === 0) {
        filteredData.unionList = data.unionList.filter(item => item.value === parseInt(this.authUser.office_detail.union_id))
      }
      return filteredData
    },
    setIsMinistryUser () {
      this.isMinistryUser = true

      if (this.activeRoleId === 1) {
        this.isMinistryUser = false
      }
    },
    getFilteredOfficeData (data) {
      const officeObj = {
        officeTypeList: data.officeTypeList,
        officeList: data.officeList
      }
      if (this.$store.state.Auth.activeComponentId !== 8) {
        return officeObj
      }
      if (this.activeRoleId === 1 || this.authUser.org_id === 1) {
        return officeObj
      }
      if (this.authUser.is_org_admin) {
        officeObj.officeTypeList = officeObj.officeTypeList.filter(item => item.org_id === this.authUser.org_id)
        officeObj.officeList = officeObj.officeList.filter(item => item.org_id === this.authUser.org_id)
        return officeObj
      }
      officeObj.officeTypeList = officeObj.officeTypeList.filter(item => item.value === this.authUser.office_type_id)
      officeObj.officeList = officeObj.officeList.filter(item => item.value === this.authUser.office_id)
      return officeObj
    },
    setDataFilteringParams () {
      const orgId = getOrgByUserPriviledge()
      const officeObj = getOfficeByUserPriviledge()
      this.$store.dispatch('setDataFilteringParam', {
        orgId: orgId,
        officeTypeId: officeObj.officeTypeId,
        officeId: officeObj.officeId
      })
    },
    ...mapActions({
      changeCommonDropdown: 'changeCommonDropdown'
    })
  }
}
