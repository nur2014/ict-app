<template>
    <b-container fluid>
          <iq-card>
            <template v-slot:headerTitle>
                <h4 class="card-title">{{ $t('vm_museum_management.dashboard') }}</h4>
            </template>
            <template v-slot:body>
               <b-row>
                  <b-col xs="12" sm="12" md="6" lg="6" xl="6">
                      <ValidationProvider name="Organization" vid="org_id" rules="required|min_value:1">
                          <b-form-group
                              class="row"
                              label-cols-sm="4"
                              label-for="org_id"
                              slot-scope="{ valid, errors }"
                          >
                              <template v-slot:label>
                              {{$t('globalTrans.organization')}} <span class="text-danger">*</span>
                              </template>
                              <b-form-select
                              plain
                              v-model="search.org_id"
                              :options="orgList"
                              id="org_id"
                              :disabled="search.org_id != ''"
                              :state="errors[0] ? false : (valid ? true : null)"
                              >
                              <template v-slot:first>
                              <b-form-select-option :value="0" >{{$t('globalTrans.select')}}</b-form-select-option>
                              </template>
                              </b-form-select>
                              <div class="invalid-feedback">
                              {{ errors[0] }}
                              </div>
                          </b-form-group>
                      </ValidationProvider>
                  </b-col>
                  <b-col lg="4" md="4" sm="12">
                    <b-button type="button" variant="primary" @click="searchData">{{ $t('globalTrans.search') }}</b-button>
                </b-col>
               </b-row>
            </template>
          </iq-card>
          <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">{{ $t('vm_museum_management.dashboard') }}</h4>
          </template>
          <template v-slot:body>
            <b-overlay :show="loader">
            <b-row>
                <b-col cols="4" class="custom-box-shadow">
                    <div style="cursor: pointer;" @click="allMuseumList()" class="bg-success p-3 rounded mb-3 text-center">
                        <h5 class="text-white d-block">
                            {{ $t('vm_museum_management.total_museum')}}
                        </h5>
                        <h2 class="text-white">
                            <div>
                                {{ $n(data.total_museum) }}
                            </div>
                        </h2>
                    </div>
                </b-col>
                <b-col cols="4" class="custom-box-shadow">
                    <div style="cursor: pointer;" @click="allCropList()" class="bg-success p-3 rounded mb-3 text-center">
                        <h5 class="text-white d-block">
                            {{ $t('vm_museum_management.total_crop')}}
                        </h5>
                        <h2 class="text-white">
                            <div>
                                {{ $n(data.total_crop) }}
                            </div>
                        </h2>
                    </div>
                </b-col>
                 <b-col cols="4" class="custom-box-shadow">
                    <div style="cursor: pointer;" @click="allPestList()" class="bg-success p-3 rounded mb-3 text-center">
                        <h5 class="text-white d-block">
                            {{ $t('vm_museum_management.total_pest')}}
                        </h5>
                        <h2 class="text-white">
                            <div>
                                {{ $n(data.total_pest) }}
                            </div>
                        </h2>
                    </div>
                </b-col>
                <b-col cols="4" class="custom-box-shadow">
                    <div style="cursor: pointer;" @click="allSoilList()" class="bg-success p-3 rounded mb-3 text-center">
                        <h5 class="text-white d-block">
                            {{ $t('vm_museum_management.total_soil')}}
                        </h5>
                        <h2 class="text-white">
                            <div>
                                {{ $n(data.total_soil) }}
                            </div>
                        </h2>
                    </div>
                </b-col>
                <b-col cols="4" class="custom-box-shadow">
                    <div class="bg-success p-3 rounded mb-3 text-center">
                        <h5 class="text-white d-block">
                            {{ $t('vm_museum_management.total_gallery_image')}}
                        </h5>
                        <h2 class="text-white">
                            <div>
                                {{ $n(data.total_gallery_image) }}
                            </div>
                        </h2>
                    </div>
                </b-col>
            </b-row>
            <br>
            <b-row>
                <b-col lg="7">
                  <apexchart type="bar" height="350" :options="chartOptions" :series="bar_series"></apexchart>
                </b-col>
                 <b-col lg="5" style="margin-top: 80px;">
                    <apexchart type="pie" width="380" :options="pieChartOptions" :series="pie_series"></apexchart>
                </b-col>
            </b-row>
            </b-overlay>
          </template>
        </iq-card>
      </b-col>
     </b-row>
     <!-- ==================Modal COntainer Start============= -->
     <b-modal id="modal-museum" size="lg" :title="museumTitle"  :ok-title="$t('globalTrans.close')" ok-only ok-variant="danger">
      <MuseumList :mList="data.museumArr" :key="museumListA"/>
    </b-modal>
     <b-modal id="modal-crop" size="lg" :title="cropTitle"  :ok-title="$t('globalTrans.close')" ok-only ok-variant="danger">
      <CropList :crList="data.cropArr" key="cropList"/>
    </b-modal>
     <b-modal id="modal-pest" size="lg" :title="pestTitle"  :ok-title="$t('globalTrans.close')" ok-only ok-variant="danger">
      <PestList :peList="data.pestArr" key="pestList"/>
    </b-modal>
     <b-modal id="modal-soil" size="lg" :title="soilTitle"  :ok-title="$t('globalTrans.close')" ok-only ok-variant="danger">
      <SoilList :soList="data.soilArr" key="soilList"/>
    </b-modal>
     <!-- ==================Modal COntainer End=============== -->
   </b-container>
