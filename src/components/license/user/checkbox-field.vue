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
                <b-form-checkbox-group v-if="data.is_multiple"
                    :id="data.field_name"
                    v-model="data.value"
                    :options="data.options"
                    :state="errors[0] ? false : (valid ? true : null)"
                ></b-form-checkbox-group>
                <b-form-checkbox v-else
                    :id="data.field_name"
                    v-model="data.value"
                    :state="errors[0] ? false : (valid ? true : null)"
                >
                </b-form-checkbox>
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
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    created () {
        this.listData = this.data.options.map(item => {
          this.setTextBn()
          if (this.$i18n.locale === 'bn') {
            const optionsData = { text: item.text_bn }
            return Object.assign(item, optionsData)
          } else {
            const optionsData = { text: item.text_en }
            return Object.assign(item, optionsData)
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
                this.setTextBn()
                if (this.$i18n.locale === 'bn') {
                    const optionsData = { text: item.text_bn }
                    return Object.assign(item, optionsData)
                } else {
                    const optionsData = { text: item.text_en }
                    return Object.assign(item, optionsData)
                }
            })
        },
        setTextBn () {
            this.listData = this.data.options.map(item => {
                if (item.text_en === undefined) {
                    return Object.assign(item, { text_en: item.text })
                } else {
                    return item
                }
            })
        }
    }
}
</script>
