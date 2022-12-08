<template>
    <div class="table-responsive">
        <table class="table table-sm table-bordered" style="font-size: 0.68rem;">
            <tr>
                <th v-for="(item, index) in colData" :key="index">{{ $i18n.locale === 'en' ? item.text_en : item.text_bn }}</th>
            </tr>
            <tr v-for="(item, index) in tmpData" :key="index">
                <td>{{ $n(index+1) }}</td>
                <td v-for="(dataItem, key, dindex) in item" :key="dindex">
                    <span v-if="typeof dataItem === 'object'">
                        <a download :href="dataItem[0]" target="_blank">{{ $t('externalLrcpn.view_attachment') }}</a>
                    </span>
                    <span v-else>
                        {{ dataItem }}
                    </span>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props: ['tmpData', 'colData'],
    data () {
        return {
        }
    },
    methods: {
    }
}
</script>
