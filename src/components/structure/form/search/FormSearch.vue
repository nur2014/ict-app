<template>
    <div>
        <b-row>
            <b-col :lg="col['lg'] || 6" :sm="col['sm'] || 12" :xs="col['sm'] || 12" :md="col['sm'] || 6" v-for="(col, index) in data.data" :key="index">
                <b-form-group
                    v-if="typeof col.show !== 'undefined' ? col.show : true"
                    class="row"
                    :label-cols-sm="col['labelCol'] || 3"
                    :label-cols-md="col['labelColMd'] || 4"
                    :label-cols-lg="col['labelColLg'] || 3"
                    :label="getLabel(col)"
                    :label-for="col['field_id'] || col['name']"
                >
                    <component :is="col['type']" :prop-data="Object.assign(col, {
                        id: col['field_id'] || col['name'],
                        options: col['options'],
                        selectTitle: col['selectTitle'],
                        label: getLabel(col),
                        config: col['config'],
                        onChange: col['onChange'],
                    })"
                        @returned-value="setData(col, $event)"
                        @picker-instance="$emit('picker-instance', $event)"
                        @field-manipulated="$emit('field-manipulated', $event)"
                    />
                </b-form-group>
            </b-col>
            <b-col v-if="data['inlineButton']">
                <b-button type="button" variant="primary" @click="returnData">
                    {{ data['buttonLocale'] ? $t(data['buttonLocale']) : data['buttonText'] }}
                </b-button>
            </b-col>
        </b-row>
        <b-button v-if="typeof data['inlineButton'] === 'undefined' || !data['inlineButton']" type="button" variant="primary" @click="returnData">
            {{ data['buttonLocale'] ? $t(data['buttonLocale']) : data['buttonText'] }}
        </b-button>
     </div>
</template>

<script>
/*
*   prop: data {name, type, selectTitle, options, label (op), labelLocation (op), labelCol (op), lg (op), sm (op), field_id (op)}
*   type: Input/Select/Checkbox/Datepicker
*/
import Input from '@/components/structure/form/search/fields/Input'
import Select from '@/components/structure/form/search/fields/Select'
import Checkbox from '@/components/structure/form/search/fields/Checkbox'
import Datepicker from '@/components/structure/form/search/fields/Datepicker'

export default {
    props: ['data'],
    name: 'FormSearch',
    components: {
        Input, Select, Checkbox, Datepicker
    },
    data () {
        return {
            responses: {}
        }
    },
    methods: {
        setData (col, payload) {
            this.responses[col.name] = payload
            this.$emit('change', this.responses)
        },
        getLabel (col) {
            if (typeof col.label !== 'undefined') {
                return col.label.search('.') !== -1 ? this.$t(col.label) : col.label
            }
        },
        returnData () {
            this.$emit('returned-data', this.responses)
        }
    }
}
</script>
