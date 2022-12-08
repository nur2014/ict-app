export const method = {
    getDataById (Id, type) {
        if (Id) {
            if (type === 'division') {
                const data = this.$store.state.commonObj.divisionList.find(document => document.value === Id)
                return this.$i18n.locale === 'bn' ? data.text_bn : data.text_en
            }
            if (type === 'district') {
                const data = this.$store.state.commonObj.districtList.find(document => document.value === Id)
                return this.$i18n.locale === 'bn' ? data.text_bn : data.text_en
            }
            if (type === 'upazila') {
                const data = this.$store.state.commonObj.upazilaList.find(document => document.value === Id)
                return this.$i18n.locale === 'bn' ? data.text_bn : data.text_en
            }
            if (type === 'union') {
                const data = this.$store.state.commonObj.unionList.find(document => document.value === Id)
                return this.$i18n.locale === 'bn' ? data.text_bn : data.text_en
            }
        } else {
            return null
        }
    }
}
