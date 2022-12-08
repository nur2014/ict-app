<template>
<div>
    <slot :name="propData.id | wordsToSnake" v-bind:data="propData">
    <b-form-select
        plain
        :disabled="typeof propData.readOnly !== 'undefined' ? propData.readOnly : false"
        :id="propData.id"
        :options="propData.options"
        :value="propData.value"
        v-model="value"
        @change="fieldManipulated"
    >
        <template v-slot:first>
            <b-form-select-option value="">{{  propData.selectTitle || 'Select' }}</b-form-select-option>
        </template>
    </b-form-select>
    </slot>
</div>
</template>

<script>
export default {
    props: ['propData'],
    name: 'custom-select',
    data () {
        return {
            value: ''
        }
    },
    created () {
        if (typeof this.propData.value !== 'undefined') {
            this.value = this.propData.value
        }
    },
    methods: {
        fieldManipulated () {
            this.$emit('returned-value', this.value)
            this.$emit('field-manipulated', this.propData.id)
        }
    }
}
</script>

<style scoped>

</style>
