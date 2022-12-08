<template>
    <ValidationProvider :name="propData.id | snakeToWords" :vid="propData.id" :rules="propData.rules === 'nullable' ? '' : propData.rules || 'required'">
        <b-form-group
            class="row ml-3"
            :label-cols-sm="propData['labelCol'] || 3"
            :label-for="propData['id']"
            slot-scope="{ valid, errors }"
        >
            <template v-slot:label>
                {{ propData.label }}
                <div v-if="propData.rules !== 'nullable'" style="display: inline">
                    <span class="text-danger">*</span>
                </div>
            </template>
            <slot :name="propData['id'] | wordsToSnake" v-bind:data="propData">
                <b-form-input
                    class="flat-date-picker"
                    :id="propData['id']"
                    :value="!typing ? propData['value'] : value"
                    :placeholder="propData.placeholder || $t('globalTrans.select_date')"
                    @change="fieldManipulated"
                    :state="errors[0] ? false : (valid ? true : null)"
                ></b-form-input>
            </slot>
            <div class="invalid-feedback">
                {{ errors[0] }}
            </div>
        </b-form-group>
    </ValidationProvider>
</template>

<script>
import flatpickr from 'flatpickr'
import { ValidationProvider } from 'vee-validate'

export default {
    props: ['propData', 'dateConfig'],
    name: 'Datepicker',
    components: { ValidationProvider },
    data () {
      return {
          value: '',
          instance: null,
          typing: false
      }
    },
    mounted () {
        this.setDatePicker()
        this.typing = false
    },
    methods: {
        fieldManipulated (event) {
            this.typing = true
            this.value = typeof event !== 'undefined' ? (typeof event === 'string' ? event : event.target.value) : this.value
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
