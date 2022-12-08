<template>
        <b-col class="paragraph-field" md="12" sm="12" lg="12">
            <p v-html="paraText" :class="data.align_type"></p>
        </b-col>
</template>
<script>
export default {
    props: ['data'],
    data () {
        return {
            paraText: ''
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
                this.getLanguateWiseData()
            }
        }
    },
    created () {
        this.getLanguateWiseData()
    },
    methods: {
        getLanguateWiseData () {
            if (this.local === 'bn') {
                this.paraText = this.data.value_bn
            } else {
                this.paraText = this.data.value
            }
        }
    }
}
</script>
<style>
    .paragraph-field p {
        margin-bottom: 0px !important;
    }
</style>
