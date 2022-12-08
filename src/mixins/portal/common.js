
export default {
    computed: {
        checkBn () {
            return (this.$i18n.locale === 'bn') ? 1 : 0
        }
    },
    methods: {
        getParentName (parentType, Id) {
            if (parentType) {
                if (parentType === 'allService') {
                    return { name: this.$t('portal.all_service'), name_bn: this.$t('portal.all_service') }
                } else {
                    const tmpData = this.$store.state.Portal[parentType]
                    if (typeof tmpData === 'undefined') {
                        return ''
                    } else {
                        const data = tmpData.find(item => item.id === parseInt(Id))
                        if (typeof data === 'undefined') {
                            return ''
                        } else {
                            if (parentType === 'orgList') {
                                return Object.assign(data, { name: data.abbreviation, name_bn: data.abbreviation_bn })
                            } else {
                                return data
                            }
                        }
                    }
                }
            }
        },
        getPortalStoreData (state, Id) {
            if (state) {
                const tmpData = this.$store.state.Portal[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data
                    }
                }
            }
        },
        shortString (str, n) {
            return (str.length > n) ? str.substr(0, n - 1) + '...' : str
        }
    }
}
