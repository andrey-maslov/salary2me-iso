const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
    defaultLanguage: 'ru',
    otherLanguages: ['en', 'pl'],
    fallbackLng: 'ru',
    serverLanguageDetection: false,
    browserLanguageDetection: false,
    detection: {
        // check if language is cached in cookies, if not check local storage
        order: ['cookie', 'localStorage'],

        // next-i18next by default searches for the "next-i18next" cookie on server requests
        lookupCookie: 'next-i18next',
        lookupLocalStorage: 'i18nextLng',

        // cache the language in cookies and local storage
        caches: ['cookie', 'localStorage']
    },
    localePath: path.resolve('public/locales')
})
