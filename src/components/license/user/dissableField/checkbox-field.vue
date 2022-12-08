<template>
    <b-col md="12" sm="12" lg="12">
        <b-form-group
            label-cols-sm="4"
            :label-for="data.field_name"
        >
            <template v-slot:label>
                {{ local === 'bn' ? data.label_bn : data.label }}
            </template>
            <p class="text-bold" style="font-weight: 600;" v-if="data.value"> : {{ data.value.toString() }}</p>
            <p class="text-bold" style="font-weight: 600;" v-else> : ..................</p>
        </b-form-group>
    </b-col>
</template>
<script>
export default {
    props: ['data'],
    components: {
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
          if (this.$i18n.locale === 'bn') {
            const optionsData = { value: item.value, text: item.text_bn }
            return Object.assign({}, item, optionsData)
          } else {
            const optionsData = { value: item.value, text: item.text }
            return Object.assign({}, item, optionsData)
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
                if (this.$i18n.locale === 'bn') {
                    const optionsData = { value: item.value, text: item.text_bn }
                    return Object.assign({}, item, optionsData)
                } else {
                    const optionsData = { value: item.value, text: item.text }
                    return Object.assign({}, item, optionsData)
                }
            })
        }
    }
}
</script>
