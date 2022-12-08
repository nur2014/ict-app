<template>
  <main role="main" :class="activeFont">
    <div>
      <Header></Header>
       <b-container>
        <div class="main_wrapper home_wrapper container">
          <div class="cover_image_wrapper">
            <h2 class="cover_title">{{ $t('damReport.market_directory') }}</h2>
            <img src="@/assets/images/portal/cover-img.jpg" alt="" />
          </div>
          <div class="breadcrumb_wrapper mt-2">
            <b-container>
              <b-row>
                <div class="uvsportlight clearfix" style="width: 100%">
                  <div class="uv-shape">
                    <div class="ribbon">
                      <div :class="$i18n.locale === 'bn' ? 'ribbon-title ribbon-title-bn' : 'ribbon-title ribbon-title-en'">{{$t('damReport.daily_national_avg_market_price_retail')}}:</div>
                      <div class="ribbon-content">
                        <marquee
                          style="margin-top:10px"
                          behavior="scroll" direction="left"
                          onmouseover="this.stop();"
                          onmouseout="this.start();">
                          <ul class="navbar-nav bd-navbar-nav flex-row" v-if="datas.length > 0">
                            <li class="nav-item" v-for="(item, index) in datas" :key='index'>
                              <span>
                                <span>{{ $i18n.locale === 'bn' ? item.commodity_name_bn : item.commodity_name}} ({{ ($i18n.locale==='bn') ? item.unit_name_bn : item.unit_name }} )</span>
                                :&nbsp;{{$n(item.a_r_lowestPrice)}} - {{$n(item.a_r_howestPrice)}}
                                <slot v-if="item.percentage === '0.00'">
                                </slot>
                                <slot v-else>
                                  <slot v-if="item.percentage">
                                    <slot v-if="item.percentage < 0">
                                      <span style="color: var(--brand-secondary-color)">▼ {{$n(item.percentage)}} %</span>
                                    </slot>
                                    <slot v-else>
                                      <span style="color: #FF0000;">▲ {{$n(item.percentage)}} %</span>
                                    </slot>
                                  </slot>
                                </slot>
                                &nbsp;&nbsp;|
                              </span>
                              &nbsp;&nbsp;
                            </li>
                          </ul>
                        </marquee>
                      </div>
                    </div>
                  </div>
                </div>
              </b-row>
            </b-container>
          </div>
          <div class="breadcrumb_wrapper mt-2">
            <b-container>
              <b-row>
                <div class="uvsportlight clearfix" style="width: 100%">
                  <div class="uv-shape">
                    <div class="ribbon">
                      <div :class="$i18n.locale === 'bn' ? 'ribbon-title ribbon-title-bn' : 'ribbon-title ribbon-title-en'">{{$t('damReport.daily_national_avg_market_price_whole_sale')}}:</div>
                      <div class="ribbon-content">
                        <marquee
                          style="margin-top:10px"
                          behavior="scroll" direction="left"
                          onmouseover="this.stop();"
                          onmouseout="this.start();">
                          <ul class="navbar-nav bd-navbar-nav flex-row" v-if="datasWholeSale.length > 0">
                            <li class="nav-item" v-for="(item, index) in datasWholeSale" :key='index'>
                              <span>
                                <span>{{ $i18n.locale === 'bn' ? item.commodity_name_bn : item.commodity_name}} ({{ ($i18n.locale==='bn') ? item.unit_name_bn : item.unit_name }} )</span>
                                :&nbsp;{{$n(item.a_w_lowestPrice)}} - {{$n(item.a_w_howestPrice)}}
                                <slot v-if="item.percentage === '0.00'">
                                </slot>
                                <slot v-else>
                                  <slot v-if="item.percentage">
                                    <slot v-if="item.percentage < 0">
                                      <span style="color: var(--brand-secondary-color)">▼ {{$n(item.percentage)}} %</span>
                                    </slot>
                                    <slot v-else>
                                      <span style="color: #FF0000;">▲ {{$n(item.percentage)}} %</span>
                                    </slot>
                                  </slot>
                                </slot>
                                &nbsp;&nbsp;|
                              </span>
                              &nbsp;&nbsp;
                            </li>
                          </ul>
                        </marquee>
                      </div>
                    </div>
                  </div>
                </div>
              </b-row>
            </b-container>
          </div>
          <div class="service_container_wrapper mt-2">
            <b-row>
              <b-col lg="3">
                <component :is="comp" > </component>
              </b-col>
              <b-col lg="9" class="pl-0">
                <router-view></router-view>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-container>
      <Footer></Footer>
    </div>
  </main>
