<template>
    <b-col lg="4" sm="4" md="4">
        <ValidationProvider name="Applicatin Id" vid="application_id" :rules="checkValidate ? `required` : ``">
            <b-form-group
            class="row"
            label-cols-sm="12"
            :label="$t('externalUserIrrigation.application_id')"
            label-for="application_id"
            slot-scope="{ valid, errors }"
            >
            <b-form-input
                id="application_id"
                @input="setValue"
                v-model="application_id"
                :state="errors[0] ? false : (valid ? true : null)"
                ></b-form-input>
                <div class="invalid-feedback">
                {{ errors[0] }}
                </div>
            </b-form-group>
        </ValidationProvider>
    </b-col>
</template>
<script>
export default {
    props: ['fieldData'],
    data () {
        return {
            application_id: '',
            checkValidate: false
        }
    },
    created () {
        const appIdField = this.fieldData.find(item => item.field_id === 'app')
        if (typeof appIdField !== 'undefined') {
            this.checkValidate = appIdField.is_required
        } else {
            this.checkValidate = false
        }
    },
    methods: {
        setValue () {
             this.$emit('loadValue', {
              type: 3,
              value: this.application_id
            })
        }
    }
}
</script>
