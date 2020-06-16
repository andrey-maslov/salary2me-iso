import {
    ADD_USER_SALARY,
    ADD_AUTH_DATA,
    SUBSCRIPTION,
    COOKIES_CONSENT,
    PARSING_CV_RESULTS,
    CV_SENT,
    CLEAR_USER_DATA,
    USER_IN_BASE,
} from '../actions/types';

import {load} from 'redux-localstorage-simple';
let USER_DATA;

//TODO some problem with storage and SSR maybe
if (typeof window != 'undefined') {
    USER_DATA = load({states: ['userData'], namespace: 'data'});
}

if (!USER_DATA || !USER_DATA.userData) {
    USER_DATA = {
        userData: {
            info: {
                name: 'Andrey Maslov',
                email: 'redux@mail',
                location: '',
            },
            // @ts-ignore
            predictions: [],
            position: '',
            userRealSalary: '',
            auth: {
                isLoggedIn: true,
                provider: 'google',
                isUserInBase: true,
            },
            isSubscribed: false,
            isCookiesConsented: false,
            isCvSent: false,
        },
    }
}

export type UserDataType = typeof USER_DATA;

export const userData = (state = USER_DATA.userData, {
    type,
    name,
    email,
    location,
    predictions,
    position,
    userRealSalary,
    isLoggedIn,
    provider,
    isUserInBase,
    isSubscribed,
    isCookiesConsented,
    isCvSent,
}) => {
    switch (type) {
        case ADD_USER_SALARY :
            return {
                ...state,
                userRealSalary,
            };
        case ADD_AUTH_DATA :
            return {
                ...state,
                info: {name, email, location},
                auth: {isLoggedIn, provider}
            };
        case SUBSCRIPTION :
            return {
                ...state,
                isSubscribed
            };
        case COOKIES_CONSENT :
            return {
                ...state,
                isCookiesConsented,
            };
        case CV_SENT :
            return {
                ...state,
                isCvSent,
                auth: {...state.auth, isUserInBase},
            };
        case USER_IN_BASE :
            return {
                ...state,
                auth: {...state.auth, isUserInBase}
            };
        case PARSING_CV_RESULTS :
            return {
                ...state,
                predictions,
                position,
            };
        case CLEAR_USER_DATA :
            return {
                ...state,
                info: {
                    name: '',
                    email: '',
                    location: '',
                },
                predictions: [],
                position: '',
                userRealSalary: '',
                auth: {
                    isLoggedIn: false,
                    provider: '',
                    isUserInBase: false,
                },
                isSubscribed: false,
                isCvSent: false,
            };

        default:
            return state;
    }
};