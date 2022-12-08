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
                    :initial-image="imgData"
                    @move="imageChanged(item)"
                    @new-image-drawn="imageChanged(item)"
                    @file-size-exceed="fileSizeValidation(item)"
                    canvas-color="transparent"
                    accept=".jpeg,.jpg,.png">
                </croppa>
                <a target="_blank" v-if="imgSubmit" :href="initialImage"><span style="margin: 15px 1px 15px !important; font-size: 12px"><i class="fa fa-download mr-1" aria-hidden="true"></i>{{ $t('externalLrcpn.uploaded_image') }}</span></a>
            </div>
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
                            <a target="_blank" v-if="formSubmit" :href="imgData" download="uploaded_file"><span style="margin: 15px 1px 15px !important; font-size: 12px">{{ $t('externalLrcpn.view_attachment') }}</span></a>
                            <a target="_blank" v-else :href="lrcpanBaseUrl + 'uploads/lrcpn/' + imgData"><span style="margin: 15px 1px 15px !important; font-size: 12px">{{ $t('externalLrcpn.view_attachment') }}</span></a>
                        </button>
                        <div class="invalid-feedback">
                            {{ errors[0] }}
                        </div>
                    </b-form-group>
                </ValidationProvider>
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
            const checkJson = this.isJsonString(this.data.value)
            if (checkJson) {
                const fileData = JSON.parse(this.data.value)
                this.imgData = fileData[0]
                this.data.is_commentable.yesNo = fileData[1]
                this.data.is_commentable.comments = fileData[2]
            } else {
                this.imgData = this.data.value[0]
            }
        } else if (this.data.field_type === 'image' && this.data.upload_type === 'dynamic') {
            if (typeof (this.data.value[0]) === 'undefined') {
                this.data.value = ''
            } else {
                const checkJson = this.isJsonString(this.data.value)
                if (checkJson) {
                    this.imgSubmit = true
                    const fileData = JSON.parse(this.data.value)
                    this.imgData = fileData[0]
                    this.initialImage = this.lrcpanBaseUrl + 'uploads/lrcpn/' + this.imgData
                } else {
                    this.imgSubmit = false
                    this.imgData = this.data.value[0]
                }
            }
        } else if (this.data.field_type === 'image' && this.data.upload_type === 'static') {
            this.data.value = this.item.value
        } else {
            this.data.value = []
        }
    },
    data () {
        return {
            croppa: {},
            lrcpanBaseUrl: licenseRegistrationServiceBaseUrl,
            imgData: '',
            item: '',
            initialImage: '',
            formSubmit: false,
            imgSubmit: true
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    methods: {
        isJsonString (str) {
            try {
                JSON.parse(str)
            } catch (e) {
                return false
            }
            return true
        },
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
                    const checkJson = this.isJsonString(this.data.value)
                    if (checkJson) {
                        const fileData = JSON.parse(data.value)
                        if (fileData[0]) {
                            this.imgData = fileData[0]
                            return true
                        } else {
                            return false
                        }
                    } else {
                        this.formSubmit = true
                        this.imgData = this.data.value[0]
                        return true
                    }
                } else {
                    return false
                }
            }
        },
        imageChanged: function (item) {
            this.imgSubmit = false
            const crp = this.croppa.generateDataUrl(item)
            this.data.value = []
            this.data.value.push(crp)
            this.imgData = this.data.value[0]
        },
        onFileChange (e) {
            this.getBase64(e.target.files[0]).then(res => {
                this.data.value = []
                this.data.value.push(res)
                this.imgData = res
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
