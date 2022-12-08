import i18n from '@/i18n'
import Store from '@/store'
import ReportHeading from './report-head'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFontsBn from 'pdfmake/build/vfs_fonts_bn'
import pdfFontsEn from 'pdfmake/build/vfs_fonts_en'
/**
 *
 * @param {*} baseUrl
 * @param {*} uri
 * @param {*} orgId
 * @param {*} reportTitle
 * @param {*} data
 * @param {*} columnWidths
 * @param {*} extra
 *
 * Format or attributes of extra
 * extra = {
 *  totalHeaderRows: Integer
 *  subHead: Array for table data
 *  footer: Array for table data
 * }
 */
const exportPdf = async (baseUrl, uri = '/fertilizer/config/report-heading/detail', orgId, reportTitle, data, columnWidths = null, extra = {}, docName = 'MoA') => {
    try {
      Store.commit('mutateCommonProperties', {
        loading: true
      })

      if (i18n.locale === 'bn') {
        pdfMake.vfs = pdfFontsBn.pdfMake.vfs
      } else {
          pdfMake.vfs = pdfFontsEn.pdfMake.vfs
      }
    const reportHeadData = await ReportHeading.getReportHead(baseUrl, uri, orgId)
    const waterMarkText = i18n.locale === 'bn' ? 'কৃষি মন্ত্রণালয়' : 'Ministry of Agriculture'
    let defaultColumnWidths = columnWidths

        if (!columnWidths) {
        defaultColumnWidths = []
        const noOfColumns = data[0].length

            for (let i = 0; i < noOfColumns; i++) {
                defaultColumnWidths.push('*')
            }
        }
        const pdfContent = [
        {
            columns: reportHeadData.reportHeadColumn
        },
        { text: reportHeadData.address, style: 'header3', alignment: 'center' }
        ]

        if (reportHeadData.projectName) {
        pdfContent.push({ text: reportHeadData.projectName, style: 'header3', alignment: 'center' })
        }

        // If Table header contains multiple rows
        let tableHeaderRows = 1
        if (Object.prototype.hasOwnProperty.call(extra, 'totalHeaderRows') && extra.totalHeaderRows > 0) {
          tableHeaderRows = extra.totalHeaderRows
        }
        pdfContent.push({ text: reportTitle, style: 'header2', alignment: 'center' })
      //   /**
      //    * Inserting subhead section
      //    */
        if (Object.prototype.hasOwnProperty.call(extra, 'subHead') && extra.subHead !== null && extra.subHead.length > 0) {
          const subHeadTable = {
            style: 'tableSubHead',
            table: {
              headerRows: 0,
              body: extra.subHead
            },
            layout: 'noBorders'
          }
          pdfContent.push(subHeadTable)
        }
        pdfContent.push({
        lineHeight: 1.40,
        layout: 'lightHorizontalLines', // optional
        // layout: {
        //   defaultBorder: false
        // },
        table: {
            headerRows: tableHeaderRows,
            widths: defaultColumnWidths,
            body: data
        }
        })
        /**
         * Inserting subhead section
         */
        if (Object.prototype.hasOwnProperty.call(extra, 'footer') && extra.subHead !== null && extra.footer.length > 0) {
          const footerTable = {
            style: 'tableFooter',
            table: {
              headerRows: 0,
              body: extra.footer
            },
            layout: 'noBorders'
          }
          pdfContent.push(footerTable)
        }
        var docDefinition = {
        info: {
          title: docName,
          author: 'Ministry of Agriculture',
          subject: docName,
          keywords: ''
        },
        content: pdfContent,
        pageSize: 'A4',
        pageOrientation: 'landscape',
        footer: { text: (i18n.locale === 'bn' ? 'প্রতিবেদন প্রকাশকাল:' : 'Report Publication Period:') + ' ' + (new Date().toLocaleString()), fontSize: 8, marginLeft: 50 },
        // watermark: 'Ministry of Agriculture',
        watermark: { text: waterMarkText, color: 'blue', opacity: 0.1, bold: true, italics: false },
        styles: {
            header: {
            fontSize: 16,
            // bold: true,
            margin: [0, 0, 0, 4]
            },
            header2: {
            fontSize: 16,
            // bold: true,
            margin: [0, 10, 0, 20]
            },
            header3: {
            fontSize: 12,
            // bold: true,
            margin: [0, 0, 0, 4]
            },
            tableSubHead: {
              margin: [0, 5, 0, 15]
            },
            tableFooter: {
              margin: [0, 15, 0, 5]
            }
        }
        }
        pdfMake.createPdf(docDefinition, null, null, null).print()
    } catch (error) {
      if (error) {
        //
      }
    }
    Store.commit('mutateCommonProperties', {
      loading: false
    })
}

