<template>
    <b-col md="12" sm="12" lg="12" class="text-center">
        <div v-if="data.field_type === 'image'">
            <span v-if="data.upload_type === 'static'">
                <img :src="data.value" style="max-width: 100%;">
            </span>
            <div class="custom-wrap" v-if="data.upload_type === 'dynamic'">
                <b-row>
                    <b-col md="4">
                        <p>{{ $i18n.local === 'bn' ? data.label_bn : data.label }} </p>
                    </b-col>
                    <b-col md="8">
                        <div v-if="getFile(data.value)" class="custom-data" style="border:1px solid gray">
                            <img :src="lrcpanBaseUrl + 'uploads/lrcpn/' + uploadedfile" style="max-width: 200px;max-height: 200px;min-width: 200px;min-height: 200px;" alt="Not Found">
                        </div>
                    </b-col>
                </b-row>
            </div>
        </div>
        <div md="12" sm="12" lg="12" v-if="data.field_type === 'file' && data.is_commentable">
            <b-row>
                <b-col md="6" sm="6" lg="6" class="text-left">
                    <div class="custom-label">{{ $i18n.locale === 'bn' ? data.label_bn : data.label }} </div>
                    <div class="custom-data">
                        <button type="button" v-if="getFile(data.value)" class="btn btn-sm btn-success">
                            <a target="_blank" :href="lrcpanBaseUrl + 'uploads/lrcpn/' + uploadedfile"><i style="margin: 15px 1px 15px !important; font-size: 12px" class="ri-download-line"></i></a>
                        </button>
                        <p v-else>..................</p>
                    </div>
                </b-col>
                <b-col md="3" sm="3" lg="3" v-if="data.field_type === 'file' && parseInt(data.is_commentable.allow_comment) === 1">
                    <b-form-radio-group
                    v-model="data.is_commentable.yesNo"
                    :options="valueOptions"
                    value-field="value"
                    text-field="text"
                    ></b-form-radio-group>
                </b-col>
                <b-col md="3" sm="3" lg="3" class="text-center" v-if="data.field_type === 'file' && parseInt(data.is_commentable.allow_comment) === 1">
                    <b-form-group>
                        <b-form-textarea
                        :id="data.is_commentable.comments"
                        v-model="data.is_commentable.comments"
                        :placeholder="local === 'bn' ? 'মন্তব্যে' : 'Comments'"
                        ></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>
        </div>
        <div class="custom-wrap" v-if="data.field_type === 'file' && !data.is_commentable">
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
                if (fileData[1] === '1' || fileData[1] === '2') {
                    const files = JSON.parse(fileData[0])
                    if (typeof files[0] !== 'undefined') {
                        this.uploadedfile = files[0]
                        return true
                    }
                } else if (fileData[0]) {
                    if (fileData[0].length > 0) {
                        this.uploadedfile = fileData[0]
                        return true
                    } else {
                        return false
                    }
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
