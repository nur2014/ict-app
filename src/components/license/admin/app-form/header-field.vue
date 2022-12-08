<template>
    <b-col md="12" sm="12" lg="12" class="text-center">
        <h1 v-if="data.field_type === 'h1'" :class="data.isBorder ? 'customBorder' : '' " :style="{ color: data.color}"> {{ headerText }}</h1>
        <h2 v-if="data.field_type === 'h2'" :class="data.isBorder ? 'customBorder' : '' " :style="{ color: data.color}"> {{ headerText}}</h2>
        <h3 v-if="data.field_type === 'h3'" :class="data.isBorder ? 'customBorder' : '' " :style="{ color: data.color}"> {{ headerText}}</h3>
        <h4 v-if="data.field_type === 'h4'" :class="data.isBorder ? 'customBorder' : '' " :style="{ color: data.color}"> {{ headerText }}</h4>
        <h5 v-if="data.field_type === 'h5'" :class="data.isBorder ? 'customBorder' : '' " :style="{ color: data.color}"> {{ headerText }}</h5>
        <h6 v-if="data.field_type === 'h6'" :class="data.isBorder ? 'customBorder' : '' " :style="{ color: data.color}"> {{ headerText }}</h6>
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
                this.headerText = this.data.header_value_bn
            } else {
                this.headerText = this.data.header_value
            }
        }
    }
}
</script>
<style scoped>
    .customBorder {border-bottom:1px solid}
</style>
