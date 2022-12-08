<template>
  <b-container fluid>
      <b-row>
        <b-col lg="12" sm="12">
          <iq-card>
            <template>
                <b-row>
                  <b-col lg="12" sm="12">
                    <b-row>
                      <b-col lg="3" sm="12">
                        <p class="text-dark" style="font-weight:bold">{{ $t('irri_pump_main.type_id') }} :</p>
                      </b-col>
                      <b-col lg="9" sm="12">
                         <p class="text-dark">{{ (this.$i18n.locale=='bn') ? wardData.type_name_bn : wardData.type_name }}</p>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col lg="12" sm="12">
                        <div>
                          <b-table-simple striped bordered small>
                              <b-tr v-if="wardData.type === 2 || wardData.type === 3">
                                <b-th>{{ $t('org_pro_division.division') }}</b-th>
                                <b-td>{{ (this.$i18n.locale=='bn')? wardData.division_name_bn : wardData.division_name }}</b-td>
                                <b-th>{{ $t('org_pro_district.district') }}</b-th>
                                <b-td>{{ (this.$i18n.locale=='bn')? wardData.distict_name_bn : wardData.distict_name }}</b-td>
                              </b-tr>
                              <b-tr v-if="wardData.type === 3">
                                <b-th>{{ $t('org_pro_upazilla.upazilla') }}</b-th>
                                <b-td>{{ (this.$i18n.locale=='bn')? wardData.upzila_name_bn : wardData.upzila_name }}</b-td>
                                <b-th>{{ $t('org_pro_union.union') }}</b-th>
                                <b-td>{{ (this.$i18n.locale=='bn')? wardData.union_name_bn : wardData.union_name }}</b-td>
                              </b-tr>
                              <b-tr v-if="wardData.type === 2">
                                <b-th>{{ $t('org_pro_upazilla.upazilla') }}</b-th>
                                <b-td>{{ (this.$i18n.locale=='bn')? wardData.upzila_name_bn : wardData.upzila_name }}</b-td>
                                <b-th>{{ $t('org_pro.pauroshoba') }}</b-th>
                                <b-td>{{ (this.$i18n.locale=='bn')? wardData.pauroshoba_name_bn : wardData.pauroshoba_name }}</b-td>
                              </b-tr>
                            <b-tr v-if="wardData.type === 1">
                              <b-th>{{ $t('org_pro.city_corporation') }}</b-th>
                              <b-td>{{ (this.$i18n.locale=='bn')? wardData.city_corporation_name_bn : wardData.city_corporation_name }}</b-td>
                            </b-tr>
                          </b-table-simple>
                          <b-row>
                                <b-col lg="12" sm="12" class="text-center mb-4">
                                    <h5 class='complain-title'>{{ $t('org_pro.ward_name') }}</h5>
                                </b-col>
                          </b-row>
                          <b-table bordered hover :items="wardData.master_ward_details" :fields="columns" aria-hidden="loading | listReload ? 'true' : null">
                                <template v-slot:cell(index)="data">
                                {{ $n(data.index + 1) }}
                                </template>
                          </b-table>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
              </b-row>
            </template>
          </iq-card>
        </b-col>
      </b-row>
    </b-container>
</template>
<script>
export default {
  name: 'FormLayout',
  props: ['item'],
  created () {
    this.wardData = this.item
  },
  data () {
    return {
      wardData: [],
      slOffset: 1
    }
  },
  computed: {
    localeLang () {
      return this.$i18n.locale
    },
    listData () {
      const objectData = this.item
      return objectData.filter(data => data.id === this.item.id)
    },
    columns () {
      const labels = [
          { label: this.$t('globalTrans.sl_no'), class: 'text-left' },
          { label: this.$t('org_pro.ward_name'), class: 'text-left' },
          { label: this.$t('org_pro.ward_name_bn'), class: 'text-left' }
        ]

      let keys = []

      if (this.$i18n.locale === 'bn') {
        keys = [
          { key: 'index' },
          { key: 'ward_name_bn' }
        ]
      } else {
        keys = [
          { key: 'index' },
          { key: 'ward_name' }
        ]
      }

      return labels.map((item, index) => {
          return Object.assign(item, keys[index])
      })
    }
  },
  methods: {
  }
}
</script>
<style>
  .hidden_header {
    display: none
  }
  .card-border {
    border: 1px solid #b9bdc1;
    box-shadow: 1px 1px 6px -1px grey;
    background-color: #dee2e6;
  }
  [dir=ltr][mode=light] .card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 10px;
  }
  .report-name{
    font-weight: bold !important;
    text-transform: uppercase;
  }
  .my-btn{
    padding: 2px !important;
  }
</style>
