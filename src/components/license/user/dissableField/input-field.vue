<template>
    <b-col md="12" sm="12" lg="12">
        <b-form-group
            label-cols-sm="4"
            :label-for="data.field_name"
        >
            <template v-slot:label>
                {{ local === 'bn' ? data.label_bn : data.label }}
            </template>
            <p v-if="data.value" class="text-bold" style="font-weight: 600;"> : {{ data.value }}</p>
            <p v-else class="text-bold" style="font-weight: 600;"> : ..................</p>
        </b-form-group>
    </b-col>
</template>
<script>
export default {
    props: ['tmpData', 'index'],
    components: {
    },
    data () {
        return {
            data: {
            },
            result: 0
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    created () {
        this.data = this.tmpData[this.index]
        if (this.local === 'bn') {
            if (this.data.field_name.match('mobile') && !String(this.data.value).match('০১')) {
                this.data.value = '০' + this.data.value
            } else if (this.data.field_name.match('phone') && !String(this.data.value).match('০১')) {
                this.data.value = '০' + this.data.value
            }
        } else {
            if (this.data.field_name.match('mobile') && !String(this.data.value).match('01')) {
                this.data.value = '0' + this.data.value
            } else if (this.data.field_name.match('phone') && !String(this.data.value).match('01')) {
                this.data.value = '0' + this.data.value
            }
        }
    }
}
</script>
