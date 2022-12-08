import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const mergeLocaleMessage = (localeMessages) => {
  const messages = {}

  localeMessages.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = localeMessages(key)
    }
  })

  return messages
}

function loadLocaleMessages () {
  let locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const defaultMessages = mergeLocaleMessage(locales)
  locales = require.context('./modules/auth-service/auth/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const authMessages = mergeLocaleMessage(locales)
  locales = require.context('./modules/common-config/org-profile/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const orgProfileMessages = mergeLocaleMessage(locales)
  const dateTimeFormats = {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      },
      time: {
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    bn: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      },
      time: {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }
    }
  }
  const allMessages = {
    bn: Object.assign(
      {},
      dateTimeFormats.en,
      defaultMessages.en,
      authMessages.en,
      orgProfileMessages.en
      ),
    en: Object.assign(
      {},
      dateTimeFormats.en,
      defaultMessages.en,
      authMessages.en,
      orgProfileMessages.en
    )
  }
  return allMessages
}
export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
})
