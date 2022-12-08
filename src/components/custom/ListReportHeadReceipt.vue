<template>
  <div>
      <b-overlay :show="loadingState">
        <div>
          <div class="row justify-content-md-center">
            <div class="col col-lg-12 text-center">
              <b-img width='70px' :src="'data:image/jpeg;base64,' + leftLogo" fluid alt="Left Logo"></b-img>
            </div>
            <div class="col-md-auto text-center">
              <h3 class="text-bold" style="font-size:20px;">{{ $t('globalTrans.government_republic_of_bangladesh') }}</h3>
              <h4 class="org-name" style="font-size:19px;">{{ orgName }} </h4>
              <h6 class="org-address">{{ address }}</h6>
            </div>
          </div>
          <div class="row justify-content-md-center">
            <div class="col-md-auto text-center">
              <div class="report-title"><slot>{{ $t('globalTrans.receipt') }} </slot></div>
            </div>
          </div>
        </div>
      </b-overlay>
  </div>
</template>

<script>
import RestApi from '@/config/api_config'

export default {
  props: {
    baseUrl: String,
    params: Object,
    uri: String,
    orgId: Number,
    loadingState: Boolean
  },
  data () {
    return {
      orgName: '',
      leftLogo: '',
      rightLogo: '',
      address: '',
      projectName: ''
    }
  },
  computed: {
    langChange () {
      return this.$i18n.locale
    },
    getParams () {
        const defaultParam = { leftPath: 'uploads/config/left-logo/original/', rightPath: 'uploads/config/right-logo/original/' }
        if (this.params && typeof this.params !== 'undefined' && Object.keys(this.params).length > 0) {
            return this.params
        } else {
            return defaultParam
        }
    }
  },
  watch: {
    loadingState: function (newVal, oldVal) {
      if (newVal === true) {
        this.getReportHead(this.orgId)
      }
    },
    langChange: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getReportHead(this.orgId)
      }
    }
  },
  async created () {
    await this.getReportHead(this.orgId)
  },
  methods: {
    async getReportHead (orgId) {
      if (!orgId) {
        return
      }
      await RestApi.getData(this.baseUrl, this.uri + '/' + this.orgId, this.getParams).then(response => {
        if (typeof response.success !== 'undefined' && response.success) {
          const orgData = this.$store.state.commonObj.organizationProfileList.find(item => item.value === this.orgId)
          this.leftLogo = response.data.left_logo
          this.rightLogo = response.data.right_logo
          this.address = this.$i18n.locale === 'en' ? response.data.address : response.data.address_bn
          this.orgName = this.$i18n.locale === 'en' ? orgData.text_en : orgData.text_bn

          if (Object.prototype.hasOwnProperty.call(response.data, 'project_name')) {
            this.projectName = this.$i18n.locale === 'en' ? response.data.project_name : response.data.project_name_bn
          }
        }
      })
    }
  }
}
</script>
<style scoped>
  .report-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 15px;
    color: var(--iq-dark)
  }
</style>
