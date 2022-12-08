<template>
  <div>
      <b-overlay>
        <div>
          <div class="row justify-content-md-center">
            <div class="col col-lg-2 text-right">
              <b-img v-if="$store.state.Auth.activeRoleId !== 1" width='70px' :src="'data:image/jpeg;base64,' + leftLogo" fluid alt="Left Logo"></b-img>
              <b-img v-else width='70px' :src="'/images/left-govt.png'" fluid alt="Left Logo"></b-img>
            </div>
            <div class="col-md-auto text-center">
              <h3 class="text-bold" style="font-size:19px;">{{ $t('globalTrans.government_republic_of_bangladesh') }}</h3>
              <h4 v-if="$store.state.Auth.activeRoleId === 1" class="org-name" style="font-size:19px;">{{ this.$i18n.locale === 'en' ? '' : '' }} </h4>
              <h4 v-else class="org-name" style="font-size:18px;">{{ orgName }} </h4>
              <span class="text-center text-dark" v-if="$store.state.Auth.activeRoleId !== 1"><slot name="projectNameSlot"><h6 class="org-address" v-if="projectName">{{ projectName }}</h6></slot></span>
              <h6  v-if="$store.state.Auth.activeRoleId !== 1" class="org-address">{{ address }}</h6>
              <h6  v-else class="org-address">{{ this.$i18n.locale === 'en' ? 'Building no 4, Secretariat, Abdul Gani Rd, Dhaka' : 'বিল্ডিং নং ৪, সচিবালয়, আব্দুল গণি রোড, ঢাকা' }}</h6>
            </div>
            <div class="col col-lg-2 text-left">
              <b-img  v-if="$store.state.Auth.activeRoleId !== 1" width='70px' :src="'data:image/jpeg;base64,' + rightLogo" fluid alt="Right Logo"></b-img>
              <!-- <b-img  v-else width='70px' :src="'/images/right-moa.jpg'" fluid alt="Right Logo"></b-img> -->
            </div>
          </div>
          <div class="row justify-content-md-center">
            <div class="col-md-auto text-center">
              <div class="report-title"><slot>{{ $i18n.locale === 'en' ? 'Report' : 'প্রতিবেদন' }}</slot></div>
            </div>
          </div>
        </div>
      </b-overlay>
  </div>
</template>

<script>
import RestApi from '@/config/api_config'

export default {
  props: ['baseUrl', 'url', 'menuId'],
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
    langChange: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getReportHead(this.orgId)
      }
    }
  },
  async created () {
    this.getReportHead(this.menuId)
  },
  methods: {
    async getReportHead (menuId) {
      let orgId = ''
      if (menuId !== 0) {
        const menuInfo = this.$store.state.licenseRegistration.commonObj.reportMenuList.find(item => item.menu_id === parseInt(menuId))
        orgId = menuInfo.org_id
      }
        if (this.$store.state.Auth.activeRoleId === 1) {
            this.leftLogo = ''
            this.rightLogo = ''
            this.address = ''
            this.orgName = ''
        } else {
            orgId = this.$store.state.Auth.authUser.org_id
            await RestApi.getData(this.baseUrl, this.url + '/' + orgId, this.getParams).then(response => {
                if (typeof response.success !== 'undefined' && response.success) {
                const orgData = this.$store.state.commonObj.organizationProfileList.find(item => item.value === orgId)
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

      /** Emitting Event For Excel */
      this.$emit('readyReportHead', {
        orgName: this.orgName,
        address: this.address
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
