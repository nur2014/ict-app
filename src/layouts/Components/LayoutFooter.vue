<template>
  <div>
    <MiniFooter>
      <template v-slot:left>
        <li class="list-inline-item-1">Copyright ©2021 All rights reserved by <a href="https://moa.gov.bd" target="_blank">MoA</a></li>
        <li class="list-inline-item-2">Technical Support by
          <a href="https://ictd.gov.bd" target="_blank">
            <img src="@/assets/images/ict-division-logo.png" alt="ict-division" height="32">
          </a>
        </li>
      </template>
      <template v-slot:right>
        <span>Developed by</span>
        <a href="https://www.syntechbd.com" target="_blank">
          <img src="@/assets/images/syntech-logo.png" alt="Syntech Solution Ltd."/>
        </a>
      </template>
    </MiniFooter>
  </div>
</template>
<script>
import MiniFooter from '../../components/core/footer/MiniFooter'
import { APPNAME } from '../../config/pluginInit'
export default {
  name: 'LayoutFooter',
  components: {
    MiniFooter
  },
  mounted () {
  },
  data () {
    return {
      appName: APPNAME
    }
  }
}
</script>
