<template>
    <ValidationProvider v-if="propData.onIf"
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
                <div v-if="propData.rules !== 'nullable'" style="display: inline">
                    <span class="text-danger">*</span>
                </div>
            </template>
            <slot :name="propData['id'] | wordsToSnake" v-bind:data="propData">
                <b-form-textarea
                    :readonly="propData['readOnly'] === true"
                    :id="propData['id']"
                    :value="!propData['readOnly'] ? (!typing ? propData['value'] : value) : propData['value']"
                    :type="propData['inputType'] || 'text'"
                    :state="errors[0] ? false : (valid ? true : null)"
                    @keyup="!propData['readOnly'] ? fieldManipulated($event)  : null"
                    @change="!propData['readOnly'] ? fieldManipulated($event) : null"
                ></b-form-textarea>
            </slot>

            <div class="invalid-feedback">
                {{ errors[0] }}
            </div>
        </b-form-group>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
    name: 'FormTextarea',
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
        fieldManipulated (event) {
            this.typing = true
            this.value = typeof event !== 'undefined' ? (typeof event === 'string' ? event : event.target.value) : this.value
            this.$emit('returned-value', this.value)
            this.$emit('field-manipulated', this.propData.id)
        }
    }
}
</script>

<style scoped>

</style>
