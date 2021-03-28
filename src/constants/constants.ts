const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

export const SITE_TITLE = 'Salary2me'
export const IS_BETA = true
export const API_VER = 1
export const SERVICE = 4

// Self
export const HOST = process.env.PRODUCTION ? 'https://salary2.me' : 'https://salary.nobugs.today'

// API
export const BASE_API = process.env.PRODUCTION
    ? 'https://api.thegreatbase.online'
    : 'https://apibase.pashtaljon.by'

export const CONTENT_API = 'https://api.salary2.me'

export const LINKEDIN_REDIRECT_URI = `${BASE_API}/callbacklinkedin`

// Salary2me
export const TEST_URL = `${HOST}/test`

// Teamconstructor
export const COOP_URL = 'https://teamconstructor.com'
export const COOP_PROFILE_URL = `${COOP_URL}/profile`
export const COOP_TEAM_URL = `${COOP_URL}/team`
export const COOP_PAIR_URL = `${COOP_URL}/pair`

// Thegreatbase
export const TGB_URL = 'https://thegreatbase.online'
export const TGB_DASHBOARD_URL = `${TGB_URL}/Identity/Account/Manage`
export const TGB_SUBSCRIPTIONS_URL = `${TGB_URL}/Voter/MembershipPlans`

// Languages
export const LANGS = ['ru', 'en']
export const LANG_DEFAULT = 'ru'

// Colors
export const accentColor = '#36A9E0'
export const COLORS = {
    accent: accentColor,
    yellow: '#FFC734',
    orange: '#FF5E34',
    text: '#203152',
    accent2: '#36A9E0',
    grey: '#7D7D7D',
    greyBg: '#EFF1F4'
}

export const ACCEPTED_FILE_TYPES = '.rtf, .png, .jpg, .jpeg, .pdf, .doc, .docx'

export const locations = [
    { countryISO: 'by', city: 'Minsk', costLivingIndex: '32' },
    { countryISO: 'bg', city: 'Sofia', costLivingIndex: '37' },
    { countryISO: 'be', city: 'Brussels', costLivingIndex: '67' },
    { countryISO: 'ch', city: 'Zurich', costLivingIndex: '121' },
    { countryISO: 'cz', city: 'Prague', costLivingIndex: '41' },
    { countryISO: 'de', city: 'Berlin', costLivingIndex: '61' },
    { countryISO: 'de', city: 'Munich', costLivingIndex: '68' },
    { countryISO: 'dk', city: 'Copenhagen', costLivingIndex: '80' },
    { countryISO: 'es', city: 'Madrid', costLivingIndex: '56' },
    { countryISO: 'es', city: 'Barcelona', costLivingIndex: '55' },
    { countryISO: 'fi', city: 'Helsinki', costLivingIndex: '68' },
    { countryISO: 'fr', city: 'Paris', costLivingIndex: '82' },
    { countryISO: 'gb', city: 'London', costLivingIndex: '71' },
    { countryISO: 'ie', city: 'Dublin', costLivingIndex: '74' },
    { countryISO: 'kr', city: 'Seoul', costLivingIndex: '74' },
    { countryISO: 'nl', city: 'Amsterdam', costLivingIndex: '75' },
    { countryISO: 'no', city: 'Oslo', costLivingIndex: '73' },
    { countryISO: 'pl', city: 'Warsaw', costLivingIndex: '38' },
    { countryISO: 'pl', city: 'Krakow', costLivingIndex: '36' },
    { countryISO: 'pl', city: 'Wroclaw', costLivingIndex: '35' },
    { countryISO: 'pl', city: 'Gdansk', costLivingIndex: '36' },
    { countryISO: 'pt', city: 'Lisbon', costLivingIndex: '48' },
    { countryISO: 'ru', city: 'Moscow', costLivingIndex: '35' },
    { countryISO: 'se', city: 'Stockholm', costLivingIndex: '69' },
    { countryISO: 'sg', city: 'Singapore', costLivingIndex: '75' },
    { countryISO: 'ua', city: 'Kyiv', costLivingIndex: '30' }
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
    'reset-password-success',
    'onboarding'
}

export const parsingDuration = 6000

// minimal value of main octant to pass the test
export const TEST_THRESHOLD = 6.75
