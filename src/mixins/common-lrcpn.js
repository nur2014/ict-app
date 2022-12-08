
export default {
    computed: {
        checkBn () {
            return (this.$i18n.locale === 'bn') ? 1 : 0
        }
    },
    methods: {
        getCommonStoreData (state, Id) {
            if (state) {
                const tmpData = this.$store.state.commonObj[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        },
        getCommonConfigStoreData (state, Id) {
            if (state) {
                const tmpData = this.$store.state.commonObjCommonConfig[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        },
        getStoreData (ServiceName, state, Id) {
            if (state) {
                const tmpData = this.$store.state[ServiceName].commonObj[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        },
        getStoreDataAdmin (state, Id) {
            if (state) {
                const tmpData = this.$store.state.licenseRegistration.commonObj[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        },
        getStoreDataUser (state, Id) {
            if (state) {
                const tmpData = this.$store.state.ExternalLrcpn.commonObj[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        },
        getCommonStoreDataUser (state, Id) {
            if (state) {
                const tmpData = this.$store.state.ExternalUserIrrigation.commonObj[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        },
        getStoreDataUserLrcpn (state, Id) {
            if (state) {
                const tmpData = this.$store.state.ExternalLrcpn.lrcpnObj[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        },
        getMainStoreData (state, Id) {
            if (state) {
                const tmpData = this.$store.state[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        },
        getStoreDataLrcpn (state, Id) {
            if (state) {
                const tmpData = this.$store.state.ExternalLrcpn.lrcpnObj[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        },
        getStoreIrrDataLrcpn (state, Id) {
            if (state) {
                const tmpData = this.$store.state.ExternalUserIrrigation.commonObj[state]
                if (typeof tmpData === 'undefined') {
                    return ''
                } else {
                    const data = tmpData.find(item => item.value === Id)
                    if (typeof data === 'undefined') {
                        return ''
                    } else {
                        return data.text
                    }
                }
            }
        }
    }
}