const exportPdfMultipleHeader = async (baseUrl, uri = '/report-heading/detail', orgId, reportTitle, reportSubTitle = null, reportFormTitle = null, data, columnWidths = null, extra = {}) => {
    try {
      Store.commit('mutateCommonProperties', {
        loading: true
      })

      if (i18n.locale === 'bn') {
        pdfMake.vfs = pdfFontsBn.pdfMake.vfs
      } else {
          pdfMake.vfs = pdfFontsEn.pdfMake.vfs
      }
    const reportHeadData = await ReportHeading.getReportHead(baseUrl, uri, orgId)
    const waterMarkText = i18n.locale === 'bn' ? 'কৃষি মন্ত্রণালয়' : 'Ministry of Agriculture'
    let defaultColumnWidths = columnWidths

        if (!columnWidths) {
        defaultColumnWidths = []
        const noOfColumns = data[0].length

            for (let i = 0; i < noOfColumns; i++) {
              defaultColumnWidths.push('*')
            }
        }
        const pdfContent = [
        {
            columns: reportHeadData.reportHeadColumn
        },
        { text: reportHeadData.address, style: 'header3', alignment: 'center' }
        ]

        if (reportHeadData.projectName) {
        pdfContent.push({ text: reportHeadData.projectName, style: 'header3', alignment: 'center' })
        }

        // If Table header contains multiple rows
        let tableHeaderRows = 1
        if (Object.prototype.hasOwnProperty.call(extra, 'totalHeaderRows') && extra.totalHeaderRows > 0) {
          tableHeaderRows = extra.totalHeaderRows
        }
        pdfContent.push({ text: reportTitle, style: 'header2', alignment: 'center' })
        pdfContent.push({ text: reportSubTitle, style: 'report_sub_title', alignment: 'center' })
        pdfContent.push({ text: reportFormTitle, style: 'header_form_name', alignment: 'right' })
        /**
         * Inserting subhead section
         */
        if (Object.prototype.hasOwnProperty.call(extra, 'subHead') && extra.subHead !== null && extra.subHead.length > 0) {
          const subHeadTable = {
            style: 'tableSubHead',
            table: {
              headerRows: 0,
              body: extra.subHead
            },
            layout: 'noBorders'
          }
          pdfContent.push(subHeadTable)
        }
        pdfContent.push({
          lineHeight: 1.0,
          // layout: 'lightHorizontalLines', // optional
          // layout: {
          //   defaultBorder: false
          // },
          table: {
              headerRows: tableHeaderRows,
              widths: defaultColumnWidths,
              body: data
              // body: { headerData, data }
          }
        })

        // pdfContent.push({ text: 'Mechanic / Electrician / Assistant Mechanic', style: 'header_form_name', alignment: 'center' })
        /**
         * Inserting subhead section
         */
        if (Object.prototype.hasOwnProperty.call(extra, 'footer') && extra.subHead !== null && extra.footer.length > 0) {
          const footerTable = {
            style: 'tableFooter',
            table: {
              headerRows: 0,
              body: extra.footer
            },
            layout: 'noBorders'
          }
          pdfContent.push(footerTable)
        }
        var docDefinition = {
        content: [
          pdfContent,
          { text: i18n.locale === 'en' ? '2nd Part:' : '২য় অংশঃ', style: 'part_2_style' },
          {
            style: 'table2',
            table: {
              headerRows: tableHeaderRows,
              widths: defaultColumnWidths,
              body: data
            }
          },
          { text: i18n.locale === 'en' ? '3rd Part:' : '৩য় অংশঃ', style: 'part_3_style' },
          {
            style: 'table3',
            table: {
              headerRows: tableHeaderRows,
              widths: defaultColumnWidths,
              body: data
            }
          },
          { text: i18n.locale === 'en' ? 'Mechanic / Electrician / Assistant Mechanic' : 'মেকনিক/ ইলেক্ট্রিশিয়ান/ সহকারী মেকনিক', style: 'bottom_left_top_style' },
          { text: i18n.locale === 'en' ? 'BMDA ............. Zone' : 'বিএমডিএ ............. জোন', style: 'bottom_left_bottom_style' },
          { text: i18n.locale === 'en' ? 'Senior / Deputy Assistant Engineer / Foreman' : 'উচ্চতর/ উপ-সহকারী প্রকৌশলী/ ফোরম্যান', style: 'bottom_middle_top_style' },
          { text: i18n.locale === 'en' ? 'BMDA ............. Zone' : 'বিএমডিএ ............. জোন', style: 'bottom_middle_bottom_style' },
          { text: i18n.locale === 'en' ? 'Assistant Engineer' : 'সহকারী প্রকৌশলী', style: 'bottom_right_top_style' },
          { text: i18n.locale === 'en' ? 'BMDA ............. Zone' : 'বিএমডিএ ............. জোন', style: 'bottom_right_bottom_style' }
        ],
        pageSize: 'LEGAL',
        pageOrientation: 'landscape',
        // footer: {
        //   columns: [
        //     'Left part',
        //     { text: 'Right part', alignment: 'right' }
        //   ]
        // },
        footer: function (currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount },
        watermark: { text: waterMarkText, color: 'blue', opacity: 0.1, bold: true, italics: false },
        styles: {
            header: {
              fontSize: 16,
              // bold: true,
              margin: [0, 0, 0, 4]
            },
            header2: {
              fontSize: 14,
              // bold: true,
              margin: [0, 10, 0, 0]
            },
            header_form_name: {
              fontSize: 12,
              // bold: true,
              margin: [0, 0, 0, 5]
            },
            report_sub_title: {
              fontSize: 13,
              // bold: true,
              margin: [0, 0, 0, 5]
            },
            header3: {
              fontSize: 12,
              // bold: true,
              margin: [0, 0, 0, 4]
            },
            tableSubHead: {
              margin: [0, 5, 0, 15]
            },
            tableFooter: {
              margin: [0, 15, 0, 5]
            },
            part_2_style: {
              fontSize: 12,
              margin: [450, 15, 0, -10]
            },
            part_3_style: {
              fontSize: 12,
              margin: [450, 15, 0, -10]
            },
            table2: {
              margin: [0, 15, 0, 5]
            },
            table3: {
              margin: [0, 15, 0, 5]
            },
            bottom_left_top_style: {
              margin: [100, 50, 0, 5]
            },
            bottom_left_bottom_style: {
              margin: [125, 0, 0, 5]
            },
            bottom_middle_top_style: {
              margin: [400, -40, 0, 5]
            },
            bottom_middle_bottom_style: {
              margin: [425, 0, 0, 5]
            },
            bottom_right_top_style: {
              margin: [700, -40, 0, 5]
            },
            bottom_right_bottom_style: {
              margin: [685, 0, 0, 5]
            }
        }
        }
        pdfMake.createPdf(docDefinition, null, null, null).print()
    } catch (error) {
      if (error) {
        //
      }
    }
    Store.commit('mutateCommonProperties', {
      loading: false
    })
}

export default {
  exportPdf, exportPdfMultipleHeader
}
