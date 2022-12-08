import i18n from '@/i18n'
const getReportHead = async (baseUrl, uri, orgId, reportTitle = 'Report') => {
  const reportHeadColumn = [{ width: '*', text: '' }]
  const orgName = i18n.locale === 'en' ? "Government of the People's Republic of Bangladesh" : 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'
  const address = i18n.locale === 'en' ? 'Ministry of Agriculture, Seed Division' : 'কৃষি মন্ত্রণালয়, বীজ অনুবিভাগ'
  const sec = i18n.locale === 'en' ? 'Bangladesh Secretariat, Dhaka' : 'বাংলাদেশ সচিবালয়, ঢাকা'
  const website = i18n.locale === 'en' ? 'www.moa.gov.bd' : 'www.moa.gov.bd'

  reportHeadColumn.push({
    width: 'auto',
    text: orgName,
    // margin: headMargin,
    style: ['header']
  })
  reportHeadColumn.push({
    width: '*',
    text: ''
  })
  //
  return { address, sec, website, reportHeadColumn }
}

export default {
  getReportHead
}
