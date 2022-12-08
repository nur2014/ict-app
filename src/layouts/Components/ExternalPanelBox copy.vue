<template>
  <div class="tablist_menu_wrapper" :class="fontClass">
    <div class="container-fluid">
        <div class="row">
          <div class="col">
            <!-- <template v-for="item in panels">
                <a href="javascript:" class="btn btn_tablist" :key="item.menuMatcher" @click="setPanel(item.menuMatcher, true)">
                  <span class="mty_bottom"></span>
                  {{ $t(`${item.title}`) }}
                  <span class="mty_top"></span>
                  <span class="mty_bottom_right"></span>
                </a>
              </template> -->
              <div class="menu_items">
                <ul>
                    <li v-for="item in panelTop" :key="item.menuMatcher">
                        <a href="#" @click="setPanel(item.menuMatcher, true)">
                            <div>
                                <div class="icon_bg">
                                  <img :src="require(`../../assets/images/icon/${item.svg}`)" alt="">
                                </div>
                                <span>{{ $t(`${item.title}`) }}</span>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul class="my-3">
                    <li v-for="item in panelBottom" :key="item.menuMatcher">
                        <a href="#" @click="setPanel(item.menuMatcher, true)" class="active">
                            <div>
                                <div class="icon_bg">
                                  <img  :src="require(`../../assets/images/icon/${item.svg}`)" alt="">
                                </div>
                                <span>{{ $t(`${item.title}`) }}</span>
                            </div>
                        </a>
                    </li>
                </ul>
              </div>
              <div class="menu_items">
                <ul>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/irrigation.svg" alt="">
                                </div>
                                <span>সেচ</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/warehouse.svg" alt="">
                                </div>
                                <span>গুদাম</span>
                            </div>
                        </a></li>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/ginner.svg" alt="">
                                </div>
                                <span>জিনার</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/grower.svg" alt="">
                                </div>
                                <span>উৎপাদক</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/divisional Head.svg" alt="">
                                </div>
                                <span>ডিভিশনাল হেড</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/dealer.svg" alt="">
                                </div>
                                <span>ডিলার</span>
                            </div>
                        </a>
                    </li>
                </ul>
                <ul class="my-3">
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/grant.svg" alt="">
                                </div>
                                <span>অনুদান</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/subsidy.svg" alt="">
                                </div>
                                <span>ভর্তুকি</span>
                            </div>
                        </a></li>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/trainer-trainee.svg" alt="">
                                </div>
                                <span>প্রশিক্ষক প্রশিক্ষণার্থী</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/virutal-museum.svg" alt="">
                                </div>
                                <span>ভার্চুয়াল মিউজিয়াম</span>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <div>
                                <div class="icon_bg">
                                  <img src="../../assets/images/icon/research-farmer.svg" alt="">
                                </div>
                                <span>গবেষণা কৃষক</span>
                            </div>
                        </a>
                    </li>
                </ul>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { externalPanels } from '@/Utils/external-user-panels.js'
