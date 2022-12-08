<template>
<div>
    <slot :name="propData.id | wordsToSnake" v-bind:data="propData">
        <b-form-checkbox
            class="mt-1"
            :id="propData.id"
            :disabled="typeof propData.readOnly !== 'undefined' ? propData.readOnly : false"
            v-model="value"
            value="1"
            unchecked-value="0"
            @change="fieldManipulated"
        >
        </b-form-checkbox>
    </slot>
</div>
</template>

<script>
export default {
    name: 'Checkbox',
    props: ['propData'],
    data () {
        return {
            value: null
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
