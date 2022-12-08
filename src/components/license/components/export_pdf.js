import i18n from '@/i18n'
import Store from '@/store'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFontsBn from 'pdfmake/build/vfs_fonts_bn'
import pdfFontsEn from 'pdfmake/build/vfs_fonts_en'

const exportPdfDetails = async (reportTitle, data, vm, orgName, serviceName, transactionNo, total, totalVat, totalTax) => {
  try {
    Store.commit('mutateCommonProperties', {
      loading: true
    })
    if (i18n.locale === 'bn') {
      pdfMake.vfs = pdfFontsBn.pdfMake.vfs
    } else {
        pdfMake.vfs = pdfFontsEn.pdfMake.vfs
    }
    const pdfContent = [
      ]
      pdfContent.push({ text: reportTitle, style: 'header2', alignment: 'center' })
      pdfContent.push({ text: '', style: 'fertilizer' })
      const allRows = [
          [
              { text: vm.$t('globalTrans.org_name'), style: 'th', colSpan: 2, alignment: 'left', bold: true },
              {},
              { text: orgName, style: 'td', colSpan: 2, alignment: 'left' },
              {}
          ],
          [
              { text: vm.$t('org_pro.service_namel'), style: 'th', colSpan: 2, alignment: 'left', bold: true },
              {},
              { text: serviceName, style: 'td', colSpan: 2, alignment: 'left' },
              {}
          ],
          [
              { text: vm.$t('externalUserIrrigation.application_id'), style: 'th', colSpan: 2, alignment: 'left', bold: true },
              {},
              { text: vm.$n(data[0].application_id, { useGrouping: false }), style: 'td', colSpan: 2, alignment: 'left' },
              {}
          ],
          [
            { text: vm.$t('externalUserIrrigation.transaction_id'), style: 'th', colSpan: 2, alignment: 'left', bold: true },
            {},
            { text: transactionNo, style: 'td', colSpan: 2, alignment: 'left' },
            {}
          ],
          [
              { text: vm.$t('externalLrcpn.payment_history'), style: 'th', colSpan: 4, alignment: 'center', bold: true },
              {},
              {},
              {}
          ],
          [
              { text: vm.$t('fee_name.fee_name'), style: 'th', alignment: 'left', bold: true },
              { text: vm.$t('admission_form.amount'), style: 'th', alignment: 'left', bold: true },
              { text: vm.$t('globalTrans.vat'), style: 'th', alignment: 'left', bold: true },
              { text: vm.$t('globalTrans.tax'), style: 'th', alignment: 'left', bold: true }
          ]
      ]
      data.forEach((info, index) => {
        allRows.push([
          { text: vm.getStepFeeName(info), alignment: 'left', style: 'td' },
          { text: vm.$n(info.amount), alignment: 'left', style: 'td' },
          { text: '(' + vm.$n(info.vat) + '%) = ' + vm.$n(info.amount_vat), alignment: 'left', style: 'td' },
          { text: '(' + vm.$n(info.tax) + '%) = ' + vm.$n(info.amount_tax), alignment: 'left', style: 'td' }
        ])
      })
      allRows.push([
        { text: vm.$t('globalTrans.subtotal'), alignment: 'left', style: 'td' },
        { text: vm.$n(total), alignment: 'left', style: 'td' },
        { text: vm.$n(totalVat), alignment: 'left', style: 'td' },
        { text: vm.$n(totalTax), alignment: 'left', style: 'td' }
      ])
      allRows.push([
        { text: vm.$t('globalTrans.total'), alignment: 'left', colSpan: 3, style: 'td' },
        {},
        {},
        { text: vm.$n(total + totalVat + totalTax), alignment: 'left', style: 'td' }
      ])
      pdfContent.push({
        table: {
          headerRows: 1,
          widths: ['25%', '25%', '25%', '25%'],
          body: allRows
        }
      })
      const waterMarkText = i18n.locale === 'bn' ? 'কৃষি মন্ত্রণালয়' : 'Ministry of Agriculture'
      var docDefinition = {
      content: pdfContent,
      pageSize: 'A3',
      pageOrientation: 'Landcape',
      watermark: { text: waterMarkText, color: 'blue', opacity: 0.1, bold: true, italics: false },
      styles: {
        th: {
          fontSize: (i18n.locale === 'bn') ? 10 : 9,
          margin: [3, 3, 3, 3]
        },
        td: {
          fontSize: (i18n.locale === 'bn') ? 10 : 9,
          margin: [3, 3, 3, 3]
        },
        search: {
          fontSize: (i18n.locale === 'bn') ? 10 : 8,
          margin: [3, 3, 3, 3]
        },
        fertilizer: {
          margin: [5, 0, 0, 5]
        },
        header: {
          fontSize: 12,
          margin: [0, 0, 0, 4]
        },
        header2: {
          fontSize: 14,
          margin: [0, 10, 0, 20]
        },
        headerPort1: {
          fontSize: 10,
          margin: [0, 20, 0, 5]
        },
        headerPort: {
          fontSize: 10,
          margin: [0, 4, 0, 15]
        },
        krishi: {
          margin: [0, -5, 0, 15],
          alignment: 'center'
        },
        header3: {
          fontSize: 9,
          margin: [0, 0, 0, 0]
        },
        address: {
          fontSize: 9,
          margin: [0, -10, 0, 0]
        },
        tableSubHead: {
          margin: [0, 5, 0, 15]
        }
      }
    }
    pdfMake.createPdf(docDefinition, null, null, null).print()
  } catch (error) {
    if (error) {}
  }
  Store.commit('mutateCommonProperties', {
    loading: false
  })
}
export default {
  exportPdfDetails
}
