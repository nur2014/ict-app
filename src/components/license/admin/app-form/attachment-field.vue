<template>
    <b-col md="12" sm="12" lg="12" class="text-center" v-if="data.field_type === 'image'">
        <span v-if="data.value !== '' && data.upload_type === 'static'">
            <img :src="data.value" style="max-width: 100%;">
        </span>
        <span v-else>
            <div style="width:300px,height:300px">
                <croppa v-model="croppa"
                    :width="140"
                    :height="80"
                    :file-size-limit="2097152"
                    :placeholder="data.label"
                    :placeholder-font-size="14"
                    @move="imageChanged(data)"
                    @new-image-drawn="imageChanged(data)"
                    @file-size-exceed="fileSizeValidation(data)"
                    canvas-color="transparent"
                    accept=".jpeg,.jpg,.png">
                </croppa>
            </div>
        </span>
    </b-col>
    <b-col md="12" sm="12" lg="12" v-else>
        <b-form-group
            label-cols-sm="4"
            :label-for="data.field_name"
        >
            <template v-slot:label>
                {{ local === 'bn' ? data.label_bn : data.label }} <span class="text-danger" v-if="data.isRequired === true">*</span><span v-if="data.help_text !== ''" class="ml-2" style="border:1px solid #66cc99;border-radius:50%;cursor:pointer" data-toggle="tooltip" data-placement="top" :title="data.help_text">?</span>
            </template>
            <b-form-file
                :placeholder="data.placeholder"
                :id="data.field_name"
                v-on:change="onFileChange"
                v-model="data.value"
            ></b-form-file>
        </b-form-group>
    </b-col>
</template>
<script>
import Croppa from 'vue-croppa'
export default {
    props: ['data'],
    components: {
        croppa: Croppa.component
    },
    data () {
        return {
            croppa: {}
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    methods: {
        imageChanged: function (item) {
            item.value = this.croppa.generateDataUrl()
        },
        onFileChange (e) {
            this.getBase64(e.target.files[0]).then(res => {
                this.data.value = res
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
