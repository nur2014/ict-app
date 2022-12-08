import i18n from '@/i18n'
import RestApi from '@/config/api_config'
import Store from '@/store'

const getReportHead = async (baseUrl, uri, orgId, reportTitle = 'Report') => {
    const reportHeadColumn = [{ width: '*', text: '' }]
    if (Store.state.Auth.activeRoleId !== 1) {
        orgId = Store.state.Auth.authUser.org_id
        let result = ''
        result = await RestApi.getData(baseUrl, `${uri}/${orgId}`)
        //
        if (!result.success) {
            return reportHeadColumn
        }
        //
        const orgList = Store.state.orgList
        // const orgList = Store.state.commonObj.organizationProfileList
        const orgData = orgList.find(item => item.value === orgId)
        const orgName = i18n.locale === 'en' ? orgData.text_en : orgData.text_bn
        const govInfo = i18n.locale === 'en' ? "Government of the People's Republic of Bangladesh" : 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'
        const address = i18n.locale === 'en' ? result.data.address : result.data.address_bn
        let projectName = ''

        if (Object.prototype.hasOwnProperty.call(result.data, 'project_name')) {
            projectName = i18n.locale === 'en' ? result.data.project_name : result.data.project_name_bn
        }

        if (result.data.left_logo) {
            reportHeadColumn.push({
            width: 60,
            height: 60,
            image: 'data:image/png;base64,' + result.data.left_logo
            })
        }
        const headMargin = i18n.locale === 'en' ? [10, 10, 10, 10] : [10, 10, 10, 10]

        reportHeadColumn.push({
            width: 'auto',
            text: govInfo,
            margin: headMargin,
            style: ['header']
        })

        if (result.data.right_logo) {
            reportHeadColumn.push({
            width: 60,
            height: 60,
            image: 'data:image/png;base64,' + result.data.right_logo
            })
        }
        reportHeadColumn.push({
            width: '*',
            text: ''
        })
        //
        return { address, reportHeadColumn, projectName, orgName }
    } else {
        let result = ''
        result = await RestApi.getData(baseUrl, '/config/report-head/moa-image')
        //
        if (!result.success) {
            return reportHeadColumn
        }
        //
        const orgName = i18n.locale === 'en' ? 'Ministry of Agriculture' : 'কৃষি মন্ত্রণালয়'
        const govInfo = i18n.locale === 'en' ? "Government of the People's Republic of Bangladesh" : 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'
        const address = i18n.locale === 'en' ? 'Building no 4, Secretariat, Abdul Gani Rd, Dhaka' : 'বিল্ডিং নং ৪, সচিবালয়, আব্দুল গণি রোড, ঢাকা'
        const projectName = ''

        if (result.data.left_logo) {
            reportHeadColumn.push({
            width: 60,
            height: 60,
            image: 'data:image/png;base64,' + result.data.left_logo
            })
        }
        const headMargin = i18n.locale === 'en' ? [10, 10, 10, 10] : [10, 10, 30, 10]

        reportHeadColumn.push({
            width: 'auto',
            text: govInfo,
            margin: headMargin,
            style: ['header']
        })

        if (result.data.right_logo) {
            reportHeadColumn.push({
            width: 60,
            height: 60,
            image: 'data:image/png;base64,' + result.data.right_logo
            })
        }
        reportHeadColumn.push({
            width: '*',
            text: ''
        })
        //
        return { address, reportHeadColumn, projectName, orgName }
    }
}

export default {
  getReportHead
}
