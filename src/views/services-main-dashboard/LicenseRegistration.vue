<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title" v-if="$i18n.locale === 'en'">License Registration Service Dashboard</h4>
                        <h4 class="card-title" v-else>লাইসেন্স রেজিস্ট্রেশন সার্ভিস ড্যাশবোর্ড</h4>
                    </template>
                    <template v-slot:body>
                        <ValidationObserver ref="form"  v-slot="{ handleSubmit }">
                            <b-form @submit.prevent="handleSubmit(searchData)" >
                                <b-row>
                                    <b-col lg="5" sm="5" md="5">
                                        <ValidationProvider name="Organization" vid="org_id">
                                            <b-form-group
                                                class="row"
                                                label-cols-sm="4"
                                                label-for="org_id"
                                                slot-scope="{ valid, errors }"
                                            >
                                                <template v-slot:label>
                                                {{ $t('globalTrans.organization') }}
                                                </template>
                                                <b-form-select
                                                id="org_id"
                                                :options="orgList"
                                                v-model="search.org_id"
                                                :disabled="is_disable"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                >
                                                <template v-slot:first>
                                                    <b-form-select-option :value="0" disabled>{{ $t('globalTrans.select') }}</b-form-select-option>
                                                </template>
                                                </b-form-select>
                                                <div class="invalid-feedback">
                                                {{ errors[0] }}
                                                </div>
                                            </b-form-group>
                                        </ValidationProvider>
                                    </b-col>
                                    <b-col lg="5" sm="5" md="5">
                                        <ValidationProvider name="Service" vid="service_id">
                                            <b-form-group
                                                class="row"
                                                label-cols-sm="4"
                                                label-for="service_id"
                                                slot-scope="{ valid, errors }"
                                            >
                                                <template v-slot:label>
                                                {{ $t('service_name.service_name') }}
                                                </template>
                                                <b-form-select
                                                id="service_id"
                                                :options="serviceList"
                                                v-model="search.service_id"
                                                :state="errors[0] ? false : (valid ? true : null)"
                                                >
                                                <template v-slot:first>
                                                  <b-form-select-option :value="0" disabled>{{ $t('globalTrans.select') }}</b-form-select-option>
                                                </template>
                                                </b-form-select>
                                                <div class="invalid-feedback">
                                                {{ errors[0] }}
                                                </div>
                                            </b-form-group>
                                        </ValidationProvider>
                                    </b-col>
                                    <b-col class="col-sm-2">
                                        <b-button type="submit" variant="primary">{{ $t('globalTrans.search') }}</b-button>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </ValidationObserver>
                        <b-overlay :show="loadingData">
                            <b-row class="mt-5">
                                <b-col md="3" sm="6" class="custom-box-shadow" v-for="(item, index) in data" :key="index">
                                    <div class="bg-success p-3 rounded mb-3 text-center">
                                        <h2 style="cursor: pointer" class="text-white" @click="getReport(item,index)">{{ $n(item.value) }}</h2>
                                        <h5 style="cursor: pointer" class="text-white d-block capitalize" v-if="$i18n.locale === 'bn'" @click="getReport(item,index)">{{ item.title_bn  }}</h5>
                                        <h5 style="cursor: pointer" class="text-white d-block capitalize" v-else @click="getReport(item,index)">{{ item.title  }}</h5>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-overlay>
                    </template>
                </iq-card>
            </b-col>
            <b-col md="12" v-if="listReportData">
              <iq-card>
                <template v-slot:headerTitle>
                  <h4 class="card-title">{{ title_list }} {{ $t('globalTrans.list') }}</h4>
                </template>
                <template v-slot:body>
                  <b-overlay :show="listLoading">
                    <b-row>
                      <b-col md="12" class="table-responsive">
                        <b-table thead-class="table_head" bordered hover :items="listData" :fields="columns" aria-hidden="loading | listReload ? 'true' : null" :emptyText="$t('globalTrans.noDataFound')" show-empty>
                          <template v-slot:cell(index)="data">
                            {{ $n(data.index + pagination.slOffset) }}
                          </template>
                          <template v-slot:cell(application_id)="data">
                              {{ $n(data.item.application_id, { useGrouping: false }) }}
                          </template>
                          <template v-slot:cell(type)="data">
                              <span class="badge pay-status badge-success" v-if="data.item.type === 2">
                                  {{ $t('globalTrans.renew') }}
                              </span>
                              <span v-else>
                                {{ $t('globalTrans.new') }}
                              </span>
                          </template>
                          <template v-slot:cell(status)="data">
                              {{ getStepName(data.item.current_step) + ' ' + ServiceLastStepCheck(data.item.service_id, data.item.current_step, data.item.status) }}
                          </template>
                          <template v-slot:cell(action)="data">
                            <!-- Application View (Details) -->
                            <span @click="SetStep(data.item, 1)">
                              <router-link :to="{ name: 'app_detail', params: { stepChange }}" :title="$t('globalTrans.details')" :class="`btn btn-sm btn-info m-1`" size="sm"><i :class="`ri-eye-line`" @click="SetStep(data.item, 1)"></i></router-link>
                            </span>
                          </template>
                        </b-table>
                        <b-pagination
                        v-model="pagination.currentPage"
                        :per-page="pagination.perPage"
                        :total-rows="pagination.totalRows"
                        @input="reportData"
                        />
                      </b-col>
                    </b-row>
                  </b-overlay>
                </template>
              </iq-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { core } from '@/config/pluginInit'
