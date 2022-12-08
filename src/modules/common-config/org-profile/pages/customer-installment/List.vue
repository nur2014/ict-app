<template>
  <b-container fluid>
    <iq-card>
    </iq-card>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Customer Installment</h4>
          </template>
          <template v-slot:headerAction>
            <b-button class="btn_add_new" v-b-modal.modal-4 @click="resetId">
              <i class="fas fa-plus"></i>Add New
            </b-button>
          </template>
          <template v-slot:body>
            <b-overlay :show="loadingState">
              <b-row>
                <b-col md="12" class="table-responsive">
                  <b-table thead-tr-class="table_head" bordered hover :items="listData" :fields="columns" aria-hidden="loading | listReload ? 'true' : null">
                    <template v-slot:cell(index)="data">
                      {{ data.index + pagination.slOffset }}
                    </template>
                    <template v-slot:cell(customer_name)="data">
                      {{ data.item.customer_name }}
                    </template>
                    <template v-slot:cell(installment)="data">
                      {{ getSelectedOrgList(data.item.ins_details) }}
                    </template>
                    <template v-slot:cell(total_installment)="data">
                      {{ data.item.ins_details.length }}
                    </template>
                    <template v-slot:cell(action)="data">
                      <a href="javascript:" class="btn_table_action table_action_status" title="delete" v-if="data.item.status === 0" @click="remove(data.item)">Pay</a>
                      <a href="javascript:" class="btn_table_action table_action_edit" title="Edit" v-if="data.item.status === 0" v-b-modal.modal-4 @click="edit(data.item)"><i class="ri-ball-pen-fill"></i></a>
                      <a href="javascript:" class="btn_table_action table_action_status" title="delete" v-if="data.item.status === 0" @click="remove(data.item)">Delete</a>
                      <a href="javascript:" class="btn_table_action table_action_toggle" title="delete" v-if="data.item.status === 1">Paid</a>
                    </template>
                  </b-table>
                  <b-pagination
                    align="center"
                    v-model="pagination.currentPage"
                    :per-page="pagination.perPage"
                    :total-rows="pagination.totalRows"
                    @input="searchData"
                    />
                </b-col>
              </b-row>
            </b-overlay>
          </template>
        </iq-card>
      </b-col>
    </b-row>
    <b-modal id="modal-4" size="xl" :title="formTitle" :ok-title="$t('globalTrans.close')" ok-only ok-variant="danger">
      <p>
        <FormV :item="item" :id="editItemId" :key="editItemId"/>
      </p>
    </b-modal>
    <b-modal id="modal-5" size="lg" :title="$t('org_pro.ward_details')" :ok-title="$t('globalTrans.close')" ok-only ok-variant="danger">
       <Details :item="item" :key="testId"></Details>
    </b-modal>
  </b-container>
</template>
<script>
import FormV from './Form'
import RestApi, { commonServiceBaseUrl } from '@/config/api_config'
import { installmentList, installmentToggleStatus } from '../../api/routes'
import Details from './Details'
import ModalBaseMasterList from '@/mixins/modal-base-master-list'

