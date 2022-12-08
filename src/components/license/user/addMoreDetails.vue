<template>
    <b-col md="12" sm="12" lg="12">
      <div style="max-height: 170px;overflow-y: scroll">
        <table class="table table-sm table-bordered">
            <tr>
                <th v-for="(item, index) in colData" :key="index">{{ $i18n.locale === 'en' ? item.text_en : item.text_bn }}</th>
            </tr>
            <tr v-for="(item, index) in tmpData" :key="index">
                <td>{{ $n(index+1) }}</td>
                <td v-for="(value, name, index) in item" :key="index">
                <span v-if="typeof value === 'object'">
                    <a download :href="value[0]" target="_blank">{{ $t('externalLrcpn.view_attachment') }}</a>
                </span>
                <span v-else>
                    {{ value }}
                </span>
                </td>
                <td><b-button title="Remove" variant=" iq-bg-danger" size="sm" @click="remove(index)"><i class="ri-delete-bin-line m-0"></i></b-button></td>
            </tr>
        </table>
      </div>
    </b-col>
</template>
<script>
export default {
    props: ['tmpData', 'colData'],
    data () {
        return {
        }
    },
    methods: {
        remove (item) {
            this.tmpData.splice(item, 1)
        },
        getFileType (string) {
            if (typeof string === 'object') {
                return 'File'
            } else {
                return string
            }
        }
    }
}
</script>
