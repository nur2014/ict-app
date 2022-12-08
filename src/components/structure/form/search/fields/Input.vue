<template>
<div>
    <slot :name="propData.id | wordsToSnake" v-bind:data="propData">
        <b-form-input
        :id="propData.id"
        :disabled="typeof propData.readOnly !== 'undefined' ? propData.readOnly : false"
        :value="propData.value"
        v-model="value"
        @change="fieldManipulated"
        ></b-form-input>
    </slot>
</div>
</template>

<script>
export default {
    props: ['propData'],
    name: 'custom-input',
    data () {
        return {
            value: ''
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
