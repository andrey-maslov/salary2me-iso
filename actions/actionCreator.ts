import axios from "axios";
import {stringToBoolean} from '../helper/helper';
import {PREDICTIONS_URL, CONTENT_BASE_URL} from "../constants/constants";

import {
    ADD_USER_SALARY,
    ADD_AUTH_DATA,
    OPEN_LOGIN_MODAL,
    ONLY_LOGGED_MODAL,
    SUBSCRIPTION,
    COOKIES_CONSENT,
    CV_SENT,
    PARSING_CV_RESULTS,
    SET_REDIRECT_URL,
    PREDICTIONS_REQUEST_ERRORED,
    PREDICTIONS_REQUEST_LOADING,
    UPDATE_REQUEST_ERRORED,
    UPDATE_REQUEST_LOADING,
    CLEAR_USER_DATA,
    PARSING_MODAL,
    PARSING_TEXT,
    SET_CURRENCY,
    GET_CURRENCY_RATES,
    SET_PAY_PERIOD,
    SET_PAY_TAX,
    USER_IN_BASE,
    ADD_TERMS_CONTENT,
    ADD_COOKIE_POLICY_CONTENT, ADD_PRIVACY_POLICY_CONTENT, SET_SORTING, ADD_MAIN_CONTENT, SET_DISPLAYED_RESULTS,
} from './types';
import predictions from '../predictions.json';

export const addUserRealSalary = (userRealSalary) => ({
    type: ADD_USER_SALARY,
    userRealSalary,
});

export const addAuthData = (name, email, bool, provider) => ({
    type: ADD_AUTH_DATA,
    name,
    email,
    isLoggedIn: bool,
    provider,
});

export const setLoginModal = (bool) => ({
    type: OPEN_LOGIN_MODAL,
    isLoginModalOpen: bool,
});

export const setOnlyLoggedModal = (bool) => ({
    type: ONLY_LOGGED_MODAL,
    isOnlyLoggedModal: bool,
});

export const setParsingModal = (bool) => ({
    type: PARSING_MODAL,
    isParsingModal: bool,
});

export const subscription = (bool) => ({
    type: SUBSCRIPTION,
    isSubscribed: bool,
});

export const setCookiesConsent = (bool) => ({
    type: COOKIES_CONSENT,
    isCookiesConsented: bool,
});

export const setCvSent = (bool) => ({
    type: CV_SENT,
    isCvSent: bool,
    isUserInBase: true,
});

// export const setUserToBase = (bool) => ({
//     type: USER_IN_BASE,
//     isUserInBase: bool,
// });

export const parsingCvResults = (predictions, position) => ({
    type: PARSING_CV_RESULTS,
    predictions,
    position,
});

export const predictionsRequestError = (bool) => ({
    type: PREDICTIONS_REQUEST_ERRORED,
    hasErrored: bool,
});

export const predictionsRequestLoading = (bool) => ({
    type: PREDICTIONS_REQUEST_LOADING,
    isLoading: bool,
});

export const updateRequestError = (bool) => ({
    type: UPDATE_REQUEST_ERRORED,
    hasErrored: bool,
});

export const updateRequestLoading = (bool) => ({
    type: UPDATE_REQUEST_LOADING,
    isLoading: bool,
});

export const clearUserData = (bool = true) => {
    return {
        type: CLEAR_USER_DATA
    }
};

export const setParsingTextState = (bool) => {
    return {
        type: PARSING_TEXT,
        isParsingTextShowed: bool
    }
};

export const setSorting = (payload) => {
    return {
        type: SET_SORTING,
        sorting: payload
    }
};

export const setDisplayedResults = (payload) => {
    return {
        type: SET_DISPLAYED_RESULTS,
        displayedResults: payload
    }
};

export const setCurrency = (selectedCurrency) => {
    return {
        type: SET_CURRENCY,
        selectedCurrency,
    }
};

export const setPayPeriod = (payPeriod) => {
    return {
        type: SET_PAY_PERIOD,
        payPeriod,
    }
};

export const setPayTax = (payTax) => {
    return {
        type: SET_PAY_TAX,
        payTax,
    }
};

export const setRedirectUrl = (url) => {
    return {
        type: SET_REDIRECT_URL,
        redirectUrl: url,
    }
};


