<template>
    <b-col md="12" sm="12" lg="12" style="margin: 0px;">
        <grid-layout :layout.sync="layout"
        :col-num="colNum"
        :row-height="13"
        :is-draggable="false"
        :is-resizable="false"
        :vertical-compact="true"
        :use-css-transforms="true"
        :key="layoutKey"
        >
            <grid-item v-for="(item, dindex) in layout" :key="dindex"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :dataType="item.dataType"
            >
                <b-row>
                    <Input :tmpData="formIData" :index="dindex" v-if="item.dataType === 'InputField'" />
                </b-row>
            </grid-item>
        </grid-layout>
    </b-col>
</template>
<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import Input from './input-field'
export default {
    props: ['tmpData'],
    components: {
        GridLayout,
        GridItem,
        Input
    },
    data () {
        return {
            layoutKey: 0,
            layout: [],
            formIData: [],
            colNum: 12
        }
    },
    computed: {
        local: function () {
            return this.$i18n.locale
        }
    },
    watch: {
        tmpData: {
            deep: true,
            handler (tmpData) {
                this.layout = tmpData.layout
                this.formIData = tmpData.formIData
            }
        }
    },
    created () {
        if (this.tmpData) {
            this.layout = this.tmpData.layout
            this.formIData = this.tmpData.formIData
        }
    }
}
</script>
