import {
    SET_CURRENCY,
    GET_CURRENCY_RATES,
    SET_PAY_PERIOD,
    SET_PAY_TAX,
    SET_SORTING,
    SET_DISPLAYED_RESULTS,
    SET_REDIRECT_URL,
    CLEAR_USER_DATA
} from "../actions/types";
import {currencies} from '../constants/constants';
// import {load} from 'redux-localstorage-simple';
import {loadState} from '../store/sessionStorage';

let APP_MODE = loadState('applicationMode');

if (!APP_MODE ) {
    APP_MODE = {
        sorting: 'normal',
        displayedResults: 'netto-normal',
        selectedCurrency: currencies.usd.nameISO,
        currencyRates: {EUR: 0.92, USD: 1, GBP: 0.81},
        payPeriod: 'monthly',
        payTax: 'netto',
        redirectUrl: '/',
    }
}

export type ApplicationModeType = typeof APP_MODE;

// let APP_MODE = load({states: ['applicationMode'], namespace: 'data'});
//
// if (!APP_MODE || !APP_MODE.applicationMode) {
//     APP_MODE = {
//         applicationMode: {
//             sorting: 'normal',
//             displayedResults: 'netto-normal',
//             selectedCurrency: currencies.usd.nameISO,
//             currencyRates: {EUR:0.92, USD:1, GBP:0.81},
//             payPeriod: 'monthly',
//             payTax: 'netto',
//             redirectUrl: '/',
//         }
//     };
// }

export const applicationMode = (state = APP_MODE, {
    type,
    sorting,
    displayedResults,
    selectedCurrency,
    currencyRates,
    payPeriod,
    payTax,
    redirectUrl,
}) => {
    switch (type) {
        case  SET_CURRENCY:
            return {
                ...state,
                selectedCurrency,
            };
        case  SET_SORTING:
            return {
                ...state,
                sorting,
            };
        case  SET_DISPLAYED_RESULTS:
            return {
                ...state,
                displayedResults,
            };
        case GET_CURRENCY_RATES:
            return {
                ...state,
                currencyRates
            };
        case SET_PAY_PERIOD:
            return {
                ...state,
                payPeriod
            };
        case SET_PAY_TAX:
            return {
                ...state,
                payTax,
            };
        case SET_REDIRECT_URL :
            return {
                ...state,
                redirectUrl,
            };
        case CLEAR_USER_DATA :
            return {
                ...state,
                sorting: 'normal',
                displayedResults: 'netto-normal',
                selectedCurrency: currencies.usd.nameISO,
                payPeriod: 'monthly',
                payTax: 'netto',
                redirectUrl: '/'
            };
        default:
            return state;
    }
};