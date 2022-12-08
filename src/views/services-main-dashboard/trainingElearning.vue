<template>
    <b-container fluid>
        <b-row>
            <b-col md="12">
                <iq-card>
                    <template v-slot:headerTitle>
                        <h4 class="card-title">{{$t('elearning_config.training_e_learning_service_dashboard')}}</h4>
                    </template>
                    <template v-slot:body>
                        <b-overlay>
                            <div class="iq-card">
                                <div class="card-body iq-card-body">
                                    <div class="b-overlay-wrap position-relative">
                                        <div class="row">
                                            <div class="col-12">
                                                <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
                                                    <b-form  @submit.prevent="handleSubmit(searchData)" @reset.prevent="reset" >
                                                        <b-row>
                                                            <b-col lg="6" sm="12">
                                                                <b-form-group
                                                                    class="row"
                                                                    label-cols-sm="4"
                                                                    label-for="fiscal_year_id"
                                                                >
                                                                    <template v-slot:label>
                                                                    {{$t('elearning_config.fiscal_year')}}
                                                                    </template>
                                                                    <v-select name="organization"
                                                                        v-model="search.fiscal_year_id"
                                                                        label="text"
                                                                        :reduce="item => item.value"
                                                                        :options= fiscalYearList
                                                                        :placeholder="$t('globalTrans.select')"
                                                                    />
                                                                </b-form-group>
                                                            </b-col>
                                                            <b-col lg="6" sm="12">
                                                                <b-form-group
                                                                    class="row"
                                                                    label-cols-sm="4"
                                                                    label-for="month_id"
                                                                    >
                                                                    <template v-slot:label>
                                                                        {{ $t('globalTrans.month') }}
                                                                    </template>
                                                                    <b-form-select
                                                                        plain
                                                                        v-model="search.month_id"
                                                                        :options="monthList"
                                                                        id="month_id"
                                                                        >
                                                                        <template v-slot:first>
                                                                            <b-form-select-option :value="0">{{$t('globalTrans.select')}}</b-form-select-option>
                                                                        </template>
                                                                        </b-form-select>
                                                                </b-form-group>
                                                            </b-col>
                                                            <b-col lg="6" sm="12">
                                                                <b-form-group
                                                                    class="row"
                                                                    label-cols-sm="4"
                                                                    :label="$t('elearning_config.organization')"
                                                                    label-for="organization"
                                                                >
                                                                    <v-select name="organization"
                                                                        v-model="search.org_id"
                                                                        label="text"
                                                                        :reduce="item => item.value"
                                                                        :options= orgList
                                                                        :placeholder="$t('globalTrans.select')"
                                                                    />
                                                                </b-form-group>
                                                            </b-col>
                                                            <b-col lg="6" sm="12">
                                                                <b-form-group
                                                                    class="row"
                                                                    label-cols-sm="4"
                                                                    label-for="training_type_id"
                                                                >
                                                                    <template v-slot:label>
                                                                    {{$t('elearning_config.training_type')}}
                                                                    </template>
                                                                    <b-form-select
                                                                    plain
                                                                    v-model="search.training_type_id"
                                                                    :options="trainingTypeList"
                                                                    id="training_type_id"
                                                                    >
                                                                    <template v-slot:first>
                                                                        <b-form-select-option :value="0">{{$t('globalTrans.select')}}</b-form-select-option>
                                                                    </template>
                                                                    </b-form-select>
                                                                </b-form-group>
                                                            </b-col>
                                                            <b-col lg="6" sm="12">
                                                                <b-form-group
                                                                    class="row"
                                                                    label-cols-sm="4"
                                                                    label-for="training_category_id"
                                                                    >
                                                                    <template v-slot:label>
                                                                        {{$t('elearning_config.training_category')}}
                                                                    </template>
                                                                    <b-form-select
                                                                        plain
                                                                        v-model="search.training_category_id"
                                                                        :options="trainingCategoryList"
                                                                        id="training_category_id"
                                                                        >
                                                                        <template v-slot:first>
                                                                            <b-form-select-option :value="0">{{$t('globalTrans.select')}}</b-form-select-option>
                                                                        </template>
                                                                        </b-form-select>
                                                                </b-form-group>
                                                            </b-col>
                                                            <b-col lg="6" sm="12">
                                                                <b-form-group
                                                                    class="row"
                                                                    label-cols-sm="4"
                                                                    label-for="training_title_id"
                                                                    >
                                                                    <template v-slot:label>
                                                                        {{$t('elearning_config.training_title')}}
                                                                    </template>
                                                                    <b-form-select
                                                                        plain
                                                                        v-model="search.training_title_id"
                                                                        :options="trainingTitleList"
                                                                        id="training_title_id"
                                                                        >
                                                                        <template v-slot:first>
                                                                            <b-form-select-option :value="0">{{$t('globalTrans.select')}}</b-form-select-option>
                                                                        </template>
                                                                        </b-form-select>
                                                                </b-form-group>
                                                            </b-col>
                                                        </b-row>
                                                    </b-form>
                                                </ValidationObserver>
                                            </div>
                                            <div class="col-12">
                                                <hr class="hrclass"/>
                                                <b-overlay :show="loading">
                                                    <div class="row" aria-hidden="loading | listReload ? 'true' : null" >
                                                        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                            <div class="seeds-box bg-secondary">
                                                                <div class="seeds-box-icon">
                                                                    <h4 class="text-center text-white">{{ $t('elearning_config.total_trainee') }}</h4>
                                                                </div>
                                                                <div class="info text-center">
                                                                    <!-- <h2>100 M Ton</h2> -->
                                                                    <div class="d-inline-flex p-2 text-warning text-success"><h2 class="text-white">{{$n(total_trainee, { useGrouping: false })}}</h2></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                            <div class="seeds-box bg-delivery">
                                                                <div class="seeds-box-icon">
                                                                    <h4 class="text-center text-white">{{ $t('elearning_config.total_course') }}</h4>
                                                                </div>
                                                                <div class="info text-center">
                                                                    <!-- <h2>100 M Ton</h2> -->
                                                                    <div class="d-inline-flex p-2 text-warning"><h2 class="text-white">{{$n(total_course, { useGrouping: false })}}</h2></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                            <div class="seeds-box bg-success">
                                                                <div class="seeds-box-icon">
                                                                    <h4 class="text-center text-white">{{ $t('elearning_config.ongoing_course') }}</h4>
                                                                </div>
                                                                <div class="info text-center">
                                                                    <!-- <h2>100 M Ton</h2> -->
                                                                    <div class="d-inline-flex p-2 text-warning text-success"><h2 class="text-white">{{$n(ongoing_course, { useGrouping: false })}}</h2></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                                            <div class="seeds-box" style="background: cadetblue">
                                                                <div class="seeds-box-icon">
                                                                    <h4 class="text-center text-white">{{ $t('elearning_config.total_course_completion') }}</h4>
                                                                </div>
                                                                <div class="info text-center">
                                                                    <!-- <h2>100 M Ton</h2> -->
                                                                    <div class="d-inline-flex p-2 text-warning text-success"><h2 class="text-white">{{$n(total_course_completion, { useGrouping: false })}}</h2></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </b-overlay>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-overlay>
                    </template>
                </iq-card>
            </b-col>
        </b-row>
        <b-overlay :show="loading">
            <b-row>
                <b-col md="6">
                    <iq-card style="min-height: 200px">
                        <template v-slot:headerTitle>
                            <h4 class="card-title text-center" style="font-size: 16px">{{$t('elearning_config.no_of_training_report')}}</h4>
                        </template>
                        <template v-slot:body>
                            <b-overlay>
                                <apexchart class="chart-2 text-center" id="vuechart-example2" v-if="searchThis" type="bar" height="250" :options="dataOption1" :series="seriesBar1"></apexchart>
                            </b-overlay>
                        </template>
                    </iq-card>
                </b-col>
                <b-col md="6">
                    <iq-card style="min-height: 200px">
                        <template v-slot:headerTitle>
                            <h4 class="card-title text-center" style="font-size: 16px">{{$t('elearning_config.month_wise_total_training_report')}}</h4>
                        </template>
                        <template v-slot:body>
                            <b-overlay>
                                <apexchart class="chart-1 text-center" id="vuechart-example" v-if="searchThis" type="bar" height="250" :options="dataOption" :series="seriesBar"></apexchart>
                            </b-overlay>
                        </template>
                    </iq-card>
                </b-col>
                <b-col md="6">
                    <iq-card  style="min-height: 200px">
                        <template v-slot:headerTitle>
                            <h4 class="card-title text-center" style="font-size: 16px">{{$t('elearning_config.no_of_trainee_report')}}</h4>
                        </template>
                        <template v-slot:body>
                            <b-overlay>
                                <apexchart class="chart-2 text-center" id="vuechart-example2" v-if="searchThis" type="bar" height="250" :options="dataOption2" :series="seriesBar2"></apexchart>
                            </b-overlay>
                        </template>
                    </iq-card>
                </b-col>
            </b-row>
        </b-overlay>
    </b-container>
