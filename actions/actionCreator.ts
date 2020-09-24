import axios from "axios";
import {stringToBoolean} from '../helper/helper';
import {PREDICTIONS_URL} from "../constants/constants";

import {
    ADD_USER_SALARY,
    ADD_AUTH_DATA,
    OPEN_LOGIN_MODAL,
    CV_SENT,
    ESTIMATION,
    CLEAR_USER_DATA,
    PARSING_MODAL,
    SET_CURRENCY,
    GET_CURRENCY_RATES,
    SET_PAY_PERIOD,
    SET_PAY_TAX,
    SET_SORTING,
    SET_DISPLAYED_RESULTS,
    SET_ERROR, PROCESS_FAILED, LOADING,
} from './actionTypes';


/*===== AUTH =====*/

export const addAuthData = (name, email, provider) => ({
    type: ADD_AUTH_DATA,
    name,
    email,
    provider,
})

export const clearUserData = (bool = true) => {
    return {
        type: CLEAR_USER_DATA
    }
}

export const setLoginModal = (bool) => ({
    type: OPEN_LOGIN_MODAL,
    isLoginModalOpen: bool,
})


/*===== SALARY ESTIMATION =====*/

export const setParsingModal = (bool) => ({
    type: PARSING_MODAL,
    isParsingModal: bool,
})

export const setCvSent = (bool) => ({
    type: CV_SENT,
    isCvSent: bool,
    isUserInBase: true,
})

export const parsingCvResults = (predictions, position) => ({
    type: ESTIMATION,
    predictions,
    position,
})

export const addUserRealSalary = (realSalary) => ({
    type: ADD_USER_SALARY,
    realSalary,
})

export const setSorting = (payload) => {
    return {
        type: SET_SORTING,
        sorting: payload
    }
}

export const setDisplayedResults = (payload) => {
    return {
        type: SET_DISPLAYED_RESULTS,
        displayedResults: payload
    }
}

export const setCurrency = (selectedCurrency) => {
    return {
        type: SET_CURRENCY,
        selectedCurrency,
    }
}

export const setPayPeriod = (payPeriod) => {
    return {
        type: SET_PAY_PERIOD,
        payPeriod,
    }
}

export const setPayTax = (payTax) => {
    return {
        type: SET_PAY_TAX,
        payTax,
    }
}

export const sendCvForResults = (formData) => {

    return (dispatch) => {

        // @ts-ignore
        // dispatch(parsingCvResults(predictions.predictions, predictions.position));

        dispatch(predictionsRequestLoading(true))

        //TODO change to PUT query, right url and put formData for use on production
        axios.get('https://run.mocky.io/v3/62678e58-c4c0-4dfb-89ac-0cbb9b1ff44a', {})
            .then(response => {
                dispatch(setCvSent(true));

                return response.data;
            })
            .then(data => {
                dispatch(parsingCvResults(data.predictions, data.position))
                // console.log(data);
            })
            .catch(() => {

            })

    }
}

//Send real user salary to base
export const sendRealSalary = (formData) => {

    return (dispatch) => {

        //TODO change to PUT query, right url and put formData for use on production
        axios.get('https://run.mocky.io/v3/62678e58-c4c0-4dfb-89ac-0cbb9b1ff44a', {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                dispatch(addUserRealSalary(formData.get('salary')));

            })
            .catch(() => {

            });
    }
};

export const signIn = (data) => {
    return (dispatch) => {
        axios.post('https://apibase.pashtaljon.by/api/v1/token/authenticate', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                console.log(res)
                return res.data
            })
            .then(data => {
                console.log('GET next')
                // fetchUserData(data.jwtToken)
                axios('https://apibase.pashtaljon.by/api/v1/user/me', {
                    headers: {
                        'Authorization': `Bearer ${data.jwtToken}`
                    }
                })
                    .then(res => {
                        console.log('GET')
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const fetchUserData = (token) => {
    return (dispatch) => {
        axios('https://apibase.pashtaljon.by/api/v1/user/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log('GET')
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }
}

//TODO think about 'is user in base?'
export const isUserInBase = (email) => {
    return (dispatch) => {
        axios(`${PREDICTIONS_URL}?email=${email}`)
            .then(response => {
                return response.data;
            })
            .then(data => {

                // dispatch({
                //     type: USER_IN_BASE,
                //     isUserInBase: true
                // });
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
                dispatch(addAuthData(name, email,'google'));
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
}


/*===== APPLICATION MODE (app reducer) =====*/

export function setLoading(isLoading: boolean) {
    return {
        type: LOADING,
        isLoading
    }
}

/*===== UTILS =====*/

export function clearErrors() {
    return (dispatch: any) => {
        dispatch({type: SET_ERROR, errorApiMessage: ''})
        dispatch({type: PROCESS_FAILED, processFailed: false})
    }
}

function apiErrorHandling(error: any, dispatch: any) {

    if (error.response) {
        let msg: string
        try {
            msg = Array.isArray(error.response.data.message) ? error.response.data.message[0].messages[0].message : 'Something wrong'
        } catch {
            msg = 'Something wrong'
        }
        console.log(msg)
        dispatch({
            type: SET_ERROR,
            errorApiMessage: msg
        })
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error(error.request)
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('ERROR', error.message)
    }
    dispatch({type: PROCESS_FAILED, processFailed: true})
    console.log(error)
}