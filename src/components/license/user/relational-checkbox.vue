<template>
    <b-col md="12" sm="12" lg="12">
        <b-form-group
            label-cols-sm="6"
            :label-for="data.field_name"
        >
            <template v-slot:label>
                {{ local === 'bn' ? data.label_bn : data.label }}
            </template>
            <b-form-checkbox
                :disabled="disablefield"
                :id="data.field_name"
                v-model="data.value"
                value= true
                unchecked-value= false
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
            disablefield: false
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    created () {
        this.disabledData()
    },
    watch: {
        data: {
            deep: true,
            handler (data) {
                if (data.value === 'true') {
                    this.showComponents(data.fields, data.id, true)
                } else {
                    this.showComponents(data.fields, data.id, false)
                }
            }
        }
    },
    methods: {
        disabledData () {
            const myProp = 'is_disabled'
            if (myProp in this.data) {
                this.disablefield = this.data.is_disabled
            } else {
                this.disablefield = false
            }
        },
        showComponents (fields, id, value) {
            this.$emit('showComponents', fields, id, value)
        }
    }
}
</script>