import SideBarItems from '@/FackApi/json/SideBarExternalUser'
import { EventBus } from '@/EventBusLayout'
export default {
  data () {
    return {
      panels: externalPanels.names,
      panelTop: [],
      panelBottom: [],
      SideBarMenus: SideBarItems
    }
  },
  computed: {
    fontClass () {
      return this.$i18n.locale === 'en' ? 'en-font-size' : 'bn-font-size'
    },
    ...mapGetters({
      serviceUrl: 'Portal/serviceUrl'
    })
  },
  created () {
    let serviceUrl = this.serviceUrl.externalPanelServiceUrl
    this.$store.dispatch('Portal/setServiceUrl', {
      externalPanelServiceUrl: ''
    })
    // localStorage.removeItem('externalPanelServiceUrl')
    if (window.performance) {
      if (serviceUrl === undefined || serviceUrl === null || serviceUrl === '') {
        serviceUrl = this.$router.currentRoute.path
      }
    }
    this.setPanelBasedOnRoute(serviceUrl)
  },
  beforeMount () {
    EventBus.$on('EXTERNAL_USER_SET_PANEL', this.setPanel)
  },
  methods: {
    setPanel (menuIndex, byClick = false) {
      this.$store.commit('ExternalUserIrrigation/setActivePanel', menuIndex)
      const menus = this.SideBarMenus[menuIndex]
      const dashboardRoute = menus[0].link.name
      if (byClick) {
        this.$router.push({ name: dashboardRoute })
      }
      this.setPanelMenus(menuIndex)
      EventBus.$emit('EXTERNAL_USER_SIDEBAR_MENUS', menus)
    },
    setPanelBasedOnRoute (serviceUrl) {
      let isMatched = false
      this.panels.forEach(item => {
        if (serviceUrl.indexOf(item.urlMatcher) !== -1) {
          isMatched = true
          this.setPanel(item.menuMatcher, false)
        }
      })
      if (!isMatched) {
        this.setPanel('common', false)
      }
    },
    setPanelMenus (panelName) {
      const panels = this.panels
      const panelTop = []
      const panelBottom = []
      let i = 0
      let isTop = true
      panels.forEach(item => {
        i++
        if (i <= 6) {
          panelTop.push(item)
        } else {
          panelBottom.push(item)
        }
        if (item.menuMatcher === panelName) {
          isTop = i <= 6
        }
      })
      if (isTop) {
        this.panelTop = panelTop
        this.panelBottom = panelBottom
      } else {
        this.panelTop = panelBottom
        this.panelBottom = panelTop
      }
    }
  }
}
</script>

<style scoped>
  .tablist_menu_wrapper .menu_items {
    margin: 30px 0;
    border-radius: 5px;
  }

  .tablist_menu_wrapper .menu_items ul {
      margin: 0;
      padding: 0;
      height: 100%;
      list-style: none;
      text-align: center;
  }

  .tablist_menu_wrapper .menu_items ul li {
    display: inline-flex;
    border: 3px solid #29AC0A;
    border-radius: 5px;
    width: 15%;
    align-items: center;
    justify-content: center;
    background-color: #d3ffc9;
    margin: 0 5px;
    transition: .5s all;
  }

  .tablist_menu_wrapper .menu_items ul li a {
      text-decoration: none;
      color: #222;
      font-size: 1.2rem;
      width: 100%;
  }

  .tablist_menu_wrapper .menu_items ul li div {
      margin: 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 2px;
      text-decoration: none;
      font-weight: 300;
      font-size: 1.2rem;
  }

  .tablist_menu_wrapper .menu_items ul li a span {
    margin-top: 5px;
    font-weight: 600;
  }

  .tablist_menu_wrapper .menu_items ul li a .icon_bg {
    /* position: absolute; */
    padding: 5px;
    margin-top: -35px;
    border-radius: 50%;
    border: 3px solid #29AC0A;
    background-color: #d3ffc9;
    box-shadow: inset 0 0 1px 3px #fff;
  }

  .tablist_menu_wrapper .menu_items ul li a .icon_bg img {
    width: 32px;
    height: 32px;
  }

  .tablist_menu_wrapper .menu_items ul li:hover,
  .tablist_menu_wrapper .menu_items ul li:active,
  .tablist_menu_wrapper .menu_items ul li:focus,
  .tablist_menu_wrapper .menu_items ul li.active {
      border-radius: 5px;
      background-color: #29AC0A;
  }

  .tablist_menu_wrapper .menu_items ul li:hover a span,
  .tablist_menu_wrapper .menu_items ul li:active a span,
  .tablist_menu_wrapper .menu_items ul li:focus a span,
  .tablist_menu_wrapper .menu_items ul li.active a span {
    color: #fff;
  }

  .tablist_menu_wrapper .menu_items ul li:hover a .icon_bg img,
  .tablist_menu_wrapper .menu_items ul li:active a .icon_bg img,
  .tablist_menu_wrapper .menu_items ul li:focus a .icon_bg img,
  .tablist_menu_wrapper .menu_items ul li.active a .icon_bg img {
    color: #29AC0A;
  }

  .en-font-size .btn_tablist {
    font-size: 17px !important;
    letter-spacing: 0;
  }

  .bn-font-size .btn_tablist {
    font-size: 19px !important;
  }
</style>
