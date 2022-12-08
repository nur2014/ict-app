<template>
    <div>
        <slot :name="propData.id | wordsToSnake" v-bind:data="propData">
            <b-form-input
                class="flat-date-picker"
                :id="propData.id"
                :value="propData.value"
                :placeholder="propData.placeholder || $t('globalTrans.select_date')"
                v-model="value"
                @change="fieldManipulated"
            ></b-form-input>
        </slot>
    </div>
</template>

<script>
import flatpickr from 'flatpickr'

export default {
    props: ['propData', 'dateConfig'],
    name: 'Datepicker',
    data () {
      return {
          value: '',
          instance: null,
          selectedDate: ''
      }
    },
    mounted () {
        this.setDatePicker()
    },
    methods: {
        fieldManipulated () {
            this.$emit('returned-value', this.value)
            this.$emit('field-manipulated', this.propData.id)
        },
        setDatePicker () {
            const config = this.propData.config || {}
            this.instance = flatpickr('#' + this.propData.id, config)
            this.$emit('picker-instance', { [this.propData.id]: this.instance })
        }
    }
}
</script>
