import { core } from '@/config/pluginInit'
import toggleStatus from '@/Utils/toggle-status'
import toggleMixedStatus from '@/Utils/toggle-mixed-status'

export default {
    data () {
        return {
          pagination: {
            currentPage: 1,
            totalRows: 0,
            perPage: this.$store.state.commonObj.perPage,
            slOffset: 1
          },
          editItemId: 0
        }
    },
    computed: {
        loading () {
          return this.$store.state.commonObj.loading
        },
        listReload () {
          return this.$store.state.commonObj.listReload
        },
        loadingState () {
          if (this.listReload) {
            return true
          } else if (this.loading) {
              return true
          } else {
            return false
          }
        },
        listData () {
          return this.$store.state.list
        },
        checkBn () {
          return (this.$i18n.locale === 'bn') ? 1 : 0
        }
    },
    watch: {
      listReload: function (newVal, oldVal) {
        if (newVal) {
          this.loadData()
        }
      }
    },
    mounted () {
      core.index()
    },
    methods: {
      resetId () {
        this.editItemId = 0
      },
      edit (item) {
        this.editItemId = item.id
      },
      paginationData (data) {
        this.pagination.currentPage = data.current_page
        this.pagination.totalRows = data.total
        this.pagination.slOffset = this.pagination.perPage * this.pagination.currentPage - this.pagination.perPage + 1
      },
      changeStatus (baseUrl, uri, item, destination = null, dropdownName = null) {
        toggleStatus(baseUrl, uri, item, destination, dropdownName)
      },
      swalMixedStatus (baseUrl, uri, item, swalMsg = null, hideModal = null) {
        toggleMixedStatus(baseUrl, uri, item, swalMsg, hideModal)
      },
      loadingTest (baseUrl, uri, search) {

      }
    },
    beforeDestroy () {
      this.$store.dispatch('resetList', [])
    }
}
