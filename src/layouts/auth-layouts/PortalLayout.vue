<template>
  <main role="main" :class="activeFont">
    <div class="portal_main_wrapper">
      <Header></Header>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </main>
</template>
<script>
// import logo from '../../assets/images/logo.png'
import incentiveFarmerMixin from '@/mixins/dropdown-external-incentive-farmer'
import agriResearchPortalMixin from '@/mixins/dropdown-portal-agri-research'
import { core } from '../../config/pluginInit'
import Header from '@/modules/portal/components/Header'
import Footer from '@/modules/portal/components/Footer'

export default {
  mixins: [incentiveFarmerMixin, agriResearchPortalMixin],
  name: 'AuthLayout',
  components: { Header, Footer },
  created () {},
  methods: {},
  mounted () {
    core.index()
  },
  data () {
    return {}
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
