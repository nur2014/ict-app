<template>
    <b-container fluid>
        <b-row>
            <b-col lg="12" sm="12">
                <iq-card>
                    <b-overlay :show="loading">
                        <template>
                          <b-row>
                            <slot name="topHeader"/>
                          </b-row>
                          <b-row>
                              <b-col lg="12" sm="12" class="text-center mb-4">
                                  <h5>{{ propData.title }}</h5>
                              </b-col>
                          </b-row>
                          <b-row>
                              <b-col lg="12" sm="12" v-for="(row, key) in propData.data" :key="key">
                                  <div v-if="row.type === 'list'">
                                      <b-row>
                                          <b-col lg="12" sm="12" class="text-center mb-4">
                                              <h5 class='complain-title'>{{ row.title | snakeToWords }}</h5>
                                          </b-col>
                                      </b-row>
                                      <b-row v-for="(item, i) in row.data" :key="i" class="mb-4">
                                          <b-col :lg="row['lg'] || 6" :sm="row['sm'] || 12" v-if="item.title1">
                                              <b-row>
                                                  <slot v-if="item.title1" :name="item.title1 | wordsToSnake" v-bind:data="item">
                                                      <b-col :lg="getColWidthLeft(item, 'lg', 4)" :sm="getColWidthLeft(item, 'sm')">
                                                          <span :style="getStyle(item).title1" class="text-dark" style="font-weight:bold">{{ item.title1 ? (item.title1.search('.') !== -1 ? $t(item.title1) : snakeToWords(item.title1)) : '' }} :</span>
                                                      </b-col>
                                                  </slot>
                                                  <slot v-if="item.value1" :name="item.value1 | wordsToSnake" v-bind:data="item">
                                                      <b-col :lg="getColWidthRight(item, 'lg', 6)" :sm="getColWidthRight(item, 'sm')">
                                                          <span :style="getStyle(item).value1" class="text-dark">{{ item.value1 }}</span>
                                                      </b-col>
                                                  </slot>
                                              </b-row>
                                          </b-col>
                                          <b-col lg="6" sm="12" v-if="item.title2">
                                              <b-row>
                                                  <slot v-if="item.title2" :name="item.title2 | wordsToSnake" v-bind:data="item">
                                                      <b-col :lg="getColWidthLeft(item, 'lg', 4)" :sm="getColWidthLeft(item, 'sm')">
                                                          <span :style="getStyle(item).title2" class="text-dark" style="font-weight:bold">{{ item.title2 ? (item.title2.search('.') !== -1 ? $t(item.title2) : snakeToWords(item.title2)) : '' }} :</span>
                                                      </b-col>
                                                  </slot>
                                                  <slot v-if="item.value2" :name="test(item.value2)" v-bind:data="item">
                                                      <b-col :lg="getColWidthRight(item, 'lg', 6)" :sm="getColWidthRight(item, 'sm')">
                                                          <span :style="getStyle(item).value2" class="text-dark">{{ item.value2 }}</span>
                                                      </b-col>
                                                  </slot>
                                              </b-row>
                                          </b-col>
                                      </b-row>
                                  </div>
                                  <b-row v-if="row.type === 'table'">
                                      <b-col :lg="getColWidthLeft(row, 'lg', 12)" :sm="getColWidthLeft(row, 'sm', 12)" class="text-center mb-4">
                                          <h5 class='complain-title'>{{ row.title | snakeToWords }}</h5>
                                      </b-col>
                                      <b-col :lg="getColWidthRight(row, 'lg', 12)" :sm="getColWidthRight(row, 'sm', 12)">
                                          <b-table-simple striped bordered small>
                                              <b-tr v-for="(item, index) in row.data" :key="index">
                                                  <slot v-if="item.title1" :name="item.title1 | wordsToSnake" v-bind:data="item">
                                                      <b-th :style="getStyle(item).title1"  v-if="isHtml(item, 'title1')" :colspan="colSpan(item, 'title1')" v-html="item.title1"></b-th>
                                                      <b-th :style="getStyle(item).title1"  v-else :colspan="colSpan(item, 'title1')">{{ item.title1 ? (item.title1.search('.') !== -1 ? $t(item.title1) : snakeToWords(item.title1)) : '' }}</b-th>
                                                  </slot>
                                                  <slot v-if="item.value1" :name="item.value1 | wordsToSnake" v-bind:data="item">
                                                      <b-td :style="getStyle(item).value1"  v-if="isHtml(item, 'value1')" :colspan="colSpan(item, 'value1')" v-html="item.value1"></b-td>
                                                      <b-td :style="getStyle(item).value1"  v-else :colspan="colSpan(item, 'value1')">{{ item.value1 }}</b-td>
                                                  </slot>
                                                  <slot v-if="item.title2" :name="item.title2 | wordsToSnake" v-bind:data="item">
                                                      <b-th :style="getStyle(item).title2" v-if="isHtml(item, 'title2')" :colspan="colSpan(item, 'title2')" v-html="item.title2"></b-th>
                                                      <b-th :style="getStyle(item).title2" v-else :colspan="colSpan(item, 'title2')">{{ item.title2 ? (item.title2.search('.') !== -1 ? $t(item.title2) : snakeToWords(item.title2)) : '' }}</b-th>
                                                  </slot>
                                                  <slot v-if="item.value2" :name="item.value2 | wordsToSnake" v-bind:data="item">
                                                      <b-td :style="getStyle(item).value2" v-if="isHtml(item, 'value2')" :colspan="colSpan(item, 'value2')" v-html="item.value2"></b-td>
                                                      <b-td :style="getStyle(item).value2" v-else :colspan="colSpan(item, 'value2')">{{ item.value2 }}</b-td>
                                                  </slot>
                                              </b-tr>
                                          </b-table-simple>
                                      </b-col>
                                  </b-row>
                              </b-col>
                          </b-row>
                        </template>
                    </b-overlay>
                </iq-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { wordsToSnake, snakeToWords } from '@/Utils/fliter'
export default {
    name: 'ItemView',
    props: ['propData', 'loading'],
    methods: {
        isHtml (item, type) {
            let returnVal = false
            if (typeof item.config !== 'undefined') {
                if (typeof item.config[type] !== 'undefined') {
                    if (typeof item.config[type].type !== 'undefined') {
                        if (item.config[type].type === 'html') {
                            returnVal = true
                        }
                    }
                }
            }
           return returnVal
        },
        getStyle (item) {
            if (typeof item.style !== 'undefined') {
                return item.style
            } else {
                return ''
            }
        },
        snakeToWords (payload) {
            return snakeToWords(payload)
        },
        test (val) {
            return wordsToSnake(val)
        },
        getColWidthLeft (item, type, defaultCol = 4) {
            return item[type] ? item[type].split(',')[0] : (item[type] === 'lg' ? defaultCol : 12)
        },
        getColWidthRight (item, type, defaultCol = 4) {
            return item[type] ? item[type].split(',')[1] : (item[type] === 'lg' ? defaultCol : 12)
        },
        colSpan (item, type) {
            return typeof item.colSpan !== 'undefined' ? (item.colSpan[type] !== 'undefined' ? item.colSpan[type] : 1) : 1
        }
    }
}
</script>

<style>
.b-align-center {
    top: 50%;
    left: 50%;
    z-index: 99999;
}
</style>
