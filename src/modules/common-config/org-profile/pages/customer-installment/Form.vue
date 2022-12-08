<template>
  <b-container fluid>
    <b-row>
      <b-col xl="12" lg="12" sm="12">
            <iq-card>
                <template v-slot:body>
                    <b-row>
                        <b-col xl="10" lg="10" sm="12">
                            <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
                                <b-form @submit.prevent="handleSubmit(checkData)" @reset.prevent="reset" enctype="multipart/form-data">
                                    <b-row>
                                        <b-col lg="6" sm="6">
                                            <ValidationProvider name="Customer Id" vid="customer_id" rules="required|min_value:1">
                                                <b-form-group
                                                    class="row"
                                                    label-cols-sm="3"
                                                    label-for="customer_id "
                                                    slot-scope="{ valid, errors }"
                                                    >
                                                    <template v-slot:label>
                                                    Customer
                                                    </template>
                                                    <b-form-select
                                                    plain
                                                    v-model="customer.type"
                                                    id="type_id"
                                                    :options="customerList"
                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                    >
                                                    <template v-slot:first>
                                                        <b-form-select-option :value="0">Select</b-form-select-option>
                                                    </template>
                                                    </b-form-select>
                                                    <div class="invalid-feedback">
                                                    {{ errors[0] }}
                                                    </div>
                                                </b-form-group>
                                            </ValidationProvider>
                                        </b-col>
                                    </b-row>
                                    <b-row v-show="ItemShow" v-for="(wordn,index) in customer.cus_ins_details" :key="index">
                                        <b-col xl="4" lg="4" sm="4">
                                            <ValidationProvider name="Amount" vid="amount" rules="required">
                                                <b-form-group
                                                class="row"
                                                label-cols-sm="5"
                                                label-for="amount"
                                                slot-scope="{ valid, errors }"
                                                >
                                                <template v-slot:label>
                                                    Amount <span class="text-danger">*</span>
                                                </template>
                                                <b-form-input
                                                    :id="index"
                                                    type="number"
                                                    v-model="wordn.amount"
                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                    ></b-form-input>
                                                <div class="invalid-feedback">
                                                    {{ errors[0] }}
                                                </div>
                                                </b-form-group>
                                            </ValidationProvider>
                                        </b-col>
                                         <b-col xl="4" lg="4" sm="4">
                                            <ValidationProvider name="Expire Date" vid="expire_date" rules="required">
                                                <b-form-group
                                                class="row"
                                                label-cols-sm="5"
                                                label-for="expire_date"
                                                slot-scope="{ valid, errors }"
                                                >
                                                <template v-slot:label>
                                                    Expire Date <span class="text-danger">*</span>
                                                </template>
                                                <b-form-input
                                                    :id="index"
                                                    type="date"
                                                    v-model="wordn.expire_date"
                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                    ></b-form-input>
                                                <div class="invalid-feedback">
                                                    {{ errors[0] }}
                                                </div>
                                                </b-form-group>
                                            </ValidationProvider>
                                        </b-col>
                                        <b-col xl="3" lg="3" sm="3">
                                            <ValidationProvider name="Note" vid="note" rules="required">
                                                <b-form-group
                                                class="row"
                                                label-cols-sm="5"
                                                label-for="note"
                                                slot-scope="{ valid, errors }"
                                                >
                                                <template v-slot:label>
                                                    Note <span class="text-danger">*</span>
                                                </template>
                                                <b-form-input
                                                    :id="index"
                                                    v-model="wordn.note"
                                                    :state="errors[0] ? false : (valid ? true : null)"
                                                    ></b-form-input>
                                                <div class="invalid-feedback">
                                                    {{ errors[0] }}
                                                </div>
                                                </b-form-group>
                                            </ValidationProvider>
                                        </b-col>
                                        <b-col xl="1" lg="1" sm="4">
                                            <b-button v-show="index == customer.cus_ins_details.length-1" variant=" iq-bg-success" size="sm" @click="add()"><i class="ri-add-line m-0"></i></b-button>
                                            <b-button v-show="index || ( !index && customer.cus_ins_details.length > 1)" variant=" iq-bg-danger" size="sm" @click="remove(index)"><i class="ri-delete-bin-line m-0"></i></b-button>
                                        </b-col>
                                    </b-row>
                                    <div class="row">
                                        <div class="col-sm-3"></div>
                                        <div class="col text-right">
                                            <b-button type="submit" variant="primary" class="mr-2">{{ saveBtnName }}</b-button>
                                            &nbsp;
                                            <b-button variant="danger" class="mr-1" @click="$bvModal.hide('modal-4')">{{ $t('globalTrans.cancel') }}</b-button>
                                        </div>
                                        </div>
                                </b-form>
                            </ValidationObserver>
                        </b-col>
                    </b-row>
                </template>
            </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { core } from '../../../../../config/pluginInit'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import RestApi, { commonServiceBaseUrl } from '../../../../../config/api_config'
