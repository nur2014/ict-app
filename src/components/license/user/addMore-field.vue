<template>
    <b-col md="12" sm="12" lg="12">
        <b-button @click="addMoreOptions" variant="primary" style="float:right">{{ $i18n.locale === 'bn' ? tmpData.label_bn : tmpData.label }}</b-button>
    </b-col>
</template>
<script>
export default {
    props: ['tmpData', 'data'],
    data () {
        return {
        }
    },
    computed: {
      local: function () {
        return this.$i18n.locale
      }
    },
    created () {
      this.tmpData.addMore_options = []
    },
    methods: {
        addMoreOptions (val) {
            const obj = {}
            this.tmpData.fields.forEach(i => {
                const field = this.data.find(item => item.id === i)
                if (field.field_type === 'dropdown') {
                    if (field.dropdownData.component_id === '0') {
                        const dropDowns = field.dropdownData.dropdown_options
                        const options = dropDowns.map((item, index) => {
                            if (this.$i18n.locale === 'bn') {
                                const optionsData = { value: index, text: item.name_bn }
                                return Object.assign({}, item, optionsData)
                            } else {
                                const optionsData = { value: index, text: item.name }
                                return Object.assign({}, item, optionsData)
                            }
                        })
                        const selField = options.find(item => item.value === field.dropdownData.selected_item)
                        const fieldName = field.label
                        obj[fieldName] = selField.text
                        field.value = ''
                        field.dropdownData.selected_item = ''
                    } else if (field.dropdownData.component_id === '1') {
                        const commonStore = this.$store.state.ExternalUserIrrigation.commonObj
                        const options = commonStore[field.dropdownData.dropdown_name]
                        const selOptions = this.getStoreoptions(options)
                        const selField = selOptions.find(item => item.value === field.dropdownData.selected_item)
                        const fieldName = field.label
                        obj[fieldName] = selField.text
                        field.value = 0
                    } else {
                        const commonStore = this.$store.state.ExternalLrcpn.lrcpnObj
                        const options = commonStore[field.dropdownData.dropdown_name]
                        const selOptions = this.getStoreoptions(options)
                        const selField = selOptions.find(item => item.value === field.dropdownData.selected_item)
                        const fieldName = field.label
                        obj[fieldName] = selField.text
                        field.value = 0
                    }
                } else {
                    const fieldName = field.label
                    obj[fieldName] = field.value
                    field.value = ''
                    field.isRequired = false
                }
            })
            this.tmpData.addMore_options.push(obj)
            this.$emit('addDetails', this.tmpData.addMore_options, this.tmpData.id)
        },
        getStoreoptions (options) {
            return options.map(item => {
                if (this.$i18n.locale === 'bn') {
                    return { value: item.value, text: item.text_bn }
                } else {
                    return { value: item.value, text: item.text_en }
                }
            })
        }
    }
}
</script>