</template>
<style>
.ribbon {
 font-size: 16px !important;
 width: 100%;
 position: relative;
 background: #04234F;
 color: #fff;
 text-align: center;
 padding: 0em; /* Adjust to suit */
 margin: 0; /* Based on 24px vertical rhythm. 48px bottom margin - normally 24 but the ribbon 'graphics' take up 24px themselves so we double it. */
 display: flex;
 align-items: center;
}
.ribbon-title {
  position: relative;
  float: left;
  padding: 0.6rem 0rem;
  background: #275cab;
  /* border: 5px solid #04234f; */
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  z-index: 10;
  padding-left: 2px;
  width: 350px;
}
.ribbon-title::after {
  content: "";
  position: absolute;
  border-left: 17px solid #275cab;
  border-top: 17px solid transparent;
  border-bottom: 18px solid transparent;
  right: 0;
  top: 0;
  margin-right: -15px;
}
.ribbon-content {
  width: 100%;
  padding: 0 1rem;
  text-align: left;
  overflow: hidden;
}
.ribbon-title-en {
  font-size: 10px !important;
}
.ribbon-title-bn {
  font-size: 12px !important;
}
</style>
<script>
// import logo from '../../assets/images/logo.png'
import { core } from '../../config/pluginInit'
import Header from '@/modules/portal/components/Header'
import Footer from '@/modules/portal/components/Footer'
import ExternalCommonDropdown from '@/mixins/dropdown-portal-agri'
import leftMenu from '../../modules/portal/components/market-directory/LeftMenu'
import RestApi, { agriMarketingServiceBaseUrl } from '@/config/api_config'

export default {
  name: 'AuthLayout',
  mixins: [ExternalCommonDropdown],
  components: { Header, Footer, leftMenu },
  created () {
    this.loadData()
  },
  methods: {
    getRelationalData (data) {
      const list = data.map(item => {
        const prevPriceObj = this.prevPrice.find(commoditys => commoditys.commodity_id === item.commodity_id)
        if (typeof prevPriceObj !== 'undefined') {
          const valueLastAvgTotal = item.a_r_lowestPrice + item.a_r_howestPrice
          const valueSecondAvgTotal = typeof prevPriceObj !== 'undefined' ? prevPriceObj.a_r_lowestPrice : 0 + typeof prevPriceObj !== 'undefined' ? prevPriceObj.a_r_howestPrice : 0
          const subtractAvgTotal = parseFloat(valueLastAvgTotal).toFixed(2) - parseFloat(valueSecondAvgTotal).toFixed(2)
          let changePercentage = 0
          if (parseFloat(valueLastAvgTotal) && parseFloat(valueSecondAvgTotal)) {
            changePercentage = (subtractAvgTotal / valueSecondAvgTotal) * 100
          }
          const prevPriceData = {
            percentage: parseFloat(changePercentage).toFixed(2)
          }
          return Object.assign({}, item, prevPriceData)
        } else {
          return Object.assign({}, item)
        }
      })
      return list
    },
    getRelationalDataWholeSale (data) {
      const list = data.map(item => {
        const prevPriceObj = this.prevPriceWholeSale.find(commoditys => commoditys.commodity_id === item.commodity_id)
        if (typeof prevPriceObj !== 'undefined') {
          const valueLastAvgTotal = item.a_w_lowestPrice + item.a_w_howestPrice
          const valueSecondAvgTotal = typeof prevPriceObj !== 'undefined' ? prevPriceObj.a_w_lowestPrice : 0 + typeof prevPriceObj !== 'undefined' ? prevPriceObj.a_w_howestPrice : 0
          const subtractAvgTotal = parseFloat(valueLastAvgTotal).toFixed(2) - parseFloat(valueSecondAvgTotal).toFixed(2)
          let changePercentage = 0
          if (parseFloat(valueLastAvgTotal) && parseFloat(valueSecondAvgTotal)) {
            changePercentage = (subtractAvgTotal / valueSecondAvgTotal) * 100
          }
          const prevPriceData = {
            percentage: parseFloat(changePercentage).toFixed(2)
          }
          return Object.assign({}, item, prevPriceData)
        } else {
          return Object.assign({}, item)
        }
      })
      return list
    },
    loadData () {
      RestApi.getData(agriMarketingServiceBaseUrl, 'crop-price-info/reports/price-report/daily-price-scroll', null).then(response => {
        if (response.success) {
          this.datas = response.data
          this.prevPrice = response.prevPrice
          this.datas = this.getRelationalData(response.data)
          this.datasWholeSale = response.datasWholeSale
          this.prevPriceWholeSale = response.prevPriceWholeSale
          this.datasWholeSale = this.getRelationalDataWholeSale(response.datasWholeSale)
        }
      })
    }
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      comp: 'leftMenu',
      datas: [],
      prevPrice: [],
      datasWholeSale: [],
      prevPriceWholeSale: []
    }
  },
  computed: {
    activeFont: function () {
      return this.$i18n.locale === 'en' ? 'font-en' : 'font-bn'
    },
    loading () {
      return this.$store.state.Portal.loading
    }
  }
}
</script>
<style scoped>
  .img-layout {
    position: absolute;
    top: 45%;
    left: 45%;
    z-index: 100;
  }
</style>
