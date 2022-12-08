<template>
    <b-row>
        <b-col md="12" sm="12" lg="12">
        <table class="table">
            <tr v-for="(item, index) in conditions" :key="index">
                <td v-if="index < currentIndex">
                    <span class="mr-2">
                        <input type="checkbox" :disabled="item.checked" v-model="item.checked" @click="check(index, item.checked)"/>
                    </span>
                    <span>
                        {{ local === 'bn' ? item.text_bn : item.text }}
                    </span>
                </td>
            </tr>
        </table>
        </b-col>
        <b-col v-if="buttonShow">
            <b-button @click="submitCondition" variant="primary">{{ $t('portal.apply_now') }}</b-button>
        </b-col>
    </b-row>
</template>
<script>
export default {
    props: ['tmpData'],
    components: {
    },
    created () {
        if (this.tmpData) {
            this.conditions = this.tmpData
            this.conditionLength = this.tmpData.length
        }
    },
    data () {
        return {
            currentIndex: 1,
            conditions: '',
            conditionLength: 0,
            buttonShow: false
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    methods: {
        check (index, status) {
            if (!status) {
             this.currentIndex = this.currentIndex + 1
             const indx = index + 1
             if (indx === this.conditionLength) {
                 this.buttonShow = true
             }
            }
        },
        submitCondition: function () {
            this.$emit('conditionApply')
        }
    }
}
</script>
