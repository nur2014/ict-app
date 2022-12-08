import RestApi from '../config/api_config'

export default {
    computed: {
    },
    methods: {
        async paymentStatusUpdate (baseUrl, routeUri, redirectUri) {
            if (this.$route.params.status && this.$route.query.transId) {
                const status = this.$route.params.status
                const tranId = this.$route.query.transId
                await RestApi.getData(baseUrl, routeUri + status, { transId: tranId }).then(response => {
                if (response.success) {
                    this.$toast.success({
                    title: 'Success',
                    message: response.message,
                    color: '#D6E09B'
                    })
                } else {
                    this.$toast.error({
                    title: 'Error',
                    message: response.message
                    })
                }
                })
                this.loadData()
                this.$router.push(redirectUri)
            }
        }
    }
}
