import {
    SET_CURRENCY,
    GET_CURRENCY_RATES,
    SET_PAY_PERIOD,
    SET_PAY_TAX,
    SET_SORTING,
    SET_DISPLAYED_RESULTS,
    API_ERROR
} from "../actions/actionTypes"
import {currencies} from '../constants/constants'
import {loadState} from '../store/sessionStorage'
import {isBrowser} from "../helper/helper"

let STATE

if (isBrowser) {
    STATE = loadState('app')
}

export type appStoreType = {
    sorting: string,
    displayedResults: string,
    selectedCurrency: string,
    currencyRates: {EUR: number, USD: number, GBP: number},
    payPeriod: string,
    payTax: string,
    apiError: boolean
}

if (!STATE ) {
    STATE = {
        sorting: 'normal',
        displayedResults: 'netto-normal',
        selectedCurrency: currencies.usd.nameISO,
        currencyRates: {EUR: 0.92, USD: 1, GBP: 0.81},
        payPeriod: 'monthly',
        payTax: 'netto',
        apiError: false
    }
}

export const app = (state = STATE, {
    type,
    sorting,
    displayedResults,
    selectedCurrency,
    currencyRates,
    payPeriod,
    payTax,
    apiError
}) => {
    switch (type) {
        case  SET_CURRENCY:
            return {
                ...state,
                selectedCurrency,
            }
        case  SET_SORTING:
            return {
                ...state,
                sorting,
            }
        case  SET_DISPLAYED_RESULTS:
            return {
                ...state,
                displayedResults,
            }
        case GET_CURRENCY_RATES:
            return {
                ...state,
                currencyRates
            }
        case SET_PAY_PERIOD:
            return {
                ...state,
                payPeriod
            }
        case SET_PAY_TAX:
            return {
                ...state,
                payTax,
            }
        case API_ERROR:
            return {
                ...state,
                apiError,
            }

        default:
            return state
    }
}