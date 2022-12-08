<template>
    <b-col md="12" sm="12" lg="12">
        <b-form-group
            label-cols-sm="5"
            :label-for="data.field_name"
        >
            <template v-slot:label>
                {{ local === 'bn' ? data.label_bn : data.label }}
            </template>
            <b-form-checkbox
                :id="data.field_name"
                v-model="data.value"
                value=1
                unchecked-value=0
                :style="'margin-top: 5px;'"
            >
            </b-form-checkbox>
        </b-form-group>
    </b-col>
</template>
<script>
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
    watch: {
        data: {
            deep: true,
            handler (updateData) {
                if (updateData.value === '1') {
                    this.sameAsData(this.data, true)
                } else {
                    this.sameAsData(this.data, false)
                }
            }
        }
    },
    methods: {
        sameAsData (data, status) {
            this.$emit('updateSameData', data, status)
        }
    }
}
</script>
