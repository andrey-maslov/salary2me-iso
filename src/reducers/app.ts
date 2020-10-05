import {
    SET_CURRENCY,
    GET_CURRENCY_RATES,
    SET_PAY_PERIOD,
    SET_PAY_TAX,
    SET_SORTING,
    SET_DISPLAYED_RESULTS,
    LOADING,
    API_ERROR,
    PROCESS_FAILED,
    RES_STATUS, SET_TOAST
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
    loading: boolean,
    apiErrorMsg: string | null,
    processFailed: boolean,
    setToast: number
}

if (!STATE ) {
    STATE = {
        sorting: 'normal',
        displayedResults: 'netto-normal',
        selectedCurrency: currencies.usd.nameISO,
        currencyRates: {EUR: 0.92, USD: 1, GBP: 0.81},
        payPeriod: 'monthly',
        payTax: 'netto',
        loading: false,
        apiErrorMsg: null,
        processFailed: false,
        setToast: 0
    }
}

/**
 *
 * @param state
 * @param type
 * @param sorting
 * @param displayedResults
 * @param selectedCurrency
 * @param currencyRates
 * @param payPeriod
 * @param payTax
 * @param loading
 * @param apiErrorMsg
 * @param processFailed
 * @param setToast {0 - default, 1 - success, 2 - fail}
 */

export const app = (state = STATE, {
    type,
    sorting,
    displayedResults,
    selectedCurrency,
    currencyRates,
    payPeriod,
    payTax,
    loading,
    apiErrorMsg,
    processFailed,
    setToast
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
        case LOADING:
            return {
                ...state,
                loading,
            }
        case API_ERROR:
            return {
                ...state,
                apiErrorMsg,
            }
        case PROCESS_FAILED:
            return {
                ...state,
                processFailed,
            }
        case SET_TOAST:
            return {
                ...state,
                setToast,
            }

        default:
            return state
    }
}