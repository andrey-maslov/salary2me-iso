import {
    ADD_USER_SALARY,
    ESTIMATION,
    CV_SENT,
    SET_CURRENCY,
    SET_SORTING,
    SET_DISPLAYED_RESULTS,
    GET_CURRENCY_RATES,
    SET_PAY_PERIOD,
    SET_PAY_TAX,
    CLEAR_CV_DATA
} from '../actions/actionTypes'

import { loadState } from '../store/sessionStorage'
import { isBrowser } from '../helper/helper'
import { currencies } from '../constants/constants'

// let STATE = isBrowser ? loadState('cv') : null

export type cvStoreType = {
    predictions: []
    position: string
    realSalary: string
    sorting: string
    displayedResults: string
    selectedCurrency: string
    currencyRates: { EUR: number; USD: number; GBP: number }
    payPeriod: string
    payTax: string
    isCvSent: boolean
}


const STATE = {
    predictions: [],
    position: '',
    realSalary: '',
    sorting: 'normal',
    displayedResults: 'netto-normal',
    selectedCurrency: currencies.usd.nameISO,
    currencyRates: { EUR: 0.92, USD: 1, GBP: 0.81 },
    payPeriod: 'monthly',
    payTax: 'netto',
    isCvSent: false
}

export const cv = (
    state = STATE,
    {
        type,
        position,
        predictions,
        realSalary,
        sorting,
        displayedResults,
        selectedCurrency,
        currencyRates,
        payPeriod,
        payTax,
        isCvSent
    }
) => {
    switch (type) {
        case ADD_USER_SALARY:
            return {
                ...state,
                realSalary
            }
        case SET_CURRENCY:
            return {
                ...state,
                selectedCurrency
            }
        case SET_SORTING:
            return {
                ...state,
                sorting
            }
        case SET_DISPLAYED_RESULTS:
            return {
                ...state,
                displayedResults
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
                payTax
            }
        case CV_SENT:
            return {
                ...state,
                isCvSent
            }
        case ESTIMATION:
            return {
                ...state,
                predictions,
                position
            }
        case CLEAR_CV_DATA:
            return {
                ...state,
                predictions: [],
                position: '',
                realSalary: '',
                sorting: 'normal',
                displayedResults: 'netto-normal',
                selectedCurrency: currencies.usd.nameISO,
                currencyRates: { EUR: 0.92, USD: 1, GBP: 0.81 },
                payPeriod: 'monthly',
                payTax: 'netto',
                isCvSent: false
            }
        default:
            return state
    }
}
