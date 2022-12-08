<template>
    <b-col lg="4" sm="4" md="4">
        <ValidationProvider name="From Date" vid="from_date" :rules="checkValidate ? `required` : ``">
            <b-form-group
            class="row"
            label-cols-sm="12"
            :label="$t('globalTrans.from_date')"
            label-for="from_date"
            slot-scope="{ valid, errors }"
            >
            <b-form-input
                id="datepicker"
                @input="setValue"
                placeholder="yyyy-mm-dd"
                v-model="from_date"
                :state="errors[0] ? false : (valid ? true : null)"
                ></b-form-input>
                <div class="invalid-feedback">
                {{ errors[0] }}
                </div>
            </b-form-group>
        </ValidationProvider>
    </b-col>
</template>
<script>
import flatpickr from 'flatpickr'
export default {
    props: ['fieldData'],
    data () {
        return {
            from_date: '',
            checkValidate: false
        }
    },
    mounted () {
        flatpickr('#datepicker', {})
    },
    methods: {
        setValue () {
             this.$emit('loadValue', {
              type: 1,
              value: this.from_date
            })
        }
    },
    created () {
        const appIdField = this.fieldData.find(item => item.field_id === 'date')
        if (typeof appIdField !== 'undefined') {
            this.checkValidate = appIdField.is_required
        } else {
            this.checkValidate = false
        }
    }
}
</script>
