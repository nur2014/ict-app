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
                :id="data.field_name"
                v-model="data.value"
                value= true
                unchecked-value= false
                :disabled= true
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
    created () {
        if (this.data.value === 'true') {
            this.showComponents(this.data.fields, this.data.id, true)
        }
    },
    methods: {
        showComponents (fields, id, value) {
            this.$emit('showComponents', fields, id, value)
        }
    }
}
</script>
