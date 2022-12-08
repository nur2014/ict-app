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

            <vue-editor
                :id="propData['id']"
                :readonly="propData['readOnly'] === true"
                useCustomImageHandler
                :value="!propData['readOnly'] ? (!typing ? propData['value'] : value) : propData['value']"
                :state="errors[0] ? false : (valid ? true : null)"
                @text-change="!propData['readOnly'] ? fieldManipulated($event)  : null"
            />

            <div class="invalid-feedback">
                {{ errors[0] }}
            </div>
        </b-form-group>
    </ValidationProvider>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { ValidationProvider } from 'vee-validate'

export default {
    name: 'Editor',
    props: ['propData'],
    components: {
        ValidationProvider,
        VueEditor
    },
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
            this.$emit('returned-value', this.value)
            this.$emit('field-manipulated', this.propData.id)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
