<template>
    <ValidationProvider :style="propData['style']"
                        v-if="propData.onIf"
                        :name="propData.id | snakeToWords"
                        :vid="propData.id"
                        :rules="!propData['readOnly'] ? (propData.rules === 'nullable' ? '' :
                        propData.rules || 'required') : ''"
    >
        <b-form-group
        class="row ml-3"
        :label-cols-sm="propData['labelCol'] || 3"
        :label-for="propData['id']"
        slot-scope="{ valid, errors }"
    >
        <template v-slot:label>
            {{ propData.label }}
            <div v-if="isRequired(propData.rules)" style="display: inline">
                <span class="text-danger">*</span>
            </div>
        </template>

        <slot :name="(wordsToSnake(propData['id']))" v-bind:data="propData">
            <b-form-input
                :style="propData['fieldStyle']"
                :readonly="propData['readOnly'] === true"
                :id="propData['id']"
                :value="!propData[''] ? (!typing ? propData['value'] : value) : propData['value']"
                :type="propData['inputType'] || 'text'"
                :state="propData['errors'] && propData['errors'].length > 0 || errors[0] ? false : (valid ? true : null)"
                @keyup="!propData['readOnly'] ? fieldManipulated($event)  : null"
                @change="!propData['readOnly'] ? fieldManipulated($event) : null"
                :placeholder="propData['placeholder']"
                :max="propData['max']"
                :min="propData['min']"
                :autocomplete="propData['inputType'] === 'password' ? 'autocomplete' : ''"
            ></b-form-input>
        </slot>

        <div class="invalid-feedback">
            {{ propData['errors'] && propData['errors'].length > 0 ? propData['errors'][0] : errors[0] }}
        </div>
    </b-form-group>
    </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
import { wordsToSnake } from '@/Utils/fliter'

export default {
    name: 'FormInput',
    props: ['propData'],
    components: { ValidationProvider },
    data () {
        return {
            typing: false,
            value: ''
        }
    },
    mounted () {
        this.typing = false
    },
    methods: {
        wordsToSnake (val) {
          return wordsToSnake(val)
        },
        isRequired (rules) {
            if (typeof rules !== 'undefined') {
                const ruleList = rules.split('|')
                return ruleList.includes('required')
            } else {
                return true
            }
        },
        fieldManipulated (event) {
            this.typing = true
            this.value = typeof event !== 'undefined' ? (typeof event === 'string' ? event : event.target.value) : this.value
            if (typeof this.propData.max !== 'undefined') {
                if (this.propData.value > this.propData.max) this.value = this.propData.max
            }
            if (typeof this.propData.min !== 'undefined') {
                if (this.propData.value < this.propData.min) this.value = this.propData.min
            }
            this.$emit('returned-value', this.value)
            this.$emit('field-manipulated', this.propData.id)
        }
    }
}
</script>
