
<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Demo Table</h4>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col lg="8" sm="12">
                <ValidationObserver ref="form"  v-slot="{ handleSubmit }">
                  <b-form  @submit.prevent="handleSubmit(save)" >
                    <ValidationProvider name="Per Page" vid='perPage' rules="required|min_value:3">
                      <b-form-group
                        class="row"
                        label-cols-sm="3"
                        :label="$t('sitePreference.perPage')"
                        label-for="perPage"
                        slot-scope="{ valid, errors }"
                      >
                        <b-form-input
                          id="perPage"
                          type="number"
                          v-model="sitePreference.perPage"
                          :state="errors[0] ? false : (valid ? true : null)"
                          ></b-form-input>
                        <div class="invalid-feedback">
                          {{ errors[0] }}
                        </div>
                      </b-form-group>
                    </ValidationProvider>
                    <ValidationProvider name="Date Format" vid="dateFormat" rules="required">
                      <b-form-group
                        class="row"
                        label-cols-sm="3"
                        :label="$t('sitePreference.dateFormat')"
                        label-for="dateFormat"
                        slot-scope="{ valid, errors }"
                        >
                        <b-form-select
                          plain
                          v-model="sitePreference.dateFormat"
                          :options="dateFormatList"
                          id="dateFormat"
                          :state="errors[0] ? false : (valid ? true : null)"
                          >
                        </b-form-select>
                        <div class="invalid-feedback">
                          {{ errors[0] }}
                        </div>
                      </b-form-group>
                    </ValidationProvider>
                    <div class="row">
                      <div class="col-sm-3"></div>
                      <div class="col text-right">
                        <b-button type="submit" variant="primary">{{ $t('globalTrans.save') }}</b-button>
                        &nbsp;
                        <b-button variant="danger" class="mr-1" type="reset" >Reset</b-button>
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
import { mapGetters, mapActions } from 'vuex'
import { core } from '@/config/pluginInit'

export default {
  data () {
    return {
      dateFormatList: [
        {
          value: 'DD/MM/YYYY',
          text: 'DD/MM/YYYY (20/10/2020)'
        },
        {
          value: 'DD.MM.YYYY',
          text: 'DD.MM.YYYY (20.10.2020)'
        },
        {
          value: 'DD-MM-YYYY',
          text: 'DD-MM-YYYY (20-10-2020)'
        },
        {
          value: 'YYYY-MM-DD',
          text: 'YYYY-MM-DD (2020-10-20)'
        }
      ],
      sitePreference: {
        dateFormat: 'DD/MM/YYYY',
        perPage: 10
      }
    }
  },
  computed: {
    ...mapGetters({
      coMMonObj: 'commonObj'
    })
  },
  async created () {},
  mounted () {
    core.index()
  },
  methods: {
    ...mapActions({
      saveData: 'mutateCommonProperties'
    }),
    save () {
      this.saveData(this.sitePreference)
      this.$toast.success({
        title: this.$t('globalTrans.success'),
        message: this.id ? this.$t('globalTrans.update_msg') : this.$t('globalTrans.save_msg'),
        color: '#D6E09B'
      })
    }
  }
}
</script>