import RestApi, { licenseRegistrationServiceBaseUrl } from '@/config/api_config'
import RouteBaseMasterList from '@/mixins/modal-base-master-list'

export default {
  mixins: [RouteBaseMasterList],
  data () {
    return {
      search: {
        org_id: 0,
        service_id: 0,
        status: ''
      },
      stepChange: {
          application_id: [],
          step_id: 0,
          service_id: 0,
          org_id: 0,
          status: 1
      },
      title_list: '',
      serviceList: [],
      stepList: [],
      data: [],
      loadingData: false,
      listLoading: false,
      is_disable: false,
      listReportData: false
    }
  },
  created () {
    if (this.$store.state.Auth.authUser.user_id !== 1) {
        this.is_disable = true
    }
    this.search.org_id = this.$store.state.Auth.authUser.org_id
  },
  computed: {
    orgList: function () {
      return this.$store.state.commonObj.organizationProfileList.filter(item => item.status === 0)
    },
    columns () {
        const labels = [
            { label: this.$t('globalTrans.sl_no'), class: 'text-center' },
            { label: this.$t('globalTrans.application_id'), class: 'text-center' },
            { label: this.$t('globalTrans.type'), class: 'text-center' },
            { label: this.$t('globalTrans.status'), class: 'text-center' },
            { label: this.$t('globalTrans.action'), class: 'text-center' }
        ]

        /*eslint-disable */
        let keys = []

        if (this.$i18n.locale === 'bn') {
            keys = [
            { key: 'index' },
            { key: 'application_id' },
            { key: 'type' },
            { key: 'status' },
            { key: 'action' }
            ]
        } else {
            keys = [
            { key: 'index' },
            { key: 'application_id' },
            { key: 'type' },
            { key: 'status' },
            { key: 'action' }
            ]
        }

        return labels.map((item, index) => {
            return Object.assign(item, keys[index])
        })
    },
    ...mapGetters({
      licenseCommonObj: 'licenseRegistration/commonObj'
    })
  },
  watch: {
    loadingState: function (newVal) {
      if (newVal) {
        this.loadData()
      }
    },
    'search.org_id': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.serviceList = this.getServiceList(newVal)
      }
    }
  },
  mounted () {
    core.index()
    this.loadData()
  },
  methods: {
    searchData () {
      this.loadData()
    },
    getReport (data,status) {
      if (this.search.service_id !== 0) {
        if (this.$i18n.locale === 'bn') {
          this.title_list = data.title_bn
        } else {
          this.title_list = data.title
        }
        this.search.status = status
        this.reportData()
        this.listReportData = true
      } else {
        const erMsg = this.$t('globalTrans.select_service')
        this.$toast.error({
          title: 'Error',
          message: erMsg
        })
        this.listReportData = false
      }
    },
    loadData () {
        const params = Object.assign({}, this.search)
        this.loadingData = true
        RestApi.getData(licenseRegistrationServiceBaseUrl, '/dashboard', params).then(response => {
            if (response.success) {
                this.data = response.data
            }
            this.loadingData = false
        })
    },
    reportData () {
      const params = Object.assign({}, this.search, {
          page: this.pagination.currentPage,
          per_page: this.pagination.perPage
      })
      this.$store.dispatch('mutateCommonProperties', { loading: true, listReload: false })
      RestApi.getData(licenseRegistrationServiceBaseUrl, '/dashboard_report', params).then(response => {
        if (response.success) {
          this.$store.dispatch('setList', response.data.data)
          this.paginationData(response.data)
        }
        this.$store.dispatch('mutateCommonProperties', { loading: false, listReload: false })
      })
    },
    SetStep (item, status) {
      this.stepChange.application_id[0] = item.application_id
      this.stepChange.step_id = item.current_step
      this.stepChange.service_id = item.service_id
      this.stepChange.org_id = item.org_id
      this.stepChange.status = status
    },
    getStepName (stId) {
        const step = this.$store.state.licenseRegistration.commonObj.stepNamesList.find(item => item.value === stId)
        return step !== undefined ? step.text : ''
    },
    ServiceLastStepCheck (serviceId, stepId, status) {
        const tmpStepList = this.$store.state.licenseRegistration.commonObj.serviceSteps.filter(item => item.service_id === parseInt(serviceId))
        const tmpIndVStepList = tmpStepList.find(item => item.step_id === parseInt(stepId))
        const order = tmpIndVStepList.order
        const orderCheck = tmpStepList.find(item => item.order === order + 1)
        if (status === 0) {
            return this.$t('globalTrans.pending')
        } else if (status === 2) {
            return this.$t('globalTrans.rejected')
        } else if (typeof orderCheck !== 'undefined') {
            return this.$t('globalTrans.pending')
        } else {
            return this.$t('globalTrans.completed')
        }
    },
    getServiceList (orgId) {
      return this.$store.state.licenseRegistration.commonObj.serviceNamesList.filter(item => item.status === 1 && item.org_id === orgId)

    }
  }
}
</script>
