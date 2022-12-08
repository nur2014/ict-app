<template>
  <div>
      <div class="row">
        <div class="col-md-10 offset-md-1" id="moneyReceiptArea">
          <b-button variant="primary" v-if="receipt.length" @click="pdfExport" class="mr-2 mb-2 btn-sm float-right btn-success" style="margin-top: -112px;background: white !important;color: #66cc99 !important;right: 53px !important;">
            <i class="fa fa-print"></i> {{  $t('globalTrans.print') }}
          </b-button>
          <table v-if="receipt.length" class="table table-bordered table-sm">
            <tr>
              <th colspan="2">{{  $t('globalTrans.organization') }}</th>
              <td colspan="2"> {{ getOrgName(receipt[0].org_id) }} </td>
            </tr>
            <tr>
              <th colspan="2">{{  $t('service_name.service_name') }}</th>
              <td colspan="2"> {{ getServiceName(receipt[0].service_id)  }} </td>
            </tr>
            <tr>
              <th colspan="2">{{  $t('externalUserIrrigation.application_id') }}</th>
              <td colspan="2">{{ $n(receipt[0].application_id, { useGrouping: false }) }}</td>
            </tr>
            <tr>
              <th colspan="2">{{  $t('externalUserIrrigation.transaction_id') }}</th>
              <td colspan="2">{{ transaction_no }}</td>
            </tr>
            <tr>
              <th colspan="2">{{  $t('externalUserIrrigation.payment_type') }}</th>
              <td colspan="2">{{ getPaidType(receipt[0].paid_type) }}</td>
            </tr>
            <tr>
              <th colspan="4" class="text-center">{{ $t('externalLrcpn.payment_history') }}</th>
            </tr>
            <tr>
                <th>{{ $t('fee_name.fee_name') }}</th>
                <th>{{ $t('globalTrans.amount') }}</th>
                <th>{{ $t('globalTrans.vat') }} (%) </th>
                <th>{{ $t('globalTrans.tax') }} (%) </th>
            </tr>
            <tr v-for="(item, index) in receipt" :key="index">
              <td>{{ getStepFeeName(item) }}</td>
              <td>{{ $n(item.amount) }}</td>
              <td>({{ $n(item.vat) }}%) = {{  $n(item.amount_vat) }}</td>
              <td>({{ $n(item.tax) }}%) = {{ $n(item.amount_tax) }}</td>
            </tr>
            <tr>
              <th>{{ $t('globalTrans.subtotal') }}</th>
              <td>{{ $n(getTotal(receipt)) }}</td>
              <td>{{ $n(getTotalVat(receipt)) }}</td>
              <td>{{ $n(getTotalTax(receipt)) }}</td>
            </tr>
            <tr>
              <th colspan="3">{{ $t('globalTrans.total') }}</th>
              <td colspan="1">{{ $n(getTotal(receipt) + getTotalVat(receipt) + getTotalTax(receipt)) }}</td>
            </tr>
          </table>
           <slot v-else>
              <b-tr>
                  <td colspan="3" class="text-center">Sorry, Data not found</td>
              </b-tr>
            </slot>
        </div>
      </div>
  </div>
</template>
<script>
import common from '@/mixins/common-lrcpn'
import MoneyReceipt from './export_pdf'

export default {
  props: ['receipt', 'transaction_no'],
  mixins: [common],
  data () {
    return {
    }
  },
  methods: {
    getTotal (data) {
      const total = data.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b.amount)
      }, 0)
      this.total_amount = total
      return total
    },
    getTotalVat (data) {
      const total = data.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b.amount_vat)
      }, 0)
      this.total_vat = total
      return total
    },
    getTotalTax (data) {
      const total = data.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b.amount_tax)
      }, 0)
      this.total_tax = total
      return total
    },
    getOrgName (orgId) {
      const tmpOrg = this.$store.state.ExternalUserIrrigation.commonObj.organizationProfileList.find(org => org.value === orgId)
      return this.$i18n.locale === 'en' ? tmpOrg !== undefined ? tmpOrg.text_en : '' : tmpOrg !== undefined ? tmpOrg.text_bn : ''
    },
    getServiceName (serviceId) {
      const ServiceName = this.$store.state.ExternalLrcpn.lrcpnObj.serviceNamesList.find(item => item.value === serviceId)
      return this.$i18n.locale === 'en' ? ServiceName !== undefined ? ServiceName.text_en : '' : ServiceName !== undefined ? ServiceName.text_bn : ''
    },
    pdfExport () {
      const reportTitle = this.$t('externalUserIrrigation.money_receipt_title')
      MoneyReceipt.exportPdfDetails(reportTitle, this.receipt, this, this.getOrgName(this.receipt[0].org_id), this.getServiceName(this.receipt[0].service_id), this.transaction_no, this.getTotal(this.receipt), this.getTotalVat(this.receipt), this.getTotalTax(this.receipt))
    },
    getStepFeeName (fee) {
      if (!fee.fee_name) {
        if (fee.amount_type === 5) {
          return this.$t('externalLrcpn.lost_fee')
        }
        if (fee.application_type === 2) {
          if (fee.amount_type === 6) {
            return this.$t('externalLrcpn.expire_fee')
          } else {
            return this.$t('externalLrcpn.renew_fee')
          }
        }
        const fees = this.$store.state.ExternalLrcpn.lrcpnObj.feeNamesList.find(item => item.value === fee.fee_id)
        if (typeof fees === 'undefined') {
            return ''
        } else {
            return fees.text
        }
      } else {
        return (this.$i18n.locale === 'bn') ? fee.fee_name_bn : fee.fee_name
      }
    },
    getPaidType (paidType) {
      if (paidType === 1) {
        return this.$i18n.locale === 'en' ? 'Online' : 'অনলাইন'
      }
      if (paidType === 2) {
        return this.$i18n.locale === 'en' ? 'Offline' : 'অফলাইন'
      }
      if (paidType === 3) {
        return this.$i18n.locale === 'en' ? 'PayRoll' : 'পে রোল'
      }
    }
  }
}
</script>
