<template>
    <b-overlay :show="load">
        <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">
            <b-form @submit.prevent="handleSubmit(returnData)" @reset.prevent="reset">
                <div v-if="data.chunk">
                    <b-row v-for="(row, index) in data.data" :key="index">
                        <div v-if="row['head']" :class="row['head']['title'] ? 'hr-line' : ''"></div>
                        <b-col v-if="checkHead(row)" :lg="row['head']['lg'] || 6"
                               :sm="row['head']['sm'] || 12" class="mb-4 mt-4">
                            <h5 style="font-weight:bold">{{ row['head']['title'] ? (row['head']['title'].search('.') !== -1 ? $t(row['head']['title']) : row['head']['title']) : '' }}</h5>
                        </b-col>

                        <b-row v-if="row['items'].length > 0">
                            <b-col :lg="col['lg'] || 6" :sm="col['sm'] || 12" v-for="(col, i) in row['items']" :key="i">
                                <component :is="col['type'] === 'Checkbox' ? 'CheckboxField' : col['type']"
                                           :prop-data="Object.assign(col, {
                                               value: getValue(data, row, col),
                                               id: typeof col['title'] !== 'undefined' ? col['title'] : col['name'],
                                               label: col['label'] ? (col['label'].search('.') !== -1 ? $t(col['label']) : col['label']) : '',
                                               onIf: typeof col['onIf'] !== 'undefined' ? col['onIf'] : true
                                            })"
                                           @returned-value="setData(col, $event)"
                                           @picker-instance="$emit('picker-instance', $event)"
                                           @field-manipulated="$emit('field-manipulated', $event)"
                                />
                            </b-col>
                        </b-row>
                    </b-row>
                </div>
                <b-row v-else>
                    <b-col :lg="col['lg'] || 6" :sm="col['sm'] || 12" v-for="(col, index) in data.data" :key="index">
                        <component :key="typeof col['key'] !== 'undefined' ? col['key'] : 1" :is="col['type'] === 'Checkbox' ? 'CheckboxField' : col['type']"
                                   :prop-data="Object.assign(col, {
                                               value: getValue(data, '', col),
                                               id: typeof col['title'] !== 'undefined' ? col['title'] : col['name'],
                                               label: col['label'] ? (col['label'].search('.') !== -1 ? $t(col['label']) : col['label']) : '',
                                               onIf: typeof col['onIf'] !== 'undefined' ? col['onIf'] : true
                                            })"
                               @returned-value="setData(col, $event)"
                               @picker-instance="$emit('picker-instance', $event)"
                               @field-manipulated="$emit('field-manipulated', $event)"
                        />
                    </b-col>
                </b-row>
                <b-row class="ml-2 mt-4 d-flex" :class="data['buttonContainerClass'] || 'justify-content-center'">
                    <b-col :lg="data['buttonCol'] || 4" :class="data['buttonColCustomClass']">
                        <slot name="submitButton" v-bind:data="data">
                            <b-button type="submit" variant="primary" :class="data['buttonClass']">
                                {{ data['buttonLocale'] ? $t(data['buttonLocale']) : data['buttonText'] }}
                            </b-button>
                        </slot>
                        <slot name="cancelButton" v-if="data['hasCancelButton']">
                            &nbsp;
                            <b-button variant="danger" :class="data['buttonCancelClass']" @click="$bvModal.hide(modalId || 'modal-4')">
                                {{ $t('globalTrans.cancel') }}
                            </b-button>
                        </slot>
                    </b-col>
                </b-row>
            </b-form>
        </ValidationObserver>
        <pre>{{ errors }}</pre>
    </b-overlay>
</template>

<script>
/*
*   prop: data {name, type, selectTitle, options, label (op), labelCol (op), lg (op), sm (op), field_id (op), onIf, readOnly}
*   type: Input/Select/Checkbox/Datepicker
*/
import Input from './fields/Input'
import Select from './fields/Select'
import CheckboxField from './fields/CheckboxField'
import Datepicker from './fields/Datepicker'
import Textarea from './fields/Textarea'
import Editor from './fields/Editor'
import ImageFile from './fields/ImageFile'
import { ValidationObserver } from 'vee-validate'
import { core } from '@/config/pluginInit'

export default {
    props: ['data', 'chunk', 'load', 'reference', 'errors'],
    name: 'FormInput',
    components: {
        Input, Select, CheckboxField, Textarea, Datepicker, Editor, ValidationObserver, ImageFile
    },
    data () {
        return {
            responses: {}
        }
    },
    mounted () {
        core.index()
    },
    methods: {
        checkHead (row) {
            try {
                return row.head.title
            } catch (e) {
                return false
            }
        },
        setData (row, payload) {
            this.responses[row.name] = payload
            this.$emit('change', this.responses)
        },
        returnData () {
            this.$emit('submit', this.responses)
        },
        getValue (data, row, col) {
            let value = col.dataParent ? col.dataParent[col.name] : ''
            value = row ? (row.dataParent ? row.dataParent[col.name] : '') : ''
            value = data.dataParent ? data.dataParent[col.name] : ''
            value = (value !== 'undefined' || typeof value !== 'undefined') ? value : ''
            return value
        },
        handleErorr (errors) {
            this.$refs.form.setErrors(errors)
        }
    }
}
</script>

<style scoped>
    .hr-line {
        border: 1px solid #66cc99;
    }
</style>
