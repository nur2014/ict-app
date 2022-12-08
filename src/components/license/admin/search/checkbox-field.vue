<template>
  <ValidationProvider :name="data.label" :vid="data.field_name" :rules="checkValidate ? `required` : ``">
    <b-form-group
      label-cols-sm="12"
      :label-for="data.field_name"
    >
      <template v-slot:label>
        {{ local === 'bn' ? data.label_bn : data.label }}
      </template>
        <b-form-checkbox-group v-if="data.is_multiple"
            :id="data.field_name"
            v-model="data.value"
            :options="listData"
        ></b-form-checkbox-group>
        <b-form-checkbox v-else
            :id="data.field_name"
            v-model="data.value"
            value=1
            unchecked-value=0
        >
        </b-form-checkbox>
    </b-form-group>
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
    props: ['fieldData', 'data'],
    components: {
      ValidationProvider
    },
    data () {
        return {
           listData: [],
           checkValidate: ''
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    created () {
        const Field = this.fieldData.find(item => item.field_id === this.data.field_id)
        if (typeof Field !== 'undefined') {
          this.checkValidate = Field.is_required
        } else {
          this.checkValidate = false
        }
        this.listData = this.data.options.map(item => {
          if (this.$i18n.locale === 'bn') {
            const optionsData = { value: item.value, text: item.text_bn }
            return Object.assign({}, item, optionsData)
          } else {
            const optionsData = { value: item.value, text: item.text }
            return Object.assign({}, item, optionsData)
          }
        })
    },
    watch: {
        local: function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.getoptions()
            }
        }
    },
    methods: {
        getoptions () {
            this.listData = this.data.options.map(item => {
                if (this.$i18n.locale === 'bn') {
                    const optionsData = { value: item.value, text: item.text_bn }
                    return Object.assign({}, item, optionsData)
                } else {
                    const optionsData = { value: item.value, text: item.text }
                    return Object.assign({}, item, optionsData)
                }
            })
        }
    }
}
</script>