</template>
<script>
import MuseumList from './VirtualMuseumModal/MuseumList'
import CropList from './VirtualMuseumModal/CropList'
import PestList from './VirtualMuseumModal/PestList'
import SoilList from './VirtualMuseumModal/SoilList'
import RestApi, { virtualMuseumServiceBaseUrl } from '@/config/api_config'
import { totalMuseumApi, totalCropApi, totalPestApi, totalSoilApi, totalGalleryImageApi, museumVisitRequestApi } from '../../modules/virtual-museum-service/configuration/api/routes'
import ModalBaseMasterList from '@/mixins/modal-base-master-list'
import apexchart from 'vue-apexcharts'
import Vue from 'vue'
Vue.use(apexchart)
export default {
  mixins: [ModalBaseMasterList],
  components: {
    MuseumList, CropList, PestList, SoilList
  },
  data () {
    return {
      loaderTotalMuseum: true,
      loaderTotalCrop: true,
      loaderTotalPest: true,
      loaderTotalSoil: true,
      loaderTotalGalleryImage: true,
      loaderBarChart: true,
      search: {
        // org_id: this.$store.state.dataFilters.orgId ? this.$store.state.dataFilters.orgId : 0
        org_id: (this.$store.state.Auth.activeRoleId === 1) ? 0 : this.$store.state.Auth.authUser.org_id
      },
      info: [],
      data: {
        total_museum: 0,
        total_crop: 0,
        total_pest: 0,
        total_soil: 0,
        total_gallery_image: 0,
        museumArr: [],
        cropArr: [],
        pestArr: [],
        soilArr: []
      },
      museumListA: 1,
      bar_series: [{
            name: this.$t('vm_museum_management.museum_info'),
            data: [0, 0, 0, 0]
          }
      ],
      pie_series: [10, 20, 30],
      chartOptions: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Total Crop', 'Total Pest', 'Total Soil', 'Total Gallery Image']
            },
            fill: {
              opacity: 1
            }
      },
      pieChartOptions: {
            chart: {
              width: 380,
              type: 'pie'
            },
            labels: ['Approved Request', 'Pending Request', 'Visited'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          }
    }
  },
  computed: {
    museumTitle () {
      return this.$t('vm_museum_management.museum') + ' ' + this.$t('globalTrans.list')
    },
    cropTitle () {
      return this.$t('vm_museum_management.crop_information') + ' ' + this.$t('globalTrans.list')
    },
    pestTitle () {
      return this.$t('vm_museum_management.pest_information') + ' ' + this.$t('globalTrans.list')
    },
    soilTitle () {
      return this.$t('vm_museum_management.soil_information') + ' ' + this.$t('globalTrans.list')
    },
    orgList: function () {
        const objectData = this.$store.state.commonObj.organizationProfileList.filter(item => item.status === 0)
        return objectData.map((obj, key) => {
            if (this.$i18n.locale === 'bn') {
                return { value: obj.value, text: obj.text_bn }
            } else {
                return { value: obj.value, text: obj.text_en }
            }
        })
    }
  },
  created () {
    this.loadData()
  },
  watch: {
  },
  methods: {
    allMuseumList () {
      // alert('I am museum Modal')
      this.$bvModal.show('modal-museum')
    },
    allCropList () {
      this.$bvModal.show('modal-crop')
    },
    allPestList () {
      this.$bvModal.show('modal-pest')
    },
    allSoilList () {
      this.$bvModal.show('modal-soil')
    },
    edit (item) {
      this.editItemId = item.id
    },
    searchData () {
      this.info = []
      this.loadData()
    },
    async loadData () {
      this.loader = true
      const params = Object.assign({}, this.search)

      let result = await RestApi.getData(virtualMuseumServiceBaseUrl, totalMuseumApi, params)
      if (result.success) {
          this.data.total_museum = result.data
          this.data.museumArr = result.list
      }
      result = await RestApi.getData(virtualMuseumServiceBaseUrl, totalCropApi, params)
      if (result.success) {
          this.data.total_crop = result.data
          this.data.cropArr = result.list
          this.info.push(result.data)
      }
      result = await RestApi.getData(virtualMuseumServiceBaseUrl, totalPestApi, params)
      if (result.success) {
          this.data.total_pest = result.data
          this.data.pestArr = result.list
          this.info.push(result.data)
      }
      result = await RestApi.getData(virtualMuseumServiceBaseUrl, totalSoilApi, params)
      if (result.success) {
          this.data.total_soil = result.data
          this.data.soilArr = result.list
          this.info.push(result.data)
      }
      result = await RestApi.getData(virtualMuseumServiceBaseUrl, totalGalleryImageApi, params)
      if (result.success) {
          this.data.total_gallery_image = result.data
          this.info.push(result.data)
      }
      result = await RestApi.getData(virtualMuseumServiceBaseUrl, museumVisitRequestApi, params)
      if (result.success) {
           this.pie_series = result.data
      }
       this.bar_series = [{
                        name: this.$t('vm_museum_management.museum_info'),
                        data: this.info
                    }]
      this.loader = false
    }
  }
}
</script>

<style scoped>
    .bg-delivery {
        background-color: #008082;
    }
    .hrclass {
        border-top: 1px solid rgb(96, 149, 19) !important;
        margin-top: 5px !important;
        margin-bottom: 5px !important;
    }
    .seeds-box {
        border-radius: 3px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        padding: 10px 0px;
        text-align: right;
        display: block;
        margin-top: 20px;
    }
    .seeds-box-icon {
        background-color: #609513 !important;
        margin: 0 auto;
        margin-top: -20px;
        font-size: 12px !important;
        height: 40px;
        padding-top: 7px;
    }
    .seeds-box-icon span {
        color: #fff;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }
    .info h4 {
        font-size: 26px;
        letter-spacing: 2px;
        text-transform: uppercase;
    }
    .info > p {
        color: #717171;
        font-size: 16px;
        padding-top: 10px;
        text-align: justify;
    }
</style>
