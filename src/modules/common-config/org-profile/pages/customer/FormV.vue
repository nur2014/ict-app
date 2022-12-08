<template>
  <b-container fluid>
    <b-row>
      <b-col lg="12" sm="12">
        <iq-card>
          <template v-slot:body>
            <b-row>
              <b-col md="12" sm="12">
                <ValidationObserver ref="form"  v-slot="{ handleSubmit, reset }">
              <b-form  @submit.prevent="handleSubmit(register)" @reset.prevent="reset" >
                <ValidationProvider name="Customer Name" vid="customer_name" rules="required">
                  <b-form-group
                    class="row"
                    label-cols-sm="4"
                    label-for="customer"
                    slot-scope="{ valid, errors }"
                  >
                  <template v-slot:label>
                    Customer Name <span class="text-danger">*</span>
                  </template>
                    <b-form-input
                      id="name"
                      v-model="customer.customer_name"
                      :state="errors[0] ? false : (valid ? true : null)"
                      ></b-form-input>
                    <div class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider name="Address" vid="address" rules="required">
                  <b-form-group
                    class="row"
                    label-cols-sm="4"
                    label-for="address"
                    slot-scope="{ valid, errors }"
                  >
                  <template v-slot:label>
                    Address <span class="text-danger">*</span>
                  </template>
                    <b-form-input
                      id="address"
                      v-model="customer.address"
                      :state="errors[0] ? false : (valid ? true : null)"
                      ></b-form-input>
                    <div class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </b-form-group>
                </ValidationProvider>
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
import { customerStore, customerUpdate } from '../../api/routes'

export default {
  props: ['id'],
  components: {
    ValidationObserver,
    ValidationProvider
  },
  created () {
    if (this.id) {
      const tmp = this.geCustomerData()
      // Object.freeze(tmp)
      this.customer = tmp
    } else {
    }
  },
  mounted () {
    core.index()
  },
  data () {
    return {
      saveBtnName: this.id ? 'Update' : 'Save',
      customer: {
        customer_name: '',
        address: ''
      }
    }
  },
  methods: {
    geCustomerData () {
      const tmpData = this.$store.state.list.find(item => item.id === this.id)
      return JSON.parse(JSON.stringify(tmpData))
    },
    async register () {
      this.$store.dispatch('mutateCommonProperties', { loading: true })
        let result = null
        const loadingState = { loading: false, listReload: false }

        if (this.customer.id) {
            result = await RestApi.putData(commonServiceBaseUrl, `${customerUpdate}/${this.id}`, this.customer)
        } else {
            result = await RestApi.postData(commonServiceBaseUrl, customerStore, this.customer)
        }
        loadingState.listReload = true
        this.$store.dispatch('mutateCommonProperties', loadingState)
        if (result.success) {
            this.$store.dispatch('mutateCommonProperties', { hasDropdownLoaded: false })
            this.$toast.success({
            title: this.$t('globalTrans.success'),
            message: this.id ? this.$t('globalTrans.update_msg') : this.$t('globalTrans.save_msg'),
            color: '#D6E09B'
            })

            this.$bvModal.hide('modal-4')
        } else {
            this.$refs.form.setErrors(result.errors)
        }
    }
  }
}
</script>
