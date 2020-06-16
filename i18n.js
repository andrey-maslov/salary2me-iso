const NextI18Next = require('next-i18next').default

module.exports = new NextI18Next({
    defaultLanguage: 'ru',
    otherLanguages: ['en', 'pl'],
    localeSubpaths: {
        en: 'en',
        ru: 'ru',
        pl: 'pl'
    },
    localePath:	'public/locales',
})