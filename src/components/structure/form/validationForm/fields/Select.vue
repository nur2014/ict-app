<template>
    <ValidationProvider :style="propData['style']"
                        v-if="propData.onIf"
                        :name="propData.id | snakeToWords"
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

<!--        <slot v-if="!propData['readOnly']" :name="propData['id'] | wordsToSnake" v-bind:data="propData">-->
        <slot :name="propData['id'] | wordsToSnake" v-bind:data="propData">
            <b-form-select
                :style="propData['fieldStyle']"
                :disabled="propData['readOnly'] === true"
                plain
                :id="propData['id']"
                v-model="value"
                :options="propData['options']"
                @change="fieldManipulated"
                :state="errors[0] ? false : (valid ? true : null)"
                :placeholder="propData['placeholder']"
                :readonly="propData['readOnly']"
            >
                <template v-slot:first>
                    <b-form-select-option value="">{{  propData.selectTitle || $t('globalTrans.select') }}</b-form-select-option>
                </template>
            </b-form-select>
        </slot>
<!--        <b-form-input v-else-->
<!--          :readonly="propData['readOnly'] === true"-->
<!--          :id="propData['id']"-->
<!--          :value="getValue"-->
<!--          :state="errors[0] ? false : (valid ? true : null)"-->
<!--          :placeholder="propData['placeholder']"-->
<!--        >-->
<!--        </b-form-input>-->

        <div class="invalid-feedback">
            {{ errors[0] }}
        </div>
    </b-form-group>
    </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
    props: ['propData'],
    name: 'FormSelect',
    components: { ValidationProvider },
    data () {
        return {
            value: '',
            enTitleList: ['text_en', 'text', 'name'],
            bnTitleList: ['text_bn', 'name_bn'],
            enTitle: null,
            bnTitle: null
        }
    },
    computed: {
        getValue () {
            if (Object.keys(this.propData.options).length > 0 && this.propData.value) {
                const dat = this.propData.options.find(el => el.value === this.propData.value)
                return this.$i18n.locale === 'bn'
                    ? (this.bnTitle ? this.bnTitle : this.searchEnBn(dat, 'bn')) : (this.enTitle ? this.enTitle : this.searchEnBn(dat))
            } else {
                return ''
            }
        }
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
        searchEnBn (data, lang = 'en') {
            let title = ''
            try {
                if (lang === 'en') {
                    this.enTitleList.forEach((element) => {
                        if (typeof data[element] !== 'undefined') {
                            title = data[element]
                        }
                    })
                } else if (lang === 'bn') {
                    this.bnTitleList.forEach((element) => {
                        if (typeof data[element] !== 'undefined') {
                            title = data[element]
                        }
                    })
                }
            } catch (e) {}

            return title
        },
        fieldManipulated () {
            this.$emit('returned-value', this.value)
            this.$emit('field-manipulated', this.propData.id)
        }
    },
    mounted () {
      if (this.propData.readOnly || (typeof this.propData.value !== 'undefined' && this.propData.value)) {
        if (typeof this.propData.parent !== 'undefined') {
          this.value = this.propData.parent[this.propData.id]
        } else {
          this.value = this.propData.value
        }
      }
    },
    updated () {
        if (this.propData.readOnly || (typeof this.propData.value !== 'undefined' && this.propData.value)) {
            if (typeof this.propData.parent !== 'undefined') {
                this.value = this.propData.parent[this.propData.id]
            } else {
                this.value = this.propData.value
            }
        }
    }
}
</script>
