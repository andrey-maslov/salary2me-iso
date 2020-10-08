export const SITE_TITLE = 'salary2me'
export const HOST = 'https://salary.nobugs.today'
export const IS_BETA = true

export const LANG_DEFAULT = 'en'
// export const LANGS = ['ru', 'en', 'pl', 'es', 'de', 'fr', 'it', 'tk']
export const LANGS = ['ru', 'en']

export const accentColor = '#36A9E0'
export const parsingDuration = 6000

export const COLORS = {
    // accent: '#556587',
    accent: '#36a9e0',
    yellow: '#FFC734',
    orange: '#FF5E34',
    text: '#203152',
    accent2: '#36A9E0',
    grey: '#7D7D7D',
    greyBg: '#EFF1F4',
};

export const LINKEDIN_REDIRECT_URI = `${process.env.BASE_URL}/callbacklinkedin`

export const ACCEPTED_FILE_TYPES = '.rtf, .png, .jpg, .jpeg, .pdf, .doc, .docx'

export const PARSING_STAGES = ["Resume parser started.", "Parsing section bio", "Parsing section contacts", "Parsing section education",
    "Parsing section projects", "Parsing section", "Parsing section history",
    "Parsing section experience", "Parsing section languages", "Parsing section skills",
    "Parsing section certifications", "Parsing section specializations", "Parsing section interests",
    "Resume parsed."]

export const locations = [
    {countryISO: 'by', city: 'Minsk', costLivingIndex: '32'},
    {countryISO: 'bg', city: 'Sofia', costLivingIndex: '37'},
    {countryISO: 'be', city: 'Brussels', costLivingIndex: '67'},
    {countryISO: 'ch', city: 'Zurich', costLivingIndex: '121'},
    {countryISO: 'cz', city: 'Prague', costLivingIndex: '41'},
    {countryISO: 'de', city: 'Berlin', costLivingIndex: '61'},
    {countryISO: 'de', city: 'Munich', costLivingIndex: '68'},
    {countryISO: 'dk', city: 'Copenhagen', costLivingIndex: '80'},
    {countryISO: 'es', city: 'Madrid', costLivingIndex: '56'},
    {countryISO: 'es', city: 'Barcelona', costLivingIndex: '55'},
    {countryISO: 'fi', city: 'Helsinki', costLivingIndex: '68'},
    {countryISO: 'fr', city: 'Paris', costLivingIndex: '82'},
    {countryISO: 'gb', city: 'London', costLivingIndex: '71'},
    {countryISO: 'ie', city: 'Dublin', costLivingIndex: '74'},
    {countryISO: 'kr', city: 'Seoul', costLivingIndex: '74'},
    {countryISO: 'nl', city: 'Amsterdam', costLivingIndex: '75'},
    {countryISO: 'no', city: 'Oslo', costLivingIndex: '73'},
    {countryISO: 'pl', city: 'Warsaw', costLivingIndex: '38'},
    {countryISO: 'pl', city: 'Krakow', costLivingIndex: '36'},
    {countryISO: 'pl', city: 'Wroclaw', costLivingIndex: '35'},
    {countryISO: 'pl', city: 'Gdansk', costLivingIndex: '36'},
    {countryISO: 'pt', city: 'Lisbon', costLivingIndex: '48'},
    {countryISO: 'ru', city: 'Moscow', costLivingIndex: '35'},
    {countryISO: 'se', city: 'Stockholm', costLivingIndex: '69'},
    {countryISO: 'sg', city: 'Singapore', costLivingIndex: '75'},
    {countryISO: 'ua', city: 'Kyiv', costLivingIndex: '30'},
]

export const currencies = {
    usd: {
        symbol: '$',
        nameISO: 'usd'
    },
    eur: {
        symbol: '€',
        nameISO: 'eur'
    }
}

export enum authModes {
    'signin',
    'registration',
    'forgot-password',
    'reset-password',
    'forgot-password-success',
    'onboarding'
}