import { installmentStore, installmentUpdate } from '../../api/routes'

export default {
    props: ['id', 'item'],
    components: {
        ValidationObserver,
        ValidationProvider
    },
    created () {
        this.ItemShow = true
        if (this.id) {
            // if (this.item.type === 1) {
            //     this.ItemShow = true
            //     this.CityCorpItemShow = true
            //     this.PauroshobaItemShow = false
            //     this.UnionItemShow = false
            //     this.customer.cus_ins_details = [{
            //             ward_name: '',
            //             ward_name_bn: ''
            //         }]
            // } else if (this.item.type === 2) {
            //     this.ItemShow = true
            //     this.CityCorpItemShow = false
            //     this.PauroshobaItemShow = true
            //     this.UnionItemShow = false
            // } else if (this.item.type === 3) {
            //     this.ItemShow = true
            //     this.CityCorpItemShow = false
            //     this.PauroshobaItemShow = false
            //     this.UnionItemShow = true
            // }
            const tmp = this.getCusData()
            this.customer = tmp
            const wardIdData = tmp.cus_ins_details.map(item => {
                return { amount: item.amount, expire_date: item.expire_date, note: item.note }
            })
            this.customer.cus_ins_details = wardIdData
        }
    },
    mounted () {
        core.index()
    },
    data () {
        return {
            ItemShow: false,
            saveBtnName: this.id ? 'Update' : 'save',
            customer: {
                customer_id: 0,
                cus_ins_details: [
                    {
                        amount: '',
                        expire_date: '',
                        note: ''
                    }
                ]
            },
            cus_ins_details: [
                {
                     amount: '',
                     expire_date: '',
                     note: ''
                }
            ]
        }
    },
    computed: {
         customerList: function () {
            return this.$store.state.commonObjCommonConfig.customerList.filter(item => item.status === 0)
        }
    },
    methods: {
        getCusData () {
            const tmpData = this.$store.state.list.find(item => item.id === this.id)
            return JSON.parse(JSON.stringify(tmpData))
        },
        checkData () {
            if (this.customer.cus_ins_details.length > 1) {
               this.storeUpdate()
            } else {
               this.$toast.success({
                    title: 'Failed',
                    message: 'Pls add min 2 Installment',
                    color: '#D6E09B'
                })
            }
        },
        async storeUpdate () {
            this.$store.dispatch('mutateCommonProperties', { loading: true })
            let result = null
            const loadingState = { loading: false, listReload: false }

            if (this.customer.id) {
                result = await RestApi.putData(commonServiceBaseUrl, `${installmentUpdate}/${this.id}`, this.customer)
            } else {
                result = await RestApi.postData(commonServiceBaseUrl, installmentStore, this.customer)
            }

            loadingState.listReload = true

            this.$store.dispatch('mutateCommonProperties', loadingState)

            if (result.success) {
                this.$store.commit('mutateDropdownCommonConfig', { hasDropdownLoaded: false })
                this.$toast.success({
                    title: this.$t('globalTrans.success'),
                    message: this.id ? this.$t('globalTrans.update_msg') : this.$t('globalTrans.save_msg'),
                    color: '#D6E09B'
                })

                this.$bvModal.hide('modal-4')
            } else {
                this.$refs.form.setErrors(result.errors)
            }
        },
        add () {
            const tmpEquipment = {
                amount: '',
                expire_date: '',
                note: ''
            }
            const key1 = parseInt(this.customer.cus_ins_details.length - 1)
            const item = this.customer.cus_ins_details[key1]
            let isEmpty = true
            Object.keys(item).map(key => {
                if (item[key] === '' || item[key] === 0) {
                    isEmpty = false
                }
            })
            if (isEmpty === true) {
                this.customer.cus_ins_details.push(tmpEquipment)
            }
        },
        remove (key) {
            this.customer.cus_ins_details.splice(key, 1)
        }
    }
}

</script>
