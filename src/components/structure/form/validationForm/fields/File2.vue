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
        >
            <template v-slot:label>
                {{ propData.label }}
                <div v-if="isRequired(propData.rules)" style="display: inline">
                    <span class="text-danger">*</span>
                </div>
            </template>
            <b-form-group>
                <div class="add-img-user profile-img-edit">
                    <b-img class="profile-pic height-150 width-150" fluid :src="value" alt="profile-pic" />
                    <input type="hidden" v-model="value">
                    <div class="p-image">
                        <b-button variant="none" class="upload-button iq-bg-primary position-relative">
                            <input type="file" @change="previewImage" class="h-100 position-absolute" accept="image/*" style="opacity: 0;" />
                            File Upload
                        </b-button>
                    </div>
                </div>
                <div class="img-extension mt-3">
                    <div class="d-inline-block align-items-center">
                        <span>Only</span>
                        <b-link href="javascript:void();">.jpg</b-link>
                        <b-link href="javascript:void();">.png</b-link>
                        <b-link href="javascript:void();">.jpeg</b-link>
                        <span>allowed</span>
                    </div>
                </div>
            </b-form-group>
            <div class="mt-3">Selected file: {{ value ? value.name : '' }}</div>
        </b-form-group>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
    name: 'Image',
    props: ['propData'],
    components: { ValidationProvider },
    data () {
        return {
            typing: false,
            value: require('../../../../../assets/images/user/user-11.png')
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
           /* this.typing = true
            this.value = typeof event !== 'undefined' ? (typeof event === 'string' ? event : event.target.value) : this.value
            this.$emit('returned-value', this.value)
            this.$emit('field-manipulated', this.propData.id) */
        },
        previewImage: function (event) {
            const input = event.target

            if (input.files && input.files[0]) {
                const reader = new FileReader()

                reader.onload = (e) => {
                    this.value = e.target.result
                }

                reader.readAsDataURL(input.files[0])
            }
        }
    }
}
</script>

<style scoped>

</style>
