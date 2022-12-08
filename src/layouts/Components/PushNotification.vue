<template>
  <div class="push_notification_wrapper">
    <b-alert show fade class="alert_wrapper" v-for="(notification, index) in pushNotifications" :key="index">
      {{notification.message}}
      <a href="javascript:" class="close" @click="removePushNotification(notification.id)"><i class="fas fa-times"></i></a>
    </b-alert>
  </div>
</template>

<script>
  export default {
    props: ['component_id'],
    data () {
      return {}
    },
    computed: {
      pushNotifications () {
        return this.$store.state.isPushNotification.filter(tmp => parseInt(tmp.component_id) === this.component_id)
      }
    },
    methods: {
      removePushNotification (notificationId) {
        this.$store.dispatch('removeSinglePushNotification', notificationId)
      }
    }
  }
</script>
