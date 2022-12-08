import RestApi, {
    authServiceBaseUrl,
    commonServiceBaseUrl,
    irriSchemeServiceBaseUrl,
    warehouseServiceBaseUrl,
    agriMarketingServiceBaseUrl,
    seedFertilizerServiceBaseUrl,
    incentiveGrantServiceBaseUrl
} from '../config/api_config'
import { mapGetters } from 'vuex'
/**
 * Loading dropdowns
 * Common dropdown for all panel will be loaded default. It will be loaded when user will visit public panel
 * first time or page reload.
 *
 * Other panel will be loaded on that basis of active panel. When a user will switch panel every time it will be loaded
 *
 */
export default {
    computed: {
        activeFont: function () {
            return this.$i18n.locale === 'en' ? 'font-en' : 'font-bn'
        },
        activePanel () {
            return this.$store.state.ExternalUserIrrigation.activePanel
        },
        ginnerGrowerUser () {
            return this.$store.state.ExternalUserIrrigation.activePanel === 'ginner' || this.$store.state.ExternalUserIrrigation.activePanel === 'grower'
        },
        isDivisionalHead () {
            return this.$store.state.ExternalUserIrrigation.activePanel === 'divisional_head'
        },
        irrigationUser () {
            return this.$store.state.ExternalUserIrrigation.activePanel === 'irrigation'
        },
        isWareHouseUser () {
            return this.$store.state.ExternalUserIrrigation.activePanel === 'warehouse_farmers'
        },
        isIncentiveGrantuser () {
            return this.$store.state.ExternalUserIrrigation.activePanel === 'grant_panel'
        },
        isIncentiverFarmer () {
           return this.$store.state.ExternalUserIrrigation.activePanel === 'incentive_farmer'
        },
        trainingUser () {
            return this.$store.state.ExternalUserIrrigation.activePanel === 'trainee_panel'
        },
        isResearchFarmer () {
            return this.$store.state.ExternalUserIrrigation.activePanel === 'research_farmer'
        },
        isGinnerPanel () {
          return this.$store.state.ExternalUserIrrigation.activePanel === 'ginner'
        },
        isGrowerPanel () {
          return this.$store.state.ExternalUserIrrigation.activePanel === 'grower'
        },
        isVirtualMuseumPanel () {
            return this.$store.state.ExternalUserIrrigation.activePanel === 'virtual_museum'
        },
        isLrcpnPanel () {
          return this.$store.state.ExternalUserIrrigation.activePanel === 'lrcpn'
        },
        mixinComponent () {
          if (this.trainingUser) {
            return 10
          } else if (this.isWareHouseUser) {
              return 4
          } else if (this.isResearchFarmer) {
            return 3
          } else if (this.isLrcpnPanel) {
            return 2
          } else if (this.isGinnerPanel || this.isGrowerPanel) {
            return 5
          } else if (this.isVirtualMuseumPanel) {
            return 7
          } else if (this.irrigationUser) {
            return 9
          } else {
            // return 9
            return 10
          }
        },
        ...mapGetters({
            orgList: 'ExternalUserIrrigation/orgList',
            orgComponentList: 'ExternalUserIrrigation/orgComponentList'
        })
    },
    watch: {
        activePanel: function (newValue, oldValue) {
            if (newValue !== oldValue) {
                this.mixinSetOrganizationProfileList(this.mixinComponent)
                this.loadPanelWiseDropdown()
            }
        }
    },
    created () {
        // Loading common dropdowns
        this.loadCommonDropdownForAll()
        this.loadPanelWiseDropdown()
        this.setOrgAndOrgComponentList()
    },
    methods: {
        loadPanelWiseDropdown () {
            if (this.isWareHouseUser) {
              this.loadDropdownWarehouse()
            } else if (this.irrigationUser) {
              this.loadIrrigationDropdown()
            } else if (this.ginnerGrowerUser) {
              this.loadDropdownGinnerGrower()
            } else if (this.isIncentiveGrantuser) {
              this.loadIncentiveGrantDropdown()
            } else if (this.trainingUser) {
                this.loadTrainingDropdownEx()
            } else if (this.isLrcpnPanel) {
                this.loadExternalLrcpnDropdownEx()
            } else if (this.isResearchFarmer) {
                this.loadResearchFarmerDropdownEx()
            } else if (this.isIncentiverFarmer) {
                this.loadIncentiveFamerDropdownEx()
            } else if (this.isDivisionalHead) {
                this.loadAgriMarketingDropdownEx()
            } else if (this.isVirtualMuseumPanel) {
                this.VirtualMuseumDropdownsExternal()
            }
        },
        loadAgriMarketingDropdownEx () {
            this.loadDropdownCommonConfigExternal()
        },
        loadResearchFarmerDropdownEx () {
            this.loadExternalAgriResearchDropdown()
        },
        loadTrainingDropdownEx () {
            this.loadDropdownExternalTraining()
        },
        async loadExternalLrcpnDropdownEx () {
            const result = await RestApi.getData(agriMarketingServiceBaseUrl, 'marketlist-lrcpn')
            const marketList = result.data.marketList.length > 0 ? result.data.marketList : []
            this.$store.commit('ExternalUserIrrigation/setMarketList', marketList)
            this.loadDropdownLicenseRegistration()
            this.loadDropdownCommonConfig2()
        },
        loadIncentiveFamerDropdownEx () {
            this.loadIncentiveCommonDropdown()
            this.loadCommonConfig()
        },
        getRegionList () {
            RestApi.getData(warehouseServiceBaseUrl, '/master-region-info/list-all').then(response => {
                if (response.success) {
                    const regionList = response.data.map(obj => {
                        if (this.$i18n.locale === 'bn') {
                            return { value: obj.id, text: obj.region_name_bn }
                        } else {
                            return { value: obj.id, text: obj.region_name }
                        }
                    })
                    this.$store.commit('ExternalUserIrrigation/setRegionList', regionList)
                }
            })
        },
        async getMarketList () {
            const result = await RestApi.getData(agriMarketingServiceBaseUrl, 'marketlist-lrcpn')
            const marketList = result.data.marketList.length > 0 ? result.data.marketList : []
            this.$store.commit('ExternalUserIrrigation/setMarketList', marketList)
        },
        getRegionDistrictList () {
            RestApi.getData(warehouseServiceBaseUrl, '/master-warehouse-level/region-district-list').then(response => {
                if (response) {
                    const districts = this.$store.state.ExternalUserIrrigation.commonObj.districtList
                    const regions = this.$store.state.ExternalUserIrrigation.regionList
                    const isEng = this.$i18n.locale === 'en'
                    const regionDistrict = response.map((item) => {
                        const district = districts.find(district => district.value === item.district_id)
                        let formattedDistrict = {}
                        if (district) {
                            formattedDistrict = Object.assign(isEng ? { district_text: district.text_en }
                            : { text: district.text_bn }, { district_id: district.value, region_id: item.region_id })
                        }
                        const region = regions.find(region => region.value === item.region_id)
                        return Object.assign({}, { region_text: region.text }, formattedDistrict)
                    })
                    this.$store.commit('ExternalUserIrrigation/setRegionDistrictList', regionDistrict)
                }
            })
        },
        loadDropdownWarehouse () {
            this.getRegionList()
            this.getRegionDistrictList()
            this.setUserDetails()
            RestApi.getData(warehouseServiceBaseUrl, 'warehouse-dropdown-list-all', null).then(response => {
                    if (response.status_code === 200) {
                        this.$store.commit('ExternalUserIrrigation/mutateWarehouseProperties', {
                            hasDropdownLoaded: true,
                            commodityGroupList: response.data.commodityGroupList,
                            commodityNameList: response.data.commodityNameList,
                            regionList: response.data.regionList,
                            fiscalYearList: this.fiscalYearBnAdd(response.data.fiscalYearList),
                            warehouseDesignationList: response.data.warehouseDesignationList,
                            warehouseTypeList: response.data.warehouseTypeList,
                            warehouseInfoList: response.data.warehouseInfoList,
                            warehouseLevelList: response.data.warehouseLevelList,
                            marketInfoList: response.data.marketInfoList
                        })
                        this.$store.dispatch('ExternalUserIrrigation/changeWarehouseDropdown', { value: this.$i18n.locale })
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
        loadDropdownGinnerGrower () {
            RestApi.getData(agriMarketingServiceBaseUrl, 'common-dropdowns', null).then(response => {
                if (response.success) {
                    this.$store.commit('ExternalUserIrrigation/mutateExternalUserAgriMarketing', {
                        hasDropdownLoaded: true,
                        regionList: response.data.regionsList,
                        zoneList: response.data.zonesList,
                        unitList: response.data.unitList,
                        hatList: response.data.hatsList,
                        seasonList: response.data.seasonsList,
                        cottonVaritiesList: response.data.cottonVaritiesList,
                        cottonNameList: response.data.cottonNamesList
                    })
                    // this.$store.dispatch('ExternalUserIrrigation/changeAgriMarketingDropdown', { value: this.$i18n.locale })
                }
            })
        },
        setUserDetails () {
            RestApi.getData(authServiceBaseUrl, '/auth-user').then((response) => {
                try {
                    if (response.success) {
                        this.$store.commit('ExternalUserAuth/setFarmerDetails', response.data)
                    }
                } catch (e) {
                    // alert('You were logged out!')
                }
            })
        },
        loadIrrigationDropdown () {
            this.getOperatorInfo()
            RestApi.getData(irriSchemeServiceBaseUrl, '/external/common-dropdown').then(response => {
                if (response.success === true) {
                    this.$store.commit('ExternalUserIrrigation/setIrrigationCommonDropdown', response, this.$i18n.locale)
                } else {
                    this.$store.commit('ExternalUserIrrigation/setIrrigationCommonDropdown', [], '')
                }
            })
        },
        setOrgAndOrgComponentList () {
          RestApi.getData(commonServiceBaseUrl, 'common/org-and-org-component-list').then(response => {
            if (response.success === true) {
                this.$store.commit('ExternalUserIrrigation/setOrgAndOrgComponentList', {
                    orgList: response.data.orgList,
                    orgComponentList: response.data.orgComponentList
                })
                this.mixinSetOrganizationProfileList(this.mixinComponent)
            }
          })
        },
        mixinSetOrganizationProfileList (mixinComponentId) {
            const orgComponents = this.orgComponentList.filter(item => item.component_id === mixinComponentId)
            const orgCompList = orgComponents.map(item => {
                const orgObj = this.orgList.find(org => org.value === item.org_id)
                return this.$i18n.locale === 'en' ? Object.assign({}, orgObj, { text: orgObj !== 'undefined' ? orgObj.text_en : '' }) : Object.assign({}, orgObj, { text: orgObj !== 'undefined' ? orgObj.text_bn : '' })
            })
            this.$store.commit('ExternalUserIrrigation/mutateExternalDropdown', { organizationProfileList: orgCompList, orgList: this.orgList })
            this.$store.commit('VirtualMuseum/mutateVirtualMuseumCommonProperties', { organizationProfileList: orgCompList })
        },
        loadCommonDropdownForAll () {
          RestApi.getData(commonServiceBaseUrl, 'external-user-dropdowns', null).then(response => {
            if (response.success) {
                this.$store.commit('ExternalUserIrrigation/mutateExternalDropdown', {
                    hasDropdownLoaded: true,
                    divisionList: response.data.divisionList.filter(item => item.status !== 1),
                    districtList: response.data.districtList.filter(item => item.status !== 1),
                    upazilaList: response.data.upazilaList.filter(item => item.status !== 1),
                    unionList: response.data.unionList.filter(item => item.status !== 1),
                    designationList: response.data.designationList,
                    gradeList: response.data.gradeList,
                    pauroshobaList: response.data.pauroshobaList.filter(item => item.status !== 1),
                    wardList: response.data.wardList.filter(item => item.status !== 1),
                    cityCorporationList: response.data.cityCorporationList.filter(item => item.status !== 1),
                    fiscalYearList: this.fiscalYearBnAdd(response.data.fiscalYearList.filter(item => item.status !== 1)),
                    officeList: response.data.officeList.filter(item => item.status !== 1),
                    officeTypeList: response.data.officeTypeList.filter(item => item.status !== 1),
                    countryList: response.data.countryList.filter(item => item.status !== 1)
                })
                this.$store.commit('ExternalUserIrrigation/localizeExternalDropdown', { value: this.$i18n.locale })
            }
          })

          RestApi.getData(seedFertilizerServiceBaseUrl, 'common-dropdowns', null).then(response => {
            if (response.success) {
                this.$store.commit('ExternalUserIrrigation/mutateExternalDropdown', {
                    hasDropdownLoaded: true,
                    fertilizerTypeList: response.data.fertilizerTypeList,
                    fertilizerNameList: response.data.fertilizerNameList,
                    allocationTypeList: response.data.allocationTypeList
              })
              this.$store.commit('ExternalUserIrrigation/localizeExternalDropdown', { value: this.$i18n.locale })
            }
          })
        },
        getOperatorInfo () {
            RestApi.getData(irriSchemeServiceBaseUrl, 'get-opt-info' + '/' + this.$store.state.Auth.authUser.id).then(response => {
                if (response.success === true) {
                    this.$store.dispatch('ExternalUserIrrigation/addPumpOptDetails', response.data)
                }
            })
        },
        loadIncentiveGrantDropdown () {
            RestApi.getData(incentiveGrantServiceBaseUrl, 'external-user-dropdown', null).then(response => {
                this.$store.dispatch('ExternalUserIrrigation/mutateIncentiveGrantProperties', {
                    hasDropdownLoaded: true,
                    circularInfoList: response.data.circularInfoList,
                    orgList: this.orgList,
                    narseInstituteList: response.data.narseInstituteList,
                    educationLevelList: response.data.educationLevelList,
                    fundSubHeadList: response.data.fundSubHeadList
                })
                this.$store.dispatch('ExternalUserIrrigation/changeIncentiveGrantDropdown', { value: this.$i18n.locale })
            })
        }
    }
}
