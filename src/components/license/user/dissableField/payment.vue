<template>
  <b-col md="12" sm="12" lg="12">
      <b-form-group
        label-cols-sm="4"
        :label-for="data.field_name"
      >
        <template v-slot:label>
          {{ $i18n.locale === 'bn' ? data.label_bn : data.label }}
        </template>
          <div v-if="data.value.length">
            <div class="custom-data">
              <span>
               : {{ finalValues.join(', ') }}
               </span>
            </div>
          </div>
          <p v-else>: ..................</p>
      </b-form-group>
  </b-col>
</template>
<script>
export default {
    props: ['data'],
    components: {
    },
    data () {
      return {
        finalValues: ''
      }
    },
    computed: {
      local: function () {
          return this.$i18n.locale
      }
    },
    watch: {
      local: function (newVal, oldValue) {
        if (newVal !== oldValue) {
          this.finalValues = this.getList()
        }
      }
    },
    created () {
      this.finalValues = this.getList()
    },
    methods: {
      getList () {
        const options = this.data.dropdownData.dropdown_options.map((item) => {
          if (this.$i18n.locale === 'bn') {
            return item.type_name_bn
          } else {
            return item.type_name
          }
        })
        return options.filter((item, index) => index === parseInt(this.data.value))
      }
    }
}
</script>