export const sendCvForResults = (formData) => {

    return (dispatch) => {

        // @ts-ignore
        // dispatch(parsingCvResults(predictions.predictions, predictions.position));

        dispatch(predictionsRequestLoading(true));

        axios.post(PREDICTIONS_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.statusText !== 'OK') {
                    throw Error(response.statusText);
                }
                dispatch(setCvSent(true));
                dispatch(predictionsRequestLoading(false));
                return response.data;
            })
            .then(data => {
                dispatch(parsingCvResults(data.predictions, data.position));
                // console.log(data);
            })
            .catch(() => {
                dispatch(predictionsRequestError(true));
                dispatch(predictionsRequestLoading(false));
            });

    }
};

//Send subscription option to base
export const fetchSubscription = (formData) => {

    const isSubscribed = stringToBoolean(formData.get('subscription'));

    return (dispatch) => {

        dispatch(updateRequestLoading(true));

        axios.put(PREDICTIONS_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.status !== 204) {
                    throw Error(response.statusText);
                }
                dispatch(subscription(isSubscribed));
                dispatch(updateRequestLoading(false));
            })
            .catch(() => {
                dispatch(updateRequestError(true));
                dispatch(updateRequestLoading(false))
            });
    }
};

//Send real user salary to base
export const sendRealSalary = (formData) => {

    return (dispatch) => {

        dispatch(updateRequestLoading(true));

        axios.put(PREDICTIONS_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                if (response.status !== 204) {
                    throw Error(response.statusText);
                }
                dispatch(addUserRealSalary(formData.get('salary')));
                dispatch(updateRequestLoading(false));
            })
            .catch(() => {
                dispatch(updateRequestError(true));
                dispatch(updateRequestLoading(false))
            });
    }
};

export const isUserInBase = (email) => {
    return (dispatch) => {
        axios(`${PREDICTIONS_URL}?email=${email}`)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .then(data => {
                dispatch(subscription(data.isSubscribed));
                dispatch({
                    type: USER_IN_BASE,
                    isUserInBase: true
                });
                //console.log(data)
            })
            .catch(error => {
                //console.log('user is not in base')
            })
    }
};

//TODO change
export const signInGoogle = () => {

    return (dispatch) => {

        // @ts-ignore
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn()
            .then(googleUser => {
                const profile = googleUser.getBasicProfile();
                return profile;
            })
            .then((profile) => {
                const name = profile.getName(),
                    email = profile.getEmail();
                dispatch(addAuthData(name, email, true, 'google'));
                dispatch(isUserInBase(email));
            })
    }
};

//TODO change
export const signOutGoogle = () => {
    // @ts-ignore
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(function () {
        console.log('User signed out.')
    })
};


export const getCurrencyRates = () => {

    return (dispatch) => {
        axios('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,EUR,GBP')
            .then(response => {
                return response.data.rates;
            })
            .then(rates => {
                dispatch({
                    type: GET_CURRENCY_RATES,
                    currencyRates: rates,
                })
            })
            .catch(error => {
                console.error(error);
                dispatch({
                    type: GET_CURRENCY_RATES,
                    currencyRates: {"EUR": 0.9},
                })
            })
    }
};


export const fetchPageContent = (page) => {

    return (dispatch) => {

        let pageId = null,
            actionType = '';

        switch (page) {
            case 'main':
                pageId = 39;
                actionType = ADD_MAIN_CONTENT;
                break;
            case 'terms':
                pageId = 28;
                actionType = ADD_TERMS_CONTENT;
                break;
            case 'cookie-policy':
                pageId = 33;
                actionType = ADD_COOKIE_POLICY_CONTENT;
                break;
            case 'privacy-policy':
                pageId = 31;
                actionType = ADD_PRIVACY_POLICY_CONTENT;
                break;
            default:
                pageId = null;
        }

        axios(`${CONTENT_BASE_URL}/wp/v2/pages/${pageId}`)
            .then(response => {
                return response.data
            })
            .then(data => {
                dispatch({
                    type: actionType,
                    payload: data.content.rendered
                })
            })
            .catch(err => {
                console.error(err)
                dispatch({
                    type: actionType,
                    payload: 'data is not available'
                })
            })
    }
};