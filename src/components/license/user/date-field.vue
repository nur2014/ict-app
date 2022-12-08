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
            <flat-pickr class="form-control"
                :id="data.field_name"
                v-model="data.value"
                :placeholder="data.placeholder"
                :state="errors[0] ? false : (valid ? true : null)"
                :type="data.title"
            ></flat-pickr>
            <div class="invalid-feedback">
                {{ errors[0] }}
            </div>
            <div class="invalidage text-danger d-block" v-if="ageerr">
                {{ $t('globalTrans.age_err') }}
            </div>
        </b-form-group>
        </ValidationProvider>
    </b-col>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import flatpickr from 'flatpickr'
export default {
    props: ['data'],
    components: {
        ValidationProvider
    },
    data () {
        return {
            ageerr: false
        }
    },
    mounted () {
        flatpickr('#datepicker', {})
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    watch: {
        data: {
            deep: true,
            handler (val) {
                if (val.field_type === 'age') {
                    const ageCal = this.getAge(val.value)
                    if (ageCal < 18) {
                        val.value = ''
                        this.ageerr = true
                    }
                }
            }
        }
    },
    methods: {
        getAge (dateString) {
            const today = new Date()
            const birthDate = new Date(dateString)
            let age = today.getFullYear() - birthDate.getFullYear()
            const m = today.getMonth() - birthDate.getMonth()
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--
            }
            return age
        }
    }
}
</script>
