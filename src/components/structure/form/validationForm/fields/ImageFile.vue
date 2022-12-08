<template>
    <ValidationProvider
            :style="propData['style']"
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
                <b-form-group>
                    <div class="add-img-user profile-img-edit">
                        <b-img class="height-150 width-150" fluid :src="getImage" alt="profile-pic" />
                        <input type="hidden"
                               v-model="file"
                               :id="propData['id']"
                        >
                        <div class="p-image">
                            <b-button variant="none" class=" iq-bg-primary position-relative">
                                <b-form-file
                                    style="opacity: 0;"
                                    accept="image/*"
                                    v-model="file"
                                    @change="fieldManipulated"
                                    class="h-100 position-absolute"
                                    :state="errors[0] ? false : (valid ? true : null)"
                                ></b-form-file>
                                {{ propData['uploadLabel'] || 'Upload File' }}
                            </b-button>
                        </div>
                    </div>
                    <div class="img-extension mt-3" v-if="propData.caption">
                        <div class="d-inline-block align-items-center">
                            <div v-html="propData.caption"></div>
                        </div>
                    </div>
                    <div v-if="errors" style="color:#dc3545;">
                        {{ errors.join(', ') }}
                    </div>
                </b-form-group>
                <div class="mt-3" style="color: #454545">Selected file: {{ file ? file.name : '' }}</div>
            </b-form-group>
        </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
    name: 'ImageFile',
    props: ['propData'],
    components: { ValidationProvider },
    data () {
        return {
            typing: false,
            file: [],
            value: '',
            defaultImage: require('../../../../../assets/images/no-image.png')
        }
    },
    computed: {
        getImage () {
            return typeof (this.value || this.propData.value) !== 'string' ? this.defaultImage : (this.value || this.propData.value || this.defaultImage)
        }
    },
    created () {
        if (this.value === '' && typeof this.propData.link !== 'undefined') {
            this.value = this.propData.link
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
            const input = event.target

            if (input.files && input.files[0]) {
                this.file = typeof event !== 'undefined' ? input.files[0] : this.file

                this.$emit('returned-value', this.file)
                this.$emit('field-manipulated', this.propData.id)

                const reader = new FileReader()

                reader.onload = (e) => {
                    this.value = e.target.result
                }

                reader.readAsDataURL(this.file)
            }
        }
    }
}
</script>

<style scoped>
    .custom-card {
        background: #fff;
        border-radius: 15px;
        margin-bottom: 30px;
        border: none;
        box-shadow: 0 0 12px 0 rgba(120, 146, 141, 6);
    }
</style>
