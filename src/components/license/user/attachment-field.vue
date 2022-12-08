<template>
    <b-col md="12" sm="12" lg="12" class="text-center" v-if="data.field_type === 'image'">
        <span v-if="data.upload_type === 'static'">
            <img :src="data.value" style="max-width: 100%;">
        </span>
        <span v-else>
            <div style="width:200px,height:200px;border:1px solid gray">
                <croppa v-model="croppa"
                    :width="200"
                    :height="200"
                    :file-size-limit="2097152"
                    :placeholder="$i18n.locale === 'bn' ? data.label_bn : data.label"
                    :placeholder-font-size="14"
                    @move="imageChanged(item)"
                    @new-image-drawn="imageChanged(item)"
                    @file-size-exceed="fileSizeValidation(item)"
                    canvas-color="transparent"
                    accept=".jpeg,.jpg,.png">
                </croppa>
            </div>
            <button type="button" v-if="getFile(data)" class="btn btn-sm btn-success">
                <a target="_blank" :href="lrcpanBaseUrl + 'uploads/lrcpn/' + imgData"><span style="margin: 15px 1px 15px !important; font-size: 12px">{{ $t('externalLrcpn.view_attachment') }}</span></a>
            </button>
        </span>
    </b-col>
    <b-col md="12" sm="12" lg="12" v-else>
        <b-row>
            <b-col md="12" sm="12" lg="12">
                <ValidationProvider :name="data.label" :vid="data.field_name" :rules="data.isRequired === true ? `required` : ``">
                    <b-form-group
                        label-cols-sm="4"
                        :label-for="data.field_name"
                        slot-scope="{ valid, errors }"
                    >
                        <template v-slot:label>
                            {{ local === 'bn' ? data.label_bn : data.label }} <span class="text-danger" v-if="data.isRequired === true">*</span><span v-if="data.help_text !== ''" class="ml-2" style="border:1px solid #66cc99;border-radius:50%;cursor:pointer" data-toggle="tooltip" data-placement="top" :title="data.help_text">?</span>
                        </template>
                        <b-form-file
                            v-on:change="onFileChange"
                            v-model="imgData"
                            :state="errors[0] ? false : (valid ? true : null)"
                        ></b-form-file>
                        <button type="button" v-if="getFile(data)" class="btn btn-sm btn-success">
                            <a target="_blank" :href="lrcpanBaseUrl + 'uploads/lrcpn/' + imgData"><span style="margin: 15px 1px 15px !important; font-size: 12px">{{ $t('externalLrcpn.view_attachment') }}</span></a>
                        </button>
                        <div class="invalid-feedback">
                            {{ errors[0] }}
                        </div>
                    </b-form-group>
                </ValidationProvider>
            </b-col>
            <b-col md="6" sm="6" lg="6" class="text-left" v-if="data.is_commentable.allow_comment === '1'">
                {{ $t('globalTrans.attachment') }} {{':'}} <span class="text-success" v-if="data.is_commentable.yesNo === '1'">{{'Valid'}}</span><span class="text-danger" v-else>{{'Invalid' }}</span>
            </b-col>
            <b-col md="6" sm="6" lg="6" class="text-left" v-if="data.is_commentable.allow_comment === '1'">
                {{ $t('globalTrans.comments') }} {{':'}} {{ data.is_commentable.comments }}
            </b-col>
        </b-row>
    </b-col>
</template>
<script>
import { licenseRegistrationServiceBaseUrl } from '@/config/api_config'
import { ValidationProvider } from 'vee-validate'
import Croppa from 'vue-croppa'
export default {
    props: ['data'],
    components: {
        ValidationProvider,
        croppa: Croppa.component
    },
    created () {
        this.item = this.data
        if (typeof (this.data.value[0]) !== 'undefined' && this.data.field_type !== 'image') {
            const fileData = JSON.parse(this.data.value)
            const files = JSON.parse(fileData[0])
            this.imgData = files[0]
            this.data.is_commentable.yesNo = fileData[1]
            this.data.is_commentable.comments = fileData[2]
        } else if (this.data.field_type === 'image') {
            this.data.value = ''
        } else {
            this.data.value = []
        }
        if (!this.data.is_commentable) {
            this.data.is_commentable = {
                allow_comment: '0',
                yesNo: '',
                comments: ''
            }
        }
    },
    data () {
        return {
            croppa: {},
            lrcpanBaseUrl: licenseRegistrationServiceBaseUrl,
            imgData: '',
            item: ''
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    methods: {
        getFile (data) {
            if (data.field_type === 'image') {
                if (data.value !== '') {
                    const fileData = JSON.parse(data.value)
                    if (fileData[0]) {
                        this.imgData = fileData[0]
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                if (typeof (data.value[0]) !== 'undefined') {
                    const fileData = JSON.parse(data.value)
                    if (fileData[0]) {
                        const files = JSON.parse(fileData[0])
                        this.imgData = files[0]
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            }
        },
        imageChanged: function (item) {
            const crp = this.croppa.generateDataUrl(item)
            this.data.value = []
            this.data.value.push(crp)
        },
        onFileChange (e) {
            this.getBase64(e.target.files[0]).then(res => {
                this.data.value[0] = res
            })
        },
        getBase64 (file) {
            return new Promise(function (resolve, reject) {
                const reader = new FileReader()
                let imgResult = ''
                reader.readAsDataURL(file)
                reader.onload = function () {
                    imgResult = reader.result
                }
                reader.onerror = function (error) {
                    reject(error)
                }
                reader.onloadend = function () {
                    resolve(imgResult)
                }
            })
        },
        fileSizeValidation: function (item) {
            this.$toast.error({
                title: 'Warning',
                message: 'File maximum size 2mb',
                color: '#D6E09B'
            })
        }
    }
}
</script>
<style scoped>
.croppa-container canvas{
    background-color: lightblue !important;
    border: 2px solid grey !important;
    border-radius: 8px !important;
}

.croppa-container:hover {
    opacity: 1;
    background-color: #8ac9ef;
}
</style>
