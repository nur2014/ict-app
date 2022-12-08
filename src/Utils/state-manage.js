import Store from '@/store'
import i18n from '@/i18n'

export const getAgrMarCommonStore = (state, Id) => {
    if (state) {
        const tmpData = Store.state.agriMarketing.commonObj[state]
    if (typeof tmpData === 'undefined') {
        return ''
    } else {
        const data = tmpData.find(item => item.value === Id)
        if (typeof data === 'undefined') {
        return ''
        } else {
        return this.i18 ? data.text_bn : data.text_en
        }
    }
    }
}

export const getAgrMarDamStore = (state, Id) => {
    if (state) {
        const tmpData = Store.state.agriMarketing.damData[state]
    if (typeof tmpData === 'undefined') {
        return ''
    } else {
        const data = tmpData.find(item => item.value === Id)
        if (typeof data === 'undefined') {
        return ''
        } else {
        return this.i18 ? data.text_bn : data.text_en
        }
    }
    }
}

export const getAgrMarStore = (state, Id) => {
    if (state) {
        const tmpData = Store.state.agriMarketing[state]
    if (typeof tmpData === 'undefined') {
        return ''
    } else {
        const data = tmpData.find(item => item.value === Id)
        if (typeof data === 'undefined') {
        return ''
        } else {
        return this.i18 ? data.text_bn : data.text_en
        }
    }
    }
}

export const i18 = () => {
    return (i18n.locale === 'bn') ? 1 : 0
}
