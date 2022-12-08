<template>
  <router-view/>
</template>
<script>
import { core } from './config/pluginInit'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      currentLocale: 'Setting/currentLocale'
    })
  },
  created () {
    this.setLocale()
  },
  mounted () {
    core.mainIndex()
  },
  methods: {
    setLocale () {
      if (this.currentLocale !== this.$i18n.locale) {
        this.$i18n.locale = this.currentLocale
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;900&display=swap');
@font-face {
  font-family: "Kalpurush";
  src: local("Kalpurush"),
   url("./assets/fonts/Kalpurush.ttf") format("truetype");
}
/* @font-face {
  font-family: "Nikosh";
  src: local("Nikosh"),
   url("./assets/fonts/Nikosh.ttf") format("truetype");
} */
</style>
<style lang="scss">
  @import "assets/scss/style.scss";
</style>
