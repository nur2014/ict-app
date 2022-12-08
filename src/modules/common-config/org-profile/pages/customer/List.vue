
<template>
  <b-container fluid>
    <iq-card>
      <template v-slot:headerTitle>
        <h4 class="card-title">Customer</h4>
      </template>
      <template v-slot:body>
        <b-row>
            <b-col xs="12" sm="12" md="6" lg="6" xl="6">
                <b-form-group
                class="row"
                label-cols-sm="3"
                label="Customer Name"
                label-for="customer_name"
                >
                <b-form-input
                    id="name"
                    v-model="search.customer_name"
                    placeholder=""
                    ></b-form-input>
                </b-form-group>
            </b-col>
            <b-col lg="6" md="6" sm="12">
                <b-button type="button" variant="primary" @click="searchData">{{ $t('globalTrans.search') }}</b-button>
            </b-col>
        </b-row>
      </template>
    </iq-card>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Customer List</h4>
          </template>
          <template v-slot:headerAction>
            <b-button class="btn_add_new" v-b-modal.modal-4 @click="resetId">
              <i class="fas fa-plus"></i>{{ $t('globalTrans.add_new') }}
            </b-button>
          </template>
          <template v-slot:body>
            <b-overlay :show="loadingState">
              <b-row>
                <b-col md="12" class="table-responsive">
                  <b-table thead-class="table_head" bordered hover :items="listData" :fields="columns" aria-hidden="loading | listReload ? 'true' : null" :emptyText="$t('globalTrans.noDataFound')" show-empty>
                    <template v-slot:cell(index)="data">
                      {{ data.index + pagination.slOffset }}
                    </template>
                    <template v-slot:cell(division_name)="data">
                      <span class="capitalize">{{ data.item.customer_name }}</span>
                    </template>
                    <template v-slot:cell(address)="data">
                      {{ data.item.address }}
                    </template>>
                    <template v-slot:cell(status)="data">
                      {{ data.item.status ? $t('globalTrans.inactive') : $t('globalTrans.active') }}
                    </template>
                    <template v-slot:cell(action)="data">
                      <a href="javascript:" class="btn_table_action table_action_edit" v-b-modal.modal-4 @click="edit(data.item)"><i class="ri-ball-pen-fill"></i></a>
                      <a href="javascript:" class="btn_table_action table_action_status" v-if="data.item.status === 0" @click="remove(data.item)"><i class="fas fa-toggle-on"></i></a>
                      <a href="javascript:" class="btn_table_action table_action_toggle" v-if="data.item.status === 1" @click="remove(data.item)"><i class="fas fa-toggle-off"></i></a>
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

    <b-modal ref="modal" id="modal-4" size="lg" :title="formTitle" :ok-title="$t('globalTrans.close')" ok-only ok-variant="danger">
      <p>
        <FormV :id="editItemId" :key="editItemId"/>
      </p>
    </b-modal>
  </b-container>
</template>
<script>
import FormV from './FormV'
import RestApi, { commonServiceBaseUrl } from '../../../../../config/api_config'
import { customerList, customerToggleStatus } from '../../api/routes'
import ModalBaseMasterList from '@/mixins/modal-base-master-list'
export default {
  mixins: [ModalBaseMasterList],
  components: {
    FormV
  },
  data () {
    return {
      search: {
        customer_name: '',
        address: ''
      },
      rows: []
    }
  },
  computed: {
    formTitle () {
       return (this.editItemId === 0) ? 'Customer Entry' : 'Customer Update'
    },
    columns () {
      const labels = [
          { label: 'sl', class: 'text-center' },
          { label: 'Customer Name', class: 'text-center' },
          { label: 'Address', class: 'text-center' },
          { label: 'Status', class: 'text-center' },
          { label: 'Action', class: 'text-center' }
        ]

      let keys = []
      keys = [
          { key: 'index' },
          { key: 'customer_name' },
          { key: 'address' },
          { key: 'status' },
          { key: 'action' }
        ]
        return labels.map((item, index) => {
          return Object.assign(item, keys[index])
        })
    }
  },
  async created () {
    this.loadData()
  },
  methods: {
    async searchData () {
      this.loadData()
    },
    remove (item) {
      this.changeStatus(commonServiceBaseUrl, customerToggleStatus, item, 'common', 'customerList')
    },
    loadData () {
      const params = Object.assign({}, this.search, { page: this.pagination.currentPage, per_page: this.pagination.perPage })
      this.$store.dispatch('mutateCommonProperties', { loading: true, listReload: false })
      RestApi.getData(commonServiceBaseUrl, customerList, params).then(response => {
        if (response.success) {
          this.$store.dispatch('setList', response.data.data)
          this.paginationData(response.data)
        }
      })
      this.$store.dispatch('mutateCommonProperties', { loading: false, listReload: false })
    }
  }
}
</script>