</template>
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
<script>
import RestApi, { trainingElearningServiceBaseUrl } from '@/config/api_config'
// import { dashboard } from '../../api/routes'
import { dashboard } from '@/modules/training-e-learning-service/configuration/api/routes'
import moment from 'moment'

export default {
  name: 'UiDataTable',
  data () {
    return {
      search: {
        org_id: 0,
        training_type_id: 0,
        training_category_id: 0,
        training_title_id: 0,
        month_id: 0,
        fiscal_year_id: 0
      },
      loading: false,
      trainingCategoryList: [],
      trainingTitleList: [],
      total_trainee: 0,
      total_course: 0,
      ongoing_course: 0,
      total_course_completion: 0,
      orgs: [],
      orgs_bn: [],
      seriesData: [0, 0, 0],
      searchThis: false,
      chartOptions: {
        chart: {
          width: 200,
          type: 'pie'
        },
        legend: {
          position: 'bottom'
        },
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
      },
      seriesBar: [{
        name: 'Total:',
        data: []
      }],
      seriesBar1: [{
        name: 'Total:',
        data: []
      }],
      seriesBar2: [{
        name: 'Total:',
        data: []
      }]
    }
  },
  computed: {
    dataOption () {
      return {
        chart: {
          id: 'vuechart-example',
          type: 'bar'
        },
        plotOptions: {
          bar: {
            barHeight: '50px',
            columnWidth: '40%',
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: 'bottom',
              horizontalAlign: 'center'
            }
          }
        },
        labels: [
          this.$t('months.jan'),
          this.$t('months.feb'),
          this.$t('months.mar'),
          this.$t('months.apr'),
          this.$t('months.may'),
          this.$t('months.jun'),
          this.$t('months.jul'),
          this.$t('months.aug'),
          this.$t('months.sep'),
          this.$t('months.oct'),
          this.$t('months.nov'),
          this.$t('months.dec')
        ]
      }
    },
    dataOption1 () {
      return {
        chart: {
          id: 'vuechart-example1',
          type: 'bar'
        },
        plotOptions: {
          bar: {
            barHeight: '50px',
            columnWidth: '40%',
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: 'bottom',
              horizontalAlign: 'center'
            }
          }
        },
        labels: this.$i18n.locale === 'bn' ? this.orgs_bn : this.orgs
      }
    },
    dataOption2 () {
      return {
        chart: {
          id: 'vuechart-example2',
          type: 'bar'
        },
        plotOptions: {
          bar: {
            barHeight: '50px',
            columnWidth: '40%',
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: 'bottom',
              horizontalAlign: 'center'
            }
          }
        },
        labels: this.$i18n.locale === 'bn' ? this.orgs_bn : this.orgs
      }
    },
    trainingTypeList: function () {
        return this.$store.state.TrainingElearning.commonObj.trainingTypeList.filter(item => item.status === 1)
    },
    fiscalYearList: function () {
        return this.$store.state.commonObj.fiscalYearList.filter(item => item.status === 0)
    },
    orgList: function () {
        return this.$store.state.commonObj.organizationProfileList.filter(item => item.status === 0)
    },
    trainerEvaluationList: function () {
        return this.$store.state.TrainingElearning.commonObj.trainerEvaluationList.filter(item => item.status === 1)
    },
    regionList: function () {
        return this.$store.state.commonObj.officeList.filter(item => item.status === 0 && item.office_type_id === 72)
    },
    monthList: function () {
      return this.$store.state.commonObj.monthList
    }
  },
  watch: {
    'search.fiscal_year_id': function (newValue) {
        this.loadData()
    },
    'search.org_id': function (newValue) {
        this.loadData()
    },
    'search.month_id': function (newValue) {
        this.loadData()
    },
    'search.training_title_id': function (newValue) {
        this.loadData()
    },
    'search.training_type_id': function (newValue) {
        this.trainingCategoryList = this.getCategoryList(newValue)
        this.loadData()
    },
    'search.training_category_id': function (newValue) {
        this.trainingTitleList = this.getTrainingTitleList(newValue)
        this.loadData()
    }
  },
  async created () {
        this.search = Object.assign({}, this.search, {
            org_id: this.$store.state.dataFilters.orgId,
            fiscal_year_id: this.$store.state.TrainingElearning.currentFiscalYearId
        })
        this.loadData()
        const dataCh = []
        const dataChBn = []
        this.orgList.forEach((data, key) => {
            dataCh.push(data.abbreviation)
            dataChBn.push(data.abbreviation_bn)
        })
        this.orgs = dataCh
        this.orgs_bn = dataChBn
  },
  methods: {
    monthCheck (value) {
      if (this.$i18n.locale === 'bn') {
        // var bengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
        // return bengali.indexOf(parseInt(moment(value).format('M')))
         return moment(value).format('M')
      } else {
        return moment(value).format('M')
      }
    },
    getCategoryList (typeId) {
        const trainingCategoryList = this.$store.state.TrainingElearning.commonObj.trainingCategoryList.filter(item => item.status === 1)
        if (typeId) {
            return trainingCategoryList.filter(item => item.training_type_id === typeId)
        }
        return trainingCategoryList
    },
    getTrainingTitleList (categoryId) {
        const trainingTitleList = this.$store.state.TrainingElearning.commonObj.trainingTitleList.filter(item => item.status === 1)
        if (categoryId) {
            return trainingTitleList.filter(item => item.training_category_id === categoryId)
        }
        return trainingTitleList
    },
    series () {
      return this.seriesData
    },
    loadData () {
        this.loading = true
        RestApi.getData(trainingElearningServiceBaseUrl, dashboard, this.search).then(response => {
            if (response.success) {
                this.total_course = response.total_course
                this.total_trainee = response.total_trainee
                this.ongoing_course = response.ongoing_course
                this.monthlyWiseImportFn(response.monthly_training)
                this.noOfTraining(response.org_wise_training)
                this.noOfTraining(response.org_wise_training)
                this.noOfTrainee(response.trainee)
            }
            this.searchThis = true
            this.loading = false
        })
    },
    noOfTrainee (data) {
      const dataCh1 = []
      this.orgList.forEach((item, key) => {
        const orgInfo = data.find(item1 => item1.org_id === parseInt(item.value))
        if (typeof orgInfo !== 'undefined') {
          dataCh1.push(orgInfo.total)
        } else {
          dataCh1.push(0)
        }
      })
      this.seriesBar2 = [{
        name: 'Total:',
        data: dataCh1
      }]
    },
    noOfTraining (data) {
      const dataCh1 = []
      this.orgList.forEach((item, key) => {
        const orgInfo = data.find(item1 => item1.org_id === parseInt(item.value))
        if (typeof orgInfo !== 'undefined') {
          dataCh1.push(orgInfo.total)
        } else {
          dataCh1.push(0)
        }
      })
      this.seriesBar1 = [{
        name: 'Total:',
        data: dataCh1
      }]
    },
    monthlyWiseImportFn (data) {
      const prevData = data.map(item => {
        const monthData = this.monthCheck(item.training_date)
        const monthAssignData = {
          month_id: parseInt(monthData)
        }
        return Object.assign({}, item, monthAssignData)
      })
      const dataCh = []
      this.monthList.forEach((data, key) => {
        const monthInfo = prevData.find(item1 => item1.month_id === parseInt(data.value))
        if (typeof monthInfo !== 'undefined') {
          dataCh.push(monthInfo.total)
        } else {
          dataCh.push(0)
        }
      })
      this.seriesBar = [{
        name: 'Total:',
        data: dataCh
      }]
    }
  }
}
</script>
