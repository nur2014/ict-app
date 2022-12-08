import RestApi, { commonServiceBaseUrl, agriResearchServiceBaseUrl } from '../config/api_config'
export default {
    computed: {
        hasAllDropdownLoaded () {
            return this.$store.state.ExternalAgriResearch.agriResearchCommonObj.hasDropdownLoaded
        }
    },
    watch: {
        hasAllDropdownLoaded: function (newValue) {
            if (!newValue) {
                this.loadExternalAgriResearchDropdown()
            }
        }
    },
    created () {
        const hasDropdownLoaded = this.$store.state.ExternalAgriResearch.agriResearchCommonObj.hasDropdownLoaded
        if (!hasDropdownLoaded || window.performance) {
            this.loadExternalAgriResearchDropdown()
        }
        const hasDropdownLoadedCommonConfig = this.$store.state.ExternalAgriResearch.commonObjCommonConfig.hasDropdownLoaded
        if (!hasDropdownLoadedCommonConfig || window.performance) {
            this.loadAgriResearchCommonConfig()
        }
    },
    methods: {
        loadExternalAgriResearchDropdown () {
            RestApi.getData(agriResearchServiceBaseUrl, 'common-dropdowns-external-agri-research', null).then(response => {
              if (response.success) {
                  this.$store.commit('ExternalAgriResearch/mutateAgriResearchExternalDropdown', {
                        hasDropdownLoaded: true,
                        seedTypeNameList: response.data.seedTypeNameList,
                        seedNameList: response.data.seedNameList,
                        seedClassNameList: response.data.seedClassNameList,
                        qualityUnitList: response.data.qualityUnitList,
                        seedVarietyList: response.data.seedVarietyList,
                        serviceList: response.data.serviceList,
                        projectList: response.data.projectList,
                        subProjectList: response.data.subProjectList,
                        sectorList: response.data.sectorList,
                        subSectorList: response.data.subSectorList,
                        researchDivisionList: response.data.researchDivisionList,
                        seedPacketList: response.data.seedPacketList,
                        productionSeasonList: response.data.productionSeasonList,
                        publicationTypeList: response.data.publicationTypeList,
                        publicationTitleList: response.data.publicationTitleList,
                        publicationFeeList: response.data.publicationFeeList,
                        publicationContentAreaList: response.data.publicationContentAreaList,
                        thematicAreaList: response.data.thematicAreaList,
                        circularList: response.data.circularList,
                        budgetHeadList: response.data.budgetHeadList,
                        budgetTypeList: response.data.budgetTypeList,
                        feePolicy: response.data.feePolicy,
                        componentOrgList: response.data.componentOrgList,
                        schemeList: response.data.schemeList,
                        seedProducersList: response.data.seedProducersList,
                        seedProcessingCentersList: response.data.seedProcessingCentersList,
                        divisionalResearchList: response.data.divisionalResearchList,
                        roleInformationList: response.data.roleInformationList,
                        monitoringTeamList: response.data.monitoringTeamList

                  })
                  this.$store.commit('ExternalAgriResearch/localizeAgriResearchExternalDropdown', { value: this.$i18n.locale })
              }
            })
        },
        loadAgriResearchCommonConfig () {
            RestApi.getData(commonServiceBaseUrl, 'common/dropdowns', null).then(response => {
                if (response.success) {
                    this.$store.commit('ExternalAgriResearch/mutateDropdownCommonConfig', {
                        hasDropdownLoaded: true,
                        bankList: response.data.bankList,
                        branchList: response.data.branchList
                    })
                    this.$store.commit('ExternalAgriResearch/localizeDropdownCommonConfig', { value: this.$i18n.locale })
                }
            })
        }
    }
}
