import Store from '@/store'
import RestApi, {
    commonServiceBaseUrl,
    trainingElearningServiceBaseUrl,
    irriSchemeServiceBaseUrl,
    warehouseServiceBaseUrl,
    seedFertilizerServiceBaseUrl,
    agriMarketingServiceBaseUrl,
    incentiveGrantServiceBaseUrl,
    licenseRegistrationServiceBaseUrl,
    virtualMuseumServiceBaseUrl,
    agriResearchServiceBaseUrl
} from '@/config/api_config'
const allBaseUrl = {
    1: commonServiceBaseUrl,
    2: licenseRegistrationServiceBaseUrl,
    3: agriResearchServiceBaseUrl,
    4: incentiveGrantServiceBaseUrl,
    5: agriMarketingServiceBaseUrl,
    6: warehouseServiceBaseUrl,
    7: virtualMuseumServiceBaseUrl,
    8: seedFertilizerServiceBaseUrl,
    9: irriSchemeServiceBaseUrl,
    10: trainingElearningServiceBaseUrl
}
const getPushNotification = (data) => {
    const authUserId = Store.state.Auth.authUser.user_id
    if (Array.isArray(data)) {
        const isThere = data.find(res => parseInt(res.recipient_id) === parseInt(authUserId))
        if (typeof isThere !== 'undefined') {
            const baseUrl = allBaseUrl[isThere.component_id]
            notificationApiCall(isThere, baseUrl, authUserId)
        }
    } else {
        if (authUserId === data.recipient_id) {
            const baseUrl = allBaseUrl[data.component_id]
            notificationApiCall(data, baseUrl, authUserId)
        }
    }
}
function notificationApiCall (data, baseUrl, authUserId) {
    const params = { recipient_id: authUserId, read_status: 1 }
    RestApi.getData(baseUrl, 'notification-received/list', params)
    .then(response => {
        Store.dispatch('setPushNotification', data)
        Store.dispatch('setNotificationList', response.data.data)
        Store.dispatch('setTotalNotification', response.total)
        const audioPath = 'http://service.moa.gov.bd/audio/sms.mp3'
        const audio = new Audio(audioPath)
        audio.play()
    })
}
export default getPushNotification
