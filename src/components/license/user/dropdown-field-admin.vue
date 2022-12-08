<template>
  <b-col md="12" sm="12" lg="12">
    <ValidationProvider :name="data.label" :vid="data.field_name" :rules="data.isRequired ? `required` : ``">
      <b-form-group
        label-cols-sm="4"
        :label-for="data.field_name"
        slot-scope="{ valid, errors }"
      >
        <template v-slot:label>
          {{ local === 'bn' ? data.label_bn : data.label }} <span class="text-danger" v-if="data.isRequired === true">*</span>
          <span v-if="data.help_text !== ''" class="ml-2" style="border:1px solid #66cc99;border-radius:50%;cursor:pointer" data-toggle="tooltip" data-placement="top" :title="data.help_text">?</span>
        </template>
        <b-form-select
          plain
          v-model="data.value"
          :id="data.field_name"
          :options="drpList[data.field_name]"
          :state="errors[0] ? false : (valid ? true : null)"
          @change="changeDrp($event)"
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
    props: ['data', 'drpChangeData', 'nextIndex'],
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
    watch: {
      local: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.getoptions()
        }
      }
    },
    created () {
      if (this.data.dropdownData.component_id === '0') {
        const dropDowns = this.data.dropdownData.dropdown_options
        this.drpList[this.data.field_name] = dropDowns.map((item, index) => {
          if (this.local === 'bn') {
            const optionsData = { value: index, text: item.name_bn }
            return Object.assign({}, item, optionsData)
          } else {
            const optionsData = { value: index, text: item.name }
            return Object.assign({}, item, optionsData)
          }
        })
      } else if (this.data.dropdownData.component_id === '1' && this.data.dropdownData.has_parent === '') {
        const commonStore = this.$store.state.commonObj
        const options = commonStore[this.data.dropdownData.dropdown_name]
        this.drpList[this.data.field_name] = this.getStoreoptions(options)
      } else if (this.data.dropdownData.component_id === '2' && this.data.dropdownData.has_parent === '') {
        const commonStore = this.$store.state.licenseRegistration.commonObj
        const options = commonStore[this.data.dropdownData.dropdown_name]
        this.drpList[this.data.field_name] = this.getStoreoptions(options)
      } else if (this.data.dropdownData.has_parent !== '') {
        const commonStore = this.data.dropdownData.component_id === '1' ? this.$store.state.commonObj : this.$store.state.licenseRegistration.commonObj
        const options = this.data.dropdownData.dropdown_options.length < 1 ? commonStore[this.data.dropdownData.dropdown_name] : this.data.dropdownData.dropdown_options
        this.drpList[this.data.field_name] = this.getStoreoptions(options)
      }
    },
    methods: {
      getStoreoptions (options) {
        return options.map(item => {
          if (this.$i18n.locale === 'bn') {
            return { value: item.value, text: item.text_bn }
          } else {
            return { value: item.value, text: item.text_en }
          }
        })
      },
      changeDrp (event) {
        this.data.dropdownData.selected_item = event
        if (this.data.dropdownData.component_id === '1') {
          const ChildDrpList = this.$store.state.commonObj[this.drpChangeData.dropdownData.dropdown_name]
          const parent = ChildDrpList[0].parent
          this.drpChangeData.dropdownData.dropdown_options = ChildDrpList.filter(item => item[parent] === event)
        } else if (this.data.dropdownData.component_id === '2') {
          const ChildDrpList = this.$store.state.licenseRegistration.commonObj[this.drpChangeData.dropdownData.dropdown_name]
          const parent = ChildDrpList[0].parent
          this.drpChangeData.dropdownData.dropdown_options = ChildDrpList.filter(item => item[parent] === event)
        }
        this.$emit('updateDropdownData', this.drpChangeData, this.nextIndex)
      },
      getoptions () {
        if (this.data.dropdownData.component_id === '0') {
          const dropDowns = this.data.dropdownData.dropdown_options
          this.drpList[this.data.field_name] = dropDowns.map((item, index) => {
            if (this.local === 'bn') {
              const optionsData = { value: index, text: item.name_bn }
              return Object.assign({}, item, optionsData)
            } else {
              const optionsData = { value: index, text: item.name }
              return Object.assign({}, item, optionsData)
            }
          })
        } else if (this.data.dropdownData.component_id === '1') {
          const commonStore = this.$store.state.commonObj
          const options = commonStore[this.data.dropdownData.dropdown_name]
          this.drpList[this.data.field_name] = this.getStoreoptions(options)
        } else {
          const commonStore = this.$store.state.licenseRegistration.commonObj
          const options = commonStore[this.data.dropdownData.dropdown_name]
          this.drpList[this.data.field_name] = this.getStoreoptions(options)
        }
      }
    }
}
</script>
