<template>
    <ValidationProvider :name="data.label" :vid="data.field_name" :rules="checkValidate ? `required` : ``">
        <b-form-group
            label-cols-sm="12"
            :label-for="data.field_name"
            slot-scope="{ valid, errors }"
        >
            <template v-slot:label>
                {{ local === 'bn' ? data.label_bn : data.label }} <span class="text-danger" v-if="data.isRequired === '1'">*</span>
            </template>
            <b-form-input
                :id="data.field_name"
                v-model="data.value"
                :placeholder="data.placeholder"
                :type="data.field_type"
                :state="errors[0] ? false : (valid ? true : null)"
            ></b-form-input>
            <div class="invalid-feedback">
                {{ errors[0] }}
            </div>
        </b-form-group>
    </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
    props: ['tmpData', 'index', 'fieldData'],
    components: {
        ValidationProvider
    },
    data () {
        return {
            data: {
            },
            result: 0,
            checkValidate: ''
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    created () {
        this.data = this.tmpData[this.index]
        const Field = this.fieldData.find(item => item.field_id === this.data.field_id)
        if (typeof Field !== 'undefined') {
            this.checkValidate = Field.is_required
        } else {
            this.checkValidate = false
        }
    },
    watch: {
        tmpData: {
            deep: true,
            handler (val) {
                this.data = val[this.index]
                if (this.data.is_math) {
                    this.data.m_fields.map((item, index) => {
                        let inputOne = 0
                        if (index === 0) {
                            inputOne = this.findFieldData(item.input_one)
                        } else {
                            inputOne = item.input_one
                        }
                        const inputTwo = this.findFieldData(item.input_two)
                        const value = this.math(parseFloat(inputOne), parseFloat(inputTwo), item.operator)
                        if (this.data.m_fields.length - 1 > index) {
                            const tmpIndex = index + 1
                            this.data.m_fields[tmpIndex].input_one = value
                        }
                        this.result = value
                    })
                }
            }
        },
        result: function (val) {
            this.data.value = val
        }
    },
    methods: {
        findFieldData (fName) {
            const tmp = this.tmpData.find(item => item.field_name === fName)
            if (typeof tmp === 'undefined') {
                return 0
            } else {
                return tmp.value ? tmp.value : 0
            }
        },
        math (a, b, op) {
            const operators = {
                '+': function (a, b) {
                    return a + b
                },
                '-': function (a, b) {
                    return a - b
                },
                x: function (a, b) {
                    return a * b
                },
                '/': function (a, b) {
                    return a / b
                }
            }
            return operators[op](a, b)
        }
    }
}
</script>
