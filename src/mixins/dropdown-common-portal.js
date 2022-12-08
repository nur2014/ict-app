import RestApi, { commonServiceBaseUrl } from '../config/api_config'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      mixinComponentId: 0
    }
  },
  computed: {
    hasAllDropdownLoaded () {
      return this.$store.state.Portal.commonObj.hasDropdownLoaded
    },
    mixinCurrentLocale () {
      return this.$i18n.locale
    },
    ...mapGetters({
      orgList: 'orgList',
      orgComponentList: 'orgComponentList'
    })
  },
  watch: {
    hasAllDropdownLoaded: function (newValue) {
      if (!newValue) {
        this.loadCommonDropdown()
      }
    }
  },
  created () {
    this.setOrgAndOrgComponentList()
    this.loadCommonDropdown()
  },
  methods: {
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

          this.mixinSetOrganizationProfileList(10, response.data.orgComponentList, tmpData)
        }
      })
    },
    mixinSetOrganizationProfileList (mixinComponentId, orgComponentList, tmpData) {
      const orgComponents = orgComponentList.filter(item => item.component_id === mixinComponentId)
      const orgCompList = orgComponents.map(item => {
          const orgObj = tmpData.find(org => org.value === item.org_id)
          return this.$i18n.locale === 'en' ? Object.assign({}, orgObj, { text: orgObj.text_en }) : Object.assign({}, orgObj, { text: orgObj.text_bn })
      })
      this.$store.commit('Portal/mutateCommonDropdown', {
          hasDropdownLoaded: true,
          organizationProfileList: orgCompList
      })
    },
    loadCommonDropdown () {
      RestApi.getData(commonServiceBaseUrl, 'portal-common-dropdowns', null).then(response => {
        if (response.success) {
          const filteredOfficeData = response.data
          this.$store.commit('Portal/mutateCommonDropdown', {
            hasDropdownLoaded: true,
            officeTypeList: filteredOfficeData.officeTypeList,
            officeList: filteredOfficeData.officeList,
            fiscalYearList: this.fiscalYearBnAdd(response.data.fiscalYearList)
          })
          this.$store.dispatch('Portal/localizeCommonDropdown', { value: this.$i18n.locale })
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
    getOrgAdminData () {
      return this.orgComponentList.filter(item => item.component_id === this.mixinComponentId)
    }
  }
}
