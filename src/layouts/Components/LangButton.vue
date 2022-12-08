<template>
  <div class="row align-self-center ">
      <div id="language" class="btn-group btn-group-sm" role="group" aria-label="Language">
          <button type="button" class="btn btn-secondary bg-white text-success font-weight-bold" @click="changeLang()">{{ langLabel }}</button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    langLabel: function () {
      return this.$i18n.locale === 'en' ? 'বাংলা' : 'English'
    }
  },
  methods: {
    changeLang () {
      this.$i18n.locale = this.$i18n.locale === 'bn' ? 'en' : 'bn'
      this.setLocale(this.$i18n.locale)
    },
    ...mapActions({
      setLocale: 'Setting/setLocale'
    })
  }
}
</script>
