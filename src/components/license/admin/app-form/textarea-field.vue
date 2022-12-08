<template>
        <b-col md="12" sm="12" lg="12">
            <ValidationProvider :name="data.label" :vid="data.field_name" :rules="data.isRequired === true ? `required` : ``">
                <b-form-group
                    label-cols-sm="4"
                    :label-for="data.field_name"
                >
                    <template v-slot:label>
                        {{ local === 'bn' ? data.label_bn : data.label }} <span class="text-danger" v-if="data.isRequired === true">*</span><span v-if="data.help_text !== ''" class="ml-2" style="border:1px solid #66cc99;border-radius:50%;cursor:pointer" data-toggle="tooltip" data-placement="top" :title="data.help_text">?</span>
                    </template>
                    <b-form-textarea
                        :id="data.field_name"
                        v-model="data.value"
                        :placeholder="data.placeholder"
                    ></b-form-textarea>
                </b-form-group>
            </ValidationProvider>
        </b-col>
</template>
<script>
import { ValidationProvider } from 'vee-validate'
export default {
    props: ['data'],
    components: {
        ValidationProvider
    },
    data () {
        return {
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    }
}
</script>
