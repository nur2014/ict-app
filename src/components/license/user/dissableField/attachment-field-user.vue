<template>
    <b-col md="12" sm="12" lg="12" class="text-center">
        <div v-if="data.field_type === 'image'">
            <span v-if="data.upload_type === 'static'">
                <img :src="data.value" style="max-width: 100%;">
            </span>
            <div class="custom-wrap" v-if="data.upload_type === 'dynamic'">
                <div v-if="getFile(data.value)" class="custom-data" style="border:1px solid gray">
                    <img :src="lrcpanBaseUrl + 'uploads/lrcpn/' + uploadedfile" style="max-width: 200px;max-height: 200px;min-width: 200px;min-height: 200px;" alt="Not Found">
                </div>
            </div>
        </div>
        <div class="custom-wrap" v-if="data.field_type === 'file'">
            <div class="custom-label">{{ $i18n.locale === 'bn' ? data.label_bn : data.label }} : </div>
            <div class="custom-data">
                <button type="button" v-if="getFile(data.value)" class="btn btn-sm btn-success">
                    <a target="_blank" :href="lrcpanBaseUrl + 'uploads/lrcpn/' + uploadedfile"><i style="margin: 15px 1px 15px !important; font-size: 12px" class="ri-download-line"></i></a>
                </button>
                <p class="text-bold" style="font-weight: 600;" v-else>  : ..................</p>
            </div>
        </div>
    </b-col>
</template>
<script>
import { licenseRegistrationServiceBaseUrl } from '@/config/api_config'
export default {
    props: ['data'],
    data () {
        return {
            uploadedfile: '',
            valueOptions: [
                { value: '1', text: 'Valid' },
                { value: '2', text: 'Invalid' }
            ],
            lrcpanBaseUrl: licenseRegistrationServiceBaseUrl
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    methods: {
        getFile (value) {
            if (value !== '') {
                const fileData = JSON.parse(value)
                if (fileData[0]) {
                    this.uploadedfile = fileData[0]
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        }
    }
}
</script>
<style scoped>
    .custom-style {
        border:1px solid #ddd !important;
    }
    .custom-wrap {
        display: flex;
    }
    .custom-wrap > div {
        font-size: 14px;
    }
    .custom-wrap > div.custom-label {
        margin-right:10px;
    }
</style>
