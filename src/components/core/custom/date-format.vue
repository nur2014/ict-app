<template>
  <span>{{ myDate }}f</span>
</template>

<script>
export default {
  props: ['dateValue'],
  data () {
    return {
      customDateFormat: this.dateValue
    }
  },
  computed: {
    myDate () {
      return this.$i18n.locale === 'en' ? '10-10-10' : '2020-10-20'
    }
  },
  created () {
    this.customDateFormat = '2020-1-1'
  }
}
</script>
