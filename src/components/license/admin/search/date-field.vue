<template>
        <b-col md="12" sm="12" lg="12">
            <b-form-group
                label-cols-sm="4"
                :label-for="data.field_name"
            >
                <template v-slot:label>
                    {{ local === 'bn' ? data.label_bn : data.label }} <span class="text-danger" v-if="data.isRequired === '1'">*</span><span class="ml-2" style="border:1px solid #66cc99;border-radius:50%;cursor:pointer" data-toggle="tooltip" data-placement="top" :title="data.help_text">?</span>
                </template>
                <flat-pickr class="form-control"
                    :id="data.field_name"
                    @input="setValue"
                    v-model="data.value"
                    :placeholder="data.placeholder"
                    :type="data.title"
                ></flat-pickr>
            </b-form-group>
        </b-col>
</template>
<script>
import flatpickr from 'flatpickr'
export default {
    props: ['data'],
    data () {
        return {
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    mounted () {
        flatpickr('#datepicker', {})
    }
}
</script>
