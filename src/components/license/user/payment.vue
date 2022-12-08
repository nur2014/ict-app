<template>
  <b-col md="12" sm="12" lg="12">
    <ValidationProvider :name="data.label" :vid="data.field_name" :rules="data.isRequired === true ? `required` : ``">
      <b-form-group
        label-cols-sm="4"
        :label-for="data.field_name"
        slot-scope="{ valid, errors }"
      >
        <template v-slot:label>
           {{ local === 'bn' ? data.label_bn : data.label }} <span class="text-danger" v-if="data.isRequired === true">*</span><span v-if="data.help_text !== ''" class="ml-2" style="border:1px solid #66cc99;border-radius:50%;cursor:pointer" data-toggle="tooltip" data-placement="top" :title="data.help_text">?</span>
        </template>
        <b-form-select
          plain
          v-model="data.value"
          :id="data.field_name"
          :options="drpList[data.field_name]"
          :state="errors[0] ? false : (valid ? true : null)"
        >
          <template v-slot:first>
            <b-form-select-option value="">{{$t('globalTrans.select')}}</b-form-select-option>
          </template>
        </b-form-select>
        <div class="invalid-feedback">
            {{ errors[0] }}
        </div>
      </b-form-group>
    </ValidationProvider>
  </b-col>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
    props: ['data'],
    components: {
        ValidationProvider
    },
    data () {
        return {
            drpList: []
        }
    },
    computed: {
      local: function () {
          return this.$i18n.locale
      }
    },
    created () {
      this.drpList[this.data.field_name] = this.getList()
      this.data.value = this.data.dropdownData.selected_item
    },
    methods: {
      getList () {
        return this.data.dropdownData.dropdown_options.map((item, index) => {
          if (this.$i18n.locale === 'bn') {
            return { value: index, text: item.type_name_bn }
          } else {
            return { value: index, text: item.type_name }
          }
        })
      }
    }
}
</script>
