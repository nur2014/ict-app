<template>
  <ValidationProvider :name="data.label" :vid="data.field_name" :rules="checkValidate ? `required` : ``">
    <b-form-group
      label-cols-sm="12"
      :label-for="data.field_name"
      slot-scope="{ valid, errors }"
    >
      <template v-slot:label>
        {{ local === 'bn' ? data.label_bn : data.label }} <span class="text-danger" v-if="data.isRequired === '1'">*</span>
      </template>
      <b-form-select
        plain
        v-model="data.value"
        :id="data.field_name"
        :options="drpList[data.field_name]"
        @change="changeDrp($event)"
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
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
    props: ['data', 'drpChangeData', 'nextIndex', 'fieldData'],
    components: {
      ValidationProvider
    },
    data () {
        return {
            drpList: [],
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
      if (this.data.dropdownData.component_id === 0) {
        const dropDowns = this.data.dropdownData.dropdown_options
        this.drpList[this.data.field_name] = dropDowns.map((item, index) => {
          return { value: index, text: item.name }
        })
      } else {
        this.drpList[this.data.field_name] = this.data.dropdownData.dropdown_options
        this.data.value = this.data.dropdownData.selected_item
      }
    },
    methods: {
      changeDrp (event) {
        this.data.dropdownData.selected_item = event
        if (this.data.dropdownData.component_id === '1') {
          const ChildDrpList = this.$store.state.commonObj[this.drpChangeData.dropdownData.dropdown_name]
          let fieldName = this.data.field_name
          const str = '_' + this.data.id
          fieldName = fieldName.replace(str, '')
          this.drpChangeData.dropdownData.dropdown_options = ChildDrpList.filter(item => item[fieldName] === event)
        }
        this.$emit('updateDropdownData', this.drpChangeData, this.nextIndex)
      }
    }
}
</script>