export default {
  mixins: [ModalBaseMasterList],
  components: {
    FormV, Details
  },
  data () {
    return {
      search: {
        type: '0',
        division_id: '0',
        district_id: '0',
        upazilla_id: '0',
        union_id: '0'
      },
      testId: 0,
      districtList: [],
      upazilaList: [],
      unionList: [],
      rows: [],
      item: ''
    }
  },
  watch: {
    loadingState: function (newVal, oldVal) {
      if (newVal) {
        this.loadData()
      }
    },
    'search.division_id': function (newVal, oldVal) {
      this.districtList = this.getDistrictList(newVal)
    },
    'search.district_id': function (newVal, oldVal) {
      this.upazilaList = this.getUpazilaList(newVal)
    },
    'search.upazilla_id': function (newVal, oldVal) {
      this.unionList = this.getUnionList(newVal)
    }
  },
  computed: {
    wardTypeList: function () {
        const objectData = this.$store.state.commonObj.wardTypeList
        return objectData.map((obj, key) => {
            if (this.$i18n.locale === 'bn') {
                return { value: obj.id, text: obj.name_bn }
            } else {
                return { value: obj.id, text: obj.name }
            }
        })
    },
    divisionList: function () {
      return this.$store.state.commonObj.divisionList.filter(item => item.status === 0)
    },
    formTitle () {
       return (this.editItemId === 0) ? 'Installment Entry' : 'Installment Update'
    },
    currentLocale () {
      return this.$i18n.locale
    },
    columns () {
      const labels = [
          { label: 'SL', class: 'text-center' },
          { label: 'Customer', class: 'text-center' },
          { label: 'Installments', class: 'text-center' },
          { label: 'Total Installment', class: 'text-center' },
          { label: this.$t('globalTrans.action'), class: 'text-center w-15' }
        ]
      let keys = []
        keys = [
          { key: 'index' },
          { key: 'customer_name' },
          { key: 'installment' },
          { key: 'total_installment' },
          { key: 'action' }
        ]
        return labels.map((item, index) => {
          return Object.assign(item, keys[index])
      })
    }
  },
  created () {
    this.loadData()
    },
  mounted () {
  },
  methods: {
    edit (item) {
      this.editItemId = item.id
      this.item = item
    },
    details (item) {
      this.item = item
    },
    searchData () {
      this.loadData()
    },
    remove (item) {
      this.changeStatus(commonServiceBaseUrl, installmentToggleStatus, item)
    },
    loadData () {
        const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
        this.$store.dispatch('mutateCommonProperties', { loading: true, listReload: false })
        RestApi.getData(commonServiceBaseUrl, installmentList, params).then(response => {
          console.log('response=', response)
            if (response.success) {
                this.$store.dispatch('setList', this.ListDataShow(response.data.data))
                this.paginationData(response.data)
            }
            this.$store.dispatch('mutateCommonProperties', { loading: false, listReload: false })
        })
    },
    ListDataShow (data) {
      let tmpData = {}
      // let tmpData2 = {}
      // let tmpUpzila = {}
      // let tmpUnion = {}
      // let tmpWardType = {}
      // let tmpCityCorporation = {}
      // let pauroshoba = {}
      const listData = data.map(item => {
        tmpData = this.$store.state.commonObjCommonConfig.customerList.find(customer => customer.value === item.customer_id && customer.status === 0)
        // tmpData2 = this.$store.state.commonObj.districtList.find(district => district.value === item.district_id && district.status === 0)
        // tmpUpzila = this.$store.state.commonObj.upazilaList.find(upizila => upizila.value === item.upazilla_id && upizila.status === 0)
        // tmpUnion = this.$store.state.commonObj.unionList.find(union => union.value === item.union_id && union.status === 0)
        // tmpWardType = this.$store.state.commonObj.wardTypeList.find(ward => ward.id === item.type)
        // tmpCityCorporation = this.$store.state.commonObjCommonConfig.cityCorporationList.find(cityC => cityC.value === item.city_corporation_id)
        // pauroshoba = this.$store.state.commonObjCommonConfig.pauroshobaList.find(pauroshoba => pauroshoba.value === item.pauroshoba_id)
        const orgData = {
            customer_name: tmpData !== undefined ? tmpData.text_en : ''
            // division_name_bn: tmpData !== undefined ? tmpData.text_bn : '',
            // distict_name: tmpData2 !== undefined ? tmpData2.text_en : '',
            // distict_name_bn: tmpData2 !== undefined ? tmpData2.text_bn : '',
            // upzila_name: tmpUpzila !== undefined ? tmpUpzila.text_en : '',
            // upzila_name_bn: tmpUpzila !== undefined ? tmpUpzila.text_bn : '',
            // union_name: tmpUnion !== undefined ? tmpUnion.text_en : '',
            // union_name_bn: tmpUnion !== undefined ? tmpUnion.text_bn : '',
            // type_name: tmpWardType !== undefined ? tmpWardType.name : '',
            // type_name_bn: tmpWardType !== undefined ? tmpWardType.name_bn : '',
            // city_corporation_name: tmpCityCorporation !== undefined ? tmpCityCorporation.text_en : '',
            // city_corporation_name_bn: tmpCityCorporation !== undefined ? tmpCityCorporation.text_bn : '',
            // pauroshoba_name: pauroshoba !== undefined ? pauroshoba.text_en : '',
            // pauroshoba_name_bn: pauroshoba !== undefined ? pauroshoba.text_bn : ''
        }
            return Object.assign({}, item, orgData)
      })
      return listData
    },
    getSelectedOrgList (orgs) {
      const orgList = orgs.map(item => {
        return item.amount
      })
      if (orgList === null || orgList === undefined) {
        return ''
      }
      return orgList.join(', ')
    }
  }
}
</script>
