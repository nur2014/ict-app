<template>
    <ValidationProvider :style="propData['style']"
                        v-if="propData.onIf"
                        :name="propData.id | snakeToWords"
                        :vid="propData.id"
                        :rules="!propData['readOnly'] ? (propData.rules === 'nullable' ? '' :
                        propData.rules || 'required') : ''">
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
                <b-form-checkbox
                    :style="propData['fieldStyle']"
                    :disabled-field="propData['readOnly'] === true ? 'notEnabled' : false"
                    class="mt-1"
                    :id="propData['id']"
                    @change="!propData['readOnly'] ? fieldManipulated($event) : null"
                    v-model="value"
                    :value="true"
                    :unchecked-value="false"
                >
                </b-form-checkbox>
            </slot>

            <div class="invalid-feedback">
                {{ errors[0] }}
            </div>
        </b-form-group>
    </ValidationProvider>
</template>

<script>
import { wordsToSnake } from '@/Utils/fliter'

export default {
    name: 'Checkbox',
    props: ['propData'],
    data () {
        return {
            typing: false,
            value: false
        }
    },
    created () {
        this.value = !this.propData.value ? (!this.typing ? this.propData.value : this.value) : this.propData.value
    },
    mounted () {
        this.typing = false
    },
    computed: {
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
            this.value = typeof event !== 'undefined' ? event : this.value
            this.$emit('returned-value', this.value)
            this.$emit('field-manipulated', this.propData.id)
        }
    }
}
</script>
