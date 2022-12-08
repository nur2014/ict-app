<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <b-overlay :show="loading">
              <b-row>
                <b-col lg="12" sm="12">
                      <!-- <b-row>
                        <b-col class="col-sm-12 col-md-12"> -->
                            <div class="table-responsive">
                            <table class="table table-sm table-bordered table-responsive">
                                <thead>
                                    <tr class="bg-primary">
                                        <th ><div>{{ $t('globalTrans.sl_no') }}</div></th>
                                        <th style="width: 100%" class="text-center"><div>{{ $t('vm_museum_management.museum_name') }}</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="mList && mList.length">
                                        <tr v-for="(item, index) in mList" :key="index">
                                            <td  class="text-center">{{ index+1 }}</td>
                                            <td class="text-left">{{ ($i18n.locale == 'bn' ? item.museum_name_bn: item.museum_name) }} </td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr>
                                            <td colspan="13" align="center">{{ $t('globalTrans.noDataFound') }}</td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                        <!-- </b-col>
                      </b-row> -->
                      <b-row>
                        <div class="col mt-2 text-right">
                          &nbsp;
                          <b-button variant="danger" class="mr-1" @click="$bvModal.hide('modal-museum')">{{ $t('globalTrans.cancel') }}</b-button>
                        </div>
                      </b-row>
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
// import { core } from '@/config/pluginInit'
// import RestApi, { virtualMuseumServiceBaseUrl } from '@/config/api_config'
// import { soilInfoStore, soilInfoUpdate } from '../../api/routes'
export default {
  props: ['mList'],
  components: {
  },
  created () {
    if (this.mList) {
      this.museumList = this.mList
    }
  },
  mounted () {
  },
  data () {
    return {
      loading: false,
      museumList: []
      // saveBtnName: this.id ? this.$t('globalTrans.update') : this.$t('globalTrans.save'),
      // virtualMuseumServiceBaseUrl: virtualMuseumServiceBaseUrl,
      // formData: {
      //   org_id: 0,
      //   type_id: 0,
      //   description_en: '',
      //   description_bn: ''
      // }
    }
  }
}
</script>
