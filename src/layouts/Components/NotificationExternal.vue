<template>
    <div class="iq-sub-dropdown custom_notification">
        <b-overlay :show="notLoading">
            <div class="iq-card shadow-none m-0">
                <div class="iq-card-body p-0 ">
                    <div class="notification_header">
                        <h5 class="title_notify"><i class="far fa-bell"></i> {{ $t('nav.allNotifications') }}
                        <small class="badge badge-success float-right pt-1">
                            <router-link v-if="component_id === 1"  :to="{ path: '/common-service/configuration/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else-if="component_id === 2"  :to="{ path: '/lrcpn/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else-if="component_id === 3"  :to="{ path: '/agri-research-service/configuration/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else-if="component_id === 4"  :to="{ path: '/incentive-grant-service/configuration/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else-if="component_id === 5"  :to="{ path: '/agri-marketing-service/configuration/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else-if="component_id === 6"  :to="{ path: '/warehouse/configuration/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else-if="component_id === 7"  :to="{ path: '/virtual-museum-service/configuration/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else-if="component_id === 8"  :to="{ path: '/seeds-fertilizer-service/configuration/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else-if="component_id === 9"  :to="{ path: '/irrigation-scheme-service/configuration/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else-if="component_id === 10"  :to="{ path: '/trainee-trainer-panel/received-notifications' }">{{ totalNotification }}</router-link>
                            <router-link v-else  :to="{ path: '/common-service/configuration/received-notifications' }">{{ totalNotification }}</router-link>
                        </small>
                        </h5>
                    </div>
                    <router-link :to="{ path: item.url }" class="iq-sub-card" v-for="(item, index) in listData" :key="index">
                        <div class="media align-items-center" @click="notificationSeen(item.id)">
                            <div class="img_wrapper">
                                <img class="avatar-40 rounded" src="../../assets/images/user/default.png" alt="img">
                            </div>
                            <div class="media-body ml-2">
                                <!-- <h6 class="mb-0 ">{{ item.name }}</h6> -->
                                <p class="mb-0">{{ item.message.substring(0,50) + '...' }}</p>
                                <small class="date_time">{{ item.created_at|dateFormatTime }}</small>
                            </div>
                        </div>
                    </router-link>
                    <div class="notification_footer">
                        <router-link v-if="component_id === 1"  :to="{ path: '/common-service/configuration/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else-if="component_id === 2"  :to="{ path: '/lrcpn/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else-if="component_id === 3"  :to="{ path: '/agri-research-service/configuration/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else-if="component_id === 4"  :to="{ path: '/incentive-grant-service/configuration/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else-if="component_id === 5"  :to="{ path: '/agri-marketing-service/configuration/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else-if="component_id === 6"  :to="{ path: '/warehouse/configuration/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else-if="component_id === 7"  :to="{ path: '/virtual-museum-service/configuration/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else-if="component_id === 8"  :to="{ path: '/seeds-fertilizer-service/configuration/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else-if="component_id === 9"  :to="{ path: '/irrigation-scheme-service/configuration/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else-if="component_id === 10"  :to="{ path: '/trainee-trainer-panel/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                        <router-link v-else  :to="{ path: '/common-service/configuration/received-notifications' }"><i class="fas fa-eye"></i> {{ $t('globalTrans.view_all') }}</router-link>
                    </div>
                </div>
            </div>
        </b-overlay>
    </div>
</template>

<script>
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
import { mapGetters } from 'vuex'

export default {
    props: ['component_id'],
    data () {
        return {
            notificationList: [],
            notLoading: false,
            baseUrl: {
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
        }
    },
    computed: {
        totalNotification () {
            return this.$store.state.totalNotification
        },
        listData () {
            return this.$store.state.notificationList
        },
        currentLocale () {
            return this.$i18n.locale
        },
        ...mapGetters({
            authUser: 'Auth/authUser'
        })
    },
    created () {
    },
    methods: {
        notificationSeen (id) {
            if (this.component_id > 0) {
                const baseUrl = this.baseUrl[this.component_id]
                this.notLoading = true
                RestApi.getData(baseUrl, `/notification-seen/${id}`).then(response => {
                    if (response.success) {
                        this.$store.dispatch('setNotificationList', response.data.data)
                        let totalNotification = this.$store.state.totalNotification
                        totalNotification = totalNotification - 1
                        if (totalNotification >= 0) {
                            this.$store.dispatch('setTotalNotification', totalNotification)
                        }
                        this.notLoading = false
                    } else {
                        this.$store.dispatch('setNotificationList', [])
                        this.$store.dispatch('setTotalNotification', 0)
                        this.notLoading = false
                    }
                })
            }
        }
    }
}
</script>
