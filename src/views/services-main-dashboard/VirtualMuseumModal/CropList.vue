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
                                        <th style="width: 100%" class="text-center"><div>{{ $t('pest_management.crop') }}</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="crList && crList.length">
                                        <tr v-for="(item, index) in crList" :key="index">
                                            <td  class="text-center">{{ index+1 }}</td>
                                            <td class="text-left">{{ getCropName(item.crop_id) }} </td>
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
                          <b-button variant="danger" class="mr-1" @click="$bvModal.hide('modal-crop')">{{ $t('globalTrans.cancel') }}</b-button>
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
export default {
  props: ['crList'],
  components: {
  },
  created () {
    if (this.crList) {
      this.cropList = this.crList
    }
  },
  mounted () {
  },
  data () {
    return {
      loading: false,
      cropList: []
    }
  },
  methods: {
    getCropName (cropId = null) {
            const cropObj = this.$store.state.VirtualMuseum.commonObj.cropList.find(crop => crop.value === cropId)
                if (this.$i18n.locale === 'bn') {
                    return (cropObj !== undefined) ? cropObj.text_bn : ''
                } else {
                    return (cropObj !== undefined) ? cropObj.text_en : ''
                }
        }
  }
}
</script>
